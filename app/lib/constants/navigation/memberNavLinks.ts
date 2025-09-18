import HiddenCoveSVG from '@/public/svg/HiddenCoveSVG'
import { TowerControl, Ship, Anchor, Scroll, Layers, Sailboat } from 'lucide-react'

export const memberNavLinks = [
  {
    id: 'bridge',
    label: 'Bridge',
    icon: Ship,
    description: 'Dashboard',
    linkKey: '/member/bridge'
  },
  {
    id: 'parley',
    label: 'Parley',
    icon: Scroll,
    description: '1-2-1',
    linkKey: '/member/parley'
  },
  {
    id: 'treasure-maps',
    label: 'Treasure Maps',
    icon: Layers,
    description: 'Referrals',
    linkKey: '/member/treasure-maps'
  },
  {
    id: 'anchors',
    label: 'Anchors',
    icon: Anchor,
    description: 'Thank You For Closed Business',
    linkKey: '/member/anchors'
  },
  {
    id: 'swabbies',
    label: 'Swabbies',
    icon: Sailboat,
    description: 'Visitors',
    linkKey: '/member/swabbies'
  },
  {
    id: 'beacon',
    label: 'Beacon',
    icon: TowerControl,
    description: 'Account Settings',
    linkKey: '/member/beacon'
  },
  {
    id: 'hidden-cove',
    label: 'Hidden Cove',
    icon: HiddenCoveSVG,
    description: 'Special tools, features, and perks waiting to be discovered',
    linkKey: '/member/hidden-cove'
  }
]
