import React from 'react'

const CrewQuartersSVG = () => {
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
      {/* Ship deck/platform */}
      <rect x="2" y="16" width="20" height="6" rx="1" />

      {/* Mast/flagpole */}
      <line x1="12" y1="2" x2="12" y2="16" strokeWidth="2" />

      {/* Crew quarters structure */}
      <rect x="6" y="12" width="12" height="4" rx="0.5" fill="none" />

      {/* Quarters divisions/rooms */}
      <line x1="9" y1="12" x2="9" y2="16" strokeWidth="1" opacity="0.7" />
      <line x1="12" y1="12" x2="12" y2="16" strokeWidth="1" opacity="0.7" />
      <line x1="15" y1="12" x2="15" y2="16" strokeWidth="1" opacity="0.7" />

      {/* Flag at top */}
      <path d="M12 2 L18 4 Q16 6 18 8 L12 6 Z" fill="currentColor" opacity="0.6" />

      {/* Crew members (dots) in quarters */}
      <circle cx="7.5" cy="14" r="0.8" fill="currentColor" opacity="0.7" />
      <circle cx="10.5" cy="14" r="0.8" fill="currentColor" opacity="0.6" />
      <circle cx="13.5" cy="14" r="0.8" fill="currentColor" opacity="0.5" />
      <circle cx="16.5" cy="14" r="0.8" fill="currentColor" opacity="0.8" />

      {/* Ship railings */}
      <line x1="2" y1="16" x2="22" y2="16" strokeWidth="1" opacity="0.5" />

      {/* Support beams */}
      <line x1="4" y1="16" x2="4" y2="22" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="16" x2="20" y2="22" strokeWidth="1" opacity="0.6" />

      {/* Anchor at base */}
      <path d="M10 20 Q12 18 14 20" strokeWidth="1" opacity="0.7" />
      <circle cx="12" cy="19" r="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export default CrewQuartersSVG
