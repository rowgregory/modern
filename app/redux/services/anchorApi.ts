import { api } from './api'

const BASE_URL = '/anchor'

export const anchorApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAnchors: build.query({
      query: ({ chapterId }) => `${BASE_URL}/${chapterId}/get-anchors-list`,
      providesTags: (_, __, { chapterId }) => [{ type: 'Anchor' as const, id: chapterId }]
    }),

    getMyAnchors: build.query({
      query: ({ chapterId, userId }) => `${BASE_URL}/${chapterId}/${userId}/get-my-anchors`,
      providesTags: (result, __, { chapterId, userId }) => [
        { type: 'Anchor' as const, id: `${chapterId}-${userId}` },
        ...(result?.anchors || []).map((anchor: { id: any }) => ({
          type: 'Anchor' as const,
          id: anchor.id
        }))
      ]
    }),

    createAnchor: build.mutation({
      query: ({ chapterId, userId, ...anchor }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/create-anchor`,
        method: 'POST',
        body: anchor
      }),
      invalidatesTags: (_, __, { chapterId, giverId, receiverId }) => [
        { type: 'Anchor' as const, id: chapterId },
        { type: 'Anchor' as const, id: `${chapterId}-${giverId}` },
        { type: 'Anchor' as const, id: `${chapterId}-${receiverId}` }
      ]
    }),

    updateAnchor: build.mutation({
      query: ({ chapterId, userId, anchorId, ...updateData }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/update-anchor`,
        method: 'PUT',
        body: { anchorId, ...updateData }
      }),
      invalidatesTags: (_, __, { chapterId, userId }) => [
        { type: 'Anchor' as const, id: chapterId },
        { type: 'Anchor' as const, id: `${chapterId}-${userId}` }
      ]
    })
  })
})

export const { useGetAnchorsQuery, useGetMyAnchorsQuery, useCreateAnchorMutation, useUpdateAnchorMutation } = anchorApi
