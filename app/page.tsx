'use client'

import React, { useState, useEffect } from 'react'
import HeroSection from './components/home/HeroSection'
import MissionSection from './components/home/MissionSection'
import PurposeOverview from './components/home/PurposeOverview'
import MemberExpectations from './components/home/MemberExpectations'
import CTASection from './components/home/CTASection'
import CompaniesSection from './components/home/CompaniesSection'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <HeroSection isVisible={isVisible} />

      {/* Chart Your Course Section */}
      {/* <ChartYourCourse creValues={coreValuesList} /> */}

      {/* Mission Section */}
      <MissionSection />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Purpose Overview */}
      <PurposeOverview />

      {/* Core Values */}
      {/* <CoreValues coreValues={coreValues} /> */}

      {/* Member Expectations */}
      <MemberExpectations />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

export default Home
