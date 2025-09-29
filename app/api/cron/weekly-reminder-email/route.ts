import { sliceCron } from '@/app/lib/constants/api/sliceNames'
import weeklyReminderTemplate from '@/app/lib/email-templates/weekly-reminder'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendWeeklyReminders(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({ where: { membershipStatus: 'ACTIVE' } })

    const weekEndDate = 'tonight (Wednesday at 11:59 PM)'

    const emailPromises = users.map(async (user) => {
      return await resend.emails.send({
        from: 'no-reply@coastal-referral-exchange.com',
        to: user.email,
        subject: 'Log Your Treasure Maps, Anchors & Parleys - Midnight Deadline!',
        html: weeklyReminderTemplate(
          user.name || user.email.split('@')[0],
          weekEndDate,
          user.role === 'ADMIN' || user.isAdmin
        )
      })
    })

    await Promise.all(emailPromises)

    return NextResponse.json({
      success: true,
      message: `Weekly reminder sent to ${users.length} active members`,
      count: users.length
    })
  } catch (error: any) {
    return handleApiError({
      error,
      req,
      action: 'send weekly reminder email',
      sliceName: sliceCron,
      statusCode: error.statusCode || error.status || 500
    })
  }
}

// Handle both GET (cron) and POST (manual trigger)
export async function GET(req: NextRequest) {
  return sendWeeklyReminders(req)
}

export async function POST(req: NextRequest) {
  return sendWeeklyReminders(req)
}
