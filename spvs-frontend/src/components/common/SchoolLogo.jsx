// Reusable SVG school logo — used in Navbar, Footer, Preloader
export default function SchoolLogo({ size = 58 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="#E8761A"/>
      <circle cx="60" cy="60" r="50" fill="#F5B800"/>
      <circle cx="60" cy="60" r="46" fill="#FFD94A"/>
      <g fill="#1a6b3a">
        <polygon points="60,6 64,20 56,20"/>
        <polygon points="60,100 64,114 56,114"/>
        <polygon points="6,60 20,64 20,56"/>
        <polygon points="100,60 114,64 114,56"/>
        <polygon points="15,15 27,27 20,29"/>
        <polygon points="105,15 93,27 100,29"/>
        <polygon points="15,105 27,93 20,91"/>
        <polygon points="105,105 93,93 100,91"/>
        <polygon points="37,10 39,24 33,22"/>
        <polygon points="83,10 81,24 87,22"/>
      </g>
      <circle cx="60" cy="60" r="30" fill="white"/>
      <text x="60" y="76" textAnchor="middle" fontSize="38" fill="#DC3522" fontFamily="serif" fontWeight="bold">ॐ</text>
      <path id="tc-logo" d="M60,60 m-46,0 a46,46 0 1,1 92,0" fill="none"/>
      <text fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif" letterSpacing=".8">
        <textPath href="#tc-logo">SANT PATHIK VIDYALAYA  PASHUPATI NAGAR  BAHRAICH</textPath>
      </text>
      <rect x="8" y="95" width="104" height="17" rx="5" fill="#4A2C8A"/>
      <text x="60" y="107" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.2">WORK IS WORSHIP</text>
    </svg>
  )
}