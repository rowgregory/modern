// Related interfaces (basic versions for references)
export interface Face2Face {
  id: string
  scheduledAt: string
  meetingType: string
  status: string
  completed: boolean
  requester: {
    id: string
    name: string
    company: string
  }
  recipient: {
    id: string
    name: string
    company: string
  }
}
