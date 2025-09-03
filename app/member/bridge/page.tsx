'use client'

import React from 'react'
import { motion } from 'framer-motion'
import StatCard from '@/app/components/bridge/StatCard'
import {
  Anchor,
  Calendar,
  FileText,
  Handshake,
  MoreHorizontal,
  Sailboat,
  Target,
  TrendingUp,
  Users,
  Video
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import QuickActionButton from '@/app/components/bridge/QuickActionButton'
import CircularProgress from '@/app/components/common/CircularProgress'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { IParley } from '@/types/parley'
import { User } from '@/types/user'
import { useGetUsersQuery } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'

const weeklyActivity = [
  { day: 'Mon', f2f: 34, leads: 28, meetings: 12 },
  { day: 'Tue', f2f: 28, leads: 22, meetings: 8 },
  { day: 'Wed', f2f: 42, leads: 35, meetings: 15 },
  { day: 'Thu', f2f: 38, leads: 31, meetings: 11 },
  { day: 'Fri', f2f: 45, leads: 38, meetings: 18 },
  { day: 'Sat', f2f: 15, leads: 12, meetings: 3 },
  { day: 'Sun', f2f: 8, leads: 6, meetings: 1 }
]

const MemberBridge = () => {
  const userStats = {} as any
  const recentConnections = [] as any
  const upcomingParleys = [] as any
  useGetUsersQuery({ chapterId }) as { data: { users: User[] | null } }

  return (
    <div className="bg-gray-900">
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-66px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="PARLEYS"
              value="147"
              change="+3 this month"
              icon={Handshake}
              color="from-cyan-500 to-cyan-600"
            />
            <StatCard
              title="TREASURE MAPS GENERATED"
              value="$12,450"
              change="+18.5%"
              icon={TrendingUp}
              color="from-blue-500 to-blue-600"
            />
            <StatCard title="Anchored" value="68%" change="+2.3%" icon={Anchor} color="from-violet-500 to-violet-600" />
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

          {/* Quick Actions */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionButton
                title="Schedule Parley"
                icon={Video}
                color="from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500"
              />
              <QuickActionButton
                title="Generate Treasure Map"
                icon={Target}
                color="from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500"
              />
              <QuickActionButton
                title="Log Anchored"
                icon={Anchor}
                color="from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-400 hover:to-violet-500"
              />
              <QuickActionButton
                title="Invite Skipper"
                icon={Sailboat}
                color="from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-400 hover:to-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 bg-gray-800/30 border-l border-gray-700/50 p-6 overflow-y-auto">
          {/* My Activity */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">My Activity</span>
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <CircularProgress percentage={72} value="72%" label="NETWORKING SCORE" color="rgb(139, 92, 246)" />
          </div>

          {/* Upcoming Parleys */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Upcoming Parleys</h3>
            <div className="space-y-3">
              {upcomingParleys?.length > 0 ? (
                upcomingParleys.map((parley: IParley, index: number) => (
                  <div key={index} className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-medium">
                          {parley.recipient.name || parley.requester.name}
                        </p>
                        <p className="text-gray-400 text-xs">{formatDate(parley.scheduledAt)}</p>
                      </div>
                      <div className="text-xs text-violet-400">{parley.meetingType}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No upcoming parleys scheduled</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg hover:bg-gray-700/30 transition-all text-left">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="text-gray-300 text-sm">Schedule New Parley</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg hover:bg-gray-700/30 transition-all text-left">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">Find Crew Members</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg hover:bg-gray-700/30 transition-all text-left">
                <FileText className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Update Profile</span>
              </button>
            </div>
          </div>

          {/* Chapter Members */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Recent Connections</h3>
            <div className="space-y-3">
              {recentConnections?.map((navigator: User, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    {navigator.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{navigator.name}</p>
                    <p className="text-gray-400 text-xs">{navigator.industry || navigator.company}</p>
                  </div>
                  <div className="text-xs text-green-400">Active</div>
                </div>
              ))}
            </div>
          </div>

          {/* My Stats */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">My Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Parleys This Month</span>
                <span className="text-white">{userStats?.parleysThisMonth || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Referrals Given</span>
                <span className="text-green-400 font-medium">{userStats?.referralsGiven || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Referrals Received</span>
                <span className="text-blue-400 font-medium">{userStats?.referralsReceived || 0}</span>
              </div>
            </div>

            <h4 className="text-white font-semibold mb-3 mt-6">Goals</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Monthly Target</span>
                <span className="text-white">4 parleys</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Progress</span>
                <span className="text-violet-400 font-medium">{userStats?.progressPercentage || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberBridge
