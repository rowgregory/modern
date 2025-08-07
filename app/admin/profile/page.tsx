'use client'

import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Camera,
  Save,
  X,
  Edit2,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  MapPin
} from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import { createFormActions, setInputs, setIsEditing, setIsNotEditing } from '@/app/redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { Switch } from '@/app/components/ui/Switch'
import { Input } from '@/app/components/ui/Input'
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/app/redux/services/memberApi'
import { showToast } from '@/app/redux/features/toastSlice'
import validateProfileForm from '@/app/lib/utils/validations/validateProfileForm'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { formatDateLong } from '@/app/lib/utils/date/formatDate'
import MemberStatusBadge from '@/app/components/member/MemberStatusBadge'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // delay between each child
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const { profileForm, isEditing } = useAppSelector((state: RootState) => state.form)
  const { handleInput, setErrors, handleToggle } = createFormActions('profileForm', dispatch)
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation()
  const [newInterest, setNewInterest] = useState('')
  const inputs = profileForm?.inputs
  const errors = profileForm?.errors
  const { data } = useGetMyProfileQuery({ chapterId, id: 'cmduzntqz000g8jw7vhhzj1zy' })

  useEffect(() => {
    if (data && dispatch) {
      dispatch(
        setInputs({
          formName: 'profileForm',
          data: {
            id: data?.data?.id,
            name: data?.data?.name || '',
            email: data?.data?.email || '',
            phone: data?.data?.phone || '',
            company: data?.data?.company || '',
            profession: data?.data?.profession || '',
            role: data?.data?.role || '',
            interests: data?.data?.interests || [],
            profileImage: data?.data?.profileImage || null,
            profileImageFilename: data?.data?.profileImageFilename || null,
            isPublic: data?.data?.isPublic ?? true,
            isActive: data?.data?.isActive ?? true,
            membershipStatus: data?.data?.membershipStatus || '',
            joinedAt: data?.data?.joinedAt || null,
            expiresAt: data?.data?.expiresAt || null,
            lastLoginAt: data?.data?.lastLoginAt || null,
            createdAt: data?.data?.createdAt || null,
            updatedAt: data?.data?.updatedAt || null,
            isProfileComplete: data?.data?.isProfileComplete ?? false,
            membershipDays: data?.data?.membershipDays || 0,
            isExpiringSoon: data?.data?.isExpiringSoon ?? false,
            chapter: {
              id: data?.data?.chapter?.id || '',
              name: data?.data?.chapter?.name || '',
              location: data?.data?.chapter?.location || ''
            },
            meta: {
              chapterId: data?.meta?.chapterId || '',
              lastUpdated: data?.meta?.lastUpdated || null,
              profileCompleteness: {
                isComplete: data?.meta?.profileCompleteness?.isComplete ?? false,
                missingFields: data?.meta?.profileCompleteness?.missingFields || []
              },
              membership: {
                status: data?.meta?.membership?.status || '',
                joinedDaysAgo: data?.meta?.membership?.joinedDaysAgo || 0,
                expiresAt: data?.meta?.membership?.expiresAt || null,
                isExpiringWithin30Days: data?.meta?.membership?.isExpiringWithin30Days ?? false
              }
            }
          }
        })
      )
    }
  }, [data, dispatch])

  const addInterest = () => {
    if (newInterest.trim() && !inputs.interests.includes(newInterest.trim())) {
      dispatch(
        setInputs({
          formName: 'profileForm',
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
        formName: 'profileForm',
        data: {
          interests: inputs.interests.filter((i: string) => i !== interest)
        }
      })
    )
  }

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or S3
      const imageUrl = URL.createObjectURL(file)
      dispatch(
        setInputs({
          formName: 'profileForm',
          data: {
            profileImage: imageUrl
          }
        })
      )
    }
  }

  const handleSubmit = async () => {
    try {
      if (!validateProfileForm(inputs, setErrors)) return

      await updateMyProfile({ chapterId, id: inputs.id, ...inputs }).unwrap()

      dispatch(
        showToast({
          type: 'success',
          message: 'Member Settings Updated',
          description: 'Your member profile settings have been successfully updated.'
        })
      )

      dispatch(setIsNotEditing())
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Update Failed',
          description: error.message || 'Unable to update member settings'
        })
      )
    }
  }

  return (
    <div className="bg-gray-900">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Configuration Card */}
        <div className="flex-1 p-6 overflow-y-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-6 px-8 py-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl flex items-center justify-center">
                  {inputs.profileImage ? (
                    <Picture
                      src={inputs.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-xl"
                      priority={false}
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 p-2 bg-violet-600 rounded-lg cursor-pointer hover:bg-violet-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{inputs.name}</h2>
                <p className="text-gray-400 text-sm">
                  {inputs.profession} at {inputs.company}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <MemberStatusBadge status={inputs.membershipStatus} isExpiring={inputs.isExpiringSoon} />
                  <span className="flex items-center space-x-1 text-xs text-violet-400">
                    {inputs.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{inputs.isPublic ? 'Public Profile' : 'Private Profile'}</span>
                  </span>
                  <span className="text-xs text-gray-400">Role: {inputs.role}</span>
                </div>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => dispatch(setIsEditing())}
                className="
                  flex items-center space-x-2 
                  text-violet-400 hover:text-violet-300
                  bg-violet-500/10 hover:bg-violet-500/20
                  border border-violet-500/20 hover:border-violet-500/30
                  px-4 py-2.5
                  rounded-lg 
                  font-medium text-sm
                  transition-all duration-200
                "
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="
                    flex items-center space-x-2 
                    bg-violet-600 hover:bg-violet-700
                    text-white font-medium
                    px-4 py-2.5
                    rounded-lg text-sm
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={() => dispatch(setIsNotEditing())}
                  className="
                    flex items-center space-x-2 
                    bg-gray-700 hover:bg-gray-600
                    text-gray-300 hover:text-white
                    px-4 py-2.5
                    rounded-lg text-sm
                    font-medium
                    transition-all duration-200
                  "
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
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
                  label="Profession"
                  icon={<Briefcase />}
                  name="profession"
                  value={inputs.profession}
                  onChange={handleInput}
                  disabled={!isEditing}
                  placeholder="Enter your profession"
                  error={errors.profession}
                />

                {/* Chapter Information (Read-only) */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 text-sm font-medium text-gray-300">
                    <div className="p-1.5 bg-violet-500/10 rounded-lg">
                      <MapPin className="w-4 h-4 text-violet-400" />
                    </div>
                    <span>Chapter</span>
                  </label>
                  <div className="w-full bg-gray-800/30 border border-gray-700/30 text-gray-400 rounded-xl px-4 py-3 text-sm">
                    {inputs.chapter.name} - {inputs.chapter.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white">Interests & Networking</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Your Interests</label>
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
                        className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1.5 rounded-lg text-sm"
                      >
                        <span>{interest}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeInterest(interest)}
                            className="text-violet-400 hover:text-violet-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </motion.span>
                    ))}
                  </motion.div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                        placeholder="Add new interest"
                        className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                      />
                      <button
                        onClick={addInterest}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
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
                      <p className="text-xs text-gray-400 mt-1">
                        Your profile is complete and visible to other members.
                      </p>
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
                  <span className="text-white ml-2">
                    {inputs.lastLoginAt ? formatDateLong(inputs.lastLoginAt) : 'Never'}
                  </span>
                </div>
              </div>

              {inputs.isExpiringSoon && (
                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-300 text-sm font-medium">Membership Expiring Soon</span>
                  </div>
                  <p className="text-orange-200 text-xs mt-1">
                    Your membership expires on {formatDateLong(inputs.expiresAt)}. Please renew to continue accessing
                    member benefits.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
