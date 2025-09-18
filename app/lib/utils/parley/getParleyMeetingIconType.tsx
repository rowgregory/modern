import { SVGProps } from 'react'

export function SkullAndCrossbones(props: SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <line x1="4" y1="4" x2="20" y2="20" stroke="#E8D7C3" strokeWidth="2" />
      <line x1="20" y1="4" x2="4" y2="20" stroke="#E8D7C3" strokeWidth="2" />
      <circle cx="4" cy="4" r="2" fill="#E8D7C3" stroke="#C5B299" strokeWidth="1" />
      <circle cx="20" cy="20" r="2" fill="#E8D7C3" stroke="#C5B299" strokeWidth="1" />
      <circle cx="20" cy="4" r="2" fill="#E8D7C3" stroke="#C5B299" strokeWidth="1" />
      <circle cx="4" cy="20" r="2" fill="#E8D7C3" stroke="#C5B299" strokeWidth="1" />

      <ellipse cx="12" cy="10" rx="5" ry="4" fill="#F5F5DC" stroke="#D3D3D3" strokeWidth="1" />
      <ellipse cx="12" cy="15" rx="3" ry="2" fill="#F5F5DC" stroke="#D3D3D3" strokeWidth="1" />

      <circle cx="10" cy="9" r="1.5" fill="#2C2C2C" stroke="#000" strokeWidth="1" />
      <circle cx="14" cy="9" r="1.5" fill="#2C2C2C" stroke="#000" strokeWidth="1" />

      <ellipse cx="10" cy="9" rx="0.8" ry="0.8" fill="#FF4444">
        <animate attributeName="ry" values="0.8; 0.8; 0.1; 0.8; 0.8" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="14" cy="9" rx="0.8" ry="0.8" fill="#FF4444">
        <animate attributeName="ry" values="0.8; 0.8; 0.1; 0.8; 0.8" dur="4s" begin="0.1s" repeatCount="indefinite" />
      </ellipse>

      <polygon points="12,11 11,13 13,13" fill="#2C2C2C" stroke="#000" strokeWidth="0.5" />

      <rect x="10.5" y="16" width="0.5" height="1" fill="#FFFEF7" stroke="#E0E0E0" strokeWidth="0.3" />
      <rect x="11.5" y="16" width="0.5" height="1.5" fill="#FFFEF7" stroke="#E0E0E0" strokeWidth="0.3" />
      <rect x="12.5" y="16" width="0.5" height="1" fill="#FFFEF7" stroke="#E0E0E0" strokeWidth="0.3" />
      <rect x="13.5" y="16" width="0.5" height="1" fill="#FFFEF7" stroke="#E0E0E0" strokeWidth="0.3" />
    </svg>
  )
}

export function VoyageCall(props: SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      {/* Bell mount */}
      <line x1="10" y1="3" x2="14" y2="3" strokeWidth="2" />
      <line x1="12" y1="3" x2="12" y2="5" strokeWidth="1" />

      {/* Bell body with swinging animation */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 5; 3 12 5; 0 12 5; -3 12 5; 0 12 5"
          dur="2s"
          repeatCount="indefinite"
        />
        <path d="M8 7 Q8 5 12 5 Q16 5 16 7 L16 12 Q16 14 14 15 L10 15 Q8 14 8 12 Z" fill="currentColor" opacity="0.3" />
        <path d="M8 7 Q8 5 12 5 Q16 5 16 7 L16 12 Q16 14 14 15 L10 15 Q8 14 8 12 Z" fill="none" />
      </g>

      {/* Bell clapper */}
      <circle cx="12" cy="12" r="1" fill="currentColor">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 12; -5 12 12; 0 12 12; 5 12 12; 0 12 12"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Sound rings expanding outward */}
      <g opacity="0">
        <animate attributeName="opacity" values="0; 0.8; 0" dur="2s" repeatCount="indefinite" />
        <circle cx="12" cy="11" r="8" fill="none" strokeWidth="1" />
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0; 0.6; 0" dur="2s" begin="0.3s" repeatCount="indefinite" />
        <circle cx="12" cy="11" r="10" fill="none" strokeWidth="0.8" />
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0; 0.4; 0" dur="2s" begin="0.6s" repeatCount="indefinite" />
        <circle cx="12" cy="11" r="12" fill="none" strokeWidth="0.6" />
      </g>

      {/* Base/mounting */}
      <rect x="10" y="15" width="4" height="2" rx="1" fill="currentColor" opacity="0.5" />

      {/* Communication dots below */}
      <circle cx="9" cy="19" r="0.8" fill="currentColor" opacity="0.5">
        <animate attributeName="opacity" values="0.5; 1; 0.5" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="12" cy="19" r="0.8" fill="currentColor" opacity="0.5">
        <animate attributeName="opacity" values="0.5; 1; 0.5" dur="1s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="15" cy="19" r="0.8" fill="currentColor" opacity="0.5">
        <animate attributeName="opacity" values="0.5; 1; 0.5" dur="1s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function MessageInBottle(props: SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <defs>
        {/* <!-- Animation definitions --> */}
        <animateTransform
          id="bob"
          attributeName="transform"
          type="translate"
          values="0,0; 0,-1; 0,0; 0,1; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
        <animateTransform
          id="sway"
          attributeName="transform"
          type="rotate"
          values="15 12 12; 18 12 12; 15 12 12; 12 12 12; 15 12 12"
          dur="3s"
          repeatCount="indefinite"
        />
      </defs>

      {/* <!-- Ocean waves with animation --> */}
      <g>
        <path d="M2 16 Q6 14 10 16 T18 16 Q20 15 22 16" strokeWidth="1.5">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -2,0; 0,0; 2,0; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M1 18 Q5 16 9 18 T17 18 Q19 17 21 18" strokeWidth="1" opacity="0.7">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 1,0; 0,0; -1,0; 0,0"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M3 20 Q7 18 11 20 T19 20 Q21 19 23 20" strokeWidth="1" opacity="0.5">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -1,0; 0,0; 1,0; 0,0"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* <!-- Bottle with bobbing and swaying animation --> */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-1; 0,0; 0,1; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values="15 12 12; 18 12 12; 15 12 12; 12 12 12; 15 12 12"
          dur="3s"
          repeatCount="indefinite"
        />

        {/* Bottle body */}
        <path d="M8 8 L8 18 Q8 19 9 19 L15 19 Q16 19 16 18 L16 8" />

        {/* Bottle neck */}
        <rect x="10.5" y="5" width="3" height="3" rx="0.3" />

        {/* Cork */}
        <rect x="10" y="4" width="4" height="1.5" rx="0.3" fill="currentColor" />

        {/* Water inside bottle with sloshing animation */}
        <path d="M8 14 Q12 13 16 14 L16 17 Q16 18 15 18 L9 18 Q8 18 8 17 Z" fill="none" strokeWidth="1" opacity="0.3">
          <animateTransform
            attributeName="transform"
            type="skewX"
            values="0; 2; 0; -2; 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Message scroll */}
        <rect x="10" y="10" width="4" height="5" rx="0.3" fill="none" strokeWidth="1" />
        <line x1="11" y1="11.5" x2="13" y2="11.5" strokeWidth="0.8" />
        <line x1="11" y1="12.5" x2="13" y2="12.5" strokeWidth="0.8" />
        <line x1="11" y1="13.5" x2="12.5" y2="13.5" strokeWidth="0.8" />

        {/* Bottle highlight */}
        <line x1="9" y1="9" x2="9" y2="16" strokeWidth="0.8" opacity="0.4" />
      </g>

      {/* <!-- Animated ripples around bottle --> */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-0.5; 0,0; 0,0.5; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
        <circle cx="14" cy="15" r="1" fill="none" strokeWidth="0.5" opacity="0.4">
          <animate attributeName="r" values="0.8; 1.2; 0.8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4; 0.1; 0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="10" cy="17" r="0.8" fill="none" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="0.6; 1; 0.6" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3; 0.1; 0.3" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* <!-- Additional floating debris for ambiance --> */}
      <circle cx="4" cy="14" r="0.3" fill="currentColor" opacity="0.3">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-0.3; 0,0; 0,0.3; 0,0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="20" cy="19" r="0.2" fill="currentColor" opacity="0.2">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,0.2; 0,0; 0,-0.2; 0,0"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

export function LanternClear(props: SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <defs>
        {/* <!-- Gradient for flame --> */}
        <radialGradient id="flameGradient" cx="50%" cy="80%" r="60%">
          <stop offset="0%" style={{ stopColor: '#ffeb3b', stopOpacity: '1' }} />
          <stop offset="50%" style={{ stopColor: '#ff9800', stopOpacity: '0.8' }} />
          <stop offset="100%" style={{ stopColor: '#f44336', stopOpacity: '0.6' }} />
        </radialGradient>

        {/* <!-- Glow effect for lantern --> */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* <!-- Lantern handle --> */}
      <path d="M9 4 Q12 2 15 4" strokeWidth="1.5" />

      {/* <!-- Top cap --> */}
      <rect x="8" y="4" width="8" height="2" rx="1" fill="currentColor" />

      {/* <!-- Glass panels (main lantern body) --> */}
      <rect x="9" y="6" width="6" height="10" rx="0.5" />

      {/* <!-- Lantern frame vertical supports --> */}
      <line x1="9" y1="6" x2="9" y2="16" strokeWidth="1" />
      <line x1="15" y1="6" x2="15" y2="16" strokeWidth="1" />

      {/* <!-- Lantern frame horizontal supports --> */}
      <line x1="9" y1="9" x2="15" y2="9" strokeWidth="0.5" opacity="0.7" />
      <line x1="9" y1="13" x2="15" y2="13" strokeWidth="0.5" opacity="0.7" />

      {/* <!-- Bottom cap --> */}
      <rect x="8" y="16" width="8" height="1.5" rx="0.5" fill="currentColor" />

      {/* <!-- Wick holder --> */}
      <rect x="11.5" y="15" width="1" height="2" fill="currentColor" />

      {/* <!-- Animated flame --> */}
      <g filter="url(#glow)">
        <path
          d="M12 15 Q10.5 13 11 11 Q11.5 9 12 11 Q12.5 9 13 11 Q13.5 13 12 15 Z"
          fill="url(#flameGradient)"
          stroke="none"
        >
          {/* <!-- Flame flickering animation --> */}
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,1; 1.1,0.9; 0.9,1.1; 1.05,0.95; 1,1"
            dur="2s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="skewX"
            additive="sum"
            values="0; 2; -1; 1; 0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>

        {/* <!-- Inner flame core --> */}
        <ellipse cx="12" cy="13" rx="0.8" ry="1.5" fill="#ffeb3b" stroke="none" opacity="0.8">
          <animate attributeName="ry" values="1.5; 1.8; 1.3; 1.6; 1.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8; 1; 0.6; 0.9; 0.8" dur="2s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* <!-- Glass reflection --> */}
      <line x1="10" y1="7" x2="10" y2="15" strokeWidth="0.5" opacity="0.3" />

      {/* <!-- Lantern glow on glass --> */}
      <rect
        x="9.2"
        y="6.2"
        width="5.6"
        height="9.6"
        rx="0.3"
        fill="none"
        stroke="#ffeb3b"
        strokeWidth="0.3"
        opacity="0.4"
      >
        <animate attributeName="opacity" values="0.4; 0.6; 0.3; 0.5; 0.4" dur="2s" repeatCount="indefinite" />
      </rect>

      {/* <!-- Hanging chain/rope --> */}
      <circle cx="12" cy="3" r="0.3" fill="currentColor" />
      <line x1="12" y1="2.5" x2="12" y2="1" strokeWidth="1" />

      {/* <!-- Small sparks/embers --> */}
      <circle cx="13.5" cy="10" r="0.2" fill="#ff9800" opacity="0.6">
        <animate attributeName="opacity" values="0; 0.8; 0; 0.6; 0" dur="3s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0.5,-1; 1,-2; 1.5,-3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="10.5" cy="11" r="0.15" fill="#ff5722" opacity="0.4">
        <animate attributeName="opacity" values="0; 0.6; 0; 0.4; 0" dur="2.5s" begin="1s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; -0.3,-1; -0.5,-2; -0.8,-3"
          dur="2.5s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

const getParleyMeetingIconType = (type: string) => {
  switch (type) {
    case 'DECK_TO_DECK':
      return {
        icon: <SkullAndCrossbones className="w-8 h-8 text-gray-400" />,
        text: 'Deck-to-Deck',
        desc: 'In-person meeting'
      }
    case 'VOYAGE_CALL':
      return {
        icon: <VoyageCall className="w-8 h-8 text-gray-400" />,
        text: 'Voyage Call',
        desc: 'Video call (Zoom, Teams, etc.)'
      }
    case 'MESSAGE_IN_A_BOTTLE':
      return {
        icon: <MessageInBottle className="w-8 h-8 text-gray-400" />,
        text: 'Message In a Bottle',
        desc: 'Audio-only conversation'
      }
    case 'LANTERN_LIGHT':
    default:
      return {
        icon: <LanternClear className="w-8 h-8 text-gray-400" />,
        text: 'Lantern Light',
        desc: 'Text-based parley (SMS, chat)'
      }
  }
}

export default getParleyMeetingIconType
