import prisma from '@/prisma/client'
import { createNotification } from './createNotification'

// Utility function for consistent date formatting
const formatDateTime = (date: Date): string => `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`

const formatDateOnly = (date: Date): string => date.toLocaleDateString()

const getAdminsAndUser = async (chapterId: string, receiverId?: string) => {
  const admins = await prisma.user.findMany({
    where: {
      chapterId,
      isAdmin: true
    },
    select: { id: true }
  })

  const recipients = [...admins.map((admin) => admin.id), ...(receiverId ? [receiverId] : [])]

  return [...new Set(recipients)] // Remove duplicates
}

export const notificationFactory = {
  parley: {
    request: (
      requesterName: string,
      scheduledDate: Date,
      chapterId: string,
      entityId: string,
      senderId: string,
      recipientId: string
    ) =>
      createNotification({
        title: 'New Parley Request',
        message: `${requesterName} has requested to parley with you on ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_REQUEST',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId,
        recipientIds: [recipientId]
      }),

    confirmed: (
      recipientName: string,
      scheduledDate: Date,
      chapterId: string,
      entityId: string,
      senderId: string,
      recipientId: string
    ) =>
      createNotification({
        title: 'Parley Confirmed',
        message: `${recipientName} has confirmed your parley on ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_CONFIRMED',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId,
        recipientIds: [recipientId]
      }),

    cancelled: (
      cancellerName: string,
      scheduledDate: Date,
      chapterId: string,
      entityId: string,
      senderId: string,
      recipientId: string
    ) =>
      createNotification({
        title: 'Parley Cancelled',
        message: `${cancellerName} has cancelled the parley scheduled for ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_CANCELLED',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId,
        recipientIds: [recipientId]
      }),
    completed: (
      cancellerName: string,
      scheduledDate: Date,
      chapterId: string,
      entityId: string,
      senderId: string,
      recipientId: string
    ) =>
      createNotification({
        title: 'Parley Completed',
        message: `${cancellerName} has completed the parley scheduled for ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_COMPLETED',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId,
        recipientIds: [recipientId]
      })
  },
  application: {
    submitted: async (skipperName: string, chapterId: string, entityId: string, senderId: string) => {
      const recipientIds = await getAdminsAndUser(chapterId)

      return createNotification({
        title: 'Skipper Application Submitted',
        message: `${skipperName} has submitted an application on ${formatDateOnly(new Date())}`,
        type: 'APPLICATION_SUBMITTED',
        chapterId,
        entityId,
        entityType: 'application',
        senderId,
        recipientIds
      })
    },
    approved: async (skipperName: string, chapterId: string, entityId: string, senderId: string) => {
      const recipientIds = await getAdminsAndUser(chapterId)

      return createNotification({
        title: 'Skipper Application Approved',
        message: `${skipperName}'s application has been approved on ${formatDateOnly(new Date())}`,
        type: 'APPLICATION_APPROVED',
        chapterId,
        entityId,
        entityType: 'application',
        senderId,
        recipientIds
      })
    },
    rejected: async (skipperName: string, chapterId: string, entityId: string, senderId: string) => {
      const recipientIds = await getAdminsAndUser(chapterId)
      return createNotification({
        title: 'Skipper Application Rejected',
        message: `${skipperName}'s application has been rejected on ${formatDateOnly(new Date())}`,
        type: 'APPLICATION_REJECTED',
        chapterId,
        entityId,
        entityType: 'application',
        senderId,
        recipientIds
      })
    }
  },
  anchor: {
    reported: async (giverName: string, chapterId: string, entityId: string, senderId: string, receiverId: string) => {
      const recipientIds = await getAdminsAndUser(chapterId, receiverId)

      return createNotification({
        title: 'Anchor Dropped',
        message: `${giverName} has dropped an anchor on ${formatDateOnly(new Date())}`,
        type: 'ANCHOR_REPORTED',
        chapterId,
        entityId,
        entityType: 'anchor',
        senderId,
        recipientIds
      })
    },
    verified: async (chapterId: string, entityId: string, senderId: string, receiverId: string) => {
      const recipientIds = await getAdminsAndUser(chapterId, receiverId)

      return createNotification({
        title: 'Anchor Verified',
        message: `Admin navigators have verified your anchor drop on ${formatDateOnly(new Date())}`,
        type: 'ANCHOR_VERIFIED',
        chapterId,
        entityId,
        entityType: 'anchor',
        senderId,
        recipientIds
      })
    },
    disputed: async (chapterId: string, entityId: string, senderId: string, receiverId: string) => {
      const recipientIds = await getAdminsAndUser(chapterId, receiverId)

      return createNotification({
        title: 'Anchor Disputed',
        message: `Admin navigators have disputed your anchor drop on ${formatDateOnly(new Date())}`,
        type: 'ANCHOR_DISPUTED',
        chapterId,
        entityId,
        entityType: 'anchor',
        senderId,
        recipientIds
      })
    }
  }
}
