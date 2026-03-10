import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const FEATURES = [
  { em:'📚', title:'Book Collection',   desc:'5,000+ books covering all subjects, NCERT, reference books, encyclopaedias and competitive exam guides.' },
  { em:'📰', title:'Newspapers & Journals', desc:'Daily newspapers in Hindi & English plus educational journals and magazines for all age groups.' },
  { em:'💻', title:'Digital Section',   desc:'Computers with internet access for online research, e-books and CBSE digital content.' },
  { em:'🤫', title:'Reading Hall',      desc:'Spacious, well-lit silent reading hall with comfortable seating for 60+ students at a time.' },
  { em:'📖', title:'Issue & Return',    desc:'Automated book issue/return system. Each student can borrow up to 2 books for 14 days.' },
  { em:'🎯', title:'Study Material',    desc:'Previous year CBSE board papers, sample papers, notes and study material available for students.' },
]

export default function Library({ embedded = false }) {
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
            <h1 className="pb-title">Our <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Library</span></h1>
            <p className="pb-sub">A world of knowledge — 5,000+ books, digital resources and a peaceful reading environment</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Library</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding: embedded ? '0' : '0'}}>

          {/* Hero card */}
          <div className="" style={{
            background:'linear-gradient(135deg,rgba(232,118,26,.06),rgba(245,184,0,.04))',
            border:'1.5px solid rgba(232,118,26,.15)', borderRadius:'24px',
            padding:'36px', marginBottom:'32px',
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'center'
          }}>
            <div>
              <div className="chip" style={{marginBottom:'16px'}}><span className="chip-dot"></span>School Library</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', marginBottom:'14px', lineHeight:'1.25'}}>
                A <span style={{color:'var(--or)'}}>Knowledge Hub</span><br/>for Every Learner
              </h2>
              <p style={{fontSize:'15px', color:'var(--txt2)', lineHeight:'1.75', marginBottom:'20px'}}>
                Our well-stocked library is the intellectual heart of SPVS — encouraging reading habits, independent research and a lifelong love for learning in students from Class I to XII.
              </p>
              <div style={{display:'flex', gap:'20px', flexWrap:'wrap'}}>
                {[['5,000+','Books'],['60+','Seating'],['Daily','Newspapers'],['Digital','Access']].map(([n,l])=>(
                  <div key={l} style={{textAlign:'center'}}>
                    <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--or)'}}>{n}</div>
                    <div style={{fontSize:'11px', color:'var(--txt3)', letterSpacing:'.5px'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))', borderRadius:'20px', padding:'32px', textAlign:'center', border:'1px solid rgba(245,184,0,.1)'}}>
              <div style={{fontSize:'80px', marginBottom:'16px'}}>📚</div>
              <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', color:'var(--gd2)', fontWeight:'700', marginBottom:'8px'}}>Incharge: Mr. Akhilesh Kr. Mishra</div>
              <div style={{fontSize:'13px', color:'rgba(255,255,255,.4)'}}>B.Com., B.Lib</div>
              <div style={{marginTop:'16px', padding:'10px 16px', background:'rgba(232,118,26,.1)', borderRadius:'10px', fontSize:'12px', color:'rgba(255,255,255,.6)'}}>
                🕐 Library Hours: 8:00 AM – 4:00 PM
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'16px'}}>
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