import { NextRequest } from 'next/server'
import { getMyProfile } from '../../../services/getMyProfile'
import { updateMyProfile } from '../../../services/updateMyProfile'

export async function GET(req: NextRequest, { params }: any) {
  const parameters = await params
  return getMyProfile(req, parameters.chapterId, parameters.memberId)
}

export async function PUT(req: NextRequest, { params }: any) {
  const parameters = await params
  return updateMyProfile(req, parameters.chapterId, parameters.memberId)
}
