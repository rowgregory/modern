import { sliceTreasureMap } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  chapterId: string
  userId: string
}

export async function PUT(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const body = await req.json()

    const {
      treasureMapId,
      clientName,
      clientEmail,
      clientPhone,
      serviceNeeded,
      notes,
      giverNotes,
      receiverId,
      giverId,
      isThirdParty
    } = body

    if (!treasureMapId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Treasure Map ID is required'
        },
        { status: 400 }
      )
    }

    // Build where clause
    const where = {
      id: treasureMapId,
      ...(chapterId && { chapterId })
    }

    // Check if parley exists and user has permission
    const existingTreasureMap = await prisma.treasureMap.findUnique({
      where,
      select: {
        id: true,
        giverId: true,
        receiverId: true
      }
    })

    if (!existingTreasureMap) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Treasure map not found'
        },
        { status: 404 }
      )
    }

    // Build update data object, only including provided fields
    const updateData: any = {
      updatedAt: new Date()
    }

    // Add fields if they exist in the request
    if (clientName !== undefined) {
      updateData.clientName = clientName
    }
    if (clientEmail !== undefined) {
      updateData.clientEmail = clientEmail
    }
    if (clientPhone !== undefined) {
      updateData.clientPhone = clientPhone
    }
    if (serviceNeeded !== undefined) {
      updateData.serviceNeeded = serviceNeeded
    }
    if (notes !== undefined) {
      updateData.notes = notes
    }
    if (giverNotes !== undefined) {
      updateData.giverNotes = giverNotes
    }
    if (receiverId !== undefined) {
      updateData.receiverId = receiverId
    }
    if (giverId !== undefined) {
      updateData.giverId = giverId
    }
    if (isThirdParty !== undefined) {
      updateData.isThirdParty = isThirdParty
    }

    // Update the parley
    const updatedTreasureMap = await prisma.treasureMap.update({
      where: {
        id: treasureMapId
      },
      data: updateData,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        giver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true
          }
        },
        receiver: {
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
        treasureMap: updatedTreasureMap,
        sliceName: sliceTreasureMap,
        message: 'Treasure map updated successfully'
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: `Something went wrong while updating the treasure map: ${error}`
      },
      { status: 500 }
    )
  }
}
