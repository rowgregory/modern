import { sliceCron } from '@/app/lib/constants/api/sliceNames'
import weeklyReminderTemplate from '@/app/lib/email-templates/weekly-reminder'
import { createLog } from '@/app/lib/utils/api/createLog'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper to get the correct base URL
function getBaseUrl() {
  // Use custom domain in production, fallback to VERCEL_URL for previews
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

async function sendWeeklyReminders(req: NextRequest) {
  const baseUrl = getBaseUrl()
  const normalizedUrl = `${baseUrl}/api/cron/weekly-reminder-email`

  try {
    const users = await prisma.user.findMany({ where: { membershipStatus: 'ACTIVE' } })

    const weekEndDate = 'tonight (Wednesday at 11:59 PM)'

    // Send emails with rate limiting (2 per second for Resend free tier)
    const results = []
    const BATCH_SIZE = 2
    const DELAY_MS = 1000 // 1 second between batches

    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE)

      const batchPromises = batch.map(async (user) => {
        try {
          const result = await resend.emails.send({
            from: 'no-reply@coastal-referral-exchange.com',
            to: user.email,
            subject: 'Log Your Treasure Maps, Anchors & Parleys - Midnight Deadline!',
            html: weeklyReminderTemplate(
              user.name || user.email.split('@')[0],
              weekEndDate,
              user.role === 'ADMIN' || user.isAdmin
            )
          })
          return { success: true, email: user.email, result }
        } catch (error) {
          return {
            success: false,
            email: user.email,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // Wait before next batch (unless it's the last batch)
      if (i + BATCH_SIZE < users.length) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS))
      }
    }

    // Count successes and failures
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length
    const failedEmails = results.filter((r) => !r.success).map((r) => ({ email: r.email, error: r.error }))

    // Log success
    await createLog('info', `Weekly reminder emails sent`, {
      location: ['app route - POST /api/cron/weekly-reminders'],
      message: `Sent ${successful}/${users.length} weekly reminder emails successfully`,
      name: 'WeeklyRemindersSent',
      timestamp: new Date().toISOString(),
      url: normalizedUrl,
      method: req.method,
      metadata: {
        totalUsers: users.length,
        successfulEmails: successful,
        failedEmails: failed,
        weekEndDate,
        executionTime: new Date().toISOString()
      }
    })

    // Log failures separately if any
    if (failed > 0) {
      await createLog('error', `Some weekly reminder emails failed`, {
        location: ['app route - POST /api/cron/weekly-reminders'],
        message: `${failed}/${users.length} email(s) failed to send`,
        name: 'WeeklyRemindersPartialFailure',
        timestamp: new Date().toISOString(),
        url: normalizedUrl,
        method: req.method,
        metadata: {
          failedCount: failed,
          failures: failedEmails
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: `Weekly reminder sent to ${successful}/${users.length} active members`,
      count: users.length,
      successful,
      failed
    })
  } catch (error: any) {
    await createLog('error', `Weekly reminder job failed`, {
      location: ['app route - POST /api/cron/weekly-reminders'],
      message: `Fatal error in weekly reminders: ${error instanceof Error ? error.message : 'Unknown error'}`,
      name: 'WeeklyRemindersError',
      timestamp: new Date().toISOString(),
      url: normalizedUrl,
      method: req.method,
      metadata: {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }
    })

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
