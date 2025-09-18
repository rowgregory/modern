import { sliceGrog } from '@/app/lib/constants/api/sliceNames'
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
      title,
      description,
      category,
      type,
      cost,
      dresscode,
      date,
      time,
      duration,
      location,
      maxAttendees,
      attendees,
      featured,
      host,
      requirements,
      materials,
      registrationUrl,
      meetingUrl,
      grogId,
      isPublic,
      requiresRSVP,
      registrationDeadline
    } = body

    if (!grogId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Grog ID is required'
        },
        { status: 400 }
      )
    }

    // Build where clause
    const where = {
      id: grogId,
      ...(chapterId && { chapterId })
    }

    // Check if parley exists and user has permission
    const existingGrog = await prisma.grog.findUnique({
      where,
      select: {
        id: true
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

    // Build update data object, only including provided fields
    const updateData: any = {
      updatedAt: new Date(),
      title,
      category,
      type,
      date: new Date(date),
      time,
      duration,
      location,
      featured
    }

    // Add fields if they exist in the request
    if (description !== undefined) {
      updateData.description = description
    }
    if (cost !== undefined) {
      updateData.cost = cost
    }
    if (dresscode !== undefined) {
      updateData.dresscode = dresscode
    }
    if (maxAttendees !== undefined) {
      updateData.maxAttendees = Number(maxAttendees)
    }
    if (attendees !== undefined) {
      updateData.attendees = Number(attendees)
    }
    if (host !== undefined) {
      updateData.host = host
    }
    if (requirements !== undefined) {
      updateData.requirements = requirements
    }
    if (materials !== undefined) {
      updateData.materials = materials
    }
    if (registrationUrl !== undefined) {
      updateData.registrationUrl = registrationUrl
    }
    if (meetingUrl !== undefined) {
      updateData.meetingUrl = meetingUrl
    }
    if (isPublic !== undefined) {
      updateData.isPublic = isPublic
    }
    if (requiresRSVP !== undefined) {
      updateData.requiresRSVP = requiresRSVP
    }
    if (registrationDeadline !== undefined) {
      updateData.registrationDeadline = new Date(registrationDeadline)
    }

    // Update the parley
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
        treasureMap: updatedGrog,
        sliceName: sliceGrog,
        message: 'Grog updated successfully'
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: `Something went wrong while updating the grog: ${error}`
      },
      { status: 500 }
    )
  }
}
