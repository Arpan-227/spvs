import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FEES = [
  { class:'Play Group',        tuition:1600, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Nursery – UKG',     tuition:1200, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class I – III',     tuition:1500, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class IV – V',      tuition:1600, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class VI',          tuition:1800, additional:3000, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class VII – VIII',  tuition:2000, additional:3000, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class IX – X',      tuition:2750, additional:5000, annual:3000, exam:2000, transport:'As per route' },
  { class:'Class XI – XII',    tuition:3300, additional:7000, annual:5000, exam:4000, transport:'As per route' },
]

const NOTES = [
  { ic:'📌', text:'Exam Fee for Class X & XII Board: ₹4,000/– (includes CBSE Board fees)' },
  { ic:'📌', text:'Exam Fee for Class IX & XI: ₹2,000/– per examination' },
  { ic:'📌', text:'Exam Fee for Nursery to Class VIII: ₹1,500/– per examination' },
  { ic:'🚌', text:'Transport fee is charged as per route distance — contact the transport incharge for details: +91 7985287461' },
  { ic:'🏠', text:'Hostel fee is charged separately — contact school office for details' },
  { ic:'📅', text:'Fee is payable monthly. Annual fee is charged once per academic year' },
  { ic:'⚠️', text:'All fees are for Academic Year 2026–27. Subject to revision.' },
]

export default function FeeStructure() {
  const [hovered, setHovered] = useState(null)
  const [view, setView] = useState('table') // table | cards

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">💰 Academics</div>
          <h1 className="pb-title">Fee <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Structure</span></h1>
          <p className="pb-sub">Transparent fee structure for Academic Year 2026–27 — all classes Play Group to Class XII</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/academics">Academics</Link><span>›</span>
            <span className="bc-cur">Fee Structure</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)',minHeight:'60vh',padding:'60px 20px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>

          {/* Summary cards */}
          <div className="" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'14px',marginBottom:'40px'}}>
            {[
              {ic:'💰',lbl:'Tuition Fee',sub:'Monthly',note:'₹1,200 – ₹3,300/month',color:'var(--or)'},
              {ic:'📋',lbl:'Additional Fee',sub:'Monthly',note:'₹2,500 – ₹7,000/month',color:'#6C3FC5'},
              {ic:'📅',lbl:'Annual Fee',sub:'Once per year',note:'₹1,000 – ₹5,000/year',color:'#22a35a'},
              {ic:'📝',lbl:'Exam Fee',sub:'Per exam',note:'₹1,500 – ₹4,000',color:'#F5B800'},
              {ic:'🚌',lbl:'Transport',sub:'Monthly',note:'As per route',color:'#0F1B3D'},
            ].map((c,i) => (
              <div key={i} className="" style={{
                padding:'20px',borderRadius:'16px',textAlign:'center',
                background:`${c.color}08`,border:`1.5px solid ${c.color}22`,
                transition:'all .35s cubic-bezier(.34,1.56,.64,1)',cursor:'default'
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow=`0 14px 36px ${c.color}25`}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}
              >
                <div style={{fontSize:'30px',marginBottom:'10px'}}>{c.ic}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'var(--dark)',marginBottom:'3px'}}>{c.lbl}</div>
                <div style={{fontSize:'11px',color:'var(--txt3)',marginBottom:'8px'}}>{c.sub}</div>
                <div style={{fontSize:'12px',fontWeight:'700',color:c.color,background:`${c.color}10`,padding:'4px 10px',borderRadius:'50px',display:'inline-block'}}>{c.note}</div>
              </div>
            ))}
          </div>

          {/* View toggle */}
          <div className="" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'var(--dark)',margin:0}}>Complete Fee Chart — 2026–27</h2>
            <div style={{display:'flex',gap:'6px',background:'var(--bg2)',padding:'4px',borderRadius:'10px',border:'1.5px solid var(--brd)'}}>
              {[['table','📊 Table'],['cards','🃏 Cards']].map(([v,l]) => (
                <button key={v} onClick={()=>setView(v)} style={{padding:'7px 16px',borderRadius:'8px',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'12.5px',fontWeight:'700',transition:'all .2s',background:view===v?'var(--card)':'transparent',color:view===v?'var(--or)':'var(--txt2)',boxShadow:view===v?'0 2px 10px rgba(232,118,26,.15)':'none'}}>{l}</button>
              ))}
            </div>
          </div>

          {/* Table view */}
          {view === 'table' && (
            <div className="" style={{borderRadius:'18px',overflow:'hidden',border:'1.5px solid var(--brd)',boxShadow:'0 8px 36px rgba(232,118,26,.07)',marginBottom:'32px'}}>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
                  <thead>
                    <tr style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))'}}>
                      {['Class / Level','Tuition /mo','Additional /mo','Annual Fee','Exam Fee','Transport'].map(h=>(
                        <th key={h} style={{padding:'14px 18px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'rgba(255,255,255,.65)',letterSpacing:'1px',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FEES.map((row,i) => (
                      <tr key={i} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)} style={{borderTop:'1px solid var(--brd)',background:hovered===i?'rgba(232,118,26,.03)':i%2===0?'transparent':'rgba(0,0,0,.012)',transition:'background .15s'}}>
                        <td style={{padding:'13px 18px',fontWeight:'700',color:'var(--dark)',fontSize:'14px',fontFamily:"'Playfair Display',serif"}}>{row.class}</td>
                        <td style={{padding:'13px 18px',fontWeight:'700',color:'var(--or)',fontSize:'14px'}}>₹{row.tuition.toLocaleString()}</td>
                        <td style={{padding:'13px 18px',fontWeight:'600',color:'#6C3FC5',fontSize:'13.5px'}}>₹{row.additional.toLocaleString()}</td>
                        <td style={{padding:'13px 18px',fontWeight:'600',color:'#22a35a',fontSize:'13.5px'}}>₹{row.annual.toLocaleString()}</td>
                        <td style={{padding:'13px 18px',color:'var(--txt2)',fontSize:'13.5px'}}>₹{row.exam.toLocaleString()}</td>
                        <td style={{padding:'13px 18px',color:'var(--txt3)',fontSize:'12.5px',fontStyle:'italic'}}>{row.transport}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cards view */}
          {view === 'cards' && (
            <div className="" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'14px',marginBottom:'32px'}}>
              {FEES.map((row,i) => (
                <div key={i} className="" style={{background:'var(--card)',borderRadius:'16px',padding:'22px',border:'1.5px solid var(--brd)',transition:'all .3s cubic-bezier(.34,1.56,.64,1)'}}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 40px var(--shd)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}
                >
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:'700',color:'var(--dark)',marginBottom:'16px',paddingBottom:'12px',borderBottom:'1.5px solid var(--brd)'}}>{row.class}</div>
                  {[['💰','Tuition','var(--or)',row.tuition,'/ month'],['📋','Additional','#6C3FC5',row.additional,'/ month'],['📅','Annual','#22a35a',row.annual,'/ year'],['📝','Exam Fee','#F5B800',row.exam,'/ exam']].map(([ic,lbl,col,amt,period])=>(
                    <div key={lbl} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--brd)'}}>
                      <span style={{fontSize:'13px',color:'var(--txt2)'}}>{ic} {lbl}</span>
                      <span style={{fontWeight:'700',color:col,fontSize:'14px'}}>₹{amt.toLocaleString()} <span style={{fontSize:'10px',color:'var(--txt3)',fontWeight:'400'}}>{period}</span></span>
                    </div>
                  ))}
                  <div style={{marginTop:'12px',padding:'10px 14px',borderRadius:'10px',background:'rgba(232,118,26,.05)',border:'1px solid rgba(232,118,26,.12)',fontSize:'12px',color:'var(--txt2)',textAlign:'center'}}>
                    Monthly Total: <strong style={{color:'var(--or)'}}>₹{(row.tuition+row.additional).toLocaleString()}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          <div className="" style={{marginBottom:'32px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)',marginBottom:'14px'}}>Important Notes</div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {NOTES.map((n,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px',fontSize:'13.5px',color:'var(--txt2)',padding:'12px 16px',background:'var(--bg2)',borderRadius:'10px',border:'1px solid var(--brd)'}}>
                  <span>{n.ic}</span>{n.text}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="" style={{textAlign:'center',padding:'36px',borderRadius:'20px',background:'linear-gradient(135deg,var(--dark),var(--dark2))',border:'1px solid rgba(245,184,0,.1)'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#fff',marginBottom:'10px'}}>Have fee-related queries?</div>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,.5)',marginBottom:'22px'}}>Contact our school office directly — we're happy to assist with all fee and admission queries.</p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/contact" className="btn-or">📋 Apply for Admission →</Link>
              <a href="tel:+919198783830" className="btn-out" style={{color:'rgba(255,255,255,.7)',borderColor:'rgba(255,255,255,.2)'}}>📞 Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}