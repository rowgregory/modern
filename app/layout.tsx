import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ReduxWrapper from './redux-wrapper'
import { auth } from './lib/auth'
import { SessionProvider } from 'next-auth/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: false
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: false
})

export const metadata: Metadata = {
  title: 'Coastal Referral Exchange',
  description:
    'Discover meaningful connections with a fresh take on networking. Match, collaborate, and grow your influence on a platform built for real interactions'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider session={session}>
          <ReduxWrapper>{children}</ReduxWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
