import { sliceRendezvous } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: any) {
  try {
    const body = await req.json()
    const { chapterId } = await params

    // Validate required fields
    const { description, title, type, startTime, endTime, status } = body

    if (!title || !type || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields: title, type' }, { status: 400 })
    }

    // Create rendezvous
    const rendezvous = await prisma.rendezvous.create({
      data: {
        title,
        description: description || null,
        type,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isRecurring: false,
        recurrencePattern: null,
        status: status || 'ACTIVE',
        chapterId: chapterId || null
      }
    })

    return NextResponse.json(rendezvous, { status: 201 })
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'Rendezvous created',
      sliceName: sliceRendezvous
    })
  } finally {
    await prisma.$disconnect()
  }
}
