import React from 'react'
import { motion } from 'framer-motion'

const industryDistribution = [
  { industry: 'Real Estate Agent', member: 'Jennifer Adams', filled: true, color: '#06B6D4' },
  { industry: 'IT Consultant', member: 'Mike Chen', filled: true, color: '#8B5CF6' },
  { industry: 'Business Attorney', member: 'Robert Taylor', filled: true, color: '#EC4899' },
  { industry: 'Digital Marketing', member: 'Sarah Johnson', filled: true, color: '#10B981' },
  { industry: 'Financial Advisor', member: 'Lisa Rodriguez', filled: true, color: '#F59E0B' },
  { industry: 'Insurance Agent', member: null, filled: false, color: '#EF4444' },
  { industry: 'CPA/Accountant', member: null, filled: false, color: '#6366F1' },
  { industry: 'Graphic Designer', member: null, filled: false, color: '#84CC16' },
  { industry: 'Construction Contractor', member: null, filled: false, color: '#64748B' },
  { industry: 'Healthcare Provider', member: null, filled: false, color: '#F97316' },
  { industry: 'Restaurant/Catering', member: null, filled: false, color: '#8B5CF6' },
  { industry: 'Auto Services', member: null, filled: false, color: '#06B6D4' }
]

const IndustrySlots = () => {
  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Chapter Profession Slots</h3>
        <div className="text-sm text-gray-400">
          {industryDistribution.filter((p) => p.filled).length} of {industryDistribution.length} filled
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {industryDistribution.map((slot, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full ${slot.filled ? '' : 'border-2 border-dashed border-gray-500'}`}
                style={{ backgroundColor: slot.filled ? slot.color : 'transparent' }}
              ></div>
              <span className={`font-medium ${slot.filled ? 'text-white' : 'text-gray-400'}`}>{slot.industry}</span>
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
  )
}

export default IndustrySlots
