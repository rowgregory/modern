'use client'

import React, { Suspense } from 'react'
import ExplorerBasecamp from './ExplorerBasecamp'

const ExplorerBasecampPage = () => {
  return (
    <Suspense fallback={<></>}>
      <ExplorerBasecamp />
    </Suspense>
  )
}

export default ExplorerBasecampPage
