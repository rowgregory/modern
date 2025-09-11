import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { overlayVariants } from '../drawers/MobileNavigationDrawer'

const Backdrop: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      variants={overlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
    />
  )
}

export default Backdrop
