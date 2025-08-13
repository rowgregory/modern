// app/api/users/route.ts
import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { createLog } from '@/app/lib/utils/api/createLog'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const tempId = parameters.tempId

    if (!chapterId || !tempId) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Missing required chapterId and tempId',
          sliceName: sliceUser
        },
        { status: 400 }
      )
    }

    // Check if explorer  exists
    const explorer = await prisma.user.findFirst({
      where: { chapterId, tempId, membershipStatus: 'PENDING', role: 'EXPLORER' }
    })

    if (!explorer) {
      return NextResponse.json(
        {
          field: 'email',
          message: 'A user with this id does not exist',
          sliceName: sliceUser
        },
        { status: 400 }
      )
    }

    // Check if chapter exists
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId }
    })

    if (!chapter) {
      return NextResponse.json(
        {
          error: 'Chapter not found',
          field: 'chapterId',
          message: 'The specified chapter does not exist'
        },
        { status: 400 }
      )
    }

    await createLog('info', 'Explorer fetched by tempId', {
      location: ['app route - GET /api/user/[chapterId]/explorer/[tempId]'],
      message: `Explorer fetched by tempId`,
      name: 'ExplorerFetchedByTempId',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        user: explorer,
        sliceName: sliceUser
      },
      { status: 201 }
    )
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'Explorer fetched by tempId',
      sliceName: sliceUser
    })
  }
}
