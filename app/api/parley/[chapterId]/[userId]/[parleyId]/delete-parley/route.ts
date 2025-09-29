// app/api/parley/[parleyId]/route.ts
import { sliceParley } from '@/app/lib/constants/api/sliceNames'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  parleyId: string
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const userAuth = getUserFromHeader({ req })

    if (!userAuth.success) {
      return userAuth.response!
    }

    const { parleyId } = await params
    const userId = userAuth.userId

    const parley = await prisma.parley.findUnique({
      where: { id: parleyId }
    })

    if (!parley) {
      return NextResponse.json({ error: 'Parley not found' }, { status: 404 })
    }

    // Check if the requester is the owner
    if (parley.requesterId !== userId) {
      return NextResponse.json({ error: 'Forbidden: You can only delete your own parleys' }, { status: 403 })
    }

    await prisma.parley.delete({
      where: { id: parleyId }
    })

    return NextResponse.json({ success: true, message: 'Parley deleted successfully' }, { status: 200 })
  } catch (error: any) {
    return handleApiError({ error, req, action: 'delete parley', sliceName: sliceParley })
  }
}
