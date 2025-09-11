'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  AlertCircle,
  Ban,
  Sailboat,
  User
} from 'lucide-react'
import { useUserSelector } from '@/app/redux/store'
import { User as IUser } from '@/types/user'

const statusIcons: any = {
  PENDING: Clock,
  REJECTED: Ban
}

const getStatusColor = (status: any) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'REJECTED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }
}

const getStatusOptions = (users: IUser[]) => [
  { value: 'all', label: 'All Status', count: users.length },
  { value: 'PENDING', label: 'Pending', count: users.filter((s) => s.membershipStatus === 'PENDING').length },
  {
    value: 'REJECTED',
    label: 'Rejected',
    count: users.filter((s) => s.membershipStatus === 'REJECTED').length
  }
]

const formatDate = (dateString: string | number | Date) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const SwabbieCard = ({ swabbie, index }: any) => {
  const StatusIcon = statusIcons[swabbie.membershipStatus] || AlertCircle
  const isRejected = swabbie.membershipStatus === 'SUSPENDED' || swabbie.membershipStatus === 'CANCELLED'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, ease: 'easeInOut' }}
      className={`backdrop-blur-md rounded-xl border p-6 transition-all duration-300 shadow-lg ${
        isRejected
          ? 'bg-red-900/20 border-red-600/30 hover:border-red-400/50 shadow-red-900/50'
          : 'bg-gray-800/50 border-gray-700/30 hover:border-cyan-400/50 shadow-gray-900/50'
      }`}
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
            <h3 className={`text-lg font-semibold ${isRejected ? 'text-red-200' : 'text-white'}`}>{swabbie.name}</h3>
            {/* <p className="text-sm text-gray-400">Added by {swabbie?.addedBy?.name}</p> */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(swabbie.membershipStatus)}`}
          >
            <StatusIcon className="h-3 w-3" />
            {swabbie.membershipStatus}
          </span>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${isRejected ? 'opacity-75' : ''}`}>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-300">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            {swabbie.email}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            {swabbie.phone}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            {swabbie.location}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-300">
            <Building2 className="h-4 w-4 mr-2 text-gray-400" />
            {swabbie.company}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
            {swabbie.industry}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            Joined {formatDate(swabbie.createdAt)}
          </div>
        </div>
      </div>

      <div className={`mb-4 ${isRejected ? 'opacity-75' : ''}`}>
        <div className="text-xs text-gray-400 mb-2">Specialties</div>
        <div className="flex flex-wrap gap-1">
          {swabbie?.specialties?.map((specialty: string, index: number) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full border ${
                isRejected
                  ? 'bg-red-900/20 text-red-300 border-red-600/30'
                  : 'bg-cyan-900/20 text-cyan-300 border-cyan-600/30'
              }`}
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${swabbie.isLicensed ? 'bg-emerald-400' : 'bg-gray-400'}`} />
          <span className="text-xs text-gray-300">
            {swabbie.businessLicenseNumber ? `Licensed (${swabbie.businessLicenseNumber})` : 'No License'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <User className="h-3 w-3" />
            <span>{swabbie?.addedBy?.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const SwabbiesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('newest')
  const { users } = useUserSelector()

  const filteredSwabbies = users
    ?.filter((user) => {
      // Only show PENDING and REJECTED (SUSPENDED/CANCELLED) users
      const isApplicationStatus = ['PENDING', 'REJECTED'].includes(user.membershipStatus)

      const matchesSearch = searchQuery === '' || user.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || user.membershipStatus === statusFilter

      return isApplicationStatus && matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name':
          return a.name.localeCompare(b.name)
        case 'company':
          return a.company.localeCompare(b.company)
        default:
          return 0
      }
    })

  return (
    <div className="bg-gray-900 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-6 overflow-y-auto space-y-6"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {getStatusOptions(users)
            .slice(1)
            .map((status, index) => (
              <motion.div
                key={status.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              >
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{status.label}</p>
                  <p className="text-2xl font-bold text-white">{status.count}</p>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, company, or navigator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="min-w-[200px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {getStatusOptions(users).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="min-w-[150px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="company">Company A-Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
          <p className="text-gray-400">
            Showing {filteredSwabbies.length} of {filteredSwabbies?.length} swabbies
          </p>
        </motion.div>

        {/* Swabbies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSwabbies.map((swabbie, index) => (
            <SwabbieCard key={swabbie.id} swabbie={swabbie} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredSwabbies.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No swabbies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default SwabbiesPage
