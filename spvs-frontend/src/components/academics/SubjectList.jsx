import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { academicsAPI } from '../../api'

const LEVELS_TEMPLATE = [
  { id:'pp',  em:'🌱', label:'Pre-Primary',      tag:'PG – UKG',              color:'#22a35a',
    subjects:[
      {name:'Hindi',              code:'–', type:'Core'},
      {name:'English',            code:'–', type:'Core'},
      {name:'Numbers & Shapes',   code:'–', type:'Core'},
      {name:'Art & Craft',        code:'–', type:'Activity'},
      {name:'Music & Dance',      code:'–', type:'Activity'},
      {name:'Social Skills',      code:'–', type:'Value'},
      {name:'Ethics / Values',    code:'–', type:'Value'},
      {name:'Games & Exercises',  code:'–', type:'Activity'},
    ]
  },
  { id:'pri', em:'📖', label:'Primary',           tag:'Class I – V',           color:'#E8761A',
    subjects:[
      {name:'English',                    code:'–', type:'Core'},
      {name:'Hindi',                      code:'–', type:'Core'},
      {name:'Mathematics',                code:'–', type:'Core'},
      {name:'Environmental Studies',      code:'–', type:'Core'},
      {name:'Social Science',             code:'–', type:'Core'},
      {name:'Computer Education',         code:'–', type:'Skill'},
      {name:'General Knowledge',          code:'–', type:'Skill'},
      {name:'Art & Craft',                code:'–', type:'Activity'},
      {name:'Music',                      code:'–', type:'Activity'},
      {name:'Physical & Health Education',code:'–', type:'Activity'},
    ]
  },
  { id:'mid', em:'📐', label:'Middle',             tag:'Class VI – VIII',       color:'#F5B800',
    subjects:[
      {name:'English',                    code:'–', type:'Core'},
      {name:'Hindi',                      code:'–', type:'Core'},
      {name:'Mathematics',                code:'–', type:'Core'},
      {name:'Science',                    code:'–', type:'Core'},
      {name:'Social Science',             code:'–', type:'Core'},
      {name:'Sanskrit',                   code:'–', type:'Core'},
      {name:'Computer Education',         code:'–', type:'Skill'},
      {name:'General Knowledge',          code:'–', type:'Skill'},
      {name:'Art & Craft',                code:'–', type:'Activity'},
      {name:'Music',                      code:'–', type:'Activity'},
      {name:'Physical & Health Education',code:'–', type:'Activity'},
    ]
  },
  { id:'sec', em:'🔬', label:'Secondary',          tag:'Class IX – X',          color:'#6C3FC5',
    subjects:[
      {name:'English Language & Literature',code:'184', type:'Core'},
      {name:'Hindi Course-A',               code:'002', type:'Core'},
      {name:'Mathematics Standard',         code:'041', type:'Core'},
      {name:'Science',                      code:'086', type:'Core'},
      {name:'Social Science',               code:'087', type:'Core'},
      {name:'Information Technology',       code:'402', type:'Skill'},
    ]
  },
  { id:'sci', em:'⚗️', label:'Science XI–XII',     tag:'PCB / PCM',             color:'#E8761A',
    subjects:[
      {name:'English Core',       code:'301', type:'Core'},
      {name:'Physics',            code:'042', type:'Core'},
      {name:'Chemistry',          code:'043', type:'Core'},
      {name:'Biology',            code:'044', type:'Core'},
      {name:'Mathematics',        code:'041', type:'Core'},
      {name:'Physical Education', code:'048', type:'Optional'},
    ]
  },
  { id:'com', em:'💼', label:'Commerce XI–XII',    tag:'Accountancy / Business', color:'#22a35a',
    subjects:[
      {name:'English Core',       code:'301', type:'Core'},
      {name:'Accountancy',        code:'055', type:'Core'},
      {name:'Business Studies',   code:'054', type:'Core'},
      {name:'Economics',          code:'030', type:'Core'},
      {name:'Computer Science',   code:'083', type:'Optional'},
      {name:'Physical Education', code:'048', type:'Optional'},
    ]
  },
  { id:'hum', em:'🌐', label:'Humanities XI–XII',  tag:'History / Pol. Sci.',   color:'#0F1B3D',
    subjects:[
      {name:'English Core',       code:'301', type:'Core'},
      {name:'History',            code:'027', type:'Core'},
      {name:'Political Science',  code:'028', type:'Core'},
      {name:'Economics',          code:'030', type:'Core'},
      {name:'Computer Science',   code:'083', type:'Optional'},
      {name:'Physical Education', code:'048', type:'Optional'},
    ]
  },
]

const TYPE_STYLE = {
  Core:     { bg:'rgba(232,118,26,.1)',  color:'var(--or2)' },
  Skill:    { bg:'rgba(108,63,197,.1)',  color:'#5A2FA0'    },
  Activity: { bg:'rgba(34,163,90,.1)',   color:'#1a7a40'    },
  Value:    { bg:'rgba(245,184,0,.1)',   color:'#8B6800'    },
  Optional: { bg:'rgba(15,27,61,.07)',   color:'var(--navy)'},
}

var SYLLABUS_MAP = {
  'pp':  'Pre-Primary (PG – UKG)',
  'pri': 'Primary (Class I – V)',
  'mid': 'Middle (Class VI – VIII)',
  'sec': 'Secondary (Class IX – X)',
  'sci': 'Science Stream (Class XI – XII)',
  'com': 'Commerce Stream (Class XI – XII)',
  'hum': 'Humanities Stream (Class XI – XII)',
}

var STREAM_TO_ID = {
  'Science':    'sci',
  'Commerce':   'com',
  'Humanities': 'hum',
}

function SyllabusDownload(props) {
  var entry = props.entry
  var label = props.label

  if (entry && entry.fileUrl) {
    var year = entry.year || '2026-27'
    var url  = entry.fileUrl

    var dlStyle = {
      display:'inline-flex', alignItems:'center', gap:'7px',
      padding:'11px 22px', borderRadius:'10px',
      background:'linear-gradient(135deg,#22a35a,#16a34a)',
      color:'#fff', fontWeight:'800', fontSize:'13px',
      textDecoration:'none',
      boxShadow:'0 4px 14px rgba(34,163,90,.3)',
      flexShrink:0
    }

    return (
      <div style={{padding:'18px 20px', borderRadius:'16px', background:'linear-gradient(135deg,rgba(34,163,90,.06),rgba(34,163,90,.02))', border:'1.5px solid rgba(34,163,90,.2)', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap'}}>
        <div style={{fontSize:'28px'}}>📥</div>
        <div style={{flex:1, minWidth:'180px'}}>
          <div style={{fontWeight:'700', color:'var(--dark)', marginBottom:'3px'}}>
            Syllabus — {label}
          </div>
          <div style={{fontSize:'13px', color:'var(--txt2)'}}>
            CBSE Official Syllabus · Academic Year {year}
          </div>
        </div>
        <a href={url} download target="_blank" rel="noreferrer" style={dlStyle}>
          📥 Download Syllabus
        </a>
      </div>
    )
  }

  return (
    <div style={{padding:'18px 20px', borderRadius:'16px', background:'var(--bg2)', border:'1.5px solid var(--brd)', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap'}}>
      <div style={{fontSize:'28px'}}>📥</div>
      <div style={{flex:1, minWidth:'180px'}}>
        <div style={{fontWeight:'700', color:'var(--dark)', marginBottom:'3px'}}>Download Complete Syllabus</div>
        <div style={{fontSize:'13px', color:'var(--txt2)'}}>
          Syllabus PDF for {label} will be available soon.
        </div>
      </div>
      <Link to="/downloads" className="btn-or" style={{padding:'10px 20px', fontSize:'13px', flexShrink:0}}>
        View Downloads →
      </Link>
    </div>
  )
}

export default function SubjectList({ embedded }) {
  var [active,     setActive]     = useState('pp')
  var [levels,     setLevels]     = useState(LEVELS_TEMPLATE)
  var [syllabuses, setSyllabuses] = useState([])

  useEffect(function() {
    academicsAPI.get()
      .then(function(res) {
        var d = res.data

        if (d.streams && d.streams.length > 0) {
          setLevels(function(prev) {
            return prev.map(function(level) {
              var dbStream = d.streams.find(function(s) {
                return STREAM_TO_ID[s.name] === level.id
              })
              if (!dbStream || !dbStream.subjects || dbStream.subjects.length === 0) return level
              return {
                ...level,
                subjects: dbStream.subjects.map(function(subName) {
                  return { name:subName, code:'–', type:'Core' }
                }),
              }
            })
          })
        }

        if (d.syllabuses && d.syllabuses.length > 0) {
          setSyllabuses(d.syllabuses)
        }
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

  var lvl = levels.find(function(l) { return l.id === active })

  var syllabusEntry = syllabuses.find(function(s) {
    return s.level === SYLLABUS_MAP[active]
  })

  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">📚 Academics</div>
            <h1 className="pb-title">Subject <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Listing</span></h1>
            <p className="pb-sub">Class-wise subject listing from Pre-Primary to Class XII — CBSE / NCERT curriculum</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/academics">Academics</Link><span>›</span>
              <span className="bc-cur">Subjects</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', minHeight:'60vh', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>

          <div style={{overflowX:'auto', WebkitOverflowScrolling:'touch', marginBottom:'32px', paddingBottom:'4px'}}>
            <div style={{display:'flex', gap:'6px', background:'var(--bg2)', padding:'6px', borderRadius:'16px', border:'1.5px solid var(--brd)', minWidth:'max-content'}}>
              {levels.map(function(l) {
                var isActive  = active === l.id
                var tabBg     = isActive ? 'var(--card)' : 'transparent'
                var tabColor  = isActive ? l.color      : 'var(--txt2)'
                var tabShadow = isActive ? '0 4px 18px '+l.color+'25' : 'none'
                return (
                  <button key={l.id} onClick={function(){ setActive(l.id) }} style={{
                    display:'flex', alignItems:'center', gap:'6px',
                    padding:'9px 14px', borderRadius:'10px', border:'none', cursor:'pointer',
                    fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'700',
                    transition:'all .25s', background:tabBg, color:tabColor,
                    boxShadow:tabShadow, whiteSpace:'nowrap',
                  }}>
                    <span>{l.em}</span>
                    <span>{l.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div key={active} style={{animation:'fU .35s ease both'}}>

            <div style={{display:'flex', alignItems:'center', gap:'14px', marginBottom:'24px', padding:'18px 20px', borderRadius:'18px', background:'linear-gradient(135deg,'+lvl.color+'10,'+lvl.color+'04)', border:'1.5px solid '+lvl.color+'25', flexWrap:'wrap'}}>
              <div style={{fontSize:'36px'}}>{lvl.em}</div>
              <div style={{flex:1, minWidth:'160px'}}>
                <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', margin:'0 0 4px'}}>{lvl.label}</h2>
                <div style={{fontSize:'11px', fontWeight:'700', color:lvl.color, letterSpacing:'1px', textTransform:'uppercase'}}>{lvl.tag}</div>
              </div>
              <div style={{padding:'10px 18px', borderRadius:'12px', background:lvl.color+'15', textAlign:'center', flexShrink:0}}>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:lvl.color}}>{lvl.subjects.length}</div>
                <div style={{fontSize:'11px', color:'var(--txt3)'}}>Subjects</div>
              </div>
            </div>

            <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'18px'}}>
              {Object.entries(TYPE_STYLE).map(function(entry) {
                return (
                  <span key={entry[0]} style={{padding:'3px 10px', borderRadius:'50px', fontSize:'11px', fontWeight:'700', background:entry[1].bg, color:entry[1].color}}>
                    {entry[0]}
                  </span>
                )
              })}
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'10px', marginBottom:'28px'}}>
              {lvl.subjects.map(function(sub, i) {
                var st = TYPE_STYLE[sub.type] || TYPE_STYLE.Core
                return (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:'12px', padding:'14px 16px', borderRadius:'14px', background:'var(--card)', border:'1.5px solid var(--brd)'}}>
                    <div style={{width:'34px', height:'34px', borderRadius:'10px', background:lvl.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <div style={{width:'9px', height:'9px', borderRadius:'50%', background:lvl.color, boxShadow:'0 0 6px '+lvl.color}}></div>
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:'13.5px', fontWeight:'700', color:'var(--dark)', marginBottom:'4px', lineHeight:'1.3'}}>{sub.name}</div>
                      <div style={{display:'flex', alignItems:'center', gap:'5px', flexWrap:'wrap'}}>
                        {sub.code !== '–' && <span style={{fontSize:'10px', fontWeight:'700', color:'var(--txt3)'}}>Code: {sub.code}</span>}
                        <span style={{fontSize:'10px', fontWeight:'800', padding:'2px 7px', borderRadius:'50px', background:st.bg, color:st.color}}>{sub.type}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <SyllabusDownload entry={syllabusEntry} label={lvl.label} />

          </div>
        </div>
      </div>
    </>
  )
}