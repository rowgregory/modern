import { DeleteMemberResponse, MemberFilters, MemberFormData, UpdateMemberResponse } from '@/types/member'
import { api } from './api'

const BASE_URL = '/member'

export const memberApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMembers: build.query({
      query: (filters: MemberFilters) => ({
        url: `${BASE_URL}/${filters.chapterId}`,
        params: { ...filters }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.members.map(({ id }: { id: string }) => ({ type: 'Member' as const, id })),
              { type: 'Member', id: 'LIST' }
            ]
          : [{ type: 'Member', id: 'LIST' }]
    }),
    getMyProfile: build.query({
      query: ({ chapterId, id }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/me`
      }),
      providesTags: (result, __, { chapterId }) =>
        result
          ? [
              { type: 'Member', id: result.id }, // Tag for the specific user/member
              { type: 'Member', id: 'ME' }, // Tag for "my profile" queries
              { type: 'Member', id: `${chapterId}-ME` } // Chapter-specific "my profile"
            ]
          : [{ type: 'Member', id: 'ME' }]
    }),
    updateMyProfile: build.mutation({
      query: ({ chapterId, id, ...profileData }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/me`,
        method: 'PUT',
        body: profileData
      }),
      invalidatesTags: (_, __, { chapterId, id }) => [
        { type: 'Member', id }, // Invalidate the specific user/member
        { type: 'Member', id: 'ME' }, // Invalidate "my profile" queries
        { type: 'Member', id: `${chapterId}-ME` }, // Invalidate chapter-specific "my profile"
        { type: 'Member', id: 'LIST' } // Optional: invalidate member lists if profile data shows there
      ]
    }),
    createMember: build.mutation({
      query: (memberData) => ({
        url: `${BASE_URL}/${memberData.chapterId}/create`,
        method: 'POST',
        body: memberData
      }),
      invalidatesTags: [{ type: 'Member', id: 'LIST' }]
    }),
    updateMemberStatus: build.mutation<UpdateMemberResponse, { chapterId: string; id: string; status: string }>({
      query: ({ chapterId, id, status }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/status`,
        method: 'PATCH',
        body: { membershipStatus: status }
      }),
      invalidatesTags: (_, __, { id }: { id: string }) => [
        { type: 'Member', id },
        { type: 'Member', id: 'LIST' }
      ]
    }),
    updateMember: build.mutation<
      UpdateMemberResponse,
      { chapterId: string; id: string; data: Partial<MemberFormData> }
    >({
      query: ({ chapterId, id, data }) => ({
        url: `${BASE_URL}/${chapterId}/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { id }: { id: string }) => [
        { type: 'Member', id },
        { type: 'Member', id: 'LIST' }
      ]
    }),
    deleteMember: build.mutation<DeleteMemberResponse, { chapterId: string; id: string }>({
      query: ({ chapterId, id }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Member', id: 'LIST' }]
    })
  })
})

export const {
  useGetMembersQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useCreateMemberMutation,
  useUpdateMemberStatusMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation
} = memberApi
