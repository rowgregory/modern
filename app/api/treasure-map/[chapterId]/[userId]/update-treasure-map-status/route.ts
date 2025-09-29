import { sliceTreasureMap } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const body = await req.json()

    const { treasureMapId, status } = body

    if (!status || !treasureMapId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Status and treasure map ID are required'
        },
        { status: 400 }
      )
    }

    // Validate status value
    const validStatuses = ['GIVEN', 'ACCEPTED', 'CONTACTED', 'CLOSED', 'DECLINED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Invalid status value'
        },
        { status: 400 }
      )
    }

    // Build where clause for finding the parley
    const where: any = {
      id: treasureMapId
    }

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Check if parley exists and user has permission to update it
    const existingTreasureMap = await prisma.treasureMap.findUnique({
      where,
      select: {
        id: true,
        giverId: true,
        receiverId: true,
        status: true
      }
    })

    if (!existingTreasureMap) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Treasure Map not found'
        },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date()
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
        message: `Treasure Map status updated to ${status.toLowerCase()}`
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.data.message
      },
      { status: 500 }
    )
  }
}
