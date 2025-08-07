import { NextRequest } from 'next/server'
import { updateChapterSettings } from '../services/updateChapterSettings'
import { getChapterSettings } from '../services/getChapterSettings'

export async function GET(req: NextRequest, { params }: any) {
  const parameters = await params
  return getChapterSettings(req, parameters.chapterId)
}

export async function PUT(req: NextRequest, { params }: any) {
  const parameters = await params
  return updateChapterSettings(req, parameters.chapterId)
}
