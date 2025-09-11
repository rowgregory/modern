'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import getTreasureMapStatusOptions from '@/app/lib/utils/treasure-map/getTreasureMapStatusOptions'
import { ITreasureMap } from '@/types/treasure-map'
import getTreasureMapStatusColor from '@/app/lib/utils/treasure-map/getTreasureMapStatusColor'
import getTreasureMapStatusIcon from '@/app/lib/utils/treasure-map/getTreasureMapStatusIcon'
import { useSession } from 'next-auth/react'
import { useGetMyTreasureMapsQuery } from '@/app/redux/services/treasureMapApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { Search } from 'lucide-react'
import EmptyState from '@/app/components/common/EmptyState'
import { setOpenTreasureMapDrawer } from '@/app/redux/features/treasureMapSlice'
import TreasureMapCard from '@/app/components/treasure-map/TreasureMapCard'

const TrasureMaps = () => {
  const session = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { data } = useGetMyTreasureMapsQuery({ chapterId, userId: session.data?.user?.id }) as {
    data: { treasureMaps: ITreasureMap[] }
  }
  const treasureMaps = data?.treasureMaps

  const filteredTreasureMaps = treasureMaps
    ?.filter((treasureMap) => {
      const matchesSearch =
        searchQuery === '' ||
        treasureMap.giver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treasureMap.receiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treasureMap.giver.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treasureMap.receiver.company.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || treasureMap.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Get current user ID
      const currentUserId = session.data?.user?.id

      // Check if user is recipient in each treasureMap
      const aIsRecipient = a.receiverId === currentUserId
      const bIsRecipient = b.receiverId === currentUserId

      // If one is recipient and other isn't, prioritize the recipient one
      if (aIsRecipient && !bIsRecipient) return -1
      if (!aIsRecipient && bIsRecipient) return 1

      // If both or neither are recipient, sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return (
    <div className="bg-gray-900 flex h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-6 overflow-y-auto space-y-6"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
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

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by navigator name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
            >
              {getTreasureMapStatusOptions(treasureMaps).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TreasureMap List */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredTreasureMaps?.map((treasureMap, index) => (
              <TreasureMapCard key={index} treasureMap={treasureMap} index={index} />
            ))}
          </AnimatePresence>
        </div>
        {/* Empty State */}
        {filteredTreasureMaps?.length === 0 && (
          <EmptyState
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            typeFilter={''}
            title="Treasure Map"
            advice="Mark the spot — help other navigators discover the X"
            func={setOpenTreasureMapDrawer}
            action="Treasure Map"
          />
        )}
      </motion.div>
    </div>
  )
}

export default TrasureMaps
