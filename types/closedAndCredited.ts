export interface ClosedAndCredited {
  id: string
  amount: number
  description: string
  createdAt: string
  giver: {
    id: string
    name: string
    company: string
  }
  receiver: {
    id: string
    name: string
    company: string
  }
}
