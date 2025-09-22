import { sliceRendezvous } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate status
    const { status, id, title, description, type } = body
    const validStatuses = ['ACTIVE', 'REMOVED', 'CANCELLED']

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    // Update rendezvous status
    const rendezvous = await prisma.rendezvous.update({
      where: { id },
      data: { status, title, description, type }
    })

    return NextResponse.json(rendezvous)
  } catch (error) {
    return await handleApiError({
      error,
      req,
      action: 'Update rendezvous',
      sliceName: sliceRendezvous
    })
  } finally {
    await prisma.$disconnect()
  }
}
