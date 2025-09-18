import React from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/app/redux/store'
import { setOpenMobileNavigation } from '@/app/redux/features/appSlice'
import { Menu } from 'lucide-react'

const MobileMenuButton = () => {
  const dispatch = useAppDispatch()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(setOpenMobileNavigation())}
      className="block lg:hidden relative p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
    >
      <Menu className="w-5 h-5 text-gray-400" />
    </motion.button>
  )
}

export default MobileMenuButton
