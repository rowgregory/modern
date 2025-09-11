import React from 'react'
import { AlertCircle, Building2, CheckCircle, FileText, Mail, MapPin, Phone, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUserSelector } from '@/app/redux/store'

const TreasureMapForm = ({ inputs, errors, handleInput, isLoading, handleSubmit, user, isUpdating, onClose }: any) => {
  const { users } = useUserSelector()
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

            {/* Current User (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2"> Ye be Sendin’ a Treasure Map</label>
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
                </div>
              </div>
            </div>

            {/* Who to meet with */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2"> Who Receives Yer Treasure Map?</label>
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
