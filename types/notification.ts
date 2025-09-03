// types/notification.ts

export enum NotificationType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_APPROVED = 'APPLICATION_APPROVED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  NEW_MEMBER = 'NEW_MEMBER',
  SYSTEM_ALERT = 'SYSTEM_ALERT'
}

export interface NotificationRead {
  id: string
  notificationId: string
  userId: string
  readAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  isReadByUser: boolean
  entityId?: string | null
  entityType?: string | null
  readBy: NotificationRead[]
  createdAt: Date
  updatedAt: Date
}

// For API responses that include read status for current user
export interface NotificationWithReadStatus extends Omit<Notification, 'readBy'> {
  isReadByUser: boolean
}

// For creating new notifications
export interface CreateNotificationData {
  title: string
  message: string
  type: NotificationType
  entityId?: string
  entityType?: string
}

// For notification API responses
export interface NotificationResponse {
  notifications: NotificationWithReadStatus[]
  unreadCount: number
}
