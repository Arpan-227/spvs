import useSettings from '../../hooks/useSettings'

export default function SchoolIntro() {
  const { settings } = useSettings()
  const school = settings.school || {}

  const name       = school.name        || 'Sant Pathik Vidyalaya'
  const est        = school.established || '1987'
  const students   = school.students    || '1410+'
  const teachers   = '64+'
  const classrooms = school.classrooms  || '73'
  const labs       = school.labs        || '8'
  const area       = school.area        || '10 Acres'
  const buses      = school.buses       || '22'
  const affNo      = school.affNo       || '2130176'
  const board      = school.board       || 'CBSE'
  const years      = new Date().getFullYear() - Number(est)

  return (
    <section className="about-sect sect">
      <div className="s-cont">
        <div className="about-grid">
          <div className="about-vis rv">

            {/* ── IMAGE — about_school.jpg ── */}
            <div className="about-main about-main-img-wrap" style={{overflow:'hidden',padding:0,borderRadius:'24px',border:'3px solid rgba(232,118,26,.25)',boxShadow:'0 20px 60px rgba(232,118,26,.18), 0 0 0 6px rgba(232,118,26,.06)'}}>
              <img
                src="/images/about_school.jpg"
                alt={name}
                className="about-school-img"
                style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}
                onError={function(e){
                  e.target.style.display='none'
                  e.target.nextSibling.style.display='flex'
                }}
              />
              {/* Fallback if image missing */}
              <div style={{display:'none',width:'100%',height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px',background:'linear-gradient(135deg,#FFF8DC,#FFE0A0)',position:'absolute',inset:0}}>
                <div style={{fontSize:'72px'}}>🏫</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 16px'}}>{area} Campus</div>
                <div style={{fontSize:'13px',color:'var(--txt2)',textAlign:'center',padding:'0 20px'}}>{classrooms} Classrooms · {labs} Labs · Sports Stadium</div>
              </div>
            </div>

            <div className="about-float">
              <div className="af-n">{years}</div>
              <div className="af-l">Years of<br/>Excellence</div>
            </div>
            <div className="about-main-ov"></div>
            <div className="about-main-txt">
              <div className="about-motto">"Education with Values"</div>
              <div className="about-motto-s">{name}, Est. {est}</div>
            </div>
          </div>

          <div>
            <div className="chip rv"><span className="chip-dot"></span>About Our School</div>
            <h2 className="sec-title rv">37+ Years of Quality Education <span className="hl">in Bahraich</span></h2>
            <div className="s-bar rv"></div>
            <p className="s-desc rv">
              Founded in {est}, {name} (SPVS) is a {board} Senior Secondary school located in Pashupati Nagar, Bahraich. For more than three decades, the school has focused on strong academics along with moral values. Guided by the motto "Work is Worship," SPVS provides education from Class 1 to Class 12 with discipline and dedication.
            </p>
            <div className="about-pts">
              {[
                { ic:'🎓', t:board + ' Curriculum', d:'Aligned with national standards · Affiliation No. ' + affNo + ' · Science, Commerce & Humanities streams at Senior Secondary level.' },
                { ic:'🏆', t:'Consistent Strong Results', d:'Excellent board results in Classes 10 & 12 every year with dedicated and supportive teaching staff.' },
                { ic:'🌳', t:'Safe & Green Campus', d:'Safe, green and disciplined campus environment spread across ' + area + ' in Pashupati Nagar, Bahraich.' },
                { ic:'🚌', t:'Transport Network', d:buses + ' school buses covering all routes in and around Bahraich. Safe, punctual and reliable.' },
              ].map((p,i) => (
                <div className="apt rv3d" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                  <div className="apt-ic">{p.ic}</div>
                  <div><div className="apt-t">{p.t}</div><div className="apt-d">{p.d}</div></div>
                </div>
              ))}
            </div>
            <div className="about-stats-row rv" style={{transitionDelay:'.4s'}}>
              <div className="asr"><div className="asr-n">{students}</div><div className="asr-l">Students</div></div>
              <div className="asr"><div className="asr-n">{teachers}</div><div className="asr-l">Teachers</div></div>
              <div className="asr"><div className="asr-n">{classrooms}</div><div className="asr-l">Classrooms</div></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .about-main-img-wrap {
          border-radius: 24px !important;
          overflow: hidden !important;
        }
        .about-school-img {
          transition: transform .5s cubic-bezier(.25,.46,.45,.94) !important;
          border-radius: 0 !important;
        }
        .about-main-img-wrap:hover .about-school-img {
          transform: scale(1.06) !important;
        }
      `}</style>
    </section>
  )
}