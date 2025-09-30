import { chapterId } from '@/app/lib/constants/api/chapterId'
import React, { FC, ReactNode } from 'react'
import MemberBridgeClient from './member-bridge-client'
import { cookies } from 'next/headers'
import { auth } from '@/app/lib/auth'

const BridgeLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const cookieStore = await cookies()
  const session = await auth()

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/${chapterId}/member/list-stats`, {
    cache: 'no-store' as RequestCache,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
      'x-user': JSON.stringify({
        // Add this
        id: session?.user?.id,
        email: session?.user?.email,
        name: session?.user?.name,
        role: session?.user?.role,
        isAdmin: session?.user?.isAdmin,
        isSuperUser: session?.user?.isSuperUser
      })
    }
  })

  if (!response.ok) {
    return <div>Error loading member bridge</div>
  }

  const profileData = await response.json()

  return <MemberBridgeClient initialData={profileData}>{children}</MemberBridgeClient>
}

export default BridgeLayout
