import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { academicsAPI } from '../../api'

const CLASSES_TEMPLATE = [
  {
    level:'Pre-Primary', tag:'Play Group – UKG', em:'🌱', color:'#22a35a', bg:'rgba(34,163,90,.06)',
    students:160, rooms:6, labs:0,
    desc:'NEP-2020 aligned early childhood education. Focus on listening, speaking, reading, writing, numeracy and cognitive-social-emotional development through activity-based play learning.',
    infra:['6 Spacious Classrooms','Activity Play Area','Sandpit & Toy Zone','Morning Assembly Ground','Washrooms (Separate)','CCTV Monitored'],
    strength:[
      {cls:'Play Group', boys:6,  girls:6,  total:12 },
      {cls:'Nursery',    boys:21, girls:13, total:34 },
      {cls:'LKG',        boys:27, girls:21, total:48 },
      {cls:'UKG',        boys:41, girls:25, total:66 },
    ]
  },
  {
    level:'Primary', tag:'Class I – V', em:'📖', color:'#E8761A', bg:'rgba(232,118,26,.06)',
    students:376, rooms:15, labs:1,
    desc:'Strong foundational learning with NCERT curriculum. Computer education, art, music and physical education are integral parts ensuring holistic all-round development of every child.',
    infra:['15 Well-ventilated Classrooms','1 Computer Lab (30 systems)','Library Access','Art & Craft Room','Music Room','Sports Ground Access','Smart Board in 5 rooms','CCTV Monitored'],
    strength:[
      {cls:'Class I',   boys:41, girls:27, total:68 },
      {cls:'Class II',  boys:39, girls:22, total:61 },
      {cls:'Class III', boys:55, girls:15, total:70 },
      {cls:'Class IV',  boys:60, girls:31, total:91 },
      {cls:'Class V',   boys:57, girls:29, total:86 },
    ]
  },
  {
    level:'Middle School', tag:'Class VI – VIII', em:'📐', color:'#F5B800', bg:'rgba(245,184,0,.06)',
    students:285, rooms:12, labs:2,
    desc:'Core subjects deepened with science practicals, mathematics enrichment and introduction to Sanskrit. Strong focus on conceptual clarity and building study habits for board classes.',
    infra:['12 Classrooms','Science Lab (practicals from VI)','2 Computer Labs','Library','Math Resource Room','Sports Ground','Smart Classes','CCTV Monitored'],
    strength:[
      {cls:'Class VI',   boys:64, girls:25, total:89  },
      {cls:'Class VII',  boys:71, girls:34, total:105 },
      {cls:'Class VIII', boys:60, girls:31, total:91  },
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

var CLASS_LEVEL_MAP = {
  'Pre-Primary':      ['Play Group','Nursery','KG','LKG','UKG'],
  'Primary':          ['Class I','Class II','Class III','Class IV','Class V'],
  'Middle School':    ['Class VI','Class VII','Class VIII'],
  'Secondary':        ['Class IX','Class X'],
  'Science Stream':   ['Class XI','Class XII'],
  'Commerce Stream':  ['Class XI','Class XII'],
  'Humanities Stream':['Class XI','Class XII'],
}

export default function ClassesInfra({ embedded }) {
  var [active,  setActive]  = useState(0)
  var [classes, setClasses] = useState(CLASSES_TEMPLATE)

  // ── Load from DB — update student counts + strength table ─────────────────
  useEffect(function() {
    academicsAPI.get()
      .then(function(res) {
        var d = res.data
        if (!d.classes || d.classes.length === 0) return

        setClasses(function(prev) {
          return prev.map(function(level) {
            var names      = CLASS_LEVEL_MAP[level.level] || []
            var dbClasses  = d.classes.filter(function(c) { return names.includes(c.name) })
            if (dbClasses.length === 0) return level

            // ✅ Total students for this level from DB
            var total = dbClasses.reduce(function(sum, c) {
              return sum + (Number(c.students) || 0)
            }, 0)

            // ✅ Update strength rows with DB total
            // Keep boys/girls ratio from original, recalculate based on new total
            var updatedStrength = level.strength.map(function(row) {
              var dbClass = dbClasses.find(function(c) { return c.name === row.cls })
              if (!dbClass) return row

              var newTotal = Number(dbClass.students) || row.total
              if (newTotal === row.total) return row

              // Recalculate boys/girls proportionally
              var ratio    = row.boys / (row.total || 1)
              var newBoys  = Math.round(newTotal * ratio)
              var newGirls = newTotal - newBoys

              return {
                cls:   row.cls,
                boys:  newBoys,
                girls: newGirls,
                total: newTotal,
              }
            })

            return {
              ...level,
              students: total > 0 ? total : level.students,
              strength: updatedStrength,
            }
          })
        })
      })
      .catch(function() {})
  }, [])

  useEffect(function() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv3d').forEach(function(el) { obs.observe(el) })
    return function() { obs.disconnect() }
  }, [])

  var c = classes[active]

  return (
    <>
      {!embedded && (
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
      )}

      <div style={{background:'var(--bg)', minHeight:'60vh', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto'}}>

          {/* Mobile tabs */}
          <div className="ci-mob-tabs" style={{display:'none', overflowX:'auto', gap:'8px', marginBottom:'18px', paddingBottom:'6px'}}>
            {classes.map(function(cl, i) {
              var isActive = active === i
              return (
                <button key={i} onClick={function(){ setActive(i) }} style={{
                  flexShrink:0, display:'flex', alignItems:'center', gap:'7px',
                  padding:'9px 14px', borderRadius:'30px', border:'none', cursor:'pointer',
                  background: isActive ? 'linear-gradient(135deg,'+cl.color+','+cl.color+'bb)' : 'var(--bg2)',
                  color: isActive ? '#fff' : 'var(--txt2)',
                  fontSize:'12.5px', fontWeight:'700', fontFamily:"'DM Sans',sans-serif",
                  boxShadow: isActive ? '0 4px 14px '+cl.color+'40' : 'none',
                  transition:'all .22s',
                }}>
                  <span>{cl.em}</span><span>{cl.level}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop layout */}
          <div className="ci-layout" style={{display:'grid', gridTemplateColumns:'270px 1fr', gap:'28px', alignItems:'start'}}>

            {/* Sidebar */}
            <div className="ci-sidebar" style={{position:'sticky', top:'100px', display:'flex', flexDirection:'column', gap:'5px', background:'var(--card)', borderRadius:'20px', padding:'12px', border:'1.5px solid var(--brd)', boxShadow:'0 8px 30px rgba(232,118,26,.06)'}}>
              <div style={{padding:'10px 12px', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--txt3)'}}>Select Class Level</div>
              {classes.map(function(cl, i) {
                var isActive = active === i
                return (
                  <button key={i} onClick={function(){ setActive(i) }} style={{
                    display:'flex', alignItems:'center', gap:'11px', padding:'12px 14px',
                    borderRadius:'12px', border:'none', cursor:'pointer', textAlign:'left',
                    background: isActive ? 'linear-gradient(135deg,'+cl.color+'18,'+cl.color+'06)' : 'transparent',
                    borderLeft: isActive ? '3px solid '+cl.color : '3px solid transparent',
                    boxShadow: isActive ? '0 4px 16px '+cl.color+'18' : 'none',
                    transition:'all .22s',
                  }}>
                    <span style={{fontSize:'20px'}}>{cl.em}</span>
                    <div>
                      <div style={{fontSize:'13px', fontWeight:'700', color: isActive ? cl.color : 'var(--txt)', fontFamily:"'Playfair Display',serif"}}>{cl.level}</div>
                      <div style={{fontSize:'10.5px', color:'var(--txt3)'}}>{cl.tag}</div>
                    </div>
                    <div style={{marginLeft:'auto', fontSize:'11px', fontWeight:'700', color: isActive ? cl.color : 'var(--txt3)'}}>{cl.students}</div>
                  </button>
                )
              })}
            </div>

            {/* Detail Panel */}
            <div key={active} style={{animation:'fU .35s ease both'}}>

              {/* Header card */}
              <div style={{background:'linear-gradient(135deg,'+c.color+'12,'+c.color+'04)', border:'1.5px solid '+c.color+'28', borderRadius:'22px', padding:'24px', marginBottom:'18px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px', flexWrap:'wrap'}}>
                  <div style={{width:'56px', height:'56px', borderRadius:'16px', background:'linear-gradient(135deg,'+c.color+','+c.color+'99)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', boxShadow:'0 8px 24px '+c.color+'40', flexShrink:0}}>{c.em}</div>
                  <div style={{flex:1}}>
                    <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', margin:'0 0 4px'}}>{c.level}</h2>
                    <div style={{fontSize:'11px', fontWeight:'700', color:c.color, letterSpacing:'1px', textTransform:'uppercase'}}>{c.tag}</div>
                  </div>
                  <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                    {[['👥',c.students+'+','Students'],['🏫',c.rooms,'Rooms'],['🔬',c.labs,'Labs']].map(function(item) {
                      return (
                        <div key={item[2]} style={{background:'rgba(255,255,255,.7)', backdropFilter:'blur(8px)', borderRadius:'12px', padding:'10px 14px', textAlign:'center', border:'1px solid '+c.color+'20'}}>
                          <div style={{fontSize:'13px', marginBottom:'2px'}}>{item[0]}</div>
                          <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:c.color, lineHeight:'1'}}>{item[1]}</div>
                          <div style={{fontSize:'10px', color:'var(--txt3)', marginTop:'2px'}}>{item[2]}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p style={{fontSize:'14px', color:'var(--txt2)', lineHeight:'1.75', margin:0}}>{c.desc}</p>
              </div>

              {/* Infra + Strength */}
              <div className="ci-cards" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'18px', marginBottom:'18px'}}>

                {/* Infrastructure */}
                <div style={{background:'var(--card)', borderRadius:'18px', padding:'20px', border:'1.5px solid var(--brd)'}}>
                  <div style={{fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--txt3)', marginBottom:'14px'}}>🏗️ Infrastructure Available</div>
                  <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
                    {c.infra.map(function(item, i) {
                      return (
                        <div key={i} style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px', color:'var(--txt2)', padding:'7px 10px', borderRadius:'10px', background:i%2===0?'var(--bg2)':'transparent'}}>
                          <div style={{width:'7px', height:'7px', borderRadius:'50%', background:c.color, flexShrink:0, boxShadow:'0 0 6px '+c.color+'80'}}></div>
                          {item}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Strength table — ✅ Updated from DB */}
                <div style={{background:'var(--card)', borderRadius:'18px', padding:'20px', border:'1.5px solid var(--brd)'}}>
                  <div style={{fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--txt3)', marginBottom:'14px'}}>👥 Student Strength 2025–26</div>
                  <div style={{borderRadius:'12px', overflow:'hidden', border:'1.5px solid var(--brd)'}}>
                    <table style={{width:'100%', borderCollapse:'collapse'}}>
                      <thead>
                        <tr style={{background:c.color+'15'}}>
                          {['Class','Boys','Girls','Total'].map(function(h) {
                            return <th key={h} style={{padding:'9px 10px', textAlign:'left', fontSize:'10px', fontWeight:'800', color:c.color, letterSpacing:'1px', textTransform:'uppercase'}}>{h}</th>
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {c.strength.map(function(row, i) {
                          return (
                            <tr key={i} style={{borderTop:'1px solid var(--brd)', background:i%2===0?'transparent':'rgba(0,0,0,.01)'}}>
                              <td style={{padding:'9px 10px', fontWeight:'700', color:'var(--dark)', fontSize:'12px'}}>{row.cls}</td>
                              <td style={{padding:'9px 10px', color:'var(--txt2)', fontSize:'12px'}}>{row.boys}</td>
                              <td style={{padding:'9px 10px', color:'var(--txt2)', fontSize:'12px'}}>{row.girls}</td>
                              <td style={{padding:'9px 10px', fontWeight:'800', color:c.color, fontSize:'13px'}}>{row.total}</td>
                            </tr>
                          )
                        })}
                        <tr style={{borderTop:'2px solid var(--brd)', background:c.color+'06'}}>
                          <td style={{padding:'9px 10px', fontWeight:'800', color:'var(--dark)', fontSize:'12px'}}>Total</td>
                          <td style={{padding:'9px 10px', fontWeight:'700', color:'var(--txt2)', fontSize:'12px'}}>{c.strength.reduce(function(s,r){return s+r.boys},0)}</td>
                          <td style={{padding:'9px 10px', fontWeight:'700', color:'var(--txt2)', fontSize:'12px'}}>{c.strength.reduce(function(s,r){return s+r.girls},0)}</td>
                          <td style={{padding:'9px 10px', fontWeight:'800', color:c.color, fontSize:'14px'}}>{c.strength.reduce(function(s,r){return s+r.total},0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{marginTop:'14px', display:'flex', gap:'8px'}}>
                    {[
                      ['Boys',  c.strength.reduce(function(s,r){return s+r.boys},0),  'var(--or)', c.color+'08', c.color+'20'],
                      ['Girls', c.strength.reduce(function(s,r){return s+r.girls},0), '#6C3FC5',  'rgba(108,63,197,.06)', 'rgba(108,63,197,.15)'],
                      ['Total', c.strength.reduce(function(s,r){return s+r.total},0), '#22a35a',  'rgba(34,163,90,.06)',  'rgba(34,163,90,.2)'],
                    ].map(function(item) {
                      return (
                        <div key={item[0]} style={{flex:1, padding:'10px 6px', borderRadius:'10px', background:item[3], border:'1px solid '+item[4], textAlign:'center'}}>
                          <div style={{fontSize:'10px', color:'var(--txt3)', marginBottom:'3px'}}>{item[0]}</div>
                          <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:item[2]}}>{item[1]}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                <Link to="/academics/subjects" className="btn-or" style={{fontSize:'13px', padding:'10px 18px'}}>📚 View Subjects →</Link>
                <Link to="/academics/fees" className="btn-out" style={{fontSize:'13px', padding:'10px 18px'}}>💰 Fee Structure</Link>
                <Link to="/academics/faculty" className="btn-out" style={{fontSize:'13px', padding:'10px 18px'}}>👨‍🏫 Meet Faculty</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ci-layout { grid-template-columns: 1fr !important; }
          .ci-sidebar { display: none !important; }
          .ci-mob-tabs { display: flex !important; }
          .ci-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}