import { chapterId } from '@/app/lib/constants/api/chapterId'
import React, { FC, ReactNode } from 'react'
import AdminBridgeClient from './admin-bridge-client'
import { cookies } from 'next/headers'

const BridgeLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const cookieStore = await cookies()

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/${chapterId}/admin/list-stats`, {
    cache: 'no-store' as RequestCache,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString()
    }
  })

  if (!response.ok) {
    return <div>Error loading profile</div>
  }

  const profileData = await response.json()

  return <AdminBridgeClient initialData={profileData}>{children}</AdminBridgeClient>
}

export default BridgeLayout
