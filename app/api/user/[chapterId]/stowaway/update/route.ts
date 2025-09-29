import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { createLog } from '@/app/lib/utils/api/createLog'

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId

    const body = await req.json()
    const { stowawayId, name, email, company, website, industry } = body

    // Check if stowaway exists and user has permission to update
    const existingUser = await prisma.user.findFirst({
      where: {
        id: stowawayId,
        chapterId: chapterId
      }
    })

    if (!existingUser) {
      return NextResponse.json(
        {
          error: 'User not found or you do not have permission to update this profile'
        },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      name: name?.trim(),
      email: email?.trim(),
      company: company?.trim(),
      industry: industry?.trim(),
      website: website?.trim()
    }

    // Update the stowaway
    const stowaway = await prisma.user.update({ where: { id: existingUser.id }, data: updateData })

    await createLog('info', 'User updated stowaway', {
      location: ['app route - PUT /api/user/[chapterId]/stowaway/update'],
      message: `User updated stowaway`,
      name: 'StowawayUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        user: stowaway,
        succes: true,
        message: 'Stowaway updated'
      },
      { status: 200 }
    )
  } catch (error) {
    return await handleApiError({
      error,
      req,
      action: 'User update stowaway profile',
      sliceName: sliceUser
    })
  }
}
