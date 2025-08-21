'use client'

import React, { Suspense } from 'react'
import SipperPort from './SkipperPort'

const SipperPortPage = () => {
  return (
    <Suspense fallback={<></>}>
      <SipperPort />
    </Suspense>
  )
}

export default SipperPortPage
