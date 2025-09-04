import { DeleteUserResponse, UserFilters, UserFormData, UpdateUserResponse } from '@/types/user'
import { api } from './api'

const BASE_URL = '/user'

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUsers: build.query({
      query: (filters: UserFilters) => ({
        url: `${BASE_URL}/${filters.chapterId}/get-users-list`,
        params: { ...filters }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }: { id: string }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' }
            ]
          : [{ type: 'User', id: 'LIST' }]
    }),
    getMyProfile: build.query({
      query: ({ chapterId, userId }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/me/get-my-profile`
      }),
      providesTags: (result, __, { chapterId }) =>
        result
          ? [
              { type: 'User', id: result.id }, // Tag for the specific user/user
              { type: 'User', id: 'ME' }, // Tag for "my profile" queries
              { type: 'User', id: `${chapterId}-ME` } // Chapter-specific "my profile"
            ]
          : [{ type: 'User', id: 'ME' }]
    }),
    updateMyProfile: build.mutation({
      query: ({ chapterId, userId, ...profileData }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/me/update-my-profile`,
        method: 'PUT',
        body: profileData
      }),
      invalidatesTags: (_, __, { chapterId, userId }) => [
        { type: 'User', userId }, // Invalidate the specific user/user
        { type: 'User', userId: 'ME' }, // Invalidate "my profile" queries
        { type: 'User', userId: `${chapterId}-ME` }, // Invalidate chapter-specific "my profile"
        { type: 'User', userId: 'LIST' } // Optional: invalidate user lists if profile data shows there
      ]
    }),
    createUser: build.mutation({
      query: (userData) => ({
        url: `${BASE_URL}/${userData.chapterId}/create-user`,
        method: 'POST',
        body: userData
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    getUserById: build.query({
      query: ({ chapterId, userId }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/get-user-by-id`
      })
    }),
    updateUser: build.mutation<UpdateUserResponse, { chapterId: string; userId: string; data: Partial<UserFormData> }>({
      query: ({ chapterId, userId, ...data }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/update-user`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (_, __, { userId }: { userId: string }) => [
        { type: 'User', userId },
        { type: 'User', userId: 'LIST' }
      ]
    }),
    deleteUser: build.mutation<DeleteUserResponse, { chapterId: string; userId: string }>({
      query: ({ chapterId, userId }) => ({
        url: `${BASE_URL}/${chapterId}/${userId}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: (_, __, { userId }: { userId: string }) => [
        { type: 'User', userId },
        { type: 'User', userId: 'LIST' }
      ]
    })
  })
})

export const {
  useGetUsersQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi
