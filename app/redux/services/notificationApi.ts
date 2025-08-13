import { api } from './api'
import { Notification } from '@/types/notification'

const BASE_URL = '/notification'

export const notificationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNotifications: build.query<{ notification: Notification }, string>({
      query: (chapterId) => `${BASE_URL}/${chapterId}`,
      providesTags: (_, __, chapterId) => [{ type: 'Notification', id: chapterId }]
    })
  })
})

export const { useGetNotificationsQuery } = notificationApi
