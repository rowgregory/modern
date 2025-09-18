import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Backdrop from '../common/Backdrop'
import Drawer from '../common/Drawer'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useAnchorSelector, useAppDispatch, useFormSelector } from '@/app/redux/store'
import { setCloseAnchorDrawer } from '@/app/redux/features/anchorSlice'
import { useCreateAnchorMutation, useUpdateAnchorMutation } from '@/app/redux/services/anchorApi'
import { clearInputs, createFormActions } from '@/app/redux/features/formSlice'
import AnchorForm from '../forms/AnchorForm'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { showToast } from '@/app/redux/features/toastSlice'

// Validation
const validateForm = (inputs: any, setErrors: any) => {
  const newErrors = {} as any

  if (!inputs?.receiverId) newErrors.receiverId = 'Choose who gave ye the treasure map'
  if (!inputs?.businessValue || parseFloat(inputs?.businessValue) <= 0) {
    newErrors.businessValue = 'Please enter a valid business value'
  }
  if (!inputs?.description?.trim()) newErrors.description = 'Please describe the business that was closed'
  if (!inputs?.closedDate) newErrors.closedDate = 'Please select when the business was closed'

  // Check that giver and receiver are different
  if (inputs?.giverId && inputs?.receiverId && inputs?.giverId === inputs?.receiverId) {
    newErrors.receiverId = 'Giver and receiver must be different people'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const AnchorDrawer = () => {
  const session = useSession()
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(setCloseAnchorDrawer())
  const { anchorDrawer } = useAnchorSelector()
  const { anchorForm } = useFormSelector()
  const inputs = anchorForm?.inputs
  const errors = anchorForm?.errors
  const [createAnchor, { isLoading: isCreating }] = useCreateAnchorMutation()
  const [updateAnchor, { isLoading: isUpdating }] = useUpdateAnchorMutation()
  const isLoading = isCreating || isUpdating
  const user = session?.data?.user

  const { handleInput, setErrors } = createFormActions('anchorForm', dispatch)

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateForm(anchorForm?.inputs, setErrors)) return

    try {
      // Prepare data for submission
      const submitData = {
        ...anchorForm?.inputs,
        businessValue: parseFloat(anchorForm?.inputs.businessValue),
        closedDate: new Date(anchorForm?.inputs.closedDate).toISOString(),
        chapterId,
        userId: user?.id
      }

      if (inputs?.isUpdating) {
        await updateAnchor({ ...submitData, anchorId: anchorForm?.inputs?.id }).unwrap()
      } else {
        await createAnchor(submitData).unwrap()
      }

      onClose()

      dispatch(clearInputs({ formName: 'anchorForm' }))

      dispatch(
        showToast({
          type: 'success',
          message: `${inputs?.isUpdating ? 'Update' : 'Create'} Anchor Success`,
          description: `Anchor ${inputs?.isUpdating ? 'updated' : 'created'} successfully.`
        })
      )
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: `${inputs?.isUpdating ? 'Update' : 'Create'} Anchor Failed`,
          description: error.message || 'Unable to process request.'
        })
      )
    }
  }

  return (
    <AnimatePresence>
      {anchorDrawer && (
        <>
          {/* Backdrop Overlay */}
          <Backdrop onClose={onClose} />

          {/* Drawer */}
          <Drawer>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Drop Anchor
                </h2>
                <p className="text-sm text-gray-500 mt-1">Thank a fellow navigator for their successful treasure map</p>
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

            <AnchorForm
              inputs={inputs}
              errors={errors}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              user={user}
              isUpdating={inputs?.isUpdating}
            />
          </Drawer>
        </>
      )}
    </AnimatePresence>
  )
}

export default AnchorDrawer
