'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  DollarSign,
  Target,
  Activity,
  TrendingUp,
  Calendar,
  Settings,
  Download,
  MoreHorizontal,
  Handshake,
  Award,
  UserCheck
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Circular Progress Component
export const CircularProgress = ({ percentage, label, value, color = 'rgb(34, 197, 94)' }: any) => {
  const radius = 45
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width="100" height="100">
        <circle cx="50" cy="50" r={radius} stroke="rgb(55, 65, 81)" strokeWidth="6" fill="transparent" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="text-xs text-gray-400 uppercase tracking-wide text-center">{label}</div>
      </div>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-green-400 text-sm font-medium flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" />
        {change}
      </span>
    </div>
    <div className="space-y-1">
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
)

// Top Performer Item
const TopPerformerItem = ({ name, subtitle, amount, rank, color }: any) => (
  <div className="flex items-center justify-between p-3 bg-gray-800/20 rounded-xl border border-gray-700/30 hover:border-gray-600/30 transition-colors">
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`}>
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-green-400 font-bold text-sm">{amount}</p>
      <p className="text-yellow-400 text-xs">#{rank}</p>
    </div>
  </div>
)

// Quick Action Button
const QuickActionButton = ({ title, icon: Icon, color, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl bg-gradient-to-r ${color} text-white font-medium hover:opacity-90 transition-opacity`}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </button>
)

const weeklyActivity = [
  { day: 'Mon', f2f: 34, leads: 28, meetings: 12 },
  { day: 'Tue', f2f: 28, leads: 22, meetings: 8 },
  { day: 'Wed', f2f: 42, leads: 35, meetings: 15 },
  { day: 'Thu', f2f: 38, leads: 31, meetings: 11 },
  { day: 'Fri', f2f: 45, leads: 38, meetings: 18 },
  { day: 'Sat', f2f: 15, leads: 12, meetings: 3 },
  { day: 'Sun', f2f: 8, leads: 6, meetings: 1 }
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

const topPerformers = [
  {
    name: 'Jennifer Adams',
    subtitle: '8 deals • 15 F2F meetings',
    amount: '$125,000',
    rank: '1',
    color: 'bg-blue-600'
  },
  {
    name: 'Mike Chen',
    subtitle: '6 deals • 12 F2F meetings',
    amount: '$98,000',
    rank: '2',
    color: 'bg-violet-600'
  },
  {
    name: 'Robert Taylor',
    subtitle: '5 deals • 14 F2F meetings',
    amount: '$87,000',
    rank: '3',
    color: 'bg-green-600'
  },
  {
    name: 'Lisa Rodriguez',
    subtitle: '5 deals • 11 F2F meetings',
    amount: '$76,000',
    rank: '4',
    color: 'bg-pink-600'
  },
  {
    name: 'James Wilson',
    subtitle: '4 deals • 9 F2F meetings',
    amount: '$65,000',
    rank: '5',
    color: 'bg-orange-600'
  }
]

const memberEngagement = [
  { range: '90-100%', count: 23, color: 'bg-green-500' },
  { range: '70-89%', count: 31, color: 'bg-blue-500' },
  { range: '50-69%', count: 18, color: 'bg-yellow-500' },
  { range: '30-49%', count: 9, color: 'bg-orange-500' },
  { range: '0-29%', count: 6, color: 'bg-red-500' }
]

const AdminBridge = () => {
  return (
    <div className="bg-gray-900">
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-66px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="TOTAL MEMBERS"
              value="147"
              change="+3 this month"
              icon={Users}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              title="TOTAL REVENUE"
              value="$12,450"
              change="+18.5%"
              icon={DollarSign}
              color="from-emerald-500 to-emerald-600"
            />
            <StatCard
              title="CONVERSION RATE"
              value="68%"
              change="+2.3%"
              icon={Target}
              color="from-purple-500 to-purple-600"
            />
            <StatCard
              title="CHAPTER HEALTH"
              value="94%"
              change="+1.2%"
              icon={Activity}
              color="from-pink-500 to-pink-600"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="TOTAL F2F"
              value="147"
              change="+3 this month"
              icon={Handshake}
              color="from-cyan-500 to-cyan-600"
            />
            <StatCard
              title="LEADS GENERATED"
              value="$12,450"
              change="+18.5%"
              icon={TrendingUp}
              color="from-blue-500 to-blue-600"
            />
            <StatCard title="C&C" value="68%" change="+2.3%" icon={Award} color="from-violet-500 to-violet-600" />
            <StatCard
              title="MEMBER RETENTION"
              value="94%"
              change="+1.2%"
              icon={UserCheck}
              color="from-green-500 to-green-600"
            />
          </div>

          {/* Weekly Activity Chart */}
          <motion.div
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Weekly Activity Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
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
                <Area type="monotone" dataKey="f2f" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
                <Area type="monotone" dataKey="leads" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
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

          {/* Profession Slots */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8"
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
            <div className="space-y-3 max-h-96 overflow-y-auto">
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
            <div className="mt-4 bg-gray-700/30 rounded-lg h-2">
              <div
                className="bg-gradient-to-r from-pink-500 via-amber-500 to-lime-500 h-2 rounded-lg"
                style={{ width: '67%' }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">Chapter Capacity: 8/12 (67%)</p>
          </motion.div>

          {/* Quick Actions */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionButton
                title="Manage Members"
                icon={Users}
                color="from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500"
              />
              <QuickActionButton
                title="Schedule Meeting"
                icon={Calendar}
                color="from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500"
              />
              <QuickActionButton
                title="Generate Report"
                icon={Download}
                color="from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-400 hover:to-violet-500"
              />
              <QuickActionButton
                title="Chapter Settings"
                icon={Settings}
                color="from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-400 hover:to-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-800/30 border-l border-gray-700/50 p-6 overflow-y-auto">
          {/* Session Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">Session</span>
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <CircularProgress percentage={85} value="85%" label="ENGAGEMENT" color="rgb(34, 197, 94)" />
          </div>

          {/* Member Engagement */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Member Engagement</h3>
            <div className="space-y-3">
              {memberEngagement.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-gray-300 text-sm">{item.range}</span>
                  </div>
                  <span className="text-white font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Top Performers This Month</h3>
            <div className="space-y-3">
              {topPerformers.map((performer) => (
                <TopPerformerItem
                  key={performer.rank}
                  name={performer.name}
                  subtitle={performer.subtitle}
                  amount={performer.amount}
                  rank={performer.rank}
                  color={performer.color}
                />
              ))}
            </div>
          </div>

          {/* Output Summary */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">Output</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Active Members</span>
                <span className="text-white">142 members</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Revenue</span>
                <span className="text-green-400 font-medium">$12.4K</span>
              </div>
            </div>

            <h4 className="text-white font-semibold mb-3 mt-6">Input</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">New Applications</span>
                <span className="text-white">8 pending</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Meeting Requests</span>
                <span className="text-white">23 requests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBridge
