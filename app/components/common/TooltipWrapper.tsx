import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipWrapperProps {
  children: React.ReactNode
  tooltip: string
  className?: string
}

const TooltipWrapper = ({ children, tooltip, className = '' }: TooltipWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return

    const wrapperRect = wrapperRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Start with position above the wrapper
    let top = wrapperRect.top - tooltipRect.height - 8
    let left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2

    // If tooltip goes above viewport, position it below
    if (top < 8) {
      top = wrapperRect.bottom + 8
    }

    // If tooltip goes off left edge
    if (left < 8) {
      left = 8
    }

    // If tooltip goes off right edge
    if (left + tooltipRect.width > viewport.width - 8) {
      left = viewport.width - tooltipRect.width - 8
    }

    setPosition({ top, left })
  }

  useEffect(() => {
    if (isVisible) {
      calculatePosition()

      const handleScroll = () => calculatePosition()
      const handleResize = () => calculatePosition()

      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isVisible])

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])

  return (
    <>
      <div
        ref={wrapperRef}
        onClick={handleClick}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed z-50 max-w-xs sm:max-w-sm"
            style={{
              top: position.top,
              left: position.left
            }}
          >
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/80 rounded-xl p-4 shadow-xl">
              {/* Calculation explanation */}
              <div className="space-y-2">
                <h4 className="text-white font-medium text-sm">How it&apos;s calculated</h4>
                <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-line">{tooltip}</p>
              </div>

              {/* Arrow pointer */}
              <div
                className="absolute w-3 h-3 bg-gray-900/95 border-l border-t border-gray-700/80 rotate-45 -translate-x-1/2"
                style={{
                  bottom:
                    wrapperRef.current && position.top > wrapperRef.current.getBoundingClientRect().bottom
                      ? 'auto'
                      : '-6px',
                  top:
                    wrapperRef.current && position.top > wrapperRef.current.getBoundingClientRect().bottom
                      ? '-6px'
                      : 'auto',
                  left: '50%'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TooltipWrapper

// Usage example in your StatCard:
/*
const StatCard = ({ title, value, change, icon: Icon, color, calculation }: any) => {
  const { loading } = useDashboardSelector()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <TooltipWrapper tooltip={calculation} className="inline-block">
          <div className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </TooltipWrapper>
        // ... rest of your component
      </div>
    </motion.div>
  )
}
*/
