import prisma from '@/prisma/client'
import { NotificationType } from '@prisma/client'

export async function createNotification({
  title,
  message,
  type,
  chapterId,
  entityId,
  entityType,
  senderId,
  recipientIds
}: {
  title: string
  message: string
  type: NotificationType
  chapterId: string
  entityId?: string
  entityType?: string
  senderId: string
  recipientIds?: string[]
}) {
  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        chapterId,
        entityId,
        entityType,
        senderId
      }
    })

    // If specific recipients are provided, create NotificationRead entries
    if (recipientIds && recipientIds.length > 0) {
      await prisma.notificationRead.createMany({
        data: recipientIds.map((userId) => ({
          notificationId: notification.id,
          userId,
          readAt: new Date() // Delivered, but not read yet
        }))
      })
    }

    return { success: true, notification }
  } catch {
    return { success: false, error: 'Failed to create notification' }
  }
}
