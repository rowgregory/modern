import { notificationFactory } from '@/app/api/notification/services/notificationFactory'
import { sliceAnchor } from '@/app/lib/constants/api/sliceNames'
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
    const { businessValue, clientName, closedDate, description, notes, receiverId, status } = body

    const giverId = userAuth.user.id

    // Prevent self-meeting
    if (giverId === receiverId) {
      return NextResponse.json({ message: 'Cannot drop anchor for yourself' }, { status: 400 })
    }

    // Check if receiver exists and is in the same chapter
    const receiver = await prisma.user.findFirst({
      where: {
        id: receiverId,
        chapterId: chapterId
      }
    })

    if (!receiver) {
      return NextResponse.json(
        {
          message: 'Receiver not found or not in the same chapter'
        },
        { status: 404 }
      )
    }

    // Create the Anchor
    const anchor = await prisma.anchor.create({
      data: {
        businessValue,
        clientName,
        closedDate,
        description,
        notes,
        chapterId,
        giverId,
        receiverId,
        status
      },
      include: {
        giver: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        receiver: {
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

    if (status === 'REPORTED') {
      notificationFactory.anchor.reported(anchor.giver.name, chapterId, anchor.id, giverId, anchor.receiver.id)
    }

    await createLog('info', 'New anchor created', {
      location: ['app route - POST /api/anchor/[chapterId]/create-anchor'],
      message: `New anchor created`,
      name: 'AnchorCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        anchor,
        message: 'Anchor created successfully',
        sliceName: sliceAnchor
      },
      { status: 201 }
    )
  } catch (error) {
    handleApiError({ error, req, action: 'create anchor', sliceName: sliceAnchor })
  }
}
