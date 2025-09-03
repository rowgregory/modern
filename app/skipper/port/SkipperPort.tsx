import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  MessageSquare,
  ChevronRight,
  Info,
  Users,
  Lock,
  X,
  Anchor,
  Compass,
  Waves,
  AlertTriangle,
  Zap
} from 'lucide-react'
import jsPDF from 'jspdf'
import { formatDate, formatDateShort } from '@/app/lib/utils/date/formatDate'
import { useSearchParams } from 'next/navigation'
import { useGetUserByIdQuery } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'

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
  doc.save('Skipper-Handbook.pdf')
}

const SkipperPort = () => {
  const [showNotification, setShowNotification] = useState(true)
  const searchParams = useSearchParams()
  const skipperId = searchParams.get('skipperId')

  const { data, isLoading } = useGetUserByIdQuery({ chapterId, userId: skipperId })

  const addDays = (date: string | number | Date, days: number) => {
    return new Date(new Date(date).getTime() + days * 24 * 60 * 60 * 1000)
  }

  const formatDateRange = (startDays: number, endDays: number) => {
    const startDate = addDays(data?.user?.createdAt, startDays)
    const endDate = addDays(data?.user?.createdAt, endDays)

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
      date: formatDateShort(data?.user?.createdAt),
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
        data?.user?.membershipStatus === 'APPROVED'
          ? 'Add your interests and professional background to connect with like-minded members'
          : 'Available after approval - add your professional background and more',
      action: data?.user?.membershipStatus === 'APPROVED' ? 'Complete Profile' : 'Pending Approval',
      icon: data?.user?.membershipStatus === 'APPROVED' ? User : Lock,
      disabled: data?.user?.membershipStatus === 'PENDING'
    },
    {
      title: 'Get familiar with Coastal Referral Exchange',
      description: 'Learn about our community guidelines and networking opportunities',
      action: 'Learn More',
      icon: Info
    },
    {
      title: 'Connect with members',
      description: 'Start building your professional network within the Coastal Referral Exchange community',
      action: 'Browse Members',
      icon: Users
    }
  ]

  const resources = [
    { title: 'Skipper Handbook', type: 'PDF', size: '2.4 MB', pdf: generateHandbookPDF },
    { title: 'Safety Guidelines', type: 'PDF', size: '1.8 MB', pdf: () => {} },
    { title: 'Equipment List', type: 'PDF', size: '856 KB', pdf: () => {} },
    { title: 'Training Videos', type: 'Link', size: 'Online', pdf: () => {} }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex justify-center py-10">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-0 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Storm Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Lightning flashes */}
        <motion.div
          animate={{
            opacity: [0, 0.4, 0, 0.2, 0, 0.6, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 3,
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1]
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-300/20 via-cyan-200/10 to-transparent pointer-events-none"
        />

        {/* Rain effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-16 bg-gradient-to-b from-cyan-200/60 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`
              }}
              animate={{
                y: [0, 800],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 1.5 + 1,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Animated waves at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <motion.div
            animate={{ x: [-100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-r from-cyan-900/20 via-slate-700/30 to-cyan-900/20"
            style={{
              clipPath: 'polygon(0 60%, 25% 80%, 50% 60%, 75% 85%, 100% 65%, 100% 100%, 0% 100%)'
            }}
          />
        </div>
      </div>

      {/* Notification Bar */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="relative z-50 bg-gradient-to-r from-emerald-700 to-teal-700 text-white px-6 py-3 border-b border-emerald-600/50"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Anchor className="h-5 w-5" />
                <span className="font-medium">
                  Skipper application logged successfully! Harbor Master will review within 2-3 tides.
                </span>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-emerald-100 hover:text-white transition-colors"
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
            <div className="h-12 w-12 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/50">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Storm Harbor Port</h1>
              <p className="text-cyan-200">Skipper Registry & Maritime Command</p>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-6 shadow-xl shadow-slate-900/50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center space-x-2">
                  <span>Ahoy, {data?.user?.name}!</span>
                  <Waves className="h-5 w-5 text-cyan-400" />
                </h2>
                <p className="text-cyan-200">
                  Your skipper credentials are under review by the Harbor Master. Weather the storm while we process
                  your application.
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-cyan-300">Skipper ID</div>
                <div className="text-lg font-mono font-bold text-white bg-slate-700/50 px-3 py-1 rounded-lg border border-cyan-500/20">
                  {data?.user?.id}
                </div>
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
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/30 p-6 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-6 w-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Voyage Progress</h3>
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
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                          step.status === 'completed'
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-900/50'
                            : step.status === 'current'
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse shadow-amber-900/50'
                              : 'bg-slate-700/50 text-slate-300 border border-slate-600/50'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <Anchor className="h-5 w-5" />
                        ) : step.status === 'current' ? (
                          <Compass className="h-5 w-5" />
                        ) : (
                          <div className="h-2 w-2 bg-current rounded-full" />
                        )}
                      </div>
                      {index < applicationSteps.length - 1 && (
                        <div
                          className={`absolute top-10 left-5 w-0.5 h-12 transition-colors duration-300 ${
                            step.status === 'completed'
                              ? 'bg-gradient-to-b from-emerald-500 to-emerald-400'
                              : 'bg-slate-600/50'
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white">{step.title}</h4>
                        <span className="text-sm text-cyan-300 bg-slate-700/30 px-2 py-1 rounded-full">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-cyan-800/20 to-blue-800/20 rounded-xl border border-cyan-400/30 shadow-inner"
              >
                <div className="flex items-center space-x-3">
                  <Info className="h-5 w-5 text-cyan-400" />
                  <div>
                    <div className="font-medium text-white">Expected Clearance Date</div>
                    <div className="text-sm text-slate-300">
                      {new Date(
                        new Date(data?.user?.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}{' '}
                      - <span className="text-cyan-400">Fair Winds Expected</span>
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
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/30 p-6 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-semibold text-white">Chart Your Course</h3>
              </div>

              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`group bg-slate-700/20 rounded-xl p-4 transition-all duration-300 border ${
                      step.disabled
                        ? 'opacity-60 cursor-not-allowed border-slate-600/30'
                        : 'hover:bg-slate-700/40 cursor-pointer hover:border-cyan-400/50 border-slate-600/30'
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
                          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors shadow-lg ${
                            step.disabled
                              ? 'bg-slate-600/30 shadow-slate-800/50'
                              : 'bg-gradient-to-r from-cyan-600 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 shadow-cyan-900/50'
                          }`}
                        >
                          <step.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{step.title}</h4>
                          <p className="text-sm text-slate-300">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm transition-colors px-2 py-1 rounded-full whitespace-nowrap ${
                            step.disabled
                              ? 'text-slate-400 bg-slate-600/20'
                              : 'text-cyan-300 group-hover:text-cyan-200 bg-cyan-800/30 group-hover:bg-cyan-700/40'
                          }`}
                        >
                          {step.action}
                        </span>
                        {!step.disabled && (
                          <ChevronRight className="h-4 w-4 text-cyan-300 group-hover:text-cyan-200 group-hover:translate-x-1 transition-all" />
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
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/30 p-6 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Captain&apos;s Log</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-white text-sm">{data?.user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-white text-sm">{data?.user?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-white text-sm">
                    {data?.user && data?.user?.location?.charAt(0).toUpperCase() + data?.user?.location?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-white text-sm">
                    Logged {formatDate(data?.user?.createdAt, { includeTime: true })}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/30 p-6 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Maritime Archives</h3>
              </div>

              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <motion.div
                    onClick={resource.pdf}
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group flex items-center justify-between p-3 bg-slate-700/20 hover:bg-slate-700/40 rounded-lg transition-all duration-300 cursor-pointer border border-slate-600/30 hover:border-emerald-400/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                      <div>
                        <div className="text-white text-sm font-medium">{resource.title}</div>
                        <div className="text-slate-400 text-xs">
                          {resource.type} • {resource.size}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-amber-800/20 to-orange-700/20 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6 shadow-xl shadow-orange-900/50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-semibold text-white">Storm Watch Support</h3>
              </div>

              <p className="text-slate-200 text-sm mb-4">
                Our Harbor Master is standing by to assist with any questions about your skipper application or maritime
                operations.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-amber-900/50"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Signal Harbor Master</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkipperPort
