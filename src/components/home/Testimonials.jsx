const TESTIMONIALS = [
  { q:"The teachers at SPVS are very dedicated. My daughter improved tremendously in academics and also developed her personality. Best school in Bahraich!", name:"Rajesh Kumar", role:"Parent — Class X", av:"👨" },
  { q:"My son won a prize at KBC! The school environment gave him the confidence to participate. We are so proud of SPVS and their encouragement.", name:"Sunita Raghuvansh", role:"Parent — Class V", av:"👩" },
  { q:"I passed Class XII from SPVS and now I'm at IIT BHU. The foundation built here prepared me for everything. Grateful to all my teachers.", name:"Shrami Agarwal", role:"Alumni — IIT BHU Student", av:"👩‍🎓" },
]
export default function Testimonials() {
  return (
    <section className="testi-sect sect">
      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Testimonials</div>
          <h2 className="sec-title">What <span className="hl">Parents</span> &amp; Alumni Say</h2>
          <div className="s-bar"></div>
        </div>
        <div className="testi-lay">
          {/* Left — featured */}
          <div className="vid-box rv" style={{background:'linear-gradient(135deg,var(--or),var(--gd))',position:'relative'}}>
            <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',padding:'40px'}}>
              <div style={{fontSize:'60px'}}>⭐</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#fff',textAlign:'center',lineHeight:'1.3'}}>
                "Best School<br/>in Bahraich"
              </div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,.8)',textAlign:'center'}}>Rated 4.9/5 by 1000+ families</div>
            </div>
            <div className="vid-ov">
              <div className="play">⭐</div>
            </div>
            <div className="vid-caption">1410+ Happy Students</div>
          </div>
          {/* Right — cards */}
          <div className="t-cards">
            {TESTIMONIALS.map((t,i) => (
              <div className={`tcard rv d${i+1}`} key={i}>
                <div className="tstars">
                  {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                </div>
                <div className="tq">"{t.q}"</div>
                <div className="tauth">
                  <div className="tav">{t.av}</div>
                  <div><div className="tname">{t.name}</div><div className="trole">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}