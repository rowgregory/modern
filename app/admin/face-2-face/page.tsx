'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  UserCheck,
  ArrowRight
} from 'lucide-react'
import { openFace2FaceDrawer } from '@/app/redux/features/face2FaceSlice'
import { useAppDispatch } from '@/app/redux/store'

// Mock data matching your Prisma model
const mockFaceToFaces = [
  {
    id: 'cm123abc456',
    createdAt: '2025-08-01T09:00:00.000Z',
    updatedAt: '2025-08-01T09:00:00.000Z',
    scheduledAt: '2025-08-05T14:00:00.000Z',
    duration: 45,
    location: 'Starbucks Downtown, 123 Main St',
    meetingType: 'FACE_2_FACE',
    requesterId: 'user_sarah123',
    requester: {
      id: 'user_sarah123',
      name: 'Sarah Johnson',
      email: 'sarah@digitalmarketingpro.com',
      phone: '(555) 123-4567',
      company: 'Digital Marketing Pro',
      profession: 'Digital Marketing',
      avatar: null
    },
    recipientId: 'user_mike456',
    recipient: {
      id: 'user_mike456',
      name: 'Mike Rodriguez',
      email: 'mike@rodriguezconst.com',
      phone: '(555) 987-6543',
      company: 'Rodriguez Construction',
      profession: 'Construction',
      avatar: null
    },
    status: 'CONFIRMED',
    completed: false,
    completedAt: null,
    referralGiven: false,
    referralReceived: false,
    followUpRequired: false,
    notes: 'Discussing potential referral partnership and upcoming project opportunities',
    requesterNotes: null,
    recipientNotes: null,
    chapterId: 'chapter_downtown'
  },
  {
    id: 'cm789def012',
    createdAt: '2025-07-28T11:30:00.000Z',
    updatedAt: '2025-08-03T16:30:00.000Z',
    scheduledAt: '2025-08-03T18:00:00.000Z',
    duration: 30,
    location: null,
    meetingType: 'VIRTUAL',
    requesterId: 'user_david789',
    requester: {
      id: 'user_david789',
      name: 'David Chen',
      email: 'david@chenfinancial.com',
      phone: '(555) 234-5678',
      company: 'Chen Financial Services',
      profession: 'Financial Planning',
      avatar: null
    },
    recipientId: 'user_lisa012',
    recipient: {
      id: 'user_lisa012',
      name: 'Lisa Thompson',
      email: 'lisa@thompsonre.com',
      phone: '(555) 876-5432',
      company: 'Thompson Real Estate',
      profession: 'Real Estate',
      avatar: null
    },
    status: 'COMPLETED',
    completed: true,
    completedAt: '2025-08-03T19:00:00.000Z',
    referralGiven: true,
    referralReceived: false,
    followUpRequired: true,
    notes: "Great discussion about investment opportunities for Lisa's clients",
    requesterNotes: 'Should follow up with mortgage lender contacts',
    recipientNotes: 'David mentioned new retirement planning services',
    chapterId: 'chapter_downtown'
  },
  {
    id: 'cm345ghi678',
    createdAt: '2025-07-25T14:15:00.000Z',
    updatedAt: '2025-08-02T10:00:00.000Z',
    scheduledAt: '2025-08-02T15:30:00.000Z',
    duration: 60,
    location: 'Business Center Cafe, 456 Business Blvd',
    meetingType: 'FACE_2_FACE',
    requesterId: 'user_jennifer345',
    requester: {
      id: 'user_jennifer345',
      name: 'Jennifer Walsh',
      email: 'jennifer@walshlaw.com',
      phone: '(555) 345-6789',
      company: 'Walsh Legal Group',
      profession: 'Legal Services',
      avatar: null
    },
    recipientId: 'user_robert678',
    recipient: {
      id: 'user_robert678',
      name: 'Robert Kim',
      email: 'robert@kimtech.com',
      phone: '(555) 765-4321',
      company: 'Kim Tech Solutions',
      profession: 'IT Services',
      avatar: null
    },
    status: 'CANCELLED',
    completed: false,
    completedAt: null,
    referralGiven: false,
    referralReceived: false,
    followUpRequired: false,
    notes: null,
    requesterNotes: 'Need to reschedule due to court appearance',
    recipientNotes: null,
    chapterId: 'chapter_downtown'
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'REQUESTED':
      return <Clock className="w-4 h-4" />
    case 'CONFIRMED':
      return <CheckCircle className="w-4 h-4" />
    case 'COMPLETED':
      return <UserCheck className="w-4 h-4" />
    case 'CANCELLED':
      return <XCircle className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'REQUESTED':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'CONFIRMED':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    case 'COMPLETED':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'CANCELLED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }
}

const getMeetingTypeIcon = (type: string) => {
  switch (type) {
    case 'VIRTUAL':
      return <Video className="w-4 h-4" />
    case 'PHONE':
      return <Phone className="w-4 h-4" />
    case 'FACE_2_FACE':
    default:
      return <Users className="w-4 h-4" />
  }
}

const getInitials = (name: any) => {
  return name
    .split(' ')
    .map((n: any[]) => n[0])
    .join('')
    .toUpperCase()
}

const formatDateTime = (dateString: string | number | Date) => {
  const date = new Date(dateString)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
}

const AdminFaceToFacePage = () => {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const statusOptions = [
    { value: 'all', label: 'All Status', count: mockFaceToFaces.length },
    { value: 'REQUESTED', label: 'Requested', count: mockFaceToFaces.filter((f) => f.status === 'REQUESTED').length },
    { value: 'CONFIRMED', label: 'Confirmed', count: mockFaceToFaces.filter((f) => f.status === 'CONFIRMED').length },
    { value: 'COMPLETED', label: 'Completed', count: mockFaceToFaces.filter((f) => f.status === 'COMPLETED').length },
    { value: 'CANCELLED', label: 'Cancelled', count: mockFaceToFaces.filter((f) => f.status === 'CANCELLED').length }
  ]

  const filteredF2Fs = mockFaceToFaces.filter((f2f) => {
    const matchesSearch =
      searchQuery === '' ||
      f2f.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f2f.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f2f.requester.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f2f.recipient.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || f2f.status === statusFilter
    const matchesType = typeFilter === 'all' || f2f.meetingType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="bg-gray-900">
      <div className="flex h-[calc(100vh-66px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 overflow-y-auto space-y-6"
        >
          <div className="flex items-center justify-end">
            <motion.button
              onClick={() => dispatch(openFace2FaceDrawer())}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Schedule New F2F</span>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusOptions.slice(1).map((status, index) => (
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
                  <div className={`p-3 rounded-lg ${getStatusColor(status.value)}`}>{getStatusIcon(status.value)}</div>
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
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              >
                {statusOptions.map((option) => (
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
                <option value="FACE_2_FACE">Face-to-Face</option>
                <option value="VIRTUAL">Virtual</option>
                <option value="PHONE">Phone</option>
              </select>
            </div>
          </div>

          {/* Face-to-Face List */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-7">
            <AnimatePresence>
              {filteredF2Fs.map((f2f, index) => {
                const scheduledDate = formatDateTime(f2f.scheduledAt)
                const completedDate = f2f.completedAt ? formatDateTime(f2f.completedAt) : null

                return (
                  <motion.div
                    key={f2f.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Main Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(f2f.status)}`}
                            >
                              {getStatusIcon(f2f.status)}
                              <span>{f2f.status.toLowerCase()}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400 text-sm">
                              {getMeetingTypeIcon(f2f.meetingType)}
                              <span>{f2f.meetingType.toLowerCase()}</span>
                            </div>
                            <div className="text-xs text-gray-500">{f2f.duration} min</div>
                          </div>
                          <div className="text-sm text-gray-400">
                            Created {new Date(f2f.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Participants with direction arrow */}
                        <div className="flex items-center space-x-4">
                          {/* Requester */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Requester</p>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(f2f.requester.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-white truncate">{f2f.requester.name}</p>
                                <p className="text-sm text-gray-400 truncate">{f2f.requester.company}</p>
                                <p className="text-xs text-gray-500">{f2f.requester.profession}</p>
                              </div>
                            </div>
                          </div>

                          {/* Direction Arrow */}
                          <div className="flex-shrink-0">
                            <ArrowRight className="w-6 h-6 text-gray-500" />
                          </div>

                          {/* Recipient */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Recipient</p>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(f2f.recipient.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-white truncate">{f2f.recipient.name}</p>
                                <p className="text-sm text-gray-400 truncate">{f2f.recipient.company}</p>
                                <p className="text-xs text-gray-500">{f2f.recipient.profession}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Meeting Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-violet-400" />
                            <span>
                              {f2f.status === 'COMPLETED' && completedDate
                                ? `Completed: ${completedDate.date} at ${completedDate.time}`
                                : `Scheduled: ${scheduledDate.date} at ${scheduledDate.time}`}
                            </span>
                          </div>
                          {f2f.location && (
                            <div className="flex items-center space-x-2 text-gray-300">
                              <MapPin className="w-4 h-4 text-violet-400" />
                              <span className="truncate">{f2f.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Outcomes (for completed meetings) */}
                        {f2f.completed && (
                          <div className="pt-2 border-t border-gray-700">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Meeting Outcomes</p>
                            <div className="flex flex-wrap gap-2">
                              {f2f.referralGiven && (
                                <span className="px-2 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded text-xs">
                                  Referral Given
                                </span>
                              )}
                              {f2f.referralReceived && (
                                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded text-xs">
                                  Referral Received
                                </span>
                              )}
                              {f2f.followUpRequired && (
                                <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded text-xs">
                                  Follow-up Required
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {f2f.notes && (
                          <div className="pt-2">
                            <p className="text-sm text-gray-400 italic">&quot;{f2f.notes}&quot;</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Empty State */}
            {filteredF2Fs.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Face-2-Face Meetings Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Schedule your first face-to-face meeting to get started'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-semibold mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Schedule New F2F</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminFaceToFacePage
