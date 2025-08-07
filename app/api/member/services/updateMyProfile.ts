import { NextRequest, NextResponse } from 'next/server'
import { createLog } from '@/app/lib/utils/api/createLog'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceMember } from '@/app/lib/constants/api/sliceNames' // Adjust import path
import prisma from '@/prisma/client'

export async function updateMyProfile(req: NextRequest, chapterId: string, memberId: string) {
  try {
    // Validate parameters
    if (!chapterId || !memberId) {
      return NextResponse.json(
        {
          error: 'Chapter ID and Member ID are required'
        },
        { status: 400 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { name, phone, company, profession, interests, isPublic, profileImage, profileImageFilename } = body

    // Validate required fields
    if (!name || !company || !profession) {
      return NextResponse.json(
        {
          error: 'Required fields: name, company, profession'
        },
        { status: 400 }
      )
    }

    // Check if member exists and user has permission to update
    const existingMember = await prisma.user.findFirst({
      where: {
        id: memberId,
        chapterId: chapterId
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        profession: true,
        interests: true,
        isPublic: true,
        isActive: true,
        profileImage: true,
        profileImageFilename: true,
        updatedAt: true
      }
    })

    if (!existingMember) {
      return NextResponse.json(
        {
          error: 'Member not found or you do not have permission to update this profile'
        },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      name: name.trim(),
      company: company.trim(),
      profession: profession.trim()
    }

    // Add optional fields if provided
    if (phone !== undefined) updateData.phone = phone?.trim() || null
    if (interests !== undefined) updateData.interests = interests
    if (isPublic !== undefined) updateData.isPublic = Boolean(isPublic)
    if (profileImage !== undefined) updateData.profileImage = profileImage
    if (profileImageFilename !== undefined) updateData.profileImageFilename = profileImageFilename

    // Update the member
    const updatedMember = await prisma.user.update({
      where: { id: memberId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        profession: true,
        role: true,
        interests: true,
        profileImage: true,
        profileImageFilename: true,
        isPublic: true,
        isActive: true,
        membershipStatus: true,
        joinedAt: true,
        expiresAt: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        chapter: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      }
    })

    // Calculate computed fields
    const membershipDays = updatedMember.joinedAt
      ? Math.floor((new Date().getTime() - new Date(updatedMember.joinedAt).getTime()) / (1000 * 60 * 60 * 24))
      : 0

    const isExpiringSoon = updatedMember.expiresAt
      ? Math.floor((new Date(updatedMember.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 30
      : false

    const isProfileComplete = !!(
      updatedMember.name?.trim() &&
      updatedMember.email?.trim() &&
      updatedMember.company?.trim() &&
      updatedMember.profession?.trim()
    )

    // Track what fields were changed
    const changedFields = Object.keys(updateData).filter((key) => {
      if (key === 'updatedAt') return false

      const oldValue = (existingMember as any)[key]
      const newValue = updateData[key]

      if (Array.isArray(newValue) && Array.isArray(oldValue)) {
        return JSON.stringify(newValue) !== JSON.stringify(oldValue)
      }
      return newValue !== oldValue
    })

    // Log success
    await createLog('info', 'Member profile updated successfully', {
      location: ['app route - PUT /api/member/<chapterId>/<memberId>/me'],
      message: 'Member profile updated successfully',
      name: 'MemberProfileUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      chapterId,
      memberId,
      userEmail: '',
      changedFields,
      previousName: existingMember.name,
      newName: updateData.name
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Member profile updated successfully',
        data: {
          ...updatedMember,
          // Add computed fields
          isProfileComplete,
          membershipDays,
          isExpiringSoon
        },
        meta: {
          chapterId,
          lastUpdated: updatedMember.updatedAt,
          changedFields,
          profileCompleteness: {
            isComplete: isProfileComplete,
            missingFields: [
              !updatedMember.name?.trim() && 'name',
              !updatedMember.company?.trim() && 'company',
              !updatedMember.profession?.trim() && 'profession',
              !updatedMember.phone?.trim() && 'phone'
            ].filter(Boolean)
          },
          membership: {
            status: updatedMember.membershipStatus,
            joinedDaysAgo: membershipDays,
            expiresAt: updatedMember.expiresAt,
            isExpiringWithin30Days: isExpiringSoon
          }
        }
      },
      { status: 200 }
    )
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'Update member profile',
      sliceName: sliceMember
    })
  }
}
