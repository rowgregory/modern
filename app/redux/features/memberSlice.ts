import { Reducer, createSlice } from '@reduxjs/toolkit'
import { memberApi } from '../services/memberApi'
import { MemberFilters, MemberListItem, MemberPagination, MemberStats, MemberWithChapter } from '@/types/member'

export interface MemberState {
  // Core data
  members: MemberListItem[]
  member: MemberWithChapter | null
  success: boolean

  // UI state
  loading: boolean
  submitting: boolean
  addMemberDrawer: boolean
  editMemberDrawer: boolean
  viewMemberDrawer: boolean
  manageMembersDrawer: boolean
  noMembers: boolean

  // Filtering & Search
  filters: MemberFilters
  searchQuery: string

  // Pagination
  pagination: MemberPagination

  // Statistics
  stats: MemberStats

  // Error handling
  error: string | null
  fieldErrors: Array<{ field: string; message: string }>
}

export const initialMemberState: MemberState = {
  // Core data
  members: [],
  member: null,
  success: false,

  // UI state
  loading: false,
  submitting: false,
  addMemberDrawer: false,
  editMemberDrawer: false,
  viewMemberDrawer: false,
  manageMembersDrawer: false,
  noMembers: false,

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

export const memberSlice = createSlice({
  name: 'member',
  initialState: initialMemberState,
  reducers: {
    setOpenManageMembersDrawer: (state) => {
      state.manageMembersDrawer = true
    },
    setCloseManageMembersDrawer: (state) => {
      state.manageMembersDrawer = false
    },
    setOpenAddMembersDrawer: (state) => {
      state.addMemberDrawer = true
    },
    setCloseAddMembersDrawer: (state) => {
      state.addMemberDrawer = false
    },
    resetMember: (state) => {
      state.error = null
      state.member = null
    },
    setMembers: (state, { payload }: any) => {
      state.members = payload
      state.stats.total = payload?.length
      state.noMembers = payload?.length === 0
    },
    setMember: (state, { payload }) => {
      state.member = { ...state.member, ...payload }
    },
    resetMemberError: (state) => {
      state.error = null
    },
    removeMemberFromState: (state, action) => {
      state.members = state.members.filter((member) => member.id !== action.payload)
    },
    hydrateMemberState: (state, { payload }) => {
      state.member = { ...state.member, ...payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(memberApi.endpoints.getMembers.matchFulfilled, (state, { payload }: any) => {
        console.log('PAYLOAD: ', payload)
        state.members = payload.members
        state.stats.total = payload.members.length
        state.noMembers = payload.members.length === 0
        state.loading = false
      })
      .addMatcher(memberApi.endpoints.createMember.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(memberApi.endpoints.updateMemberStatus.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(memberApi.endpoints.updateMember.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(memberApi.endpoints.updateMyProfile.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(memberApi.endpoints.deleteMember.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'memberApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const memberReducer = memberSlice.reducer as Reducer<MemberState>

export const {
  setOpenManageMembersDrawer,
  setCloseManageMembersDrawer,
  setOpenAddMembersDrawer,
  setCloseAddMembersDrawer,
  resetMember,
  setMembers,
  setMember,
  resetMemberError,
  removeMemberFromState,
  hydrateMemberState
} = memberSlice.actions
