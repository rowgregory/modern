'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Swabbies = () => {
  return (
    <div className="bg-gray-900 h-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center text-white">Swabbies</div>
      </motion.div>
    </div>
  )
}

export default Swabbies
