// Rendezvous TypeScript Interface
export interface RendezvousEvent {
  id: string
  title: string
  description?: string
  type: string
  startTime: Date
  endTime: Date
  isRecurring: boolean
  recurrencePattern?: string
  status: RendezvousStatus
  createdAt?: Date
  updatedAt?: Date
  chapterId?: string
  chapter?: {
    id: string
    name: string
  }
}

// Status enum
export enum RendezvousStatus {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
  CANCELLED = 'CANCELLED'
}

// Initial state for new rendezvous
export const createInitialRendezvousState = (): Omit<RendezvousEvent, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: '',
  description: '',
  type: 'meeting',
  startTime: new Date(),
  endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
  isRecurring: false,
  recurrencePattern: undefined,
  status: RendezvousStatus.ACTIVE,
  chapterId: undefined,
  chapter: undefined
})

// Initial state for Thursday meetings specifically
export const createThursdayMeetingState = (date: Date): RendezvousEvent => {
  const startTime = new Date(date)
  startTime.setHours(7, 0, 0, 0) // 7:00 AM

  const endTime = new Date(date)
  endTime.setHours(8, 0, 0, 0) // 8:00 AM

  return {
    id: `thursday-meeting-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    title: 'Weekly Team Meeting',
    description: 'Weekly team sync every Thursday 7-8 AM',
    type: 'meeting',
    startTime,
    endTime,
    isRecurring: true,
    recurrencePattern: 'weekly',
    status: RendezvousStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

// Form validation schema (optional - for form handling)
export interface RendezvousFormData {
  title: string
  description: string
  type: string
  startDate: string // YYYY-MM-DD format
  startTime: string // HH:MM format
  endDate: string
  endTime: string
  isRecurring: boolean
  recurrencePattern: string
  chapterId: string
}

// API response types
export interface CreateRendezvousResponse {
  success: boolean
  data?: RendezvousEvent
  error?: string
}

export interface UpdateRendezvousStatusResponse {
  success: boolean
  data?: RendezvousEvent
  error?: string
}

// Component props interfaces
export interface RendezvousCalendarProps {
  events: RendezvousEvent[]
  onCreateEvent: (event: Omit<RendezvousEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onUpdateStatus: (eventId: string, status: RendezvousStatus) => Promise<void>
  onRemoveEvent: (eventId: string) => Promise<void>
  selectedDate: string
  onDateSelect: (date: string) => void
  currentChapterId?: string
}

export interface RendezvousControlsProps {
  onAddThursdayMeetings: () => void
  onRemoveThursdayMeetings: () => void
  isLoading?: boolean
}

// Hook return type for rendezvous management
export interface UseRendezvousReturn {
  events: RendezvousEvent[]
  isLoading: boolean
  error: string | null
  createEvent: (event: Omit<RendezvousEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateEventStatus: (eventId: string, status: RendezvousStatus) => Promise<void>
  removeEvent: (eventId: string) => Promise<void>
  refreshEvents: () => Promise<void>
}

// Utility type for filtering events
export type EventFilter = {
  status?: RendezvousStatus[]
  type?: string[]
  isRecurring?: boolean
  dateRange?: {
    start: Date
    end: Date
  }
  chapterId?: string
}

// Default values
export const DEFAULT_MEETING_DURATION = 60 // minutes
export const DEFAULT_MEETING_TYPE = 'meeting'
export const DEFAULT_RECURRENCE_PATTERN = 'weekly'

// Example usage in component state
export const initialRendezvousComponentState = {
  events: [] as RendezvousEvent[],
  selectedDate: new Date().toISOString().split('T')[0],
  isLoading: false,
  error: null as string | null,
  showCreateModal: false,
  editingEvent: null as RendezvousEvent | null
}
