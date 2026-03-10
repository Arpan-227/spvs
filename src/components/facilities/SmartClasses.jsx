import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const FEATURES = [
  { em:'📺', title:'Interactive Smart Boards',  desc:'HD interactive flat-panel displays in senior classrooms replacing traditional blackboards.' },
  { em:'🎬', title:'Animated 3D Content',        desc:'CBSE-aligned animated video lessons for all subjects making complex topics easy to understand.' },
  { em:'📡', title:'High-Speed Internet',         desc:'Campus-wide Wi-Fi ensuring seamless streaming and online resource access in all smart classrooms.' },
  { em:'🎤', title:'Audio-Visual System',         desc:'Surround sound speakers and microphone system for clear communication in large classrooms.' },
  { em:'💡', title:'Digital Lesson Plans',        desc:'Teachers use digital lesson plans, presentations and e-content aligned with NCERT curriculum.' },
  { em:'📊', title:'Real-Time Assessment',        desc:'Digital quizzes and instant feedback tools helping teachers monitor student understanding live.' },
]

export default function SmartClasses({ embedded = false }) {
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
            <h1 className="pb-title">Smart <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Classrooms</span></h1>
            <p className="pb-sub">Technology-powered learning — interactive boards, 3D content and digital assessments</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Smart Classes</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Hero banner */}
          <div className="" style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))', borderRadius:'24px', padding:'36px', marginBottom:'32px', display:'grid', gridTemplateColumns:'1fr auto', gap:'28px', alignItems:'center', border:'1px solid rgba(245,184,0,.1)'}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:'700', color:'#fff', marginBottom:'12px'}}>
                Learning in the <span style={{color:'var(--gd2)'}}>21st Century</span>
              </div>
              <p style={{fontSize:'14.5px', color:'rgba(255,255,255,.5)', lineHeight:'1.75', marginBottom:'0', maxWidth:'500px'}}>
                SPVS has integrated smart classroom technology across senior classes to make lessons more engaging, interactive and effective. Our teachers are fully trained to deliver digital-first lessons.
              </p>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'10px', flexShrink:0}}>
              {[['73','Classrooms Total'],['25+','Smart Equipped'],['100%','Senior Classes']].map(([n,l])=>(
                <div key={l} style={{padding:'12px 20px', borderRadius:'12px', background:'rgba(245,184,0,.08)', border:'1px solid rgba(245,184,0,.15)', textAlign:'center', minWidth:'140px'}}>
                  <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--gd2)'}}>{n}</div>
                  <div style={{fontSize:'10px', color:'rgba(255,255,255,.4)', letterSpacing:'.5px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'16px', marginBottom:'28px'}}>
            {FEATURES.map((f,i) => (
              <div key={i} className="" style={{
                padding:'24px', borderRadius:'18px', background:'var(--card)',
                border:'1.5px solid var(--brd)', cursor:'default',
                transition:'all .35s cubic-bezier(.34,1.56,.64,1)'
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 14px 36px var(--shd)';e.currentTarget.style.borderColor='rgba(232,118,26,.3)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
              >
                <div style={{fontSize:'36px', marginBottom:'14px'}}>{f.em}</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'var(--dark)', marginBottom:'8px'}}>{f.title}</div>
                <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.65'}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}