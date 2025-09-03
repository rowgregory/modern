import prisma from '@/prisma/client'
import { NotificationType } from '@prisma/client'

export async function createNotification({
  title,
  message,
  type,
  chapterId,
  entityId,
  entityType,
  senderId
}: {
  title: string
  message: string
  type: NotificationType
  chapterId: string
  entityId?: string
  entityType?: string
  senderId: string
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

    return { success: true, notification }
  } catch {
    return { success: false, error: 'Failed to create notification' }
  }
}
