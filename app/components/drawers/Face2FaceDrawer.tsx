import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Users, Video, Phone, AlertCircle, CheckCircle } from 'lucide-react'
import { closeFace2FaceDrawer } from '@/app/redux/features/face2FaceSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'

const Face2FaceDrawer = () => {
  const dispatch = useAppDispatch()
  const closeDrawer = () => dispatch(closeFace2FaceDrawer())
  const { face2FaceDrawer } = useAppSelector((state: RootState) => state.face2Face)

  const currentUser = {
    id: 'user_current123',
    name: 'John Smith',
    company: 'Smith & Associates',
    profession: 'Accounting'
  }

  const [formData, setFormData] = useState({
    requesterId: currentUser.id,
    recipientId: '',
    scheduledAt: '',
    scheduledTime: '',
    duration: 30,
    meetingType: 'FACE_TO_FACE',
    location: '',
    notes: '',
    status: 'CONFIRMED' // Admin can create confirmed meetings directly
  }) as any

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({}) as any

  // Mock chapter members - replace with your actual data
  const mockMembers = [
    { id: 'user_sarah123', name: 'Sarah Johnson', company: 'Digital Marketing Pro', profession: 'Digital Marketing' },
    { id: 'user_mike456', name: 'Mike Rodriguez', company: 'Rodriguez Construction', profession: 'Construction' },
    { id: 'user_david789', name: 'David Chen', company: 'Chen Financial Services', profession: 'Financial Planning' },
    { id: 'user_lisa012', name: 'Lisa Thompson', company: 'Thompson Real Estate', profession: 'Real Estate' },
    { id: 'user_jennifer345', name: 'Jennifer Walsh', company: 'Walsh Legal Group', profession: 'Legal Services' },
    { id: 'user_robert678', name: 'Robert Kim', company: 'Kim Tech Solutions', profession: 'IT Services' }
  ]

  const meetingTypes = [
    { value: 'FACE_TO_FACE', label: 'Face-to-Face', icon: Users, description: 'In-person meeting' },
    { value: 'VIRTUAL', label: 'Virtual Meeting', icon: Video, description: 'Video call (Zoom, Teams, etc.)' },
    { value: 'PHONE', label: 'Phone Call', icon: Phone, description: 'Audio-only conversation' }
  ]

  const durationOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ]

  const validateForm = () => {
    const newErrors = {} as any

    if (!formData.recipientId) newErrors.recipientId = 'Please select who you want to meet with'
    if (!formData.scheduledAt) newErrors.scheduledAt = 'Please select a date'
    if (!formData.scheduledTime) newErrors.scheduledTime = 'Please select a time'
    if (formData.meetingType === 'FACE_TO_FACE' && !formData.location) {
      newErrors.location = 'Location is required for face-to-face meetings'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Combine date and time into scheduledAt
      //   const scheduledAt = new Date(`${formData.scheduledAt}T${formData.scheduledTime}`)

      //   const meetingData = {
      //     ...formData,
      //     scheduledAt: scheduledAt.toISOString(),
      //     duration: parseInt(formData.duration)
      //   }

      // TODO

      // Reset form
      setFormData({
        requesterId: currentUser.id,
        recipientId: '',
        scheduledAt: '',
        scheduledTime: '',
        duration: 30,
        meetingType: 'FACE_TO_FACE',
        location: '',
        notes: '',
        status: 'CONFIRMED'
      })

      closeDrawer()
    } catch (error) {
      console.error('Error scheduling meeting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }))
    }
  }

  const drawerVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40
      }
    }
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <AnimatePresence>
      {face2FaceDrawer && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50 flex flex-col shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(26, 26, 26, 0.98)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Schedule Face-to-Face Meeting
                </h2>
                <p className="text-sm text-gray-500 mt-1">Create a new meeting between chapter members</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeDrawer}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Participants Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Users className="w-5 h-5 text-violet-400" />
                    <span>Meeting Request</span>
                  </h3>

                  {/* Current User (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      You are requesting this meeting
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {currentUser.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{currentUser.name}</p>
                          <p className="text-sm text-gray-400">{currentUser.company}</p>
                          <p className="text-xs text-gray-500">{currentUser.profession}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Who to meet with */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Who would you like to meet with?
                    </label>
                    <select
                      value={formData.recipientId}
                      onChange={(e) => handleInputChange('recipientId', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all ${
                        errors.recipientId ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      <option value="">Select a chapter member...</option>
                      {mockMembers
                        .filter((member) => member.id !== currentUser.id)
                        .map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name} - {member.company}
                          </option>
                        ))}
                    </select>
                    {errors.recipientId && (
                      <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.recipientId}</span>
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Meeting Details Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-violet-400" />
                    <span>Meeting Details</span>
                  </h3>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        value={formData.scheduledAt}
                        onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all ${
                          errors.scheduledAt ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      {errors.scheduledAt && <p className="text-red-400 text-sm mt-1">{errors.scheduledAt}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                      <input
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all ${
                          errors.scheduledTime ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      {errors.scheduledTime && <p className="text-red-400 text-sm mt-1">{errors.scheduledTime}</p>}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
                    >
                      {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Meeting Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Meeting Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {meetingTypes.map((type) => (
                        <motion.label
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.meetingType === type.value
                              ? 'border-violet-500 bg-violet-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="meetingType"
                            value={type.value}
                            checked={formData.meetingType === type.value}
                            onChange={(e) => handleInputChange('meetingType', e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <type.icon
                              className={`w-5 h-5 ${
                                formData.meetingType === type.value ? 'text-violet-400' : 'text-gray-400'
                              }`}
                            />
                            <div>
                              <div
                                className={`font-medium ${
                                  formData.meetingType === type.value ? 'text-white' : 'text-gray-300'
                                }`}
                              >
                                {type.label}
                              </div>
                              <div className="text-xs text-gray-500">{type.description}</div>
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Location (conditional) */}
                  {(formData.meetingType === 'FACE_TO_FACE' || formData.meetingType === 'VIRTUAL') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {formData.meetingType === 'FACE_TO_FACE' ? 'Meeting Location' : 'Virtual Meeting Link/Platform'}
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder={
                          formData.meetingType === 'FACE_TO_FACE'
                            ? 'e.g., Starbucks Downtown, 123 Main St'
                            : 'e.g., Zoom link or platform details'
                        }
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all ${
                          errors.location ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Notes (Optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Purpose of the meeting, topics to discuss, etc."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all resize-none"
                    />
                  </div>
                </motion.div>
              </form>
            </div>

            {/* Footer */}
            <motion.div
              className="p-6 border-t border-gray-700/50 bg-gray-900/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeDrawer}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Schedule Meeting</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Face2FaceDrawer
