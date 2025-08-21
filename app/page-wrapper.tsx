'use client'

import React, { FC, ReactNode } from 'react'
import Face2FaceDrawer from './components/drawers/Face2FaceDrawer'
import Toast from './components/common/Toast'

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Face2FaceDrawer />
      <Toast />
      {children}
    </>
  )
}

export default PageWrapper
