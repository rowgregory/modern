import { Reducer, createSlice } from '@reduxjs/toolkit'
import { userApi } from '../services/userApi'
import { User, UserFilters, UserPagination, UserStats } from '@/types/user'

export interface UserState {
  // Core data
  users: User[]
  user: User | null
  success: boolean

  // UI state
  loading: boolean
  submitting: boolean
  addUserDrawer: boolean
  editUserDrawer: boolean
  viewUserDrawer: boolean
  manageUsersDrawer: boolean
  noUsers: boolean

  // Filtering & Search
  filters: UserFilters
  searchQuery: string

  // Pagination
  pagination: UserPagination

  // Statistics
  stats: UserStats

  // Error handling
  error: string | null
  fieldErrors: Array<{ field: string; message: string }>
}

export const initialUserState: UserState = {
  // Core data
  users: [],
  user: null,
  success: false,

  // UI state
  loading: false,
  submitting: false,
  addUserDrawer: false,
  editUserDrawer: false,
  viewUserDrawer: false,
  manageUsersDrawer: false,
  noUsers: false,

  // Filtering & Search
  filters: {
    search: '',
    membershipStatus: 'all',
    chapterId: 'all',
    isActive: undefined,
    interests: [],
    joinedAfter: undefined,
    joinedBefore: undefined,
    expiringWithinDays: undefined
  },
  searchQuery: '',

  // Pagination
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },

  // Statistics
  stats: {
    total: 0,
    active: 0,
    pending: 0,
    expired: 0,
    inactive: 0,
    suspended: 0,
    newThisMonth: 0,
    expiringThisMonth: 0
  },

  // Error handling
  error: null,
  fieldErrors: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setOpenManageUsersDrawer: (state) => {
      state.manageUsersDrawer = true
    },
    setCloseManageUsersDrawer: (state) => {
      state.manageUsersDrawer = false
    },
    setOpenAddUserDrawer: (state) => {
      state.addUserDrawer = true
    },
    setCloseAddUserDrawer: (state) => {
      state.addUserDrawer = false
    },
    resetUser: (state) => {
      state.error = null
      state.user = null
    },
    setUsers: (state, { payload }: any) => {
      state.users = payload
      state.stats.total = payload?.length
      state.noUsers = payload?.length === 0
    },
    setUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    },
    resetUserError: (state) => {
      state.error = null
    },
    hydrateUserState: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    },
    addUserToState: (state, { payload }) => {
      state.users.unshift(payload)
    },
    updateUserInState: (state, action) => {
      const { findById, replaceWith, ...updatedUser } = action.payload

      if (findById && replaceWith) {
        // Special case: find by one ID, replace with different data
        const index = state.users.findIndex((user) => user?.id === findById)
        if (index !== -1) {
          state.users[index] = replaceWith
        }
      } else {
        // Normal update
        const index = state.users.findIndex((user) => user?.id === updatedUser?.id)
        if (index !== -1) {
          state.users[index] = updatedUser
        }
      }
    },
    removeUserFromState: (state, action) => {
      state.users = state.users.filter((user: { id: string }) => user?.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, { payload }: any) => {
        state.users = payload.users
        state.stats.total = payload.users.length
        state.noUsers = payload.users.length === 0
        state.loading = false
      })
      .addMatcher(userApi.endpoints.getMyProfile.matchFulfilled, (state, { payload }: any) => {
        state.user = payload.user
        state.loading = false
      })
      .addMatcher(userApi.endpoints.updateMyProfile.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(userApi.endpoints.createUser.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })

      .addMatcher(userApi.endpoints.deleteUser.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      // .addMatcher(userApi.endpoints.updateUserStatus.matchFulfilled, (state) => {
      //   state.success = true
      //   state.loading = false
      // })
      // .addMatcher(userApi.endpoints.createSkipper.matchFulfilled, (state) => {
      //   state.success = true
      //   state.loading = false
      // })
      // .addMatcher(userApi.endpoints.getSkipperByUserId.matchFulfilled, (state) => {
      //   state.success = true
      //   state.loading = false
      // })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'userApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const userReducer = userSlice.reducer as Reducer<UserState>

export const {
  setOpenManageUsersDrawer,
  setCloseManageUsersDrawer,
  setOpenAddUserDrawer,
  setCloseAddUserDrawer,
  resetUser,
  setUsers,
  setUser,
  resetUserError,
  hydrateUserState,
  addUserToState,
  updateUserInState,
  removeUserFromState
} = userSlice.actions
