import React from 'react'
import StatCard from '../../bridge/StatCard'
import { Users, DollarSign, Target, Activity, TrendingUp, Handshake, Award, UserCheck } from 'lucide-react'

const AdminBridgeStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
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
      <StatCard title="CHAPTER HEALTH" value="94%" change="+1.2%" icon={Activity} color="from-pink-500 to-pink-600" />
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
  )
}

export default AdminBridgeStatsGrid
