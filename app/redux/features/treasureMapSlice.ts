import { createSlice } from '@reduxjs/toolkit'
import { initialTreasureMapState } from '@/types/treasure-map'
import { treasureMapApi } from '../services/treasureMapApi'

export const treasureMapSlice = createSlice({
  name: 'treasureMap',
  initialState: initialTreasureMapState,
  reducers: {
    resetTreasureMapError: (state) => {
      state.error = null
    },
    setOpenTreasureMapDrawer: (state) => {
      state.treasureMapDrawer = true
    },
    setCloseTreasureMapDrawer: (state) => {
      state.treasureMapDrawer = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(treasureMapApi.endpoints.getTreasureMaps.matchFulfilled, (state, { payload }: any) => {
        state.treasureMaps = payload.treasureMaps
        state.loading = false
      })
      .addMatcher(treasureMapApi.endpoints.getMyTreasureMaps.matchFulfilled, (state, { payload }: any) => {
        state.treasureMaps = payload.treasureMaps
        state.loading = false
      })
      .addMatcher(treasureMapApi.endpoints.createTreasureMap.matchFulfilled, (state) => {
        state.loading = false
      })
      .addMatcher(treasureMapApi.endpoints.updateTreasureMap.matchFulfilled, (state) => {
        state.loading = false
      })

      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'treasureMapApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const { resetTreasureMapError, setOpenTreasureMapDrawer, setCloseTreasureMapDrawer } = treasureMapSlice.actions
export const treasureMapReducer = treasureMapSlice.reducer
