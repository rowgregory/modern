'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Skippers = () => {
  return (
    <div className="bg-gray-900">
      <div className="flex h-[calc(100vh-66px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          <div className="flex items-center text-white">Skippers</div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skippers
