import React from 'react'

const TreasureVaultSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Sparkle rays above chest */}
      <line x1="12" y1="2" x2="12" y2="4" strokeWidth="1.5" />
      <line x1="15" y1="3" x2="14.5" y2="4.5" strokeWidth="1.5" />
      <line x1="17" y1="5" x2="15.5" y2="5.5" strokeWidth="1.5" />
      <line x1="9" y1="3" x2="9.5" y2="4.5" strokeWidth="1.5" />
      <line x1="7" y1="5" x2="8.5" y2="5.5" strokeWidth="1.5" />

      {/* Chest base */}
      <rect x="4" y="13" width="16" height="8" rx="1" />

      {/* Chest lid (open) */}
      <path d="M4 13 Q4 7 8 7 L16 7 Q20 7 20 13" fill="none" />

      {/* Lock mechanism */}
      <rect x="11" y="11" width="2" height="3" rx="0.3" />
      <circle cx="12" cy="12" r="0.8" fill="none" strokeWidth="1" />

      {/* Inner compartments */}
      <rect x="6" y="15" width="4" height="4" rx="0.5" fill="none" strokeWidth="1" />
      <rect x="14" y="15" width="4" height="4" rx="0.5" fill="none" strokeWidth="1" />

      {/* Center divider with lock */}
      <rect x="11" y="15" width="2" height="4" rx="0.3" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="17" r="0.5" fill="none" strokeWidth="1" />

      {/* Horizontal dividers in compartments */}
      <line x1="6" y1="17" x2="10" y2="17" strokeWidth="1" />
      <line x1="14" y1="17" x2="18" y2="17" strokeWidth="1" />

      {/* Small items/details in compartments */}
      <line x1="7" y1="16" x2="9" y2="16" strokeWidth="1" opacity="0.7" />
      <line x1="7" y1="18" x2="8" y2="18" strokeWidth="1" opacity="0.7" />
      <line x1="15" y1="16" x2="17" y2="16" strokeWidth="1" opacity="0.7" />
      <line x1="15" y1="18" x2="16" y2="18" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}

export default TreasureVaultSVG
