import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CLASSES = [
  {
    level:'Pre-Primary', tag:'Play Group – UKG', em:'🌱', color:'#22a35a', bg:'rgba(34,163,90,.06)',
    students:160, rooms:6, labs:0,
    desc:'NEP-2020 aligned early childhood education. Focus on listening, speaking, reading, writing, numeracy and cognitive-social-emotional development through activity-based play learning.',
    infra:['6 Spacious Classrooms','Activity Play Area','Sandpit & Toy Zone','Morning Assembly Ground','Washrooms (Separate)','CCTV Monitored'],
    strength:[
      {cls:'Play Group',boys:6,  girls:6,  total:12 },
      {cls:'Nursery',   boys:21, girls:13, total:34 },
      {cls:'LKG',       boys:27, girls:21, total:48 },
      {cls:'UKG',       boys:41, girls:25, total:66 },
    ]
  },
  {
    level:'Primary', tag:'Class I – V', em:'📖', color:'#E8761A', bg:'rgba(232,118,26,.06)',
    students:376, rooms:15, labs:1,
    desc:'Strong foundational learning with NCERT curriculum. Computer education, art, music and physical education are integral parts ensuring holistic all-round development of every child.',
    infra:['15 Well-ventilated Classrooms','1 Computer Lab (30 systems)','Library Access','Art & Craft Room','Music Room','Sports Ground Access','Smart Board in 5 rooms','CCTV Monitored'],
    strength:[
      {cls:'Class I',  boys:41, girls:27, total:68 },
      {cls:'Class II', boys:39, girls:22, total:61 },
      {cls:'Class III',boys:55, girls:15, total:70 },
      {cls:'Class IV', boys:60, girls:31, total:91 },
      {cls:'Class V',  boys:57, girls:29, total:86 },
    ]
  },
  {
    level:'Middle School', tag:'Class VI – VIII', em:'📐', color:'#F5B800', bg:'rgba(245,184,0,.06)',
    students:285, rooms:12, labs:2,
    desc:'Core subjects deepened with science practicals, mathematics enrichment and introduction to Sanskrit. Strong focus on conceptual clarity and building study habits for board classes.',
    infra:['12 Classrooms','Science Lab (practicals from VI)','2 Computer Labs','Library','Math Resource Room','Sports Ground','Smart Classes','CCTV Monitored'],
    strength:[
      {cls:'Class VI',  boys:64, girls:25, total:89  },
      {cls:'Class VII', boys:71, girls:34, total:105 },
      {cls:'Class VIII',boys:60, girls:31, total:91  },
    ]
  },
  {
    level:'Secondary', tag:'Class IX – X', em:'🔬', color:'#6C3FC5', bg:'rgba(108,63,197,.06)',
    students:315, rooms:14, labs:4,
    desc:'CBSE board classes with dedicated subject teachers for all subjects. Science practicals, IT lab sessions, project work and regular mock tests to ensure 100% board results.',
    infra:['14 Classrooms','Physics Lab','Chemistry Lab','Biology Lab','Computer / IT Lab','Library','Smart Classes in all rooms','Exam Hall','CCTV Monitored'],
    strength:[
      {cls:'Class IX', boys:117, girls:51, total:168 },
      {cls:'Class X',  boys:94,  girls:53, total:147 },
    ]
  },
  {
    level:'Science Stream', tag:'Class XI – XII · PCB / PCM', em:'⚗️', color:'#E8761A', bg:'rgba(232,118,26,.06)',
    students:274, rooms:16, labs:6,
    desc:'PCB & PCM streams with PGT faculty. Fully equipped Physics, Chemistry and Biology labs. Regular NEET / JEE orientation, model papers and expert sessions. 100% board results every year.',
    infra:['Dedicated Senior Wing','Advanced Physics Lab','Advanced Chemistry Lab','Advanced Biology Lab','Computer Science Lab','Smart Classrooms','Study Hall','Separate Exam Block'],
    strength:[
      {cls:'Class XI',  boys:95,  girls:40, total:135 },
      {cls:'Class XII', boys:100, girls:39, total:139 },
    ]
  },
  {
    level:'Commerce Stream', tag:'Class XI – XII · Accountancy / Business', em:'💼', color:'#22a35a', bg:'rgba(34,163,90,.06)',
    students:274, rooms:16, labs:3,
    desc:'Accountancy, Business Studies and Economics with practical sessions on Tally and spreadsheets. Strong alumni in CA, MBA and banking sectors.',
    infra:['Commerce Resource Room','Computer Lab (Tally / Excel)','Library (Commerce Section)','Smart Classrooms','Exam Hall','CCTV Monitored'],
    strength:[
      {cls:'Class XI',  boys:95,  girls:40, total:135 },
      {cls:'Class XII', boys:100, girls:39, total:139 },
    ]
  },
  {
    level:'Humanities Stream', tag:'Class XI – XII · History / Pol. Sci.', em:'🌐', color:'#0F1B3D', bg:'rgba(15,27,61,.05)',
    students:274, rooms:16, labs:2,
    desc:'History, Political Science and Economics with focused preparation for UPSC, law and journalism. Critical thinking and essay-writing skills developed throughout.',
    infra:['Humanities Resource Room','Library (Social Science Section)','Debate & Discussion Hall','Smart Classrooms','Exam Hall','CCTV Monitored'],
    strength:[
      {cls:'Class XI',  boys:95,  girls:40, total:135 },
      {cls:'Class XII', boys:100, girls:39, total:139 },
    ]
  },
]

export default function ClassesInfra() {
  const [active, setActive] = useState(0)
  const c = CLASSES[active]

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">🏫 Academics</div>
          <h1 className="pb-title">Classes <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Infrastructure</span></h1>
          <p className="pb-sub">Class-wise facilities, student strength and infrastructure — Nursery to Class XII</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/academics">Academics</Link><span>›</span>
            <span className="bc-cur">Classes Infrastructure</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)',minHeight:'60vh',padding:'60px 20px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'270px 1fr',gap:'28px',alignItems:'start'}}>

            {/* ── Sidebar ── */}
            <div className="" style={{position:'sticky',top:'100px',display:'flex',flexDirection:'column',gap:'5px',background:'var(--card)',borderRadius:'20px',padding:'12px',border:'1.5px solid var(--brd)',boxShadow:'0 8px 30px rgba(232,118,26,.06)'}}>
              <div style={{padding:'10px 12px',fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)'}}>Select Class Level</div>
              {CLASSES.map((cl,i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  display:'flex',alignItems:'center',gap:'11px',padding:'12px 14px',
                  borderRadius:'12px',border:'none',cursor:'pointer',textAlign:'left',
                  background: active===i ? `linear-gradient(135deg,${cl.color}18,${cl.color}06)` : 'transparent',
                  borderLeft: active===i ? `3px solid ${cl.color}` : '3px solid transparent',
                  boxShadow: active===i ? `0 4px 16px ${cl.color}18` : 'none',
                  transition:'all .22s'
                }}>
                  <span style={{fontSize:'20px'}}>{cl.em}</span>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:'700',color:active===i ? cl.color : 'var(--txt)',fontFamily:"'Playfair Display',serif"}}>{cl.level}</div>
                    <div style={{fontSize:'10.5px',color:'var(--txt3)'}}>{cl.tag}</div>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:'11px',fontWeight:'700',color:active===i ? cl.color : 'var(--txt3)'}}>{cl.students}</div>
                </button>
              ))}
            </div>

            {/* ── Detail Panel ── */}
            <div key={active} style={{animation:'fU .35s ease both'}}>

              {/* Header card */}
              <div style={{background:`linear-gradient(135deg,${c.color}12,${c.color}04)`,border:`1.5px solid ${c.color}28`,borderRadius:'22px',padding:'32px',marginBottom:'22px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'18px',marginBottom:'18px',flexWrap:'wrap'}}>
                  <div style={{width:'64px',height:'64px',borderRadius:'18px',background:`linear-gradient(135deg,${c.color},${c.color}99)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',boxShadow:`0 8px 24px ${c.color}40`,flexShrink:0}}>{c.em}</div>
                  <div style={{flex:1}}>
                    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',fontWeight:'700',color:'var(--dark)',margin:'0 0 4px'}}>{c.level}</h2>
                    <div style={{fontSize:'12px',fontWeight:'700',color:c.color,letterSpacing:'1px',textTransform:'uppercase'}}>{c.tag}</div>
                  </div>
                  <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                    {[['👥',c.students+'+','Students'],['🏫',c.rooms,'Rooms'],['🔬',c.labs,'Labs']].map(([ic,n,l]) => (
                      <div key={l} style={{background:'rgba(255,255,255,.7)',backdropFilter:'blur(8px)',borderRadius:'12px',padding:'12px 16px',textAlign:'center',border:`1px solid ${c.color}20`}}>
                        <div style={{fontSize:'14px',marginBottom:'3px'}}>{ic}</div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:c.color,lineHeight:'1'}}>{n}</div>
                        <div style={{fontSize:'10px',color:'var(--txt3)',marginTop:'2px'}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{fontSize:'15px',color:'var(--txt2)',lineHeight:'1.75',margin:0}}>{c.desc}</p>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'22px'}}>
                {/* Infrastructure */}
                <div style={{background:'var(--card)',borderRadius:'18px',padding:'24px',border:'1.5px solid var(--brd)'}}>
                  <div style={{fontSize:'12px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)',marginBottom:'16px'}}>🏗️ Infrastructure Available</div>
                  <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                    {c.infra.map((item,i) => (
                      <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'13.5px',color:'var(--txt2)',padding:'8px 12px',borderRadius:'10px',background:i%2===0?'var(--bg2)':'transparent'}}>
                        <div style={{width:'7px',height:'7px',borderRadius:'50%',background:c.color,flexShrink:0,boxShadow:`0 0 6px ${c.color}80`}}></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strength table */}
                <div style={{background:'var(--card)',borderRadius:'18px',padding:'24px',border:'1.5px solid var(--brd)'}}>
                  <div style={{fontSize:'12px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)',marginBottom:'16px'}}>👥 Student Strength 2025–26</div>
                  <div style={{borderRadius:'12px',overflow:'hidden',border:'1.5px solid var(--brd)'}}>
                    <table style={{width:'100%',borderCollapse:'collapse'}}>
                      <thead>
                        <tr style={{background:`${c.color}15`}}>
                          {['Class','Boys','Girls','Total'].map(h=>(
                            <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:c.color,letterSpacing:'1px',textTransform:'uppercase'}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {c.strength.map((row,i)=>(
                          <tr key={i} style={{borderTop:'1px solid var(--brd)',background:i%2===0?'transparent':'rgba(0,0,0,.01)'}}>
                            <td style={{padding:'10px 14px',fontWeight:'700',color:'var(--dark)',fontSize:'13px'}}>{row.cls}</td>
                            <td style={{padding:'10px 14px',color:'var(--txt2)',fontSize:'13px'}}>{row.boys}</td>
                            <td style={{padding:'10px 14px',color:'var(--txt2)',fontSize:'13px'}}>{row.girls}</td>
                            <td style={{padding:'10px 14px',fontWeight:'800',color:c.color,fontSize:'14px'}}>{row.total}</td>
                          </tr>
                        ))}
                        <tr style={{borderTop:'2px solid var(--brd)',background:`${c.color}06`}}>
                          <td style={{padding:'10px 14px',fontWeight:'800',color:'var(--dark)',fontSize:'13px'}}>Total</td>
                          <td style={{padding:'10px 14px',fontWeight:'700',color:'var(--txt2)',fontSize:'13px'}}>{c.strength.reduce((s,r)=>s+r.boys,0)}</td>
                          <td style={{padding:'10px 14px',fontWeight:'700',color:'var(--txt2)',fontSize:'13px'}}>{c.strength.reduce((s,r)=>s+r.girls,0)}</td>
                          <td style={{padding:'10px 14px',fontWeight:'800',color:c.color,fontSize:'15px'}}>{c.strength.reduce((s,r)=>s+r.total,0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{marginTop:'16px',display:'flex',gap:'10px'}}>
                    <div style={{flex:1,padding:'12px',borderRadius:'10px',background:`${c.color}08`,border:`1px solid ${c.color}20`,textAlign:'center'}}>
                      <div style={{fontSize:'11px',color:'var(--txt3)',marginBottom:'3px'}}>Boys</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:c.color}}>{c.strength.reduce((s,r)=>s+r.boys,0)}</div>
                    </div>
                    <div style={{flex:1,padding:'12px',borderRadius:'10px',background:'rgba(108,63,197,.06)',border:'1px solid rgba(108,63,197,.15)',textAlign:'center'}}>
                      <div style={{fontSize:'11px',color:'var(--txt3)',marginBottom:'3px'}}>Girls</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#6C3FC5'}}>{c.strength.reduce((s,r)=>s+r.girls,0)}</div>
                    </div>
                    <div style={{flex:1,padding:'12px',borderRadius:'10px',background:'rgba(34,163,90,.06)',border:'1px solid rgba(34,163,90,.2)',textAlign:'center'}}>
                      <div style={{fontSize:'11px',color:'var(--txt3)',marginBottom:'3px'}}>Total</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#22a35a'}}>{c.strength.reduce((s,r)=>s+r.total,0)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav to other sub-pages */}
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <Link to="/academics/subjects" className="btn-or" style={{fontSize:'13px',padding:'11px 20px'}}>📚 View Subjects →</Link>
                <Link to="/academics/fees" className="btn-out" style={{fontSize:'13px',padding:'11px 20px'}}>💰 Fee Structure</Link>
                <Link to="/academics/faculty" className="btn-out" style={{fontSize:'13px',padding:'11px 20px'}}>👨‍🏫 Meet Faculty</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}