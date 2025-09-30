import React, { FC, ReactNode } from 'react'
import { chapterId } from '../lib/constants/api/chapterId'
import { cookies } from 'next/headers'
import AdminLayoutClient from './admin-layout-client'

const asyncFetch = async (apiPath: string, fetchOptions: any) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/${chapterId}/${apiPath}`, fetchOptions)

  return response
}

const AdminLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const cookieStore = await cookies()

  const fetchOptions = {
    cache: 'no-store' as RequestCache,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString()
    }
  }

  const adminOverviewResponse = await asyncFetch('overview', fetchOptions)
  console.log('Admin overview response status:', adminOverviewResponse.status)

  if (!adminOverviewResponse.ok) {
    const errorText = await adminOverviewResponse.text()
    console.error('Admin API error:', errorText)
    return <div>Error loading user list</div>
  }

  const data = await adminOverviewResponse.json()

  return <AdminLayoutClient data={data}>{children}</AdminLayoutClient>
}

export default AdminLayout
