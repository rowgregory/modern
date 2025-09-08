import { Camera, User, Eye, EyeOff } from 'lucide-react'
import Picture from '../common/Picture'
import MemberStatusBadge from '../member/MemberStatusBadge'
import { useAppDispatch } from '@/app/redux/store'
import { setInputs } from '@/app/redux/features/formSlice'
import { FC } from 'react'

interface IBeaconHeader {
  inputs: {
    fileToDisplay: string
    fileToUpload: string
    name: string
    industry: string
    company: string
    profileImage?: string
    membershipStatus: string
    isExpiringSoon: boolean
    isPublic: boolean
    role: string
  }
  isEditing: boolean
}

const BeaconHeader: FC<IBeaconHeader> = ({ inputs, isEditing }) => {
  const dispatch = useAppDispatch()
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      dispatch(
        setInputs({
          formName: 'beaconForm',
          data: {
            fileToDisplay: imageUrl,
            fileToUpload: file,
            fileToUploadType: file.type
          }
        })
      )
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
          {inputs?.fileToDisplay || inputs?.profileImage ? (
            <Picture
              src={inputs?.fileToDisplay || inputs?.profileImage || ''}
              alt="Beacon"
              className="w-full h-full object-cover rounded-xl"
              priority={false}
            />
          ) : (
            <User className="w-8 h-8 text-white" />
          )}
        </div>
        {isEditing && (
          <label className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-bl from-blue-600 via-cyan-600 to-teal-600  rounded-lg cursor-pointer hover:from-cyan-700 hover:via-teal-700 hover:to-blue-700 transition-colors shadow-2xl">
            <Camera className="w-4 h-4 text-white" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{inputs.name}</h2>
        <p className="text-gray-400 text-sm">
          {inputs.industry} at {inputs.company}
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <MemberStatusBadge status={inputs.membershipStatus} isExpiring={inputs.isExpiringSoon} />
          <span className="flex items-center space-x-1 text-xs text-teal-400">
            {inputs.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{inputs.isPublic ? 'Public Beacon' : 'Private Beacon'}</span>
          </span>
          <span className="text-xs text-gray-400">Role: {inputs.role}</span>
        </div>
      </div>
    </div>
  )
}

export default BeaconHeader
