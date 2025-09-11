import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit'

export interface AppStatePayload {
  lastTempId: string
  tempApplication: {
    tempId: string
    submittedDate: string
    formData: any
  } | null
  handbookDrawer: boolean
  mobileNavigation: boolean
}

const initialAppState: AppStatePayload = {
  lastTempId: '',
  tempApplication: null,
  handbookDrawer: false,
  mobileNavigation: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setLastTempId: (state, action) => {
      state.lastTempId = action.payload
    },
    setTempApplication: (state, action: PayloadAction<any>) => {
      const { tempId, ...rest } = action.payload
      state.tempApplication = {
        tempId,
        submittedDate: new Date().toLocaleDateString(),
        formData: rest
      }
    },
    clearTempApplication: (state) => {
      state.tempApplication = null
    },
    setOpenHandbookDrawer: (state) => {
      state.handbookDrawer = true
    },
    setCloseHandbookDrawer: (state) => {
      state.handbookDrawer = false
    },
    setOpenMobileNavigation: (state) => {
      state.mobileNavigation = true
    },
    setCloseMobileNavigation: (state) => {
      state.mobileNavigation = false
    }
  }
})

export const appReducer = appSlice.reducer as Reducer<AppStatePayload>

export const {
  setLastTempId,
  setTempApplication,
  clearTempApplication,
  setOpenHandbookDrawer,
  setCloseHandbookDrawer,
  setOpenMobileNavigation,
  setCloseMobileNavigation
} = appSlice.actions
