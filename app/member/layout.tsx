'use client'

import React, { FC, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import useCustomPathname from '@/hooks/useCustomPathname'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import FixedHeader from '../components/admin/FixedHeader'
import { memberNavLinks } from '../lib/constants/navigation/memberNavLinks'
import { useSession } from 'next-auth/react'
import { useGetMyProfileQuery, useGetUsersQuery } from '../redux/services/userApi'
import { chapterId } from '../lib/constants/api/chapterId'
import { User } from '@prisma/client'
import getCurrentPageId from '../lib/utils/common/getCurrentPageId'
import MobileNavigationDrawer from '../components/drawers/MobileNavigationDrawer'

const MemberLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession()
  useGetUsersQuery({ chapterId }) as { data: { users: User[] | null } }
  const { data } = useGetMyProfileQuery({ chapterId, userId: session.data?.user.id }, { skip: !session.data?.user.id })
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const path = useCustomPathname()
  const selectedPage = getCurrentPageId(path, memberNavLinks)

  return (
    <>
      <MobileNavigationDrawer links={memberNavLinks} />
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
          className={`${isNavigationCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'} flex-1 flex flex-col`}
          style={{
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
