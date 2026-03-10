import { useEffect, useRef, useState } from 'react'

var VALUES = [
  { icon:'📖', title:'Knowledge',      desc:'Education must evolve from mere information to deep wisdom — nurturing curious, critical thinkers ready for tomorrow.' },
  { icon:'🤲', title:'Integrity',      desc:'Honesty, transparency and moral uprightness form the backbone of every interaction at SPVS.' },
  { icon:'🌟', title:'Excellence',     desc:'We settle for nothing less than the best — in academics, in character, in every endeavour we undertake.' },
  { icon:'🤝', title:'Cooperation',    desc:'From competition to collaboration — we teach students that collective success far surpasses individual achievement.' },
  { icon:'🇮🇳', title:'Cultural Pride', desc:'Modern education rooted in Indian values — students who are globally competitive yet culturally grounded.' },
  { icon:'💪', title:'Resilience',     desc:'Failure is part of the journey. We equip students to bounce back stronger, wiser and more determined every time.' },
]

export default function VisionMissionFull() {
  var [vis, setVis] = useState(false)
  var ref = useRef()

  useEffect(function(){
    var obs = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setVis(true); obs.disconnect() } },{ threshold:0.1 })
    if(ref.current) obs.observe(ref.current)
    return function(){ obs.disconnect() }
  },[])

  return (
    <section id="vision" ref={ref} style={{padding:'90px 0',background:'#FFFDF8',position:'relative',overflow:'hidden'}}>

      {/* Subtle dot pattern */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.4,backgroundImage:'radial-gradient(circle, rgba(232,118,26,.12) 1px, transparent 1px)',backgroundSize:'32px 32px'}} />

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>

        <div style={{textAlign:'center',marginBottom:'60px',opacity:vis?1:0,transform:vis?'none':'translateY(28px)',transition:'all .7s ease'}}>
          <div className="chip"><span className="chip-dot"/>Our Purpose</div>
          <h2 className="sec-title">Vision, Mission <span className="hl2">&amp; Values</span></h2>
          <div className="s-bar" style={{margin:'0 auto 16px'}} />
          <p className="s-desc" style={{margin:'0 auto',textAlign:'center'}}>The principles that have guided SPVS for over 37 years.</p>
        </div>

        {/* Vision & Mission cards */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'56px'}}>

          {/* Vision */}
          <div style={{background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 100%)',borderRadius:'24px',padding:'40px',position:'relative',overflow:'hidden',opacity:vis?1:0,transform:vis?'none':'translateX(-30px)',transition:'all .7s ease .1s'}}>
            <div style={{position:'absolute',top:'-40px',right:'-40px',width:'180px',height:'180px',borderRadius:'50%',background:'rgba(232,118,26,.08)'}} />
            <div style={{position:'absolute',bottom:'-20px',left:'20px',width:'100px',height:'100px',borderRadius:'50%',background:'rgba(245,184,0,.05)'}} />
            <div style={{fontSize:'48px',marginBottom:'20px'}}>🔭</div>
            <div className="chip" style={{background:'rgba(245,184,0,.12)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800',marginBottom:'14px'}}>Our Vision</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#FFCF40',margin:'0 0 16px',lineHeight:'1.35'}}>Education with Values and Excellence</h3>
            <p style={{fontSize:'14.5px',color:'rgba(255,220,150,.72)',lineHeight:'1.78',margin:0}}>We envision a school where every child discovers their fullest potential — not just academically, but as a complete human being. An institution that sends forth confident, compassionate and competent leaders into the world.</p>
          </div>

          {/* Mission */}
          <div style={{background:'linear-gradient(135deg,#E8761A 0%,#F5B800 100%)',borderRadius:'24px',padding:'40px',position:'relative',overflow:'hidden',opacity:vis?1:0,transform:vis?'none':'translateX(30px)',transition:'all .7s ease .2s'}}>
            <div style={{position:'absolute',bottom:'-40px',left:'-40px',width:'180px',height:'180px',borderRadius:'50%',background:'rgba(255,255,255,.1)'}} />
            <div style={{position:'absolute',top:'20px',right:'20px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,.08)'}} />
            <div style={{fontSize:'48px',marginBottom:'20px'}}>🎯</div>
            <div className="chip" style={{background:'rgba(28,10,0,.1)',borderColor:'rgba(28,10,0,.15)',color:'#1C0A00',marginBottom:'14px'}}>Our Mission</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00',margin:'0 0 16px',lineHeight:'1.35'}}>Modern Education with Indian Cultural Roots</h3>
            <p style={{fontSize:'14.5px',color:'rgba(28,10,0,.68)',lineHeight:'1.78',margin:0}}>To create an environment where children learn modern and quality education alongside Indian cultural values. We move from competition to cooperation, from division to unity, and from "how to earn" to "how to live".</p>
          </div>
        </div>

        {/* Quote */}
        <div style={{textAlign:'center',padding:'40px 36px',background:'linear-gradient(135deg,#FFF6EA,#FEF0D4)',borderRadius:'24px',border:'1.5px solid rgba(232,118,26,.18)',marginBottom:'60px',position:'relative',overflow:'hidden',opacity:vis?1:0,transform:vis?'none':'translateY(20px)',transition:'all .7s ease .3s'}}>
          <div style={{position:'absolute',top:'-10px',left:'24px',fontSize:'80px',color:'rgba(232,118,26,.1)',fontFamily:'Georgia,serif',lineHeight:1,userSelect:'none'}}>"</div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,2.2vw,21px)',fontStyle:'italic',color:'#3D1A00',lineHeight:'1.7',margin:'0 0 16px',position:'relative',zIndex:1}}>Education is the most powerful tool to achieve the goal. Great things are done by a series of small things brought together.</p>
          <div style={{fontSize:'13px',fontWeight:'800',color:'#E8761A',letterSpacing:'.5px'}}>— Sh. Awadhesh Narayan Agarwal, Director & Manager</div>
        </div>

        {/* Core Values */}
        <div style={{textAlign:'center',marginBottom:'36px',opacity:vis?1:0,transition:'opacity .7s ease .4s'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Core Values</h3>
          <p style={{fontSize:'14px',color:'#7A4010'}}>The six pillars that define every SPVS student's journey</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:'16px'}}>
          {VALUES.map(function(v,i){
            return (
              <div key={i} style={{background:'#FFFFFF',borderRadius:'18px',border:'1.5px solid rgba(232,118,26,.1)',padding:'26px',boxShadow:'0 4px 16px rgba(232,118,26,.05)',display:'flex',gap:'18px',alignItems:'flex-start',transition:'all .28s',cursor:'default',opacity:vis?1:0,transform:vis?'none':'translateY(20px)',transitionDelay:(0.45+i*0.07)+'s'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(232,118,26,.14)';e.currentTarget.style.borderColor='rgba(232,118,26,.3)'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.05)';e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                <div style={{width:'54px',height:'54px',borderRadius:'15px',background:'linear-gradient(135deg,#FFF3E0,#FEF0D4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0,border:'1.5px solid rgba(232,118,26,.15)',boxShadow:'0 4px 12px rgba(232,118,26,.1)'}}>{v.icon}</div>
                <div>
                  <div style={{fontSize:'15.5px',fontWeight:'700',color:'#1C0A00',marginBottom:'7px'}}>{v.title}</div>
                  <div style={{fontSize:'13.5px',color:'#7A4010',lineHeight:'1.68'}}>{v.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}