import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'

function make3D(canvas) {
  if (!THREE || !canvas) return () => {}
  const W = canvas.offsetWidth, H = canvas.offsetHeight
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
  camera.position.z = 5
  // Particles
  const pGeo = new THREE.BufferGeometry()
  const N = 160, pos = new Float32Array(N * 3)
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 18
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const pMat = new THREE.PointsMaterial({ color: 0xE8761A, size: 0.06, transparent: true, opacity: 0.5 })
  scene.add(new THREE.Points(pGeo, pMat))
  // 3D shapes
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

  useEffect(() => {
    const cleanup = make3D(cvRef.current)
    return cleanup
  }, [])

  return (
    <section className="hero" id="home">
      <canvas ref={cvRef} className="hero-canvas" />
      <div className="hero-inner">
        {/* LEFT */}
        <div>
          <div className="hero-badge">
            <span className="hero-dot"></span>
            CBSE Affiliated · Est. 1987 · Bahraich
          </div>
          <h1 className="hero-h1">
            <span className="ita">SPVS</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>
          <p className="hero-sub">"Education with Values and Excellence"</p>
          <p className="hero-desc">
            Sant Pathik Vidyalaya Senior Secondary School — nurturing curious minds, strong values, and lifelong learners since 1987 in Pashupati Nagar, Bahraich.
          </p>
          <div className="hero-btns">
            <Link to="/contact" className="btn-or">📋 Enrol Now →</Link>
            <Link to="/about" className="btn-out">🏫 Explore School</Link>
          </div>
          <div className="hero-trust">
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div className="avs">
                <div className="av">A</div><div className="av">S</div>
                <div className="av">R</div><div className="av">M</div>
              </div>
              <div className="tr-info"><strong>1,410+</strong> students enrolled</div>
            </div>
            <div className="tr-div"></div>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <div className="stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="rat-txt"><strong>4.9/5</strong> rated</div>
            </div>
            <div className="tr-div"></div>
            <div className="tr-info">🏆 <strong>100%</strong> Pass Rate</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="hero-img-card" style={{background:'linear-gradient(135deg,#FFF3CC,#FFE0A0)'}}>
            {/* Placeholder — replace with actual school photo */}
            <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',background:'linear-gradient(135deg,#FFF8DC,#FFD94A)'}}>
              <div style={{fontSize:'80px'}}>🏫</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 20px'}}>Sant Pathik Vidyalaya</div>
              <div style={{fontSize:'14px',color:'var(--txt2)',textAlign:'center'}}>Pashupati Nagar, Bahraich</div>
            </div>
            <div className="hero-img-ov"></div>
            <div className="hero-img-txt">
              <div className="h-img-badge">🏆 Est. 1987 · 10 Acres Campus</div>
              <div className="h-img-t">Where Values Meet Excellence</div>
              <div className="h-img-s">CBSE No. 70178 · Affiliation 2130176</div>
            </div>
          </div>
          {/* Floating badges */}
          <div className="fbdg fb1">
            <div className="fbdg-ic ic-or">🎓</div>
            <div><div className="fbdg-n">1410+</div><div className="fbdg-l">Students Enrolled</div></div>
          </div>
          <div className="fbdg fb2">
            <div className="fbdg-ic ic-gd">🏅</div>
            <div><div className="fbdg-n">100%</div><div className="fbdg-l">Board Results</div></div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <span>Scroll Down</span>
        <div className="s-wheel"><div className="s-wd"></div></div>
      </div>
      <div className="hero-dots">
        <div className="hd act"></div>
        <div className="hd"></div>
        <div className="hd"></div>
      </div>
    </section>
  )
}