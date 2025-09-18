import React from 'react'
import { AlertCircle, Building2, CheckCircle, FileText, Mail, MapPin, Phone, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import { setInputs } from '@/app/redux/features/formSlice'
import getServiceTags from '@/app/lib/constants/navigator/getServiceTags'

const genericNoteOptions = [
  'This is time-sensitive',
  'Flexible timeline',
  'Budget-conscious preferred',
  'Looking for long-term partnership',
  'One-time project',
  'Local provider preferred',
  'Remote service preferred',
  'Need detailed proposal first',
  'Previous positive experience',
  'New to this service',
  'High quality/premium service desired',
  'References would be helpful',

  'This treasure be time-sensitive, matey!',
  'Flexible timeline, whenever the wind blows right',
  'Seeking budget-friendly treasure, not breaking the bank',
  'Looking for a long-term crew partnership',
  'This be a one-time voyage',
  'Local port preferred, no long journeys',
  'Remote service works, can sail from afar',
  'Need a detailed map before we set sail',
  'Had smooth sailing with similar services before',
  'New to these waters, need a trustworthy guide',
  'Premium quality service desired, spare no expense',
  'References from other captains would be helpful',
  'All hands on deck - urgent mission!',
  'Seeking the finest treasure in the seven seas',
  'Need someone who knows these treacherous waters',
  'Looking for a crew member who speaks plain English',
  'This bounty may lead to more adventures',
  'Discretion required - keep this treasure secret',
  'Fair winds and following seas timeline',
  'Seeking a seasoned navigator for this quest',
  'Small treasure hunt, quick and simple',
  'Major expedition requiring experienced crew'
]

const TreasureMapForm = ({ inputs, errors, handleInput, isLoading, handleSubmit, user, isUpdating, onClose }: any) => {
  const { users } = useUserSelector()
  const dispatch = useAppDispatch()

  return (
    <>
      <form onSubmit={handleSubmit} id="treasureMapForm" className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>Treasure Map</span>
            </h3>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">What be yer role in this treasure map?</label>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      setInputs({
                        formName: 'treasureMapForm',
                        data: { isReceiving: false, isThirdParty: false, giverId: user?.id, receiverId: '' }
                      })
                    )
                  }}
                  className={`py-4 px-4 rounded-xl border transition-all duration-200 ${
                    !inputs?.isReceiving && !inputs?.isThirdParty
                      ? 'border-teal-400 bg-teal-400/10 text-teal-300 shadow-lg shadow-teal-400/20'
                      : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="text-2xl mx-auto mb-2 w-fit font-mono">→</div>
                  <div className="text-center">
                    <div className="font-semibold">I&apos;m Giving</div>
                    <div className="text-xs opacity-70 mt-1">Sending a treasure map</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      setInputs({
                        formName: 'treasureMapForm',
                        data: { isReceiving: true, isThirdParty: false, giverId: '', receiverId: user?.id }
                      })
                    )
                  }}
                  className={`py-4 px-4 rounded-xl border transition-all duration-200 ${
                    inputs?.isReceiving && !inputs?.isThirdParty
                      ? 'border-purple-400 bg-purple-400/10 text-purple-300 shadow-lg shadow-purple-400/20'
                      : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="text-2xl mx-auto mb-2 w-fit font-mono">←</div>
                  <div className="text-center">
                    <div className="font-semibold">I&apos;m Receiving</div>
                    <div className="text-xs opacity-70 mt-1">Got a treasure map</div>
                  </div>
                </button>

                {user?.isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        setInputs({
                          formName: 'treasureMapForm',
                          data: { isReceiving: false, isThirdParty: true, giverId: '', receiverId: '' }
                        })
                      )
                    }}
                    className={`py-4 px-4 rounded-xl border transition-all duration-200 ${
                      inputs?.isThirdParty
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300 shadow-lg shadow-amber-400/20'
                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="text-2xl mx-auto mb-2 w-fit font-mono">↔</div>
                    <div className="text-center">
                      <div className="font-semibold">Third Party</div>
                      <div className="text-xs opacity-70 mt-1">Log for others</div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Conditional content based on selection */}
            {!inputs?.isThirdParty ? (
              !inputs?.isReceiving ? (
                <>
                  {/* When GIVING - Current User (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ye be Sendin&apos; a Treasure Map
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user?.name
                            ?.split(' ')
                            .map((n: any[]) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user?.name}</p>
                          <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-400/20 text-teal-300 border border-teal-400/30">
                            Giver
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Who receives */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Who Receives Yer Treasure Map?
                    </label>
                    <select
                      name="receiverId"
                      value={inputs?.receiverId || ''}
                      onChange={(e) => handleInput({ target: { name: 'receiverId', value: e.target.value } })}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all ${
                        errors.receiverId ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      <option value="">Select a fellow navigator...</option>
                      {users
                        ?.filter((navigator) => navigator.id !== user?.id && navigator?.membershipStatus === 'ACTIVE')
                        .map((navigator) => (
                          <option key={navigator.id} value={navigator.id || ''}>
                            {navigator.name} - {navigator.company}
                          </option>
                        ))}
                    </select>
                    {errors.receiverId && (
                      <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.receiverId}</span>
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* When RECEIVING - Current User (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ye be Receivin&apos; a Treasure Map
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user?.name
                            ?.split(' ')
                            .map((n: any[]) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user?.name}</p>
                          <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-400/20 text-purple-300 border border-purple-400/30">
                            Receiver
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Who gave it */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Who be Givin&apos; Ye the Treasure Map?
                    </label>
                    <select
                      name="giverId"
                      value={inputs?.giverId || ''}
                      onChange={(e) => handleInput({ target: { name: 'giverId', value: e.target.value } })}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all ${
                        errors.giverId ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      <option value="">Select who gave ye the treasure...</option>
                      {users
                        ?.filter((navigator) => navigator.id !== user?.id && navigator?.membershipStatus === 'ACTIVE')
                        .map((navigator) => (
                          <option key={navigator.id} value={navigator.id || ''}>
                            {navigator.name} - {navigator.company}
                          </option>
                        ))}
                    </select>
                    {errors.giverId && (
                      <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.giverId}</span>
                      </p>
                    )}
                  </div>
                </>
              )
            ) : (
              <>
                {/* Third Party Mode - Select both giver and receiver */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Who be Givin&apos; the Treasure Map?
                  </label>
                  <select
                    name="giverId"
                    value={inputs?.giverId || ''}
                    onChange={(e) => handleInput({ target: { name: 'giverId', value: e.target.value } })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all ${
                      errors.giverId ? 'border-red-500' : 'border-gray-600'
                    }`}
                  >
                    <option value="">Select the giver...</option>
                    {users
                      ?.filter((navigator) => navigator?.membershipStatus === 'ACTIVE')
                      .map((navigator) => (
                        <option key={navigator.id} value={navigator.id || ''}>
                          {navigator.name} - {navigator.company}
                        </option>
                      ))}
                  </select>
                  {errors.giverId && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.giverId}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Who be Receivin&apos; the Treasure Map?
                  </label>
                  <select
                    name="receiverId"
                    value={inputs?.receiverId || ''}
                    onChange={(e) => handleInput({ target: { name: 'receiverId', value: e.target.value } })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all ${
                      errors.receiverId ? 'border-red-500' : 'border-gray-600'
                    }`}
                  >
                    <option value="">Select the receiver...</option>
                    {users
                      ?.filter(
                        (navigator) => navigator?.membershipStatus === 'ACTIVE' && navigator.id !== inputs?.giverId
                      )
                      .map((navigator) => (
                        <option key={navigator.id} value={navigator.id || ''}>
                          {navigator.name} - {navigator.company}
                        </option>
                      ))}
                  </select>
                  {errors.receiverId && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.receiverId}</span>
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>

          {/* Client Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-md font-semibold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Client Information</span>
            </h4>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label>
              <input
                type="text"
                name="clientName"
                value={inputs?.clientName || ''}
                onChange={handleInput}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter the client's full name"
                required
              />
            </div>

            {/* Client Contact - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Client Email
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={inputs?.clientEmail || ''}
                  onChange={handleInput}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="client@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Client Phone
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={inputs?.clientPhone || ''}
                  onChange={handleInput}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="5551234567"
                />
              </div>
            </div>
          </motion.div>

          {/* Service Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-md font-semibold text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-green-400" />
              <span>Service Details</span>
            </h4>

            {/* Service Needed */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service Needed *</label>
              <input
                type="text"
                name="serviceNeeded"
                value={inputs?.serviceNeeded || ''}
                onChange={handleInput}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="What service or product does the client need?"
                required
              />
            </div>
          </motion.div>

          {inputs?.receiverId && getServiceTags(users?.find((u) => u.id === inputs?.receiverId)?.industry || '') && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">Quick Service Tags</label>
              <p className="text-xs text-gray-400 mb-3">
                Click a tag to quickly fill in the service needed for{' '}
                {users?.find((u) => u.id === inputs.receiverId)?.name}
              </p>

              <div className="flex flex-wrap gap-2">
                {getServiceTags(users?.find((u) => u.id === inputs?.receiverId)?.industry || '')?.map?.(
                  (tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        dispatch(
                          setInputs({
                            formName: 'treasureMapForm',
                            data: { serviceNeeded: tag }
                          })
                        )
                      }}
                      className={`px-3 py-2 border rounded-lg text-sm transition-all duration-200 ${
                        inputs?.serviceNeeded === tag
                          ? 'bg-teal-500/30 border-teal-400 text-teal-200 shadow-lg shadow-teal-400/20'
                          : 'bg-gray-700/50 hover:bg-teal-500/20 border-gray-600 hover:border-teal-400 text-gray-300 hover:text-teal-300'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>

              {/* Custom input option */}
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    setInputs({
                      formName: 'treasureMapForm',
                      data: { serviceNeeded: '' }
                    })
                  )
                }}
                className="px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-gray-500 rounded-lg text-sm text-gray-400 hover:text-gray-300 transition-all duration-200"
              >
                Write custom description
              </button>
            </motion.div>
          )}

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-md font-semibold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-yellow-400" />
              <span>Additional Information</span>
            </h4>

            {/* General Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Referral Notes</label>
              <textarea
                value={inputs?.notes || ''}
                name="notes"
                onChange={handleInput}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Provide context about the client's needs, timeline, budget, or any other relevant details that would help the receiver..."
              />
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">Quick Note Tags</label>
              <p className="text-xs text-gray-400 mb-3">
                Click a tag to quickly fill in the notes for {users?.find((u) => u.id === inputs.receiverId)?.name}
              </p>

              <div className="flex flex-wrap gap-2">
                {genericNoteOptions.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      dispatch(
                        setInputs({
                          formName: 'treasureMapForm',
                          data: { notes: tag }
                        })
                      )
                    }}
                    className={`px-3 py-2 border rounded-lg text-sm transition-all duration-200 ${
                      inputs?.notes === tag
                        ? 'bg-teal-500/30 border-teal-400 text-teal-200 shadow-lg shadow-teal-400/20'
                        : 'bg-gray-700/50 hover:bg-teal-500/20 border-gray-600 hover:border-teal-400 text-gray-300 hover:text-teal-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Custom input option */}
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    setInputs({
                      formName: 'treasureMapForm',
                      data: { serviceNeeded: '' }
                    })
                  )
                }}
                className="px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-gray-500 rounded-lg text-sm text-gray-400 hover:text-gray-300 transition-all duration-200"
              >
                Write custom description
              </button>
            </motion.div>

            {/* Private Giver Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Private Notes (Only you can see these)
              </label>
              <textarea
                value={inputs?.giverNotes || ''}
                onChange={handleInput}
                name="giverNotes"
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Add any private notes about the client relationship, quality of lead, or internal reminders..."
              />
            </div>
          </motion.div>
        </div>
      </form>
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
            form="treasureMapForm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>{isUpdating ? 'Updating' : 'Sending...'}</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{isUpdating ? 'Update' : 'Send'} Treasure Map</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

export default TreasureMapForm
