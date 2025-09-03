import Link from 'next/link'
import React from 'react'

const LaunchAppButton = () => {
  return (
    <Link
      href="/auth/login"
      className="relative z-10 px-5 py-2.5 rounded-full text-lg text-white backdrop-blur-lg border border-white/10 overflow-hidden group transition-all duration-300 hover:border-white/30"
    >
      <span className="relative z-10">Launch App</span>

      {/* Shiny sweep effect */}
      <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  )
}

export default LaunchAppButton
