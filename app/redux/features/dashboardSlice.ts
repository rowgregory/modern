import { createSlice } from '@reduxjs/toolkit'
import { dashboardApi } from '../services/dashboardApi'

interface DashboardState {
  loading: boolean
  error: string | null
  totalMembers: string
  totalMembersChange: string
  totalRevenue: string
  totalRevenueChange: string
  conversionRate: string
  conversionChangePercent: string
  chapterHealth: string
  healthChangePercent: string
  totalParleys: string
  parleysChangePercent: string
  totalTreasureMaps: string
  treasureMapsChangePercent: string
  totalAnchors: string
  anchorsChangePercent: string
  memberRetention: string
  retentionChangePercent: string
  weeklyActivity: any[]
  industrySlots: any[]
  capacityPercent: string
  activeUsersCount: string
  participationPercent: string
  buckets: any[]
  topPerformers: any[]
  newApplicationsCount: string
  parleyRequestsCount: string
}

const initialState: DashboardState = {
  loading: true,
  error: null,
  totalMembers: '0',
  totalMembersChange: '',
  totalRevenue: '',
  totalRevenueChange: '',
  conversionRate: '',
  conversionChangePercent: '',
  chapterHealth: '',
  healthChangePercent: '',
  totalParleys: '',
  parleysChangePercent: '',
  totalTreasureMaps: '',
  treasureMapsChangePercent: '',
  totalAnchors: '',
  anchorsChangePercent: '',
  memberRetention: '',
  retentionChangePercent: '',
  weeklyActivity: [],
  industrySlots: [],
  capacityPercent: '',
  activeUsersCount: '',
  participationPercent: '',
  buckets: [],
  topPerformers: [],
  newApplicationsCount: '',
  parleyRequestsCount: ''
}
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(dashboardApi.endpoints.listAdminStats.matchFulfilled, (state, { payload }: any) => {
        state.totalMembers = payload.totalMembers
        state.totalMembersChange = payload.totalMembersChange
        state.totalRevenue = payload.totalRevenue
        state.totalRevenueChange = payload.totalRevenueChange
        state.conversionRate = payload.conversionRate
        state.conversionChangePercent = payload.conversionChangePercent
        state.chapterHealth = payload.chapterHealth
        state.healthChangePercent = payload.healthChangePercent
        state.totalParleys = payload.totalParleys
        state.parleysChangePercent = payload.parleysChangePercent
        state.totalTreasureMaps = payload.totalTreasureMaps
        state.treasureMapsChangePercent = payload.treasureMapsChangePercent
        state.totalAnchors = payload.totalAnchors
        state.anchorsChangePercent = payload.anchorsChangePercent
        state.memberRetention = payload.memberRetention
        state.retentionChangePercent = payload.retentionChangePercent
        state.weeklyActivity = payload.weeklyActivity
        state.industrySlots = payload.industrySlots
        state.capacityPercent = payload.capacityPercent
        state.activeUsersCount = payload.activeUsersCount
        state.participationPercent = payload.participationPercent
        state.buckets = payload.buckets
        state.topPerformers = payload.topPerformers
        state.newApplicationsCount = payload.newApplicationsCount
        state.parleyRequestsCount = payload.parleyRequestsCount
        state.loading = false
      })
      .addMatcher(dashboardApi.endpoints.listMemberStats.matchFulfilled, (state, { payload }: any) => {
        state.totalParleys = payload.totalParleys
        state.totalTreasureMaps = payload.totalTreasureMaps
        state.totalAnchors = payload.totalAnchors
        state.loading = false
      })

      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'dashboardApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const {} = dashboardSlice.actions
export const dashboardReducer = dashboardSlice.reducer
