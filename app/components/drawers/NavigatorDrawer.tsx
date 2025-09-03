import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { clearInputs, createFormActions } from '@/app/redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setCloseAddUserDrawer } from '@/app/redux/features/userSlice'
import { useCreateUserMutation, useUpdateUserMutation } from '@/app/redux/services/userApi'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import { showToast } from '@/app/redux/features/toastSlice'
import NavigatorForm from '../forms/NavigatorForm'
import Backdrop from '../common/Backdrop'
import Drawer from '../common/Drawer'
import validateNavigatorForm from '../forms/validations/validateNavigatorForm'

const NavigatorDrawer = () => {
  const dispatch = useAppDispatch()
  const { handleInput, setErrors, handleToggle } = createFormActions('navigatorForm', dispatch)
  const { navigatorForm } = useAppSelector((state: RootState) => state.form)
  const { addUserDrawer } = useAppSelector((state: RootState) => state.user)
  const onClose = () => dispatch(setCloseAddUserDrawer())
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const inputs = navigatorForm.inputs
  const errors = navigatorForm.errors
  const isLoading = isCreating || isUpdating
  const isUpdateMode = navigatorForm?.inputs?.isUpdating

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateNavigatorForm(inputs, setErrors)) return

    try {
      const memberData = {
        ...inputs,
        chapterId,
        joinedAt: inputs?.joinedAt,
        expiresAt: inputs?.expiresAt
      }

      if (navigatorForm?.inputs?.isUpdating) {
        await updateUser({ userId: navigatorForm?.inputs?.id, ...memberData }).unwrap()
      } else {
        await createUser(memberData).unwrap()
      }

      dispatch(clearInputs({ formName: 'navigatorForm' }))
      onClose()

      dispatch(
        showToast({
          type: 'success',
          message: navigatorForm?.inputs?.isUpdating ? 'Member updated' : 'New Member Added',
          description: `${memberData.name} ${navigatorForm?.inputs?.isUpdating ? 'has been updated!' : 'is now part of the team!'}`
        })
      )
    } catch {
      dispatch(
        showToast({
          type: 'error',
          message: `Error ${navigatorForm?.inputs?.isUpdating ? 'updating' : 'adding'} member`,
          description: `There was an error ${navigatorForm?.inputs?.isUpdating ? 'updating' : 'creating'} ${navigatorForm?.inputs?.name}`
        })
      )
    } finally {
      dispatch(clearInputs({ formName: 'navigatorForm' }))
    }
  }

  return (
    <AnimatePresence>
      {addUserDrawer && (
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
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  {navigatorForm?.inputs?.isUpdating ? 'Update Navigator' : 'Add New Navigator'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Create a new navigator profile</p>
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
            <NavigatorForm
              errors={errors}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              handleToggle={handleToggle}
              inputs={inputs}
              isLoading={isLoading}
              isUpdating={isUpdateMode}
              onClose={onClose}
            />
          </Drawer>
        </>
      )}
    </AnimatePresence>
  )
}

export default NavigatorDrawer
