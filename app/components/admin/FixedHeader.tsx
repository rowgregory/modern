import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGetNotificationsQuery, useMarkNotificationAsReadMutation } from '@/app/redux/services/notificationApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import {
  Plus,
  ChevronDown,
  Download,
  Users,
  BarChart3,
  Calendar,
  Target,
  Footprints,
  Bell,
  Anchor,
  LogOut
} from 'lucide-react'
import { setOpenParleyDrawer } from '@/app/redux/features/parleySlice'
import { setOpenAddUserDrawer } from '@/app/redux/features/userSlice'
import { Notification } from '@/types/notification'
import { navigatorInputs, setInputs } from '@/app/redux/features/formSlice'
import { initialParleyFormState } from '@/app/lib/constants/entities/initialParleyFormState'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import { showToast } from '@/app/redux/features/toastSlice'

const actionItems = (isAdmin: boolean) => [
  {
    action: 'schedule-parley',
    label: 'Schedule Parley',
    icon: Calendar,
    open: setOpenParleyDrawer,
    formName: 'parleyForm',
    initial: initialParleyFormState
  },
  {
    action: 'create-treasure-map',
    label: 'Generate Treasure Map',
    icon: Target,
    open: () => {},
    formName: 'treasureMapForm',
    initial: {}
  },
  {
    action: 'anchored',
    label: 'Log Anchored',
    icon: Anchor,
    open: () => {},
    formName: 'anchoredForm',
    initial: {}
  },
  {
    action: 'add-skipper',
    label: 'Invite Skipper',
    icon: Footprints,
    open: () => {},
    formName: 'skipperForm',
    initial: {}
  },
  ...(isAdmin
    ? [
        {
          action: 'add-navigator',
          label: 'Add Navigator',
          icon: Users,
          open: setOpenAddUserDrawer,
          formName: 'navigatorForm',
          initial: navigatorInputs
        },
        {
          action: 'generate-report',
          label: 'Generate Report',
          icon: BarChart3,
          open: () => {}
        }
      ]
    : [])
]

const FixedHeader = ({ isNavigationCollapsed, selectedPage, links }: any) => {
  const dispatch = useAppDispatch()
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { data } = useGetNotificationsQuery(chapterId) as { data: any }
  const { push } = useRouter()
  const notifications = data?.notifications
  const unreadCount = data?.unreadCount
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMarking, setIsMarking] = useState<Record<string, boolean>>({})
  const { user } = useUserSelector() as { user: User }
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation()

  console.log('USERL: ', user)

  const handleActionClick = (item: any) => {
    setIsActionsOpen(false)
    dispatch(item.open())
    dispatch(setInputs({ formName: item.formName, data: item.initial }))
  }

  const getPageDisplayName = (page: string) => {
    const item = links?.find((nav: { id: string }) => nav.id === page)
    return item?.label || page
  }

  const markAsRead = async (notificationId: string) => {
    try {
      setIsMarking({ [notificationId]: true })
      await markNotificationAsRead({ chapterId, notificationId, userId: user.id }).unwrap()
    } catch {
      dispatch(
        showToast({
          type: 'error',
          message: 'Failed to mark notification as read',
          description: 'Notification Update Failed'
        })
      )
    } finally {
      setIsMarking({ [notificationId]: false })
    }
  }

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await signOut({
        redirect: false, // Prevent automatic redirect
        callbackUrl: '/auth/login' // Optional: specify where to redirect after signout
      })

      push('/auth/login')
      setIsLoading(false)
    } catch {}
  }

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
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {/* Red dot for unread notifications */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>

            {/* Notification Dropdown */}
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
                    {notifications.length === 0 ? (
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
          </div>

          {/* Timeframe Selector */}
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

          {/* Actions Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-500 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Actions</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isActionsOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isActionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
                >
                  <div className="py-2">
                    {actionItems(user?.isAdmin).map((item, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                        onClick={() => {
                          handleActionClick(item)
                        }}
                        className="w-full px-4 py-3 text-left text-gray-200 hover:text-white transition-all flex items-center space-x-3"
                      >
                        <item.icon className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:via-blue-500 hover:to-teal-500 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden lg:inline">Export</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="relative p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-0 border-cyan-400 animate-spin rounded-full" />
            ) : (
              <LogOut className="w-5 h-5 text-gray-400" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default FixedHeader
