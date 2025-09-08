'use client'

import React from 'react'
import { motion } from 'framer-motion'
import getTreasureMapStatusOptions from '@/app/lib/utils/treasure-map/getTreasureMapStatusOptions'
// import { chapterId } from '@/app/lib/constants/api/chapterId'
// import { useSession } from 'next-auth/react'
// import { ITreasureMap } from '@/types/treasure-map'
import getTreasureMapStatusColor from '@/app/lib/utils/treasure-map/getTreasureMapStatusColor'
import getTreasureMapStatusIcon from '@/app/lib/utils/treasure-map/getTreasureMapStatusIcon'

const TrasureMaps = () => {
  // const session = useSession()
  // const { data } = useGetMyTreasureMapsQuery({ chapterId, userId: session.data?.user?.id }) as {
  //   data: { treasureMaps: ITreasureMap[] }
  // }
  const treasureMaps: any[] = []

  return (
    <div className="bg-gray-900">
      <div className="flex h-[calc(100vh-66px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 overflow-y-auto space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {getTreasureMapStatusOptions(treasureMaps)
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
                    <div className={`p-3 rounded-lg ${getTreasureMapStatusColor(status.value)}`}>
                      {getTreasureMapStatusIcon(status.value)}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TrasureMaps
