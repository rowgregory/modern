import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface IMainDialog {
  displayedText: string
  isTyping: boolean
  currentMsg: any
  currentDialogue: any
  dialogues: any
}

const MainDialog: FC<IMainDialog> = ({ displayedText, isTyping, currentMsg, currentDialogue, dialogues }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="absolute left-6 right-6 lg:right-auto top-48 lg:top-1/2 lg:-translate-y-1/2 lg:w-md"
    >
      {/* Main Text Bubble */}
      <motion.div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-teal-500/50 shadow-2xl min-h-[200px] flex flex-col justify-center">
        <p className="text-white text-xl leading-relaxed font-medium mb-6">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-6 bg-amber-400 ml-1"
            />
          )}
        </p>

        {/* Subtext appears below */}
        {!isTyping && currentMsg?.subtext && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-slate-700/50 pt-4"
          >
            <p className="text-slate-300 text-sm italic">{currentMsg.subtext}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-between mt-6"
      >
        {/* Page Counter - Floating */}
        <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1 border border-slate-600/30">
          <span className="text-xs text-slate-400">
            {currentDialogue + 1} / {dialogues.length}
          </span>
        </div>

        {/* Continue Button - Floating */}
        <div className="flex items-center space-x-3 border border-amber-400/20 bg-amber-900/5 text-amber-300/70 px-4 py-2 rounded-xl backdrop-blur-sm">
          <span className="font-normal text-sm">{isTyping ? 'Scribbling' : 'Select Action'}</span>
          <ChevronRight className="hidden lg:block h-3 w-3 opacity-40" />
          <ChevronDown className="block lg:hidden h-3 w-3 opacity-40" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MainDialog
