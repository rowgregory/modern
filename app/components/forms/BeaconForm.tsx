import React, { FC, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  MapPin,
  FileText,
  Calendar,
  Globe,
  Layers
} from 'lucide-react'
import { setInputs } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import { Switch } from '@/app/components/ui/Switch'
import { Input } from '@/app/components/ui/Input'
import { formatDateLong } from '@/app/lib/utils/date/formatDate'
import MemberStatusBadge from '@/app/components/member/MemberStatusBadge'
import { motion } from 'framer-motion'
import { Textarea } from '@/app/components/ui/TextArea'
import { containerVariants, itemVariants } from '@/app/lib/constants/motion'
import { IBeaconForm } from '@/types/forms'

const PREDEFINED_INTERESTS = [
  'Real Estate',
  'Technology',
  'Healthcare',
  'Finance',
  'Marketing',
  'Sales',
  'Construction',
  'Legal Services',
  'Accounting',
  'Insurance',
  'Consulting',
  'Education',
  'Retail',
  'Manufacturing',
  'Transportation',
  'Food & Beverage',
  'Photography',
  'Design',
  'Entertainment',
  'Sports & Fitness',
  'Travel',
  'Non-Profit',
  'Government',
  'Agriculture',
  'Energy',
  'Telecommunications',
  'Media',
  'Banking',
  'Investment',
  'Human Resources',
  'Project Management',
  'Data Analytics',
  'Cybersecurity',
  'Software Development',
  'Digital Marketing'
]

const BeaconForm: FC<IBeaconForm> = ({ inputs, errors, handleInput, isEditing, handleToggle }) => {
  const [newInterest, setNewInterest] = useState('')
  const dispatch = useAppDispatch()

  const addInterest = () => {
    if (newInterest.trim() && !inputs.interests.includes(newInterest.trim())) {
      dispatch(
        setInputs({
          formName: 'beaconForm',
          data: {
            interests: [...inputs.interests, newInterest.trim()]
          }
        })
      )
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    dispatch(
      setInputs({
        formName: 'beaconForm',
        data: {
          interests: inputs.interests.filter((i: string) => i !== interest)
        }
      })
    )
  }
  return (
    <div className="p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Chapter</h3>
        {/* Chapter Information (Read-only) */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3 text-sm font-medium text-gray-300">
            <div className="p-1.5 bg-cyan-500/10 rounded-lg">
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <span>Chapter</span>
          </label>
          <div className="w-full bg-gray-800/30 border border-gray-700/30 text-gray-400 rounded-xl px-4 py-3 text-sm">
            {inputs.chapter.name} - {inputs.chapter.location}
          </div>
        </div>
      </div>
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

          <Input
            label="Full Name"
            icon={<User />}
            name="name"
            value={inputs.name}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Input
            label="Email Address"
            icon={<Mail />}
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="Enter your email"
            error={errors.email}
          />

          <Input
            label="Phone Number"
            icon={<Phone />}
            type="tel"
            name="phone"
            value={inputs.phone}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="+1 (555) 123-4567"
            error={errors.phone}
          />

          <Input
            label="Website"
            icon={<Globe />}
            type="url"
            name="website"
            value={inputs.website}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="e.g., https://sqysh.io"
            error={errors.website}
          />
        </div>

        {/* Professional Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>

          <Input
            label="Company"
            icon={<Building />}
            name="company"
            value={inputs.company}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="Enter your company"
            error={errors.company}
          />

          <Input
            label="Industry"
            icon={<Briefcase />}
            name="industry"
            value={inputs.industry}
            onChange={handleInput}
            disabled={true}
            placeholder="Enter your industry"
            error={errors.industry}
          />

          <Input
            label="Years in Business"
            icon={<Calendar />}
            name="yearsInBusiness"
            value={inputs.yearsInBusiness}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="e.g., 5 years"
            error={errors.yearsInBusiness}
          />
          <Input
            label="Business License Number"
            icon={<Layers />}
            name="businessLicenseNumber"
            value={inputs.businessLicenseNumber}
            onChange={handleInput}
            disabled={!isEditing}
            placeholder="e.g., BL-2025-1847392"
            error={errors.businessLicenseNumber}
          />
        </div>
      </div>

      {/* Bio Section - Full Width */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-white">About You</h3>
        <Textarea
          label="Professional Bio"
          icon={<FileText />}
          name="bio"
          value={inputs.bio}
          onChange={handleInput}
          disabled={!isEditing}
          placeholder="Tell us about yourself, your experience, and what you're looking to achieve..."
          rows={4}
          maxLength={500}
          error={errors.bio}
        />
      </div>

      {/* Interests Section */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-white">Interests & Networking</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Your Interests</label>

            {/* Current Interests */}
            <motion.div
              className="flex flex-wrap gap-2 mb-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {inputs.interests.map((interest: any, index: number) => (
                <motion.span
                  key={index}
                  variants={itemVariants}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-lg text-sm"
                >
                  <span>{interest}</span>
                  {isEditing && (
                    <button onClick={() => removeInterest(interest)} className="text-cyan-400 hover:text-cyan-300">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </motion.span>
              ))}
            </motion.div>

            {isEditing && (
              <>
                {/* Predefined Interests */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Quick Add (click to add):</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {PREDEFINED_INTERESTS.filter((interest) => !inputs.interests.includes(interest)).map((interest) => (
                      <button
                        key={interest}
                        onClick={() => {
                          // Add the predefined interest
                          const updatedInterests = [...inputs.interests, interest]
                          dispatch(setInputs({ formName: 'beaconForm', data: { interests: updatedInterests } }))
                        }}
                        className="inline-flex items-center space-x-1 bg-gray-700/30 hover:bg-cyan-500/20 border border-gray-600/50 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-300 px-2 py-1 rounded text-xs transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{interest}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Interest Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                    placeholder="Add custom interest"
                    className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  />
                  <button
                    onClick={addInterest}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="mt-8 p-6 bg-gray-800/20 rounded-xl border border-gray-700/30">
        <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <Switch
            name="isPublic"
            label="Make profile public"
            checked={inputs.isPublic}
            onChange={handleToggle}
            disabled={!isEditing}
          />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Public profiles are visible to other chapter members and can be found in networking searches.
        </p>
      </div>

      {/* Profile Completeness Status */}
      {inputs.meta.profileCompleteness && (
        <div
          className={`mt-8 p-6 rounded-xl border ${
            inputs.meta.profileCompleteness.isComplete
              ? 'bg-green-500/5 border-green-500/20'
              : 'bg-orange-500/5 border-orange-500/20'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-lg ${
                inputs.meta.profileCompleteness.isComplete ? 'bg-green-500/10' : 'bg-orange-500/10'
              }`}
            >
              {inputs.meta.profileCompleteness.isComplete ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-400" />
              )}
            </div>
            <div>
              <h3
                className={`text-sm font-semibold ${
                  inputs.meta.profileCompleteness.isComplete ? 'text-green-300' : 'text-orange-300'
                }`}
              >
                Profile {inputs.meta.profileCompleteness.isComplete ? 'Complete' : 'Incomplete'}
              </h3>
              {inputs.meta.profileCompleteness.isComplete ? (
                <p className="text-xs text-gray-400 mt-1">Your profile is complete and visible to other members.</p>
              ) : (
                <div className="mt-1">
                  <p className="text-xs text-gray-400">
                    Complete these fields: {inputs.meta.profileCompleteness.missingFields.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Membership Information */}
      <div className="mt-8 p-6 bg-blue-500/5 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-semibold text-blue-300 mb-4">Membership Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Member Since:</span>
            <span className="text-white ml-2">{formatDateLong(inputs.joinedAt)}</span>
          </div>
          <div>
            <span className="text-gray-400">Membership Status:</span>
            <span className="ml-2">
              <MemberStatusBadge status={inputs.membershipStatus} isExpiring={inputs.isExpiringSoon} />
            </span>
          </div>
          <div>
            <span className="text-gray-400">Chapter:</span>
            <span className="text-white ml-2">{inputs.chapter.name}</span>
          </div>
          <div>
            <span className="text-gray-400">Days as Member:</span>
            <span className="text-white ml-2">{inputs.membershipDays} days</span>
          </div>
          <div>
            <span className="text-gray-400">Renewal Date:</span>
            <span className="text-white ml-2">{formatDateLong(inputs.expiresAt)}</span>
          </div>
          <div>
            <span className="text-gray-400">Last Login:</span>
            <span className="text-white ml-2">{inputs.lastLoginAt ? formatDateLong(inputs.lastLoginAt) : 'Never'}</span>
          </div>
        </div>

        {inputs.isExpiringSoon && (
          <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">Membership Expiring Soon</span>
            </div>
            <p className="text-orange-200 text-xs mt-1">
              Your membership expires on {formatDateLong(inputs.expiresAt)}. Please renew to continue accessing member
              benefits.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BeaconForm
