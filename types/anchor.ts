export interface IAnchor {
  createdAt: string
  giverId: string
  receiverId: string
  businessValue: string | number // String for form input, number for calculation
  currency: string
  description: string
  clientName: string
  closedDate: string // ISO string or date string
  chapterId: string
  announcedAt: string | null // ISO string for datetime-local input
  meetingId: string | null
  status: 'REPORTED' | 'VERIFIED' | 'DISPUTED'
  notes: string
  giver: {
    id: string
    name: string
    company: string
    industry: string
    profileImage: string
  }
  receiver: {
    id: string
    name: string
    company: string
    industry: string
    profileImage: string
  }
}
