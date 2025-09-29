import { Anchor, Parley } from '@prisma/client'

// Base User interface matching your Prisma User model
export interface User {
  businessLicenseNumber: any
  addedBy: string | undefined
  isFinalDecisionMade: any
  rejectionReason: string
  finalDecisionAt: any
  backgroundCheckCompletedAt: any
  initialReviewCompletedAt: any
  isBackgroudCheckCompleted: any
  isInitialReviewCompleted: any
  rejectedStep: any
  rejectedAt: string
  hasCompletedApplication: boolean
  id: string
  createdAt: string
  updatedAt: string
  role: string

  // Basic info
  name: string
  email: string
  phone: string | null
  company: string
  industry: string
  location: string
  bio: string
  title: string
  website: string
  yearsInBusiness: string

  // Coastal Referral Exchange membership
  chapterId: string
  chapter?: Chapter
  joinedAt?: Date
  expiresAt?: Date
  membershipStatus: MembershipStatus

  // Profile & Networking
  interests: string[]
  profileImage: string | null
  profileImageFilename: string | null
  isPublic: boolean
  isActive: boolean

  // NEW: Professional Goals & Media
  goal: string | null
  collage: any | null // JSON field for educational background
  coverImage: string | null
  coverImageFilename: string | null

  // NEW: Social Media & Online Presence
  facebookUrl: string | null
  threadsUrl: string | null
  youtubeUrl: string | null
  xUrl: string | null
  linkedInUrl: string | null
  portfolioUrl: string | null

  // NEW: Content & Communication
  posts: any | null // JSON field for recent posts/articles
  podcasts: any | null // JSON field for favorite podcasts

  // NEW: Skills & Professional Development
  skills: string[] // Array of skills
  careerAchievements: string[] // Array of achievements
  learningGoals: string[] // Array of learning objectives

  // NEW: Services & Professional Network
  servicesOffered: any | null // JSON field for services provided
  professionalAssociations: any | null // JSON field for organizations
  professionalBooks: any | null // JSON field for influential books

  // NEW: Projects & Expertise Sharing
  sideProjects: any | null // JSON field for personal projects
  askMeAbout: any | null // JSON field for expertise areas

  // Verification & Security
  lastLoginAt: string | null
  isAdmin: boolean
  isSuperUser: boolean

  // NextAuth fields
  emailVerified: string | null
  image: string | null

  // Relationships (optional, loaded when needed)
  requestedMeetings?: Parley[]
  receivedMeetings?: Parley[]
  givenCredits?: Anchor[]
  receivedCredits?: Anchor[]
  accounts?: Account[]
  sessions?: Session[]
  logs?: Log[]
  signals?: Log[]

  weeklyTreasureWishlist?: string
}

// Usership status enum
export type MembershipStatus =
  | 'FLAGGED'
  | 'PENDING'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'EXPIRED'
  | 'SUSPENDED'
  | 'REJECTED'
  | 'INITIAL_REVIEW'
  | 'BACKGROUND_CHECK'

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
  hasUnlockedMuster: boolean
  hasUnlockedBooty: boolean
  hasUnlockedGrog: boolean
}

// User with chapter details (for display)
export interface UserWithChapter extends User {
  chapter: Chapter
}

// User form data (for creating/updating)
export interface UserFormData {
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

// User profile (for detailed views)
export interface UserProfile extends User {
  chapter: Chapter
  recentMeetings?: Parley[]
  totalMeetings?: number
  totalReferrals?: number
}

// User filters (for search/filtering)
export interface UserFilters {
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

// User pagination
export interface UserPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// User API responses
export interface GetUsersResponse {
  success: boolean
  members: User[]
  pagination: UserPagination
}

export interface GetUserResponse {
  success: boolean
  member: UserWithChapter
}

export interface CreateUserResponse {
  success: boolean
  message: string
  member: UserWithChapter
}

export interface UpdateUserResponse {
  user: { id: string; data: any }
  success: boolean
  message: string
  member: UserWithChapter
}

export interface DeleteUserResponse {
  success: boolean
  message: string
}

// User statistics
export interface UserStats {
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

export interface UserWithMeta extends User {
  meta: {
    chapterId: string
    lastUpdated: string
    membership: {
      expiresAt: string
      isExpiringWithin30Days: boolean
      joinedDaysAgo: number
      status: string
    }
    profileCompleteness: {
      isComplete: boolean
      missingFields: string[]
    }
  }
  chapter: Chapter
}
