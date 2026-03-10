import { useEffect, useRef, useState } from 'react'

export default function PrincipalMessageFull() {
  var [vis, setVis] = useState(false)
  var ref = useRef()

  useEffect(function(){
    var obs = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setVis(true); obs.disconnect() } },{ threshold:0.08 })
    if(ref.current) obs.observe(ref.current)
    return function(){ obs.disconnect() }
  },[])

  return (
    <section id="principal" ref={ref} style={{padding:'90px 0',background:'linear-gradient(180deg,#FFF6EA 0%,#FFFDF8 100%)',position:'relative',overflow:'hidden'}}>

      <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.5,backgroundImage:'radial-gradient(circle, rgba(245,184,0,.1) 1px, transparent 1px)',backgroundSize:'40px 40px'}} />

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>

        <div style={{textAlign:'center',marginBottom:'56px',opacity:vis?1:0,transform:vis?'none':'translateY(24px)',transition:'all .65s ease'}}>
          <div className="chip"><span className="chip-dot"/>Academic Leadership</div>
          <h2 className="sec-title">Message from the <span className="hl">Principal's Desk</span></h2>
          <div className="s-bar" style={{margin:'0 auto'}} />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'48px',alignItems:'flex-start'}}>

          {/* Main message card */}
          <div style={{opacity:vis?1:0,transform:vis?'none':'translateX(-28px)',transition:'all .7s ease .1s'}}>
            <div style={{background:'#FFFFFF',borderRadius:'24px',border:'1.5px solid rgba(232,118,26,.12)',padding:'42px',boxShadow:'0 8px 40px rgba(232,118,26,.08)',position:'relative',overflow:'hidden'}}>

              {/* Top accent bar */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:'linear-gradient(90deg,#E8761A,#F5B800,#E8761A)',borderRadius:'24px 24px 0 0'}} />

              {/* Poem block */}
              <div style={{background:'linear-gradient(135deg,#FFF6EA,#FEF0D4)',borderRadius:'16px',border:'1.5px solid rgba(232,118,26,.18)',borderLeft:'4px solid #E8761A',padding:'22px 26px',marginBottom:'32px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',bottom:'-10px',right:'-10px',fontSize:'60px',color:'rgba(232,118,26,.06)',userSelect:'none',lineHeight:1}}>"</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontStyle:'italic',color:'#3D1A00',lineHeight:'2.1',position:'relative',zIndex:1}}>
                  A child is like a butterfly in the wind,<br/>
                  Same can fly higher than others,<br/>
                  But each one flies the best it can —<br/>
                  <strong style={{color:'#E8761A'}}>Why compare one against the other?<br/>
                  Each one is special. Each one is beautiful.</strong>
                </div>
              </div>

              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                {[
                  'Our children are not only taught to fly high in the open sky of tremendous opportunities but also to <b>stay attached to their roots</b>. Our Vidyalaya imparts value and skill-based education, bringing out the best in every child.',
                  'Our earnest effort is to provide a <b>conducive learning environment</b> to each and every student so that when they go out of our portals, they brim with confidence and emerge as the leading human beings of tomorrow.',
                  'The essence of Sant Pathik Vidyalaya lies in its <b>inclusiveness</b>. The mentors at our school are competent, hardworking, dedicated and committed to excellence. Education is not just the transfer of information — it is the transformation of character.',
                  'We strive to make SPVS a place where <b>curiosity is celebrated, creativity is nurtured</b>, and every student is equipped with the skills, values and confidence to make a meaningful difference in the world.'
                ].map(function(p,i){
                  return <p key={i} style={{fontSize:'15px',color:'#3D1A00',lineHeight:'1.82',margin:0}} dangerouslySetInnerHTML={{__html:p.replace(/<b>/g,'<strong style="color:#E8761A">').replace(/<\/b>/g,'</strong>')}} />
                })}
              </div>

              {/* Signature */}
              <div style={{marginTop:'32px',paddingTop:'22px',borderTop:'1.5px solid rgba(232,118,26,.1)',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'46px',height:'46px',borderRadius:'13px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',boxShadow:'0 4px 14px rgba(232,118,26,.25)'}}>✍️</div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15.5px',fontWeight:'700',color:'#1C0A00'}}>Mrs. Pooja Agarwal</div>
                  <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600'}}>Principal, Sant Pathik Vidyalaya</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{opacity:vis?1:0,transform:vis?'none':'translateX(28px)',transition:'all .7s ease .2s'}}>
            <div style={{position:'sticky',top:'90px',display:'flex',flexDirection:'column',gap:'14px'}}>

              {/* Principal card */}
              <div style={{background:'#FFFFFF',borderRadius:'22px',border:'1.5px solid rgba(232,118,26,.12)',padding:'28px',boxShadow:'0 8px 32px rgba(232,118,26,.08)',textAlign:'center',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,#E8761A,#F5B800)'}} />
                <div style={{width:'120px',height:'120px',borderRadius:'50%',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px',margin:'0 auto 16px',boxShadow:'0 8px 32px rgba(232,118,26,.28)',border:'3px solid rgba(245,184,0,.3)'}}>👩‍🏫</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:'700',color:'#1C0A00',marginBottom:'4px'}}>Mrs. Pooja Agarwal</div>
                <div style={{fontSize:'11px',fontWeight:'800',color:'#E8761A',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'18px'}}>Principal</div>
                {[{l:'Qualification',v:'M.A. B.Ed'},{l:'Experience',v:'22+ Years'},{l:'Mobile',v:'+91 8318842325'},{l:'Board',v:'CBSE'}].map(function(d){
                  return (
                    <div key={d.l} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(232,118,26,.08)'}}>
                      <span style={{fontSize:'11.5px',color:'#B87832',fontWeight:'700'}}>{d.l}</span>
                      <span style={{fontSize:'12.5px',color:'#1C0A00',fontWeight:'700'}}>{d.v}</span>
                    </div>
                  )
                })}
              </div>

              {/* VP card */}
              <div style={{background:'linear-gradient(135deg,#1C0A00,#3D1A00)',borderRadius:'18px',padding:'20px',textAlign:'center'}}>
                <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',margin:'0 auto 12px',boxShadow:'0 4px 16px rgba(232,118,26,.3)'}}>👨‍🏫</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'#FFCF40',marginBottom:'3px'}}>Mr. Bhikha Ram Tripathi</div>
                <div style={{fontSize:'10.5px',fontWeight:'800',color:'rgba(245,184,0,.5)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'8px'}}>Vice Principal</div>
                <div style={{fontSize:'12px',color:'rgba(255,220,150,.65)'}}>M.Sc B.Ed &nbsp;|&nbsp; +91 8318600231</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}