'use client'

import React, { useEffect } from 'react'
import Toast from './components/common/Toast'
import Header from './components/header/Header'
import useCustomPathname from '@/hooks/useCustomPathname'
import NavigatorDrawer from './components/drawers/NavigatorDrawer'
import ParleyDrawer from './components/drawers/ParleyDrawer'
import AnchorDrawer from './components/drawers/AnchorDrawer'
import SwabbieDrawer from './components/drawers/SwabbieDrawer'
import TreasureMapDrawer from './components/drawers/TreasureMapDrawer'
import GrogDrawer from './components/drawers/GrogDrawer'
import StowawayDrawer from './components/drawers/StowawayDrawer'
import { useAppDispatch } from './redux/store'
import { showToast } from './redux/features/toastSlice'
import { setHydrateUsers } from './redux/features/userSlice'

interface PageWrapperProps {
  children: React.ReactNode
  initialData?: any
  error?: { status: number; message: string } | null
}

export default function PageWrapper({ children, initialData, error }: PageWrapperProps) {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const showHeader = !['/admin', '/member', '/swabbie/port', '/auth/custom-callback'].some((str) => path.includes(str))

  useEffect(() => {
    if (error) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Failed to load data',
          description: error.message
        })
      )
    } else if (initialData) {
      dispatch(setHydrateUsers(initialData?.users))
    }
  }, [dispatch, initialData, error])

  return (
    <>
      <Toast />
      <NavigatorDrawer />
      <ParleyDrawer />
      <AnchorDrawer />
      <SwabbieDrawer />
      <TreasureMapDrawer />
      <GrogDrawer />
      <StowawayDrawer />
      {showHeader && <Header />}
      {children}
    </>
  )
}
