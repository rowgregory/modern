import React from 'react'

const memberEngagement = [
  { range: '90-100%', count: 23, color: 'bg-green-500' },
  { range: '70-89%', count: 31, color: 'bg-blue-500' },
  { range: '50-69%', count: 18, color: 'bg-yellow-500' },
  { range: '30-49%', count: 9, color: 'bg-orange-500' },
  { range: '0-29%', count: 6, color: 'bg-red-500' }
]

const MemberEngagement = () => {
  return (
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
  )
}

export default MemberEngagement
