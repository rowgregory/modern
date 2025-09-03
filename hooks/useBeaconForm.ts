import { setInputs } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import { useEffect } from 'react'

const useBeaconForm = (data: any) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && dispatch) {
      dispatch(
        setInputs({
          formName: 'beaconForm',
          data: {
            id: data?.user?.id,
            name: data?.user?.name || '',
            email: data?.user?.email || '',
            phone: data?.user?.phone || '',
            company: data?.user?.company || '',
            industry: data?.user?.industry || '',
            role: data?.user?.role || '',
            bio: data?.user?.bio || '',
            website: data?.user?.website || '',
            busineessLicenseNumber: data?.user?.busineessLicenseNumber || '',
            yearsInBusiness: data?.user?.yearsInBusiness || '',
            interests: data?.user?.interests || [],
            profileImage: data?.user?.profileImage || null,
            profileImageFilename: data?.user?.profileImageFilename || null,
            isPublic: data?.user?.isPublic ?? true,
            isActive: data?.user?.isActive ?? true,
            isAdmin: data?.user?.isAdmin ?? false,
            membershipStatus: data?.user?.membershipStatus || '',
            joinedAt: data?.user?.joinedAt || null,
            expiresAt: data?.user?.expiresAt || null,
            lastLoginAt: data?.user?.lastLoginAt || null,
            createdAt: data?.user?.createdAt || null,
            updatedAt: data?.user?.updatedAt || null,
            isProfileComplete: data?.user?.isProfileComplete ?? false,
            membershipDays: data?.user?.membershipDays || 0,
            isExpiringSoon: data?.user?.isExpiringSoon ?? false,
            chapter: {
              id: data?.user?.chapter?.id || '',
              name: data?.user?.chapter?.name || '',
              location: data?.user?.chapter?.location || ''
            },
            meta: {
              chapterId: data?.meta?.chapterId || '',
              lastUpdated: data?.meta?.lastUpdated || null,
              profileCompleteness: {
                isComplete: data?.meta?.profileCompleteness?.isComplete ?? false,
                missingFields: data?.meta?.profileCompleteness?.missingFields || []
              },
              membership: {
                status: data?.meta?.membership?.status || '',
                joinedDaysAgo: data?.meta?.membership?.joinedDaysAgo || 0,
                expiresAt: data?.meta?.membership?.expiresAt || null,
                isExpiringWithin30Days: data?.meta?.membership?.isExpiringWithin30Days ?? false
              }
            }
          }
        })
      )
    }
  }, [data, dispatch])
}

export default useBeaconForm
