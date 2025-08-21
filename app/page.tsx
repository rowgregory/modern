'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  Users,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Handshake,
  BarChart3,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import LaunchAppButton from './components/LaunchAppButton'
import ChartYourCourse from './components/home/ChartYourCourse'
import CoreValues from './components/home/CoreValues'

const fadeInUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const modernValues: any = [
  {
    title: 'Momentum',
    description: 'in business',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-blue-400 to-blue-500'
  },
  {
    title: 'Opportunities',
    description: 'through connection',
    icon: <Target className="w-8 h-8" />,
    color: 'from-indigo-400 to-indigo-500'
  },
  {
    title: 'Determined',
    description: 'leaders',
    icon: <Award className="w-8 h-8" />,
    color: 'from-purple-400 to-purple-500'
  },
  {
    title: 'Engagement',
    description: 'with purpose',
    icon: <Users className="w-8 h-8" />,
    color: 'from-pink-400 to-pink-500'
  },
  {
    title: 'Referrals',
    description: 'that matter',
    icon: <Handshake className="w-8 h-8" />,
    color: 'from-violet-400 to-violet-500'
  },
  {
    title: 'Navigate',
    description: 'success',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-blue-500 to-purple-500'
  }
]

const coreValues: any = [
  {
    title: 'Trust',
    description: 'We build confidence through honesty, accountability, and delivering on our word.',
    color: 'bg-blue-900/30 border-blue-400/30 text-blue-100'
  },
  {
    title: 'Collaboration',
    description: 'We work as a team to help each other succeed, knowing one win lifts us all.',
    color: 'bg-cyan-900/30 border-cyan-400/30 text-cyan-100'
  },
  {
    title: 'Professionalism',
    description: 'We represent ourselves and our referrals with integrity and excellence.',
    color: 'bg-teal-900/30 border-teal-400/30 text-teal-100'
  },
  {
    title: 'Accountability',
    description: "We show up, follow through, and contribute to the group's collective growth.",
    color: 'bg-cyan-900/30 border-cyan-400/30 text-cyan-100'
  },
  {
    title: 'Abundance Mindset',
    description: "There's enough opportunity for everyone, & giving referrals comes back tenfold.",
    color: 'bg-blue-900/30 border-blue-400/30 text-blue-100'
  }
]

const expectations: any = [
  'Attend Regularly — Maintain at least 90% attendance at weekly meetings',
  'One-on-Ones — Attend regular meetings with members to build relationships and improve referrals',
  'Give Referrals — Consistently look for and share referral opportunities with the group',
  "Track Success — Report closed business to show the group's impact and celebrate wins",
  'Recruit Members — Invite qualified, growth-minded business leaders to strengthen the group',
  'North Shore Leader — Be a business owner, partner, or decision-maker in a North Shore-based organization',
  'Be Professional — Represent yourself and the group with integrity, respect, and reliability'
]

const ModernBusinessNetworkingLanding = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="flex items-center justify-between space-x-4 px-6">
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent uppercase text-2xl font-bold cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-blue-400 hover:to-cyan-400"
        >
          CORE
        </Link>
        <LaunchAppButton />
      </div>
      {/* Hero Section */}
      <motion.section
        className="mt-[-74px] relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent uppercase">
              Coastal Referral Exchange
            </h1>
            <div className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent uppercase">
                Business Networking
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Sail. Share. Succeed
          </motion.p>

          <div className="flex items-center justify-center">
            <LaunchAppButton />
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-blue-300/60" />
        </motion.div>
      </motion.section>

      {/* Chart Your Course Section */}
      <ChartYourCourse modernValues={modernValues} />

      {/* Mission Section */}
      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
            <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Modern Business Networking exists to help business owners grow financially through trusted, referral-based
              connections. By fostering a supportive and high-energy environment, we empower our members to build
              meaningful relationships, exchange quality referrals, and share best practices that drive measurable
              results for their businesses and their communities.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Purpose Overview */}
      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Purpose Overview</h2>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Modern Business Networking brings together a select group of business owners from the North Shore to meet
              weekly with a clear goal: helping each other succeed through referrals and collaboration.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              variants={fadeInUp}
              className="text-center p-6 bg-gray-700/30 rounded-xl border border-gray-600/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Share Referrals</h3>
              <p className="text-gray-300">That lead to closed business and increased revenue</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-center p-6 bg-gray-700/30 rounded-xl border border-gray-600/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Offer Advice</h3>
              <p className="text-gray-300">And best practices to strengthen each other&apos;s businesses</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-center p-6 bg-gray-700/30 rounded-xl border border-gray-600/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Schedule Meetings</h3>
              <p className="text-gray-300">One-on-one to deepen understanding and build trust</p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-lg text-gray-200 max-w-4xl mx-auto">
              By consistently showing up for one another, members create momentum, foster opportunities, and navigate
              the path to greater business success — together.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values */}
      <CoreValues coreValues={coreValues} />

      {/* Member Expectations */}
      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Member Expectations</h2>
            <p className="text-xl text-gray-300">What it takes to be part of our network</p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expectations.map((expectation: any, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start space-x-4 p-6 bg-gray-700/40 backdrop-blur-sm rounded-xl hover:bg-gray-700/60 transition-colors duration-200 border border-gray-600/30"
              >
                <CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200 leading-relaxed">{expectation}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Set Sail for Business Success</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join the Coastal Referral Exchange and navigate powerful connections that steer your business toward
              growth and opportunity.
            </p>
            <Link
              href="/skipper"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 text-white font-semibold rounded-xl  transition-all duration-300 transform hover:scale-105 shadow-xl shadow-white/25"
            >
              Hoist Your Sails
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default ModernBusinessNetworkingLanding
