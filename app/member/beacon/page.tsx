'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useGetMyProfileQuery } from '@/app/redux/services/userApi'
import { useAppDispatch, useFormSelector } from '@/app/redux/store'
import useBeaconForm from '@/hooks/useBeaconForm'
import BeaconActions from '@/app/components/beacon/BeaconActions'
import BeaconHeader from '@/app/components/beacon/BeaconHeader'
import BeaconForm from '@/app/components/forms/BeaconForm'
import { createFormActions, setIsEditing, setIsNotEditing } from '@/app/redux/features/formSlice'
import { chapterId } from '@/app/lib/constants/api/chapterId'

const MemberBeacon = () => {
  const session = useSession()
  const { data } = useGetMyProfileQuery({ chapterId, userId: session.data?.user.id })
  useBeaconForm(data)
  const dispatch = useAppDispatch()
  const { beaconForm, isEditing } = useFormSelector()
  const { handleInput, setErrors, handleToggle, handleUploadProgress } = createFormActions('beaconForm', dispatch)
  const inputs = beaconForm?.inputs
  const errors = beaconForm?.errors

  return (
    <div className="bg-gray-900 h-full">
      <div className="flex-1 p-6 overflow-y-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-6 px-8 py-6 border-b border-gray-700/50">
          <BeaconHeader inputs={inputs} isEditing={isEditing} />
          <BeaconActions
            isEditing={isEditing}
            onCancelClick={() => dispatch(setIsNotEditing())}
            onEditClick={() => dispatch(setIsEditing())}
            inputs={inputs}
            setErrors={setErrors}
            handleUploadProgress={handleUploadProgress}
          />
        </div>
        <BeaconForm
          inputs={inputs}
          errors={errors}
          handleInput={handleInput}
          isEditing={isEditing}
          handleToggle={handleToggle}
        />
      </div>
    </div>
  )
}

export default MemberBeacon
