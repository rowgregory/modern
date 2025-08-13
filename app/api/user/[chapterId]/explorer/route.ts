// app/api/users/route.ts
import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { createLog } from '@/app/lib/utils/api/createLog'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { createNotification } from '@/app/api/notification/services/createNotification'

// Create explorer
export async function POST(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const body = await req.json()

    if (!body.name || !body.email || !body.phone || !body.company || !body.profession || !body.location) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Please check your input data',
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

    // Create the "explorer"
    const createdExplorer = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email: body.email.toLowerCase(),
        location: body.location.toLowerCase(),
        phone: body.phone || null,
        role: 'EXPLORER',
        company: body.company.trim(),
        profession: body.profession.trim(),
        membershipStatus: 'PENDING',
        interests: body.interests || [],
        profileImage: null,
        isPublic: false,
        chapterId,
        tempId: body.tempId
      }
    })

    await createNotification({
      title: 'New Explorer Application',
      message: `${createdExplorer.name} has submitted an application`,
      type: 'APPLICATION_SUBMITTED',
      chapterId,
      entityId: createdExplorer.id,
      entityType: 'application'
    })

    await createLog('info', 'New explorer created', {
      location: ['app route - POST /api/user/[chapterId]/create-explorer'],
      message: `New explorer created`,
      name: 'ExplorerCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        user: createdExplorer,
        sliceName: sliceUser
      },
      { status: 201 }
    )
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'Explorer created',
      sliceName: sliceUser
    })
  }
}
