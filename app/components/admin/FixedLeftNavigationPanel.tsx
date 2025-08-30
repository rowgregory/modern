import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useGetMyProfileQuery } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { useSession } from 'next-auth/react'
import { adminNavLinks } from '@/app/lib/constants/navigation/adminNavLinks'
import { itemVariants } from '../drawers/AdminNavigationDrawer'

const FixedLeftNavigationPanel = ({ isNavigationCollapsed, setIsNavigationCollapsed, selectedPage }: any) => {
  const session = useSession()
  const { data: userObj } = useGetMyProfileQuery(
    { chapterId, userId: session.data?.user.id },
    { skip: !session.data?.user.id }
  )

  return (
    <motion.div
      initial={false}
      animate={{
        width: isNavigationCollapsed ? '80px' : '280px'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-20 flex flex-col"
    >
      {/* Navigation Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isNavigationCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-lg"></div>
              <span className="text-white font-bold text-lg">{userObj?.user?.name?.split(' ')[0]}</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isNavigationCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-3">
          {adminNavLinks.map((item, index) => (
            <Link href={item.linkKey} key={item.id}>
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={index}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all
                  ${
                    selectedPage === item.id
                      ? 'bg-gradient-to-r from-cyan-600/20 to-violet-600/20 text-cyan-400 border border-cyan-600/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isNavigationCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Navigation Footer */}
      {!isNavigationCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-t border-gray-800"
        >
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center text-white font-bold">
              {userObj?.user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {session.data?.user.isSuperUser ? 'Super User' : session.data?.user.isAdmin ? 'Admin' : 'Member'}
              </p>
              <p className="text-gray-400 text-xs truncate">{userObj?.user?.email}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default FixedLeftNavigationPanel
