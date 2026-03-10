import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ── School SVG Logo ──────────────────────────────────────
function SchoolLogo({ size = 58 }) {
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
      </g>
      <circle cx="60" cy="60" r="30" fill="white"/>
      <text x="60" y="76" textAnchor="middle" fontSize="38" fill="#DC3522" fontFamily="serif" fontWeight="bold">ॐ</text>
      <path id="tc-nav" d="M60,60 m-46,0 a46,46 0 1,1 92,0" fill="none"/>
      <text fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif" letterSpacing=".7">
        <textPath href="#tc-nav">SANT PATHIK VIDYALAYA  PASHUPATI NAGAR</textPath>
      </text>
      <rect x="8" y="95" width="104" height="16" rx="5" fill="#4A2C8A"/>
      <text x="60" y="106.5" textAnchor="middle" fontSize="6.8" fill="white" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">WORK IS WORSHIP</text>
    </svg>
  )
}

// ── Dropdown data ────────────────────────────────────────
const ABOUT_DROPDOWN = [
  { to: '/about#history',    emoji: '🏛️', label: 'School History',      desc: 'Our journey since 1987' },
  { to: '/about#vision',     emoji: '🎯', label: 'Vision & Mission',   desc: 'Our guiding principles' },
  { to: '/about#director',   emoji: '👔',  label: "Director's Message",  desc: 'Message from the Director' },
  { to: '/about#principal',  emoji: '👩‍🏫', label: "Principal's Message", desc: 'Message from the Principal' },
  { to: '/academics/faculty',emoji: '👨‍🏫', label: 'Faculty & Staff',     desc: '64+ expert educators' },
  { to: '/why-choose-us',    emoji: '⭐', label: 'Why Choose Us',       desc: 'What makes SPVS special' },
]

const FACILITIES_DROPDOWN = [
  { to: '/facilities#hostel',     emoji: '🏠', label: 'Hostel',          desc: 'Safe residential facility',    highlight: true },
  { to: '/facilities#labs',       emoji: '🔬', label: 'Science Labs',    desc: 'Physics · Chemistry · Bio' },
  { to: '/facilities#library',    emoji: '📖', label: 'Library',         desc: '10,000+ books & e-resources' },
  { to: '/facilities#smartclass', emoji: '🖥️', label: 'Smart Classrooms', desc: 'Digital learning boards' },
  { to: '/facilities#transport',  emoji: '🚌', label: 'Transport',       desc: 'GPS-tracked buses all routes' },
  { to: '/facilities#sports',     emoji: '⚽', label: 'Sports Ground',   desc: 'Cricket · Football · Athletics' },
]

// ── Reusable Dropdown panel ──────────────────────────────
function DropPanel({ items, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 14px)', left: '50%',
      transform: 'translateX(-50%)',
      background: '#ffffff',
      border: '1.5px solid rgba(232,118,26,0.15)',
      borderRadius: '20px',
      boxShadow: '0 28px 70px rgba(232,118,26,0.18), 0 6px 24px rgba(0,0,0,0.07)',
      padding: '10px',
      minWidth: '290px',
      zIndex: 500,
      animation: 'dropIn 0.28s cubic-bezier(.34,1.56,.64,1) both',
    }}>
      {/* Arrow */}
      <div style={{
        position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
        width: '14px', height: '14px',
        background: '#fff',
        border: '1.5px solid rgba(232,118,26,0.15)',
        borderBottom: 'none', borderRight: 'none',
      }}/>

      {items.map(({ to, emoji, label, desc, highlight }) => (
        <Link key={to} to={to} onClick={onClose} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '10px 14px', borderRadius: '13px', marginBottom: '3px',
          textDecoration: 'none',
          background: highlight ? 'linear-gradient(135deg, #FFF3E0, #FFF8DC)' : 'transparent',
          border: `1.5px solid ${highlight ? 'rgba(232,118,26,0.28)' : 'transparent'}`,
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = highlight ? 'linear-gradient(135deg,#FFE4BC,#FFF3C0)' : 'rgba(232,118,26,0.06)'
            e.currentTarget.style.borderColor = 'rgba(232,118,26,0.25)'
            e.currentTarget.style.transform = 'translateX(4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = highlight ? 'linear-gradient(135deg,#FFF3E0,#FFF8DC)' : 'transparent'
            e.currentTarget.style.borderColor = highlight ? 'rgba(232,118,26,0.28)' : 'transparent'
            e.currentTarget.style.transform = ''
          }}
        >
          <span style={{
            width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
            background: highlight ? 'linear-gradient(135deg,#E8761A,#F5B800)' : 'linear-gradient(135deg,#FFF3E0,#FEF0D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            boxShadow: highlight ? '0 4px 14px rgba(232,118,26,0.4)' : 'none',
          }}>{emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: '13.5px', fontWeight: highlight ? 800 : 600,
              color: highlight ? '#C45F0A' : '#2C1500',
              display: 'flex', alignItems: 'center', gap: '7px',
            }}>
              {label}
              {highlight && (
                <span style={{
                  fontSize: '9px', fontWeight: 900, letterSpacing: '1px',
                  textTransform: 'uppercase', color: '#fff',
                  background: 'linear-gradient(135deg,#E8761A,#F5B800)',
                  padding: '2px 8px', borderRadius: '50px',
                }}>⭐ TOP PICK</span>
              )}
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11.5px', color: '#B87832', marginTop: '2px' }}>{desc}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ── Single Nav Item (with optional dropdown) ─────────────
function NavItem({ to, label, dropdown, isActive, onClose }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef()

  const enter = () => { clearTimeout(timerRef.current); setOpen(true) }
  const leave = () => { timerRef.current = setTimeout(() => setOpen(false), 160) }
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const baseStyle = {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: '13.5px', fontWeight: 600,
    color: isActive ? '#E8761A' : '#7A4010',
    padding: '7px 13px', borderRadius: '10px',
    textDecoration: 'none', transition: 'all 0.2s',
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    background: 'transparent', border: 'none', cursor: 'pointer',
    position: 'relative',
  }

  const activeBar = isActive ? (
    <span style={{
      position: 'absolute', bottom: '2px', left: '13px', right: '13px',
      height: '2.5px', borderRadius: '2px',
      background: 'linear-gradient(90deg,#E8761A,#F5B800)',
    }}/>
  ) : null

  if (!dropdown) {
    return (
      <Link to={to} style={baseStyle}
        onMouseEnter={e => { e.currentTarget.style.color = '#E8761A'; e.currentTarget.style.background = 'rgba(232,118,26,0.07)' }}
        onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#E8761A' : '#7A4010'; e.currentTarget.style.background = 'transparent' }}
      >
        {label}{activeBar}
      </Link>
    )
  }

  return (
    <div style={{ position: 'relative' }} onMouseEnter={enter} onMouseLeave={leave}>
      <button style={{ ...baseStyle, color: open || isActive ? '#E8761A' : '#7A4010', background: open ? 'rgba(232,118,26,0.07)' : 'transparent' }}>
        {label}
        {activeBar}
        {/* Chevron */}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
          style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : '' }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <DropPanel items={dropdown} onClose={() => { setOpen(false); if (onClose) onClose() }} />}
    </div>
  )
}

// ════════ MAIN NAVBAR ════════════════════════════════════
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobile] = useState(false)
  const [expanded, setExpanded] = useState(null) // mobile accordion
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobile(false); setExpanded(null) }, [location])

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to.split('#')[0])

  const NAV = [
    { to: '/',           label: 'Home' },
    { to: '/about',      label: 'About Us',   dropdown: ABOUT_DROPDOWN },
    { to: '/academics',  label: 'Academics' },
    { to: '/blog',       label: 'Blogs' },
    { to: '/facilities', label: 'Facilities', dropdown: FACILITIES_DROPDOWN },
    { to: '/downloads',  label: 'Certificates' },
    { to: '/contact',    label: 'Contact Us' },
  ]

  return (
    <>
      {/* ══════ TOPBAR ══════ */}
      <div style={{ background: 'linear-gradient(90deg,#1C0A00,#3D1A00)', padding: '7px 0', zIndex: 100, position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[['📞', '+91 9198783830'], ['✉️', 'spvbrh@gmail.com'], ['📍', 'Pashupati Nagar, Bahraich, 271802']].map(([ic, tx]) => (
              <span key={tx} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,.6)', fontFamily: "'DM Sans',sans-serif" }}>
                {ic} <span style={{ color: '#FFCF40' }}>{tx}</span>
              </span>
            ))}
          </div>
          <div style={{ flex: 1, overflow: 'hidden', minWidth: 0, maxWidth: '400px' }}>
            <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'tbmq 30s linear infinite' }}>
              {['🎉 Admissions Open 2024–25!', '🏆 100% Board Results', '📚 CBSE Affiliated · Est. 1987', '🚌 Transport Available All Routes'].map(t => (
                <span key={t} style={{ color: '#FFCF40', margin: '0 32px', fontSize: '12px', fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[['f','#'],['▶','#'],['in','#']].map(([l,h]) => (
              <a key={l} href={h} style={{ width: '24px', height: '24px', borderRadius: '5px', background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.7)', fontSize: '11px', fontWeight: 700, textDecoration: 'none', transition: 'all .2s', fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8761A'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.7)' }}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ STICKY HEADER ══════ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'rgba(255,253,248,.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(232,118,26,.13)',
        boxShadow: scrolled ? '0 4px 40px rgba(232,118,26,.18)' : '0 2px 16px rgba(232,118,26,.06)',
        transition: 'all .3s',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '16px', height: '76px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '13px', flexShrink: 0, textDecoration: 'none' }}>
            <div style={{
              width: '62px', height: '62px', borderRadius: '50%', overflow: 'hidden',
              border: '2.5px solid rgba(245,184,0,.4)', boxShadow: '0 4px 18px rgba(245,184,0,.22)',
              background: '#FFF8DC', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all .5s cubic-bezier(.34,1.56,.64,1)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(8deg) scale(1.06)'; e.currentTarget.style.borderColor = '#F5B800' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(245,184,0,.4)' }}
            ><SchoolLogo size={58}/></div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', fontWeight: 700, color: '#C45F0A', lineHeight: 1.2 }}>Sant Pathik Vidyalaya</div>
              <div style={{ fontSize: '10px', color: '#F5B800', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" }}>Work is Worship — ॐ</div>
              <div style={{ fontSize: '10px', color: '#B87832', fontFamily: "'DM Sans',sans-serif" }}>CBSE Affiliated · Est. 1987 · Bahraich, UP</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="spvs-dnav" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px' }}>
            {NAV.map(item => (
              <NavItem key={item.to} {...item} isActive={isActive(item.to)} />
            ))}

            {/* ── Glowing CTA ── */}
            <div style={{ marginLeft: '12px', position: 'relative' }}>
              <div className="cta-pulse-ring"/>
              <Link to="/contact" className="spvs-cta-btn">
                <span style={{ fontSize: '16px' }}>📋</span>
                Enroll Now
                <span style={{
                  background: 'rgba(255,255,255,.22)', backdropFilter: 'blur(4px)',
                  fontSize: '9px', fontWeight: 900, letterSpacing: '1.2px',
                  padding: '3px 8px', borderRadius: '50px', textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,.3)',
                }}>OPEN</span>
              </Link>
            </div>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setMobile(true)} className="spvs-hamburger"
            style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', marginLeft: 'auto' }}>
            {[0,1,2].map(i => <span key={i} style={{ width: '24px', height: '2.5px', background: '#E8761A', borderRadius: '3px', display: 'block' }}/>)}
          </button>
        </div>
      </header>

      {/* ══════ MOBILE NAV ══════ */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#FFFDF8', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '72px 20px 40px' }}>
          <button onClick={() => setMobile(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(232,118,26,.1)', border: '1.5px solid rgba(232,118,26,.2)', borderRadius: '10px', padding: '8px 14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', color: '#7A4010', fontFamily: "'DM Sans',sans-serif" }}>✕ Close</button>

          {/* Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1.5px solid rgba(232,118,26,.15)' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(245,184,0,.4)', background: '#FFF8DC', flexShrink: 0 }}><SchoolLogo size={44}/></div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '15px', fontWeight: 700, color: '#C45F0A' }}>Sant Pathik Vidyalaya</div>
              <div style={{ fontSize: '11px', color: '#B87832', fontFamily: "'DM Sans',sans-serif" }}>CBSE · Est. 1987 · Bahraich, UP</div>
            </div>
          </div>

          {NAV.map(({ to, label, dropdown }) => (
            <div key={to}>
              {dropdown ? (
                <>
                  <button onClick={() => setExpanded(expanded === to ? null : to)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', marginBottom: '2px', background: expanded === to ? 'rgba(232,118,26,.08)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '15px', fontWeight: 600, color: isActive(to) ? '#E8761A' : '#2C1500' }}>
                    {label}
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform .25s', transform: expanded === to ? 'rotate(180deg)' : '' }}>
                      <path d="M2 4l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {expanded === to && (
                    <div style={{ paddingLeft: '10px', marginBottom: '6px' }}>
                      {dropdown.map(({ to: dTo, emoji, label: dl, highlight }) => (
                        <Link key={dTo} to={dTo} onClick={() => setMobile(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', borderRadius: '10px', marginBottom: '2px', background: highlight ? 'linear-gradient(135deg,#FFF3E0,#FFF8DC)' : 'transparent', border: highlight ? '1.5px solid rgba(232,118,26,.22)' : 'none', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: highlight ? 800 : 500, color: highlight ? '#C45F0A' : '#7A4010' }}>
                          <span>{emoji}</span>{dl}
                          {highlight && <span style={{ marginLeft: 'auto', fontSize: '9px', background: 'linear-gradient(135deg,#E8761A,#F5B800)', color: '#fff', padding: '2px 7px', borderRadius: '50px', fontWeight: 800 }}>⭐ TOP PICK</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={to} onClick={() => setMobile(false)} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderRadius: '12px', marginBottom: '2px', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '15px', fontWeight: 600, color: isActive(to) ? '#E8761A' : '#2C1500', background: isActive(to) ? 'rgba(232,118,26,.07)' : 'transparent' }}>
                  {label}
                </Link>
              )}
            </div>
          ))}

          <Link to="/contact" onClick={() => setMobile(false)} style={{ marginTop: '20px', padding: '15px 20px', background: 'linear-gradient(135deg,#E8761A,#C45F0A)', color: '#fff', borderRadius: '14px', fontFamily: "'DM Sans',sans-serif", fontSize: '15px', fontWeight: 800, textDecoration: 'none', textAlign: 'center', boxShadow: '0 8px 28px rgba(232,118,26,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            📋 Enroll Now
            <span style={{ background: 'rgba(255,255,255,.22)', fontSize: '10px', padding: '2px 8px', borderRadius: '50px', fontWeight: 900, letterSpacing: '1px' }}>OPEN</span>
          </Link>
        </div>
      )}

      {/* ══════ STYLES ══════ */}
      <style>{`
        @keyframes tbmq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        @keyframes dropIn {
          from { opacity:0; transform:translateX(-50%) translateY(-12px) scale(.95); }
          to   { opacity:1; transform:translateX(-50%) translateY(0)       scale(1); }
        }

        @keyframes ctaRing {
          0%,100% { transform:scale(1);   opacity:.6; }
          50%     { transform:scale(1.08); opacity:1; }
        }

        @keyframes ctaShine {
          0%   { left:-60%; }
          100% { left:130%; }
        }

        .cta-pulse-ring {
          position:absolute; inset:-4px; border-radius:15px;
          background: linear-gradient(135deg,#E8761A,#F5B800,#FF9A3C);
          animation: ctaRing 2.4s ease-in-out infinite;
          z-index:0;
        }

        .spvs-cta-btn {
          position:relative; z-index:1; overflow:hidden;
          display:inline-flex; align-items:center; gap:8px;
          background: linear-gradient(135deg,#E8761A,#C45F0A);
          color:#fff !important;
          font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:800;
          padding:11px 20px; border-radius:12px;
          text-decoration:none; white-space:nowrap;
          letter-spacing:.3px;
          box-shadow:0 6px 24px rgba(232,118,26,.5);
          transition:all .25s;
        }
        .spvs-cta-btn span, .spvs-cta-btn * {
          position:relative; z-index:2; color:inherit;
        }
        .spvs-cta-btn:hover { color:#fff !important; }
        .spvs-cta-btn::after {
          content:'';
          position:absolute; top:0; left:-60%;
          width:40%; height:100%;
          z-index:1;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transform:skewX(-20deg);
          animation:ctaShine 3s ease-in-out infinite;
        }
        .spvs-cta-btn:hover {
          transform:translateY(-3px) scale(1.03);
          box-shadow:0 12px 36px rgba(232,118,26,.6);
        }

        @media (max-width:960px) {
          .spvs-dnav      { display:none !important; }
          .spvs-hamburger { display:flex !important; }
        }
      `}</style>
    </>
  )
}