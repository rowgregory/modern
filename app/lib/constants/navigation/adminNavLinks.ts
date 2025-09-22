import HiddenCoveSVG from '@/public/svg/HiddenCoveSVG'
import {
  Users,
  ClipboardList,
  FileText,
  TowerControl,
  Anchor,
  Sliders,
  Ship,
  Scroll,
  Layers,
  LifeBuoy,
  Beer,
  Coins,
  Crosshair
} from 'lucide-react'

export const adminNavLinks = [
  {
    id: 'bridge',
    label: 'Bridge',
    icon: Ship,
    description: 'Dashboard',
    linkKey: '/admin/bridge'
  },
  {
    id: 'parley',
    label: 'Parley',
    icon: Scroll,
    description: '1-2-1',
    linkKey: '/admin/parley'
  },
  {
    id: 'treasure-maps',
    label: 'Treasure Maps',
    icon: Layers,
    description: 'Referrals',
    linkKey: '/admin/treasure-maps'
  },
  {
    id: 'anchors',
    label: 'Anchors',
    icon: Anchor,
    description: 'Thank You For Closed Business',
    linkKey: '/admin/anchors'
  },
  {
    id: 'muster',
    label: 'Muster',
    icon: LifeBuoy,
    description: 'The Crew Quarters',
    linkKey: '/admin/muster'
  },
  {
    id: 'rendezvous',
    label: 'Rendezvous',
    icon: Crosshair,
    description: 'The Gathering Point',
    linkKey: '/admin/rendezvous'
  },
  {
    id: 'beacon',
    label: 'Beacon',
    icon: TowerControl,
    description: 'Account Settings',
    linkKey: '/admin/beacon'
  },
  {
    id: 'navigators',
    label: 'Navigators',
    icon: Users,
    description: 'Member Directory',
    linkKey: '/admin/navigators'
  },
  {
    id: 'grogs',
    label: 'Grogs',
    icon: Beer,
    description: 'The Tavern',
    linkKey: '/admin/grogs'
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: ClipboardList,
    description: 'Visitor Requests',
    linkKey: '/admin/applications'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    description: 'Analytics & Reports',
    linkKey: '/admin/reports'
  },
  {
    id: 'booty',
    label: 'Booty',
    icon: Coins,
    description: 'The Treasure Vault',
    linkKey: '/admin/booty'
  },

  {
    id: 'rigging',
    label: 'Rigging',
    icon: Sliders,
    description: 'Chapter Configuration',
    linkKey: '/admin/rigging'
  },
  {
    id: 'hidden-cove',
    label: 'Hidden Cove',
    icon: HiddenCoveSVG,
    description: 'Special tools, features, and perks waiting to be discovered',
    linkKey: '/admin/hidden-cove'
  }
]
