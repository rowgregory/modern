import React, { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { drawerVariants } from '@/app/lib/constants/motion'

const Drawer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
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
      {children}
    </motion.div>
  )
}

export default Drawer
