import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  AlertCircle,
  Download,
  MessageSquare,
  Star,
  ChevronRight,
  Info,
  Heart,
  Users,
  Lock,
  X
} from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import jsPDF from 'jspdf'
import { formatDate, formatDateShort } from '@/app/lib/utils/date/formatDate'
import { useSearchParams } from 'next/navigation'
import { useGetExplorerByTempIdQuery } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { setTempApplication } from '@/app/redux/features/appSlice'

const generateHandbookPDF = () => {
  const doc = new jsPDF()

  // Cover Page
  doc.setFillColor(44, 62, 80)
  doc.rect(0, 0, 210, 297, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(32)
  doc.text('EXPLORER HANDBOOK', 105, 100, { align: 'center' })
  doc.setFontSize(16)
  doc.text('Your comprehensive guide to safe exploration', 105, 120, { align: 'center' })

  // Add new page
  doc.addPage()

  // Safety Guidelines Page
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(24)
  doc.text('Safety Guidelines', 20, 30)
  doc.setFontSize(12)
  doc.text('Never explore alone - always use the buddy system', 20, 50)
  doc.text('Inform someone of your planned route and expected return time', 20, 60)
  // ... add more content

  // Download the PDF
  doc.save('Explorer-Handbook.pdf')
}

const SkipperPort = () => {
  const dispatch = useAppDispatch()
  const [showNotification, setShowNotification] = useState(true)
  const { tempApplication } = useAppSelector((state: RootState) => state.app)
  const searchParams = useSearchParams()
  const tempId = searchParams.get('tempId')

  const shouldFetchFromServer = tempId && !tempApplication

  const { data } = useGetExplorerByTempIdQuery(
    { chapterId, tempId },
    {
      skip: !shouldFetchFromServer
    }
  )

  useEffect(() => {
    // Only set temp application if:
    // 1. We have data from the server
    // 2. We don't already have temp application data in Redux
    // 3. The data has a user object
    if (data?.user && !tempApplication && shouldFetchFromServer) {
      dispatch(setTempApplication({ ...data.user, tempId: data.user.id }))
    }
  }, [data, tempApplication, shouldFetchFromServer, dispatch])

  const createdAt = tempApplication?.formData?.createdAt

  const addDays = (date: string | number | Date, days: number) => {
    return new Date(new Date(date).getTime() + days * 24 * 60 * 60 * 1000)
  }

  const formatDateRange = (startDays: number, endDays: number) => {
    const startDate = addDays(createdAt, startDays)
    const endDate = addDays(createdAt, endDays)

    const startDay = startDate.getDate()
    const endDay = endDate.getDate()

    // Format: "Aug 21-26, 2025"
    const month = startDate.toLocaleDateString('en-US', { month: 'short' })
    const year = startDate.getFullYear()

    return `${month} ${startDay}-${endDay}, ${year}`
  }

  const applicationSteps = [
    {
      id: 1,
      title: 'Application Submitted',
      status: 'completed',
      date: formatDateShort(createdAt),
      description: 'Your application has been successfully received'
    },
    {
      id: 2,
      title: 'Initial Review',
      status: 'current',
      date: formatDateRange(0, 1),
      description: 'Our team is reviewing your qualifications and experience'
    },
    {
      id: 3,
      title: 'Background Check',
      status: 'pending',
      date: formatDateRange(1, 3),
      description: 'Standard verification process for all explorers'
    },
    {
      id: 4,
      title: 'Final Decision',
      status: 'pending',
      date: formatDateRange(3, 5),
      description: 'Final review and acceptance notification'
    }
  ]

  const nextSteps = [
    {
      title: 'Complete your profile',
      description:
        tempApplication?.formData?.membershipStatus === 'APPROVED'
          ? 'Add your interests and professional background to connect with like-minded members'
          : 'Available after approval - add your professional background and more',
      action: tempApplication?.formData?.membershipStatus === 'APPROVED' ? 'Complete Profile' : 'Pending Approval',
      icon: tempApplication?.formData?.membershipStatus === 'APPROVED' ? User : Lock,
      disabled: tempApplication?.formData?.membershipStatus === 'PENDING'
    },
    {
      title: 'Get familiar with Modern',
      description: 'Learn about our community guidelines and networking opportunities',
      action: 'Learn More',
      icon: Info
    },
    {
      title: 'Connect with members',
      description: 'Start building your professional network within the Modern community',
      action: 'Browse Members',
      icon: Users
    }
  ]

  const resources = [
    { title: 'Explorer Handbook', type: 'PDF', size: '2.4 MB', pdf: generateHandbookPDF },
    { title: 'Safety Guidelines', type: 'PDF', size: '1.8 MB', pdf: () => {} },
    { title: 'Equipment List', type: 'PDF', size: '856 KB', pdf: () => {} },
    { title: 'Training Videos', type: 'Link', size: 'Online', pdf: () => {} }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Notification Bar */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="relative z-50 bg-green-600 text-white px-6 py-3"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">
                  Application submitted successfully! We&apos;ll review it within 2-3 business days.
                </span>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-green-100 hover:text-white transition-colors"
              >
                <X />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome to Basecamp</h1>
              <p className="text-blue-200">Explorer Application Dashboard</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Hello, {tempApplication?.formData?.name}! 👋</h2>
                <p className="text-blue-200">
                  Your explorer application is being processed. Here&apos;s everything you need to know.
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-200">Application ID</div>
                <div className="text-lg font-mono font-bold text-white">{tempApplication?.tempId}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Application Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Application Progress</h3>
              </div>

              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="relative">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          step.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : step.status === 'current'
                              ? 'bg-blue-500 text-white animate-pulse'
                              : 'bg-white/20 text-white/60'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.status === 'current' ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <div className="h-2 w-2 bg-current rounded-full" />
                        )}
                      </div>
                      {index < applicationSteps.length - 1 && (
                        <div
                          className={`absolute top-10 left-5 w-0.5 h-12 transition-colors duration-300 ${
                            step.status === 'completed' ? 'bg-green-500' : 'bg-white/20'
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white">{step.title}</h4>
                        <span className="text-sm text-blue-200">{step.date}</span>
                      </div>
                      <p className="text-sm text-white/70">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-400/20"
              >
                <div className="flex items-center space-x-3">
                  <Info className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-white">Estimated Decision Date</div>
                    <div className="text-sm text-white/70">
                      {new Date(
                        new Date(tempApplication?.formData?.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="h-6 w-6 text-orange-400" />
                <h3 className="text-xl font-semibold text-white">Recommended Next Steps</h3>
              </div>

              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`group bg-white/5 rounded-xl p-4 transition-all duration-300 border border-transparent ${
                      step.disabled
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-white/10 cursor-pointer hover:border-white/20'
                    }`}
                    onClick={
                      step.disabled
                        ? undefined
                        : () => {
                            /* handle click */
                          }
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                            step.disabled ? 'bg-white/10' : 'bg-white/20 group-hover:bg-white/30'
                          }`}
                        >
                          <step.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{step.title}</h4>
                          <p className="text-sm text-white/70">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm transition-colors ${
                            step.disabled ? 'text-white/40' : 'text-blue-300 group-hover:text-blue-200'
                          }`}
                        >
                          {step.action}
                        </span>
                        {!step.disabled && (
                          <ChevronRight className="h-4 w-4 text-blue-300 group-hover:text-blue-200 group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile & Resources */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Your Profile</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-white/60" />
                  <span className="text-white text-sm">{tempApplication?.formData?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-white/60" />
                  <span className="text-white text-sm">{tempApplication?.formData?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-white/60" />
                  <span className="text-white text-sm">
                    {tempApplication?.formData &&
                      tempApplication?.formData?.location?.charAt(0).toUpperCase() +
                        tempApplication?.formData?.location?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-white/60" />
                  <span className="text-white text-sm">
                    Applied {formatDate(tempApplication?.formData?.createdAt, { includeTime: true })}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-sm text-white/70 mb-2">Experience Level</div>
                <div className="text-white font-medium">{tempApplication?.formData?.experience}</div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-white/70 mb-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {tempApplication?.formData?.interests?.map((interest: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Resources</h3>
              </div>

              <div className="space-y-3">
                {resources.map((resource: any, index) => (
                  <motion.div
                    onClick={resource.pdf}
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                      <div>
                        <div className="text-white text-sm font-medium">{resource.title}</div>
                        <div className="text-white/60 text-xs">
                          {resource.type} • {resource.size}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl border border-pink-400/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-6 w-6 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">Need Help?</h3>
              </div>

              <p className="text-white/80 text-sm mb-4">
                Our support team is here to help with any questions about your application.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Contact Support</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkipperPort
