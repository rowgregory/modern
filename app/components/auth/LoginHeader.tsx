import { ShipWheel } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const LoginHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <Link href="/" className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-2xl flex items-center justify-center">
          <ShipWheel className="w-8 h-8 text-white" />
        </div>
      </Link>

      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
        Step Aboard
      </h1>
      <p className="text-gray-400 text-lg">Access The Bridge to navigate your chapter dashboard</p>
    </motion.div>
  )
}

export default LoginHeader
