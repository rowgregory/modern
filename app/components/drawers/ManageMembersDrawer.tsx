import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Search,
  Plus,
  Edit3,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Clock,
  Users,
  Send,
  Ban,
  Download
} from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setCloseManageMembersDrawer } from '@/app/redux/features/memberSlice'

const ManageMembersDrawer = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedMember, setSelectedMember] = useState(null)
  const [, setShowMemberForm] = useState(false)
  const [, setEditingMember] = useState(null)
  const { manageMembersDrawer } = useAppSelector((state: RootState) => state.admin)
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(setCloseManageMembersDrawer())
  // Sample members data - based on your Prisma schema
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Jennifer Adams',
      email: 'jennifer.adams@email.com',
      phone: '+1 (555) 123-4567',
      company: 'Adams Real Estate Group',
      profession: 'Real Estate Agent',
      membershipStatus: 'ACTIVE',
      joinedAt: '2023-01-15T00:00:00Z',
      expiresAt: '2025-01-15T00:00:00Z',
      lastLoginAt: '2024-07-27T14:30:00Z',
      isActive: true,
      isPublic: true,
      interests: ['Real Estate', 'Investment', 'Property Management'],
      profileImage: null,
      chapterId: 'chapter-1',
      // Performance metrics
      face2faceCount: 15,
      leadsGiven: 8,
      leadsReceived: 12,
      closedDeals: 3,
      totalRevenue: 125000,
      attendanceRate: 95
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@techsolve.com',
      phone: '+1 (555) 987-6543',
      company: 'TechSolve Solutions',
      profession: 'IT Consultant',
      membershipStatus: 'ACTIVE',
      joinedAt: '2023-03-20T00:00:00Z',
      expiresAt: '2025-03-20T00:00:00Z',
      lastLoginAt: '2024-07-28T09:15:00Z',
      isActive: true,
      isPublic: true,
      interests: ['Technology', 'Cybersecurity', 'Cloud Computing'],
      profileImage: null,
      chapterId: 'chapter-1',
      face2faceCount: 12,
      leadsGiven: 6,
      leadsReceived: 9,
      closedDeals: 2,
      totalRevenue: 98000,
      attendanceRate: 88
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@marketingpro.com',
      phone: '+1 (555) 456-7890',
      company: 'Marketing Pro Agency',
      profession: 'Digital Marketing Specialist',
      membershipStatus: 'PENDING',
      joinedAt: null,
      expiresAt: null,
      lastLoginAt: null,
      isActive: false,
      isPublic: true,
      interests: ['Digital Marketing', 'Social Media', 'SEO'],
      profileImage: null,
      chapterId: 'chapter-1',
      face2faceCount: 0,
      leadsGiven: 0,
      leadsReceived: 0,
      closedDeals: 0,
      totalRevenue: 0,
      attendanceRate: 0
    },
    {
      id: '4',
      name: 'Robert Taylor',
      email: 'robert@legalservices.com',
      phone: '+1 (555) 234-5678',
      company: 'Taylor Legal Services',
      profession: 'Business Attorney',
      membershipStatus: 'EXPIRED',
      joinedAt: '2022-06-10T00:00:00Z',
      expiresAt: '2024-06-10T00:00:00Z',
      lastLoginAt: '2024-06-05T16:20:00Z',
      isActive: false,
      isPublic: false,
      interests: ['Business Law', 'Contract Law', 'Intellectual Property'],
      profileImage: null,
      chapterId: 'chapter-1',
      face2faceCount: 8,
      leadsGiven: 4,
      leadsReceived: 6,
      closedDeals: 2,
      totalRevenue: 67000,
      attendanceRate: 72
    },
    {
      id: '5',
      name: 'Lisa Rodriguez',
      email: 'lisa@financialplanning.com',
      phone: '+1 (555) 345-6789',
      company: 'Rodriguez Financial Planning',
      profession: 'Financial Advisor',
      membershipStatus: 'ACTIVE',
      joinedAt: '2023-08-12T00:00:00Z',
      expiresAt: '2025-08-12T00:00:00Z',
      lastLoginAt: '2024-07-27T11:45:00Z',
      isActive: true,
      isPublic: true,
      interests: ['Financial Planning', 'Investment', 'Retirement Planning'],
      profileImage: null,
      chapterId: 'chapter-1',
      face2faceCount: 11,
      leadsGiven: 5,
      leadsReceived: 8,
      closedDeals: 2,
      totalRevenue: 76000,
      attendanceRate: 91
    }
  ])

  // Filter members based on search and status
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profession.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || member.membershipStatus.toLowerCase() === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'EXPIRED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'SUSPENDED':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4" />
      case 'PENDING':
        return <Clock className="w-4 h-4" />
      case 'EXPIRED':
        return <XCircle className="w-4 h-4" />
      case 'SUSPENDED':
        return <Ban className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleStatusChange = async (memberId: string, newStatus: string) => {
    setMembers((prev) =>
      prev.map((member) => (member.id === memberId ? { ...member, membershipStatus: newStatus } : member))
    )

    // In real app, make API call
    console.log(`Updating member ${memberId} status to ${newStatus}`)
  }

  const handleDeleteMember = async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      setMembers((prev) => prev.filter((member) => member.id !== memberId))
      console.log(`Deleting member ${memberId}`)
    }
  }

  const handleSendEmail = (member: { email: any }, type: string) => {
    console.log(`Sending ${type} email to ${member.email}`)
    // In real app, trigger email API
  }

  const MemberCard = ({ member }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {member.name
                .split(' ')
                .map((n: any[]) => n[0])
                .join('')}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-300 text-sm">{member.profession}</p>
            <p className="text-gray-400 text-xs">{member.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(member.membershipStatus)}`}
          >
            {getStatusIcon(member.membershipStatus)}
            <span>{member.membershipStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <Mail className="w-4 h-4" />
          <span className="text-sm truncate">{member.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{member.phone}</span>
        </div>
      </div>

      {member.membershipStatus === 'ACTIVE' && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center">
            <p className="text-cyan-400 font-bold text-lg">{member.face2faceCount}</p>
            <p className="text-gray-400 text-xs">F2F</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 font-bold text-lg">{member.leadsGiven}</p>
            <p className="text-gray-400 text-xs">Leads Given</p>
          </div>
          <div className="text-center">
            <p className="text-purple-400 font-bold text-lg">{member.closedDeals}</p>
            <p className="text-gray-400 text-xs">Closed</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-400 font-bold text-lg">{member.attendanceRate}%</p>
            <p className="text-gray-400 text-xs">Attendance</p>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedMember(member)}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setEditingMember(member)}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all flex items-center justify-center space-x-2 text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit</span>
        </motion.button>
        {member.membershipStatus === 'PENDING' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatusChange(member.id, 'ACTIVE')}
            className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-400 hover:to-emerald-500 transition-all flex items-center justify-center text-sm font-medium"
          >
            <CheckCircle className="w-4 h-4" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleDeleteMember(member.id)}
          className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-400 hover:to-red-500 transition-all flex items-center justify-center text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )

  const MemberDetailsModal = ({ member, onClose }: any) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Member Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-white font-medium">{member.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white font-medium">{member.email}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <p className="text-white font-medium">{member.phone}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Company</label>
                <p className="text-white font-medium">{member.company}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Profession</label>
                <p className="text-white font-medium">{member.profession}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <div
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.membershipStatus)}`}
                >
                  {getStatusIcon(member.membershipStatus)}
                  <span className="ml-1">{member.membershipStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Info */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Membership Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">Joined Date</label>
                <p className="text-white font-medium">
                  {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'Not joined yet'}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Expires Date</label>
                <p className="text-white font-medium">
                  {member.expiresAt ? new Date(member.expiresAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Last Login</label>
                <p className="text-white font-medium">
                  {member.lastLoginAt ? new Date(member.lastLoginAt).toLocaleDateString() : 'Never'}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Profile Visibility</label>
                <p className="text-white font-medium">{member.isPublic ? 'Public' : 'Private'}</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          {member.membershipStatus === 'ACTIVE' && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-cyan-400 font-bold text-2xl">{member.face2faceCount}</p>
                  <p className="text-gray-400 text-sm">Face-2-Face Meetings</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 font-bold text-2xl">{member.leadsGiven}</p>
                  <p className="text-gray-400 text-sm">Leads Given</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-400 font-bold text-2xl">{member.leadsReceived}</p>
                  <p className="text-gray-400 text-sm">Leads Received</p>
                </div>
                <div className="text-center">
                  <p className="text-emerald-400 font-bold text-2xl">{member.closedDeals}</p>
                  <p className="text-gray-400 text-sm">Closed Deals</p>
                </div>
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-2xl">${member.totalRevenue.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-pink-400 font-bold text-2xl">{member.attendanceRate}%</p>
                  <p className="text-gray-400 text-sm">Attendance Rate</p>
                </div>
              </div>
            </div>
          )}

          {/* Interests */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {member.interests.map((interest: any, index: number) => (
                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSendEmail(member, 'welcome')}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 font-medium"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingMember(member)
                onClose()
              }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all flex items-center justify-center space-x-2 font-medium"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Member</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {manageMembersDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-gray-900 shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Manage Members
                </h2>
                <p className="text-gray-400 mt-1">
                  {filteredMembers.length} of {members.length} members
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMemberForm(true)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-400 hover:to-emerald-500 transition-all flex items-center space-x-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </motion.button>
                <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all flex items-center space-x-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </motion.button>
              </div>
            </div>

            {/* Members List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No members found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Member Details Modal */}
          <AnimatePresence>
            {selectedMember && <MemberDetailsModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default ManageMembersDrawer
