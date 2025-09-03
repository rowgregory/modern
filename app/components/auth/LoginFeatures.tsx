import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Shield, Users } from 'lucide-react'

const LoginFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 grid grid-cols-3 gap-4"
    >
      <div className="text-center">
        <div className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Shield className="w-5 h-5 text-cyan-400" />
        </div>
        <p className="text-xs text-gray-400">Secure Access</p>
      </div>

      <div className="text-center">
        <div className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Users className="w-5 h-5 text-cyan-400" />
        </div>
        <p className="text-xs text-gray-400">Member Portal</p>
      </div>

      <div className="text-center">
        <div className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Building2 className="w-5 h-5 text-cyan-400" />
        </div>
        <p className="text-xs text-gray-400">Chapter Tools</p>
      </div>
    </motion.div>
  )
}

export default LoginFeatures
