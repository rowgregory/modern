import { sliceGrog } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const body = await req.json()

    const { grogId, status } = body

    if (!status || !grogId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Status and grog ID are required'
        },
        { status: 400 }
      )
    }

    // Validate status value
    const validStatuses = ['COMPLETED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Invalid status value'
        },
        { status: 400 }
      )
    }

    // Build where clause for finding the grog
    const where: any = {
      id: grogId
    }

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Check if grog exists and user has permission to update it
    const existingGrog = await prisma.grog.findUnique({
      where,
      select: {
        id: true,
        status: true
      }
    })

    if (!existingGrog) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Grog not found'
        },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date()
    }

    // Update the grog
    const updatedGrog = await prisma.grog.update({
      where: {
        id: grogId
      },
      data: updateData,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(
      {
        grog: updatedGrog,
        sliceName: sliceGrog,
        message: `Grog status updated to ${status.toLowerCase()}`
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
