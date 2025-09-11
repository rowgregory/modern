import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { createLog } from '@/app/lib/utils/api/createLog'

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId

    const body = await req.json()
    const { membershipStatus } = body

    // Check if user exists and user has permission to update
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
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

    // Update the user
    await prisma.user.update({ where: { id: userId }, data: { membershipStatus } })

    await createLog('info', 'User status updated by admin', {
      location: ['app route - GET /api/user/[chapterId]/[userId]/update-user=status'],
      message: `User status updated by admin`,
      name: 'UserStatusUpdatedByAdmin',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        succes: true,
        message: 'Swabbie status updated'
      },
      { status: 200 }
    )
  } catch (error) {
    return await handleApiError({
      error,
      req,
      action: 'Admin update user status profile',
      sliceName: sliceUser
    })
  }
}
