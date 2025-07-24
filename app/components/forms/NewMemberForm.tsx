'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, User, Building, MapPin, Globe } from 'lucide-react'

const NewMemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    profession: '',
    chapterId: '',
    interests: [] as string[],
    profileImage: '',
    isPublic: true
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // API call would go here
      console.log('Form submitted:', formData)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Sample chapters - in real app, this would come from your database
  const chapters = [{ id: 'ch1', name: 'Modern', location: 'Lynn, MA', meetingDay: 'Thursday 7:00 AM' }]

  // Professional interests/industries for BNI
  const interests = [
    'Accounting',
    'Advertising',
    'Architecture',
    'Attorney/Legal',
    'Auto Services',
    'Banking/Finance',
    'Chiropractor',
    'Cleaning Services',
    'Computer Services',
    'Construction',
    'Consulting',
    'Dentistry',
    'Financial Planning',
    'Graphic Design',
    'Health & Wellness',
    'Insurance',
    'Interior Design',
    'Marketing',
    'Mortgage Services',
    'Photography',
    'Printing',
    'Real Estate',
    'Restaurant/Catering',
    'Travel Services'
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Form Section */}
      <div className="relative z-10 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-purple-400" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-blue-400" />
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profession/Industry *</label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="e.g., Real Estate Agent, Financial Advisor"
                    />
                  </div>
                </div>
              </div>

              {/* Chapter Selection */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-green-400" />
                  Chapter Selection
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your BNI Chapter</label>
                  <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    {chapters.map((chapter) => (
                      <option key={chapter.id} value={chapter.id} className="">
                        {chapter.name} - {chapter.location} ({chapter.meetingDay})
                      </option>
                    ))}
                  </div>
                </div>
              </div>

              {/* Industry Selection */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-yellow-400" />
                  Industry Classification
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Select your primary industry category for BNI classification:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Modern operates on the principle of one member per industry classification to ensure exclusive
                  territory protection.
                </p>
              </div>
              {/* Networking Information */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">What to Expect as a Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span>Regular networking meetings</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>Quality referral exchanges</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span>Face-to-face meetings of any kind</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>Local business community access</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span>Professional development opportunities</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>Measurable business growth</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Status */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                    <span className="text-xs text-black font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-1">Application Review Process</h4>
                    <p className="text-yellow-200 text-sm">
                      Your membership status will be set to &quot;PENDING&quot; upon submission. Chapter leadership will
                      review your application and contact you within 2-3 business days to schedule a visitor day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing Application...
                    </>
                  ) : (
                    <>
                      Submit Modern Application <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-gray-400 mt-4">
                  By submitting this application, you agree to Modern&apos;s terms and conditions
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NewMemberForm
