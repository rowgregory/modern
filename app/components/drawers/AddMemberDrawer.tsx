import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Briefcase, Shield, CheckCircle, Mail, Phone, Building, Calendar, Trash2 } from 'lucide-react'
import { clearInputs, createFormActions, setInputs } from '@/app/redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setCloseAddUserDrawer } from '@/app/redux/features/userSlice'
import { useCreateUserMutation, useUpdateUserMutation } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import professionsList from '@/app/lib/constants/member/professionsList'
import membershipStatusOptions from '@/app/lib/constants/member/membershipStatusOptions'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import commonInterests from '@/app/lib/constants/member/commonInterestsList'
import { Switch } from '../ui/Switch'
import { ProfileImageUpload } from '../ui/ProfileImageUpload'
import { showToast } from '@/app/redux/features/toastSlice'

const drawerVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: '0%',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40
    }
  }
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
}

const validateForm = (inputs: any, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name.trim()) newErrors.name = 'Name is required'
  if (!inputs?.email.trim()) newErrors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(inputs?.email)) newErrors.email = 'Please enter a valid email'
  if (!inputs?.company.trim()) newErrors.company = 'Company is required'
  if (!inputs?.profession.trim()) newErrors.profession = 'Profession is required'
  if (!inputs?.joinedAt) newErrors.joinedAt = 'Join date is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const AddMemberDrawer = () => {
  const dispatch = useAppDispatch()
  const { handleInput, setErrors, handleToggle } = createFormActions('memberForm', dispatch)
  const { memberForm } = useAppSelector((state: RootState) => state.form)
  const { addUserDrawer } = useAppSelector((state: RootState) => state.user)
  const onClose = () => dispatch(setCloseAddUserDrawer())
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const inputs = memberForm.inputs
  const errors = memberForm.errors
  const isLoading = isCreating || isUpdating

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateForm(inputs, setErrors)) return

    try {
      const memberData = {
        ...inputs,
        chapterId,
        joinedAt: inputs?.joinedAt,
        expiresAt: inputs?.expiresAt
      }

      if (memberForm?.inputs?.isUpdating) {
        await updateUser({ userId: memberForm?.inputs?.id, ...memberData }).unwrap()
      } else {
        await createUser(memberData).unwrap()
      }

      dispatch(clearInputs({ formName: 'memberForm' }))
      dispatch(setCloseAddUserDrawer())

      dispatch(
        showToast({
          type: 'success',
          message: memberForm?.inputs?.isUpdating ? 'Member updated' : 'New Member Added',
          description: `${memberData.name} ${memberForm?.inputs?.isUpdating ? 'has been updated!' : 'is now part of the team!'}`
        })
      )
    } catch {
      dispatch(
        showToast({
          type: 'error',
          message: `Error ${memberForm?.inputs?.isUpdating ? 'updating' : 'adding'} member`,
          description: `There was an error ${memberForm?.inputs?.isUpdating ? 'updating' : 'creating'} ${memberForm?.inputs?.name}`
        })
      )
    }
  }

  const removeInterest = (interestToRemove: string) => {
    const updatedInterests = (inputs.interests || []).filter((interest: string) => interest !== interestToRemove)
    dispatch(setInputs({ formName: 'memberForm', data: { interests: updatedInterests } }))
  }

  const addCommonInterest = (interest: string) => {
    if (!(inputs.interests || []).includes(interest)) {
      const updatedInterests = [...(inputs.interests || []), interest]
      dispatch(setInputs({ formName: 'memberForm', data: { interests: updatedInterests } }))
    }
  }

  return (
    <AnimatePresence>
      {addUserDrawer && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50 flex flex-col shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(26, 26, 26, 0.98)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {memberForm?.inputs?.isUpdating ? 'Update member' : 'Add New Member to Lynnfluence'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Create a new member profile for Lynnfluence Chapter</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto">
              <form id="memberForm" onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <User className="w-5 h-5 text-violet-400" />
                    <span>Basic Information</span>
                  </h3>

                  {/* Name */}
                  <Input
                    name="name"
                    label="Full Name"
                    value={inputs.name || ''}
                    onChange={handleInput}
                    placeholder="Enter member's full name"
                    icon={<User className="w-5 h-5" />}
                    error={errors.name}
                    isRequired
                  />

                  {/* Email */}
                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    value={inputs.email || ''}
                    onChange={handleInput}
                    placeholder="member@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.email}
                    isRequired
                  />

                  {/* Phone */}
                  <Input
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={inputs.phone || ''}
                    onChange={handleInput}
                    placeholder="(555) 123-4567"
                    icon={<Phone className="w-5 h-5" />}
                    helperText="Optional"
                  />

                  {/* Company */}
                  <Input
                    name="company"
                    label="Company"
                    value={inputs.company || ''}
                    onChange={handleInput}
                    placeholder="Company name"
                    icon={<Building className="w-5 h-5" />}
                    error={errors.company}
                    isRequired
                  />

                  {/* Profession */}
                  <Select
                    name="profession"
                    label="Profession"
                    value={inputs.profession || ''}
                    onChange={handleInput}
                    options={professionsList.map((profession) => ({ value: profession, label: profession }))}
                    placeholder="Select profession..."
                    icon={<Briefcase className="w-5 h-5" />}
                    error={errors.profession}
                    isRequired
                  />
                </motion.div>

                {/* Membership Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-violet-400" />
                    <span>Membership Details</span>
                  </h3>

                  {/* Chapter Assignment Display */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <label className="block text-sm font-medium text-cyan-300 mb-3">Assigning to Chapter</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">L</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">Lynnfluence Chapter</h3>
                        <p className="text-sm text-cyan-300">This member will be added to Lynnfluence</p>
                        <p className="text-xs text-gray-400 mt-1">Lynn, MA • Weekly Meetings</p>
                      </div>
                    </div>
                  </div>

                  {/* Membership Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Membership Status</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {membershipStatusOptions.map((status) => (
                        <motion.label
                          key={status.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
                            inputs.membershipStatus === status.value
                              ? 'border-violet-500 bg-violet-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="membershipStatus"
                            value={status.value}
                            checked={inputs.membershipStatus === status.value}
                            onChange={() => {
                              // Explicitly pass the status value instead of the event's checked state
                              handleToggle({
                                target: {
                                  name: 'membershipStatus',
                                  checked: status.value
                                }
                              })
                            }}
                            className="sr-only"
                          />
                          <div
                            className={`font-medium text-sm ${
                              inputs.membershipStatus === status.value ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {status.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{status.description}</div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Join and Expiration Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="joinedAt"
                      type="date"
                      label="Join Date"
                      value={inputs.joinedAt || ''}
                      onChange={handleInput}
                      icon={<Calendar className="w-5 h-5" />}
                      error={errors.joinedAt}
                      isRequired
                    />

                    <Input
                      name="expiresAt"
                      type="date"
                      label="Expires At"
                      value={inputs.expiresAt || ''}
                      onChange={handleInput}
                      icon={<Calendar className="w-5 h-5" />}
                    />
                  </div>
                </motion.div>

                {/* Profile & Networking */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-violet-400" />
                    <span>Profile & Networking</span>
                  </h3>

                  {/* Profile Image */}
                  <ProfileImageUpload
                    label="Profile Image"
                    helperText="PNG or JPEG, max 5MB"
                    isRequired={false}
                    value={inputs.profileImage}
                    onChange={(imageData: any) => {
                      dispatch(
                        setInputs({
                          formName: 'memberForm',
                          data: { profileImage: imageData }
                        })
                      )
                    }}
                    error={errors.profileImage}
                  />

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Professional Interests</label>

                    {/* Common Interests */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2">Quick add:</p>
                      <div className="flex flex-wrap gap-2">
                        {commonInterests.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => addCommonInterest(interest)}
                            disabled={(inputs.interests || []).includes(interest)}
                            className={`px-2 py-1 text-xs rounded-lg transition-all ${
                              (inputs.interests || []).includes(interest)
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Interests */}
                    {(inputs.interests || []).length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">Selected interests:</p>
                        <div className="flex flex-wrap gap-2">
                          {(inputs.interests || []).map((interest: any) => (
                            <span
                              key={interest}
                              className="inline-flex items-center space-x-1 px-3 py-1 bg-violet-600/20 text-violet-300 border border-violet-600/30 rounded-lg text-sm"
                            >
                              <span>{interest}</span>
                              <button
                                type="button"
                                onClick={() => removeInterest(interest)}
                                className="text-violet-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Privacy Settings */}
                  <Switch
                    name="isPublic"
                    checked={inputs.isPublic ?? true}
                    onChange={handleToggle}
                    label="Public Profile"
                  />
                </motion.div>
              </form>
            </div>

            {/* Footer */}
            <motion.div
              className="p-6 border-t border-gray-700/50 bg-gray-900/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  form="memberForm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>{memberForm?.inputs?.isUpdating ? 'Updating' : 'Adding'} Member...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>{memberForm?.inputs?.isUpdating ? 'Update' : 'Add'} Member</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddMemberDrawer
