'use client'

import { setHydrateDashboard } from '@/app/redux/features/dashboardSlice'
import { useAppDispatch } from '@/app/redux/store'
import React, { FC, ReactNode, useEffect } from 'react'

const MemberBridgeClient: FC<{ initialData: any; children: ReactNode }> = ({ initialData, children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (initialData) {
      dispatch(setHydrateDashboard(initialData))
    }
  }, [dispatch, initialData])

  return <div>{children}</div>
}

export default MemberBridgeClient
