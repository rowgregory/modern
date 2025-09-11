import React from 'react'
import StatCard from '../../bridge/StatCard'
import { Users, DollarSign, Target, Activity, Handshake, UserCheck, Anchor, Layers3 } from 'lucide-react'
import { useUserSelector } from '@/app/redux/store'

const AdminBridgeStatsGrid = () => {
  const { users } = useUserSelector()
  const totalMembers = users?.length
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="TOTAL MEMBERS"
        value={totalMembers}
        change="+14 this month"
        icon={Users}
        color="from-blue-500 to-blue-600"
      />
      <StatCard
        title="TOTAL REVENUE"
        value="$0"
        change="+0%"
        icon={DollarSign}
        color="from-emerald-500 to-emerald-600"
      />
      <StatCard title="CONVERSION RATE" value="0%" change="+0%" icon={Target} color="from-purple-500 to-purple-600" />
      <StatCard title="CHAPTER HEALTH" value="0%" change="+0%" icon={Activity} color="from-pink-500 to-pink-600" />
      <StatCard
        title="TOTAL PARLEYS"
        value="0"
        change="0 this month"
        icon={Handshake}
        color="from-cyan-500 to-cyan-600"
      />
      <StatCard title="TREASURE MAPS SENT" value="0" change="+0%" icon={Layers3} color="from-blue-500 to-blue-600" />
      <StatCard title="ANCHORS" value="0" change="0" icon={Anchor} color="from-violet-500 to-violet-600" />
      <StatCard title="MEMBER RETENTION" value="0%" change="+0%" icon={UserCheck} color="from-green-500 to-green-600" />
    </div>
  )
}

export default AdminBridgeStatsGrid
