import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/app/lib/constants/motion'
import LaunchAppButton from '../common/LaunchAppButton'
import CustomerAvatars from './CustomAvatars'

const HeroSection: FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <motion.section
      className="py-28 flex flex-col items-center justify-center text-white overflow-hidden relative"
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="absolute top-1/2 -translate-y-1/2 translate-x-4/5  w-96 h-96 opacity-30">
        <div className="w-full h-full bg-teal-500 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-96 opacity-30">
        <div className="w-full h-full bg-blue-600 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-4/5 w-96 h-96 opacity-30">
        <div className="w-full h-full bg-cyan-500 rounded-full blur-3xl"></div>
      </div>
      <CustomerAvatars />
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div variants={fadeInUp} className="mb-8 flex items-center justify-center flex-col">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent uppercase drop-shadow-2xl">
            Where business meets <br />
            the horizon
          </h1>
          <div className="mb-8 max-w-md w-full">
            Join forces with like-minded entrepreneurs who believe in connection, collaboration, and creating real
            opportunities that lead to lasting growth
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <LaunchAppButton />
        </div>
      </div>
    </motion.section>
  )
}

export default HeroSection
