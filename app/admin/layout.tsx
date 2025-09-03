'use client'

import React, { FC, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { adminNavLinks } from '../lib/constants/navigation/adminNavLinks'
import useCustomPathname from '@/hooks/useCustomPathname'
import NavigatorDrawer from '../components/drawers/NavigatorDrawer'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import FixedHeader from '../components/admin/FixedHeader'
import ParleyDrawer from '../components/drawers/ParleyDrawer'
import { useGetMyProfileQuery } from '../redux/services/userApi'
import { chapterId } from '../lib/constants/api/chapterId'
import { useSession } from 'next-auth/react'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const path = useCustomPathname()
  const session = useSession()
  const { data } = useGetMyProfileQuery({ chapterId, userId: session.data?.user.id }, { skip: !session.data?.user.id })

  // Get current page from path
  const getCurrentPageId = () => {
    const pathSegments = path.split('/').filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Handle special cases for multi-word routes
    if (path.includes('/treasure-maps')) return 'treasure-maps'

    // Find matching navigation item
    const matchingItem = adminNavLinks.find((item) => item.linkKey === path || item.id === lastSegment)

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
          links={adminNavLinks}
          data={data}
        />

        {/* Main Content Area */}
        <div
          className={`${isNavigationCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'} flex-1 flex flex-col`}
          style={{
            transition: 'margin-left 0.3s ease-in-out'
          }}
        >
          {/* Fixed Header */}
          <FixedHeader
            isNavigationCollapsed={isNavigationCollapsed}
            selectedPage={selectedPage}
            links={adminNavLinks}
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

export default AdminLayout
