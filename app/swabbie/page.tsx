'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  User,
  MapPin,
  CheckCircle,
  ArrowRight,
  Anchor,
  Navigation,
  Shield,
  Waves,
  Compass,
  Ship,
  Zap,
  AlertTriangle
} from 'lucide-react'
import { createFormActions } from '../redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useRouter } from 'next/navigation'
import { useCreateUserMutation } from '../redux/services/userApi'
import { chapterId } from '../lib/constants/api/chapterId'
import { showToast } from '../redux/features/toastSlice'
import { Switch } from '../components/ui/Switch'
import validateSwabbieForm from '../components/forms/validations/validateSwabbieForm'
import StormEffects from '../components/common/StormEffects'

const Swabbies = () => {
  const dispatch = useAppDispatch()
  const { handleInput, handleToggle, setErrors } = createFormActions('swabbieForm', dispatch)
  const { swabbieForm } = useAppSelector((state: RootState) => state.form)
  const { push } = useRouter()
  const [createSkipper, { isLoading }] = useCreateUserMutation() as any

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateSwabbieForm(swabbieForm.inputs, setErrors)) return

    try {
      const result = await createSkipper({ chapterId, ...swabbieForm.inputs }).unwrap()

      push(`/swabbie/port?skipperId=${result.user.id}`)
      dispatch(
        showToast({
          type: 'success',
          message: 'Application submitted successfully!',
          description: `Thank you for your interest, ${swabbieForm.inputs.firstName}!`
        })
      )
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Submission failed',
          description: error?.data?.message || 'Something went wrong. Please try again.'
        })
      )
    }
  }

  const InputStyle =
    'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <StormEffects />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/50">
              <Anchor className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Coastal Referral Exchange</h1>
          </div>
          <p className="text-cyan-200">Join Storm Harbor&apos;s Elite Business Network</p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-800/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-8 shadow-2xl shadow-slate-900/50"
        >
          <div className="p-8 space-y-10">
            {/* Personal Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg mr-4 shadow-lg shadow-cyan-900/50">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Swabbie Details</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={swabbieForm.inputs.name || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="Enter your captain's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={swabbieForm.inputs.email || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="captain@maritime.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Home Port</label>
                  <input
                    type="text"
                    name="location"
                    value={swabbieForm.inputs.location || ''}
                    onChange={handleInput}
                    className={InputStyle}
                    placeholder="Boston Harbor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Signal Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={swabbieForm.inputs.phone || ''}
                    onChange={handleInput}
                    className={InputStyle}
                    placeholder="(555) 123-SHIP"
                  />
                </div>
              </div>
            </section>

            {/* Maritime Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg mr-4 shadow-lg shadow-emerald-900/50">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Business Vessel Operations</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Vessel Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={swabbieForm.inputs.company || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="Your business name or vessel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Business Industry <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={swabbieForm.inputs.industry || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="e.g., Financial Advisor, Maritime Attorney, Insurance Broker"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Captain&apos;s License</label>
                  <div className="mt-1">
                    <Switch
                      name="isLicensed"
                      checked={swabbieForm?.inputs.isLicensed ?? false}
                      onChange={handleToggle}
                      label="Do you hold a Professional License?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Professional License Number</label>
                  <input
                    type="text"
                    name="businessLicenseNumber"
                    value={swabbieForm.inputs.businessLicenseNumber || ''}
                    onChange={handleInput}
                    disabled={!swabbieForm?.inputs?.isLicensed}
                    className={`${InputStyle} ${
                      !swabbieForm?.inputs?.isLicensed ? 'opacity-50 cursor-not-allowed bg-slate-700/30' : ''
                    }`}
                    placeholder={
                      swabbieForm?.inputs?.isLicensed
                        ? 'Your professional license number'
                        : 'Enable license to enter number'
                    }
                  />
                </div>
              </div>
            </section>

            {/* Harbor Selection */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg mr-4 shadow-lg shadow-purple-900/50">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Storm Harbor Watch Chapter</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assigned Harbor Chapter</label>
                <div className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white cursor-not-allowed opacity-75">
                  <div className="flex items-center justify-between">
                    <span>Storm Harbor Watch - North Shore (Tuesdays at Dawn)</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-emerald-400">Active</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  You will be automatically assigned to the Storm Harbor Watch chapter based on your location.
                </p>
              </div>
            </section>

            {/* Harbor Benefits */}
            <section className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50 shadow-inner">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                Coastal Referral Exchange Benefits
              </h3>
              <div className="mb-4 p-3 bg-cyan-800/20 border border-cyan-600/50 rounded-lg">
                <p className="text-cyan-200 text-sm">
                  <strong>New Chapter Launch:</strong> Join our founding crew on Boston&apos;s stormy North Shore! Many
                  of our charter members bring 20+ years of proven business networking experience across diverse
                  industries.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <Waves className="w-3 h-3 text-cyan-400 mr-3" />
                    <span>Weekly business breakfast meetings (7:30 AM)</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Anchor className="w-3 h-3 text-emerald-400 mr-3" />
                    <span>Seasoned business professionals</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Compass className="w-3 h-3 text-cyan-400 mr-3" />
                    <span>Prime North Shore business territory</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Ship className="w-3 h-3 text-emerald-400 mr-3" />
                    <span>Storm-tested referral partnerships</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-300">
                    <Navigation className="w-3 h-3 text-cyan-400 mr-3" />
                    <span>Exclusive business category protection</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Zap className="w-3 h-3 text-emerald-400 mr-3" />
                    <span>Charter member business opportunities</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <MapPin className="w-3 h-3 text-cyan-400 mr-3" />
                    <span>Local business community focus</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mr-3" />
                    <span>Proven business networking methodology</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Application Notice */}
            <div className="bg-amber-900/20 border border-amber-600/50 rounded-lg p-4 shadow-inner">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Harbor Master Review Process</h4>
                  <p className="text-amber-200 text-sm">
                    Your application will be reviewed by the Harbor Master within 2-3 business tides. You&apos;ll be
                    contacted to schedule a business networking session before receiving your member credentials.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-600/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-400">
                  By submitting, you agree to Coastal Referral Exchange&apos;s code of conduct and referral terms
                </p>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-600 px-8 py-3 rounded-lg font-semibold text-white transition-all inline-flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer group whitespace-nowrap shadow-lg shadow-cyan-900/50"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                      />
                      Setting Sail...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 duration-300" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default Swabbies
