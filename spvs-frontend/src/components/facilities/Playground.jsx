import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SPORTS = [
  { em:'🏏', name:'Cricket',       desc:'Full-size cricket ground with practice nets and pitch preparation facilities.' },
  { em:'⚽', name:'Football',      desc:'Standard football field with goal posts. Regular inter-class and district tournaments.' },
  { em:'🏐', name:'Volleyball',    desc:'Two volleyball courts. CBSE cluster and district level champions.' },
  { em:'🏸', name:'Badminton',     desc:'Indoor badminton court with proper lighting and flooring.' },
  { em:'🤼', name:'Kabaddi',       desc:'National level kabaddi team. District and CBSE cluster champions.' },
  { em:'🏃', name:'Athletics',     desc:'Running track for sprint and long-distance training. Shot put & long jump.' },
  { em:'🧘', name:'Yoga & PT',     desc:'Daily morning PT and yoga sessions for all students.' },
  { em:'🏆', name:'Annual Sports', desc:'Grand Annual Sports Day celebrated every year with 500+ participants.' },
]

const ACHIEVEMENTS = [
  { em:'🥇', title:'Kabaddi Champions', sub:'CBSE Cluster Level', year:'2024' },
  { em:'🥈', title:'District Sports Champions', sub:'Athletics & Volleyball', year:'2024' },
  { em:'🏅', title:'CBSE National Essay', sub:'Gold Medal Winner', year:'2023' },
  { em:'🥇', title:'Inter-School Cricket', sub:'Bahraich District', year:'2023' },
]

export default function Playground({ embedded = false }) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  
  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">🏗️ Facilities</div>
            <h1 className="pb-title">Playground & <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Sports</span></h1>
            <p className="pb-sub">10-acre campus with world-class sports facilities — nurturing champions since 1987</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Playground & Sports</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Hero */}
          <div className="" style={{padding:'32px', borderRadius:'22px', background:'linear-gradient(135deg,var(--dark),var(--dark2))', marginBottom:'32px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'28px', alignItems:'center', border:'1px solid rgba(245,184,0,.1)'}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif", fontSize:'30px', fontWeight:'700', color:'#fff', marginBottom:'12px', lineHeight:'1.3'}}>Sports at SPVS — <span style={{color:'var(--gd2)'}}>Beyond the Classroom</span></div>
              <p style={{fontSize:'14px', color:'rgba(255,255,255,.55)', lineHeight:'1.75', marginBottom:'20px'}}>
                Our sprawling 10-acre campus provides ample space for all major sports. Physical education is a core part of our curriculum — we believe a healthy body builds a healthy mind.
              </p>
              <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
                {[['10 Acres','Campus'],['8+','Sports'],['22 Buses','Transport'],['Daily PT','& Yoga']].map(([n,l])=>(
                  <div key={l} style={{textAlign:'center', padding:'12px 16px', background:'rgba(255,255,255,.06)', borderRadius:'12px', border:'1px solid rgba(255,255,255,.08)'}}>
                    <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:'var(--gd2)'}}>{n}</div>
                    <div style={{fontSize:'10px', color:'rgba(255,255,255,.4)', marginTop:'3px', letterSpacing:'.5px'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
              {ACHIEVEMENTS.map((a,i) => (
                <div key={i} style={{padding:'16px', borderRadius:'14px', background:'rgba(245,184,0,.08)', border:'1px solid rgba(245,184,0,.15)', textAlign:'center'}}>
                  <div style={{fontSize:'28px', marginBottom:'8px'}}>{a.em}</div>
                  <div style={{fontSize:'12px', fontWeight:'700', color:'var(--gd2)', marginBottom:'3px'}}>{a.title}</div>
                  <div style={{fontSize:'10px', color:'rgba(255,255,255,.4)'}}>{a.sub}</div>
                  <div style={{fontSize:'10px', color:'var(--or)', marginTop:'3px', fontWeight:'700'}}>{a.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sports grid */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:'14px'}}>
            {SPORTS.map((s,i) => (
              <div key={i} className="" style={{
                padding:'22px', borderRadius:'16px', background:'var(--card)',
                border:'1.5px solid var(--brd)', cursor:'default',
                transition:'all .35s cubic-bezier(.34,1.56,.64,1)'
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 14px 36px var(--shd)';e.currentTarget.style.borderColor='rgba(232,118,26,.3)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
              >
                <div style={{fontSize:'38px', marginBottom:'12px'}}>{s.em}</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'var(--dark)', marginBottom:'7px'}}>{s.name}</div>
                <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.6'}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}