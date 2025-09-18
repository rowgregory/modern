import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { createLog } from '@/app/lib/utils/api/createLog'
import swabbieInitialReviewTemplate from '@/app/lib/email-templates/swabbie-initial-review'
import swabbieBackgroundCheckTemplate from '@/app/lib/email-templates/swabbie-background-check'
import swabbieRejectedTemplate from '@/app/lib/email-templates/swabbie-rejected'
import swabbieActiveTemplate from '@/app/lib/email-templates/swabbie-active'
import { Resend } from 'resend'
import swabbieSecondChanceTemplate from '@/app/lib/email-templates/swabbie-second-change'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const chapterId = parameters.chapterId
    const userId = parameters.userId

    const body = await req.json()
    const { membershipStatus, swabbieId } = body

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

    const updateData: any = {
      membershipStatus
    }

    switch (membershipStatus) {
      case 'INITIAL_REVIEW':
        updateData.initialReviewCompletedAt = `${new Date()}`
        updateData.isInitialReviewCompleted = true
        break
      case 'BACKGROUND_CHECK':
        updateData.backgroundCheckCompletedAt = `${new Date()}`
        updateData.isBackgroudCheckCompleted = true
        break
      case 'ACTIVE':
        updateData.finalDecisionAt = `${new Date()}`
        updateData.isFinalDecisionMade = true
        updateData.role = 'MEMBER'
        break
      case 'REJECTED':
        updateData.rejectedAt = `${new Date()}`
        updateData.rejectedStep = membershipStatus
        updateData.isRefected = true
        break
    }

    const updatedUser = await prisma.user.update({ where: { id: swabbieId }, data: updateData })

    const nodeEnv = process.env.NODE_ENV
    const baseUrl = nodeEnv === 'development' ? 'http://localhost:3000' : 'https://coastal-referral-exchange.com'
    const portPath = `/port/swabbie?swabbieId=${swabbieId}`
    const fullPortUrl = `${baseUrl}${portPath}`
    const noReplyEmail = '<no-reply@coastal-referral-exchange.com>'

    switch (updatedUser.membershipStatus) {
      case 'INITIAL_REVIEW':
        await resend.emails.send({
          from: `Initial Review ${noReplyEmail}`,
          to: [updatedUser.email],
          subject: `Your application is pending backgorund check`,
          html: swabbieInitialReviewTemplate(fullPortUrl)
        })
        break
      case 'BACKGROUND_CHECK':
        await resend.emails.send({
          from: `Background Check ${noReplyEmail}`,
          to: [updatedUser.email],
          subject: `Your application is pending final review`,
          html: swabbieBackgroundCheckTemplate(updatedUser.name, fullPortUrl)
        })
        break
      case 'ACTIVE':
        const bridgePath = '/member/bridge'
        const fullBridgeUrl = `${baseUrl}${bridgePath}`

        await resend.emails.send({
          from: `Final Decision ${noReplyEmail}`,
          to: [updatedUser.email],
          subject: `Welcome aboard – your application is approved!`,
          html: swabbieActiveTemplate(updatedUser.name, fullBridgeUrl)
        })
        break
      case 'REJECTED':
        await resend.emails.send({
          from: `Rejected ${noReplyEmail}`,
          to: [updatedUser.email],
          subject: `Your application was not approved at this time`,
          html: swabbieRejectedTemplate(updatedUser.name, updatedUser.rejectedAt ?? '')
        })
        break
      case 'PENDING':
        await resend.emails.send({
          from: `Appliation Status ${noReplyEmail}`,
          to: [updatedUser.email],
          subject: `Your application is being reconsidered`,
          html: swabbieSecondChanceTemplate(updatedUser.name, fullPortUrl)
        })
        break
    }

    await createLog('info', 'User status updated by admin', {
      location: ['app route - GET /api/user/[chapterId]/[userId]/update-user-status'],
      message: `User status updated by admin`,
      name: 'UserStatusUpdatedByAdmin',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        success: true,
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
