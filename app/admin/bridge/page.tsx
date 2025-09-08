'use client'

import React from 'react'
import { Users, Calendar, Settings, Download, MoreHorizontal } from 'lucide-react'
import CircularProgress from '@/app/components/common/CircularProgress'
import QuickActionButton from '@/app/components/bridge/QuickActionButton'
import AdminBridgeStatsGrid from '@/app/components/admin/bridge/AdminBridgeStatsGrid'
import AdminWeeklyActivityChart from '@/app/components/admin/bridge/AdminWeeklyActivityChart'
import IndustrySlots from '@/app/components/admin/bridge/IndustrySlots'
import AdminOuputSummary from '@/app/components/admin/bridge/AdminOuputSummary'
import MemberEngagement from '@/app/components/admin/bridge/MemberEngagement'
import TopPerformers from '@/app/components/admin/bridge/TopPerformers'

const AdminBridge = () => {
  return (
    <div className="bg-gray-900">
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-66px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:overflow-y-auto">
          {/* Stats Grid */}
          <AdminBridgeStatsGrid />
          {/* Weekly Activity Chart */}
          <AdminWeeklyActivityChart />

          {/* Industry Slots */}
          <IndustrySlots />

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
        <div className="block w-full md:w-80 bg-gray-800/30 border-l border-gray-700/50 p-6 overflow-y-auto">
          {/* Session Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">Session</span>
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <CircularProgress percentage={85} value="85%" color="rgb(34, 197, 94)" />
          </div>

          {/* Member Engagement */}
          <MemberEngagement />

          {/* Top Performers */}
          <TopPerformers />

          {/* Output Summary */}
          <AdminOuputSummary />
        </div>
      </div>
    </div>
  )
}

export default AdminBridge
