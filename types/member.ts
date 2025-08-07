import { ClosedAndCredited } from './closedAndCredited'
import { Face2Face } from './face2Face'

// Base Member interface matching your Prisma User model
export interface Member {
  id: string
  createdAt: string
  updatedAt: string

  // Basic info
  name: string
  email: string
  phone: string | null
  company: string
  profession: string

  // Modern membership
  chapterId: string
  chapter?: Chapter
  joinedAt: string | null
  expiresAt: string | null
  membershipStatus: MembershipStatus

  // Profile & Networking
  interests: string[]
  profileImage: string | null
  profileImageFilename: string | null
  isPublic: boolean
  isActive: boolean

  // Verification & Security
  lastLoginAt: string | null

  // NextAuth fields
  emailVerified: string | null
  image: string | null

  // Relationships (optional, loaded when needed)
  requestedMeetings?: Face2Face[]
  receivedMeetings?: Face2Face[]
  givenCredits?: ClosedAndCredited[]
  receivedCredits?: ClosedAndCredited[]
  accounts?: Account[]
  sessions?: Session[]
  logs?: Log[]
}

// Membership status enum
export type MembershipStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'SUSPENDED'

// Chapter interface (basic version)
export interface Chapter {
  id: string
  name: string
  location: string
  meetingDay: string
  meetingTime: string
  meetingFrequency: string
  createdAt: string
  updatedAt: string
}

// Member with chapter details (for display)
export interface MemberWithChapter extends Member {
  chapter: Chapter
}

// Member form data (for creating/updating)
export interface MemberFormData {
  name: string
  email: string
  phone?: string
  company: string
  profession: string
  chapterId: string
  joinedAt?: string
  expiresAt?: string
  membershipStatus: MembershipStatus
  interests: string[]
  profileImage?: string
  profileImageFilename?: string
  isPublic: boolean
  isActive: boolean
}

// Member list item (minimal data for tables/cards)
export interface MemberListItem {
  id: string
  name: string
  email: string
  phone: string | null
  company: string
  profession: string
  membershipStatus: MembershipStatus
  joinedAt: string | null
  expiresAt: string | null
  lastLoginAt: string | null
  isActive: boolean
  chapter: {
    id: string
    name: string
  }
  interests: string[]
}

// Member profile (for detailed views)
export interface MemberProfile extends Member {
  chapter: Chapter
  recentMeetings?: Face2Face[]
  totalMeetings?: number
  totalReferrals?: number
}

// Member filters (for search/filtering)
export interface MemberFilters {
  search?: string
  membershipStatus?: MembershipStatus | 'all'
  chapterId?: string | 'all'
  isActive?: boolean
  interests?: string[]
  joinedAfter?: string
  joinedBefore?: string
  expiringWithinDays?: number
  page?: number
  limit?: number
}

// Member pagination
export interface MemberPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Member API responses
export interface GetMembersResponse {
  success: boolean
  members: MemberListItem[]
  pagination: MemberPagination
}

export interface GetMemberResponse {
  success: boolean
  member: MemberWithChapter
}

export interface CreateMemberResponse {
  success: boolean
  message: string
  member: MemberWithChapter
}

export interface UpdateMemberResponse {
  success: boolean
  message: string
  member: MemberWithChapter
}

export interface DeleteMemberResponse {
  success: boolean
  message: string
}

// Member statistics
export interface MemberStats {
  total: number
  active: number
  pending: number
  expired: number
  inactive: number
  suspended: number
  newThisMonth: number
  expiringThisMonth: number
}

export interface Account {
  id: string
  type: string
  provider: string
  providerAccountId: string
}

export interface Session {
  id: string
  sessionToken: string
  expires: string
}

export interface Log {
  id: string
  action: string
  details: any
  createdAt: string
}
