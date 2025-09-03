import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId
    const body = await req.json()

    const { status, parleyId } = body

    // Validate required fields
    if (!status || !parleyId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Status and parleyId are required'
        },
        { status: 400 }
      )
    }

    // Validate status value
    const validStatuses = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
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
      id: parleyId
    }

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Check if parley exists and user has permission to update it
    const existingParley = await prisma.parley.findUnique({
      where,
      select: {
        id: true,
        requesterId: true,
        recipientId: true,
        status: true
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

    // Check if user has permission to update this parley
    const canUpdate = existingParley.requesterId === userId || existingParley.recipientId === userId
    if (!canUpdate) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'You do not have permission to update this parley'
        },
        { status: 403 }
      )
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date()
    }

    // Add completion timestamp if marking as completed
    if (status === 'COMPLETED') {
      updateData.completed = true
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
        message: `Parley status updated to ${status.toLowerCase()}`
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while updating the parley status'
      },
      { status: 500 }
    )
  }
}
