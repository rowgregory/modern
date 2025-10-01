'use client'

import useCustomPathname from '@/hooks/useCustomPathname'
import { motion } from 'framer-motion'
import { ShipWheel } from 'lucide-react'
import Link from 'next/link'

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const Footer = () => {
  const path = useCustomPathname()

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="text-xl font-bold mb-6">Contact</h3>

            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Lynn, Massachusetts
                <br />
                United States
              </p>

              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <a
                  href="mailto:info@coastalreferralexchange.com"
                  className="text-lg font-semibold hover:text-cyan-400 transition-colors"
                >
                  info@coastal-referral-exchange.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Navigation Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className={`${path === '/' ? 'text-cyan-300' : 'text-gray-300'} hover:text-cyan-400 transition-color`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/swabbie"
                  className={`${path === '/swabbie' ? 'text-cyan-300' : 'text-gray-300'} hover:text-cyan-400 transition-color`}
                >
                  Application
                </Link>
              </li>
              <li>
                <Link
                  href="/navigators"
                  className={`${path === '/navigators' ? 'text-cyan-300' : 'text-gray-300'} hover:text-cyan-400 transition-color`}
                >
                  Navigators
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">Resources</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/#faq" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                {/* Ship wheel icon or your logo */}
                <ShipWheel />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Coastal Referral Exchange
              </span>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-center gap-4"
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-center gap-6 text-sm text-gray-400"
          >
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy
            </Link>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-8 text-center text-sm text-gray-500"
        >
          © Coastal Referral Exchange {new Date().getFullYear()}. All Rights Reserved
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
