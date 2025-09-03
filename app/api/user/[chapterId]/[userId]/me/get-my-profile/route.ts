import { getMyProfile } from '@/app/api/user/services/getMyProfile'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  const parameters = await params
  return getMyProfile(req, parameters.chapterId, parameters.userId)
}
