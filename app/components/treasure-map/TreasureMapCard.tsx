import { Calendar, User, Building2, FileText, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { ITreasureMap } from '@/types/treasure-map'
import Picture from '../common/Picture'
import { setOpenTreasureMapDrawer } from '@/app/redux/features/treasureMapSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { useAppDispatch } from '@/app/redux/store'
import { useUpdateTreasureMapStatusMutation } from '@/app/redux/services/treasureMapApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { useSession } from 'next-auth/react'
import { showToast } from '@/app/redux/features/toastSlice'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'GIVEN':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'ACCEPTED':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'CONTACTED':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'CLOSED':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'DECLINED':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'GIVEN':
      return <MapPin className="w-4 h-4" />
    case 'CONTACTED':
      return <Phone className="w-4 h-4" />
    case 'ACCEPTED':
      return <CheckCircle className="w-4 h-4" />
    case 'CLOSED':
      return <CheckCircle className="w-4 h-4" />
    case 'DECLINED':
      return <FileText className="w-4 h-4" />
    default:
      return <MapPin className="w-4 h-4" />
  }
}

const TreasureMapCard: FC<{ treasureMap: ITreasureMap; index: number }> = ({ treasureMap, index }) => {
  const [isNotesExpanded, setIsNotesExpanded] = useState(false)
  const session = useSession()
  const dispatch = useAppDispatch()
  const [updateTreasureMapStatus, { isLoading }] = useUpdateTreasureMapStatusMutation()
  const [currentStatus, setCurrentStatus] = useState('')

  const handleStatusChange = async (treasureMapId: string, newStatus: string) => {
    setCurrentStatus(newStatus)
    try {
      await updateTreasureMapStatus({
        chapterId,
        userId: session.data?.user.id,
        treasureMapId,
        status: newStatus
      }).unwrap()
      dispatch(
        showToast({
          type: 'success',
          message: `Treasure Map Status Updated`,
          description: `Treasure Map updated successfully.`
        })
      )
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: `Treasure Map Status Updated Failed`,
          description: error?.data?.message
        })
      )
    }
  }

  return (
    <motion.div
      onClick={() => {
        dispatch(setOpenTreasureMapDrawer())
        dispatch(setInputs({ formName: 'treasureMapForm', data: { ...treasureMap, isUpdating: true } }))
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, ease: 'easeInOut' }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {/* Giver Avatar */}
            <Picture
              priority={false}
              src={treasureMap?.giver?.profileImage}
              alt={treasureMap?.giver?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-600"
            />
            {/* Receiver Avatar */}
            <Picture
              priority={false}
              src={treasureMap.receiver?.profileImage}
              alt={treasureMap.receiver?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-600"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{treasureMap.clientName}</h3>
            <p className="text-gray-400 text-sm">{treasureMap.chapter?.name}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(treasureMap.status)}`}
          >
            {getStatusIcon(treasureMap.status)}
            {treasureMap.status}
          </span>
        </div>
      </div>

      {/* Service Needed */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-gradient-to-r from-cyan-600/20 to-violet-600/20 rounded-lg">
          <Building2 className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Service Needed</p>
          <p className="text-white font-semibold">{treasureMap.serviceNeeded}</p>
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
            <p className="text-white text-sm font-medium">{treasureMap.giver?.name}</p>
            <p className="text-gray-400 text-xs">{treasureMap.giver?.company}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Receiver</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">{treasureMap.receiver?.name}</p>
            <p className="text-gray-400 text-xs">{treasureMap.receiver?.company}</p>
          </div>
        </div>
      </div>

      {/* Client Contact Info */}
      {(treasureMap.clientEmail || treasureMap.clientPhone) && (
        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-600 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Client Contact</span>
          </div>
          <div className="space-y-1">
            {treasureMap.clientEmail && (
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <span className="text-gray-300 text-sm">{treasureMap.clientEmail}</span>
              </div>
            )}
            {treasureMap.clientPhone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3 text-gray-400" />
                <span className="text-gray-300 text-sm">{treasureMap.clientPhone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-400">Created:</span>
            <p className="text-white">{formatDate(treasureMap.createdAt)}</p>
          </div>
        </div>

        {treasureMap.contactedAt && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <div>
              <span className="text-gray-400">Contacted:</span>
              <p className="text-white">{formatDate(treasureMap.contactedAt)}</p>
            </div>
          </div>
        )}

        {treasureMap.closedAt && (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <div>
              <span className="text-gray-400">Closed:</span>
              <p className="text-white">{formatDate(treasureMap.closedAt)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      {treasureMap.notes && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Notes</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsNotesExpanded(!isNotesExpanded)
              }}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
            >
              {isNotesExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isNotesExpanded ? 'auto' : '4.5rem' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 text-sm leading-relaxed">{treasureMap.notes}</p>
          </motion.div>
        </div>
      )}

      {/* Private Notes Section */}
      {(treasureMap.giverNotes || treasureMap.receiverNotes) && (
        <div className="border-t border-gray-600 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {treasureMap.giverNotes && (
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm font-medium">Giver Notes</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{treasureMap.giverNotes}</p>
              </div>
            )}

            {treasureMap.receiverNotes && (
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">Receiver Notes</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{treasureMap.receiverNotes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Management Section */}
      <div className="mt-4 pt-4 border-t border-gray-600/30">
        <div className="flex flex-col space-y-3">
          <div className="text-xs font-medium text-gray-400">Update Status</div>

          {/* Status Buttons Grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'GIVEN', color: 'bg-yellow-600' },
              { value: 'CONTACTED', color: 'bg-purple-600' },
              { value: 'ACCEPTED', color: 'bg-blue-600' },
              { value: 'CLOSED', color: 'bg-green-600' },
              { value: 'DECLINED', color: 'bg-red-600' }
            ].map((status) => (
              <button
                key={status.value}
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatusChange(treasureMap.id, status.value)
                }}
                className={`px-3 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                  treasureMap.status === status.value
                    ? `${status.color} text-white`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{status.value.charAt(0) + status.value.slice(1).toLowerCase()}</span>
                {currentStatus === status.value && isLoading && (
                  <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TreasureMapCard
