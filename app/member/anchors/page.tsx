'use client'

import React from 'react'
import { motion } from 'framer-motion'
import getAnchorStatusOptions from '@/app/lib/utils/anchor/getAnchorStatusOptions'
import getAnchorStatusIcon from '@/app/lib/utils/anchor/getAnchorStatusIcon'
import getAnchorStatusColor from '@/app/lib/utils/anchor/getAnchorStatusColor'
import { useGetMyAnchorsQuery } from '@/app/redux/services/anchorApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { useSession } from 'next-auth/react'
import { IAnchor } from '@/types/anchor'

const Anchors = () => {
  const session = useSession()
  const userId = session.data?.user?.id
  const { data } = useGetMyAnchorsQuery({ chapterId, userId }) as { data: { anchors: IAnchor[] } }
  const anchors = data?.anchors

  return (
    <div className="bg-gray-900 flex h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-6 overflow-y-auto space-y-6"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getAnchorStatusOptions(anchors)
            .slice(1)
            .map((status, index) => (
              <motion.div
                key={status.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{status.label}</p>
                    <p className="text-2xl font-bold text-white">{status.count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${getAnchorStatusColor(status.value)}`}>
                    {getAnchorStatusIcon(status.value)}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Anchors
