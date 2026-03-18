import { useEffect, useRef, useState } from 'react'

export default function DirectorMessage() {
  var [vis, setVis] = useState(false)
  var ref = useRef()

  useEffect(function(){
    var obs = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setVis(true); obs.disconnect() } },{ threshold:0.1 })
    if(ref.current) obs.observe(ref.current)
    return function(){ obs.disconnect() }
  },[])

  return (
    <section id="director" ref={ref} style={{padding:'80px 0',background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 60%,#1C0A00 100%)',position:'relative',overflow:'hidden'}}>

      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.1),transparent 70%)',top:'-200px',right:'-200px'}} />
        <div style={{position:'absolute',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.07),transparent 70%)',bottom:'-100px',left:'-100px'}} />
        {[0,1,2,3,4,5].map(function(i){
          return <div key={i} style={{position:'absolute',width:(8+i*4)+'px',height:(8+i*4)+'px',borderRadius:'50%',background:i%2===0?'rgba(232,118,26,.08)':'rgba(245,184,0,.07)',left:((i*17)%100)+'%',top:((i*23)%100)+'%',animation:'floatDot '+(3+i*.5)+'s ease-in-out '+(i*.4)+'s infinite alternate'}} />
        })}
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>

        <div style={{textAlign:'center',marginBottom:'48px',opacity:vis?1:0,transform:vis?'none':'translateY(24px)',transition:'all .65s ease'}}>
          <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',animation:'blink 2s infinite',flexShrink:0,display:'inline-block'}} />Leadership
          </div>
          <h2 className="sec-title" style={{color:'#FFCF40'}}>Message from the <span style={{background:'linear-gradient(90deg,#E8761A,#F5B800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Director's Desk</span></h2>
          <div style={{width:'48px',height:'3px',background:'linear-gradient(90deg,#E8761A,#F5B800)',borderRadius:'3px',margin:'0 auto'}} />
        </div>

        {/* Avatar on top on mobile, side-by-side on desktop */}
        <div className="dir-grid">

          <div style={{textAlign:'center',opacity:vis?1:0,transform:vis?'none':'translateX(-30px)',transition:'all .7s ease .15s'}}>
            <div style={{width:'150px',height:'150px',borderRadius:'50%',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'60px',margin:'0 auto 18px',boxShadow:'0 0 0 6px rgba(232,118,26,.15),0 0 0 12px rgba(232,118,26,.07),0 20px 60px rgba(232,118,26,.3)',animation:'pulseRing 3s ease-in-out infinite'}}>👔</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#FFCF40',marginBottom:'5px'}}>Sh. Awadhesh Narayan Agarwal</div>
            <div style={{fontSize:'11px',fontWeight:'800',color:'rgba(245,184,0,.5)',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'14px'}}>Director & Manager</div>
            <a href="tel:+919198783830" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 20px',borderRadius:'30px',background:'rgba(232,118,26,.15)',border:'1px solid rgba(232,118,26,.3)',color:'rgba(255,220,150,.85)',fontSize:'13px',fontWeight:'600',textDecoration:'none',transition:'all .2s'}}
              onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.28)'}}
              onMouseLeave={function(e){e.currentTarget.style.background='rgba(232,118,26,.15)'}}>
              📞 +91 9198783830
            </a>
          </div>

          <div style={{opacity:vis?1:0,transform:vis?'none':'translateX(30px)',transition:'all .7s ease .25s'}}>
            <div style={{fontSize:'64px',color:'rgba(245,184,0,.1)',fontFamily:'Georgia,serif',lineHeight:.8,marginBottom:'-8px',userSelect:'none'}}>"</div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {[
                'We truly believe that our education should now move from <b>knowledge to skill and wisdom</b>, from competition to cooperation, and from division to unity — and finally from "how to earn a livelihood" to "how to live".',
                'We aim to make our students capable enough to be <b>self-directed and self-managed individuals</b> who can confront the challenges of life without wavering. S.P.V. emphasizes imparting strong ethical and moral values alongside academic learning.',
                "We believe that problems exist in everyone's life, but we frequently remind our students — <b>do not be afraid of failure</b>. Instead, strive hard to achieve success, excellence and good leadership.",
                'I extend a hearty and warm welcome to all parents, students and staff of this great institution.'
              ].map(function(para,i){
                return <p key={i} style={{fontSize:'14.5px',color:'rgba(255,220,150,.75)',lineHeight:'1.8',margin:0}} dangerouslySetInnerHTML={{__html:para.replace(/<b>/g,'<strong style="color:#F5B800">').replace(/<\/b>/g,'</strong>')}} />
              })}
            </div>
            <div style={{marginTop:'24px',padding:'16px 20px',borderRadius:'16px',background:'rgba(232,118,26,.1)',border:'1px solid rgba(232,118,26,.22)',display:'inline-block'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontStyle:'italic',color:'#FFCF40',marginBottom:'5px'}}>"Great things are done by a series of small things brought together."</div>
              <div style={{fontSize:'12px',color:'rgba(245,184,0,.5)',fontWeight:'600'}}>— Vincent Van Gogh</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 6px rgba(232,118,26,.15),0 0 0 12px rgba(232,118,26,.07),0 20px 60px rgba(232,118,26,.3)} 50%{box-shadow:0 0 0 10px rgba(232,118,26,.12),0 0 0 18px rgba(232,118,26,.05),0 20px 60px rgba(232,118,26,.4)} }
        @keyframes floatDot  { from{transform:translateY(0) scale(1)} to{transform:translateY(-16px) scale(1.1)} }
        .dir-grid { display:grid; grid-template-columns:260px 1fr; gap:48px; align-items:center; }
        @media (max-width:768px) {
          .dir-grid { grid-template-columns:1fr !important; gap:32px !important; }
        }
      `}</style>
    </section>
  )
}