import prisma from '@/prisma/client'

interface MarkAsReadResponse {
  success: boolean
  message: string
  data?: {
    notificationId: string
    userId: string
    readAt: Date
  }
  error?: string
}

const markNotificationAsRead = async (notificationId: string, userId: string): Promise<MarkAsReadResponse> => {
  try {
    // First, verify the notification exists
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      select: {
        id: true,
        title: true,
        chapterId: true
      }
    })

    if (!notification) {
      return {
        success: false,
        message: 'Notification not found'
      }
    }

    // Check if user has already marked this notification as read
    const existingRead = await prisma.notificationRead.findUnique({
      where: {
        notificationId_userId: {
          notificationId,
          userId
        }
      }
    })

    if (existingRead) {
      return {
        success: true,
        message: 'Notification already marked as read',
        data: {
          notificationId: existingRead.notificationId,
          userId: existingRead.userId,
          readAt: existingRead.readAt
        }
      }
    }

    // Create the notification read record
    const notificationRead = await prisma.notificationRead.create({
      data: {
        notificationId,
        userId
      }
    })

    return {
      success: true,
      message: 'Notification marked as read successfully',
      data: {
        notificationId: notificationRead.notificationId,
        userId: notificationRead.userId,
        readAt: notificationRead.readAt
      }
    }
  } catch (error) {
    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes('Foreign key constraint')) {
      return {
        success: false,
        message: 'Invalid user ID or notification ID'
      }
    }

    return {
      success: false,
      message: 'Failed to mark notification as read',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export default markNotificationAsRead
