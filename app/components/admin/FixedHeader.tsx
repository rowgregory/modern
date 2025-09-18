import React from 'react'
import ActionButtonWithDropdown from '../header/ActionButtonWithDropdown'
import MobileMenuButton from '../header/MobileMenuButton'
import LogoutButton from '../header/LogoutButton'
// import { useGetNotificationsQuery } from '@/app/redux/services/notificationApi'
// import { chapterId } from '@/app/lib/constants/api/chapterId'
// import { Notification } from '@/types/notification'

const FixedHeader = ({ isNavigationCollapsed, selectedPage, links }: any) => {
  // const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  // const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  // const { data } = useGetNotificationsQuery(chapterId) as { data: any }
  // const notifications = data?.notifications
  // const unreadCount = data?.unreadCount
  // const [isMarking, setIsMarking] = useState<Record<string, boolean>>({})
  // const [markNotificationAsRead] = useMarkNotificationAsReadMutation()

  const getPageDisplayName = (page: string) => {
    const item = links?.find((nav: { id: string }) => nav.id === page)
    return item?.label || page
  }

  // const markAsRead = async (notificationId: string) => {
  //   try {
  //     setIsMarking({ [notificationId]: true })
  //     await markNotificationAsRead({ chapterId, notificationId, userId: user.id }).unwrap()
  //   } catch {
  //     dispatch(
  //       showToast({
  //         type: 'error',
  //         message: 'Failed to mark notification as read',
  //         description: 'Notification Update Failed'
  //       })
  //     )
  //   } finally {
  //     setIsMarking({ [notificationId]: false })
  //   }
  // }

  return (
    <header
      className={`${isNavigationCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'} fixed left-0 top-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-30 h-[69px]`}
      style={{
        transition: 'left 0.3s ease-in-out'
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Header Left */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              {getPageDisplayName(selectedPage)}
            </h1>
            <p className="text-gray-400 text-sm hidden lg:block">
              {selectedPage === 'dashboard'
                ? 'Complete chapter management and analytics'
                : `Currently viewing: ${getPageDisplayName(selectedPage)}`}
            </p>
          </div>
        </div>

        {/* Header Right */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          {/* <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Bell className="w-5 h-5 text-gray-400" />
        
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>

        
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                >
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <p className="text-sm text-gray-400">{unreadCount} unread</p>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.length === 0 ? (
                      <div className="p-4 text-center text-gray-400">No notifications</div>
                    ) : (
                      notifications.slice(0, 5).map((notification: Notification) => (
                        <motion.div
                          key={notification.id}
                          className={`p-4 border-b border-gray-700 transition-all ${
                            !notification.isReadByUser ? 'bg-cyan-500/10 cursor-pointer' : ''
                          }`}
                          onClick={() => !notification.isReadByUser && markAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                              <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                              <span className="text-xs text-gray-500">
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {isMarking[notification.id] ? (
                              <div className="w-3 h-3 border-2 text-white border-t-0 rounded-full animate-spin" />
                            ) : (
                              !notification.isReadByUser && (
                                <div className="h-2 w-2 bg-cyan-400 rounded-full flex-shrink-0 mt-2" />
                              )
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {notifications.length > 5 && (
                    <div className="p-4 border-t border-gray-700">
                      <button className="w-full text-center text-cyan-400 hover:text-cyan-300 text-sm">
                        View all notifications
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

          {/* Timeframe Selector */}
          {/* {(user?.isAdmin || user?.isSuperUser) && (
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          )} */}

          {/* Actions Dropdown */}
          <MobileMenuButton />
          <ActionButtonWithDropdown />

          {/* Export Button */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:via-blue-500 hover:to-teal-500 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden lg:inline">Export</span>
          </motion.button> */}
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

export default FixedHeader
