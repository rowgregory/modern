import { sliceAnchor } from '@/app/lib/constants/api/sliceNames'
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
    const userId = parameters.userId
    const body = await req.json()

    const { anchorId, businessValue, clientName, closedDate, description, notes, receiverId, status } = body

    if (!anchorId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Anchor ID is required'
        },
        { status: 400 }
      )
    }

    // Build where clause
    const where = {
      id: anchorId,
      ...(chapterId && { chapterId })
    }

    // Check if parley exists and user has permission
    const existingAnchor = await prisma.anchor.findUnique({
      where,
      select: {
        id: true,
        giverId: true,
        receiverId: true
      }
    })

    if (!existingAnchor) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Anchor not found'
        },
        { status: 404 }
      )
    }

    // Check permissions - only requester or recipient can update
    const canUpdate: boolean = existingAnchor.giverId === userId || existingAnchor.receiverId === userId
    if (!canUpdate) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'You do not have permission to update this anchor'
        },
        { status: 403 }
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
    if (businessValue !== undefined) {
      updateData.businessValue = businessValue
    }
    if (closedDate !== undefined) {
      updateData.closedDate = closedDate
    }
    if (description !== undefined) {
      updateData.description = description
    }
    if (notes !== undefined) {
      updateData.notes = notes
    }
    if (status !== undefined) {
      updateData.status = status
    }
    if (receiverId !== undefined) {
      updateData.receiverId = receiverId
    }

    // Update the parley
    const updatedAnchor = await prisma.anchor.update({
      where: {
        id: anchorId
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
        anchor: updatedAnchor,
        sliceName: sliceAnchor,
        message: 'Anchor updated successfully'
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: `Something went wrong while updating the anchor: ${error}`
      },
      { status: 500 }
    )
  }
}
