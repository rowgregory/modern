import React from 'react'
import { Calendar, DollarSign, Building, FileText, AlertCircle, CheckCircle, Anchor } from 'lucide-react'
import { useUserSelector } from '@/app/redux/store'
import { motion } from 'framer-motion'
import { formatDateForInput } from '@/app/lib/utils/date/formatDate'

const statusOptions = ['REPORTED', 'VERIFIED']

const AnchorForm = ({ inputs, errors, handleInput, isLoading, handleSubmit, user, isUpdating, onClose }: any) => {
  const { users } = useUserSelector()
  // Format currency display
  const formatCurrency = (value: string) => {
    if (!value) return ''
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(parseFloat(value))
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="anchorForm" className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Participants Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Anchor className="w-5 h-5 text-cyan-400" />
              <span>Anchor Thanks</span>
            </h3>

            {/* Current User (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2"> Ye be Droppin’ Anchor</label>
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
              <label className="block text-sm font-medium text-gray-300 mb-2"> Who steered yer course?</label>
              <select
                name="receiverId"
                value={inputs?.receiverId || ''}
                onChange={(e) => handleInput({ target: { name: 'receiverId', value: e.target.value } })}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all ${
                  errors.receiverId ? 'border-red-500' : 'border-gray-600'
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
              {errors.receiverId && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.receiverId}</span>
                </p>
              )}
            </div>
          </motion.div>

          {/* Business Value */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Business Value *
            </label>
            <div className="flex space-x-2">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                USD
              </div>
              <input
                type="text"
                name="businessValue"
                value={inputs?.businessValue || ''}
                onChange={handleInput}
                placeholder="0.00"
                step="0.01"
                className={`flex-1 bg-gray-800/50 border rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${errors?.businessValue ? 'border-red-500' : 'border-gray-600'}`}
              />
            </div>
            {inputs?.businessValue && (
              <p className="mt-1 text-sm text-cyan-300">Display value: {formatCurrency(inputs?.businessValue)}</p>
            )}
            {errors?.businessValue && <p className="mt-1 text-sm text-red-400">{errors?.businessValue}</p>}
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Client Name (Optional)
            </label>
            <input
              type="text"
              name="clientName"
              value={inputs?.clientName || ''}
              onChange={handleInput}
              placeholder="Client or company name"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          {/* Closed Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              When’d ye drop anchor? *
            </label>
            <input
              type="date"
              name="closedDate"
              value={formatDateForInput(inputs?.closedDate) || ''}
              onChange={handleInput}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full bg-gray-800/50 border rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${errors?.closedDate ? 'border-red-500' : 'border-gray-600'}`}
            />
            {errors?.closedDate && <p className="mt-1 text-sm text-red-400">{errors?.closedDate}</p>}
          </div>

          {/* Business Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Business Description *
            </label>
            <textarea
              name="description"
              value={inputs?.description}
              onChange={handleInput}
              placeholder="Describe the business that was closed (services provided, project details, etc.)"
              rows={4}
              className={`w-full bg-gray-800/50 border rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none ${errors?.description ? 'border-red-500' : 'border-gray-600'}`}
            />
            {errors?.description && <p className="mt-1 text-sm text-red-400">{errors?.description}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <select
              name="status"
              value={inputs?.status}
              onChange={handleInput}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={inputs?.notes}
              onChange={handleInput}
              placeholder="Any additional details about this closed business..."
              rows={3}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
            />
          </div>
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
            form="anchorForm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Dropping...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{isUpdating ? 'Update' : 'Drop'} Anchor</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

export default AnchorForm
