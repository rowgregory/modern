'use client'

import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Face2FaceDrawer from './components/drawers/Face2FaceDrawer'
import Toast from './components/common/Toast'

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <Face2FaceDrawer />
      <Toast />
      {children}
    </Provider>
  )
}

export default PageWrapper
