'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import getAnchorStatusOptions from '@/app/lib/utils/anchor/getAnchorStatusOptions'
import getAnchorStatusIcon from '@/app/lib/utils/anchor/getAnchorStatusIcon'
import getAnchorStatusColor from '@/app/lib/utils/anchor/getAnchorStatusColor'
import { useGetMyAnchorsQuery } from '@/app/redux/services/anchorApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { useSession } from 'next-auth/react'
import { IAnchor } from '@/types/anchor'
import AnchorCard from '@/app/components/anchor/AnchorCard'
import EmptyState from '@/app/components/common/EmptyState'
import { Search } from 'lucide-react'
import { setOpenAnchorDrawer } from '@/app/redux/features/anchorSlice'

const Anchors = () => {
  const session = useSession()
  const userId = session.data?.user?.id
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const { data } = useGetMyAnchorsQuery({ chapterId, userId }) as { data: { anchors: IAnchor[] } }
  const anchors = data?.anchors

  const filteredAnchors = anchors
    ?.filter((anchor) => {
      const matchesSearch =
        searchQuery === '' ||
        anchor.giver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anchor.receiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anchor.giver.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anchor.receiver.company.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || anchor.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Get current user ID
      const currentUserId = session.data?.user?.id

      // Check if user is recipient in each anchor
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

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by member name or company..."
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
              {getAnchorStatusOptions(anchors).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
            >
              <option value="all">All Types</option>
              <option value="DECK_TO_DECK">Deck-to-Deck</option>
              <option value="VOYAGE_CALL">Voyage Call</option>
              <option value="MESSAGE_IN_A_BOTTLE">Message In a Bottle</option>
            </select>
          </div>
        </div>

        {/* Anchor List */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredAnchors?.map((anchor, index) => (
              <AnchorCard key={index} anchor={anchor} index={index} />
            ))}
          </AnimatePresence>
        </div>
        {/* Empty State */}
        {filteredAnchors?.length === 0 && (
          <EmptyState
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            title="Anchor"
            advice="Drop your first anchor to get started"
            func={setOpenAnchorDrawer}
            action="Drop Anchor"
          />
        )}
      </motion.div>
    </div>
  )
}

export default Anchors
