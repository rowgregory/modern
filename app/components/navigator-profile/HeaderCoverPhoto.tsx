import React, { FC } from 'react'
import Picture from '../common/Picture'
import { User } from '@/types/user'

const HeaderCoverPhoto: FC<{ user: User | null }> = ({ user }) => {
  return (
    <div className="relative h-80 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
      {user?.coverImage && (
        <Picture priority={true} src={user?.coverImage || ''} alt="Cover" className="w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Profile Picture */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-60 h-60 rounded-full border-4 border-white overflow-hidden bg-white">
          <Picture
            priority={true}
            src={user?.profileImage || ''}
            alt="James Spiegel"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default HeaderCoverPhoto
