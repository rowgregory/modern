import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET(_: any, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId

    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Fetch parleys where user is either requester OR recipient
    if (userId) {
      where.OR = [{ requesterId: userId }, { recipientId: userId }]
    }

    const parleys = await prisma.parley.findMany({
      where,
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        },
        recipient: {
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
        parleys,
        sliceName: sliceUser
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while fetching parleys'
      },
      { status: 500 }
    )
  }
}
