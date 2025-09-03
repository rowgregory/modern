import { createNotification } from './createNotification'

// Utility function for consistent date formatting
const formatDateTime = (date: Date): string => `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`

const formatDateOnly = (date: Date): string => date.toLocaleDateString()

export const notificationFactory = {
  parley: {
    request: (requesterName: string, scheduledDate: Date, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'New Parley Request',
        message: `${requesterName} has requested to parley with you on ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_REQUEST',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId
      }),

    confirmed: (recipientName: string, scheduledDate: Date, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'Parley Confirmed',
        message: `${recipientName} has confirmed your parley on ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_CONFIRMED',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId
      }),

    cancelled: (cancellerName: string, scheduledDate: Date, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'Parley Cancelled',
        message: `${cancellerName} has cancelled the parley scheduled for ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_CANCELLED',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId
      }),
    completed: (cancellerName: string, scheduledDate: Date, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'Parley Completed',
        message: `${cancellerName} has completed the parley scheduled for ${formatDateTime(scheduledDate)}`,
        type: 'PARLEY_COMPLETED',
        chapterId,
        entityId,
        entityType: 'parley',
        senderId
      })
  },
  application: {
    submitted: (skipperName: string, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'Skipper Application Submitted',
        message: `${skipperName} has submitted an application on ${formatDateOnly(new Date())}`,
        type: 'APPLICATION_SUBMITTED',
        chapterId,
        entityId,
        entityType: 'application',
        senderId
      }),
    approved: (skipperName: string, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'Skipper Application Approved',
        message: `${skipperName}'s application has been approved on ${formatDateOnly(new Date())}`,
        type: 'APPLICATION_APPROVED',
        chapterId,
        entityId,
        entityType: 'application',
        senderId
      }),
    rejected: (skipperName: string, chapterId: string, entityId: string, senderId: string) =>
      createNotification({
        title: 'Skipper Application Rejected',
        message: `${skipperName}'s application has been rejected on ${formatDateOnly(new Date())}`,
        type: 'APPLICATION_REJECTED',
        chapterId,
        entityId,
        entityType: 'application',
        senderId
      })
  }
}
