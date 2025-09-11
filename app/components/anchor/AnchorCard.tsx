import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, DollarSign, Building2, User, FileText, MapPin } from 'lucide-react'
import { IAnchor } from '@/types/anchor'
import Picture from '../common/Picture'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { setOpenAnchorDrawer } from '@/app/redux/features/anchorSlice'
import { useAppDispatch } from '@/app/redux/store'
import { setInputs } from '@/app/redux/features/formSlice'

const formatCurrency = (amount: any, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'REPORTED':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'CLOSED':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const AnchorCard: FC<{ anchor: IAnchor; index: number }> = ({ anchor, index }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <motion.div
      onClick={() => {
        dispatch(setOpenAnchorDrawer())
        dispatch(setInputs({ formName: 'anchorForm', data: { ...anchor, isUpdating: true } }))
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, ease: 'easeInOut' }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {/* Giver Avatar */}
            <Picture
              priority={false}
              src={anchor.giver?.profileImage}
              alt={anchor.giver?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-600"
            />
            {/* Receiver Avatar */}
            <Picture
              priority={false}
              src={anchor.receiver?.profileImage}
              alt={anchor.receiver?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-600"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{anchor.clientName}</h3>
            <p className="text-gray-400 text-sm">{anchor?.chapter?.name}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(anchor.status)}`}>
          {anchor.status}
        </span>
      </div>

      {/* Business Value */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <DollarSign className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Business Value</p>
          <p className="text-white font-semibold">{formatCurrency(anchor.businessValue, anchor.currency)}</p>
        </div>
      </div>

      {/* Connection Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Giver</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">{anchor.giver?.name}</p>
            <p className="text-gray-400 text-xs">{anchor.giver?.company}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Receiver</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">{anchor.receiver?.name}</p>
            <p className="text-gray-400 text-xs">{anchor.receiver?.company}</p>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Closed:</span>
          <span className="text-white">{formatDate(anchor.closedDate)}</span>
        </div>
        <div className="text-gray-400">Created: {formatDate(anchor.createdAt)}</div>
      </div>

      {/* Description */}
      {anchor.description && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Description</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDescriptionExpanded(!isDescriptionExpanded)
              }}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
            >
              {isDescriptionExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isDescriptionExpanded ? 'auto' : '4.5rem' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 text-sm leading-relaxed">{anchor.description}</p>
          </motion.div>
        </div>
      )}

      {/* Notes */}
      {anchor.notes && (
        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Notes</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{anchor.notes}</p>
        </div>
      )}
    </motion.div>
  )
}

export default AnchorCard
