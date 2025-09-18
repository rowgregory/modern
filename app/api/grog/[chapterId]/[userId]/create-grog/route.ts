import { sliceGrog } from '@/app/lib/constants/api/sliceNames'
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
      registrationDeadline,
      meetingUrl
    } = body

    // Validate required fields
    if (!title || !type || !date || !time || !duration || !location) {
      return NextResponse.json(
        {
          message: `Missing required fields: title:${title}, type:${type}, date:${date}, time:${time}, duration:${duration}, location:${location}  are required`
        },
        { status: 400 }
      )
    }

    // Create the TreasureMap
    const grog = await prisma.grog.create({
      data: {
        title,
        description,
        category,
        type,
        cost,
        dresscode,
        date: new Date(date),
        time,
        duration,
        location,
        maxAttendees: Number(maxAttendees),
        attendees: Number(attendees),
        status: 'UPCOMING',
        featured,
        host,
        requirements,
        materials,
        registrationUrl,
        meetingUrl,
        chapterId,
        registrationDeadline
      },
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    await createLog('info', 'New grog created', {
      location: ['app route - POST /api/grog/[chapterId]/[userId]/create-grog'],
      message: `New grog created`,
      name: 'GrogCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      metadata: {
        grogId: grog.id,
        title: grog.title,
        type: grog.type,
        date: grog.date
      }
    })

    return NextResponse.json(
      {
        grog,
        message: 'Grog created successfully',
        sliceName: sliceGrog
      },
      { status: 201 }
    )
  } catch (error) {
    handleApiError({
      error,
      req,
      action: 'create grog',
      sliceName: sliceGrog
    })
  }
}
