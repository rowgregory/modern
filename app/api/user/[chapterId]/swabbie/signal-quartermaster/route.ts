import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: any) {
  const parameters = await params
  const chapterId = parameters.chapterId

  if (!chapterId) {
    return NextResponse.json({ message: 'Chapter Id missing' }, { status: 404 })
  }

  try {
    const body = await req.json()
    const { signal, swabbieId } = body

    const swabbie = await prisma.user.findFirst({ where: { id: swabbieId } })

    if (!swabbie) {
      return NextResponse.json({ message: 'Swabbie not found. Try again.' }, { status: 404 })
    }

    if (!signal) {
      return NextResponse.json({ message: 'Please enter a signal' }, { status: 400 })
    }

    // Handle different types of signals data
    let existingSignals: any[] = []

    if (swabbie.signals) {
      if (Array.isArray(swabbie.signals)) {
        existingSignals = swabbie.signals
      } else if (typeof swabbie.signals === 'string') {
        existingSignals = JSON.parse(swabbie.signals)
      } else if (typeof swabbie.signals === 'object' && swabbie.signals !== null) {
        // Convert JsonObject to array safely
        existingSignals = swabbie.signals as unknown as any[]
      } else {
        // For number, boolean, or other types, start with empty array
        existingSignals = []
      }
    }

    // Create new signal object with timestamp
    const newSignal = {
      message: signal,
      timestamp: new Date().toISOString(),
      chapter: 'Storm Watch'
    }

    // Add new signal to array
    const updatedSignals = [...existingSignals, newSignal]

    // Update user with new signals array
    await prisma.user.update({
      where: { id: swabbieId },
      data: {
        signals: updatedSignals // Store as JSON object, not string
      }
    })

    return NextResponse.json(
      {
        message: 'Signal sent successfully',
        signals: updatedSignals
      },
      { status: 200 }
    )
  } catch (error) {
    return await handleApiError({
      error,
      req,
      action: 'Swabbie signaling quartermaster',
      sliceName: sliceUser
    })
  }
}
