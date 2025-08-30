'use client'

import React, { FC, ReactNode } from 'react'
import Face2FaceDrawer from './components/drawers/Face2FaceDrawer'
import Toast from './components/common/Toast'
import Header from './components/header/Header'
import useCustomPathname from '@/hooks/useCustomPathname'

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const path = useCustomPathname()
  const hideHeader = ['/admin', '/member'].some((str) => str.includes(path))

  return (
    <>
      <Face2FaceDrawer />
      <Toast />
      {hideHeader && <Header />}
      {children}
    </>
  )
}

export default PageWrapper
