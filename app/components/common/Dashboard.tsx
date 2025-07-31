'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  Handshake,
  Award,
  Calendar,
  Target,
  ArrowUp,
  ArrowDown,
  Settings,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  Mail,
  Phone,
  Star,
  Timer,
  Activity,
  FileText,
  Download,
  Percent,
  RefreshCw
} from 'lucide-react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { setOpenManageMembersDrawer } from '@/app/redux/features/dashboardSlice'
import { useAppDispatch } from '@/app/redux/store'
import ManageMembersDrawer from '@/app/drawers/ManageMembersDrawer'

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month')
  const [userRole] = useState('admin') // This would come from auth context
  const [selectedAnalyticsTab, setSelectedAnalyticsTab] = useState('overview')
  const [pendingApplications, setPendingApplications] = useState(8)
  const dispatch = useAppDispatch()
  // Enhanced analytics data
  const [animatedValues] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingApplications: 0,
    totalRevenue: 0,
    avgDealSize: 0,
    face2faceTotal: 0,
    leadsGenerated: 0,
    closedDeals: 0,
    conversionRate: 0,
    memberRetention: 0,
    chapterHealth: 0,
    meetingAttendance: 0
  })

  // Member applications data
  const memberApplications = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      company: 'Johnson Marketing Solutions',
      profession: 'Digital Marketing Consultant',
      phone: '+1 (555) 123-4567',
      appliedAt: '2024-07-25T10:30:00Z',
      status: 'PENDING',
      experience: '5 years in digital marketing, specializing in B2B campaigns',
      referredBy: 'Mike Chen'
    },
    {
      id: '2',
      name: 'David Rodriguez',
      email: 'david@techsolutions.com',
      company: 'TechSolutions Inc',
      profession: 'IT Support Specialist',
      phone: '+1 (555) 987-6543',
      appliedAt: '2024-07-24T14:15:00Z',
      status: 'PENDING',
      experience: '8 years in IT support and cybersecurity',
      referredBy: null
    },
    {
      id: '3',
      name: 'Emma Williams',
      email: 'emma.williams@legalaid.com',
      company: 'Williams Legal Services',
      profession: 'Business Attorney',
      phone: '+1 (555) 456-7890',
      appliedAt: '2024-07-23T09:45:00Z',
      status: 'PENDING',
      experience: '12 years specializing in small business law',
      referredBy: 'Jennifer Adams'
    }
  ]

  // Enhanced analytics data
  const revenueData = [
    { month: 'Jan', revenue: 245000, deals: 18, members: 82 },
    { month: 'Feb', revenue: 198000, deals: 14, members: 84 },
    { month: 'Mar', revenue: 312000, deals: 22, members: 85 },
    { month: 'Apr', revenue: 275000, deals: 19, members: 87 },
    { month: 'May', revenue: 423000, deals: 28, members: 89 },
    { month: 'Jun', revenue: 356000, deals: 24, members: 89 },
    { month: 'Jul', revenue: 485000, deals: 31, members: 89 }
  ]

  const membershipPipeline = [
    { name: 'Active Members', value: 76, color: '#06B6D4', trend: '+2.1%' },
    { name: 'Pending Applications', value: 8, color: '#F59E0B', trend: '+5 new' },
    { name: 'Under Review', value: 3, color: '#8B5CF6', trend: 'avg 2.3 days' },
    { name: 'Expired Members', value: 5, color: '#EF4444', trend: '-1 this month' }
  ]

  const professionDistribution = [
    { profession: 'Real Estate Agent', member: 'Jennifer Adams', filled: true, color: '#06B6D4' },
    { profession: 'IT Consultant', member: 'Mike Chen', filled: true, color: '#8B5CF6' },
    { profession: 'Business Attorney', member: 'Robert Taylor', filled: true, color: '#EC4899' },
    { profession: 'Digital Marketing', member: 'Sarah Johnson', filled: true, color: '#10B981' },
    { profession: 'Financial Advisor', member: 'Lisa Rodriguez', filled: true, color: '#F59E0B' },
    { profession: 'Insurance Agent', member: null, filled: false, color: '#EF4444' },
    { profession: 'CPA/Accountant', member: null, filled: false, color: '#6366F1' },
    { profession: 'Graphic Designer', member: null, filled: false, color: '#84CC16' },
    { profession: 'Construction Contractor', member: null, filled: false, color: '#64748B' },
    { profession: 'Healthcare Provider', member: null, filled: false, color: '#F97316' },
    { profession: 'Restaurant/Catering', member: null, filled: false, color: '#8B5CF6' },
    { profession: 'Auto Services', member: null, filled: false, color: '#06B6D4' }
  ]

  const weeklyActivity = [
    { day: 'Mon', f2f: 34, leads: 28, meetings: 12 },
    { day: 'Tue', f2f: 28, leads: 22, meetings: 8 },
    { day: 'Wed', f2f: 42, leads: 35, meetings: 15 },
    { day: 'Thu', f2f: 38, leads: 31, meetings: 11 },
    { day: 'Fri', f2f: 45, leads: 38, meetings: 18 },
    { day: 'Sat', f2f: 15, leads: 12, meetings: 3 },
    { day: 'Sun', f2f: 8, leads: 6, meetings: 1 }
  ]

  const memberEngagement = [
    { range: '90-100%', members: 23, color: '#10B981' },
    { range: '70-89%', members: 31, color: '#06B6D4' },
    { range: '50-69%', members: 18, color: '#F59E0B' },
    { range: '30-49%', members: 9, color: '#EF4444' },
    { range: '0-29%', members: 8, color: '#64748B' }
  ]

  const topPerformers = [
    { name: 'Jennifer Adams', deals: 8, revenue: 125000, f2f: 15 },
    { name: 'Mike Chen', deals: 6, revenue: 98000, f2f: 12 },
    { name: 'Robert Taylor', deals: 5, revenue: 87000, f2f: 14 },
    { name: 'Lisa Rodriguez', deals: 5, revenue: 76000, f2f: 11 },
    { name: 'James Wilson', deals: 4, revenue: 65000, f2f: 9 }
  ]

  const handleApplicationAction = async (applicationId: any, action: string, applicantEmail: any) => {
    // In real app, make API call
    console.log(`${action} application ${applicationId}`)

    // Simulate API call
    setPendingApplications((prev) => prev - 1)

    // Email would be sent automatically via API
    const emailType = action === 'approve' ? 'welcome' : 'rejection'
    console.log(`Sending ${emailType} email to ${applicantEmail}`)
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color,
    delay,
    prefix = '',
    suffix = '',
    large = false
  }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-emerald-400" />
            ) : trend === 'down' ? (
              <ArrowDown className="w-4 h-4 text-red-400" />
            ) : (
              <RefreshCw className="w-4 h-4 text-blue-400" />
            )}
            <span
              className={`text-sm font-semibold ${
                trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-blue-400'
              }`}
            >
              {trendValue}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">{title}</h3>
        <motion.p
          className={`${large ? 'text-4xl' : 'text-3xl'} font-bold text-white`}
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {prefix}
          {typeof value === 'number' ? value.toLocaleString() : value}
          {suffix}
        </motion.p>
      </div>
    </motion.div>
  )

  const ApplicationCard = ({ application }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {application.name
                .split(' ')
                .map((n: any[]) => n[0])
                .join('')}
            </span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{application.name}</h3>
            <p className="text-gray-300 text-sm">{application.profession}</p>
            <p className="text-gray-400 text-sm">{application.company}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
          Pending Review
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{application.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{application.phone}</span>
        </div>
        {application.referredBy && (
          <div className="flex items-center space-x-2 text-gray-300 col-span-2">
            <UserCheck className="w-4 h-4" />
            <span className="text-sm">Referred by: {application.referredBy}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm">
          <strong>Experience:</strong> {application.experience}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleApplicationAction(application.id, 'approve', application.email)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-400 hover:to-emerald-500 transition-all flex items-center space-x-2 font-semibold text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleApplicationAction(application.id, 'reject', application.email)}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-400 hover:to-red-500 transition-all flex items-center space-x-2 font-semibold text-sm"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-950" style={{ backgroundColor: '#121212' }}>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Member Dashboard</h1>
            <p className="text-gray-400">Member view would show personal metrics here</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <ManageMembersDrawer />
      <div className="min-h-screen bg-gray-950" style={{ backgroundColor: '#121212' }}>
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex smitems-center justify-between flex-col sm:flex-row">
              <div className="mb-3 sm:mb-0">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 text-lg">Complete chapter management and analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-6 py-3 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
                  style={{ backgroundColor: '#2A2A2A' }}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-semibold shadow-lg"
                  style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
                >
                  <Download className="w-5 h-5" />
                  <span>Export Report</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Analytics Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap sm:flex-nowrap gap-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700">
              {['overview', 'revenue', 'members', 'applications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedAnalyticsTab(tab)}
                  className={`flex-1 min-w-0 px-2 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 capitalize text-xs sm:text-base ${
                    selectedAnalyticsTab === tab
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span className="truncate block">
                    {tab === 'applications' ? (
                      <>
                        <span className="sm:hidden">Apps</span>
                        <span className="hidden sm:inline">Member Applications</span>
                      </>
                    ) : (
                      tab
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {selectedAnalyticsTab === 'overview' && (
            <>
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Members"
                  value={animatedValues.totalMembers}
                  icon={Users}
                  trend="up"
                  trendValue="+3 this month"
                  color="from-blue-500 to-blue-600"
                  delay={0.1}
                />
                <StatCard
                  title="Total Revenue"
                  value={animatedValues.totalRevenue}
                  icon={DollarSign}
                  trend="up"
                  trendValue="+18.5%"
                  color="from-emerald-500 to-emerald-600"
                  prefix="$"
                  delay={0.2}
                />
                <StatCard
                  title="Conversion Rate"
                  value={animatedValues.conversionRate}
                  icon={Target}
                  trend="up"
                  trendValue="+2.3%"
                  color="from-purple-500 to-purple-600"
                  suffix="%"
                  delay={0.3}
                />
                <StatCard
                  title="Chapter Health"
                  value={animatedValues.chapterHealth}
                  icon={Activity}
                  trend="up"
                  trendValue="+5 pts"
                  color="from-pink-500 to-pink-600"
                  suffix="/100"
                  delay={0.4}
                />
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Face-2-Face Meetings"
                  value={animatedValues.face2faceTotal}
                  icon={Handshake}
                  trend="up"
                  trendValue="+12%"
                  color="from-cyan-500 to-cyan-600"
                  delay={0.5}
                />
                <StatCard
                  title="Leads Generated"
                  value={animatedValues.leadsGenerated}
                  icon={TrendingUp}
                  trend="up"
                  trendValue="+8.3%"
                  color="from-blue-500 to-blue-600"
                  delay={0.6}
                />
                <StatCard
                  title="Closed Deals"
                  value={animatedValues.closedDeals}
                  icon={Award}
                  trend="up"
                  trendValue="+15.7%"
                  color="from-violet-500 to-violet-600"
                  delay={0.7}
                />
                <StatCard
                  title="Member Retention"
                  value={animatedValues.memberRetention}
                  icon={UserCheck}
                  trend="up"
                  trendValue="+1.2%"
                  color="from-green-500 to-green-600"
                  suffix="%"
                  delay={0.8}
                />
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Weekly Activity */}
                <motion.div
                  className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Weekly Activity Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111827',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="f2f"
                        stackId="1"
                        stroke="#06B6D4"
                        fill="#06B6D4"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stackId="1"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="meetings"
                        stackId="1"
                        stroke="#EC4899"
                        fill="#EC4899"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Member Engagement */}
                <motion.div
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Member Engagement</h3>
                  <div className="space-y-4">
                    {memberEngagement.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-gray-300 text-sm">{item.range}</span>
                        </div>
                        <span className="text-white font-bold">{item.members}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Charts Row 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Chapter Profession Slots */}
                <motion.div
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Chapter Profession Slots</h3>
                    <div className="text-sm text-gray-400">
                      {professionDistribution.filter((p) => p.filled).length} of {professionDistribution.length} filled
                    </div>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {professionDistribution.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full ${slot.filled ? '' : 'border-2 border-dashed border-gray-500'}`}
                            style={{ backgroundColor: slot.filled ? slot.color : 'transparent' }}
                          ></div>
                          <span className={`font-medium ${slot.filled ? 'text-white' : 'text-gray-400'}`}>
                            {slot.profession}
                          </span>
                        </div>
                        <div className="text-right">
                          {slot.filled ? (
                            <span className="text-emerald-400 text-sm font-medium">{slot.member}</span>
                          ) : (
                            <span className="text-gray-500 text-sm italic">Available</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Chapter Capacity:</span>
                      <span className="text-white font-medium">
                        {professionDistribution.filter((p) => p.filled).length}/{professionDistribution.length}(
                        {Math.round(
                          (professionDistribution.filter((p) => p.filled).length / professionDistribution.length) * 100
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Top Performers */}
                <motion.div
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Top Performers This Month</h3>
                  <div className="space-y-4">
                    {topPerformers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{member.name}</p>
                          <p className="text-gray-400 text-sm">
                            {member.deals} deals • {member.f2f} F2F meetings
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold">${member.revenue.toLocaleString()}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">#{index + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Revenue Tab */}
          {selectedAnalyticsTab === 'revenue' && (
            <div className="space-y-8">
              {/* Revenue Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={animatedValues.totalRevenue}
                  icon={DollarSign}
                  trend="up"
                  trendValue="+18.5%"
                  color="from-emerald-500 to-emerald-600"
                  prefix="$"
                  large={true}
                  delay={0.1}
                />
                <StatCard
                  title="Average Deal Size"
                  value={animatedValues.avgDealSize}
                  icon={Target}
                  trend="up"
                  trendValue="+12.3%"
                  color="from-blue-500 to-blue-600"
                  prefix="$"
                  delay={0.2}
                />
                <StatCard
                  title="Monthly Growth"
                  value="24.8"
                  icon={TrendingUp}
                  trend="up"
                  trendValue="+3.2%"
                  color="from-purple-500 to-purple-600"
                  suffix="%"
                  delay={0.3}
                />
              </div>

              {/* Revenue Chart */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111827',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          )}

          {/* Members Tab */}
          {selectedAnalyticsTab === 'members' && (
            <div className="space-y-8">
              {/* Member Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Total Members"
                  value={animatedValues.totalMembers}
                  icon={Users}
                  trend="up"
                  trendValue="+3"
                  color="from-blue-500 to-blue-600"
                  delay={0.1}
                />
                <StatCard
                  title="Active Members"
                  value={animatedValues.activeMembers}
                  icon={UserCheck}
                  trend="up"
                  trendValue="+2"
                  color="from-green-500 to-green-600"
                  delay={0.2}
                />
                <StatCard
                  title="Meeting Attendance"
                  value={animatedValues.meetingAttendance}
                  icon={Calendar}
                  trend="up"
                  trendValue="+5.2%"
                  color="from-purple-500 to-purple-600"
                  suffix="%"
                  delay={0.3}
                />
                <StatCard
                  title="Member Retention"
                  value={animatedValues.memberRetention}
                  icon={Target}
                  trend="up"
                  trendValue="+1.2%"
                  color="from-pink-500 to-pink-600"
                  suffix="%"
                  delay={0.4}
                />
              </div>

              {/* Membership Pipeline */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Membership Pipeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {membershipPipeline.map((stage, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg"
                        style={{
                          backgroundColor: stage.color,
                          boxShadow: `0 0 20px ${stage.color}40`
                        }}
                      >
                        <span className="text-white font-bold text-2xl">{stage.value}</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">{stage.name}</h4>
                      <p className="text-gray-400 text-sm">{stage.trend}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Applications Tab */}
          {selectedAnalyticsTab === 'applications' && (
            <div className="space-y-8">
              {/* Applications Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Member Applications</h2>
                  <p className="text-gray-400">Review and manage new member applications</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg font-semibold">
                    {pendingApplications} Pending Review
                  </div>
                </div>
              </div>

              {/* Applications Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {memberApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Pending Applications"
                  value={pendingApplications}
                  icon={Clock}
                  trend="neutral"
                  trendValue="8 this week"
                  color="from-yellow-500 to-yellow-600"
                  delay={0.1}
                />
                <StatCard
                  title="Approved This Month"
                  value="12"
                  icon={CheckCircle}
                  trend="up"
                  trendValue="+4 vs last month"
                  color="from-green-500 to-green-600"
                  delay={0.2}
                />
                <StatCard
                  title="Average Review Time"
                  value="2.3"
                  icon={Timer}
                  trend="down"
                  trendValue="-0.5 days"
                  color="from-blue-500 to-blue-600"
                  suffix=" days"
                  delay={0.3}
                />
                <StatCard
                  title="Approval Rate"
                  value="89"
                  icon={Percent}
                  trend="up"
                  trendValue="+3%"
                  color="from-purple-500 to-purple-600"
                  suffix="%"
                  delay={0.4}
                />
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.button
                onClick={() => dispatch(setOpenManageMembersDrawer())}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all flex items-center space-x-3 font-semibold"
                style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
              >
                <Users className="w-5 h-5" />
                <span>Manage Members</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all flex items-center space-x-3 font-semibold"
                style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Meeting</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-400 hover:to-violet-500 transition-all flex items-center space-x-3 font-semibold"
                style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
              >
                <FileText className="w-5 h-5" />
                <span>Generate Report</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-400 hover:to-pink-500 transition-all flex items-center space-x-3 font-semibold"
                style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' }}
              >
                <Settings className="w-5 h-5" />
                <span>Chapter Settings</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
