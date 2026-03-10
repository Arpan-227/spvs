import { useState } from 'react'

const CLASSES = [
  { em:'🌱', title:'Pre-Primary', sub:'Play Group, Nursery, LKG, UKG', desc:'NEP-2020 aligned early childhood education focusing on listening, speaking, reading, writing, numeracy and cognitive development through play.', students:'160' },
  { em:'📖', title:'Primary (I–V)', sub:'Classes I to V', desc:'Strong foundation in English, Hindi, Maths, EVS, Science, Social Science with Computer, Art, Music and Physical Education.', students:'376' },
  { em:'📐', title:'Middle (VI–VIII)', sub:'Classes VI to VIII', desc:'Core subjects plus Sanskrit, Computer Education, GK, Art & Craft, Music, and Physical Education for all-round development.', students:'285' },
  { em:'🔬', title:'Secondary (IX–X)', sub:'Classes IX to X', desc:'CBSE curriculum with Mathematics, Science, Social Science, English, Hindi and Information Technology. Strong board exam preparation.', students:'315' },
  { em:'⚗️', title:'Science Stream (XI–XII)', sub:'Physics · Chemistry · Biology/Maths', desc:'PCB / PCM with English Core, Hindi/CS/PE. Well-equipped labs and experienced PGT faculty ensuring 100% results.', students:'274' },
  { em:'💼', title:'Commerce Stream (XI–XII)', sub:'Accountancy · Business Studies · Economics', desc:'Commerce with English Core, Hindi/CS/PE. Building future entrepreneurs, accountants and business leaders.', students:'274' },
]

export default function ClassesOffered() {
  const [act, setAct] = useState(0)
  return (
    <section className="curr-sect sect">
      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Classes Offered</div>
          <h2 className="sec-title">From <span className="hl">Nursery</span> to <span className="hl">Class XII</span></h2>
          <div className="s-bar"></div>
          <p className="s-desc">Comprehensive education across all levels — CBSE curriculum, experienced faculty, modern infrastructure.</p>
        </div>
        <div className="curr-lay">
          <div className="curr-tl">
            {CLASSES.map((c,i) => (
              <div key={i} className={`ci${act===i?' act':''}`} onClick={() => setAct(i)}>
                <div className="ci-dot"><span className="ci-em">{c.em}</span></div>
                <div>
                  <div className="ci-title">{c.title}</div>
                  <div className="ci-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="curr-vis rv" style={{background:'linear-gradient(135deg,#FFF8DC,#FFE0A0)'}}>
            <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',padding:'40px'}}>
              <div style={{fontSize:'72px'}}>{CLASSES[act].em}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',fontWeight:'700',color:'var(--dark)',textAlign:'center'}}>{CLASSES[act].title}</div>
              <div style={{fontSize:'14px',color:'var(--or)',fontWeight:'700',textAlign:'center'}}>{CLASSES[act].sub}</div>
              <p style={{fontSize:'15px',color:'var(--txt2)',lineHeight:'1.7',textAlign:'center',maxWidth:'380px'}}>{CLASSES[act].desc}</p>
              <div style={{background:'linear-gradient(135deg,var(--or),var(--gd))',color:'#fff',padding:'8px 20px',borderRadius:'50px',fontSize:'13px',fontWeight:'700'}}>
                {CLASSES[act].students}+ Students
              </div>
            </div>
            <div className="curr-vis-ov"></div>
            <div className="curr-vis-txt">
              <div className="cvt">{CLASSES[act].title}</div>
              <div className="cvs">CBSE · Sant Pathik Vidyalaya</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}