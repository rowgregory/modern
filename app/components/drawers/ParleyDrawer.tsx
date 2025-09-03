import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Users, Video, Phone, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { setCloseParleyDrawer } from '@/app/redux/features/parleySlice'
import { useAppDispatch, useFormSelector, useParleySelector, useUserSelector } from '@/app/redux/store'
import Backdrop from '../common/Backdrop'
import { createFormActions } from '@/app/redux/features/formSlice'
import Drawer from '../common/Drawer'
import { useCreateParleyMutation, useUpdateParleyMutation } from '@/app/redux/services/parleyApi'
import { showToast } from '@/app/redux/features/toastSlice'
import validateParleyForm from '../forms/validations/validateParleyForm'
import { useSession } from 'next-auth/react'
import { chapterId } from '@/app/lib/constants/api/chapterId'

const meetingTypes = [
  { value: 'DECK_TO_DECK', label: 'Deck-to-Deck', icon: Users, description: 'In-person meeting' },
  { value: 'VOYAGE_CALL', label: 'Voyage Call', icon: Video, description: 'Video call (Zoom, Teams, etc.)' },
  { value: 'MESSAGE_IN_A_BOTTLE', label: 'Message in a Bottle', icon: Phone, description: 'Audio-only conversation' }
]

const durationOptions = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' }
]

const ParleyDrawer = () => {
  const session = useSession()
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(setCloseParleyDrawer())
  const { parleyDrawer } = useParleySelector()
  const { parleyForm } = useFormSelector()
  const inputs = parleyForm?.inputs
  const errors = parleyForm?.errors
  const { handleInput, setErrors } = createFormActions('parleyForm', dispatch)
  const [createParley, { isLoading: isCreating }] = useCreateParleyMutation()
  const [updateParley, { isLoading: isUpdating }] = useUpdateParleyMutation()
  const isLoading = isCreating || isUpdating
  const user = session?.data?.user
  const { users } = useUserSelector()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const formInputsWithRequesterId = { ...parleyForm?.inputs, requesterId: user?.id }

    if (!validateParleyForm(formInputsWithRequesterId, setErrors)) return

    try {
      // Combine date and time into scheduledAt
      const scheduledAt = new Date(inputs?.scheduledAt)

      const parleyData = {
        ...formInputsWithRequesterId,
        scheduledAt: scheduledAt.toISOString(),
        duration: parseInt(inputs?.duration),
        chapterId,
        userId: session.data?.user.id,
        status: inputs?.status
      }

      if (inputs?.isUpdating) {
        await updateParley({ parleyId: inputs?.id, ...parleyData }).unwrap()
      } else {
        await createParley({ ...parleyData }).unwrap()
      }

      onClose()

      dispatch(
        showToast({
          type: 'success',
          message: `${isUpdating ? 'Update' : 'Create'} Parley Success`,
          description: `Parley ${isUpdating ? 'updated' : 'created'} successfully.`
        })
      )
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: `${isUpdating ? 'Update' : 'Create'} Parley Failed`,
          description: error.message || 'Unable to process request.'
        })
      )
    }
  }

  return (
    <AnimatePresence>
      {parleyDrawer && (
        <>
          {/* Backdrop Overlay */}
          <Backdrop onClose={onClose} />

          {/* Drawer */}
          <Drawer>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Schedule Parley
                </h2>
                <p className="text-sm text-gray-500 mt-1">Create a new parley between crew members</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
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
              <form id="parleyForm" onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Participants Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span>Parley Request</span>
                  </h3>

                  {/* Current User (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      You are requesting this parley
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user?.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user?.name}</p>
                          <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Who to meet with */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Who would you like to parley with?
                    </label>
                    <select
                      name="recipientId"
                      value={inputs?.recipientId || ''}
                      onChange={(e) => handleInput({ target: { name: 'recipientId', value: e.target.value } })}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all ${
                        errors.recipientId ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      <option value="">Select a crew member...</option>
                      {users
                        ?.filter((navigator) => navigator.id !== user?.id && navigator?.membershipStatus === 'ACTIVE')
                        .map((navigator) => (
                          <option key={navigator.id} value={navigator.id || ''}>
                            {navigator.name} - {navigator.company}
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
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <span>Parley Details</span>
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Have ye already parleyed?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Aye', value: 'COMPLETED', description: 'Marks yer parley as completed' },
                        { label: 'Nay', value: 'REQUESTED', description: 'Keeps yer parley as requested' }
                      ].map((option) => (
                        <motion.label
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            inputs?.status === option.value
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={inputs?.status === option.value}
                            onChange={handleInput}
                            className="sr-only"
                          />
                          <div
                            className={`font-medium text-sm mb-1 ${
                              inputs?.status === option.value ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-500 text-center">{option.description}</div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                    <input
                      name="scheduledAt"
                      type="datetime-local"
                      value={inputs?.scheduledAt || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all ${
                        errors.scheduledAt ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.scheduledAt && (
                      <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.scheduledAt}</span>
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Duration</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {durationOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInput({ target: { name: 'duration', value: option.value.toString() } })}
                          className={`relative p-4 border rounded-lg transition-all text-center ${
                            parseInt(inputs?.duration) === option.value
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                              : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <Clock
                              className={`w-5 h-5 ${
                                parseInt(inputs?.duration) === option.value ? 'text-teal-400' : 'text-gray-400'
                              }`}
                            />
                            <span className="text-sm font-medium">{option.label}</span>
                          </div>
                          {parseInt(inputs?.duration) === option.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    {errors.duration && (
                      <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.duration}</span>
                      </p>
                    )}
                  </div>

                  {/* Meeting Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Parley Type</label>
                    <div className="grid grid-cols-1 gap-3">
                      {meetingTypes.map((type) => (
                        <motion.label
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            inputs?.meetingType === type.value
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="meetingType"
                            value={type.value || ''}
                            checked={inputs?.meetingType === type.value}
                            onChange={handleInput}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div
                              className={`font-medium text-sm ${
                                inputs?.meetingType === type.value ? 'text-white' : 'text-gray-300'
                              }`}
                            >
                              {type.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                    {errors.meetingType && (
                      <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.meetingType}</span>
                      </p>
                    )}
                  </div>

                  {/* Location (conditional) */}
                  {(inputs?.meetingType === 'DECK_TO_DECK' || inputs?.meetingType === 'VOYAGE_CALL') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {inputs?.meetingType === 'DECK_TO_DECK' ? 'Meeting Location' : 'Virtual Meeting Link/Platform'}
                      </label>
                      <input
                        name="location"
                        type="text"
                        value={inputs?.location || ''}
                        onChange={handleInput}
                        placeholder={
                          inputs?.meetingType === 'DECK_TO_DECK'
                            ? 'e.g., Harbor Café, 123 Marina Way'
                            : 'e.g., Zoom link or platform details'
                        }
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all ${
                          errors.location ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      {errors.location && (
                        <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.location}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Parley Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={inputs?.notes || ''}
                      onChange={handleInput}
                      placeholder="Purpose of the parley, topics to discuss, agenda items..."
                      rows={3}
                      maxLength={1000}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all resize-none ${
                        errors.notes ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.notes && (
                        <p className="text-red-400 text-sm flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.notes}</span>
                        </p>
                      )}
                      <p className="text-xs text-gray-500 ml-auto">{inputs?.notes?.length || 0}/1000 characters</p>
                    </div>
                  </div>

                  {/* Status (Hidden field - set to REQUESTED by default) */}
                  <input type="hidden" name="status" value={inputs?.status || 'REQUESTED'} />

                  {/* Chapter ID (Hidden field - set from context) */}
                  <input type="hidden" name="chapterId" value={inputs?.chapterId || ''} />

                  {/* Requester ID (Hidden field - set to current user) */}
                  <input type="hidden" name="requesterId" value={inputs?.requesterId || user?.id} />
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
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  form="parleyForm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Schedule Parley</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </Drawer>
        </>
      )}
    </AnimatePresence>
  )
}

export default ParleyDrawer
