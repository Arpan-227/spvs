import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'

export default function CTASection() {
  const cvRef = useRef(null)
  useEffect(() => {
    const canvas = cvRef.current
    if (!canvas) return
    const W = canvas.offsetWidth, H = canvas.offsetHeight
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 100)
    camera.position.z = 5
    const geo = new THREE.BufferGeometry()
    const N = 120, pos = new Float32Array(N*3)
    for (let i = 0; i < N*3; i++) pos[i] = (Math.random()-.5)*14
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.5 })))
    let raf
    const animate = () => { raf = requestAnimationFrame(animate); renderer.render(scene, camera) }
    animate()
    return () => { cancelAnimationFrame(raf); renderer.dispose() }
  }, [])

  return (
    <section className="cta-sect">
      <canvas ref={cvRef} className="cta-canvas" />
      <div className="cta-inner rv">
        <div className="cta-badge">📋 Admissions Open 2025–26</div>
        <h2 className="cta-title">Give Your Child the<br/><em>Best Start</em> in Life</h2>
        <p className="cta-desc">
          Join 1,410+ students at Sant Pathik Vidyalaya — where academic excellence meets strong values. CBSE affiliated, experienced faculty, modern facilities. Play Group to Class XII.
        </p>
        <div className="cta-btns">
          <Link to="/contact" className="btn-w">📋 Apply Now →</Link>
          <a href="tel:+919198783830" className="btn-w" style={{background:'rgba(255,255,255,.15)',color:'#fff',backdropFilter:'blur(10px)'}}>
            📞 Call: +91 9198783830
          </a>
          <Link to="/campus-life" className="btn-w" style={{background:'rgba(255,255,255,.15)',color:'#fff',backdropFilter:'blur(10px)'}}>
            🏫 Explore Campus Life
          </Link>
          <Link to="/campus-life?tab=jobs" className="btn-w" style={{background:'rgba(255,255,255,.15)',color:'#fff',backdropFilter:'blur(10px)'}}>
            💼 Jobs & Careers
          </Link>
        </div>
      </div>
    </section>
  )
}