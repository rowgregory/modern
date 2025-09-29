import { sliceParley } from '@/app/lib/constants/api/sliceNames'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  try {
    const userAuth = getUserFromHeader({ req })
    if (!userAuth.success) {
      return userAuth.response!
    }

    const id = userAuth.userId as string

    const parameters = await params
    const chapterId = parameters.chapterId

    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    const anchors = await prisma.anchor.findMany({
      where: {
        chapterId,
        OR: [{ giverId: id }, { receiverId: id }]
      },
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        giver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const user = await prisma.user.findFirst({
      where: {
        id: userAuth.userId,
        chapterId: chapterId
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        industry: true,
        website: true,
        title: true,
        businessLicenseNumber: true,
        yearsInBusiness: true,
        bio: true,
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
        isAdmin: true,
        isSuperUser: true,
        isLicensed: true,

        // NEW: Professional Goals & Media
        goal: true,
        collage: true,
        coverImage: true,
        coverImageFilename: true,

        // NEW: Social Media & Online Presence
        facebookUrl: true,
        threadsUrl: true,
        youtubeUrl: true,
        xUrl: true,
        linkedInUrl: true,
        portfolioUrl: true,

        // NEW: Content & Communication
        posts: true,
        podcasts: true,

        // NEW: Skills & Professional Development
        skills: true,
        careerAchievements: true,
        learningGoals: true,

        // NEW: Services & Professional Network
        servicesOffered: true,
        professionalAssociations: true,
        professionalBooks: true,

        // NEW: Projects & Expertise Sharing
        sideProjects: true,
        askMeAbout: true,

        weeklyTreasureWishlist: true,

        chapter: {
          select: {
            id: true,
            name: true,
            location: true,
            hasUnlockedMuster: true,
            hasUnlockedBooty: true,
            hasUnlockedGrog: true
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
      user.industry?.trim()
    )

    // Calculate membership days
    const membershipDays = user.joinedAt
      ? Math.floor((new Date().getTime() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24))
      : 0

    // Check if membership is expiring soon (within 30 days)
    const isExpiringSoon = user.expiresAt
      ? Math.floor((new Date(user.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 30
      : false

    const rendezvous = await prisma.rendezvous.findMany({
      where,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: {
        id: true,
        name: true,
        location: true,
        meetingDay: true,
        meetingTime: true,
        meetingFrequency: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const treasureMaps = await prisma.treasureMap.findMany({
      where: {
        chapterId,
        OR: [{ giverId: id }, { receiverId: id }]
      },
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        giver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      {
        anchors,
        rendezvous,
        chapter,
        treasureMaps,
        user: {
          ...user,
          // Add computed fields
          isProfileComplete,
          membershipDays,
          isExpiringSoon,
          meta: {
            chapterId,
            lastUpdated: user.updatedAt,
            profileCompleteness: {
              isComplete: isProfileComplete,
              missingFields: [
                !user.name?.trim() && 'name',
                !user.company?.trim() && 'company',
                !user.industry?.trim() && 'industry',
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
        sliceName: sliceParley
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while fetching anchors'
      },
      { status: 500 }
    )
  }
}
