import { Link } from 'react-router-dom'
export default function HostelSection() {
  const amenities = ['🔒 24×7 Security','🏥 Visiting Doctor','🧘 Yoga & Exercises','🏟️ Sports Stadium','🍽️ Clean Hygienic Mess','📚 Study Room','🚿 Clean Bathrooms','🛡️ Safe Campus']
  return (
    <section className="sect" style={{background:'linear-gradient(135deg,var(--dark) 0%,var(--dark2) 100%)',padding:'90px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(245,184,0,.08),transparent 60%)'}}></div>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 20px',position:'relative',zIndex:2}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'center'}}>
          <div className="rv">
            <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'var(--gd2)'}}>
              <span style={{background:'var(--gd)'}} className="chip-dot"></span>Boarding Facility
            </div>
            <h2 className="sec-title" style={{color:'#fff'}}>Boys <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Hostel</span><br/>at SPVS</h2>
            <div className="s-bar"></div>
            <p style={{fontSize:'16px',color:'rgba(255,255,255,.65)',lineHeight:'1.8',marginBottom:'28px'}}>
              Our boarding facility offers a safe, nurturing environment where students from far-off places can live, study and grow. Affordable shared dormitories with all essential amenities and round-the-clock care.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'32px'}}>
              {amenities.map((a,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13.5px',color:'rgba(255,255,255,.75)',padding:'8px 12px',background:'rgba(255,255,255,.05)',borderRadius:'8px',border:'1px solid rgba(255,255,255,.08)'}}>
                  {a}
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <Link to="/facilities" className="btn-w">🏠 Hostel Details</Link>
              <Link to="/contact" className="btn-out" style={{borderColor:'rgba(255,255,255,.3)',color:'rgba(255,255,255,.8)'}}>📞 Enquire Now</Link>
            </div>
          </div>
          <div className="rv" style={{transitionDelay:'.2s'}}>
            <div style={{background:'linear-gradient(135deg,rgba(245,184,0,.1),rgba(232,118,26,.08))',borderRadius:'24px',padding:'36px',border:'1.5px solid rgba(245,184,0,.15)'}}>
              <div style={{fontSize:'64px',textAlign:'center',marginBottom:'20px'}}>🏠</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'var(--gd2)',textAlign:'center',marginBottom:'8px'}}>Safe & Affordable</div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,.55)',textAlign:'center',marginBottom:'28px'}}>Boys Only · All Amenities Included</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                {[['🔒','24×7 Security'],['🏥','Medical Care'],['🏟️','Sports Access'],['📶','Wi-Fi Campus']].map(([ic,lbl],i) => (
                  <div key={i} style={{textAlign:'center',background:'rgba(255,255,255,.04)',padding:'16px',borderRadius:'12px',border:'1px solid rgba(245,184,0,.12)'}}>
                    <div style={{fontSize:'28px',marginBottom:'6px'}}>{ic}</div>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)',fontWeight:'600'}}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}