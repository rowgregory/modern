import React, { FC } from 'react'
import { motion } from 'framer-motion'

const SignalTheQuartermasterForm: FC<{
  handleSendMessage: any
  messageText: string
  setMessageText: any
  handleMessageCancel: any
  isLoading: boolean
}> = ({ handleSendMessage, messageText, setMessageText, handleMessageCancel, isLoading }) => {
  return (
    <motion.form
      onSubmit={handleSendMessage}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="absolute left-6 right-6 lg:right-auto lg:left-[675px] lg:-translate-x-1/2 top-[524px] lg:top-1/2 lg:-translate-y-1/2 lg:w-80"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-amber-600/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-900/20 border-b border-amber-700/30 p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <h3 className="text-amber-300 text-sm font-bold uppercase tracking-wider">Signal Quartermaster</h3>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <p className="text-slate-400 text-xs">Compose your message</p>
        </div>

        <div className="p-6">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Enter your message to the Quartermaster..."
            className="w-full h-32 bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
            autoFocus
          />

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handleMessageCancel}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!messageText.trim() || isLoading}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium flex items-center space-x-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
              <span>{isLoading ? 'Sending...' : 'Send Signal'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  )
}

export default SignalTheQuartermasterForm
