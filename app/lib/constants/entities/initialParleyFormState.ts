export const initialParleyFormState = {
  // Meeting details
  scheduledAt: '',
  duration: 30,
  location: '',
  meetingType: 'DECK_TO_DECK',

  // Participants (will be populated based on current user and selected recipient)
  requesterId: '',
  recipientId: '',

  // Status tracking
  status: 'REQUESTED',

  // Meeting outcomes (filled after completion)
  completed: false,
  completedAt: null,
  referralGiven: false,
  referralReceived: false,
  followUpRequired: false,

  // Notes
  notes: '',
  requesterNotes: '',
  recipientNotes: '',

  // Coastal Referral Exchange specific tracking
  chapterId: null
}

// Meeting type options for dropdown/select
export const meetingTypeOptions = [
  { value: 'DECK_TO_DECK', label: 'Deck-to-Deck', description: 'In-person meeting' },
  { value: 'VOYAGE_CALL', label: 'Virtual', description: 'Video call meeting' },
  { value: 'MESSAGE_IN_A_BOTTLE', label: 'Phone', description: 'Phone call meeting' }
]

// Status options for status tracking
export const statusOptions = [
  { value: 'REQUESTED', label: 'Requested', description: 'Meeting requested, awaiting confirmation' },
  { value: 'CONFIRMED', label: 'Confirmed', description: 'Meeting confirmed by both parties' },
  { value: 'COMPLETED', label: 'Completed', description: 'Meeting has taken place' },
  { value: 'CANCELLED', label: 'Cancelled', description: 'Meeting was cancelled' }
]
