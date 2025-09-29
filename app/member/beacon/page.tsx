'use client'

import React from 'react'
import { useAppDispatch, useFormSelector, useUserSelector } from '@/app/redux/store'
import useBeaconForm from '@/hooks/useBeaconForm'
import BeaconHeader from '@/app/components/beacon/BeaconHeader'
import BeaconForm from '@/app/components/forms/BeaconForm'
import { createFormActions } from '@/app/redux/features/formSlice'

const MemberBeacon = () => {
  const dispatch = useAppDispatch()
  const { beaconForm, isEditing } = useFormSelector()
  const { handleInput, handleToggle } = createFormActions('beaconForm', dispatch)
  const inputs = beaconForm?.inputs
  const errors = beaconForm?.errors
  const { user } = useUserSelector()

  useBeaconForm(user)

  return (
    <div className="bg-gray-900 h-full">
      <div className="flex-1 p-6 overflow-y-auto max-w-7xl">
        <div className="px-8 py-6 border-b border-gray-700/50">
          <BeaconHeader inputs={inputs} isEditing={isEditing} />
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
