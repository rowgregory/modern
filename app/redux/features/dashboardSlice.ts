import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface DashboardStatePayload {
  loading: boolean
  manageMembersDrawer: boolean
}

const initialDashboardState: DashboardStatePayload = {
  loading: false,
  manageMembersDrawer: false
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
  reducers: {
    setOpenManageMembersDrawer: (state) => {
      state.manageMembersDrawer = true
    },
    setCloseManageMembersDrawer: (state) => {
      state.manageMembersDrawer = false
    }
  }
})

export const dashboardReducer = dashboardSlice.reducer as Reducer<DashboardStatePayload>

export const { setOpenManageMembersDrawer, setCloseManageMembersDrawer } = dashboardSlice.actions
