import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import parleyCompletedTemplate from '@/app/lib/email-templates/parley-complete'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const userAuth = getUserFromHeader({ req })

    if (!userAuth.success) {
      return userAuth.response!
    }

    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId
    const body = await req.json()

    const { status, parleyId } = body

    // Validate required fields
    if (!status || !parleyId) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Status and parleyId are required'
        },
        { status: 400 }
      )
    }

    // Validate status value
    const validStatuses = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Invalid status value'
        },
        { status: 400 }
      )
    }

    // Build where clause for finding the parley
    const where: any = {
      id: parleyId
    }

    if (chapterId) {
      where.chapterId = chapterId
    }

    // Check if parley exists and user has permission to update it
    const existingParley = await prisma.parley.findUnique({
      where,
      select: {
        id: true,
        requesterId: true,
        recipientId: true,
        status: true
      }
    })

    if (!existingParley) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Parley not found'
        },
        { status: 404 }
      )
    }

    // Check if user has permission to update this parley
    const canUpdate = existingParley.requesterId === userId || existingParley.recipientId === userId
    if (!canUpdate) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'You do not have permission to update this parley'
        },
        { status: 403 }
      )
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date()
    }

    // Add completion timestamp if marking as completed
    if (status === 'COMPLETED') {
      updateData.completed = true
      updateData.completedAt = new Date()
    }

    // Update the parley
    const updatedParley = await prisma.parley.update({
      where: {
        id: parleyId
      },
      data: updateData,
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
            company: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true
          }
        }
      }
    })

    if (updatedParley.status === 'COMPLETED') {
      const nodeEnv = process.env.NODE_ENV

      const baseUrl = nodeEnv === 'development' ? 'http://localhost:3000' : 'https://coastal-referral-exchange.com'
      const bridgePath = userAuth.user.isAdmin ? '/admin/parley' : '/member/parley'
      const fullUrl = `${baseUrl}${bridgePath}`

      const parleyCompletedHtmlString = parleyCompletedTemplate(
        updatedParley.requester.name,
        updatedParley.recipient.name,
        formatDate(updatedParley.updatedAt, { includeTime: true }),
        fullUrl
      )

      await resend.emails.send({
        from: `Parley Completed <no-reply@coastal-referral-exchange.com>`,
        to: [updatedParley.recipient.email],
        subject: `Parley between ${updatedParley.requester.name === 'Gregory Row' ? 'Sqysh' : updatedParley.requester.name} and ${updatedParley.recipient.name}`,
        html: parleyCompletedHtmlString
      })
    }

    return NextResponse.json(
      {
        parley: updatedParley,
        sliceName: sliceUser,
        message: `Parley status updated to ${status.toLowerCase()}`
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong while updating the parley status'
      },
      { status: 500 }
    )
  }
}
