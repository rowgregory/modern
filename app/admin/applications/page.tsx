'use client'

import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { useGetUsersQuery } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import {
  XCircle,
  Filter,
  Search,
  Anchor,
  Waves,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  MoreVertical,
  Sailboat
} from 'lucide-react'
import { User } from '@prisma/client'
import { formatDate } from '@/app/lib/utils/date/formatDate'

const statusColors: any = {
  PENDING: 'bg-amber-900/30 text-amber-300 border-amber-600/50',
  ACTIVE: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/50',
  INACTIVE: 'bg-slate-700/50 text-slate-300 border-slate-500/50',
  SUSPENDED: 'bg-red-900/30 text-red-300 border-red-600/50',
  EXPIRED: 'bg-orange-900/30 text-orange-300 border-orange-600/50',
  CANCELLED: 'bg-gray-800/50 text-gray-300 border-gray-600/50'
}

const statusIcons: any = {
  PENDING: Clock,
  ACTIVE: CheckCircle,
  INACTIVE: XCircle,
  SUSPENDED: AlertCircle,
  EXPIRED: XCircle,
  CANCELLED: XCircle
}

const ApplicationCard: FC<{ application: User }> = ({ application }) => {
  const StatusIcon = statusIcons[application.membershipStatus]

  const handleStatusUpdate = (applicationId: string, newStatus: string) => {
    console.log(`Updating application ${applicationId} to status ${newStatus}`)
    // Here you would call your update mutation
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-600/30 p-6 hover:border-cyan-400/50 transition-all duration-300 shadow-lg shadow-slate-900/50"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-cyan-900/50">
            <Sailboat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{application.name}</h3>
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
          <button className="text-slate-400 hover:text-white transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-1">Business Specialties</div>
        <div className="flex flex-wrap gap-1">
          {application.interests.map((interest: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-cyan-900/20 text-cyan-300 text-xs rounded-full border border-cyan-600/30"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-600/30">
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${application.isLicensed ? 'bg-emerald-400' : 'bg-slate-400'}`} />
          <span className="text-xs text-slate-300">
            {application.businessLicenseNumber ? `Licensed (${application.businessLicenseNumber})` : 'No License'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {application.membershipStatus === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatusUpdate(application.id, 'ACTIVE')}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs text-white transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(application.id, 'SUSPENDED')}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-xs text-white transition-colors"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Applications = () => {
  const { data } = useGetUsersQuery({ chapterId, membershipStatus: 'PENDING' }) as { data: { users: User[] } }

  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<{ name: string } | null>(null)

  const filteredApplications = data?.users?.filter((app) => {
    const matchesStatus = selectedStatus === 'ALL' || app.membershipStatus === selectedStatus
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen relative overflow-hidden">
      <div className="flex h-[calc(100vh-66px)] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/50">
                  <Anchor className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Skipper Applications</h1>
                  <p className="text-slate-400">Coastal Referral Exchange - Storm Harbor Watch</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{data?.users?.length}</div>
                <div className="text-sm text-slate-400">Total Applications</div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {Object.entries({
                PENDING: data?.users?.filter((app) => app.membershipStatus === 'PENDING').length,
                ACTIVE: data?.users?.filter((app) => app.membershipStatus === 'ACTIVE').length,
                INACTIVE: data?.users?.filter((app) => app.membershipStatus === 'INACTIVE').length,
                SUSPENDED: data?.users?.filter((app) => app.membershipStatus === 'SUSPENDED').length,
                EXPIRED: data?.users?.filter((app) => app.membershipStatus === 'EXPIRED').length,
                CANCELLED: data?.users?.filter((app) => app.membershipStatus === 'CANCELLED').length
              }).map(([status, count]) => {
                const StatusIcon = statusIcons[status]
                return (
                  <motion.div
                    key={status}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-600/30 p-4 shadow-lg shadow-slate-900/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">{count}</div>
                        <div className="text-sm text-slate-300 capitalize">{status.toLowerCase()}</div>
                      </div>
                      <div className={`p-2 rounded-lg ${statusColors[status]}`}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all appearance-none"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                    <option value="EXPIRED">Expired</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Showing {filteredApplications?.length} of {data?.users?.length} applications
              </div>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="space-y-4">
            {filteredApplications?.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>

          {filteredApplications?.length === 0 && (
            <div className="text-center py-12">
              <Waves className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-400 mb-2">No applications found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Application Detail Modal would go here */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl border border-slate-600 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            {/* Detail content would go here */}
            <div className="text-slate-300">
              <p>Detailed view for {selectedApplication.name} would be implemented here...</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Applications
