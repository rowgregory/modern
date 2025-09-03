import { IParley } from '@/types/parley'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

const ConfirmedActionButtons: FC<{ parley: IParley; handleStatusUpdate: any; isUpdating: boolean }> = ({
  parley,
  handleStatusUpdate,
  isUpdating
}) => {
  return (
    <div className="pt-4 border-t border-gray-700">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Meeting Confirmed</p>
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStatusUpdate(parley.id, 'COMPLETED')}
          disabled={isUpdating}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:via-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Mark as Completed</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStatusUpdate(parley.id, 'CANCELLED')}
          disabled={isUpdating}
          className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-600/10 hover:border-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <XCircle className="w-4 h-4" />
          <span>Cancel Meeting</span>
        </motion.button>
      </div>
    </div>
  )
}

export default ConfirmedActionButtons
