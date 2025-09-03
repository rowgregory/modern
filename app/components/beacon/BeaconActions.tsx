import { chapterId } from '@/app/lib/constants/api/chapterId'
import validateProfileForm from '@/app/lib/utils/validations/validateProfileForm'
import { setIsNotEditing } from '@/app/redux/features/formSlice'
import { showToast } from '@/app/redux/features/toastSlice'
import { useUpdateMyProfileMutation } from '@/app/redux/services/userApi'
import { useAppDispatch } from '@/app/redux/store'
import { Edit2, Save, X } from 'lucide-react'

interface BeaconActionsProps {
  isEditing: boolean
  onEditClick: () => void
  onCancelClick: () => void
  inputs: any
  setErrors: any
}

const BeaconActions = ({ isEditing, onEditClick, onCancelClick, inputs, setErrors }: BeaconActionsProps) => {
  const dispatch = useAppDispatch()
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation()
  const handleSubmit = async () => {
    try {
      if (!validateProfileForm(inputs, setErrors)) return

      await updateMyProfile({ chapterId, userId: inputs.id, ...inputs }).unwrap()

      dispatch(
        showToast({
          type: 'success',
          message: 'Navigaor Updated',
          description: 'Your navigator profile settings have been successfully updated.'
        })
      )

      dispatch(setIsNotEditing())
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Update Failed',
          description: error.message || 'Unable to update navigator settings'
        })
      )
    }
  }

  return (
    <>
      {!isEditing ? (
        <button
          onClick={onEditClick}
          className="flex items-center space-x-2 text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/30 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Beacon</span>
        </button>
      ) : (
        <div className="flex space-x-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
          <button
            onClick={onCancelClick}
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
    </>
  )
}

export default BeaconActions
