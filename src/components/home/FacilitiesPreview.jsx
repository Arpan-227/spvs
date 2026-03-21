import { useState, useEffect } from 'react'

const FACILITIES = [
  { em:'🔬', name:'Science Labs', desc:'Physics, Chemistry, Biology labs — fully equipped with modern apparatus for practical learning.' },
  { em:'💻', name:'Computer Labs', desc:'2 computer labs with high-speed internet, latest systems and modern software tools.' },
  { em:'📚', name:'Library', desc:'Well-stocked library with books, magazines, newspapers and digital resources for all classes.' },
  { em:'🏟️', name:'Sports Stadium', desc:'Sports mini stadium with all synthetic playgrounds — Kabaddi, Volleyball, Athletics and more.' },
  { em:'🎨', name:'Art & Music', desc:'Dedicated art room and music studio for vocal and instrumental training by qualified teachers.' },
  { em:'🤖', name:'STEM Tinkering Lab', desc:'STEM & Junior Tinkering Lab for innovative minds — robotics, projects and hands-on learning.' },
  { em:'📡', name:'Smart Classrooms', desc:'Digital classrooms with smart boards and computer-aided learning in all sections.' },
  { em:'🏠', name:'Boys Hostel', desc:'Safe, secure 24×7 boys hostel with visiting doctor, yoga, sports and clean mess facilities.' },
]

function getVisible() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth < 600) return 1
  if (window.innerWidth < 900) return 2
  if (window.innerWidth < 1200) return 3
  return 4
}

export default function FacilitiesPreview() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(getVisible)

  useEffect(() => {
    function handleResize() {
      const v = getVisible()
      setVisible(v)
      setIdx(i => Math.min(i, Math.max(0, FACILITIES.length - v)))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIdx = Math.max(0, FACILITIES.length - visible)
  const cardWidthPct = 100 / visible
  const gap = 20
  const translateX = `calc(-${idx * cardWidthPct}% - ${idx * gap}px)`

  return (
    <section className="fac-sect sect">
      <style>{`
        .fac-overflow {
          overflow: hidden;
          width: 100%;
        }
        .fac-track {
          display: flex;
          gap: 20px;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .fac-card {
          flex: 0 0 calc((100% - ${(visible - 1) * gap}px) / ${visible});
          min-width: 0;
          box-sizing: border-box;
        }
        @media (max-width: 599px) {
          .fac-card {
            flex: 0 0 calc(100% - 0px) !important;
          }
        }
        @media (min-width: 600px) and (max-width: 899px) {
          .fac-card {
            flex: 0 0 calc((100% - 20px) / 2) !important;
          }
        }
        @media (min-width: 900px) and (max-width: 1199px) {
          .fac-card {
            flex: 0 0 calc((100% - 40px) / 3) !important;
          }
        }
        @media (min-width: 1200px) {
          .fac-card {
            flex: 0 0 calc((100% - 60px) / 4) !important;
          }
        }
        .fac-navs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
        }
        .fac-nb {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid rgba(232,118,26,0.3);
          background: #fff;
          color: #E8761A;
          font-size: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          line-height: 1;
        }
        .fac-nb:hover:not(:disabled) {
          background: linear-gradient(135deg,#E8761A,#F5B800);
          color: #fff;
          border-color: transparent;
          transform: scale(1.08);
        }
        .fac-nb:disabled {
          opacity: 0.35;
          cursor: default;
        }
      `}</style>

      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Our Facilities</div>
          <h2 className="sec-title">World-Class <span className="hl">Facilities</span></h2>
          <div className="s-bar"></div>
          <p className="s-desc">Modern infrastructure designed to inspire learning and all-round development.</p>
        </div>

        <div className="fac-overflow">
          <div className="fac-track" style={{ transform: `translateX(${translateX})` }}>
            {FACILITIES.map((f, i) => (
              <div className="fac-card rv3d" key={i}>
                <div className="fac-cir fac-em">{f.em}</div>
                <div className="fac-name">{f.name}</div>
                <div className="fac-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fac-navs">
          <button
            className="fac-nb"
            disabled={idx === 0}
            onClick={() => setIdx(i => Math.max(0, i - 1))}>
            ‹
          </button>
          <button
            className="fac-nb"
            disabled={idx >= maxIdx}
            onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}>
            ›
          </button>
        </div>
      </div>
    </section>
  )
}