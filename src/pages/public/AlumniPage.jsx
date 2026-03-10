import { useState } from 'react'
import { Link } from 'react-router-dom'

var NOTABLE = [
  { name:'Dr. Arvind Mishra',   batch:'1998', field:'Medicine',       role:'Senior Cardiologist, AIIMS Delhi',          avatar:'AM', clr:'#E8761A',
    achievement:'Performed 2000+ open heart surgeries. Featured in Times of India as one of UP\'s top cardiologists.', icon:'⚕️' },
  { name:'Ms. Priya Shukla',    batch:'2003', field:'Civil Services', role:'IAS Officer, Uttar Pradesh Cadre',           avatar:'PS', clr:'#6C3FC5',
    achievement:'AIR 47 in UPSC 2007. Currently serving as District Magistrate. Credited with landmark rural development initiatives.', icon:'🏛️' },
  { name:'Mr. Rahul Verma',     batch:'2005', field:'Engineering',    role:'Senior Engineer, ISRO Bengaluru',            avatar:'RV', clr:'#22a35a',
    achievement:'Core member of Chandrayaan-3 mission team. Holds 2 patents in satellite communication systems.', icon:'🚀' },
  { name:'Dr. Neha Tiwari',     batch:'2001', field:'Medicine',       role:'Gynaecologist, District Hospital Bahraich',  avatar:'NT', clr:'#F5B800',
    achievement:'Delivered 10,000+ safe deliveries. Runs free maternal health camps for underprivileged women in Bahraich.', icon:'🏥' },
  { name:'Mr. Sanjay Agarwal',  batch:'2007', field:'Business',       role:'Founder & CEO, TechStart India',             avatar:'SA', clr:'#E8761A',
    achievement:'Built a Rs.50 Cr tech startup from scratch. Employs 200+ people. Named in Forbes 30 Under 30 India list.', icon:'💼' },
  { name:'Ms. Ankita Singh',    batch:'2010', field:'Education',      role:'Principal, Government School Lucknow',       avatar:'AS', clr:'#6C3FC5',
    achievement:'Transformed a failing school into top performer in Lucknow district. Awarded Rashtriya Shiksha Puraskar 2023.', icon:'🎓' },
  { name:'Mr. Vivek Pandey',    batch:'2004', field:'Law',            role:'Advocate, Allahabad High Court',             avatar:'VP', clr:'#22a35a',
    achievement:'Successfully argued landmark environmental case protecting Bahraich wetlands. Pro bono lawyer for 500+ cases.', icon:'⚖️' },
  { name:'Mr. Deepak Yadav',    batch:'2012', field:'Engineering',    role:'Software Engineer, Google India',            avatar:'DY', clr:'#F5B800',
    achievement:'Works on Google Search core infrastructure. Mentors 50+ students annually through coding bootcamps.', icon:'💻' },
]

var FIELDS = ['All', 'Medicine', 'Civil Services', 'Engineering', 'Business', 'Education', 'Law']

var GALLERY = [
  { year:'2024', event:'Alumni Reunion 2024',        emoji:'🎉', attendees:'120+', bg:'#E8761A' },
  { year:'2023', event:'Annual Alumni Meet 2023',    emoji:'🤝', attendees:'90+',  bg:'#6C3FC5' },
  { year:'2022', event:'Silver Jubilee Batch 1997',  emoji:'🏅', attendees:'45',   bg:'#22a35a' },
  { year:'2024', event:'Guest Lecture Series',       emoji:'🎤', attendees:'200+', bg:'#F5B800' },
  { year:'2023', event:'Alumni Cricket Tournament',  emoji:'🏏', attendees:'60+',  bg:'#E94F37' },
  { year:'2022', event:'Felicitation Ceremony 2022', emoji:'🏆', attendees:'80+',  bg:'#6C3FC5' },
]

var TESTIMONIALS = [
  { name:'Priya Shukla',   batch:'2003', text:'SPVS gave me the discipline and values to crack UPSC. I am forever grateful to my teachers who believed in me even when I doubted myself.', avatar:'PS', clr:'#6C3FC5' },
  { name:'Rahul Verma',    batch:'2005', text:'The science labs and dedicated faculty at SPVS built my passion for engineering. Working at ISRO was a dream that SPVS helped me achieve.', avatar:'RV', clr:'#22a35a' },
  { name:'Sanjay Agarwal', batch:'2007', text:'Entrepreneurship needs courage. SPVS gave me that courage through its co-curricular activities, strong mentorship and a never-give-up culture.', avatar:'SA', clr:'#E8761A' },
]

var STATS = [
  { n:'5000+', l:'Alumni Worldwide',   em:'🌍' },
  { n:'37+',   l:'Batches Passed Out', em:'🎓' },
  { n:'100+',  l:'In Civil Services',  em:'🏛️' },
  { n:'500+',  l:'In Medicine',        em:'⚕️' },
]

export default function AlumniPage() {
  var [filter, setFilter]   = useState('All')

  var filtered = filter === 'All' ? NOTABLE : NOTABLE.filter(function(a){ return a.field === filter })

  return (
    <>
      {/* BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">🎓 Alumni</div>
          <h1 className="pb-title">Our <span style={{color:'var(--gd2)', fontStyle:'italic'}}>Alumni</span></h1>
          <p className="pb-sub">5000+ proud alumni — doctors, engineers, IAS officers and entrepreneurs — the living legacy of SPVS</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Alumni</span>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))', padding:'22px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'16px'}}>
          {STATS.map(function(s){
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

          {/* SUCCESS STORIES — FLIP CARDS */}
          <div style={{marginBottom:'80px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Hall of Fame</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:'0 0 8px'}}>Alumni <span style={{color:'var(--or)', fontStyle:'italic'}}>Success Stories</span></h2>
              <p style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'24px'}}>Hover on a card to reveal their achievement</p>
              <div style={{display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap'}}>
                {FIELDS.map(function(f){
                  var active = filter === f
                  return (
                    <button key={f} onClick={function(){setFilter(f)}} style={{padding:'8px 18px', borderRadius:'50px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'700', transition:'all .2s', background: active ? 'var(--or)' : 'var(--bg2)', color: active ? '#fff' : 'var(--txt2)', boxShadow: active ? '0 4px 14px rgba(232,118,26,.3)' : 'none'}}>
                      {f}
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:'20px'}}>
              {filtered.map(function(a){
                return (
                  <div key={a.name}
                    style={{borderRadius:'22px', background:'var(--card)', border:'1.5px solid var(--brd)', overflow:'hidden', transition:'all .3s ease', cursor:'default'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 20px 48px '+a.clr+'28';e.currentTarget.style.borderColor=a.clr+'55'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                  >
                    {/* Top color stripe */}
                    <div style={{height:'6px', background:'linear-gradient(90deg,'+a.clr+','+a.clr+'88)'}} />

                    <div style={{padding:'24px'}}>
                      {/* Avatar + name row */}
                      <div style={{display:'flex', alignItems:'flex-start', gap:'16px', marginBottom:'16px'}}>
                        <div style={{width:'62px', height:'62px', borderRadius:'18px', background:'linear-gradient(135deg,'+a.clr+','+a.clr+'bb)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 6px 18px '+a.clr+'40', gap:'2px'}}>
                          <div style={{fontSize:'24px'}}>{a.icon}</div>
                          <div style={{fontSize:'9px', fontWeight:'900', color:'rgba(255,255,255,.85)', letterSpacing:'.5px'}}>{a.avatar}</div>
                        </div>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'var(--dark)', marginBottom:'4px', lineHeight:'1.3'}}>{a.name}</div>
                          <div style={{fontSize:'11px', fontWeight:'800', color:a.clr, background:a.clr+'12', padding:'3px 10px', borderRadius:'50px', display:'inline-block'}}>{a.field} · {a.batch}</div>
                        </div>
                      </div>

                      {/* Role */}
                      <div style={{fontSize:'13px', color:'var(--txt2)', fontWeight:'600', marginBottom:'14px', paddingBottom:'14px', borderBottom:'1px solid var(--brd)', lineHeight:'1.5'}}>{a.role}</div>

                      {/* Achievement */}
                      <div style={{fontSize:'12.5px', color:'var(--txt2)', lineHeight:'1.65'}}>
                        <span style={{fontSize:'16px', marginRight:'6px', verticalAlign:'middle'}}>🏅</span>
                        {a.achievement}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* PHOTO GALLERY */}
          <div style={{marginBottom:'80px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Memories</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:'0 0 8px'}}>Alumni <span style={{color:'var(--or)', fontStyle:'italic'}}>Photo Gallery</span></h2>
              <p style={{fontSize:'14px', color:'var(--txt2)'}}>Snapshots from reunions, meets and celebrations over the years</p>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px'}}>
              {GALLERY.map(function(g, i){
                return (
                  <div key={i}
                    style={{borderRadius:'20px', overflow:'hidden', border:'1.5px solid var(--brd)', transition:'all .35s cubic-bezier(.34,1.56,.64,1)', cursor:'pointer', background:'var(--card)'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 40px '+g.bg+'30';e.currentTarget.style.borderColor=g.bg+'55'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                  >
                    <div style={{height:'160px', background:'linear-gradient(135deg,'+g.bg+'25,'+g.bg+'08)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden'}}>
                      <div style={{position:'absolute', width:'120px', height:'120px', borderRadius:'50%', background:g.bg+'10', top:'-30px', right:'-30px'}} />
                      <div style={{position:'absolute', width:'80px', height:'80px', borderRadius:'50%', background:g.bg+'08', bottom:'-20px', left:'-20px'}} />
                      <div style={{fontSize:'52px', position:'relative', zIndex:1, marginBottom:'8px'}}>{g.emoji}</div>
                      <div style={{fontSize:'11px', fontWeight:'700', color:g.bg, background:g.bg+'18', padding:'3px 12px', borderRadius:'50px', position:'relative', zIndex:1}}>📷 {g.attendees} attended</div>
                    </div>
                    <div style={{padding:'16px 18px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <div>
                        <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)', marginBottom:'3px'}}>{g.event}</div>
                        <div style={{fontSize:'12px', color:'var(--txt3)'}}>📅 {g.year}</div>
                      </div>
                      <div style={{width:'36px', height:'36px', borderRadius:'10px', background:g.bg+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px'}}>{g.emoji}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{textAlign:'center', marginTop:'16px', fontSize:'12.5px', color:'var(--txt3)'}}>📸 Real event photos will be displayed here once uploaded by admin</p>
          </div>

          {/* TESTIMONIALS */}
          <div style={{marginBottom:'80px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Alumni Speak</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:0}}>Words from Our <span style={{color:'var(--or)', fontStyle:'italic'}}>Alumni</span></h2>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'18px'}}>
              {TESTIMONIALS.map(function(t){
                return (
                  <div key={t.name}
                    style={{padding:'28px', borderRadius:'20px', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .3s cubic-bezier(.34,1.56,.64,1)', display:'flex', flexDirection:'column', gap:'14px'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+t.clr+'22';e.currentTarget.style.borderColor=t.clr+'44'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                  >
                    <div style={{fontSize:'40px', lineHeight:'1', color:t.clr, opacity:'.4', fontFamily:'Georgia,serif', marginBottom:'-6px'}}>"</div>
                    <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.7', fontStyle:'italic', flex:1}}>{t.text}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'12px', paddingTop:'14px', borderTop:'1px solid var(--brd)'}}>
                      <div style={{width:'44px', height:'44px', borderRadius:'12px', background:'linear-gradient(135deg,'+t.clr+','+t.clr+'bb)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'900', color:'#fff', flexShrink:0}}>{t.avatar}</div>
                      <div>
                        <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)'}}>{t.name}</div>
                        <div style={{fontSize:'11.5px', color:'var(--txt3)'}}>Batch {t.batch}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}