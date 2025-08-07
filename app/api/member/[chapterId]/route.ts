import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET(_: any, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId

    // Build where clause
    const where: any = {}

    if (chapterId) {
      where.chapterId = chapterId
    }

    console.log('CHAPTERISE: ', chapterId)

    // Fetch users with pagination
    const members = await prisma.user.findMany({
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

    console.log('MMEBES: ', members)

    return NextResponse.json({
      members
    })
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
