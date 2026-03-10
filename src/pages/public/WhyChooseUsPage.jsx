import { Link } from 'react-router-dom'

var REASONS = [
  { em:'🏛️', title:'37 Years of Excellence',       desc:'Established in 1987, SPVS has a proven track record of academic excellence and character building across generations.',          clr:'#E8761A' },
  { em:'📋', title:'CBSE Affiliated',               desc:'Fully affiliated to CBSE (Affiliation No. 2130176) — ensuring a nationally recognised, standardised curriculum.',              clr:'#6C3FC5' },
  { em:'👨‍🏫', title:'64+ Expert Faculty',            desc:'14 PGTs, 20 TGTs and 30 PRTs — all qualified, experienced and dedicated to each student\'s individual growth.',               clr:'#22a35a' },
  { em:'🔬', title:'8 Modern Laboratories',         desc:'Physics, Chemistry, Biology, Computer Science and STEM labs — fully equipped for practical, hands-on learning.',               clr:'#F5B800' },
  { em:'🚌', title:'22 School Buses',               desc:'Safe, GPS-tracked transport covering all major areas of Bahraich and surrounding regions.',                                    clr:'#E8761A' },
  { em:'🏠', title:'Boys Hostel Facility',          desc:'Safe and supervised hostel for outstation students with nutritious meals, study hall and recreational facilities.',            clr:'#6C3FC5' },
  { em:'📱', title:'Smart Classrooms',              desc:'Technology-integrated classrooms with digital boards, projectors and e-learning tools for modern education.',                  clr:'#22a35a' },
  { em:'🌳', title:'10-Acre Green Campus',          desc:'A sprawling, pollution-free campus with playgrounds, gardens and open spaces for holistic development.',                       clr:'#F5B800' },
  { em:'🏆', title:'100% Board Results',            desc:'Consistently excellent results in CBSE Class X and XII board examinations with multiple distinction holders every year.',       clr:'#E8761A' },
  { em:'🎨', title:'Co-curricular Excellence',      desc:'Art, music, dance, sports, NCC, NSS — a rich co-curricular programme that develops well-rounded personalities.',              clr:'#6C3FC5' },
  { em:'💰', title:'Affordable Fee Structure',      desc:'Quality education at reasonable fees — from ₹1,200/month for Nursery to ₹3,300/month for Class XI–XII.',                      clr:'#22a35a' },
  { em:'🤝', title:'Strong Alumni Network',         desc:'Thousands of successful alumni in medicine, engineering, civil services and business — proud ambassadors of SPVS.',           clr:'#F5B800' },
]

var STATS = [
  { n:'1987',   l:'Year Established',    em:'🏛️', clr:'#E8761A' },
  { n:'1410+',  l:'Students Enrolled',   em:'👨‍🎓', clr:'#6C3FC5' },
  { n:'64+',    l:'Expert Faculty',      em:'👨‍🏫', clr:'#22a35a' },
  { n:'100%',   l:'Board Pass Rate',     em:'🏆', clr:'#F5B800' },
  { n:'10 Ac',  l:'Campus Area',         em:'🌳', clr:'#E8761A' },
  { n:'22',     l:'School Buses',        em:'🚌', clr:'#6C3FC5' },
]

var COMPARE = [
  { feature:'CBSE Affiliation',         spvs: true,  others: '⚠️ Some' },
  { feature:'Experienced PGT Faculty',  spvs: true,  others: '⚠️ Limited' },
  { feature:'Science & STEM Labs',      spvs: true,  others: '❌ Rare' },
  { feature:'Smart Classrooms',         spvs: true,  others: '⚠️ Some' },
  { feature:'Boys Hostel',              spvs: true,  others: '❌ Rare' },
  { feature:'22 Bus Routes',            spvs: true,  others: '⚠️ Limited' },
  { feature:'Co-curricular Activities', spvs: true,  others: '⚠️ Basic' },
  { feature:'Affordable Fees',          spvs: true,  others: '❌ Often costly' },
  { feature:'37+ Years Track Record',   spvs: true,  others: '❌ Mostly new' },
]

var TESTIMONIALS = [
  { name:'Mr. Rajiv Sharma',       role:'Parent, Class X student',   text:'My son has grown tremendously at SPVS — academically and as a person. The teachers genuinely care about every student.',          avatar:'RS', clr:'#E8761A' },
  { name:'Priya Mishra',           role:'Alumni, Now Engineer',       text:'SPVS gave me the foundation to crack JEE. The science labs and dedicated teachers made all the difference in my career.',          avatar:'PM', clr:'#6C3FC5' },
  { name:'Mrs. Sunita Agarwal',    role:'Parent, Class VII student',  text:'The discipline, values and academic rigour at SPVS are unmatched. My daughter loves coming to school every day.',                  avatar:'SA', clr:'#22a35a' },
  { name:'Amit Tiwari',            role:'Alumni, IAS Officer',        text:'I am proud to be an SPVS alumnus. The school instilled in me the values of hard work and integrity that have guided my life.',    avatar:'AT', clr:'#F5B800' },
]

export default function WhyChooseUsPage() {
  return (
    <>
      {/* PAGE BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">⭐ Why Choose Us</div>
          <h1 className="pb-title">Why Choose <span style={{color:'var(--gd2)', fontStyle:'italic'}}>SPVS?</span></h1>
          <p className="pb-sub">37 years of excellence · 1410+ students · CBSE affiliated · Bahraich's most trusted school</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Why Choose Us</span>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))', padding:'22px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'16px'}}>
          {STATS.map(function(s) {
            return (
              <div key={s.l} style={{textAlign:'center', color:'#fff'}}>
                <div style={{fontSize:'20px', marginBottom:'2px'}}>{s.em}</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', lineHeight:'1'}}>{s.n}</div>
                <div style={{fontSize:'11px', fontWeight:'700', opacity:'.8', letterSpacing:'1px', textTransform:'uppercase', marginTop:'3px'}}>{s.l}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'70px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* REASONS GRID */}
          <div style={{marginBottom:'72px'}}>
            <div style={{textAlign:'center', marginBottom:'40px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Our Strengths</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'34px', fontWeight:'700', color:'var(--dark)', margin:'0 0 12px'}}>12 Reasons to Choose <span style={{color:'var(--or)', fontStyle:'italic'}}>SPVS</span></h2>
              <p style={{fontSize:'15px', color:'var(--txt2)', maxWidth:'560px', margin:'0 auto', lineHeight:'1.7'}}>We don't just educate — we inspire, nurture and shape the leaders of tomorrow.</p>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'18px'}}>
              {REASONS.map(function(r) {
                return (
                  <div key={r.title}
                    style={{padding:'26px', borderRadius:'20px', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .35s cubic-bezier(.34,1.56,.64,1)'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 40px '+r.clr+'25';e.currentTarget.style.borderColor=r.clr+'55';e.currentTarget.style.background=r.clr+'06'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)';e.currentTarget.style.background='var(--card)'}}
                  >
                    <div style={{width:'56px', height:'56px', borderRadius:'16px', background:r.clr+'18', border:'1.5px solid '+r.clr+'30', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', marginBottom:'16px'}}>
                      {r.em}
                    </div>
                    <div style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'var(--dark)', marginBottom:'8px'}}>{r.title}</div>
                    <div style={{fontSize:'13px', color:'var(--txt2)', lineHeight:'1.65'}}>{r.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* COMPARISON TABLE */}
          <div style={{marginBottom:'72px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Comparison</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:0}}>SPVS vs <span style={{color:'var(--or)', fontStyle:'italic'}}>Other Schools</span></h2>
            </div>

            <div style={{borderRadius:'20px', overflow:'hidden', border:'1.5px solid var(--brd)', boxShadow:'0 8px 36px rgba(232,118,26,.07)'}}>
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))'}}>
                    <th style={{padding:'16px 20px', textAlign:'left', fontSize:'12px', fontWeight:'800', color:'rgba(255,255,255,.6)', letterSpacing:'1px', textTransform:'uppercase', width:'50%'}}>Feature</th>
                    <th style={{padding:'16px 20px', textAlign:'center', fontSize:'12px', fontWeight:'800', color:'var(--gd2)', letterSpacing:'1px', textTransform:'uppercase', width:'25%'}}>SPVS ⭐</th>
                    <th style={{padding:'16px 20px', textAlign:'center', fontSize:'12px', fontWeight:'800', color:'rgba(255,255,255,.4)', letterSpacing:'1px', textTransform:'uppercase', width:'25%'}}>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(function(row, i) {
                    return (
                      <tr key={row.feature}
                        style={{borderTop:'1px solid var(--brd)', background: i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)', transition:'background .15s'}}
                        onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.04)'}}
                        onMouseLeave={function(e){e.currentTarget.style.background= i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)'}}
                      >
                        <td style={{padding:'14px 20px', fontSize:'14px', fontWeight:'600', color:'var(--dark)'}}>{row.feature}</td>
                        <td style={{padding:'14px 20px', textAlign:'center'}}>
                          <span style={{display:'inline-flex', alignItems:'center', justifyContent:'center', width:'28px', height:'28px', borderRadius:'50%', background:'rgba(34,163,90,.15)', fontSize:'14px'}}>✅</span>
                        </td>
                        <td style={{padding:'14px 20px', textAlign:'center', fontSize:'13px', color:'var(--txt3)', fontWeight:'600'}}>{row.others}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div style={{marginBottom:'72px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Testimonials</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:0}}>What <span style={{color:'var(--or)', fontStyle:'italic'}}>People Say</span></h2>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'18px'}}>
              {TESTIMONIALS.map(function(t) {
                return (
                  <div key={t.name}
                    style={{padding:'28px', borderRadius:'20px', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .3s cubic-bezier(.34,1.56,.64,1)', display:'flex', flexDirection:'column', gap:'16px'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+t.clr+'22';e.currentTarget.style.borderColor=t.clr+'44'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                  >
                    {/* Quote mark */}
                    <div style={{fontSize:'40px', lineHeight:'1', color:t.clr, opacity:'.4', fontFamily:'Georgia,serif', marginBottom:'-8px'}}>"</div>
                    <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.7', fontStyle:'italic', flex:1}}>{t.text}</div>
                    {/* Author */}
                    <div style={{display:'flex', alignItems:'center', gap:'12px', paddingTop:'14px', borderTop:'1px solid var(--brd)'}}>
                      <div style={{width:'44px', height:'44px', borderRadius:'12px', background:'linear-gradient(135deg,'+t.clr+','+t.clr+'bb)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'900', color:'#fff', flexShrink:0}}>
                        {t.avatar}
                      </div>
                      <div>
                        <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)'}}>{t.name}</div>
                        <div style={{fontSize:'11.5px', color:'var(--txt3)'}}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))', borderRadius:'24px', padding:'52px 40px', textAlign:'center', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', width:'300px', height:'300px', borderRadius:'50%', background:'rgba(232,118,26,.08)', top:'-80px', right:'-60px'}} />
            <div style={{position:'absolute', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(245,184,0,.06)', bottom:'-50px', left:'-40px'}} />
            <div style={{position:'relative', zIndex:1}}>
              <div style={{fontSize:'40px', marginBottom:'16px'}}>🎓</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'#fff', margin:'0 0 12px'}}>Ready to Join the SPVS Family?</h2>
              <p style={{fontSize:'15px', color:'rgba(255,255,255,.65)', maxWidth:'500px', margin:'0 auto 32px', lineHeight:'1.7'}}>
                Admissions open for 2026–27. Limited seats available. Contact us today to secure your child's future.
              </p>
              <div style={{display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap'}}>
                <Link to="/contact" style={{padding:'14px 32px', borderRadius:'50px', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 8px 24px rgba(232,118,26,.45)'}}>
                  📋 Apply for Admission →
                </Link>
                <a href="tel:+919198783830" style={{padding:'14px 32px', borderRadius:'50px', border:'1.5px solid rgba(255,255,255,.25)', color:'rgba(255,255,255,.9)', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'700'}}>
                  📞 +91 9198783830
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}