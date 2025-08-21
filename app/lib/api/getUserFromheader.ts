import { NextRequest, NextResponse } from 'next/server'
import { sliceAuth } from '../constants/api/sliceNames'

interface UserAuthOptions {
  req: NextRequest
}

interface UserAuthResult {
  success: boolean
  response?: NextResponse
  userId?: string
  user?: any
}

export function getUserFromHeader({ req }: UserAuthOptions): UserAuthResult {
  try {
    const userHeader = req.headers.get('x-user')

    if (!userHeader) {
      return {
        success: false,
        response: NextResponse.json(
          { message: 'Unauthorized: Missing user header', sliceName: sliceAuth },
          { status: 401 }
        )
      }
    }

    const parsedUser = JSON.parse(userHeader)
    const userId = parsedUser.id

    if (!userId) {
      return {
        success: false,
        response: NextResponse.json(
          { message: 'Unauthorized: Invalid user data', sliceName: sliceAuth },
          { status: 401 }
        )
      }
    }

    return {
      success: true,
      userId,
      user: parsedUser
    }
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { message: 'Unauthorized: Invalid user header format', sliceName: sliceAuth },
        { status: 401 }
      )
    }
  }
}
