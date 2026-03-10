import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Library         from '../../components/facilities/Library'
import Labs            from '../../components/facilities/Labs'
import Transport       from '../../components/facilities/Transport'
import Playground      from '../../components/facilities/Playground'
import SmartClasses    from '../../components/facilities/SmartClasses'
import HostelHighlight from '../../components/facilities/HostelHighlight'

const TABS = [
  { id:'hostel',  em:'🏠', label:'Hostel',        highlight:true  },
  { id:'library', em:'📚', label:'Library'                        },
  { id:'labs',    em:'🔬', label:'Laboratories'                   },
  { id:'transport',em:'🚌',label:'Transport'                      },
  { id:'sports',  em:'🏟️', label:'Playground & Sports'            },
  { id:'smart',   em:'💻', label:'Smart Classes'                  },
]

export default function FacilitiesPage() {
  const [active, setActive] = useState('hostel')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [active])

  return (
    <>
      {/* ── PAGE BANNER ── */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">🏗️ Facilities</div>
          <h1 className="pb-title">World-Class <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Facilities</span></h1>
          <p className="pb-sub">Modern infrastructure, safe hostel, smart classes, 8 labs, 22 buses — everything your child needs</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span className="bc-cur">Facilities</span>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))', padding:'20px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'16px'}}>
          {[['10 Acres','Campus'],['8','Labs'],['73','Classrooms'],['22','Buses'],['5,000+','Library Books'],['CCTV','All Areas']].map(([n,l])=>(
            <div key={l} style={{textAlign:'center',color:'#fff'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',lineHeight:'1'}}>{n}</div>
              <div style={{fontSize:'10px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{background:'var(--bg)', minHeight:'60vh'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'48px 20px'}}>

          {/* Tab nav */}
          <div className="rv" style={{display:'flex', gap:'6px', flexWrap:'wrap', background:'var(--bg2)', padding:'6px', borderRadius:'18px', border:'1.5px solid var(--brd)', marginBottom:'40px'}}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)} style={{
                flex:1, minWidth:'120px', padding:'13px 14px',
                borderRadius:'12px', border:'none', cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', fontWeight:'700',
                transition:'all .28s cubic-bezier(.34,1.56,.64,1)',
                background: t.highlight && active===t.id
                  ? 'linear-gradient(135deg,var(--or),var(--gd))'
                  : active===t.id ? 'var(--card)' : 'transparent',
                color: active===t.id ? (t.highlight ? '#fff' : 'var(--or)') : 'var(--txt2)',
                boxShadow: active===t.id
                  ? t.highlight ? '0 6px 22px var(--shd)' : '0 4px 18px var(--shd)'
                  : 'none',
                transform: active===t.id ? 'scale(1.03)' : 'scale(1)',
              }}>
                <span style={{marginRight:'6px'}}>{t.em}</span>{t.label}
                {t.highlight && active!==t.id && (
                  <span style={{fontSize:'9px',fontWeight:'800',background:'var(--or)',color:'#fff',padding:'2px 6px',borderRadius:'50px',marginLeft:'6px',letterSpacing:'.5px'}}>★</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={active} style={{animation:'fU .35s ease both'}}>
            {active === 'hostel'   && <HostelHighlight embedded />}
            {active === 'library'  && <Library         embedded />}
            {active === 'labs'     && <Labs             embedded />}
            {active === 'transport'&& <Transport        embedded />}
            {active === 'sports'   && <Playground       embedded />}
            {active === 'smart'    && <SmartClasses     embedded />}
          </div>
        </div>
      </div>
    </>
  )
}