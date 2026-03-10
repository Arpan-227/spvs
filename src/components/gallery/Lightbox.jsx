import { useEffect } from 'react'

var CATS = {
  events:   { label:'Annual Function & Events', emoji:'🎉' },
  sports:   { label:'Sports & Games',           emoji:'🏆' },
  labs:     { label:'Labs & Science',           emoji:'🔬' },
  campus:   { label:'Classroom & Campus',       emoji:'🏫' },
  cultural: { label:'Cultural Programs',        emoji:'🎭' },
  prize:    { label:'Prize Distribution',        emoji:'🥇' },
}

export default function Lightbox({ photo, photos, onClose, onPrev, onNext }) {
  var idx     = photos.findIndex(function(p){ return p.id === photo.id })
  var hasPrev = idx > 0
  var hasNext = idx < photos.length - 1
  var catInfo = CATS[photo.cat] || {}

  useEffect(function(){
    document.body.style.overflow = 'hidden'
    function onKey(e){
      if(e.key === 'Escape')      onClose()
      if(e.key === 'ArrowLeft')   onPrev()
      if(e.key === 'ArrowRight')  onNext()
    }
    window.addEventListener('keydown', onKey)
    return function(){
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  },[onClose, onPrev, onNext])

  return (
    <div style={{position:'fixed',inset:0,zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}
      onClick={onClose}>

      {/* ── Backdrop ── */}
      <div style={{position:'absolute',inset:0,background:'rgba(10,6,2,.94)',backdropFilter:'blur(14px)'}} />

      {/* ── Top bar ── */}
      <div style={{position:'absolute',top:0,left:0,right:0,zIndex:2,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 24px',background:'linear-gradient(to bottom,rgba(10,6,2,.7),transparent)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{padding:'5px 13px',borderRadius:'20px',background:'rgba(232,118,26,.2)',border:'1px solid rgba(232,118,26,.35)',fontSize:'11.5px',fontWeight:'800',color:'#E8761A',letterSpacing:'1px',textTransform:'uppercase'}}>{catInfo.emoji} {catInfo.label}</div>
          <div style={{fontSize:'12px',color:'rgba(255,220,150,.5)',fontWeight:'600'}}>{photo.year}</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'12px',color:'rgba(255,220,150,.45)',fontWeight:'600'}}>{idx+1} / {photos.length}</span>
          <button onClick={onClose}
            style={{width:'38px',height:'38px',borderRadius:'50%',background:'rgba(255,255,255,.08)',border:'1.5px solid rgba(255,255,255,.12)',color:'rgba(255,253,248,.8)',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s',lineHeight:1}}
            onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.4)';e.currentTarget.style.borderColor='rgba(232,118,26,.6)'}}
            onMouseLeave={function(e){e.currentTarget.style.background='rgba(255,255,255,.08)';e.currentTarget.style.borderColor='rgba(255,255,255,.12)'}}>✕</button>
        </div>
      </div>

      {/* ── Prev button ── */}
      {hasPrev && (
        <button onClick={function(e){e.stopPropagation();onPrev()}}
          style={{position:'absolute',left:'20px',zIndex:2,width:'48px',height:'48px',borderRadius:'50%',background:'rgba(255,255,255,.07)',border:'1.5px solid rgba(255,255,255,.12)',color:'rgba(255,253,248,.85)',fontSize:'24px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .22s',lineHeight:1}}
          onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.35)';e.currentTarget.style.borderColor='rgba(232,118,26,.5)'}}
          onMouseLeave={function(e){e.currentTarget.style.background='rgba(255,255,255,.07)';e.currentTarget.style.borderColor='rgba(255,255,255,.12)'}}>‹</button>
      )}

      {/* ── Next button ── */}
      {hasNext && (
        <button onClick={function(e){e.stopPropagation();onNext()}}
          style={{position:'absolute',right:'20px',zIndex:2,width:'48px',height:'48px',borderRadius:'50%',background:'rgba(255,255,255,.07)',border:'1.5px solid rgba(255,255,255,.12)',color:'rgba(255,253,248,.85)',fontSize:'24px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .22s',lineHeight:1}}
          onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.35)';e.currentTarget.style.borderColor='rgba(232,118,26,.5)'}}
          onMouseLeave={function(e){e.currentTarget.style.background='rgba(255,255,255,.07)';e.currentTarget.style.borderColor='rgba(255,255,255,.12)'}}>›</button>
      )}

      {/* ── Main image ── */}
      <div style={{position:'relative',zIndex:1,width:'90%',maxWidth:'860px',padding:'64px 70px 90px'}}
        onClick={function(e){e.stopPropagation()}}>
        <div style={{borderRadius:'16px',overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,.7)',border:'1px solid rgba(255,255,255,.07)'}}>
          <img src={photo.img} alt={photo.title}
            style={{width:'100%',maxHeight:'68vh',objectFit:'cover',display:'block'}} />
        </div>

        {/* Caption */}
        <div style={{textAlign:'center',marginTop:'20px'}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#FFFDF8',marginBottom:'4px'}}>{photo.title}</div>
          <div style={{width:'36px',height:'2px',background:'linear-gradient(90deg,#E8761A,#F5B800)',borderRadius:'2px',margin:'0 auto'}} />
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:2,padding:'16px 24px',background:'linear-gradient(to top,rgba(10,6,2,.8),transparent)',display:'flex',gap:'8px',justifyContent:'center',overflowX:'auto'}}>
        {photos.map(function(p, i){
          var isActive = p.id === photo.id
          return (
            <div key={p.id}
              onClick={function(e){e.stopPropagation()}}
              style={{width:'56px',height:'42px',borderRadius:'8px',overflow:'hidden',flexShrink:0,border: isActive?'2px solid #E8761A':'2px solid rgba(255,255,255,.1)',opacity: isActive?1:.45,cursor:'pointer',transition:'all .2s',transform: isActive?'translateY(-3px)':'none'}}
              onMouseEnter={function(e){if(!isActive){e.currentTarget.style.opacity='.75';e.currentTarget.style.borderColor='rgba(232,118,26,.4)'}}}
              onMouseLeave={function(e){if(!isActive){e.currentTarget.style.opacity='.45';e.currentTarget.style.borderColor='rgba(255,255,255,.1)'}}}>
              <img src={p.img} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            </div>
          )
        })}
      </div>
    </div>
  )
}