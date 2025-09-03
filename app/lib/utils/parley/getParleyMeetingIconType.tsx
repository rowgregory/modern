import { Phone, Users, Video } from 'lucide-react'

const getParleyMeetingIconType = (type: string) => {
  switch (type) {
    case 'DECK_TO_DECK':
      return { icon: <Video className="w-4 h-4" />, text: 'Deck-to-Deck' }
    case 'VOYAGE_CALL':
      return { icon: <Phone className="w-4 h-4" />, text: 'Voyage Call' }
    case 'MESSAGE_IN_A_BOTTLE':
    default:
      return { icon: <Users className="w-4 h-4" />, tetxt: 'Message In a Bottle' }
  }
}

export default getParleyMeetingIconType
