import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  ChevronRight,
  Info,
  Users,
  Lock,
  X,
  Anchor,
  AlertTriangle,
  LifeBuoy,
  ScrollText,
  Archive,
  ShipWheel,
  MessageSquare
} from 'lucide-react'
import jsPDF from 'jspdf'
import { formatDate } from '@/app/lib/utils/date/formatDate'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetUserByIdQuery } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import Link from 'next/link'
import ApplicationTimeline from '@/app/components/port/ApplicationTimeline'
import StormWatchSupport from '@/app/components/port/StormWatchSupport'
import QuartermasterDialogueModal from '@/app/components/modals/QuartermasterDialogueModal'

// const PeriscopeModal = ({ isOpen, onClose }: any) => {
//   const [periscopePosition, setPeriscopePosition] = useState({ x: 50, y: 50 })
//   const [foundQuartermaster, setFoundQuartermaster] = useState(false)
//   const [showContactForm, setShowContactForm] = useState(false)

//   const handlePeriscopeMove = (e: any) => {
//     const rect = e.currentTarget.getBoundingClientRect()
//     const x = ((e.clientX - rect.left) / rect.width) * 100
//     const y = ((e.clientY - rect.top) / rect.height) * 100
//     setPeriscopePosition({ x, y })

//     // Quartermaster is found in the bottom-right area
//     if (x > 70 && x < 85 && y > 60 && y < 80) {
//       if (!foundQuartermaster) {
//         setFoundQuartermaster(true)
//         setTimeout(() => setShowContactForm(true), 1000)
//       }
//     }
//   }

//   const resetPeriscope = () => {
//     setFoundQuartermaster(false)
//     setShowContactForm(false)
//     setPeriscopePosition({ x: 50, y: 50 })
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black z-50"
//         >
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-60 text-white hover:text-amber-400 transition-colors"
//           >
//             <X className="h-8 w-8" />
//           </button>

//           {!showContactForm ? (
//             <>
//               {/* Periscope View */}
//               <div
//                 className="w-full h-full relative cursor-crosshair overflow-hidden"
//                 onMouseMove={handlePeriscopeMove}
//               >
//                 {/* Ship deck background */}
//                 <div
//                   className="absolute inset-0 transition-transform duration-100 ease-out"
//                   style={{
//                     backgroundImage: `
//                       radial-gradient(circle at 30% 20%, #8B4513 0%, #654321 50%, transparent 70%),
//                       radial-gradient(circle at 80% 70%, #4A4A4A 0%, #2A2A2A 40%, transparent 60%),
//                       linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
//                     `,
//                     transform: `translate(${-(periscopePosition.x - 50) * 0.5}px, ${-(periscopePosition.y - 50) * 0.3}px) scale(1.2)`
//                   }}
//                 >
//                   {/* Ship elements */}
//                   <div className="absolute bottom-20 left-10 w-16 h-32 bg-amber-800 opacity-60" />
//                   <div className="absolute top-32 right-20 w-12 h-20 bg-gray-600 opacity-70" />

//                   {/* Quartermaster figure (target area) */}
//                   <motion.div
//                     className="absolute"
//                     style={{ left: '77%', top: '70%' }}
//                     animate={foundQuartermaster ? { scale: [1, 1.2, 1] } : {}}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <div className="w-8 h-12 bg-amber-600 rounded opacity-80" />
//                     <div className="w-12 h-8 bg-blue-800 rounded mt-1 opacity-80" />
//                   </motion.div>
//                 </div>

//                 {/* Periscope overlay */}
//                 <div className="absolute inset-0 pointer-events-none">
//                   <svg className="w-full h-full">
//                     <defs>
//                       <radialGradient id="periscopeGradient" cx="50%" cy="50%" r="50%">
//                         <stop offset="0%" stopColor="transparent" />
//                         <stop offset="70%" stopColor="transparent" />
//                         <stop offset="100%" stopColor="black" />
//                       </radialGradient>
//                     </defs>
//                     <rect width="100%" height="100%" fill="url(#periscopeGradient)" />
//                   </svg>

//                   {/* Crosshairs */}
//                   <div
//                     className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
//                     style={{ left: `${periscopePosition.x}%`, top: `${periscopePosition.y}%` }}
//                   >
//                     <Target className="h-8 w-8 text-amber-400 opacity-80" />
//                   </div>
//                 </div>

//                 {/* Instructions */}
//                 <div className="absolute top-4 left-4 text-amber-400 font-mono">
//                   <p>🔍 PERISCOPE VIEW ACTIVE</p>
//                   <p className="text-sm mt-2">Scan the ship to locate the Quartermaster</p>
//                   {foundQuartermaster && (
//                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 mt-2">
//                       ✓ QUARTERMASTER LOCATED - Establishing communication...
//                     </motion.p>
//                   )}
//                 </div>
//               </div>
//             </>
//           ) : (
//             /* Contact Form */
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="flex items-center justify-center h-full p-4"
//             >
//               <div className="bg-slate-900 rounded-2xl border border-amber-500/30 p-8 max-w-md w-full">
//                 <div className="text-center mb-6">
//                   <div className="text-amber-400 text-4xl mb-2">📡</div>
//                   <h2 className="text-2xl font-bold text-white mb-2">Communication Established</h2>
//                   <p className="text-slate-300 text-sm">Direct line to Quartermaster&apos;s quarters secured</p>
//                 </div>

//                 <form className="space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Swabbie identification"
//                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Signal frequency (email)"
//                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />
//                   <select className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
//                     <option>Message priority level</option>
//                     <option>Routine inquiry</option>
//                     <option>Urgent assistance</option>
//                     <option>Emergency support</option>
//                   </select>
//                   <textarea
//                     rows={4}
//                     placeholder="Transmit your message..."
//                     className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
//                   />

//                   <div className="flex gap-3">
//                     <button
//                       type="button"
//                       onClick={resetPeriscope}
//                       className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
//                     >
//                       Reset Periscope
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-colors"
//                     >
//                       Send Signal
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

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
  doc.save('Swabbie-Handbook.pdf')
}

const SwabbiePort = () => {
  const [showNotification, setShowNotification] = useState(true)
  const searchParams = useSearchParams()
  const swabbieId = searchParams.get('swabbieId')
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const { push } = useRouter()

  const { data, isLoading } = useGetUserByIdQuery({ chapterId, userId: swabbieId })

  const nextSteps = [
    {
      title: 'Complete your profile',
      description:
        data?.user?.membershipStatus === 'ACTIVE'
          ? 'Add your interests and professional background to connect with like-minded members'
          : 'Available after approval - add your professional background and more',
      action: data?.user?.membershipStatus === 'ACTIVE' ? 'Complete Profile' : 'Pending Approval',
      icon: data?.user?.membershipStatus === 'ACTIVE' ? User : Lock,
      disabled: data?.user?.membershipStatus === 'PENDING',
      linkKey: '/member/beacon'
    },
    {
      title: 'Get familiar with Coastal Referral Exchange',
      description: 'Learn about our community guidelines and networking opportunities',
      action: 'Learn More',
      icon: Info
    },
    {
      title: 'Connect with navigators',
      description: 'Start building your professional network within the Coastal Referral Exchange community',
      action: 'Browse Navigators',
      icon: Users
    }
  ]

  const resources = [
    { title: 'Swabbie Handbook', type: 'PDF', size: '2.4 MB', pdf: generateHandbookPDF },
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
    <>
      <QuartermasterDialogueModal user={data?.user} onClose={onClose} open={open} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden pb-20">
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent uppercase text-2xl font-bold cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-blue-400 hover:to-cyan-400 flex items-center absolute left-4 lg:left-6 top-2"
        >
          C
          <span>
            <ShipWheel className="text-white w-5 h-5 shipwheel-storm" />
          </span>
          RE
        </Link>
        {/* <PeriscopeModal isOpen={open} onClose={() => setOpen(false)} /> */}

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
          <motion.div
            animate={{
              opacity: [0, 0, 0, 0.4, 0, 0.6, 0, 0, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: Math.random() * 12 + 8,
              times: [0, 0.7, 0.75, 0.77, 0.8, 0.82, 0.85, 0.9, 1]
            }}
            className="absolute top-0 left-0 w-full h-full bg-blue-100/30 pointer-events-none"
          />

          {/* Rain effect */}
          <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-16 bg-gradient-to-b from-cyan-200/60 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`
                }}
                animate={{
                  y: [0, window.innerHeight + 100],
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
              className={`relative z-50 text-white px-6 py-3 border-b ${
                data?.user?.membershipStatus === 'ACTIVE'
                  ? 'bg-gradient-to-r from-amber-900 to-yellow-900 border-amber-600/50'
                  : 'bg-gradient-to-r from-emerald-700 to-teal-700 border-emerald-600/50'
              }`}
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Anchor className="h-5 w-5" />
                  <span className="font-medium">
                    {data?.user?.membershipStatus === 'ACTIVE'
                      ? 'Welcome aboard, Swabbie! Your voyage has officially begun. Chart your course wisely.'
                      : 'Swabbie application logged successfully! The Quartermaster will review within 3-5 tides.'}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className={`hover:text-white transition-colors ${
                    data?.user?.membershipStatus === 'ACTIVE' ? 'text-amber-100' : 'text-emerald-100'
                  }`}
                >
                  <X />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-2 lg:px-6 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col lg:flex-row sm:items-center space-y-3 sm:space-y-0 lg:space-x-4 mb-4 sm:mb-6">
              <div
                className={`h-10 w-1 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                  data?.user?.membershipStatus === 'ACTIVE'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 shadow-amber-900/50'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-700 shadow-cyan-900/50'
                }`}
              />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Storm Harbor Port</h1>
                <p
                  className={`text-sm sm:text-base ${
                    data?.user?.membershipStatus === 'ACTIVE' ? 'text-amber-200' : 'text-cyan-200'
                  }`}
                >
                  {data?.user?.membershipStatus === 'ACTIVE' ? 'Active Swabbie Dashboard' : 'Dockside Dashboard'}
                </p>
              </div>
            </div>

            <div
              className={`bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl shadow-slate-900/50 border ${
                data?.user?.membershipStatus === 'ACTIVE' ? 'border-amber-500/30' : 'border-cyan-500/30'
              }`}
            >
              <div className="space-y-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Main content section */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="leading-tight">
                      {data?.user?.membershipStatus === 'ACTIVE'
                        ? `Welcome aboard, ${data?.user?.name}!`
                        : `Docked and ready, ${data?.user?.name}!`}
                    </span>
                  </h2>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      data?.user?.membershipStatus === 'ACTIVE' ? 'text-amber-200' : 'text-cyan-200'
                    }`}
                  >
                    {data?.user?.membershipStatus === 'ACTIVE'
                      ? 'Your voyage has officially begun! Navigate the seas of opportunity and chart your course to success.'
                      : 'Your swabbie credentials are under review by the Quartermaster. Weather the storm while we process your application.'}
                  </p>
                </div>

                {/* ID section - moved below on mobile */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 ${
                    data?.user?.membershipStatus === 'ACTIVE' ? 'border-amber-500/20' : 'border-cyan-500/20'
                  }`}
                >
                  <div className=""></div>
                  <div className="flex flex-col sm:items-end">
                    <div
                      className={`text-xs sm:text-sm mb-1 ${
                        data?.user?.membershipStatus === 'ACTIVE' ? 'text-amber-300' : 'text-cyan-300'
                      }`}
                    >
                      Swabbie ID
                    </div>
                    <div
                      className={`text-sm sm:text-lg font-mono font-bold text-white bg-slate-700/50 px-2 sm:px-3 py-1 rounded-lg border break-all sm:break-normal ${
                        data?.user?.membershipStatus === 'ACTIVE' ? 'border-amber-500/20' : 'border-cyan-500/20'
                      }`}
                    >
                      {data?.user?.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-8">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {/* Voyage Progess */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-slate-800/40 rounded-2xl border border-slate-600/30 p-4 sm:p-6 shadow-xl shadow-slate-900/50"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold text-white">Voyage Progress</h3>
                </div>

                <ApplicationTimeline user={data?.user} />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className={`mt-6 p-4 rounded-xl border shadow-inner ${
                    data?.user?.membershipStatus === 'ACTIVE'
                      ? 'bg-gradient-to-r from-amber-800/20 to-yellow-800/20 border-amber-400/30'
                      : 'bg-gradient-to-r from-cyan-800/20 to-blue-800/20 border-cyan-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Info
                        className={`h-5 w-5 ${
                          data?.user?.membershipStatus === 'ACTIVE' ? 'text-amber-400' : 'text-cyan-400'
                        }`}
                      />
                      <div>
                        <div className="font-medium text-white">
                          {data?.user?.membershipStatus === 'ACTIVE' ? 'Voyage Started' : 'Expected Clearance Date'}
                        </div>
                        <div className="text-sm text-slate-300">
                          {data?.user?.membershipStatus === 'ACTIVE' ? (
                            <>
                              {new Date(data?.user?.createdAt).toLocaleDateString()} -{' '}
                              <span className="text-amber-400">Full Speed Ahead</span>
                            </>
                          ) : (
                            <>
                              {new Date(
                                new Date(data?.user?.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString()}{' '}
                              - <span className="text-cyan-400">Fair Winds Expected</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Button - only show for ACTIVE members */}
                    {data?.user?.membershipStatus === 'ACTIVE' && (
                      <button
                        onClick={() => (window.location.href = '/member/bridge')}
                        className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                      >
                        <span>Navigate to Bridge</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-800/40 rounded-2xl border border-slate-600/30 p-4 sm:p-6 shadow-xl shadow-slate-900/50"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Chart Your Course</h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {nextSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`group bg-slate-700/20 rounded-xl p-3 sm:p-4 transition-all duration-300 border ${
                        step.disabled
                          ? 'opacity-60 cursor-not-allowed border-slate-600/30'
                          : 'hover:bg-slate-700/40 cursor-pointer hover:border-cyan-400/50 border-slate-600/30'
                      }`}
                      onClick={step.disabled ? undefined : step.linkKey ? () => push(step.linkKey) : undefined}
                    >
                      {/* Mobile: Stack vertically, Desktop: Side by side */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        {/* Main content */}
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div
                            className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center transition-colors shadow-lg flex-shrink-0 ${
                              step.disabled
                                ? 'bg-slate-600/30 shadow-slate-800/50'
                                : 'bg-gradient-to-r from-cyan-600 to-blue-600 group-hover:from-cyan-500 group-hover:to-blue-500 shadow-cyan-900/50'
                            }`}
                          >
                            <step.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-sm sm:text-base break-words">{step.title}</h4>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1 break-words leading-tight">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Action and arrow - on mobile: full width, on desktop: right side */}
                        <div className="flex items-center justify-between sm:justify-end space-x-2 sm:flex-shrink-0 sm:ml-4">
                          <span
                            className={`text-xs sm:text-sm transition-colors px-2 py-1 rounded-full whitespace-nowrap flex-1 sm:flex-initial text-center sm:text-left ${
                              step.disabled
                                ? 'text-slate-400 bg-slate-600/20'
                                : 'text-cyan-300 group-hover:text-cyan-200 bg-cyan-800/30 group-hover:bg-cyan-700/40'
                            }`}
                          >
                            {step.action}
                          </span>
                          {!step.disabled && (
                            <ChevronRight className="h-4 w-4 text-cyan-300 group-hover:text-cyan-200 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Signals Section - Only show if user has signals */}
              {data?.user?.signals && Array.isArray(data?.user.signals) && data?.user.signals.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-slate-800/40 rounded-2xl border border-amber-600/30 p-4 sm:p-6 shadow-xl shadow-slate-900/50"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                    <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white flex-1 min-w-0">Signal Log</h3>
                    <span className="text-xs sm:text-sm text-amber-300 bg-amber-900/30 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                      {data?.user?.signals?.length} message{data?.user?.signals?.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {data?.user.signals.map((signal: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="bg-slate-700/30 rounded-xl p-4 border border-amber-600/20 hover:border-amber-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span className="text-sm font-medium text-amber-300">Signal to Quartermaster</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            {signal.timestamp ? new Date(signal.timestamp).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        <p className="text-white text-sm leading-relaxed mb-2">{signal.message || signal}</p>

                        {signal.chapterId && <div className="text-xs text-slate-400">Chapter: {signal.chapterId}</div>}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-amber-700/30">
                    <p className="text-xs text-slate-400 text-center">
                      All signals are recorded in the ship&apos;s log
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Profile & Resources */}
            <div className="col-span-1 space-y-6">
              {/* Profile Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-slate-800/40 rounded-2xl border border-slate-600/30 p-4 sm:p-6 shadow-xl shadow-slate-900/50"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Archive className="h-6 w-6 text-slate-400" />
                  <h3 className="text-xl font-semibold text-white">Swabbies Log</h3>
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
                className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-600/30 p-4 sm:p-6 shadow-xl shadow-slate-900/50"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <ScrollText className="h-6 w-6 text-slate-400" />
                  <h3 className="text-xl font-semibold text-white">Ship’s Records</h3>
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

              {/* Swabbie/Navigator Definition Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-slate-800/20 to-slate-700/20 backdrop-blur-md rounded-2xl border border-slate-500/30 p-4 sm:p-6 shadow-xl shadow-slate-900/50"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <LifeBuoy className="h-6 w-6 text-slate-400" />
                  <h3 className="text-xl font-semibold text-white">
                    {data?.user?.membershipStatus === 'ACTIVE' ? "What's a Navigator?" : "What's a Swabbie?"}
                  </h3>
                </div>

                <p className="text-slate-200 text-sm mb-4">
                  {data?.user?.membershipStatus === 'ACTIVE' ? (
                    <>
                      A Navigator is a full crew member of our Lynn-based organization who has earned their sea legs and
                      proven their worth. Navigators have access to the ship&apos;s bridge, can chart courses for new
                      ventures, participate in crew decisions, and help guide fellow swabbies on their journey to
                      earning Navigator status.
                    </>
                  ) : (
                    <>
                      A swabbie is a prospective crew member interested in joining our Lynn-based organization. Swabbies
                      are visitors exploring membership, actively considering joining, or committed to joining but
                      haven&apos;t yet earned their Navigator status.
                    </>
                  )}
                </p>
              </motion.div>

              {/* Support */}
              <StormWatchSupport setOpen={setOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SwabbiePort
