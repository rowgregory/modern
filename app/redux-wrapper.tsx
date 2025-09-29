'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import PageWrapper from './page-wrapper'

interface ReduxWrapperProps {
  children: React.ReactNode
  initialData?: any
  error?: { status: number; message: string } | null
}

export default function ReduxWrapper({ children, initialData, error }: ReduxWrapperProps) {
  return (
    <Provider store={store}>
      <PageWrapper initialData={initialData} error={error}>
        {children}
      </PageWrapper>
    </Provider>
  )
}
