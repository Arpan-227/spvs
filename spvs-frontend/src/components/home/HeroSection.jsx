import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import useSettings from '../../hooks/useSettings'

function make3D(canvas) {
  if (!canvas) return () => {}
  const W = canvas.offsetWidth, H = canvas.offsetHeight
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
  camera.position.z = 5
  const pGeo = new THREE.BufferGeometry()
  const N = 120, pos = new Float32Array(N * 3)
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 18
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const pMat = new THREE.PointsMaterial({ color: 0xE8761A, size: 0.06, transparent: true, opacity: 0.5 })
  scene.add(new THREE.Points(pGeo, pMat))
  const shapes = []
  const geoms = [new THREE.TetrahedronGeometry(.35,0), new THREE.OctahedronGeometry(.28,0), new THREE.IcosahedronGeometry(.24,0)]
  const cols = [0xE8761A, 0xF5B800, 0xFF9A3C]
  for (let i = 0; i < 12; i++) {
    const m = new THREE.MeshBasicMaterial({ color: cols[i%3], wireframe: true, transparent: true, opacity: 0.18 })
    const mesh = new THREE.Mesh(geoms[i%3], m)
    mesh.position.set((Math.random()-0.5)*12, (Math.random()-0.5)*8, (Math.random()-0.5)*4)
    mesh.userData = { rx: Math.random()*.005, ry: Math.random()*.007 }
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

export default function HeroSection() {
  const cvRef = useRef(null)
  const { settings } = useSettings()

  const school    = settings.school    || {}
  const admission = settings.admission || {}

  const name      = school.name        || 'Sant Pathik Vidyalaya'
  const students  = school.students    || '1410+'
  const est       = school.established || '1987'
  const board     = school.board       || 'CBSE'
  const area      = school.area        || '10 Acres'
  const classrooms= school.classrooms  || '73'
  const affNo     = school.affNo       || '2130176'
  const schoolNo  = school.schoolNo    || '70178'
  const admOpen   = admission.open !== false

  useEffect(() => {
    const cleanup = make3D(cvRef.current)
    return cleanup
  }, [])

  return (
    <section className="hero" id="home">
      <canvas ref={cvRef} className="hero-canvas" />

      {/* ── DESKTOP ── */}
      <div className="hero-inner hero-desk">
        <div>
          {/* hero-badge → index.css: Poppins 700 */}
          <div className="hero-badge">
            <span className="hero-dot"></span>
            {board} Affiliated · Est. {est} · Bahraich
          </div>

          {/* hero-h1 → index.css: Playfair Display 700 */}
          <h1 className="hero-h1">
            <span className="ita">SPVS</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>

          {/* hero-sub → index.css: Playfair Display 400 italic (tagline/quote) */}
          <p className="hero-sub">"Education with Values and Excellence"</p>

          {/* hero-desc → index.css: Poppins 400 */}
          <p className="hero-desc">
            {name} Senior Secondary School — nurturing curious minds, strong values, and lifelong learners since {est} in Pashupati Nagar, Bahraich.
          </p>

          {/* btn-or, btn-out → index.css: Poppins 600 UPPERCASE */}
          <div className="hero-btns">
            <Link to="/contact" className="btn-or">{admOpen ? ' Enroll Now →' : '📋 Contact Us →'}</Link>
            <Link to="/about" className="btn-out">Explore School</Link>
          </div>

          {/* tr-info, rat-txt → index.css: Poppins 400 */}
          <div className="hero-trust">
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div className="avs">
                <div className="av">A</div><div className="av">S</div>
                <div className="av">R</div><div className="av">M</div>
              </div>
              <div className="tr-info"><strong>{students}</strong> students</div>
            </div>
            <div className="tr-div"></div>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <div className="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div className="rat-txt"><strong>4.9/5</strong></div>
            </div>
            <div className="tr-div"></div>
            <div className="tr-info">🏆 <strong>100%</strong> Pass</div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-card">
            <div style={{width:'100%',height:'100%',position:'relative',overflow:'hidden'}}>
              <img
                src="/images/school_hero.jpg"
                alt={name}
                style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}
                onError={function(e){
                  e.target.style.display='none'
                  e.target.nextSibling.style.display='flex'
                }}
              />
              {/* Fallback — school name: Playfair 700, sub: Poppins 400 */}
              <div style={{display:'none',width:'100%',height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',background:'linear-gradient(135deg,#FFF8DC,#FFD94A)',position:'absolute',inset:0}}>
                <div style={{fontSize:'80px'}}>🏫</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 20px'}}>{name}</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'14px',fontWeight:'400',color:'var(--txt2)',textAlign:'center'}}>Pashupati Nagar, Bahraich</div>
              </div>
            </div>
            <div className="hero-img-ov"></div>
            <div className="hero-img-txt">
              {/* h-img-badge → Poppins 600 (sub-heading badge) */}
              <div className="h-img-badge">🏆 Est. {est} · {area} Campus</div>
              {/* h-img-t → index.css: Playfair Display 700 */}
              <div className="h-img-t">Where Values Meet Excellence</div>
              {/* h-img-s → index.css: Poppins 400 */}
              <div className="h-img-s">{board} No. {schoolNo} · Affiliation {affNo}</div>
            </div>
          </div>

          {/* fbdg-n → index.css: Playfair Display 700 | fbdg-l → Poppins 400 */}
          <div className="fbdg fb1">
            <div className="fbdg-ic ic-or">🎓</div>
            <div><div className="fbdg-n">{students}</div><div className="fbdg-l">Students Enrolled</div></div>
          </div>
          <div className="fbdg fb2">
            <div className="fbdg-ic ic-gd">🏅</div>
            <div><div className="fbdg-n">100%</div><div className="fbdg-l">Board Results</div></div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="hero-mob">
        <div className="hm-text">
          {/* hm-badge → Poppins 700 (via hero-badge in index.css) */}
          <div className="hero-badge hm-badge">
            <span className="hero-dot"></span>
            {board} Affiliated · Est. {est} · Bahraich
          </div>

          {/* hm-h1 → Playfair Display 700 (via hero-h1 in index.css) */}
          <h1 className="hero-h1 hm-h1">
            <span className="ita">SPVS</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>

          {/* hm-sub → Playfair Display 400 italic (tagline/quote, via hero-sub in index.css) */}
          <p className="hero-sub hm-sub">"Education with Values and Excellence"</p>

          {/* hm-desc → Poppins 400 (via hero-desc in index.css) */}
          <p className="hero-desc hm-desc">
            {name} — nurturing curious minds and strong values since {est} in Pashupati Nagar, Bahraich.
          </p>
        </div>

        <div className="hm-card">
          <img
            src="/images/school_hero.jpg"
            alt={name}
            style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}
            onError={function(e){
              e.target.style.display='none'
              e.target.nextSibling.style.display='flex'
            }}
          />
          {/* Fallback — Playfair 700 name, Poppins 400 sub */}
          <div style={{display:'none',width:'100%',height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'10px',background:'linear-gradient(135deg,#FFF8DC,#FFD94A)',position:'absolute',inset:0}}>
            <div style={{fontSize:'60px'}}>🏫</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 14px'}}>{name}</div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'400',color:'var(--txt2)',textAlign:'center'}}>Pashupati Nagar, Bahraich</div>
          </div>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(28,10,0,.65) 0%,transparent 55%)'}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px 14px'}}>
            {/* Badge pill → Poppins 600 */}
            <div style={{fontFamily:"'Poppins',sans-serif",display:'inline-flex',alignItems:'center',gap:'5px',background:'rgba(245,184,0,.9)',padding:'3px 9px',borderRadius:'50px',fontSize:'10px',fontWeight:'600',color:'var(--dark)',marginBottom:'4px'}}>🏆 Est. {est} · {area}</div>
            {/* Overlay title → Playfair Display 700 */}
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'#fff',lineHeight:1.3}}>Where Values Meet Excellence</div>
            {/* Overlay sub → Poppins 400 */}
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'10px',fontWeight:'400',color:'rgba(255,255,255,.6)',marginTop:'2px'}}>{board} No. {schoolNo} · Affiliation {affNo}</div>
          </div>
          {/* Mini badge top-right */}
          <div style={{position:'absolute',top:'10px',right:'10px',background:'rgba(255,255,255,.92)',borderRadius:'9px',padding:'6px 10px',display:'flex',alignItems:'center',gap:'6px'}}>
            <span style={{fontSize:'14px'}}>🎓</span>
            <div>
              {/* Number → Playfair Display 700 */}
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:'700',color:'var(--dark)'}}>{students}</div>
              {/* Label → Poppins 500 */}
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'9px',fontWeight:'500',color:'var(--txt3)'}}>Students</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="hm-stats">
          {[[students,'Students'],['100%','Pass Rate'],[est.substring(2)+'yrs','Years'],[(school.classrooms||'73'),'Classes']].map(([n,l],i) => (
            <div key={i} className="hm-stat">
              {/* hm-stat-n → Playfair Display 700 (number) */}
              <div className="hm-stat-n">{n}</div>
              {/* hm-stat-l → Poppins 500 (label) */}
              <div className="hm-stat-l">{l}</div>
            </div>
          ))}
        </div>

        {/* btn-or, btn-out → index.css: Poppins 600 UPPERCASE */}
        <div className="hm-btns">
          <Link to="/contact" className="btn-or hm-btn">{admOpen ? '📋 Enrol Now →' : '📋 Contact Us'}</Link>
          <Link to="/about"   className="btn-out hm-btn">🏫 Explore School</Link>
        </div>

        {/* Trust bar → Poppins 400 */}
        <div className="hm-trust">
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style={{color:'#F5B800',fontSize:'12px'}}>★★★★★</span>
            <strong style={{fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'700',color:'var(--dark2)'}}>4.9/5</strong>
          </div>
          <div className="hm-tdiv"/>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'400',color:'var(--dark2)'}}><strong>{students}</strong> Students</div>
          <div className="hm-tdiv"/>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'400',color:'var(--dark2)'}}>🏆 <strong>100%</strong> Pass</div>
        </div>
      </div>

      <div className="scroll-hint"><span>Scroll Down</span><div className="s-wheel"><div className="s-wd"></div></div></div>
      <div className="hero-dots"><div className="hd act"></div><div className="hd"></div><div className="hd"></div></div>

      <style>{`
        .hero-mob { display: none; }

        @media (max-width: 768px) {
          .hero-desk   { display: none !important; }
          .scroll-hint { display: none !important; }
          .hero-dots   { display: none !important; }
          .hero        { min-height: auto !important; padding-bottom: 28px; }
          .hero-mob    { display: flex; flex-direction: column; gap: 16px; padding: 24px 16px 4px; position: relative; z-index: 4; }

          .hm-badge  { font-size: 10px !important; padding: 5px 12px !important; margin-bottom: 10px !important; display: inline-flex !important; }
          .hm-h1     { font-size: 32px !important; line-height: 1.2 !important; margin-bottom: 8px !important; }
          .hm-sub    { font-size: 13px !important; margin-bottom: 6px !important; }
          .hm-desc   { font-size: 13px !important; line-height: 1.6 !important; margin: 0 !important; }

          .hm-card   { border-radius: 18px; overflow: hidden; height: 215px; position: relative; box-shadow: 0 12px 36px rgba(232,118,26,.22); border: 1.5px solid rgba(232,118,26,.2); }

          .hm-stats  { display: flex; align-items: center; background: rgba(255,255,255,.92); backdrop-filter: blur(12px); border-radius: 14px; padding: 12px 6px; border: 1.5px solid rgba(232,118,26,.14); box-shadow: 0 4px 18px rgba(232,118,26,.08); }
          .hm-stat   { flex: 1; text-align: center; }
          .hm-stat + .hm-stat { border-left: 1px solid rgba(232,118,26,.15); }

          /* stat number → Playfair Display 700 */
          .hm-stat-n { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--or); line-height: 1; margin-bottom: 2px; }
          /* stat label → Poppins 500 */
          .hm-stat-l { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 500; color: var(--txt3); text-transform: uppercase; letter-spacing: 0.4px; }

          .hm-btns   { display: flex; flex-direction: row; gap: 10px; }
          .hm-btn    { flex: 1 !important; justify-content: center !important; text-align: center !important; font-size: 13px !important; padding: 12px 8px !important; }

          .hm-trust  { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 10px 14px; background: rgba(255,255,255,.85); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(232,118,26,.12); margin-bottom: 4px; }
          .hm-tdiv   { width: 1px; height: 16px; background: rgba(232,118,26,.2); flex-shrink: 0; }
        }

        @media (max-width: 480px) {
          .hm-h1     { font-size: 27px !important; }
          .hm-card   { height: 185px; }
          .hm-stat-n { font-size: 15px; }
          .hm-btn    { font-size: 12px !important; padding: 11px 5px !important; }
        }
      `}</style>
    </section>
  )
}