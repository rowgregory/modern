import { User } from '@/types/user'
import React, { FC } from 'react'

const ProfileInfo: FC<{ user: User | null }> = ({ user }) => {
  return (
    <div className="pt-36 pb-6 text-center">
      <h1 className="text-3xl font-bold">{user?.name}</h1>
      {user?.website ? (
        <a
          href={user?.website?.startsWith('http') ? user.website : `https://${user.website}`}
          target="_blank"
          className="text-slate-400 mt-1"
        >
          {user?.company}
        </a>
      ) : (
        <div className="text-slate-400 mt-1"> {user?.company}</div>
      )}
      <p className="text-blue-400 text-sm mt-1">{user?.industry}</p>
    </div>
  )
}

export default ProfileInfo
