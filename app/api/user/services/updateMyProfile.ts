import { NextRequest, NextResponse } from 'next/server'
import { createLog } from '@/app/lib/utils/api/createLog'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceUser } from '@/app/lib/constants/api/sliceNames' // Adjust import path
import prisma from '@/prisma/client'

export async function updateMyProfile(req: NextRequest, chapterId: string, userId: string) {
  try {
    // Validate parameters
    if (!chapterId || !userId) {
      return NextResponse.json(
        {
          error: 'Chapter ID and User ID are required'
        },
        { status: 400 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { name, phone, company, profession, interests, isPublic, isAdmin, profileImage, profileImageFilename } = body

    // Validate required fields
    if (!name || !company || !profession) {
      return NextResponse.json(
        {
          error: 'Required fields: name, company, profession',
          sliceName: sliceUser
        },
        { status: 400 }
      )
    }

    // Check if user exists and user has permission to update
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
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

    if (!existingUser) {
      return NextResponse.json(
        {
          error: 'User not found or you do not have permission to update this profile'
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
    if (isAdmin !== undefined) updateData.isAdmin = Boolean(isAdmin)
    if (profileImage !== undefined) updateData.profileImage = profileImage
    if (profileImageFilename !== undefined) updateData.profileImageFilename = profileImageFilename

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
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
    const usershipDays = updatedUser.joinedAt
      ? Math.floor((new Date().getTime() - new Date(updatedUser.joinedAt).getTime()) / (1000 * 60 * 60 * 24))
      : 0

    const isExpiringSoon = updatedUser.expiresAt
      ? Math.floor((new Date(updatedUser.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 30
      : false

    const isProfileComplete = !!(
      updatedUser.name?.trim() &&
      updatedUser.email?.trim() &&
      updatedUser.company?.trim() &&
      updatedUser.profession?.trim()
    )

    // Track what fields were changed
    const changedFields = Object.keys(updateData).filter((key) => {
      if (key === 'updatedAt') return false

      const oldValue = (existingUser as any)[key]
      const newValue = updateData[key]

      if (Array.isArray(newValue) && Array.isArray(oldValue)) {
        return JSON.stringify(newValue) !== JSON.stringify(oldValue)
      }
      return newValue !== oldValue
    })

    // Log success
    await createLog('info', 'User profile updated successfully', {
      location: ['app route - PUT /api/user/<chapterId>/<userId>/me'],
      message: 'User profile updated successfully',
      name: 'UserProfileUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      chapterId,
      userId,
      userEmail: '',
      changedFields,
      previousName: existingUser.name,
      newName: updateData.name
    })

    return NextResponse.json(
      {
        user: {
          ...updatedUser,
          // Add computed fields
          isProfileComplete,
          usershipDays,
          isExpiringSoon
        },
        meta: {
          chapterId,
          lastUpdated: updatedUser.updatedAt,
          changedFields,
          profileCompleteness: {
            isComplete: isProfileComplete,
            missingFields: [
              !updatedUser.name?.trim() && 'name',
              !updatedUser.company?.trim() && 'company',
              !updatedUser.profession?.trim() && 'profession',
              !updatedUser.phone?.trim() && 'phone'
            ].filter(Boolean)
          },
          usership: {
            status: updatedUser.membershipStatus,
            joinedDaysAgo: usershipDays,
            expiresAt: updatedUser.expiresAt,
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
      action: 'Update user profile',
      sliceName: sliceUser
    })
  }
}
