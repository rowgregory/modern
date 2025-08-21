'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building2, MapPin, Briefcase, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { createFormActions, setInputs } from '../redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useRouter } from 'next/navigation'
// import validateExplorerForm from '../components/forms/validations/validateExplorerForm'
import { useCreateExplorerMutation } from '../redux/services/userApi'
import { chapterId } from '../lib/constants/api/chapterId'
import { setTempApplication } from '../redux/features/appSlice'
import { showToast } from '../redux/features/toastSlice'

const chapters = [{ id: 'ch1', name: 'Modern', location: 'Lynn, MA', meetingDay: 'Thursday 7:00 AM' }]

const interests = [
  'Accounting',
  'Architecture',
  'Automotive',
  'Banking',
  'Construction',
  'Consulting',
  'Education',
  'Engineering',
  'Finance',
  'Healthcare',
  'Insurance',
  'Legal',
  'Marketing',
  'Real Estate',
  'Technology',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Transportation',
  'Non-Profit'
]

const Skipper = () => {
  const dispatch = useAppDispatch()
  const { handleInput } = createFormActions('explorerForm', dispatch)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { explorerForm } = useAppSelector((state: RootState) => state.form)
  const { push } = useRouter()
  const [createExplorer, { error }] = useCreateExplorerMutation() as any

  const handleInterestToggle = (interest: string) => {
    dispatch(
      setInputs({
        formName: 'explorerForm',
        data: {
          interests: explorerForm?.inputs?.interests.includes(interest)
            ? [...explorerForm?.inputs?.interests].filter((i: any) => i !== interest)
            : [...explorerForm?.inputs?.interests, interest]
        }
      })
    )
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    setIsSubmitting(true)

    const tempId = `EXP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`

    dispatch(
      setTempApplication({
        ...explorerForm.inputs,
        tempId,
        submittedDate: new Date().toLocaleDateString()
      })
    )
    push(`/explorer/basecamp?tempId=${tempId}`)

    // if (!validateExplorerForm(explorerForm.inputs, setErrors)) return

    try {
      const result = await createExplorer({ chapterId, tempId, ...explorerForm.inputs }).unwrap()
      const tempApp = { ...result.user, tempId: result.user.id }

      // Success - clear temp data and show success toast
      dispatch(setTempApplication(tempApp))
      dispatch(
        showToast({
          type: 'success',
          message: 'Application submitted successfully!',
          description: `Thank you for your interest, ${result.user?.name || explorerForm.inputs.firstName}!`
        })
      )
    } catch {
      // Error - redirect back to form and show error
      push(`/explorer`)

      // Extract error message safely
      const errorMessage = error?.data?.message || 'Something went wrong. Please try again.'

      dispatch(
        showToast({
          type: 'error',
          message: 'Submission failed',
          description: errorMessage
        })
      )

      // Keep temp data in Redux so user doesn't lose their work
      // Or clear it if you want them to start over:
      // dispatch(clearTempApplication())
    } finally {
      setIsSubmitting(false)
    }
  }

  const InputStyle =
    'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'

  return (
    <div className="min-h-screen py-12 bg-[#121212]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Skipper Application</h1>
          <p className="text-gray-400 text-lg">Join our premier business networking organization</p>
        </div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
        >
          <div className="p-8 space-y-10">
            {/* Personal Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-2 rounded-lg mr-4">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={explorerForm.inputs.name || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={explorerForm.inputs.email || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    name="location"
                    value={explorerForm.inputs.location || ''}
                    onChange={handleInput}
                    className={InputStyle}
                    placeholder="Lynn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={explorerForm.inputs.phone || ''}
                    onChange={handleInput}
                    className={InputStyle}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </section>

            {/* Business Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-green-600 p-2 rounded-lg mr-4">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Business Information</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={explorerForm.inputs.company || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profession/Industry <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={explorerForm.inputs.profession || ''}
                    onChange={handleInput}
                    required
                    className={InputStyle}
                    placeholder="e.g., Financial Advisor, Attorney"
                  />
                </div>
              </div>
            </section>

            {/* Chapter Selection */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 p-2 rounded-lg mr-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Modern Chapter</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Chapter</label>
                <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id} className="">
                      {chapter.name} - {chapter.location} ({chapter.meetingDay})
                    </option>
                  ))}
                </div>
              </div>
            </section>

            {/* Industry Classification */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-orange-600 p-2 rounded-lg mr-4">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Industry Classification</h2>
              </div>

              <p className="text-gray-400 mb-6">
                Select your primary industry category. Modern operates on the principle of one member per classification
                to ensure exclusive territory protection.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      explorerForm.inputs.interests.includes(interest)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </section>

            {/* Member Benefits */}
            <section className="bg-gray-750 rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                North Shore Chapter Benefits
              </h3>
              <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>New Chapter Launch:</strong> Join our founding members on Boston&apos;s North Shore! Many of
                  our charter members bring 20+ years of proven networking experience.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Weekly breakfast meetings (7:30 AM)</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Experienced networking professionals</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Prime North Shore territory</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Strong referral partnerships</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Exclusive industry classifications</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Founding member opportunities</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Local business community focus</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Proven networking methodology</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Application Notice */}
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-1">Application Review Process</h4>
                  <p className="text-yellow-200 text-sm">
                    Your application will be reviewed by chapter leadership within 2-3 business days. You&apos;ll be
                    contacted to schedule a visitor session before final approval.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-400">By submitting, you agree to Modern&apos;s terms and conditions</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:bg-blue-700 disabled:bg-blue-800 px-8 py-3 rounded-lg font-semibold text-white transition-colors inline-flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default Skipper
