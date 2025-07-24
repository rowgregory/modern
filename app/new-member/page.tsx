'use client'

import React from 'react'
import { motion } from 'framer-motion'
import NewMemberForm from '../components/forms/NewMemberForm'
import { ArrowLeft } from 'lucide-react'
import { MotionLink } from '../components/common/MotionLink'

const NewMember = () => {
  return (
    <div className="bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
      </div>
      {/* Back Button */}
      <div className="relative z-10 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionLink
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </MotionLink>
        </div>
      </div>

      {/* Page Header */}
      <div className="relative z-10 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Local Business{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Network
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our growing community of local business professionals. Build meaningful connections, generate quality
              referrals, and grow your business through trusted networking.
            </p>
          </motion.div>
        </div>
      </div>
      <NewMemberForm />
    </div>
  )
}

export default NewMember
