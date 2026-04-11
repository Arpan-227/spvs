import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import useSettings from '../../hooks/useSettings'
import { FaClipboardList, FaPhone, FaSchool, FaBriefcase } from 'react-icons/fa'

export default function CTASection() {
  const cvRef = useRef(null)
  const { settings } = useSettings()

  const school    = settings.school    || {}
  const admission = settings.admission || {}
  const contact   = settings.contact   || {}

  const name     = school.name     || 'Sant Pathik Vidyalaya'
  const students = school.students || '1,410+'
  const phone    = contact.phone1  || '9198783830'
  const admOpen  = admission.open !== false
  const session  = admission.session || '2025–26'
  const notice   = admission.notice || 'Join ' + students + ' students at ' + name + ' — where academic excellence meets strong values. CBSE affiliated, experienced faculty, modern facilities. Play Group to Class XII.'

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
        <div className="cta-badge" style={{display:'inline-flex',alignItems:'center',gap:'7px'}}>
          <FaClipboardList size={13}/>
          {admOpen ? 'Admissions Open ' + session : 'Enquire Now'}
        </div>
        <h2 className="cta-title">Give Your Child the<br/><em>Best Start</em> in Life</h2>
        <p className="cta-desc">{notice}</p>
        <div className="cta-btns">
          <Link to="/contact" className="btn-w" style={{display:'inline-flex',alignItems:'center',gap:'8px'}}>
            <FaClipboardList size={14}/> {admOpen ? 'Apply Now →' : 'Contact Us →'}
          </Link>
          <a href={'tel:+91' + phone} className="btn-w" style={{background:'rgba(255,255,255,.15)',color:'#fff',backdropFilter:'blur(10px)',display:'inline-flex',alignItems:'center',gap:'8px'}}>
            <FaPhone size={13}/> Call: +91 {phone}
          </a>
          <Link to="/campus-life" className="btn-w" style={{background:'rgba(255,255,255,.15)',color:'#fff',backdropFilter:'blur(10px)',display:'inline-flex',alignItems:'center',gap:'8px'}}>
            <FaSchool size={14}/> Explore Campus Life
          </Link>
          <Link to="/campus-life?tab=jobs" className="btn-w" style={{background:'rgba(255,255,255,.15)',color:'#fff',backdropFilter:'blur(10px)',display:'inline-flex',alignItems:'center',gap:'8px'}}>
            <FaBriefcase size={13}/> Jobs & Careers
          </Link>
        </div>
      </div>
    </section>
  )
}