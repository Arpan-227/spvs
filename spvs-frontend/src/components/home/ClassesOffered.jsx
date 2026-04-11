import { useState } from 'react'
import { FaSeedling, FaBook, FaDraftingCompass, FaFlask, FaAtom, FaBriefcase } from 'react-icons/fa'

var CLASSES = [
  { icon:<FaSeedling size={48} color="#E8761A"/>, title:'Pre-Primary', sub:'Play Group, Nursery, LKG, UKG', desc:'NEP-2020 aligned early childhood education focusing on listening, speaking, reading, writing, numeracy and cognitive development through play.', students:'160' },
  { icon:<FaBook size={48} color="#E8761A"/>, title:'Primary (I–V)', sub:'Classes I to V', desc:'Strong foundation in English, Hindi, Maths, EVS, Science, Social Science with Computer, Art, Music and Physical Education.', students:'376' },
  { icon:<FaDraftingCompass size={48} color="#E8761A"/>, title:'Middle (VI–VIII)', sub:'Classes VI to VIII', desc:'Core subjects plus Sanskrit, Computer Education, GK, Art & Craft, Music, and Physical Education for all-round development.', students:'285' },
  { icon:<FaFlask size={48} color="#E8761A"/>, title:'Secondary (IX–X)', sub:'Classes IX to X', desc:'CBSE curriculum with Mathematics, Science, Social Science, English, Hindi and Information Technology. Strong board exam preparation.', students:'315' },
  { icon:<FaAtom size={48} color="#E8761A"/>, title:'Science Stream (XI–XII)', sub:'Physics · Chemistry · Biology/Maths', desc:'PCB / PCM with English Core, Hindi/CS/PE. Well-equipped labs and experienced PGT faculty ensuring 100% results.', students:'274' },
  { icon:<FaBriefcase size={48} color="#E8761A"/>, title:'Commerce Stream (XI–XII)', sub:'Accountancy · Business Studies · Economics', desc:'Commerce with English Core, Hindi/CS/PE. Building future entrepreneurs, accountants and business leaders.', students:'274' },
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
                <div className="ci-dot">
                  <span className="ci-em" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {/* small icon for sidebar */}
                    {i===0 && <FaSeedling size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===1 && <FaBook size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===2 && <FaDraftingCompass size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===3 && <FaFlask size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===4 && <FaAtom size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===5 && <FaBriefcase size={18} color={act===i?'#fff':'#E8761A'}/>}
                  </span>
                </div>
                <div>
                  <div className="ci-title">{c.title}</div>
                  <div className="ci-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="curr-vis rv" style={{background:'linear-gradient(135deg,#FFF8DC,#FFE0A0)'}}>
            <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',padding:'40px'}}>
              <div style={{width:'90px',height:'90px',borderRadius:'50%',background:'linear-gradient(135deg,rgba(232,118,26,.12),rgba(245,184,0,.12))',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid rgba(232,118,26,.2)'}}>
                {CLASSES[act].icon}
              </div>
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