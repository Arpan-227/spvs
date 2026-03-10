export default function SchoolIntro() {
  return (
    <section className="about-sect sect">
      <div className="s-cont">
        <div className="about-grid">
          {/* LEFT — visual */}
          <div className="about-vis rv">
            <div className="about-main" style={{background:'linear-gradient(135deg,#FFF8DC,#FFE0A0)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px'}}>
              <div style={{fontSize:'72px'}}>🏫</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 16px'}}>10 Acres Campus</div>
              <div style={{fontSize:'13px',color:'var(--txt2)',textAlign:'center',padding:'0 20px'}}>73 Classrooms · 8 Labs · Sports Stadium</div>
            </div>
            <div className="about-float">
              <div className="af-n">37</div>
              <div className="af-l">Years of<br/>Excellence</div>
            </div>
            <div className="about-main-ov"></div>
            <div className="about-main-txt">
              <div className="about-motto">"Education with Values"</div>
              <div className="about-motto-s">Sant Pathik Vidyalaya, Est. 1987</div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div>
            <div className="chip rv"><span className="chip-dot"></span>About Our School</div>
            <h2 className="sec-title rv">A Legacy of <span className="hl">Excellence</span> &amp; Values</h2>
            <div className="s-bar rv"></div>
            <p className="s-desc rv">
              Sant Pathik Vidyalaya is a CBSE affiliated co-educational Day &amp; Boarding Senior Secondary School, founded in 1987 by the visionary Sant Pathik Ji Maharaj. Spread across 10 acres in Pashupati Nagar, Bahraich, we nurture 1,410+ students from Play Group to Class XII.
            </p>
            <div className="about-pts">
              {[
                { ic:'🎓', t:'CBSE Curriculum', d:'Affiliated since 1987 · Affiliation No. 2130176 · Science, Commerce & Humanities streams at Senior Secondary level.' },
                { ic:'🏫', t:'World-Class Infrastructure', d:'73 classrooms, 8 fully-equipped labs, STEM lab, smart digital classrooms with smart boards.' },
                { ic:'🏡', t:'Boarding Facility', d:'Boys hostel with 24×7 security, visiting doctor, yoga, sports, clean mess and affordable dorms.' },
                { ic:'🚌', t:'Transport Network', d:'22 school buses covering all routes in and around Bahraich. Safe, punctual, GPS-tracked.' },
              ].map((p,i) => (
                <div className="apt rv3d" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                  <div className="apt-ic">{p.ic}</div>
                  <div><div className="apt-t">{p.t}</div><div className="apt-d">{p.d}</div></div>
                </div>
              ))}
            </div>
            <div className="about-stats-row rv" style={{transitionDelay:'.4s'}}>
              <div className="asr"><div className="asr-n">1410+</div><div className="asr-l">Students</div></div>
              <div className="asr"><div className="asr-n">64+</div><div className="asr-l">Teachers</div></div>
              <div className="asr"><div className="asr-n">73</div><div className="asr-l">Classrooms</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}