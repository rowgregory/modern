// Related interfaces (basic versions for references)
export interface IParley {
  id: string
  createdAt: string
  updatedAt: string
  scheduledAt: string
  duration: number
  location: string | null
  meetingType: 'DECK_TO_DECK' | 'VOYAGE_CALL' | 'MESSAGE_IN_A_BOTTLE'
  requesterId: string
  requester: {
    profileImage: any
    id: string
    name: string
    email: string
    phone: string | null
    company: string
    industry: string
  }
  recipientId: string
  recipient: {
    profileImage: any
    id: string
    name: string
    email: string
    phone: string | null
    company: string
    industry: string
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
