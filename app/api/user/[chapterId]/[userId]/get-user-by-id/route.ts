import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId

    if (!chapterId || !userId) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Missing required chapterId and userId',
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

    // Check if user  exists
    const user = await prisma.user.findFirst({
      where: { chapterId, id: userId }
    })

    if (!user) {
      return NextResponse.json(
        {
          field: 'email',
          message: 'A user with this id does not exist',
          sliceName: sliceUser
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        user: user,
        sliceName: sliceUser
      },
      { status: 201 }
    )
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'User fetched by userId',
      sliceName: sliceUser
    })
  }
}
