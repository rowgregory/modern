import prisma from '@/prisma/client'

export const markNotificationAsRead = async (notificationId: string, userId: string) => {
  return await prisma.notificationRead.upsert({
    where: {
      notificationId_userId: {
        notificationId,
        userId
      }
    },
    create: {
      notificationId,
      userId
    },
    update: {
      readAt: new Date()
    }
  })
}
