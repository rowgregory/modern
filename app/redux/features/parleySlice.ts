import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ParleyFilters {
  status: string
  type: string
  search: string
  dateRange: {
    start: string | null
    end: string | null
  }
}

export interface ParleyMeeting {
  id: string
  createdAt: string
  updatedAt: string
  scheduledAt: string
  duration: number
  location: string | null
  meetingType: 'DECK_TO_DECK' | 'VOYAGE_CALL' | 'MESSAGE_IN_A_BOTTLE'
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

export interface ParleyStatePayload {
  loading: boolean
  submitting: boolean
  parleyDrawer: boolean
  selectedMeeting: ParleyMeeting | null
  meetings: ParleyMeeting[]
  filters: ParleyFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  error: string | null
}

const initialParleyState: ParleyStatePayload = {
  loading: false,
  submitting: false,
  parleyDrawer: false,
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

export const parleySlice = createSlice({
  name: 'parley',
  initialState: initialParleyState,
  reducers: {
    // Drawer management
    setOpenParleyDrawer: (state) => {
      state.parleyDrawer = true
    },
    setCloseParleyDrawer: (state) => {
      state.parleyDrawer = false
      state.selectedMeeting = null
      state.error = null
    },
    toggleParleyDrawer: (state) => {
      state.parleyDrawer = !state.parleyDrawer
      if (!state.parleyDrawer) {
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
    setMeetings: (state, action: PayloadAction<ParleyMeeting[]>) => {
      state.meetings = action.payload
    },
    addMeeting: (state, action: PayloadAction<ParleyMeeting>) => {
      state.meetings.unshift(action.payload)
      state.pagination.total += 1
    },
    updateMeeting: (state, action: PayloadAction<ParleyMeeting>) => {
      const index = state.meetings.findIndex((meeting) => meeting.id === action.payload.id)
      if (index !== -1) {
        state.meetings[index] = action.payload
      }
    },
    removeMeeting: (state, action: PayloadAction<string>) => {
      state.meetings = state.meetings.filter((meeting) => meeting.id !== action.payload)
      state.pagination.total -= 1
    },
    setSelectedMeeting: (state, action: PayloadAction<ParleyMeeting | null>) => {
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
    setPagination: (state, action: PayloadAction<Partial<ParleyStatePayload['pagination']>>) => {
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
  setOpenParleyDrawer,
  setCloseParleyDrawer,
  toggleParleyDrawer,

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
} = parleySlice.actions

// Export reducer
export const parleyReducer = parleySlice.reducer
