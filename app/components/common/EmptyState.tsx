import { useAppDispatch } from '@/app/redux/store'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users } from 'lucide-react'

const EmptyState: FC<{
  searchQuery: string
  statusFilter: string
  typeFilter: string
  title: string
  advice: string
  func: any
  action: string
}> = ({ searchQuery, statusFilter, typeFilter, title, advice, func, action }) => {
  const dispatch = useAppDispatch()
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
      <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">No {title}s found</h3>
      <p className="text-gray-500 mb-6">
        {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
          ? 'Try adjusting your search or filters'
          : advice}
      </p>
      <motion.button
        onClick={() => dispatch(func())}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:via-cyan-500 hover:to-blue-500 transition-all flex items-center space-x-2 font-semibold mx-auto"
      >
        <Plus className="w-5 h-5" />
        <span>{action}</span>
      </motion.button>
    </motion.div>
  )
}

export default EmptyState
