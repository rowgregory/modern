// Related interfaces (basic versions for references)
export interface IParley {
  createdAt: string | number | Date
  id: string
  scheduledAt: string
  duration: string
  location: string
  meetingType: string
  status: string
  completed: boolean
  completedAt: string
  referralGiven: boolean
  referralReceived: boolean
  followUpRequired: boolean
  notes: string
  requesterNotes: string
  recipientNotes: string
  requesterId: string
  recipientId: string
  requester: {
    id: string
    name: string
    company: string
    industry: string
    profileImage: string
  }
  recipient: {
    id: string
    name: string
    company: string
    industry: string
    profileImage: string
  }
}
