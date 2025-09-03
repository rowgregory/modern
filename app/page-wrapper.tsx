'use client'

import React, { FC, ReactNode } from 'react'
import ParleyDrawer from './components/drawers/ParleyDrawer'
import Toast from './components/common/Toast'
import Header from './components/header/Header'
import useCustomPathname from '@/hooks/useCustomPathname'

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const path = useCustomPathname()
  const showHeader = !['/admin', '/member', '/skipper/port'].some((str) => path.includes(str))

  return (
    <>
      <ParleyDrawer />
      <Toast />
      {showHeader && <Header />}
      {children}
    </>
  )
}

export default PageWrapper
