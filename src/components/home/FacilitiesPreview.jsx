import { useState, useRef } from 'react'

const FACILITIES = [
  { em:'🔬', name:'Science Labs', desc:'Physics, Chemistry, Biology labs — fully equipped with modern apparatus for practical learning.' },
  { em:'💻', name:'Computer Labs', desc:'2 computer labs with high-speed internet, latest systems and modern software tools.' },
  { em:'📚', name:'Library', desc:'Well-stocked library with books, magazines, newspapers and digital resources for all classes.' },
  { em:'🏟️', name:'Sports Stadium', desc:'Sports mini stadium with all synthetic playgrounds — Kabaddi, Volleyball, Athletics and more.' },
  { em:'🎨', name:'Art & Music', desc:'Dedicated art room and music studio for vocal and instrumental training by qualified teachers.' },
  { em:'🤖', name:'STEM Tinkering Lab', desc:'STEM & Junior Tinkering Lab for innovative minds — robotics, projects and hands-on learning.' },
  { em:'📡', name:'Smart Classrooms', desc:'Digital classrooms with smart boards and computer-aided learning in all sections.' },
  { em:'🏠', name:'Boys Hostel', desc:'Safe, secure 24×7 boys hostel with visiting doctor, yoga, sports and clean mess facilities.' },
]

export default function FacilitiesPreview() {
  const [idx, setIdx] = useState(0)
  const maxIdx = Math.max(0, FACILITIES.length - 4)

  return (
    <section className="fac-sect sect">
      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Our Facilities</div>
          <h2 className="sec-title">World-Class <span className="hl">Facilities</span></h2>
          <div className="s-bar"></div>
          <p className="s-desc">Modern infrastructure designed to inspire learning and all-round development.</p>
        </div>
        <div className="fac-overflow">
          <div className="fac-track" style={{transform:`translateX(calc(-${idx * (25)}% - ${idx*20}px))`}}>
            {FACILITIES.map((f,i) => (
              <div className="fac-card rv3d" key={i} style={{transitionDelay:`${i*0.07}s`}}>
                <div className="fac-cir fac-em">{f.em}</div>
                <div className="fac-name">{f.name}</div>
                <div className="fac-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="fac-navs">
          <button className="fac-nb" onClick={() => setIdx(i => Math.max(0, i-1))}>‹</button>
          <button className="fac-nb" onClick={() => setIdx(i => Math.min(maxIdx, i+1))}>›</button>
        </div>
      </div>
    </section>
  )
}