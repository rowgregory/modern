'use client'

import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default PageWrapper
