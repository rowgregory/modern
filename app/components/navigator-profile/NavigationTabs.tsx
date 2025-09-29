import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'

const tabs = (id: string | undefined) => ['Timeline', id && 'Edit Beacon']

const NavigationTabs: FC<{ isAdmin: boolean; userId: string; push: any }> = ({ isAdmin, userId, push }) => {
  const [activeTab, setActiveTab] = useState<string | undefined>('Timeline')

  return (
    <div className="-mt-10 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex space-x-8">
          {tabs(userId).map((tab, i) => (
            <motion.button
              key={i}
              onClick={() =>
                tab === 'Edit Beacon' ? push(isAdmin ? '/admin/beacon' : '/member/beacon') : setActiveTab(tab)
              }
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-600'
              } ${tab === 'Edit Beacon' ? 'cursor-pointer' : ''}`}
              whileHover={{ y: -2 }}
            >
              {tab}
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default NavigationTabs
