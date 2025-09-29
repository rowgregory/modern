'use client'

import { showToast } from '@/app/redux/features/toastSlice'
import { setUser } from '@/app/redux/features/userSlice'
import { useAppDispatch } from '@/app/redux/store'
import { useEffect, useState } from 'react'

interface INavigatorClientLayout {
  initialData: any
  error: any
  children: React.ReactNode
}

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-slate-900 text-white">
    {/* Header Cover Photo Skeleton */}
    <div className="relative h-80 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Profile Picture Skeleton */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-60 h-60 rounded-full border-4 border-white overflow-hidden bg-slate-600 animate-pulse"></div>
      </div>
    </div>

    {/* Profile Info Skeleton */}
    <div className="pt-36 pb-6 text-center">
      <div className="h-9 bg-slate-700 rounded w-64 mx-auto mb-2 animate-pulse"></div>
      <div className="h-5 bg-slate-700 rounded w-48 mx-auto mt-3 animate-pulse"></div>
      <div className="h-4 bg-slate-700 rounded w-32 mx-auto mt-2 animate-pulse"></div>
    </div>
  </div>
)

export default function NavigatorClientLayout({ initialData, error, children }: Readonly<INavigatorClientLayout>) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (error) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Failed to load navigator data',
          description: error.message
        })
      )
      setIsLoading(false)
    } else if (initialData) {
      dispatch(setUser(initialData.user))
      setIsLoading(false)
    }
  }, [dispatch, initialData, error])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return <>{children}</>
}
