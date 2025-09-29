import React from 'react'
import ActionButtonWithDropdown from '../header/ActionButtonWithDropdown'
import MobileMenuButton from '../header/MobileMenuButton'
import LogoutButton from '../header/LogoutButton'
import BeaconActions from '../beacon/BeaconActions'

const FixedHeader = ({ isNavigationCollapsed, selectedPage, links }: any) => {
  const getPageDisplayName = (page: string) => {
    const item = links?.find((nav: { id: string }) => nav.id === page)
    return item?.label || page
  }

  return (
    <header
      className={`${isNavigationCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'} fixed left-0 top-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-30 h-[69px]`}
      style={{
        transition: 'left 0.3s ease-in-out'
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Header Left */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              {getPageDisplayName(selectedPage)}
            </h1>
            <p className="text-gray-400 text-sm hidden lg:block">
              {selectedPage === 'bridge'
                ? 'Complete chapter management and analytics'
                : `Currently viewing: ${getPageDisplayName(selectedPage)}`}
            </p>
          </div>
        </div>

        {/* Header Right */}
        <div className="flex items-center space-x-4">
          {/* Actions Dropdown */}
          {selectedPage === 'beacon' && <BeaconActions />}
          <MobileMenuButton />
          <ActionButtonWithDropdown />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

export default FixedHeader
