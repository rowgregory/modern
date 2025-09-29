import { chapterId } from '@/app/lib/constants/api/chapterId'
import { cookies } from 'next/headers'
import NavigatorClientLayout from './navigator-client-layout'
import { ReactNode } from 'react'

export default async function NavigatorLayout({
  children,
  params
}: Readonly<{
  children: ReactNode
  params: Promise<{ navigatorId: string }>
}>) {
  const parameters = await params
  const navigatorId = parameters.navigatorId

  let initialData = null
  let error = null

  if (chapterId && navigatorId) {
    try {
      const cookieStore = await cookies()
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${chapterId}/${navigatorId}/get-user-by-id`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString()
        }
      })

      if (response.ok) {
        initialData = await response.json()
      } else {
        error = { status: response.status, message: 'Failed to fetch user data' }
      }
    } catch {
      error = { status: 500, message: 'Network error fetching user data' }
    }
  } else {
    error = { status: 400, message: 'Missing chapter ID or navigator ID' }
  }

  return (
    <NavigatorClientLayout initialData={initialData} error={error}>
      {children}
    </NavigatorClientLayout>
  )
}
