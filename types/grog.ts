import { Key } from 'react'

export interface GrogFormState {
  // Basic Grog Information
  title: string
  description: string
  category: string
  type: string

  // Date and Time
  date: string
  time: string
  duration: string

  // Location
  location: string
  address: string

  // Capacity and Registration
  maxAttendees: string
  registrationDeadline: string
  cost: number

  // Settings
  waitlistEnabled: boolean
  featured: boolean
  visibility: 'PUBLIC' | 'MEMBERS_ONLY' | 'PRIVATE' | 'UNLISTED'

  // Additional Details
  dresscode: string
  requirements: string
  materials: string
  registrationUrl: string
  meetingUrl: string
}

// Optional: More specific types for better type safety
type GrogType = 'networking' | 'workshop' | 'mixer' | 'luncheon' | 'seminar' | 'conference'
type GrogCategory = 'Weekly Meeting' | 'Special Event' | 'Education' | 'Chamber Event' | 'Social' | 'Training'
type GrogVisibility = 'PUBLIC' | 'MEMBERS_ONLY' | 'PRIVATE' | 'UNLISTED'

// Enhanced interface with specific types
export interface GrogFormStateTyped {
  id: Key | null | undefined | string
  title: string
  description: string
  category: GrogCategory | string
  type: GrogType | string
  date: string
  time: string
  duration: string
  location: string
  address: string
  maxAttendees: string
  registrationDeadline: string
  cost: number
  waitlistEnabled: boolean
  featured: boolean
  visibility: GrogVisibility
  dresscode: string
  requirements: string
  materials: string
  registrationUrl: string
  meetingUrl: string
  status: string
  attendees: number
  host: string
  requiresRSVP: boolean
  isPublic: boolean
  updatedAt: string
  createdAt: string
}
