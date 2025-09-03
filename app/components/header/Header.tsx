import Link from 'next/link'
import React from 'react'
import LaunchAppButton from '../common/LaunchAppButton'
import useCustomPathname from '@/hooks/useCustomPathname'
import { ShipWheel } from 'lucide-react'

const Header = () => {
  const path = useCustomPathname()
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between space-x-4 py-3 px-6 bg-[#121212] h-[74px]">
      <Link
        href="/"
        className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent uppercase text-2xl font-bold cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-blue-400 hover:to-cyan-400 flex items-center"
      >
        C
        <span>
          <ShipWheel className="text-white w-5 h-5 shipwheel-storm" />
        </span>
        RE
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 space-x-4">
        <Link
          href="/skipper"
          className={`${path === '/skipper' ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent' : 'text-white'} hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent hover:duration-300`}
        >
          Skipper Application
        </Link>
        <Link
          href="/navigators"
          className={`${path === '/navigators' ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent' : 'text-white'} hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent hover:duration-300`}
        >
          Navigators
        </Link>
      </div>
      {path !== '/auth/login' && <LaunchAppButton />}
    </div>
  )
}

export default Header
