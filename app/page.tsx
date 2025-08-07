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

const ModernBusinessNetworkingLanding = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
      color: 'bg-purple-900/30 border-purple-400/30 text-purple-100'
    },
    {
      title: 'Professionalism',
      description: 'We represent ourselves and our referrals with integrity and excellence.',
      color: 'bg-indigo-900/30 border-indigo-400/30 text-indigo-100'
    },
    {
      title: 'Accountability',
      description: "We show up, follow through, and contribute to the group's collective growth.",
      color: 'bg-violet-900/30 border-violet-400/30 text-violet-100'
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

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-end space-x-4 mr-6">
        <Link
          href="/admin/dashboard"
          className="relative z-10 px-5 py-2.5 rounded-full text-lg text-white backdrop-blur-lg border border-white/10 mt-6 overflow-hidden group transition-all duration-300 hover:border-white/30"
        >
          <span className="relative z-10">Launch App</span>

          {/* Shiny sweep effect */}
          <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />

          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
      {/* Hero Section */}
      <motion.section
        className="mt-[-74px] relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 text-white overflow-hidden"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              MODERN
            </h1>
            <div className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BUSINESS NETWORKING
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Referrals. Relationships. Results.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/project-breakdown"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25"
            >
              Project Breakdown
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-blue-300/60" />
        </motion.div>
      </motion.section>

      {/* MODERN Values Section */}
      <motion.section
        className="py-20 bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MODERN</span>{' '}
              Approach
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our framework is built on six fundamental principles that drive business success
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modernValues.map((value: any, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative p-8 bg-gray-700/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/30"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300 text-lg">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-gray-900 to-blue-900/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
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
      <motion.section
        className="py-20 bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
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
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Offer Advice</h3>
              <p className="text-gray-300">And best practices to strengthen each other&apos;s businesses</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-center p-6 bg-gray-700/30 rounded-xl border border-gray-600/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
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
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-900 to-purple-900/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Core Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {coreValues.map((value: any, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-6 rounded-xl border-2 ${value.color} hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 backdrop-blur-sm`}
              >
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-lg leading-relaxed opacity-90">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Member Expectations */}
      <motion.section
        className="py-20 bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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
                <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200 leading-relaxed">{expectation}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join North Shore&apos;s premier business networking group and start building the relationships that will
              drive your success.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-white/25">
              Apply for Membership
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default ModernBusinessNetworkingLanding
