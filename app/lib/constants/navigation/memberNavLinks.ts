import { Video, Target, TowerControl, Ship, Sailboat, Anchor } from 'lucide-react'

export const memberNavLinks = [
  {
    id: 'bridge',
    label: 'The Bridge',
    icon: Ship,
    description: 'Dashboard',
    linkKey: '/member/bridge'
  },
  {
    id: 'parley',
    label: 'Parley',
    icon: Video,
    description: '1-2-1',
    linkKey: '/member/parley'
  },
  {
    id: 'treasure-maps',
    label: 'Treasure Maps',
    icon: Target,
    description: 'Referrals',
    linkKey: '/member/treasure-maps'
  },
  {
    id: 'anchored',
    label: 'Anchored',
    icon: Anchor,
    description: 'Thank You For Closed Business',
    linkKey: '/member/anchored'
  },
  {
    id: 'skippers',
    label: 'Skippers',
    icon: Sailboat,
    description: 'Visitors',
    linkKey: '/member/skippers'
  },
  {
    id: 'beacon',
    label: 'Beacon',
    icon: TowerControl,
    description: 'Personal Settings',
    linkKey: '/member/beacon'
  }
]
