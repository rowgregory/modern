import { createSlice } from '@reduxjs/toolkit'
import { settingsApi } from '../services/settingsApi'

interface SettingsState {
  loading: boolean
  error: string | null
  settings: { name: string; location: string; meetingDay: string; meetingTime: string; meetingFrequency: string }
}

const initialState: SettingsState = {
  loading: false,
  error: null,
  settings: { name: '', location: '', meetingDay: '', meetingTime: '', meetingFrequency: 'WEEKKLY' }
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettingsError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(settingsApi.endpoints.getChapterSettings.matchFulfilled, (state, { payload }: any) => {
        console.log('getChapterSettings PAYLOAD: ', payload)
        state.settings = payload.settings
        state.loading = false
      })
      .addMatcher(settingsApi.endpoints.updateChapterSettings.matchFulfilled, (state, { payload }: any) => {
        console.log('updateChapterSettings PAYLOAD: ', payload)
        state.settings = payload
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

export const { resetSettingsError } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
