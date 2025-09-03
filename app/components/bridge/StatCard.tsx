import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

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

export default StatCard
