import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId

    const { searchParams } = new URL(req.url)

    const membershipStatus = searchParams.get('membershipStatus')

    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    if (membershipStatus) {
      where.membershipStatus = membershipStatus
    }

    const users = await prisma.user.findMany({
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
        createdAt: 'asc'
      }
    })

    return NextResponse.json(
      {
        users,
        sliceName: sliceUser
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while fetching users'
      },
      { status: 500 }
    )
  }
}
