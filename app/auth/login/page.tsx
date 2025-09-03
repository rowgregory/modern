'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import LoginCard from '@/app/components/auth/LoginCard'
import LoginFeatures from '@/app/components/auth/LoginFeatures'
import LoginHeader from '@/app/components/auth/LoginHeader'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/auth/custom-callback'
      })

      if (result?.error) {
        setError('Failed to send magic link. Please try again.')
      } else {
        setIsEmailSent(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-[#121212] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <LoginHeader />

        {/* Login Card */}
        <LoginCard
          email={email}
          error={error}
          handleSubmit={handleSubmit}
          isEmailSent={isEmailSent}
          isLoading={isLoading}
          setEmail={setEmail}
          setError={setError}
          setIsEmailSent={setIsEmailSent}
        />

        {/* Features */}
        <LoginFeatures />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-500">Coastal Referral Exchange Management System</p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
