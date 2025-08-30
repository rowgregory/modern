import prisma from '@/prisma/client'

export const getUserNotifications = async (userId: string, chapterId: string) => {
  return await prisma.notification.findMany({
    where: {
      chapterId
    },
    include: {
      readBy: {
        where: {
          userId
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
