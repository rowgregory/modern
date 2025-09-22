import { Calendar, PartyPopper } from 'lucide-react'

const getRendezvousTypeIcon = (type: string) => {
  switch (type) {
    case 'day-off':
      return PartyPopper
    default:
      return Calendar
  }
}

export default getRendezvousTypeIcon
