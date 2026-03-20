'use client'

// Constellation Logo
export function LogoConstellation({ className = '', size = 120 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Constellation stars and lines */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.5">
        <line x1="60" y1="15" x2="90" y2="8" />
        <line x1="90" y1="8" x2="120" y2="18" />
        <line x1="120" y1="18" x2="150" y2="6" />
        <line x1="150" y1="6" x2="180" y2="14" />
        <line x1="90" y1="8" x2="105" y2="25" />
        <line x1="120" y1="18" x2="135" y2="10" />
        <line x1="60" y1="15" x2="75" y2="28" />
        <line x1="150" y1="6" x2="165" y2="22" />
      </g>
      {/* Star dots */}
      {[[60,15],[90,8],[120,18],[150,6],[180,14],[105,25],[135,10],[75,28],[165,22]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.5 : 1.5} fill="currentColor" opacity={i % 2 === 0 ? 0.8 : 0.4} />
      ))}
      {/* Conectados text */}
      <text x="120" y="70" textAnchor="middle" fill="currentColor" fontSize="32" fontWeight="800" fontFamily="'Handlee', sans-serif" letterSpacing="-0.5">
        Conectados
      </text>
      {/* Tagline */}
      <text x="120" y="90" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="500" fontFamily="'DM Sans', sans-serif" letterSpacing="3" opacity="0.4">
        COMMUNITY EVENTS
      </text>
    </svg>
  )
}

// Nav Logo (compact)
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#F5B731" />
      {/* Mini constellation */}
      <g stroke="white" strokeWidth="0.6" opacity="0.5">
        <line x1="10" y1="8" x2="18" y2="6" />
        <line x1="18" y1="6" x2="26" y2="9" />
        <line x1="18" y1="6" x2="20" y2="12" />
      </g>
      <circle cx="10" cy="8" r="1.2" fill="white" opacity="0.7" />
      <circle cx="18" cy="6" r="1.5" fill="white" opacity="0.9" />
      <circle cx="26" cy="9" r="1" fill="white" opacity="0.5" />
      <circle cx="20" cy="12" r="0.8" fill="white" opacity="0.4" />
      {/* C letter */}
      <text x="18" y="27" textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="'Handlee', sans-serif">C</text>
    </svg>
  )
}

// Find Your Vibe — sparkle/star burst
export function IconVibe({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main 4-point star */}
      <path d="M36 8 L40 28 L60 32 L40 36 L36 56 L32 36 L12 32 L32 28Z" fill="#FFF4D6" stroke="#F5B731" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Inner glow */}
      <circle cx="36" cy="32" r="6" fill="#F5B731" opacity="0.15" />
      <circle cx="36" cy="32" r="3" fill="#F5B731" opacity="0.3" />
      {/* Small sparkles */}
      <path d="M54 12 L56 16 L60 14 L56 18 L58 22 L54 18 L50 20 L54 16Z" fill="#E8636F" opacity="0.5" />
      <path d="M14 48 L16 52 L20 50 L16 54 L18 58 L14 54 L10 56 L14 52Z" fill="#2B7A9E" opacity="0.4" />
      <circle cx="56" cy="48" r="2" fill="#F5B731" opacity="0.3" />
      <circle cx="16" cy="16" r="1.5" fill="#E8636F" opacity="0.3" />
    </svg>
  )
}

// Show Interest — hand with heart
export function IconInterest({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Raised hand */}
      <path d="M28 54 L28 32 C28 30 30 28 32 28 C34 28 36 30 36 32 L36 24 C36 22 38 20 40 20 C42 20 44 22 44 24 L44 22 C44 20 46 18 48 18 C50 18 52 20 52 22 L52 36 C52 42 48 52 40 56 L28 56" stroke="#2B7A9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#E8F4F8" />
      {/* Heart floating above */}
      <path d="M36 16 C34 14 30 12 30 9 C30 7 32 5 34 6 L36 8 L38 6 C40 5 42 7 42 9 C42 12 38 14 36 16Z" fill="#E8636F" opacity="0.6" stroke="#E8636F" strokeWidth="1" />
      {/* Small dots */}
      <circle cx="22" cy="20" r="1.5" fill="#F5B731" opacity="0.4" />
      <circle cx="52" cy="10" r="1.5" fill="#2B7A9E" opacity="0.3" />
      <circle cx="18" cy="40" r="1" fill="#E8636F" opacity="0.3" />
    </svg>
  )
}

// Turn Up & Connect — people with connecting lines (constellation style)
export function IconConnect({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Connecting lines (constellation) */}
      <g stroke="#F5B731" strokeWidth="1" opacity="0.4">
        <line x1="20" y1="30" x2="36" y2="22" />
        <line x1="36" y1="22" x2="52" y2="30" />
        <line x1="20" y1="30" x2="52" y2="30" />
      </g>
      {/* Person 1 */}
      <circle cx="20" cy="24" r="5" stroke="#2B7A9E" strokeWidth="2" fill="#E8F4F8" />
      <path d="M10 48 C10 40 15 36 20 36 C25 36 30 40 30 48" stroke="#2B7A9E" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Person 2 */}
      <circle cx="52" cy="24" r="5" stroke="#E8636F" strokeWidth="2" fill="#FDE8EA" />
      <path d="M42 48 C42 40 47 36 52 36 C57 36 62 40 62 48" stroke="#E8636F" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Center star */}
      <path d="M36 16 L37.5 20 L42 18 L38.5 22 L42 24 L37.5 24 L36 28 L34.5 24 L30 24 L33.5 22 L30 18 L34.5 20Z" fill="#F5B731" opacity="0.5" />
      {/* Connection dots */}
      <circle cx="20" cy="30" r="2" fill="#2B7A9E" opacity="0.3" />
      <circle cx="52" cy="30" r="2" fill="#E8636F" opacity="0.3" />
      <circle cx="36" cy="22" r="2" fill="#F5B731" opacity="0.5" />
    </svg>
  )
}

// Newsletter / mail icon (replaces 💌 emoji)
export function IconMail({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="36" height="24" rx="4" stroke="#F5B731" strokeWidth="2" fill="#FFF4D6" />
      <path d="M6 16 L24 28 L42 16" stroke="#F5B731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="12" r="4" fill="#E8636F" stroke="white" strokeWidth="2" />
      <path d="M38 10 L38 14 M38 10 L38 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Sun icon (replaces ☀️ emoji)
export function IconSun({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="4" fill="#F5B731" />
      <g stroke="#F5B731" strokeWidth="1.5" strokeLinecap="round">
        <line x1="9" y1="1" x2="9" y2="3" />
        <line x1="9" y1="15" x2="9" y2="17" />
        <line x1="1" y1="9" x2="3" y2="9" />
        <line x1="15" y1="9" x2="17" y2="9" />
        <line x1="3.3" y1="3.3" x2="4.8" y2="4.8" />
        <line x1="13.2" y1="13.2" x2="14.7" y2="14.7" />
        <line x1="3.3" y1="14.7" x2="4.8" y2="13.2" />
        <line x1="13.2" y1="4.8" x2="14.7" y2="3.3" />
      </g>
    </svg>
  )
}

// Testimonial themed icons
export function IconWineGlass({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l-1 8c0 2-2 4-3 4s-3-2-3-4L8 2z" />
      <line x1="12" y1="14" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  )
}

export function IconPalette({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E8636F" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="12" cy="12" rx="10" ry="9" />
      <circle cx="8" cy="9" r="1.5" fill="#E8636F" />
      <circle cx="13" cy="8" r="1.5" fill="#F5B731" />
      <circle cx="8" cy="14" r="1.5" fill="#2B7A9E" />
    </svg>
  )
}

export function IconPeople({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2B7A9E" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 19c0-4 3-6 6-6s6 2 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M21 19c0-3-2-5-4-5" />
    </svg>
  )
}

// Globe icon for language selector
export function IconGlobe({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="9" cy="9" r="7" />
      <ellipse cx="9" cy="9" rx="3.5" ry="7" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <path d="M3 5.5h12M3 12.5h12" />
    </svg>
  )
}

// Additional testimonial icons
export function IconHeart({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E8636F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export function IconStar({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F5B731" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function IconCoffee({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7B9E87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}

// Flag icons for language selector
export function FlagUK({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="3" fill="#012169"/>
      <path d="M0 0L20 20M20 0L0 20" stroke="white" strokeWidth="2"/>
      <path d="M0 0L20 20M20 0L0 20" stroke="#C8102E" strokeWidth="1.3"/>
      <path d="M10 0v20M0 10h20" stroke="white" strokeWidth="3.3"/>
      <path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="2"/>
    </svg>
  )
}

export function FlagSpain({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="3" fill="#AA151B"/>
      <rect y="5" width="20" height="10" fill="#F1BF00"/>
      <rect y="2" width="20" height="3" fill="#AA151B"/>
      <rect y="15" width="20" height="3" fill="#AA151B"/>
    </svg>
  )
}
