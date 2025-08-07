import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Face2FaceFilters {
  status: string
  type: string
  search: string
  dateRange: {
    start: string | null
    end: string | null
  }
}

export interface Face2FaceMeeting {
  id: string
  createdAt: string
  updatedAt: string
  scheduledAt: string
  duration: number
  location: string | null
  meetingType: 'FACE_TO_FACE' | 'VIRTUAL' | 'PHONE'
  requesterId: string
  requester: {
    id: string
    name: string
    email: string
    phone: string | null
    company: string
    profession: string
  }
  recipientId: string
  recipient: {
    id: string
    name: string
    email: string
    phone: string | null
    company: string
    profession: string
  }
  status: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  completed: boolean
  completedAt: string | null
  referralGiven: boolean
  referralReceived: boolean
  followUpRequired: boolean
  notes: string | null
  requesterNotes: string | null
  recipientNotes: string | null
  chapterId: string | null
}

export interface Face2FaceStatePayload {
  loading: boolean
  submitting: boolean
  face2FaceDrawer: boolean
  selectedMeeting: Face2FaceMeeting | null
  meetings: Face2FaceMeeting[]
  filters: Face2FaceFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  error: string | null
}

const initialFace2FaceState: Face2FaceStatePayload = {
  loading: false,
  submitting: false,
  face2FaceDrawer: false,
  selectedMeeting: null,
  meetings: [],
  filters: {
    status: 'all',
    type: 'all',
    search: '',
    dateRange: {
      start: null,
      end: null
    }
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },
  error: null
}

export const face2FaceSlice = createSlice({
  name: 'face2Face',
  initialState: initialFace2FaceState,
  reducers: {
    // Drawer management
    openFace2FaceDrawer: (state) => {
      state.face2FaceDrawer = true
    },
    closeFace2FaceDrawer: (state) => {
      state.face2FaceDrawer = false
      state.selectedMeeting = null
      state.error = null
    },
    toggleFace2FaceDrawer: (state) => {
      state.face2FaceDrawer = !state.face2FaceDrawer
      if (!state.face2FaceDrawer) {
        state.selectedMeeting = null
        state.error = null
      }
    },

    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload
    },

    // Meeting management
    setMeetings: (state, action: PayloadAction<Face2FaceMeeting[]>) => {
      state.meetings = action.payload
    },
    addMeeting: (state, action: PayloadAction<Face2FaceMeeting>) => {
      state.meetings.unshift(action.payload)
      state.pagination.total += 1
    },
    updateMeeting: (state, action: PayloadAction<Face2FaceMeeting>) => {
      const index = state.meetings.findIndex((meeting) => meeting.id === action.payload.id)
      if (index !== -1) {
        state.meetings[index] = action.payload
      }
    },
    removeMeeting: (state, action: PayloadAction<string>) => {
      state.meetings = state.meetings.filter((meeting) => meeting.id !== action.payload)
      state.pagination.total -= 1
    },
    setSelectedMeeting: (state, action: PayloadAction<Face2FaceMeeting | null>) => {
      state.selectedMeeting = action.payload
    },

    // Filters
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
      state.pagination.page = 1 // Reset to first page when filtering
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.filters.type = action.payload
      state.pagination.page = 1
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1
    },
    setDateRangeFilter: (state, action: PayloadAction<{ start: string | null; end: string | null }>) => {
      state.filters.dateRange = action.payload
      state.pagination.page = 1
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        type: 'all',
        search: '',
        dateRange: {
          start: null,
          end: null
        }
      }
      state.pagination.page = 1
    },

    // Pagination
    setPagination: (state, action: PayloadAction<Partial<Face2FaceStatePayload['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload
      state.pagination.page = 1 // Reset to first page when changing limit
    },

    // Meeting status updates
    confirmMeeting: (state, action: PayloadAction<string>) => {
      const meeting = state.meetings.find((m) => m.id === action.payload)
      if (meeting) {
        meeting.status = 'CONFIRMED'
        meeting.updatedAt = new Date().toISOString()
      }
    },
    completeMeeting: (
      state,
      action: PayloadAction<{
        id: string
        completedAt: string
        referralGiven?: boolean
        referralReceived?: boolean
        followUpRequired?: boolean
        notes?: string
      }>
    ) => {
      const meeting = state.meetings.find((m) => m.id === action.payload.id)
      if (meeting) {
        meeting.status = 'COMPLETED'
        meeting.completed = true
        meeting.completedAt = action.payload.completedAt
        meeting.updatedAt = new Date().toISOString()

        if (action.payload.referralGiven !== undefined) {
          meeting.referralGiven = action.payload.referralGiven
        }
        if (action.payload.referralReceived !== undefined) {
          meeting.referralReceived = action.payload.referralReceived
        }
        if (action.payload.followUpRequired !== undefined) {
          meeting.followUpRequired = action.payload.followUpRequired
        }
        if (action.payload.notes !== undefined) {
          meeting.notes = action.payload.notes
        }
      }
    },
    cancelMeeting: (state, action: PayloadAction<string>) => {
      const meeting = state.meetings.find((m) => m.id === action.payload)
      if (meeting) {
        meeting.status = 'CANCELLED'
        meeting.updatedAt = new Date().toISOString()
      }
    },

    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

// Export actions
export const {
  // Drawer actions
  openFace2FaceDrawer,
  closeFace2FaceDrawer,
  toggleFace2FaceDrawer,

  // Loading actions
  setLoading,
  setSubmitting,

  // Meeting actions
  setMeetings,
  addMeeting,
  updateMeeting,
  removeMeeting,
  setSelectedMeeting,

  // Filter actions
  setStatusFilter,
  setTypeFilter,
  setSearchFilter,
  setDateRangeFilter,
  clearFilters,

  // Pagination actions
  setPagination,
  setPage,
  setLimit,

  // Status update actions
  confirmMeeting,
  completeMeeting,
  cancelMeeting,

  // Error actions
  setError,
  clearError
} = face2FaceSlice.actions

// Export reducer
export const face2FaceReducer = face2FaceSlice.reducer
