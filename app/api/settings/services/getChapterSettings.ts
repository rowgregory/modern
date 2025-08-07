import { sliceSettings } from '@/app/lib/constants/api/sliceNames'
import { createLog } from '@/app/lib/utils/api/createLog'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function getChapterSettings(req: NextRequest, chapterId: string) {
  try {
    // Validate chapter ID
    if (!chapterId) {
      return NextResponse.json({ error: 'Chapter ID is required' }, { status: 400 })
    }

    // Get chapter with settings
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: {
        id: true,
        name: true,
        location: true,
        meetingDay: true,
        meetingTime: true,
        meetingFrequency: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
    }

    // Log success
    await createLog('info', 'Chapter settings retrieved successfully', {
      location: ['app route - GET /api/settings/<chapterId>'],
      message: 'Chapter settings retrieved successfully',
      name: 'ChapterSettingsRetrieved',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      chapterId
    })

    return NextResponse.json(
      {
        settings: chapter
      },
      { status: 200 }
    )
  } catch (error: any) {
    return await handleApiError({
      error,
      req,
      action: 'Get chapter settings',
      sliceName: sliceSettings
    })
  }
}
