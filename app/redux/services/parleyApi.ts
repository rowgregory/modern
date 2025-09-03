import { api } from './api'

const BASE_URL = '/parley'

export const parleyApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getParleys: build.query({
      query: ({ chapterId }) => `${BASE_URL}/${chapterId}`,
      providesTags: (_, __, { chapterId }) => [{ type: 'Parley' as const, id: chapterId }]
    }),

    getMyParleys: build.query({
      query: ({ chapterId, userId }) => `${BASE_URL}/${chapterId}/${userId}`,
      providesTags: (result, __, { chapterId, userId }) => [
        { type: 'Parley' as const, id: `${chapterId}-${userId}` },
        ...(result?.parleys || []).map((parley: { id: any }) => ({
          type: 'Parley' as const,
          id: parley.id
        }))
      ]
    }),

    createParley: build.mutation({
      query: ({ chapterId, ...parley }) => ({
        url: `${BASE_URL}/${chapterId}/create`,
        method: 'POST',
        body: parley
      }),
      invalidatesTags: (_, __, { chapterId, requesterId, recipientId }) => [
        { type: 'Parley' as const, id: chapterId },
        { type: 'Parley' as const, id: `${chapterId}-${requesterId}` },
        { type: 'Parley' as const, id: `${chapterId}-${recipientId}` }
      ]
    }),

    updateParley: build.mutation({
      query: ({ chapterId, userId, parleyId, ...updateData }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/update`,
        method: 'PUT',
        body: { parleyId, ...updateData }
      }),
      invalidatesTags: (_, __, { chapterId, userId }) => [
        { type: 'Parley' as const, id: chapterId },
        { type: 'Parley' as const, id: `${chapterId}-${userId}` }
      ]
    }),

    updateParleyStatus: build.mutation({
      query: ({ chapterId, userId, parleyId, status }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/update-status`,
        method: 'PATCH',
        body: { parleyId, status }
      }),
      invalidatesTags: (result, __, { chapterId, userId }) => [
        { type: 'Parley' as const, id: chapterId },
        { type: 'Parley' as const, id: `${chapterId}-${userId}` },
        // Also invalidate the other participant's cache
        ...(result?.parley
          ? [
              { type: 'Parley' as const, id: `${chapterId}-${result.parley.requesterId}` },
              { type: 'Parley' as const, id: `${chapterId}-${result.parley.recipientId}` }
            ]
          : [])
      ]
    })
  })
})

export const {
  useGetParleysQuery,
  useGetMyParleysQuery,
  useCreateParleyMutation,
  useUpdateParleyMutation,
  useUpdateParleyStatusMutation
} = parleyApi
