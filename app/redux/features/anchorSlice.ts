import { createSlice } from '@reduxjs/toolkit'
import { anchorApi } from '../services/anchorApi'
import { IAnchor } from '@/types/anchor'

interface AnchorState {
  loading: boolean
  error: string | null
  anchors: IAnchor[]
  anchor: IAnchor | null
  anchorDrawer: boolean
}

const initialState: AnchorState = {
  loading: false,
  error: null,
  anchors: [],
  anchor: null,
  anchorDrawer: false
}
export const anchorSlice = createSlice({
  name: 'anchor',
  initialState,
  reducers: {
    resetAnchorError: (state) => {
      state.error = null
    },
    setOpenAnchorDrawer: (state) => {
      state.anchorDrawer = true
    },
    setCloseAnchorDrawer: (state) => {
      state.anchorDrawer = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(anchorApi.endpoints.getAnchors.matchFulfilled, (state, { payload }: any) => {
        state.anchors = payload.anchors
        state.loading = false
      })
      .addMatcher(anchorApi.endpoints.getMyAnchors.matchFulfilled, (state, { payload }: any) => {
        state.anchors = payload.anchors
        state.loading = false
      })
      .addMatcher(anchorApi.endpoints.createAnchor.matchFulfilled, (state) => {
        state.loading = false
      })
      .addMatcher(anchorApi.endpoints.updateAnchor.matchFulfilled, (state) => {
        state.loading = false
      })

      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'anchorApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const { resetAnchorError, setOpenAnchorDrawer, setCloseAnchorDrawer } = anchorSlice.actions
export const anchorReducer = anchorSlice.reducer
