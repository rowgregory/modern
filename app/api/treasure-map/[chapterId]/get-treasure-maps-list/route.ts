import { sliceParley } from '@/app/lib/constants/api/sliceNames'
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

    const treasureMaps = await prisma.treasureMap.findMany({
      where,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        giver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      {
        treasureMaps,
        sliceName: sliceParley
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: `Something went wrong while fetching treasure maps: ${error}`
      },
      { status: 500 }
    )
  }
}
