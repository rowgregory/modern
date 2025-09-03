import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface UpdateParleyRequest {
  parleyId: string
  scheduledAt?: string
  duration?: number
  location?: string | null
  meetingType?: 'DECK_TO_DECK' | 'VOYAGE_CALL' | 'MESSAGE_IN_A_BOTTLE'
  status?: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  completed?: boolean
  completedAt?: string | null
  referralGiven?: boolean
  referralReceived?: boolean
  followUpRequired?: boolean
  notes?: string | null
  requesterNotes?: string | null
  recipientNotes?: string | null
}

interface ExistingParley {
  id: string
  requesterId: string
  recipientId: string
  status: string
  completedAt: Date | null
}

interface RouteParams {
  chapterId: string
  userId: string
}

interface IUpdateData {
  updatedAt: Date
  scheduledAt?: Date
  duration?: number
  location?: string | null
  meetingType?: string
  status?: string
  completed?: boolean
  completedAt?: Date | null
  referralGiven?: boolean
  referralReceived?: boolean
  followUpRequired?: boolean
  notes?: string | null
  requesterNotes?: string | null
  recipientNotes?: string | null
}

export async function PUT(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId
    const body: UpdateParleyRequest = await req.json()

    const {
      parleyId,
      scheduledAt,
      duration,
      location,
      meetingType,
      status,
      completed,
      completedAt,
      referralGiven,
      referralReceived,
      followUpRequired,
      notes,
      requesterNotes,
      recipientNotes
    } = body

    // Validate required fields
    if (!parleyId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Parley ID is required'
        },
        { status: 400 }
      )
    }

    // Validate meeting type if provided
    const validMeetingTypes = ['DECK_TO_DECK', 'VOYAGE_CALL', 'MESSAGE_IN_A_BOTTLE']
    if (meetingType && !validMeetingTypes.includes(meetingType)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Invalid meeting type'
        },
        { status: 400 }
      )
    }

    // Validate status if provided
    const validStatuses = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Invalid status value'
        },
        { status: 400 }
      )
    }

    // Validate duration if provided
    if (duration && (isNaN(Number(duration)) || Number(duration) <= 0)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Duration must be a positive number'
        },
        { status: 400 }
      )
    }

    // Build where clause
    const where = {
      id: parleyId,
      ...(chapterId && { chapterId })
    }

    // Check if parley exists and user has permission
    const existingParley: ExistingParley | null = await prisma.parley.findUnique({
      where,
      select: {
        id: true,
        requesterId: true,
        recipientId: true,
        status: true,
        completedAt: true
      }
    })

    if (!existingParley) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Parley not found'
        },
        { status: 404 }
      )
    }

    // Check permissions - only requester or recipient can update
    const canUpdate: boolean = existingParley.requesterId === userId || existingParley.recipientId === userId
    if (!canUpdate) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'You do not have permission to update this parley'
        },
        { status: 403 }
      )
    }

    // Build update data object, only including provided fields
    const updateData: IUpdateData = {
      updatedAt: new Date()
    }

    // Add fields if they exist in the request
    if (scheduledAt !== undefined) {
      updateData.scheduledAt = new Date(scheduledAt)
    }
    if (duration !== undefined) {
      updateData.duration = Number(duration)
    }
    if (location !== undefined) {
      updateData.location = location
    }
    if (meetingType !== undefined) {
      updateData.meetingType = meetingType
    }
    if (status !== undefined) {
      updateData.status = status
    }
    if (completed !== undefined) {
      updateData.completed = Boolean(completed)
    }
    if (completedAt !== undefined) {
      updateData.completedAt = completedAt ? new Date(completedAt) : null
    }
    if (referralGiven !== undefined) {
      updateData.referralGiven = Boolean(referralGiven)
    }
    if (referralReceived !== undefined) {
      updateData.referralReceived = Boolean(referralReceived)
    }
    if (followUpRequired !== undefined) {
      updateData.followUpRequired = Boolean(followUpRequired)
    }
    if (notes !== undefined) {
      updateData.notes = notes
    }
    if (requesterNotes !== undefined) {
      updateData.requesterNotes = requesterNotes
    }
    if (recipientNotes !== undefined) {
      updateData.recipientNotes = recipientNotes
    }

    // Business logic validations
    if (updateData.completed && !updateData.completedAt && !existingParley.completedAt) {
      updateData.completedAt = new Date()
    }

    // Update the parley
    const updatedParley = await prisma.parley.update({
      where: {
        id: parleyId
      },
      data: updateData,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true
          }
        }
      }
    })

    return NextResponse.json(
      {
        parley: updatedParley,
        sliceName: sliceUser,
        message: 'Parley updated successfully'
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while updating the parley'
      },
      { status: 500 }
    )
  }
}
