import Link from 'next/link'
import React from 'react'
import LaunchAppButton from '../common/LaunchAppButton'
import useCustomPathname from '@/hooks/useCustomPathname'
import { ShipWheel } from 'lucide-react'
import { useUserSelector } from '@/app/redux/store'

const Header = () => {
  const path = useCustomPathname()
  const { user } = useUserSelector()
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between space-x-4 py-3 px-6 bg-gray-900 h-[74px]">
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
          href="/"
          className={`${path === '/' ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent' : 'text-white'} hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent hover:duration-300`}
        >
          Home
        </Link>
        <Link
          href="/swabbie"
          className={`${path === '/swabbie' ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent' : 'text-white'} hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent hover:duration-300`}
        >
          Application
        </Link>
        <Link
          href="/navigators"
          className={`${path.includes('navigators') ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent' : 'text-white'} hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent hover:duration-300`}
        >
          Navigators
        </Link>
        {user?.chapter?.hasUnlockedGrog && (
          <Link
            href="/events"
            className={`${path === '/events' ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent' : 'text-white'} hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent hover:duration-300`}
          >
            Events
          </Link>
        )}
      </div>
      {path !== '/auth/login' && <LaunchAppButton />}
    </div>
  )
}

export default Header
