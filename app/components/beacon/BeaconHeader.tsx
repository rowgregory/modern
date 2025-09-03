import { Camera, User, Eye, EyeOff } from 'lucide-react'
import Picture from '../common/Picture'
import MemberStatusBadge from '../member/MemberStatusBadge'
import { useAppDispatch } from '@/app/redux/store'
import { setInputs } from '@/app/redux/features/formSlice'

interface BeaconHeaderProps {
  inputs: {
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

const BeaconHeader = ({ inputs, isEditing }: BeaconHeaderProps) => {
  const dispatch = useAppDispatch()
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

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl flex items-center justify-center">
          {inputs.profileImage ? (
            <Picture
              src={inputs.profileImage}
              alt="Beacon"
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
          {inputs.industry} at {inputs.company}
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <MemberStatusBadge status={inputs.membershipStatus} isExpiring={inputs.isExpiringSoon} />
          <span className="flex items-center space-x-1 text-xs text-violet-400">
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
