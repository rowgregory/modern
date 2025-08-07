'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  ChevronDown,
  Download,
  Users,
  BarChart3,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Target,
  Footprints,
  CreditCard
} from 'lucide-react'
import { adminNavLinks } from '../lib/constants/navigation/adminNavLinks'
import useCustomPathname from '@/hooks/useCustomPathname'
import Link from 'next/link'
import AddMemberDrawer from '../components/drawers/AddMemberDrawer'
import { itemVariants } from '../components/drawers/AdminNavigationDrawer'
import { openFace2FaceDrawer } from '../redux/features/face2FaceSlice'
import { useAppDispatch } from '../redux/store'

const actionItems = [
  { action: 'schedule-f2f', label: 'Schedule F2F', icon: Calendar, open: openFace2FaceDrawer },
  { action: 'create-lead', label: 'Generate Lead', icon: Target, open: openFace2FaceDrawer },
  { action: 'c-and-c', label: 'Log Closed & Credited', icon: CreditCard, open: openFace2FaceDrawer },
  { action: 'add-member', label: 'Add New Member', icon: Users, open: openFace2FaceDrawer },
  { action: 'add-explorer', label: 'Invite Explorer', icon: Footprints, open: openFace2FaceDrawer },
  { action: 'generate-report', label: 'Generate Report', icon: BarChart3, open: openFace2FaceDrawer }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const dispatch = useAppDispatch()
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const pathname = useCustomPathname()

  // Get current page from pathname
  const getCurrentPageId = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Handle special cases for multi-word routes
    if (pathname.includes('/face-2-face')) return 'face-to-face'
    if (pathname.includes('/closed-and-credited')) return 'closed-and-credited'

    // Find matching navigation item
    const matchingItem = adminNavLinks.find((item) => item.linkKey === pathname || item.id === lastSegment)

    return matchingItem?.id || 'dashboard'
  }

  const selectedPage = getCurrentPageId()

  const handleActionClick = (item: any) => {
    setIsActionsOpen(false)
    dispatch(item.open())
  }

  const getPageDisplayName = (page: string) => {
    const item = adminNavLinks.find((nav) => nav.id === page)
    return item?.label || page
  }

  return (
    <>
      <AddMemberDrawer />

      <div className="min-h-screen bg-gray-950 flex">
        {/* Fixed Left Navigation Panel */}
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
                  <span className="text-white font-bold text-lg">Admin</span>
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
                <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Admin User</p>
                  <p className="text-gray-400 text-xs truncate">admin@company.com</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col"
          style={{
            marginLeft: isNavigationCollapsed ? '80px' : '280px',
            transition: 'margin-left 0.3s ease-in-out'
          }}
        >
          {/* Fixed Header */}
          <header
            className="fixed top-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-30 h-[69px]"
            style={{
              left: isNavigationCollapsed ? '80px' : '280px',
              transition: 'left 0.3s ease-in-out'
            }}
          >
            <div className="h-full px-6 flex items-center justify-between">
              {/* Header Left */}
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {getPageDisplayName(selectedPage)}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {selectedPage === 'dashboard'
                      ? 'Complete chapter management and analytics'
                      : `Currently viewing: ${getPageDisplayName(selectedPage)}`}
                  </p>
                </div>
              </div>

              {/* Header Right */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="text"
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all focus:outline-none"
                  />
                </div>

                {/* Timeframe Selector */}
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all text-sm focus:outline-none"
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
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-violet-600 text-white rounded-lg hover:from-cyan-500 hover:to-violet-500 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm"
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
                          {actionItems.map((item) => (
                            <motion.button
                              key={item.action}
                              whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                              onClick={() => {
                                handleActionClick(item)
                              }}
                              className="w-full px-4 py-3 text-left text-gray-200 hover:text-white transition-all flex items-center space-x-3"
                            >
                              <item.icon className="w-4 h-4 text-violet-400" />
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
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden lg:inline">Export</span>
                </motion.button>
              </div>
            </div>
            {/* Overlay for mobile actions dropdown */}
          </header>

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
