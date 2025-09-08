import { api } from './api'

const BASE_URL = '/treasure-map'

export const treasureMapApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTreasureMaps: build.query({
      query: ({ chapterId }) => `${BASE_URL}/${chapterId}/get-treasure-maps-list`,
      providesTags: (_, __, { chapterId }) => [{ type: 'Treasure-Map' as const, id: chapterId }]
    }),

    getMyTreasureMaps: build.query({
      query: ({ chapterId, userId }) => `${BASE_URL}/${chapterId}/${userId}/get-my-treasure-maps`,
      providesTags: (result, __, { chapterId, userId }) => [
        { type: 'Treasure-Map' as const, id: `${chapterId}-${userId}` },
        ...(result?.treasureMaps || []).map((treasureMap: { id: any }) => ({
          type: 'Treasure-Map' as const,
          id: treasureMap.id
        }))
      ]
    }),

    createTreasureMap: build.mutation({
      query: ({ chapterId, ...treasureMap }) => ({
        url: `${BASE_URL}/${chapterId}/create-treasure-map`,
        method: 'POST',
        body: treasureMap
      }),
      invalidatesTags: (_, __, { chapterId, requesterId, recipientId }) => [
        { type: 'Treasure-Map' as const, id: chapterId },
        { type: 'Treasure-Map' as const, id: `${chapterId}-${requesterId}` },
        { type: 'Treasure-Map' as const, id: `${chapterId}-${recipientId}` }
      ]
    }),

    updateTreasureMap: build.mutation({
      query: ({ chapterId, userId, treasureMapId, ...updateData }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/update-treasure-map`,
        method: 'PUT',
        body: { treasureMapId, ...updateData }
      }),
      invalidatesTags: (_, __, { chapterId, userId }) => [
        { type: 'Treasure-Map' as const, id: chapterId },
        { type: 'Treasure-Map' as const, id: `${chapterId}-${userId}` }
      ]
    }),

    updateTreasureMapStatus: build.mutation({
      query: ({ chapterId, userId, treasureMapId, status }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/update-treasure-map-status`,
        method: 'PATCH',
        body: { treasureMapId, status }
      }),
      invalidatesTags: (result, __, { chapterId, userId }) => [
        { type: 'Treasure-Map' as const, id: chapterId },
        { type: 'Treasure-Map' as const, id: `${chapterId}-${userId}` },
        // Also invalidate the other participant's cache
        ...(result?.treasureMap
          ? [
              { type: 'Treasure-Map' as const, id: `${chapterId}-${result.treasureMap.requesterId}` },
              { type: 'Treasure-Map' as const, id: `${chapterId}-${result.treasureMap.recipientId}` }
            ]
          : [])
      ]
    })
  })
})

export const {
  useGetTreasureMapsQuery,
  useGetMyTreasureMapsQuery,
  useCreateTreasureMapMutation,
  useUpdateTreasureMapMutation,
  useUpdateTreasureMapStatusMutation
} = treasureMapApi
