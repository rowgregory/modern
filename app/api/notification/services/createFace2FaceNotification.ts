import { createNotification } from './createNotification'

export const createFace2FaceNotification = {
  request: (requesterName: string, scheduledDate: Date, meetingType: string, chapterId: string, face2faceId: string) =>
    createNotification({
      title: 'New Face-to-Face Meeting Request',
      message: `${requesterName} has requested a ${meetingType.toLowerCase().replace('_', '-')} meeting with you on ${scheduledDate.toLocaleDateString()} at ${scheduledDate.toLocaleTimeString()}`,
      type: 'FACE_TO_FACE_REQUEST',
      chapterId,
      entityId: face2faceId,
      entityType: 'face_to_face'
    }),

  confirmed: (recipientName: string, scheduledDate: Date, chapterId: string, face2faceId: string) =>
    createNotification({
      title: 'Meeting Confirmed',
      message: `${recipientName} has confirmed your meeting on ${scheduledDate.toLocaleDateString()} at ${scheduledDate.toLocaleTimeString()}`,
      type: 'FACE_TO_FACE_CONFIRMED',
      chapterId,
      entityId: face2faceId,
      entityType: 'face_to_face'
    }),

  cancelled: (cancellerName: string, scheduledDate: Date, chapterId: string, face2faceId: string) =>
    createNotification({
      title: 'Meeting Cancelled',
      message: `${cancellerName} has cancelled the meeting scheduled for ${scheduledDate.toLocaleDateString()} at ${scheduledDate.toLocaleTimeString()}`,
      type: 'FACE_TO_FACE_CANCELLED',
      chapterId,
      entityId: face2faceId,
      entityType: 'face_to_face'
    })
}
