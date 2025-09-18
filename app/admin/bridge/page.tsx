'use client'

import React from 'react'
import { Users, Settings, Download, MoreHorizontal, Scroll } from 'lucide-react'
import CircularProgress from '@/app/components/common/CircularProgress'
import QuickActionButton from '@/app/components/bridge/QuickActionButton'
import AdminBridgeStatsGrid from '@/app/components/admin/bridge/AdminBridgeStatsGrid'
import WeeklyActivityChart from '@/app/components/bridge/WeeklyActivityChart'
import IndustrySlots from '@/app/components/admin/bridge/IndustrySlots'
import AdminOuputSummary from '@/app/components/admin/bridge/AdminOuputSummary'
import MemberEngagement from '@/app/components/admin/bridge/MemberEngagement'
import TopPerformers from '@/app/components/admin/bridge/TopPerformers'
import { useListAdminStatsQuery } from '@/app/redux/services/dashboardApi'
import TooltipWrapper from '@/app/components/common/TooltipWrapper'
import { useRouter } from 'next/navigation'
import { chapterId } from '@/app/lib/constants/api/chapterId'

const AdminBridge = () => {
  const { data } = useListAdminStatsQuery({ chapterId })
  const { push } = useRouter()
  return (
    <div className="bg-gray-900">
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-66px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:overflow-y-auto">
          {/* Stats Grid */}
          <AdminBridgeStatsGrid data={data} />
          {/* Weekly Activity Chart */}
          <WeeklyActivityChart weeklyActivity={data?.weeklyActivity} />

          {/* Industry Slots */}
          <IndustrySlots industrySlots={data?.industrySlots} capacityPercent={data?.capacityPercent} />

          {/* Quick Actions */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionButton
                title="Manage Navigators"
                icon={Users}
                color="from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500"
                onClick={() => push('/admin/navigators')}
              />
              <QuickActionButton
                title="Call a Parley"
                icon={Scroll}
                color="from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500"
                onClick={() => push('/admin/parley')}
              />
              <QuickActionButton
                title="Generate Report"
                icon={Download}
                color="from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-400 hover:to-violet-500"
                onClick={() => push('/admin/reports')}
              />
              <QuickActionButton
                title="Rigging"
                icon={Settings}
                color="from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-400 hover:to-pink-500"
                onClick={() => push('/admin/rigging')}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="block w-full md:w-80 bg-gray-800/30 border-l border-gray-700/50 p-6 overflow-y-auto">
          {/* Session Info */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-400 text-sm font-medium">Session</span>
              <TooltipWrapper
                tooltip={`Participation measures how well active members are meeting expected weekly activity levels across treasure maps, anchors, and parleys. Each member gets a compliance score for each activity type (capped at 100% if they exceed expectations), and these three scores are averaged together. The final percentage represents the average compliance rate across all active members, showing overall community engagement relative to expected participation levels.`}
              >
                <MoreHorizontal className="text-gray-400 text-sm font-medium" />
              </TooltipWrapper>
            </div>
            <CircularProgress
              percentage={data?.participationPercent}
              value={data?.participationPercent}
              color="rgb(34, 197, 94)"
            />
          </div>

          {/* Member Engagement */}
          <MemberEngagement buckets={data?.buckets} />

          {/* Top Performers */}
          <TopPerformers topPerformers={data?.topPerformers} />

          {/* Output Summary */}
          <AdminOuputSummary
            activeMembers={data?.totalMembers}
            totalRevenue={data?.totalRevenue}
            newApplicationsCount={data?.newApplicationsCount}
            parleyRequestsCount={data?.parleyRequestsCount}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminBridge
