import { sliceTreasureMap } from '@/app/lib/constants/api/sliceNames'
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
    const { clientName, clientEmail, clientPhone, serviceNeeded, notes, giverNotes, receiverId } = body

    const giverId = userAuth.user.id

    // Prevent self-referral
    if (giverId === receiverId) {
      return NextResponse.json({ message: 'Cannot give treasure map to yourself' }, { status: 400 })
    }

    // Validate required fields
    if (!clientName || !serviceNeeded || !receiverId) {
      return NextResponse.json(
        {
          message: 'Missing required fields: clientName, serviceNeeded, and receiverId are required'
        },
        { status: 400 }
      )
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

    // Create the TreasureMap
    const treasureMap = await prisma.treasureMap.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        serviceNeeded,
        notes,
        giverNotes,
        chapterId,
        giverId,
        receiverId,
        status: 'GIVEN'
      },
      include: {
        giver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
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

    // Send notification to receiver
    // notificationFactory.treasureMap.given(
    //   treasureMap.giver.name,
    //   chapterId,
    //   treasureMap.id,
    //   giverId,
    //   treasureMap.receiver.id,
    //   treasureMap.clientName,
    //   treasureMap.serviceNeeded
    // )

    await createLog('info', 'New treasure map created', {
      location: ['app route - POST /api/treasure-map/[chapterId]/[userId]/create-treasure-map'],
      message: `New treasure map referral created for client: ${clientName}`,
      name: 'TreasureMapCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      metadata: {
        treasureMapId: treasureMap.id,
        clientName: treasureMap.clientName,
        serviceNeeded: treasureMap.serviceNeeded,
        giverId: treasureMap.giverId,
        receiverId: treasureMap.receiverId
      }
    })

    return NextResponse.json(
      {
        treasureMap,
        message: 'Treasure map created successfully',
        sliceName: sliceTreasureMap
      },
      { status: 201 }
    )
  } catch (error) {
    handleApiError({
      error,
      req,
      action: 'create treasure map',
      sliceName: sliceTreasureMap
    })
  }
}
