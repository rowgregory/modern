import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Briefcase, Building2, Calendar, Clock, Mail, MapPin, Phone, Sailboat } from 'lucide-react'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { useUpdateUserStatusMutation } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'

const statusColors: any = {
  PENDING: 'bg-amber-900/30 text-amber-300 border-amber-600/50',
  REJECTED: 'bg-red-900/30 text-red-300 border-red-600/50'
}

const statusIcons: any = {
  PENDING: Clock,
  REJECTED: AlertCircle
}

const SwabbieCard: FC<{ application: any; index: number }> = ({ application, index }) => {
  const StatusIcon: any = statusIcons[application.membershipStatus]
  const [updateSwabbie, { isLoading }] = useUpdateUserStatusMutation()
  const [currentStatus, setCurrentStatus] = useState('')

  if (!StatusIcon) {
    return null // or return a default component
  }

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    setCurrentStatus(newStatus)
    await updateSwabbie({ chapterId, userId: application?.id, membershipStatus: newStatus }).unwrap()
  }

  const isRejected = application.membershipStatus === 'REJECTED'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, ease: 'easeInOut' }}
      className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-600/30 p-6 hover:border-cyan-400/50 transition-all duration-300 shadow-lg shadow-slate-900/50"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg ${
              isRejected
                ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-red-900/50'
                : 'bg-gradient-to-r from-cyan-600 to-blue-700 shadow-cyan-900/50'
            }`}
          >
            <Sailboat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isRejected ? 'text-red-200' : 'text-white'}`}>
              {application.name}
            </h3>
            <p className="text-sm text-slate-300">{application.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[application.membershipStatus]}`}
          >
            <div className="flex items-center space-x-1">
              <StatusIcon className="h-3 w-3" />
              <span>{application.membershipStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${isRejected ? 'opacity-75' : ''}`}>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate-300">
            <Mail className="h-4 w-4 mr-2 text-slate-400" />
            {application.email}
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <Phone className="h-4 w-4 mr-2 text-slate-400" />
            {application.phone}
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
            {application.location}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate-300">
            <Building2 className="h-4 w-4 mr-2 text-slate-400" />
            {application.company}
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <Briefcase className="h-4 w-4 mr-2 text-slate-400" />
            {application.industry}
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
            Applied {formatDate(application.createdAt)}
          </div>
        </div>
      </div>

      <div className={`mb-4 ${isRejected ? 'opacity-75' : ''}`}>
        <div className="text-xs text-slate-400 mb-1">Business Specialties</div>
        <div className="flex flex-wrap gap-1">
          {application.interests.map((interest: string, index: number) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full border ${
                isRejected
                  ? 'bg-red-900/20 text-red-300 border-red-600/30'
                  : 'bg-cyan-900/20 text-cyan-300 border-cyan-600/30'
              }`}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${application.isLicensed ? 'bg-emerald-400' : 'bg-gray-400'}`} />
          <span className="text-xs text-gray-300">
            {application.businessLicenseNumber ? `Licensed (${application.businessLicenseNumber})` : 'No License'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {application.membershipStatus === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatusUpdate(application.id, 'ACTIVE')}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs text-white transition-colors flex items-center gap-x-1"
              >
                {currentStatus === 'ACTIVE' && isLoading && (
                  <div className="w-2.5 h-2.5 border-2 border-white rounded-full border-top-0 animate-spin" />
                )}
                Welcome Aboard
              </button>
              <button
                onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-xs text-white transition-colors flex items-center gap-x-1"
              >
                {currentStatus === 'REJECTED' && isLoading && (
                  <div className="w-2.5 h-2.5 border-2 border-white rounded-full border-top-0 animate-spin" />
                )}
                Walk the Plank
              </button>
            </>
          )}
          {isRejected && (
            <button
              onClick={() => handleStatusUpdate(application.id, 'PENDING')}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs text-white transition-colors"
            >
              Give Second Chance
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
export default SwabbieCard
