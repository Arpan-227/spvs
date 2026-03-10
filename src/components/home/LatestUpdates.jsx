import { Link } from 'react-router-dom'
const UPDATES = [
  { ic:'🎉', tag:'Admissions', date:'Mar 2025', title:'Admissions Open 2025-26', desc:'Enrolling students for Play Group to Class XII. Limited seats available. Apply early to secure admission.' },
  { ic:'🏅', tag:'Achievement', date:'Jan 2025', title:'District Sports Champions', desc:'SPVS wins Gold in Kabaddi, Chess, Volleyball, Shot-put, 100m, 200m, 400m, 800m and Long Jump.' },
  { ic:'📺', tag:'National', date:'Dec 2024', title:'KBC Winner — ₹3,20,000', desc:'Aarav Raghuvansh of Class V wins ₹3,20,000 on Kaun Banega Crorepati. School felicitated him with cheque.' },
  { ic:'🏆', tag:'Results', date:'Jun 2024', title:'100% Board Results Again', desc:'SPVS achieves 100% pass rate in CBSE Class X and Class XII board examinations for the academic year.' },
  { ic:'🔬', tag:'Infrastructure', date:'Apr 2024', title:'New STEM Lab Inaugurated', desc:'State-of-the-art STEM & Junior Tinkering Lab opened for students to explore robotics and innovation.' },
  { ic:'🏃', tag:'Sports', date:'Mar 2024', title:'CBSE Cluster Level — Runner Up', desc:'School reaches Runner-Up position in Kabaddi (U-17) at CBSE cluster level games and sports event.' },
]
export default function LatestUpdates() {
  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'48px',flexWrap:'wrap',gap:'16px'}}>
          <div className="rv">
            <div className="chip"><span className="chip-dot"></span>Latest News</div>
            <h2 className="sec-title">Updates &amp; <span className="hl">News</span></h2>
            <div className="s-bar" style={{marginBottom:'0'}}></div>
          </div>
          <Link to="/blog" className="btn-out rv" style={{transitionDelay:'.2s'}}>View All →</Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'18px'}}>
          {UPDATES.map((u,i) => (
            <div className={`wcard rv3d d${(i%5)+1}`} key={i} style={{padding:'22px 24px',cursor:'pointer'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                <span style={{fontSize:'24px'}}>{u.ic}</span>
                <span style={{fontSize:'11px',fontWeight:'700',color:'var(--or)',background:'rgba(232,118,26,.08)',padding:'3px 10px',borderRadius:'50px',letterSpacing:'1px',textTransform:'uppercase'}}>{u.tag}</span>
                <span style={{fontSize:'11px',color:'var(--txt3)',marginLeft:'auto'}}>{u.date}</span>
              </div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px'}}>{u.title}</div>
              <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65'}}>{u.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}