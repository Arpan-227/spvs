import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBolt, FaFlask, FaMicroscope, FaLaptop, FaRocket, FaUsers, FaGraduationCap, FaBuilding } from 'react-icons/fa'

const LABS = [
  {
    id:'physics', icon:<FaBolt size={44} color="#E8761A"/>, iconSm:<FaBolt size={26} color="#fff"/>, name:'Physics Lab', color:'#E8761A',
    desc:'Fully equipped for Class IX–XII experiments. All CBSE practical experiments covered with modern apparatus.',
    equipment:['Vernier Calipers & Screw Gauge','Metre Bridge & Wheatstone Bridge','Galvanometer & Ohmmeter','Optical Bench & Lenses','Prism & Spectrometer','Sonometer & Tuning Forks','Power Supplies & Multimeters','Charts & 3D Models'],
    capacity:'30 students', classes:'Class IX – XII'
  },
  {
    id:'chemistry', icon:<FaFlask size={44} color="#6C3FC5"/>, iconSm:<FaFlask size={26} color="#fff"/>, name:'Chemistry Lab', color:'#6C3FC5',
    desc:'Safety-compliant chemistry laboratory with fume hood, proper storage and all CBSE prescribed chemicals and glassware.',
    equipment:['Burettes, Pipettes & Conical Flasks','Heating Mantles & Bunsen Burners','pH Meters & Colorimeters','Chemical Balance (Electronic)','Fume Hood & Safety Cabinet','Distilled Water Plant','Acid & Base Storage Units','First Aid Kit & Fire Extinguisher'],
    capacity:'30 students', classes:'Class IX – XII'
  },
  {
    id:'biology', icon:<FaMicroscope size={44} color="#22a35a"/>, iconSm:<FaMicroscope size={26} color="#fff"/>, name:'Biology Lab', color:'#22a35a',
    desc:'Modern biology lab with compound microscopes, preserved specimens, models and all CBSE practical requirements.',
    equipment:['Compound Microscopes (20+)','Dissection Kits & Trays','Preserved Specimens (Earthworm, Frog)','Permanent & Temporary Slides','Skeleton & Body Models','Charts: Human Systems','Plant Specimens & Herbarium','Autoclave & Sterilizer'],
    capacity:'30 students', classes:'Class IX – XII'
  },
  {
    id:'computer', icon:<FaLaptop size={44} color="#F5B800"/>, iconSm:<FaLaptop size={26} color="#fff"/>, name:'Computer Lab', color:'#F5B800',
    desc:'Two computer labs with high-speed internet. Used for IT practicals, computer science, typing and digital learning.',
    equipment:['60+ Desktop Computers','High-Speed Broadband Internet','LaserJet Printers','Projector & Smart Screen','UPS Power Backup','Licensed Windows & MS Office','Tally ERP (Commerce)','C++ & Python Compiler (CS)'],
    capacity:'30 students per lab', classes:'Class I – XII'
  },
  {
    id:'stem', icon:<FaRocket size={44} color="#0F1B3D"/>, iconSm:<FaRocket size={26} color="#fff"/>, name:'STEM Lab', color:'#0F1B3D',
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
            <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaBuilding size={12}/> Facilities</div>
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

          {/* Lab selector */}
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
            {LABS.map(l => (
              <button key={l.id} onClick={() => setActive(l.id)} style={{
                display:'flex', alignItems:'center', gap:'7px',
                padding:'9px 16px', borderRadius:'50px', border:'none', cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .25s',
                background: active===l.id ? l.color : 'var(--bg2)',
                color: active===l.id ? '#fff' : 'var(--txt2)',
                boxShadow: active===l.id ? `0 5px 18px ${l.color}40` : 'none',
              }}>
                <span>{l.iconSm}</span><span>{l.name}</span>
              </button>
            ))}
          </div>

          <div key={active} style={{animation:'fU .35s ease both'}}>
            <div className="labs-detail" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',alignItems:'start',marginBottom:'24px'}}>
              {/* Info */}
              <div style={{background:`linear-gradient(135deg,${lab.color}10,${lab.color}04)`,border:`1.5px solid ${lab.color}25`,borderRadius:'20px',padding:'28px'}}>
                <div style={{marginBottom:'14px'}}>{lab.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'var(--dark)',marginBottom:'10px'}}>{lab.name}</h3>
                <p style={{fontSize:'14px',color:'var(--txt2)',lineHeight:'1.75',marginBottom:'18px'}}>{lab.desc}</p>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  {[
                    { icon:<FaUsers size={14} color={lab.color}/>, val:lab.capacity },
                    { icon:<FaGraduationCap size={14} color={lab.color}/>, val:lab.classes },
                  ].map(function(item) {
                    return (
                      <div key={item.val} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 14px',borderRadius:'10px',background:`${lab.color}12`,border:`1px solid ${lab.color}25`}}>
                        {item.icon}
                        <span style={{fontSize:'13px',fontWeight:'700',color:lab.color}}>{item.val}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Equipment */}
              <div style={{background:'var(--card)',borderRadius:'20px',padding:'28px',border:'1.5px solid var(--brd)'}}>
                <div style={{fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)',marginBottom:'16px'}}>Equipment & Apparatus</div>
                <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                  {lab.equipment.map((eq, i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'10px',background:i%2===0?'var(--bg2)':'transparent',fontSize:'13px',color:'var(--txt2)'}}>
                      <div style={{width:'7px',height:'7px',borderRadius:'50%',background:lab.color,flexShrink:0,boxShadow:`0 0 6px ${lab.color}`}}></div>
                      {eq}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Labs summary tiles */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'10px'}}>
              {LABS.map(l => (
                <div key={l.id} onClick={() => setActive(l.id)} style={{
                  padding:'16px', borderRadius:'14px', textAlign:'center', cursor:'pointer',
                  background: active===l.id ? `linear-gradient(135deg,${l.color},${l.color}bb)` : 'var(--card)',
                  border: active===l.id ? 'none' : '1.5px solid var(--brd)',
                  transition:'all .3s cubic-bezier(.34,1.56,.64,1)',
                  boxShadow: active===l.id ? `0 8px 24px ${l.color}40` : 'none',
                  transform: active===l.id ? 'translateY(-4px)' : 'translateY(0)',
                }}>
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'7px'}}>{l.iconSm}</div>
                  <div style={{fontSize:'12px',fontWeight:'700',color:active===l.id?'#fff':'var(--dark)'}}>{l.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width:640px) { .labs-detail { grid-template-columns:1fr !important; } }`}</style>
    </>
  )
}