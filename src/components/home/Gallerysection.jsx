import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATS = ['All', 'Events', 'Sports Day', 'Annual Function', 'Activities']

const ITEMS = [
  { cat:'Events',          em:'🎉', lbl:'Independence Day Celebration',  tall:true  },
  { cat:'Sports Day',      em:'🏃', lbl:'District Sports Champions',     wide:false },
  { cat:'Annual Function', em:'🎭', lbl:'Annual Function 2024',          wide:true  },
  { cat:'Activities',      em:'🎨', lbl:'Art & Craft Exhibition',        tall:false },
  { cat:'Events',          em:'📚', lbl:'Science Exhibition',            tall:false },
  { cat:'Sports Day',      em:'🏆', lbl:'Kabaddi Champions',             tall:true  },
  { cat:'Activities',      em:'🎵', lbl:'Music Competition',             wide:false },
  { cat:'Annual Function', em:'🌟', lbl:'Prize Distribution Ceremony',   wide:false },
]

const COLORS = ['linear-gradient(135deg,#FFF3CC,#FFD94A)','linear-gradient(135deg,#FFE0A0,#E8761A33)','linear-gradient(135deg,#FFF8DC,#F5B80033)','linear-gradient(135deg,#FEF0D4,#FF9A3C33)','linear-gradient(135deg,#FFF3E0,#FFBB7A33)']

export default function GallerySection() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.cat === active)

  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'32px',flexWrap:'wrap',gap:'16px'}}>
          <div className="rv">
            <div className="chip"><span className="chip-dot"></span>Gallery</div>
            <h2 className="sec-title">Life at <span className="hl">SPVS</span></h2>
            <div className="s-bar" style={{marginBottom:0}}></div>
          </div>
          <Link to="/gallery" className="btn-out rv" style={{transitionDelay:'.2s'}}>View All Photos →</Link>
        </div>

        {/* Filter tabs */}
        <div className="rv" style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'28px'}}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{
                padding:'7px 18px',borderRadius:'50px',
                fontFamily:"'DM Sans',sans-serif",fontSize:'12.5px',fontWeight:'700',
                cursor:'pointer',transition:'all .25s',
                background: active===c ? 'var(--or)' : 'transparent',
                color: active===c ? '#fff' : 'var(--txt2)',
                border: active===c ? '1.5px solid var(--or)' : '1.5px solid rgba(232,118,26,.2)',
                boxShadow: active===c ? '0 5px 18px var(--shd)' : 'none',
              }}
            >{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gridAutoRows:'170px',gap:'12px'}}>
          {filtered.map((item,i) => (
            <div key={i}
              className="rv3d"
              style={{
                transitionDelay:`${(i%4)*0.07}s`,
                gridRow: item.tall ? 'span 2' : 'span 1',
                gridColumn: item.wide ? 'span 2' : 'span 1',
                borderRadius:'16px',overflow:'hidden',
                cursor:'pointer',position:'relative',
                background: COLORS[i % COLORS.length],
                border:'1.5px solid var(--brd)',
                transformStyle:'preserve-3d',
                transition:'all .4s cubic-bezier(.34,1.56,.64,1)',
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.transform='scale(1.04) translateZ(20px)'
                e.currentTarget.style.zIndex='10'
                e.currentTarget.style.boxShadow='0 20px 50px var(--shd)'
                e.currentTarget.querySelector('.gi-ov').style.opacity='1'
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.transform='scale(1) translateZ(0)'
                e.currentTarget.style.zIndex='1'
                e.currentTarget.style.boxShadow='none'
                e.currentTarget.querySelector('.gi-ov').style.opacity='0'
              }}
            >
              <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'10px'}}>
                <div style={{fontSize: item.tall ? '56px' : '40px'}}>{item.em}</div>
                <div style={{fontSize:'13px',fontWeight:'700',color:'var(--txt2)',textAlign:'center',padding:'0 14px',lineHeight:'1.3'}}>{item.lbl}</div>
                <div style={{fontSize:'10px',fontWeight:'700',color:'var(--or)',letterSpacing:'1px',textTransform:'uppercase',background:'rgba(232,118,26,.08)',padding:'3px 10px',borderRadius:'50px'}}>{item.cat}</div>
              </div>
              <div className="gi-ov" style={{
                position:'absolute',inset:0,
                background:'linear-gradient(0deg,rgba(28,10,0,.75),transparent 55%)',
                opacity:0,transition:'.3s',display:'flex',alignItems:'flex-end',padding:'14px'
              }}>
                <span style={{color:'#fff',fontSize:'12.5px',fontWeight:'700'}}>{item.lbl}</span>
              </div>
            </div>
          ))}
          {/* View all tile */}
          <div style={{borderRadius:'16px',background:'linear-gradient(135deg,var(--dark),var(--dark2))',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'10px',cursor:'pointer',border:'1.5px solid rgba(245,184,0,.15)'}}>
            <div style={{fontSize:'32px'}}>📷</div>
            <Link to="/gallery" style={{fontSize:'13px',fontWeight:'700',color:'var(--gd2)',textDecoration:'none',letterSpacing:'.5px'}}>View All →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}