import React from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const weeklyActivity = [
  { day: 'Mon', parley: 34, treasureMaps: 28, anchored: 12 },
  { day: 'Tue', parley: 28, treasureMaps: 22, anchored: 8 },
  { day: 'Wed', parley: 42, treasureMaps: 35, anchored: 15 },
  { day: 'Thu', parley: 38, treasureMaps: 31, anchored: 11 },
  { day: 'Fri', parley: 45, treasureMaps: 38, anchored: 18 },
  { day: 'Sat', parley: 15, treasureMaps: 12, anchored: 3 },
  { day: 'Sun', parley: 8, treasureMaps: 6, anchored: 1 }
]

const AdminWeeklyActivityChart = () => {
  return (
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
          <Area type="monotone" dataKey="parley" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
          <Area type="monotone" dataKey="treasureMaps" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
          <Area type="monotone" dataKey="anchored" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default AdminWeeklyActivityChart
