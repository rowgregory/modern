import { sliceNotification } from '@/app/lib/constants/api/sliceNames'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import prisma from '@/prisma/client'
import { NotificationType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const adminOnlyApplications: NotificationType[] = [
  NotificationType.APPLICATION_SUBMITTED,
  NotificationType.APPLICATION_APPROVED,
  NotificationType.APPLICATION_REJECTED
]

export async function GET(req: NextRequest, { params }: any) {
  try {
    const userAuth = getUserFromHeader({ req })

    if (!userAuth.success) {
      return userAuth.response!
    }

    const parameters = await params
    const chapterId = parameters.chapterId

    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Filter out 'application' type notifications for non-admin users
    if (!userAuth.user.isAdmin) {
      where.entityType = {
        notIn: adminOnlyApplications
      }
    }

    const notifications = await prisma.notification.findMany({
      where: {
        ...where,
        NOT: {
          senderId: userAuth.user.id // 👈 exclude notifications sent by the logged-in user
        },
        OR: [
          // 1. Targeted notifications where you're a recipient
          {
            readBy: {
              some: { userId: userAuth.user.id } // You have a NotificationRead entry
            }
          },
          // 2. Broadcast notifications (no specific recipients)
          {
            readBy: {
              none: {} // No NotificationRead entries exist = visible to all
            }
          }
        ]
      },
      include: {
        readBy: {
          where: { userId: userAuth.user.id },
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
        chapterId,
        NOT: {
          senderId: userAuth.user.id
        },
        OR: [
          // Targeted notifications where user is recipient but hasn't been marked as read
          {
            readBy: {
              some: {
                userId: userAuth.user.id,
                isRead: false
              }
            }
          },
          // Broadcast notifications with no read record for this user
          {
            readBy: {
              none: {}
            },
            ...(!userAuth.user.isAdmin && {
              entityType: {
                notIn: adminOnlyApplications
              }
            })
          }
        ]
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
