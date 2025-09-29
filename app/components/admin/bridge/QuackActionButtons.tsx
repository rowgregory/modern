'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import QuickActionButton from '../../bridge/QuickActionButton'
import { Download, Scroll, Settings, Users } from 'lucide-react'

const QuickActionButtons = () => {
  const { push } = useRouter()
  return (
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
  )
}

export default QuickActionButtons
