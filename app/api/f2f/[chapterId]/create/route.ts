import { createFace2FaceNotification } from '@/app/api/notification/services/createFace2FaceNotification'
import { sliceFace2Face } from '@/app/lib/constants/api/sliceNames'
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
    const { recipientId, scheduledAt, duration = 30, location, meetingType = 'FACE_TO_FACE', notes } = body

    // Validation
    if (!recipientId) {
      return NextResponse.json({ message: 'Recipient ID is required' }, { status: 400 })
    }

    if (!scheduledAt) {
      return NextResponse.json({ message: 'Scheduled date/time is required' }, { status: 400 })
    }

    const requesterId = userAuth.user.id

    // Prevent self-meeting
    if (requesterId === recipientId) {
      return NextResponse.json({ message: 'Cannot schedule a meeting with yourself' }, { status: 400 })
    }

    // Validate scheduled time is in the future
    const scheduledDate = new Date(scheduledAt)
    if (scheduledDate <= new Date()) {
      return NextResponse.json({ message: 'Scheduled time must be in the future' }, { status: 400 })
    }

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
    const existingMeeting = await prisma.faceToFace.findFirst({
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

    // Create the Face2Face meeting
    const face2face = await prisma.faceToFace.create({
      data: {
        requesterId,
        recipientId,
        scheduledAt: scheduledDate,
        duration,
        location,
        meetingType,
        notes,
        chapterId,
        status: 'REQUESTED'
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

    await createFace2FaceNotification.request(userAuth.user.name, scheduledDate, meetingType, chapterId, face2face.id)

    return NextResponse.json(
      {
        face2face,
        message: 'Face-to-face meeting request created successfully',
        sliceName: sliceFace2Face
      },
      { status: 201 }
    )
  } catch (error) {
    handleApiError({ error, req, action: 'create face-2-face', sliceName: sliceFace2Face })
  }
}
