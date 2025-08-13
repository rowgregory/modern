import { sliceNotification } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET(_: any, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId

    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Fetch users with pagination
    const notifications = await prisma.notification.findMany({
      where,
      include: {
        readBy: {
          where: { userId: 'cmeagq2ea0013104ist9eku96' },
          select: {
            id: true,
            readAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform to show read status for current user
    const notificationsWithReadStatus = notifications.map((notification) => ({
      ...notification,
      isReadByUser: notification.readBy.length > 0, // If readBy array has items, user has read it
      readBy: undefined // Remove from response
    }))

    // Count unread for current user
    const unreadCount = await prisma.notification.count({
      where: {
        ...where,
        readBy: {
          none: { userId: 'cmeagq2ea0013104ist9eku96' } // Notifications with NO read record for this user
        }
      }
    })

    return NextResponse.json(
      {
        notifications: notificationsWithReadStatus,
        unreadCount,
        sliceName: sliceNotification
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while fetching notifications',
        sliceName: sliceNotification
      },
      { status: 500 }
    )
  }
}
