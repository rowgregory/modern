import {
  Home,
  Video,
  Target,
  Users,
  ClipboardList,
  FileText,
  User,
  Settings,
  Handshake,
  Footprints
} from 'lucide-react'

export const adminNavLinks = [
  {
    id: 'bridge',
    label: 'The Bridge',
    icon: Home,
    description: 'Overview & Analytics',
    linkKey: '/admin/bridge'
  },
  {
    id: 'face-to-face',
    label: 'Face-2-Face',
    icon: Video,
    description: 'Meeting Management',
    linkKey: '/admin/face-2-face'
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: Target,
    description: 'Prospect Pipeline',
    linkKey: '/admin/leads'
  },
  {
    id: 'closed-and-credited',
    label: 'Closed & Credited',
    icon: Handshake,
    description: 'Business Acknowledged',
    linkKey: '/admin/closed-and-credited'
  },
  {
    id: 'explorers',
    label: 'Explorers',
    icon: Footprints,
    description: 'Business Acknowledged',
    linkKey: '/admin/explorers'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    description: 'Account Settings',
    linkKey: '/admin/profile'
  },
  {
    id: 'members',
    label: 'Members',
    icon: Users,
    description: 'Member Directory',
    linkKey: '/admin/members'
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: ClipboardList,
    description: 'Membership Requests',
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
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Chapter Configuration',
    linkKey: '/admin/settings'
  }
]
