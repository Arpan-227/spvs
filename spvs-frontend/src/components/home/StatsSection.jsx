import { useEffect, useRef, useState } from 'react'
import { FaGraduationCap, FaChalkboardTeacher, FaBus, FaTrophy } from 'react-icons/fa'

function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatItem({ icon, n, sfx, lbl }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const count = useCountUp(n, 1800, active)
  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-em">{icon}</span>
      <span className="stat-n">{count}<span className="stat-sfx">{sfx}</span></span>
      <span className="stat-lbl">{lbl}</span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="stats-sect">
      <div className="stats-grid">
        <StatItem icon={<FaGraduationCap size={32} color="#E8761A" />} n={1410} sfx="+" lbl="Students Enrolled" />
        <StatItem icon={<FaChalkboardTeacher size={32} color="#E8761A" />} n={64} sfx="+" lbl="Qualified Teachers" />
        <StatItem icon={<FaBus size={32} color="#E8761A" />} n={22} sfx="" lbl="School Buses" />
        <StatItem icon={<FaTrophy size={32} color="#E8761A" />} n={100} sfx="%" lbl="Board Pass Rate" />
      </div>
    </section>
  )
}