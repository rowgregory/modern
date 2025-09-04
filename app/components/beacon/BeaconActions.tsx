import { chapterId } from '@/app/lib/constants/api/chapterId'
import uploadFileToFirebase from '@/app/lib/utils/firebase/uploadFileToFirebase'
import validateProfileForm from '@/app/lib/utils/validations/validateProfileForm'
import { setIsNotEditing } from '@/app/redux/features/formSlice'
import { showToast } from '@/app/redux/features/toastSlice'
import { useUpdateMyProfileMutation } from '@/app/redux/services/userApi'
import { useAppDispatch } from '@/app/redux/store'
import { Edit2, Save, X } from 'lucide-react'
import { FC, useState } from 'react'

interface BeaconActionsProps {
  isEditing: boolean
  onEditClick: () => void
  onCancelClick: () => void
  inputs: any
  setErrors: any
  handleUploadProgress: (progress: number) => void
}

const BeaconActions: FC<BeaconActionsProps> = ({
  isEditing,
  onEditClick,
  onCancelClick,
  inputs,
  setErrors,
  handleUploadProgress
}) => {
  const dispatch = useAppDispatch()
  const [updateMyProfile] = useUpdateMyProfileMutation()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      if (!validateProfileForm(inputs, setErrors)) return
      setIsLoading(true)

      let filePath = null
      let fileName = null
      let mimeType: 'image' | 'video' | undefined = undefined

      if (inputs?.fileToUpload) {
        if (inputs?.fileToUploadType.includes('image')) {
          mimeType = 'image'
        } else {
          mimeType = 'video'
        }

        filePath = await uploadFileToFirebase(inputs.fileToUpload, handleUploadProgress, mimeType)

        fileName = inputs.fileToUpload.name
      }

      await updateMyProfile({
        chapterId,
        userId: inputs.id,
        ...inputs,
        profileImage: filePath ?? inputs?.profileImage,
        profileImageFilename: fileName ?? inputs?.profileImageFilename
      }).unwrap()

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isEditing ? (
        <button
          onClick={onEditClick}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/30 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Beacon</span>
        </button>
      ) : (
        <div className="flex space-x-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
          <button
            onClick={onCancelClick}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
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
