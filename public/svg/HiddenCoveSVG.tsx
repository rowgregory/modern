import { SVGProps } from 'react'

export function HiddenCoveSVG(props: SVGProps<SVGSVGElement>) {
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
      {/* Ocean waves */}
      <g>
        <path d="M2 18 Q6 16 10 18 T18 18 Q20 17 22 18" strokeWidth="1.5">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -2,0; 0,0; 2,0; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M1 20 Q5 18 9 20 T17 20 Q19 19 21 20" strokeWidth="1" opacity="0.7">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 1,0; 0,0; -1,0; 0,0"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Cove cliffs */}
      <g fill="currentColor" opacity="0.6">
        <path d="M2 16 L5 10 L8 16 Z" /> {/* Left cliff */}
        <path d="M16 16 L19 10 L22 16 Z" /> {/* Right cliff */}
      </g>

      {/* Hidden cave entrance */}
      <path d="M9 16 Q12 12 15 16 L15 18 Q12 14 9 18 Z" fill="none" strokeWidth="1.2" />

      {/* Floating debris */}
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

      {/* Subtle water inside cove */}
      <path d="M10 17 Q12 15 14 17" strokeWidth="0.8" opacity="0.5">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-0.2; 0,0; 0,0.2; 0,0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

export default HiddenCoveSVG
