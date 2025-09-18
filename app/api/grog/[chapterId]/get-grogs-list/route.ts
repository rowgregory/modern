import { sliceGrog } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET(_: any, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId

    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    const grogs = await prisma.grog.findMany({
      where,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      {
        grogs,
        sliceName: sliceGrog
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: `Something went wrong while fetching grogs: ${error}`
      },
      { status: 500 }
    )
  }
}
