import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AMENITIES = [
  { em:'🛏️',  title:'Comfortable Rooms',     desc:'Spacious dormitory-style rooms with proper ventilation, beds, study tables and cupboards for each student.' },
  { em:'🍽️',  title:'Nutritious Meals',       desc:'3 meals + evening snacks daily. Hygienic kitchen with CCTV. Balanced vegetarian diet planned by nutrition expert.' },
  { em:'📖',  title:'Evening Study Hours',    desc:'Dedicated 2-hour supervised study time every evening with subject teachers available for doubt-clearing.' },
  { em:'🔒',  title:'24×7 Security',          desc:'CCTV cameras, security guards, biometric entry. Parents notified instantly for any concern via phone.' },
  { em:'🏃',  title:'Morning PT & Yoga',      desc:'Daily morning physical training and yoga sessions to build discipline, fitness and mental well-being.' },
  { em:'💊',  title:'Medical Care',           desc:'Resident nurse, first-aid room and tie-up with local hospital. Regular health check-ups for all hostel students.' },
  { em:'📺',  title:'Recreation Time',        desc:'Supervised recreation with TV, indoor games and weekend activities to ensure balanced student life.' },
  { em:'👨‍👩‍👧', title:'Regular Parent Updates', desc:'Monthly parent meetings, weekly phone call schedule and instant alerts for any issue or emergency.' },
]

const RULES = [
  'Mobile phones not allowed inside hostel premises',
  'Lights out at 10:00 PM — wake up at 5:30 AM',
  'Leave permitted only for registered guardians',
  'Ragging strictly prohibited — zero tolerance policy',
  'Weekly laundry service provided',
  'Sunday is holiday — recreational activities organised',
]

export default function HostelHighlight({ embedded = false }) {
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
        <div className="page-banner" style={{background:'linear-gradient(135deg,var(--dark) 0%,#1a0a00 60%,rgba(232,118,26,.15) 100%)'}}>
          <div className="pb-inner">
            <div className="pb-chip" style={{background:'rgba(232,118,26,.15)',borderColor:'rgba(232,118,26,.3)'}}>🏠 Special Highlight</div>
            <h1 className="pb-title">Boys <span style={{color:'var(--or)',fontStyle:'italic'}}>Hostel</span></h1>
            <p className="pb-sub">A safe, disciplined and nurturing home-away-from-home for outstation students</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Hostel</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Bold CTA hero — stacks on mobile */}
          <div style={{
            background:'linear-gradient(135deg,var(--or),var(--or3),var(--gd))',
            borderRadius:'22px', padding:'28px', marginBottom:'28px',
            position:'relative', overflow:'hidden',
            boxShadow:'0 16px 50px rgba(232,118,26,.35)',
          }}>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,.1),transparent)',pointerEvents:'none'}}></div>

            {/* Stats row — mobile only, shown above content */}
            <div className="hostel-stats-mob" style={{display:'none', gap:'8px', marginBottom:'20px', flexWrap:'wrap'}}>
              {[['Boys Only','Hostel Type'],['24×7','Security'],['3 Meals','+ Snacks']].map(([n,l])=>(
                <div key={l} style={{background:'rgba(255,255,255,.2)',borderRadius:'10px',padding:'8px 14px',backdropFilter:'blur(4px)',display:'flex',gap:'6px',alignItems:'center'}}>
                  <span style={{fontWeight:'800',color:'#fff',fontSize:'13px'}}>{n}</span>
                  <span style={{fontSize:'11px',color:'rgba(255,255,255,.75)'}}>{l}</span>
                </div>
              ))}
            </div>

            <div className="hostel-hero-inner" style={{display:'grid', gridTemplateColumns:'1fr auto', gap:'28px', alignItems:'center', position:'relative', zIndex:2}}>
              <div>
                <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,.2)',borderRadius:'50px',padding:'5px 14px',fontSize:'11px',fontWeight:'800',letterSpacing:'1.5px',textTransform:'uppercase',color:'#fff',marginBottom:'14px'}}>
                  🏠 Boys Only · Outstation Students
                </div>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#fff',marginBottom:'12px',lineHeight:'1.25'}}>
                  A Safe Home Away From Home
                </h2>
                <p style={{fontSize:'14px',color:'rgba(255,255,255,.8)',lineHeight:'1.7',marginBottom:'20px'}}>
                  Our Boys Hostel provides a structured, disciplined and caring environment — ensuring your child gets the best academic support, healthy meals and round-the-clock safety.
                </p>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  <Link to="/contact" style={{padding:'11px 22px',background:'#fff',color:'var(--or2)',borderRadius:'50px',textDecoration:'none',fontWeight:'800',fontSize:'13px',boxShadow:'0 4px 16px rgba(0,0,0,.15)'}}>
                    📋 Enquire Now →
                  </Link>
                  <a href="tel:+919198783830" style={{padding:'11px 22px',background:'rgba(255,255,255,.2)',color:'#fff',borderRadius:'50px',textDecoration:'none',fontWeight:'800',fontSize:'13px',border:'1.5px solid rgba(255,255,255,.4)'}}>
                    📞 Call School
                  </a>
                </div>
              </div>

              {/* Stats column — desktop only */}
              <div className="hostel-stats-desk" style={{textAlign:'center',flexShrink:0}}>
                <div style={{fontSize:'72px',marginBottom:'12px'}}>🏠</div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {[['Boys Only','Hostel Type'],['24×7','Security'],['3 Meals','+ Snacks']].map(([n,l])=>(
                    <div key={l} style={{background:'rgba(255,255,255,.15)',borderRadius:'10px',padding:'8px 16px',textAlign:'center',backdropFilter:'blur(4px)'}}>
                      <span style={{fontWeight:'800',color:'#fff',fontSize:'13px'}}>{n}</span>
                      <span style={{fontSize:'11px',color:'rgba(255,255,255,.7)',marginLeft:'6px'}}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px',marginBottom:'24px'}}>
            {AMENITIES.map((a,i) => (
              <div key={i} style={{padding:'20px',borderRadius:'16px',background:'var(--card)',border:'1.5px solid var(--brd)'}}>
                <div style={{fontSize:'30px',marginBottom:'10px'}}>{a.em}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'var(--dark)',marginBottom:'6px'}}>{a.title}</div>
                <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65'}}>{a.desc}</div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{padding:'24px',borderRadius:'18px',background:'var(--bg2)',border:'1.5px solid var(--brd)'}}>
            <div style={{fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)',marginBottom:'14px'}}>📋 Hostel Rules & Discipline</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'10px'}}>
              {RULES.map((r,i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'13px',color:'var(--txt2)',padding:'10px 12px',background:'var(--card)',borderRadius:'10px',border:'1px solid var(--brd)'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'rgba(232,118,26,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:'800',color:'var(--or)',flexShrink:0,marginTop:'1px'}}>{i+1}</div>
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hostel-hero-inner { grid-template-columns: 1fr !important; }
          .hostel-stats-desk { display: none !important; }
          .hostel-stats-mob  { display: flex !important; }
        }
      `}</style>
    </>
  )
}