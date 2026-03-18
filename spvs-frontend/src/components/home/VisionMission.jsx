export default function VisionMission() {
  const cards = [
    { ic:'🌟', title:'Our Vision', desc:'Education with Values and Excellence — creating confident, ethical, and globally competent citizens who are rooted in Indian culture.' },
    { ic:'🎯', title:'Our Mission', desc:'To create an environment where children learn modern education alongside Indian cultural values, becoming self-directed and self-managed individuals.' },
    { ic:'💎', title:'Core Values', desc:'Integrity · Respect · Discipline · Team Work · Excellence — these principles guide every aspect of life at Sant Pathik Vidyalaya.' },
    { ic:'🏆', title:'Our Achievements', desc:'100% board results, CBSE cluster sports runner-up, KBC winner, National essay competition medalist, and district sports champions.' },
  ]
  return (
    <section className="sect" style={{background:'var(--bg2)'}}>
      <div className="s-cont">
        <div className="rv" style={{textAlign:'center',marginBottom:'48px'}}>
          <div className="chip"><span className="chip-dot"></span>Vision & Mission</div>
          <h2 className="sec-title">What <span className="hl">Drives</span> Us</h2>
          <div className="s-bar" style={{margin:'10px auto 0'}}></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px'}}>
          {cards.map((c,i) => (
            <div className={`wcard rv3d d${i+1}`} key={i} style={{padding:'28px 24px',cursor:'default'}}>
              <div style={{fontSize:'40px',marginBottom:'14px'}}>{c.ic}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'var(--dark)',marginBottom:'10px'}}>{c.title}</div>
              <div style={{fontSize:'14px',color:'var(--txt2)',lineHeight:'1.7'}}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}