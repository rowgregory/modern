import {
  Home,
  Video,
  Target,
  Users,
  ClipboardList,
  FileText,
  TowerControl,
  Anchor,
  Sailboat,
  Sliders
} from 'lucide-react'

export const adminNavLinks = [
  {
    id: 'bridge',
    label: 'The Bridge',
    icon: Home,
    description: 'Dashboard',
    linkKey: '/admin/bridge'
  },
  {
    id: 'parley',
    label: 'Parley',
    icon: Video,
    description: '1-2-1',
    linkKey: '/admin/parley'
  },
  {
    id: 'treasure-maps',
    label: 'Treasure Maps',
    icon: Target,
    description: 'Referrals',
    linkKey: '/admin/treasure-maps'
  },
  {
    id: 'anchored',
    label: 'Anchored',
    icon: Anchor,
    description: 'Thank You For Closed Business',
    linkKey: '/admin/anchored'
  },
  {
    id: 'skippers',
    label: 'Skippers',
    icon: Sailboat,
    description: 'Visitors',
    linkKey: '/admin/skippers'
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
    id: 'rigging',
    label: 'Rigging',
    icon: Sliders,
    description: 'Chapter Configuration',
    linkKey: '/admin/rigging'
  }
]
