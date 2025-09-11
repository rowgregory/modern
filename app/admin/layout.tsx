'use client'

import React, { FC, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { adminNavLinks } from '../lib/constants/navigation/adminNavLinks'
import useCustomPathname from '@/hooks/useCustomPathname'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import FixedHeader from '../components/admin/FixedHeader'
import { useGetMyProfileQuery, useGetUsersQuery } from '../redux/services/userApi'
import { chapterId } from '../lib/constants/api/chapterId'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import getCurrentPageId from '../lib/utils/common/getCurrentPageId'
import MobileNavigationDrawer from '../components/drawers/MobileNavigationDrawer'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const path = useCustomPathname()
  const session = useSession()
  useGetUsersQuery({ chapterId }) as { data: { users: User[] | null } }
  const { data } = useGetMyProfileQuery({ chapterId, userId: session.data?.user.id }, { skip: !session.data?.user.id })
  const selectedPage = getCurrentPageId(path, adminNavLinks)

  return (
    <>
      <MobileNavigationDrawer links={adminNavLinks} />
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
