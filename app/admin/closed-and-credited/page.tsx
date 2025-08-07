'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const ClosedAndCredited = () => {
  return (
    <div className="bg-gray-900">
      <div className="flex h-[calc(100vh-66px)]">
        {/* Main Configuration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-end">
            <motion.button
              //   onClick={() => dispatch(setOpenAddLeadDrawer())}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New C&C</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClosedAndCredited
