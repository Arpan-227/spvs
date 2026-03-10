import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LABS = [
  {
    id:'physics', em:'⚡', name:'Physics Lab', color:'#E8761A',
    desc:'Fully equipped for Class IX–XII experiments. All CBSE practical experiments covered with modern apparatus.',
    equipment:['Vernier Calipers & Screw Gauge','Metre Bridge & Wheatstone Bridge','Galvanometer & Ohmmeter','Optical Bench & Lenses','Prism & Spectrometer','Sonometer & Tuning Forks','Power Supplies & Multimeters','Charts & 3D Models'],
    capacity:'30 students', classes:'Class IX – XII'
  },
  {
    id:'chemistry', em:'⚗️', name:'Chemistry Lab', color:'#6C3FC5',
    desc:'Safety-compliant chemistry laboratory with fume hood, proper storage and all CBSE prescribed chemicals and glassware.',
    equipment:['Burettes, Pipettes & Conical Flasks','Heating Mantles & Bunsen Burners','pH Meters & Colorimeters','Chemical Balance (Electronic)','Fume Hood & Safety Cabinet','Distilled Water Plant','Acid & Base Storage Units','First Aid Kit & Fire Extinguisher'],
    capacity:'30 students', classes:'Class IX – XII'
  },
  {
    id:'biology', em:'🔬', name:'Biology Lab', color:'#22a35a',
    desc:'Modern biology lab with compound microscopes, preserved specimens, models and all CBSE practical requirements.',
    equipment:['Compound Microscopes (20+)','Dissection Kits & Trays','Preserved Specimens (Earthworm, Frog)','Permanent & Temporary Slides','Skeleton & Body Models','Charts: Human Systems','Plant Specimens & Herbarium','Autoclave & Sterilizer'],
    capacity:'30 students', classes:'Class IX – XII'
  },
  {
    id:'computer', em:'💻', name:'Computer Lab', color:'#F5B800',
    desc:'Two computer labs with high-speed internet. Used for IT practicals, computer science, typing and digital learning.',
    equipment:['60+ Desktop Computers','High-Speed Broadband Internet','LaserJet Printers','Projector & Smart Screen','UPS Power Backup','Licensed Windows & MS Office','Tally ERP (Commerce)','C++ & Python Compiler (CS)'],
    capacity:'30 students per lab', classes:'Class I – XII'
  },
  {
    id:'stem', em:'🚀', name:'STEM Lab', color:'#0F1B3D',
    desc:'New STEM lab for project-based learning. Robotics kits, 3D printing and hands-on experiments for innovation.',
    equipment:['Arduino & Raspberry Pi Kits','Robotics & Automation Sets','3D Printer','Electronic Circuit Boards','Sensor & Actuator Kits','Solar Energy Kits','Project Display Board','Tool Kit & Workbenches'],
    capacity:'25 students', classes:'Class VI – XII'
  },
]

export default function Labs({ embedded = false }) {
  const [active, setActive] = useState('physics')
  const lab = LABS.find(l => l.id === active)

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
            <h1 className="pb-title">Our <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Laboratories</span></h1>
            <p className="pb-sub">8 state-of-the-art labs — Physics, Chemistry, Biology, Computer Science & STEM</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Laboratories</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Lab selector tabs */}
          <div className="" style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'28px'}}>
            {LABS.map(l => (
              <button key={l.id} onClick={() => setActive(l.id)} style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'10px 18px', borderRadius:'50px', border:'none', cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .25s',
                background: active===l.id ? l.color : 'var(--bg2)',
                color: active===l.id ? '#fff' : 'var(--txt2)',
                boxShadow: active===l.id ? `0 5px 18px ${l.color}40` : 'none',
              }}>
                <span>{l.em}</span>{l.name}
              </button>
            ))}
          </div>

          {/* Lab detail */}
          <div key={active} style={{animation:'fU .35s ease both', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', alignItems:'start'}}>
            {/* Info */}
            <div style={{background:`linear-gradient(135deg,${lab.color}10,${lab.color}04)`, border:`1.5px solid ${lab.color}25`, borderRadius:'22px', padding:'32px'}}>
              <div style={{fontSize:'52px', marginBottom:'16px'}}>{lab.em}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>{lab.name}</h3>
              <p style={{fontSize:'14.5px', color:'var(--txt2)', lineHeight:'1.75', marginBottom:'20px'}}>{lab.desc}</p>
              <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
                {[['👥', lab.capacity], ['🎓', lab.classes]].map(([ic, val]) => (
                  <div key={val} style={{display:'flex', alignItems:'center', gap:'8px', padding:'8px 16px', borderRadius:'10px', background:`${lab.color}12`, border:`1px solid ${lab.color}25`}}>
                    <span>{ic}</span>
                    <span style={{fontSize:'13px', fontWeight:'700', color:lab.color}}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div style={{background:'var(--card)', borderRadius:'22px', padding:'32px', border:'1.5px solid var(--brd)'}}>
              <div style={{fontSize:'12px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--txt3)', marginBottom:'18px'}}>Equipment & Apparatus</div>
              <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                {lab.equipment.map((eq, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:'12px', padding:'10px 14px', borderRadius:'10px', background:i%2===0?'var(--bg2)':'transparent', fontSize:'13.5px', color:'var(--txt2)'}}>
                    <div style={{width:'8px', height:'8px', borderRadius:'50%', background:lab.color, flexShrink:0, boxShadow:`0 0 6px ${lab.color}`}}></div>
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All labs summary */}
          <div className="" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'12px', marginTop:'28px'}}>
            {LABS.map(l => (
              <div key={l.id} onClick={() => setActive(l.id)} style={{
                padding:'18px', borderRadius:'16px', textAlign:'center', cursor:'pointer',
                background: active===l.id ? `linear-gradient(135deg,${l.color},${l.color}bb)` : 'var(--card)',
                border: active===l.id ? 'none' : '1.5px solid var(--brd)',
                transition:'all .3s cubic-bezier(.34,1.56,.64,1)',
                boxShadow: active===l.id ? `0 8px 24px ${l.color}40` : 'none',
                transform: active===l.id ? 'translateY(-4px)' : 'translateY(0)',
              }}>
                <div style={{fontSize:'28px', marginBottom:'8px'}}>{l.em}</div>
                <div style={{fontSize:'12.5px', fontWeight:'700', color: active===l.id ? '#fff' : 'var(--dark)'}}>{l.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}