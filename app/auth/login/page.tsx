'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2, Building2, Users, Shield, ShipWheel } from 'lucide-react'

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

  const handleTryAgain = () => {
    setIsEmailSent(false)
    setEmail('')
    setError('')
  }

  return (
    <div className="min-h-dvh mt-[-74px] bg-[#121212] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-2xl flex items-center justify-center">
              <ShipWheel className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
            The Bridge
          </h1>
          <p className="text-gray-400 text-lg">Access The Bridge to navigate your chapter dashboard</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
        >
          <AnimatePresence mode="wait">
            {!isEmailSent ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Sign in to The Bridge</h2>
                  <p className="text-gray-400 text-sm">Enter your email to receive a secure magic link</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        required
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading || !email}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Magic Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Magic Link</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-xs text-gray-500 text-center">
                    Only registered Core chapter members can access this system.
                    <br />
                    Contact your chapter admin if you need access.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="email-sent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>

                <h2 className="text-xl font-semibold text-white mb-3">Check your email</h2>

                <p className="text-gray-400 mb-2">We&apos;ve sent a secure magic link to:</p>

                <p className="text-violet-400 font-medium mb-6">{email}</p>

                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Click the link in your email to sign in securely. The link will expire in 15 minutes for your
                    security.
                  </p>
                </div>

                <motion.button
                  onClick={handleTryAgain}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all font-medium"
                >
                  Try a different email
                </motion.button>

                <p className="text-xs text-gray-500 mt-4">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-gray-400">Secure Access</p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-gray-400">Member Portal</p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-gray-400">Chapter Tools</p>
          </div>
        </motion.div>

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
