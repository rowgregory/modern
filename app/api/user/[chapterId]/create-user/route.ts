import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { createLog } from '@/app/lib/utils/api/createLog'
import { validateUserData } from '@/app/lib/utils/api/validations/validateUserData'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const body = await req.json()

    // Validate input data
    const validationErrors = validateUserData(body)

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Please check your input data',
          fieldErrors: validationErrors,
          sliceName: sliceUser
        },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'Email already exists',
          field: 'email',
          message: 'A user with this email address already exists',
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

    // Set default values and dates
    const joinedAt = body.joinedAt ? new Date(body.joinedAt) : new Date()

    const expiresAt = body.expiresAt
      ? new Date(body.expiresAt)
      : new Date(joinedAt.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 year from join date

    // Create the user
    const createdUser = await prisma.user.create({
      data: {
        name: body?.name?.trim(),
        email: body?.email?.toLowerCase(),
        phone: body?.phone || null,
        role: body.isAdmin ? 'ADMIN' : 'MEMBER',
        company: body?.company?.trim(),
        ...(body?.location?.trim() && { location: body.location.trim() }),
        industry: body?.industry?.trim(),
        isLicensed: body?.isLicensed || false,
        ...(body?.location?.trim() && { location: body.location.trim() }),
        chapter: {
          connect: {
            id: chapterId
          }
        },
        membershipStatus: body?.membershipStatus || 'PENDING',
        isAdmin: !!body.isAdmin,
        joinedAt,
        expiresAt
      },
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    await createLog('info', 'New user created', {
      location: ['app route - POST /api/member/[chapterId]/create'],
      message: `New member created by admin`,
      name: 'NewMemberCreatedByAdmin',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        user: createdUser,
        sliceName: sliceUser
      },
      { status: 201 }
    )
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'Member created',
      sliceName: sliceUser
    })
  }
}
