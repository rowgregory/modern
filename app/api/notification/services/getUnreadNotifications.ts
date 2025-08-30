import prisma from '@/prisma/client'

export const getUnreadNotifications = async (userId: string, chapterId: string) => {
  return await prisma.notification.findMany({
    where: {
      chapterId,
      readBy: {
        none: {
          userId
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      readBy: true
    }
  })
}
