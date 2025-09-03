'use client'

import React, { FC, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import useCustomPathname from '@/hooks/useCustomPathname'
import NavigatorDrawer from '../components/drawers/NavigatorDrawer'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import FixedHeader from '../components/admin/FixedHeader'
import ParleyDrawer from '../components/drawers/ParleyDrawer'
import { memberNavLinks } from '../lib/constants/navigation/memberNavLinks'
import { useSession } from 'next-auth/react'
import { useGetMyProfileQuery } from '../redux/services/userApi'
import { chapterId } from '../lib/constants/api/chapterId'

const MemberLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const path = useCustomPathname()
  const session = useSession()
  const { data } = useGetMyProfileQuery({ chapterId, userId: session.data?.user.id }, { skip: !session.data?.user.id })

  // Get current page from path
  const getCurrentPageId = () => {
    const pathSegments = path.split('/').filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Handle special cases for multi-word routes
    if (path.includes('/parley')) return 'parley'
    if (path.includes('/anchored')) return 'anchored'

    // Find matching navigation item
    const matchingItem = memberNavLinks.find((item) => item.linkKey === path || item.id === lastSegment)

    return matchingItem?.id || 'dashboard'
  }

  const selectedPage = getCurrentPageId()

  return (
    <>
      <NavigatorDrawer />
      <ParleyDrawer />
      <div className="min-h-screen bg-gray-950 flex">
        {/* Fixed Left Navigation Panel */}
        <FixedLeftNavigationPanel
          isNavigationCollapsed={isNavigationCollapsed}
          setIsNavigationCollapsed={setIsNavigationCollapsed}
          selectedPage={selectedPage}
          links={memberNavLinks}
          data={data}
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
          <FixedHeader
            isNavigationCollapsed={isNavigationCollapsed}
            selectedPage={selectedPage}
            links={memberNavLinks}
          />

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

export default MemberLayout
