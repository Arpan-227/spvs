import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'

function make3D(canvas) {
  if (!canvas) return () => {}
  const W = canvas.offsetWidth, H = canvas.offsetHeight
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 5
  const shapes = []
  const geoms = [new THREE.TetrahedronGeometry(.3,0), new THREE.OctahedronGeometry(.22,0)]
  const cols = [0xE8761A, 0xF5B800, 0xFF9A3C, 0xFFBB7A]
  for (let i = 0; i < 10; i++) {
    const m = new THREE.MeshBasicMaterial({ color: cols[i%4], wireframe: true, transparent: true, opacity: 0.12 })
    const mesh = new THREE.Mesh(geoms[i%2], m)
    mesh.position.set((Math.random()-.5)*14, (Math.random()-.5)*8, (Math.random()-.5)*4)
    mesh.userData = { rx: Math.random()*.006, ry: Math.random()*.008 }
    scene.add(mesh); shapes.push(mesh)
  }
  let raf
  const animate = () => {
    raf = requestAnimationFrame(animate)
    shapes.forEach(s => { s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry })
    renderer.render(scene, camera)
  }
  animate()
  return () => { cancelAnimationFrame(raf); renderer.dispose() }
}

const STREAMS = [
  {
    em: '⚗️', title: 'Science Stream', sub: 'Class XI – XII',
    subjects: ['Physics', 'Chemistry', 'Biology / Maths', 'English Core', 'Hindi / CS / PE'],
    color: '#E8761A', bg: 'rgba(232,118,26,.06)',
    desc: 'PCB & PCM with fully equipped labs. Ideal for medical, engineering and research aspirants.'
  },
  {
    em: '💼', title: 'Commerce Stream', sub: 'Class XI – XII',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English Core', 'Hindi / CS / PE'],
    color: '#F5B800', bg: 'rgba(245,184,0,.06)',
    desc: 'Build the foundation for CA, MBA, banking and entrepreneurship.'
  },
  {
    em: '🌐', title: 'Humanities Stream', sub: 'Class XI – XII',
    subjects: ['History', 'Political Science', 'Economics', 'English Core', 'Hindi / CS / PE'],
    color: '#6C3FC5', bg: 'rgba(108,63,197,.06)',
    desc: 'Prepare for law, civil services, journalism and social sciences.'
  },
]

const LEVELS = [
  { em:'🌱', lbl:'Pre-Primary',  tag:'PG – UKG',   students:'160+' },
  { em:'📖', lbl:'Primary',      tag:'Class I – V', students:'376+' },
  { em:'📐', lbl:'Middle',       tag:'Class VI – VIII', students:'285+' },
  { em:'🔬', lbl:'Secondary',    tag:'Class IX – X', students:'315+' },
  { em:'🎓', lbl:'Sr. Secondary',tag:'Class XI – XII', students:'274+' },
]

export default function CurriculumSection() {
  const cvRef = useRef(null)
  useEffect(() => {
    const cleanup = make3D(cvRef.current)
    return cleanup
  }, [])

  return (
    <section className="sect" style={{background:'var(--bg2)',position:'relative',overflow:'hidden'}}>
      <canvas ref={cvRef} className="s-canvas" style={{opacity:.3}} />
      <div className="s-cont" style={{position:'relative',zIndex:3}}>

        {/* Header */}
        <div className="rv" style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="chip"><span className="chip-dot"></span>Our Curriculum</div>
          <h2 className="sec-title">Comprehensive <span className="hl">Education</span><br/>from Nursery to Class XII</h2>
          <div className="s-bar" style={{margin:'10px auto 18px'}}></div>
          <p className="s-desc" style={{margin:'0 auto'}}>
            CBSE curriculum with NCERT books · Experienced faculty · Modern infrastructure · 100% board results
          </p>
        </div>

        {/* Level pills */}
        <div className="rv" style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center',marginBottom:'52px'}}>
          {LEVELS.map((l,i) => (
            <div key={i} className="rv3d" style={{
              transitionDelay:`${i*0.08}s`,
              background:'var(--card)',border:'1.5px solid var(--brd)',
              borderRadius:'14px',padding:'16px 20px',textAlign:'center',
              boxShadow:'0 4px 18px rgba(232,118,26,.07)',minWidth:'110px',cursor:'default',
              transition:'all .35s cubic-bezier(.34,1.56,.64,1)'
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--or)';e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 14px 36px var(--shd)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--brd)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 18px rgba(232,118,26,.07)'}}
            >
              <div style={{fontSize:'28px',marginBottom:'6px'}}>{l.em}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:'700',color:'var(--dark)',marginBottom:'3px'}}>{l.lbl}</div>
              <div style={{fontSize:'11px',color:'var(--txt3)',marginBottom:'4px'}}>{l.tag}</div>
              <div style={{fontSize:'12px',fontWeight:'700',color:'var(--or)'}}>{l.students}</div>
            </div>
          ))}
        </div>

        {/* Senior Secondary Streams */}
        <div className="rv" style={{textAlign:'center',marginBottom:'28px'}}>
          <div style={{fontSize:'13px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)'}}>Senior Secondary Streams (Class XI–XII)</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px',marginBottom:'40px'}}>
          {STREAMS.map((s,i) => (
            <div key={i} className="rv3d" style={{
              transitionDelay:`${i*0.12}s`,
              background:s.bg,border:`1.5px solid ${s.color}22`,
              borderRadius:'20px',padding:'28px 24px',
              transition:'all .4s cubic-bezier(.34,1.56,.64,1)',cursor:'default'
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-8px) rotateX(3deg)';e.currentTarget.style.boxShadow=`0 20px 50px ${s.color}25`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0) rotateX(0)';e.currentTarget.style.boxShadow='none'}}
            >
              <div style={{fontSize:'40px',marginBottom:'12px'}}>{s.em}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--dark)',marginBottom:'4px'}}>{s.title}</div>
              <div style={{fontSize:'11px',fontWeight:'700',color:s.color,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'12px'}}>{s.sub}</div>
              <p style={{fontSize:'13.5px',color:'var(--txt2)',lineHeight:'1.65',marginBottom:'16px'}}>{s.desc}</p>
              <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                {s.subjects.map((subj,j) => (
                  <div key={j} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'var(--txt2)'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:s.color,flexShrink:0}}></div>
                    {subj}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rv" style={{textAlign:'center'}}>
          <Link to="/academics" className="btn-or" style={{marginRight:'14px'}}>📚 View Full Curriculum →</Link>
          <Link to="/academics/fees" className="btn-out">📋 Fee Structure</Link>
        </div>
      </div>
    </section>
  )
}