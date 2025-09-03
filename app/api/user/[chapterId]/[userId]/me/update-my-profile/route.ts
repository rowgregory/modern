import { NextRequest } from 'next/server'
import { updateMyProfile } from '../../../../services/updateMyProfile'

export async function PUT(req: NextRequest, { params }: any) {
  const parameters = await params
  return updateMyProfile(req, parameters.chapterId, parameters.userId)
}
