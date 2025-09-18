'use client'

import React from 'react'
import { Anchor, FileText, Layers3, MessageSquare, MoreHorizontal, Sailboat, Scroll, Users } from 'lucide-react'
import QuickActionButton from '@/app/components/bridge/QuickActionButton'
import CircularProgress from '@/app/components/common/CircularProgress'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { IParley } from '@/types/parley'
import { setOpenAnchorDrawer } from '@/app/redux/features/anchorSlice'
import { setOpenParleyDrawer } from '@/app/redux/features/parleySlice'
import { useAppDispatch } from '@/app/redux/store'
import { useListMemberStatsQuery } from '@/app/redux/services/dashboardApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import MemberBridgeStatsGrid from '@/app/components/member/MemberBridgeStatsGrid'
import WeeklyActivityChart from '@/app/components/bridge/WeeklyActivityChart'
import { setOpenTreasureMapDrawer } from '@/app/redux/features/treasureMapSlice'
import { setOpenSwabbieDrawer } from '@/app/redux/features/userSlice'
import Link from 'next/link'
import TooltipWrapper from '@/app/components/common/TooltipWrapper'

const MemberBridge = () => {
  const { data, isFetching } = useListMemberStatsQuery({ chapterId })
  const dispatch = useAppDispatch()

  return (
    <div className="bg-gray-900">
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-66px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:overflow-y-auto">
          <MemberBridgeStatsGrid data={data} isFetching={isFetching} />
          {/* Weekly Activity Chart */}
          <WeeklyActivityChart weeklyActivity={data?.weeklyActivity} />

          {/* Quick Actions */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
              <QuickActionButton
                title="Call a Parley"
                icon={Scroll}
                color="from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-400 hover:to-teal-500"
                onClick={() => dispatch(setOpenParleyDrawer())}
              />
              <QuickActionButton
                title="Send Treasure Map"
                icon={Layers3}
                color="from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500"
                onClick={() => dispatch(setOpenTreasureMapDrawer())}
              />
              <QuickActionButton
                title="Drop Anchor"
                icon={Anchor}
                color="from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-400 hover:to-sky-500"
                onClick={() => dispatch(setOpenAnchorDrawer())}
              />
              <QuickActionButton
                title="Invite Swabbie"
                icon={Sailboat}
                color="from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:to-blue-500"
                onClick={() => dispatch(setOpenSwabbieDrawer())}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="block w-full md:w-80 bg-gray-800/30 border-l border-gray-700/50 p-6 overflow-y-auto">
          {/* My Activity */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">My Activity</span>
              <TooltipWrapper
                tooltip={`Participation is calculated based on this member's activity over the past 7 days across three key areas: Treasure Maps given, Anchors provided, and Parleys requested. Each member is expected to complete one of each activity per week. The system calculates what percentage of the weekly expectation was met for each category, then averages the three percentages. If a member exceeds expectations (does more than 1 of any activity), that category is still counted as 100% maximum. For example, if a member completed 1 Treasure Map (100%), 0 Anchors (0%), and 2 Parleys (100%, not 200%) this week, their participation would be 67%.`}
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </TooltipWrapper>
            </div>
            <CircularProgress
              percentage={data?.participationPercent}
              value={data?.participationPercent}
              color="rgb(139, 92, 246)"
            />
          </div>

          {/* Upcoming Parleys */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Upcoming Parleys</h3>
            <div className="space-y-3">
              {data?.parleys?.length > 0 ? (
                data?.parleys?.map((parley: IParley, index: number) => (
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
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <span className="text-gray-300 text-sm">Signal Quartermaster</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg hover:bg-gray-700/30 transition-all text-left">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">Report Suspicious Activity</span>
              </button>
              <Link
                href="/member/hidden-cove"
                className="w-full flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg hover:bg-gray-700/30 transition-all text-left"
              >
                <FileText className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Share Treasure Discovery</span>
              </Link>
            </div>
          </div>

          {/* My Stats */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">My Stats Past 30 days</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Parley Requests</span>
                <span className="text-white">{data?.totalRequestedParleyCountThisMonth || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Treasure Maps Given</span>
                <span className="text-green-400 font-medium">{data?.totalGivenTreasureMapCountThisMonth || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Anchors Closed</span>
                <span className="text-green-400 font-medium">{data?.totalClosedAnchorCountThisMonth || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberBridge
