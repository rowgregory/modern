import { sliceMember } from '@/app/lib/constants/api/sliceNames'
import { createLog } from '@/app/lib/utils/api/createLog'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function getMyProfile(req: NextRequest, chapterId: string, memberId: string) {
  try {
    // Validate chapter ID
    if (!chapterId) {
      return NextResponse.json({ error: 'Chapter ID is required' }, { status: 400 })
    }

    // Get user profile data
    const user = await prisma.user.findFirst({
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

    if (!user) {
      return NextResponse.json(
        {
          error: 'User profile not found in this chapter'
        },
        { status: 404 }
      )
    }

    // Check if user profile is complete
    const isProfileComplete = !!(
      user.name?.trim() &&
      user.email?.trim() &&
      user.company?.trim() &&
      user.profession?.trim()
    )

    // Calculate membership days
    const membershipDays = user.joinedAt
      ? Math.floor((new Date().getTime() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24))
      : 0

    // Check if membership is expiring soon (within 30 days)
    const isExpiringSoon = user.expiresAt
      ? Math.floor((new Date(user.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 30
      : false

    // Log success
    await createLog('info', 'User profile retrieved successfully', {
      location: ['app route - GET /api/member/<chapterId>/<memberId>/me'],
      message: 'User profile retrieved successfully',
      name: 'UserProfileRetrieved',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      chapterId,
      userId: user.id,
      userEmail: user.email,
      membershipStatus: user.membershipStatus,
      isProfileComplete,
      membershipDays
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          ...user,
          // Add computed fields
          isProfileComplete,
          membershipDays,
          isExpiringSoon
        },
        meta: {
          chapterId,
          lastUpdated: user.updatedAt,
          profileCompleteness: {
            isComplete: isProfileComplete,
            missingFields: [
              !user.name?.trim() && 'name',
              !user.company?.trim() && 'company',
              !user.profession?.trim() && 'profession',
              !user.phone?.trim() && 'phone'
            ].filter(Boolean)
          },
          membership: {
            status: user.membershipStatus,
            joinedDaysAgo: membershipDays,
            expiresAt: user.expiresAt,
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
      action: 'Get my profile',
      sliceName: sliceMember
    })
  }
}
