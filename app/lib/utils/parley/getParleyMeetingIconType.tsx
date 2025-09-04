import { Compass, Footprints, Scroll } from 'lucide-react'

const getParleyMeetingIconType = (type: string) => {
  switch (type) {
    case 'DECK_TO_DECK':
      return { icon: <Footprints className="w-4 h-4" />, text: 'Deck-to-Deck' }
    case 'VOYAGE_CALL':
      return { icon: <Compass className="w-4 h-4" />, text: 'Voyage Call' }
    case 'MESSAGE_IN_A_BOTTLE':
    default:
      return { icon: <Scroll className="w-4 h-4" />, text: 'Message In a Bottle' }
  }
}

export default getParleyMeetingIconType
