import { DeleteUserResponse, UserFilters, UserFormData, UpdateUserResponse } from '@/types/user'
import { api } from './api'
import { createOptimisticHandlers } from '@/app/lib/utils/api/createOptimisticHandlers'

const BASE_URL = '/user'

let userHandlers: any = null
let handlersPromise: Promise<any> | null = null

const getUserHandlers = async () => {
  if (userHandlers) {
    return userHandlers
  }

  if (!handlersPromise) {
    handlersPromise = (async () => {
      // Dynamic imports for ES modules
      const [{ addUserToState, updateUserInState, removeUserFromState }] = await Promise.all([
        import('../features/userSlice')
      ])

      const userConfig = {
        addAction: addUserToState,
        updateAction: updateUserInState,
        removeAction: removeUserFromState,
        responseKey: 'user',
        getEntityFromState: (state: { user: { users: any[] } }, id: any) =>
          state.user.users.find((user) => user.id === id)
      }

      userHandlers = createOptimisticHandlers(userConfig)
      return userHandlers
    })()
  }

  return handlersPromise
}

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUsers: build.query({
      query: (filters: UserFilters) => ({
        url: `${BASE_URL}/${filters.chapterId}`,
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
      query: ({ chapterId, id }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/me`
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
      query: ({ chapterId, id, ...profileData }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/me`,
        method: 'PUT',
        body: profileData
      }),
      invalidatesTags: (_, __, { chapterId, id }) => [
        { type: 'User', id }, // Invalidate the specific user/user
        { type: 'User', id: 'ME' }, // Invalidate "my profile" queries
        { type: 'User', id: `${chapterId}-ME` }, // Invalidate chapter-specific "my profile"
        { type: 'User', id: 'LIST' } // Optional: invalidate user lists if profile data shows there
      ]
    }),
    createUser: build.mutation({
      query: (userData) => ({
        url: `${BASE_URL}/${userData.chapterId}/create`,
        method: 'POST',
        body: userData
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    updateUserStatus: build.mutation<UpdateUserResponse, { chapterId: string; id: string; status: string }>({
      query: ({ chapterId, id, status }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/status`,
        method: 'PATCH',
        body: { usershipStatus: status }
      }),
      invalidatesTags: (_, __, { id }: { id: string }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' }
      ]
    }),
    updateUser: build.mutation<UpdateUserResponse, { chapterId: string; id: string; data: Partial<UserFormData> }>({
      query: ({ chapterId, id, data }) => ({
        url: `${BASE_URL}/${chapterId}/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { id }: { id: string }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' }
      ]
    }),
    deleteUser: build.mutation<DeleteUserResponse, { chapterId: string; id: string }>({
      query: ({ chapterId, id }) => ({
        url: `${BASE_URL}/${chapterId}/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    createExplorer: build.mutation({
      query: ({ chapterId, ...rest }) => ({
        url: `${BASE_URL}/${chapterId}/explorer`,
        method: 'POST',
        body: rest
      }),
      onQueryStarted: async (data: any, { dispatch, queryFulfilled }: any) => {
        const handlers = await getUserHandlers()
        await handlers.handleCreate(dispatch)(data, queryFulfilled)
      }
    }),
    getExplorerByTempId: build.query({
      query: ({ chapterId, tempId }) => ({
        url: `${BASE_URL}/${chapterId}/explorer/${tempId}`
      })
    })
  })
})

export const {
  useGetUsersQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useCreateUserMutation,
  useUpdateUserStatusMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateExplorerMutation,
  useGetExplorerByTempIdQuery
} = userApi
