import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { IForm } from '@/types/forms'
import { User, Mail, MapPin, Phone, Building, Briefcase, Hash } from 'lucide-react'
import { Switch } from '../ui/Switch'

const ShipPapersForm: FC<IForm> = ({
  handleSubmit,
  inputs,
  handleInput,
  handleToggle,
  isLoading,
  onClose,
  isUpdating
}) => {
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="absolute left-6 right-6 lg:right-auto lg:left-[675px] lg:-translate-x-1/2 top-[524px] lg:top-1/2 lg:-translate-y-1/2 lg:w-80"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-amber-500/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-900/20 border-b border-amber-700/30 p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <User className="h-5 w-5 text-amber-400" />
            <h2 className="text-amber-300 text-lg font-bold uppercase tracking-wider">Your Papers</h2>
          </div>
          <p className="text-slate-400 text-sm">Update your application details</p>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <User className="h-4 w-4 text-amber-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={inputs?.name || ''}
              onChange={handleInput}
              className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <Mail className="h-4 w-4 text-amber-400" />
              <span>Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={inputs?.email || ''}
              onChange={handleInput}
              className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              placeholder="your@email.com"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>City</span>
            </label>
            <input
              name="location"
              type="text"
              value={inputs?.location || ''}
              onChange={handleInput}
              className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              placeholder="City, State/Country"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <Phone className="h-4 w-4 text-amber-400" />
              <span>Phone</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={inputs?.phone || ''}
              onChange={handleInput}
              className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              placeholder="Your contact number"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <Building className="h-4 w-4 text-amber-400" />
              <span>Company</span>
            </label>
            <input
              type="text"
              name="company"
              value={inputs?.company || ''}
              onChange={handleInput}
              className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              placeholder="Company or organization"
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <Briefcase className="h-4 w-4 text-amber-400" />
              <span>Industry</span>
            </label>
            <input
              type="text"
              name="industry"
              value={inputs?.industry || ''}
              onChange={handleInput}
              className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              placeholder="Your industry or profession"
            />
          </div>

          {/* Licensed Checkbox */}
          <Switch
            name="isLicensed"
            checked={inputs?.isLicensed || false}
            onChange={handleToggle}
            label="Are you professionally licesnsed?"
            disabled={isLoading}
          />

          {/* Business License Number - Only show if licensed */}
          {inputs?.isLicensed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <Hash className="h-4 w-4 text-amber-400" />
                <span>Busineess License Number</span>
              </label>
              <input
                type="text"
                value={inputs?.businessLicenseNumber || ''}
                onChange={handleInput}
                className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                placeholder="Business license number"
              />
            </motion.div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="bg-slate-900/30 border-t border-amber-700/30 p-6 flex flex-col gap-y-3 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="order-2 lg:order-1 px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isUpdating}
            className="order-1 lg:order-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2"
          >
            {isUpdating && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            )}
            {isUpdating ? 'Updating Ledger...' : 'Update Ledger'}
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default ShipPapersForm
