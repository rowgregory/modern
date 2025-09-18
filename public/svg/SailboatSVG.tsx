import React from 'react'

const SailboatSVG = () => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-6">
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="sailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#234" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* Background Circle */}
      <circle cx="32" cy="32" r="30" fill="url(#oceanGradient)" opacity="0.3" stroke="#3b82f6" strokeWidth="2">
        <animate attributeName="r" values="30;32;30" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Animated Waves */}
      <path d="M8 45 Q16 42 24 45 T40 45 T56 45" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.6">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;2,-1;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M8 48 Q16 45 24 48 T40 48 T56 48" stroke="#0891b2" strokeWidth="2" fill="none" opacity="0.4">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;-2,1;0,0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Ship Hull (More Detailed) */}
      <path d="M20 38 Q32 44 44 38 L42 42 Q32 46 22 42 Z" fill="url(#shipGradient)" stroke="#78350f" strokeWidth="1">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-0.5;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Hull Top Deck */}
      <ellipse cx="32" cy="38" rx="11" ry="2" fill="#a16207" opacity="0.8">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-0.5;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Mast (Thicker and More Defined) */}
      <rect x="31" y="16" width="2" height="22" fill="#92400e" rx="1">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0.5,-0.2;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Main Sail (Larger and More Defined) */}
      <path d="M34 18 Q44 20 44 28 Q44 36 34 38 L34 18" fill="url(#sailGradient)" stroke="#94a3b8" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="skewX" values="0;3;0" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Sail Details */}
      <line x1="34" y1="22" x2="42" y2="23" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.7">
        <animateTransform attributeName="transform" type="skewX" values="0;3;0" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="34" y1="28" x2="42" y2="29" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.7">
        <animateTransform attributeName="transform" type="skewX" values="0;3;0" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="34" y1="34" x2="42" y2="35" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.7">
        <animateTransform attributeName="transform" type="skewX" values="0;3;0" dur="3s" repeatCount="indefinite" />
      </line>

      {/* Bow of Ship */}
      <path d="M44 38 L46 40 L44 42" fill="#92400e" stroke="#78350f" strokeWidth="1">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-0.5;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Flag */}
      <polygon points="32,16 32,20 38,18" fill="#ef4444">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 18;5 32 18;0 32 18"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </polygon>

      {/* Anchor (Success Symbol) */}
      <g transform="translate(20, 28)">
        <circle cx="0" cy="0" r="2" fill="#10b981" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M0,-2 L0,4 M-2,2 L2,2 M-1,4 Q-2,6 -1,6 M1,4 Q2,6 1,6" stroke="#10b981" strokeWidth="1.5" fill="none">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Treasure Chest Glow */}
      <circle cx="44" cy="35" r="3" fill="#fbbf24" opacity="0.3">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Success Sparkles */}
      <circle cx="20" cy="20" r="0.5" fill="#10b981">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="44" cy="22" r="0.5" fill="#10b981">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="18" cy="40" r="0.5" fill="#10b981">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1s" />
      </circle>
      <circle cx="46" cy="42" r="0.5" fill="#10b981">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1.2s" />
      </circle>
    </svg>
  )
}

export default SailboatSVG
