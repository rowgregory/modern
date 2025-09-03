import { notificationFactory } from '@/app/api/notification/services/notificationFactory'
import { sliceParley } from '@/app/lib/constants/api/sliceNames'
import { createLog } from '@/app/lib/utils/api/createLog'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: any) {
  try {
    const userAuth = getUserFromHeader({ req })

    if (!userAuth.success) {
      return userAuth.response!
    }

    const parameters = await params
    const chapterId = parameters.chapterId

    if (!chapterId) {
      return NextResponse.json({ message: 'Missing chapter Id' }, { status: 400 })
    }

    // Parse request body
    const body = await req.json()
    const { recipientId, status, scheduledAt, duration = 30, location, meetingType = 'DECK_TO_DECK', notes } = body

    const requesterId = userAuth.user.id

    // Prevent self-meeting
    if (requesterId === recipientId) {
      return NextResponse.json({ message: 'Cannot schedule a meeting with yourself' }, { status: 400 })
    }

    // Validate scheduled time is in the future
    const scheduledDate = new Date(scheduledAt)

    // Check if recipient exists and is in the same chapter
    const recipient = await prisma.user.findFirst({
      where: {
        id: recipientId,
        chapterId: chapterId
      }
    })

    if (!recipient) {
      return NextResponse.json(
        {
          message: 'Recipient not found or not in the same chapter'
        },
        { status: 404 }
      )
    }

    // Check for existing meeting at the same time
    const existingMeeting = await prisma.parley.findFirst({
      where: {
        OR: [
          {
            requesterId: requesterId,
            scheduledAt: scheduledDate
          },
          {
            recipientId: requesterId,
            scheduledAt: scheduledDate
          },
          {
            requesterId: recipientId,
            scheduledAt: scheduledDate
          },
          {
            recipientId: recipientId,
            scheduledAt: scheduledDate
          }
        ],
        status: {
          in: ['REQUESTED', 'CONFIRMED']
        }
      }
    })

    if (existingMeeting) {
      return NextResponse.json(
        {
          message: 'One of the participants already has a meeting scheduled at this time'
        },
        { status: 409 }
      )
    }

    // Create the Parley meeting
    const parley = await prisma.parley.create({
      data: {
        requesterId,
        recipientId,
        scheduledAt: scheduledDate,
        duration,
        location,
        meetingType,
        notes,
        chapterId,
        status,
        completed: status === 'COMPLETED' ? true : undefined,
        completedAt: status === 'COMPLETED' ? new Date() : undefined
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        chapter: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (status === 'COMPLETED') {
      notificationFactory.parley.completed(
        parley.requester.name,
        parley.scheduledAt,
        chapterId,
        parley.id,
        userAuth.user.id
      )
    } else {
      notificationFactory.parley.request(
        parley.requester.name,
        parley.scheduledAt,
        chapterId,
        parley.id,
        userAuth.user.id
      )
    }

    await createLog('info', 'New parley request', {
      location: ['app route - POST /api/parley/[chapterId]/create'],
      message: `New parley request`,
      name: 'ParleyRequested',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        parley,
        message: 'Parley request created successfully',
        sliceName: sliceParley
      },
      { status: 201 }
    )
  } catch (error) {
    handleApiError({ error, req, action: 'create parley', sliceName: sliceParley })
  }
}
