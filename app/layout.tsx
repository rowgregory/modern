import type { Metadata } from 'next'
import './globals.css'
import ReduxWrapper from './redux-wrapper'
import { auth } from './lib/auth'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'CORE',
  description:
    'Discover meaningful connections with a fresh take on networking. Match, collaborate, and grow your influence on a platform built for real interactions'
}

import { cookies } from 'next/headers'
import { chapterId } from './lib/constants/api/chapterId'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  let initialData = null
  let error = null

  try {
    const cookieStore = await cookies()
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${chapterId}/get-users-list`, {
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

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SessionProvider session={session}>
          <ReduxWrapper initialData={initialData} error={error}>
            {children}
          </ReduxWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
