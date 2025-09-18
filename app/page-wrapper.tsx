'use client'

import React, { FC, ReactNode } from 'react'
import Toast from './components/common/Toast'
import Header from './components/header/Header'
import useCustomPathname from '@/hooks/useCustomPathname'
import NavigatorDrawer from './components/drawers/NavigatorDrawer'
import ParleyDrawer from './components/drawers/ParleyDrawer'
import AnchorDrawer from './components/drawers/AnchorDrawer'
import SwabbieDrawer from './components/drawers/SwabbieDrawer'
import TreasureMapDrawer from './components/drawers/TreasureMapDrawer'
import GrogDrawer from './components/drawers/GrogDrawer'

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const path = useCustomPathname()
  const showHeader = !['/admin', '/member', '/swabbie/port', '/auth/custom-callback'].some((str) => path.includes(str))

  return (
    <>
      <Toast />
      <NavigatorDrawer />
      <ParleyDrawer />
      <AnchorDrawer />
      <SwabbieDrawer />
      <TreasureMapDrawer />
      <GrogDrawer />
      {showHeader && <Header />}
      {children}
    </>
  )
}

export default PageWrapper
