import React from 'react'

const AdminOuputSummary = () => {
  return (
    <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
      <h4 className="text-white font-semibold mb-3">Output</h4>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Active Members</span>
          <span className="text-white">142 members</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Total Revenue</span>
          <span className="text-green-400 font-medium">$12.4K</span>
        </div>
      </div>

      <h4 className="text-white font-semibold mb-3 mt-6">Input</h4>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">New Applications</span>
          <span className="text-white">8 pending</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Meeting Requests</span>
          <span className="text-white">23 requests</span>
        </div>
      </div>
    </div>
  )
}

export default AdminOuputSummary
