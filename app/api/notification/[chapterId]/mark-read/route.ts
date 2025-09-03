import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import markNotificationAsRead from '../../services/markNotificationAsRead'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceNotification } from '@/app/lib/constants/api/sliceNames'

interface MarkAsReadRequest {
  notificationId: string
  userId: string
}

export async function POST(req: NextRequest) {
  try {
    const body: MarkAsReadRequest = await req.json()
    const { notificationId, userId } = body

    // Validate required fields
    if (!notificationId || !userId) {
      return NextResponse.json(
        {
          message: 'Missing required fields: notificationId and userId are required'
        },
        { status: 400 }
      )
    }

    const result = await markNotificationAsRead(notificationId, userId)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    handleApiError({ error, req, action: 'mark notification as read', sliceName: sliceNotification })
  } finally {
    await prisma.$disconnect()
  }
}
