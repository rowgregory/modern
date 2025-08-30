'use client'

import React, { FC, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { adminNavLinks } from '../lib/constants/navigation/adminNavLinks'
import useCustomPathname from '@/hooks/useCustomPathname'
import AddMemberDrawer from '../components/drawers/AddMemberDrawer'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import FixedHeader from '../components/admin/FixedHeader'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const path = useCustomPathname()

  // Get current page from path
  const getCurrentPageId = () => {
    const pathSegments = path.split('/').filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Handle special cases for multi-word routes
    if (path.includes('/face-2-face')) return 'face-to-face'
    if (path.includes('/closed-and-credited')) return 'closed-and-credited'

    // Find matching navigation item
    const matchingItem = adminNavLinks.find((item) => item.linkKey === path || item.id === lastSegment)

    return matchingItem?.id || 'dashboard'
  }

  const selectedPage = getCurrentPageId()

  return (
    <>
      <AddMemberDrawer />

      <div className="min-h-screen bg-gray-950 flex">
        {/* Fixed Left Navigation Panel */}
        <FixedLeftNavigationPanel
          isNavigationCollapsed={isNavigationCollapsed}
          setIsNavigationCollapsed={setIsNavigationCollapsed}
          selectedPage={selectedPage}
        />

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col"
          style={{
            marginLeft: isNavigationCollapsed ? '80px' : '280px',
            transition: 'margin-left 0.3s ease-in-out'
          }}
        >
          {/* Fixed Header */}
          <FixedHeader isNavigationCollapsed={isNavigationCollapsed} selectedPage={selectedPage} />

          {/* Content Area */}
          <main className="flex-1 pt-16 overflow-hidden">
            <motion.div
              key={selectedPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
