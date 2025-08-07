import prisma from '@/prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { createLog } from './utils/api/createLog'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  session: {
    strategy: 'jwt', // JWT only - no database sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    error: '/auth/error',
    signIn: '/auth/login',
    verifyRequest: '/auth/verify-request'
  },
  providers: [
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      maxAge: 15 * 60, // 15 mins
      from: process.env.RESEND_FROM_EMAIL!,
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        console.log('Sending magic link to:', email)
        console.log('🔗 Magic link URL:', url)

        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/send-verification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              url,
              from: provider.from
            })
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Failed to send email: ${errorData.error}`)
          }

          setTimeout(async () => {
            try {
              const tokens = await prisma.verificationToken.findMany({
                where: { identifier: email }
              })
              console.log('🎫 Tokens in DB after email sent:', tokens.length)
            } catch (err) {
              console.error('Error checking tokens:', err)
            }
          }, 1000)
        } catch (error) {
          console.error('Failed to send verification email:', error)
          throw error
        }
      }
    }
  ],
  callbacks: {
    async signIn({ user, account, email: emailData }) {
      // If this is just the initial email sending request, allow it
      if (emailData?.verificationRequest) {
        console.log('📧 This is a verification request (sending email) - allowing')
        return true
      }

      // This is the actual sign-in attempt (user clicked the magic link)
      if (account?.provider === 'email') {
        console.log('🔗 This is a magic link click - token already validated by NextAuth')

        try {
          // Check if user exists in database
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          // If user doesn't exist, reject sign-in (BNI members must be pre-created)
          if (!dbUser) {
            console.log('❌ User not found in database - rejecting sign-in')
            await createLog('warning', 'Sign-in attempt by non-member', {
              location: ['auth.ts - signIn callback - user not found'],
              name: 'NonMemberSignInAttempt',
              timestamp: new Date().toISOString(),
              email: user.email
            })
            return false
          }

          // Update user's last login
          await prisma.user.update({
            where: { id: dbUser.id },
            data: {
              lastLoginAt: new Date(),
              emailVerified: new Date()
            }
          })

          await createLog('info', 'Successful user sign-in', {
            location: ['auth.ts - signIn callback - success'],
            name: 'UserSignInSuccess',
            timestamp: new Date().toISOString(),
            userId: dbUser.id,
            email: user.email
          })

          return true
        } catch (error) {
          console.error('❌ Error handling email provider sign-in:', error)
          await createLog('error', 'Sign-in callback error', {
            location: ['auth.ts - signIn callback - error'],
            name: 'SignInCallbackError',
            timestamp: new Date().toISOString(),
            email: user.email,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          return false
        }
      }

      return true
    },
    async session({ session, token }) {
      // Only pass userId - keep JWT minimal
      if (token.userId && typeof token.userId === 'string') {
        session.user.id = token.userId
      } else {
        // Handle case where userId is missing (shouldn't happen in normal flow)
        console.error('❌ Missing userId in token')
        // Return session anyway to avoid type errors, but without id
        // This will likely cause issues in your app and force re-auth
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        // First time sign in - get user from database
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (dbUser) {
            // Store only userId in JWT
            token.userId = dbUser.id
          }
        } catch (error) {
          console.error('❌ Failed to fetch user for JWT:', error)
        }
      }
      return token
    }
  }
})
