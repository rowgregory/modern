import { Users, ClipboardList, FileText, TowerControl, Anchor, Sliders, Ship, Scroll, Layers } from 'lucide-react'

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
