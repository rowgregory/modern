'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Users,
  Plus,
  Mail,
  Phone,
  Building,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown
} from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useGetMembersQuery } from '@/app/redux/services/memberApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { setOpenAddMembersDrawer } from '@/app/redux/features/memberSlice'

const MembersListPage = () => {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const { members } = useAppSelector((state: RootState) => state.member)
  useGetMembersQuery({ chapterId })

  const statusOptions = [
    { value: 'all', label: 'All Members', count: members.length },
    { value: 'ACTIVE', label: 'Active', count: members.filter((m) => m.membershipStatus === 'ACTIVE').length },
    { value: 'PENDING', label: 'Pending', count: members.filter((m) => m.membershipStatus === 'PENDING').length },
    { value: 'EXPIRED', label: 'Expired', count: members.filter((m) => m.membershipStatus === 'EXPIRED').length },
    {
      value: 'INACTIVE',
      label: 'Inactive',
      count: members.filter((m) => m.membershipStatus === 'INACTIVE').length
    },
    {
      value: 'SUSPENDED',
      label: 'Suspended',
      count: members.filter((m) => m.membershipStatus === 'SUSPENDED').length
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4" />
      case 'PENDING':
        return <Clock className="w-4 h-4" />
      case 'EXPIRED':
        return <XCircle className="w-4 h-4" />
      case 'INACTIVE':
        return <AlertCircle className="w-4 h-4" />
      case 'SUSPENDED':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'EXPIRED':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'INACTIVE':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
      case 'SUSPENDED':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const getDaysUntilExpiration = (expiresAt: string | number | Date) => {
    const today = new Date()
    const expiration = new Date(expiresAt)
    const diffTime = +expiration - +today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.profession.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || member.membershipStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-gray-900">
      <div className="flex h-[calc(100vh-66px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 overflow-y-auto space-y-8"
        >
          <div className="flex items-center justify-end">
            <motion.button
              onClick={() => dispatch(setOpenAddMembersDrawer())}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Member</span>
            </motion.button>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusOptions.slice(1, 5).map((status, index) => (
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
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, company, or profession..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all focus:outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} {option.count !== undefined && `(${option.count})`}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
              >
                <Users className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Members Grid/List */}
          <div
            className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}`}
          >
            <AnimatePresence>
              {filteredMembers.map((member, index) => {
                const daysUntilExpiration = getDaysUntilExpiration(member.expiresAt ?? '')
                const isExpiringSoon = daysUntilExpiration <= 30 && daysUntilExpiration > 0

                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all ${
                      viewMode === 'list' ? 'flex items-center space-x-6' : ''
                    }`}
                  >
                    {/* Member Info */}
                    <div className={`${viewMode === 'list' ? 'flex items-center space-x-4 flex-1' : 'space-y-4'}`}>
                      {/* Avatar and Basic Info */}
                      <div
                        className={`${viewMode === 'list' ? 'flex items-center space-x-4' : 'flex items-center space-x-4'}`}
                      >
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {getInitials(member.name)}
                          </div>
                          {member.membershipStatus === 'ACTIVE' && member.isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-white truncate">{member.name}</h3>
                            {member.membershipStatus === 'ACTIVE' && isExpiringSoon && (
                              <Crown className="w-4 h-4 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400 truncate">{member.company}</p>
                          <p className="text-xs text-gray-500">{member.profession}</p>
                        </div>
                      </div>

                      {viewMode === 'grid' && (
                        <>
                          {/* Contact Info */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-300 text-sm">
                              <Mail className="w-4 h-4 text-violet-400" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            {member.phone && (
                              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                <Phone className="w-4 h-4 text-violet-400" />
                                <span>{member.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2 text-gray-300 text-sm">
                              <Building className="w-4 h-4 text-violet-400" />
                              <span className="truncate">{member.chapter.name}</span>
                            </div>
                          </div>

                          {/* Membership Info */}
                          <div className="pt-3 border-t border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(member.membershipStatus)}`}
                              >
                                {getStatusIcon(member.membershipStatus)}
                                <span className="capitalize">{member.membershipStatus.toLowerCase()}</span>
                              </div>
                              {isExpiringSoon && (
                                <span className="text-xs text-yellow-400">{daysUntilExpiration} days left</span>
                              )}
                            </div>

                            <div className="text-xs text-gray-500">Joined: {formatDate(member.joinedAt ?? '')}</div>
                            <div className="text-xs text-gray-500">Expires: {formatDate(member.expiresAt ?? '')}</div>
                            {member.lastLoginAt && (
                              <div className="text-xs text-gray-500">Last active: {formatDate(member.lastLoginAt)}</div>
                            )}
                          </div>

                          {/* Interests */}
                          {member.interests.length > 0 && (
                            <div className="py-3 border-t border-gray-700">
                              <p className="text-xs text-gray-500 mb-2">Interests:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.interests.slice(0, 3).map((interest) => (
                                  <span
                                    key={interest}
                                    className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                                  >
                                    {interest}
                                  </span>
                                ))}
                                {member.interests.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                                    +{member.interests.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div
                      className={`${viewMode === 'list' ? 'flex space-x-2' : 'flex justify-between items-center pt-4 border-t border-gray-700'}`}
                    >
                      {viewMode === 'list' && (
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(member.membershipStatus)}`}
                          >
                            {getStatusIcon(member.membershipStatus)}
                            <span className="capitalize">{member.membershipStatus.toLowerCase()}</span>
                          </div>
                          <span>Joined {formatDate(member.joinedAt ?? '')}</span>
                          {isExpiringSoon && (
                            <span className="text-yellow-400">Expires in {daysUntilExpiration} days</span>
                          )}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-2 bg-gray-700/50 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all text-sm"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-all text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Empty State */}
            {filteredMembers.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Members Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Add your first chapter member to get started'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-semibold mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Member</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MembersListPage
