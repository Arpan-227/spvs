import { useEffect } from 'react'

var CATS = {
  events:   { label:'Annual Function & Events', emoji:'🎉' },
  sports:   { label:'Sports & Games',           emoji:'🏆' },
  labs:     { label:'Labs & Science',           emoji:'🔬' },
  campus:   { label:'Classroom & Campus',       emoji:'🏫' },
  cultural: { label:'Cultural Programs',        emoji:'🎭' },
  prize:    { label:'Prize Distribution',       emoji:'🥇' },
}

export default function Lightbox({ photo, photos, onClose, onPrev, onNext }) {
  var idx     = photos.findIndex(function(p){ return p.id === photo.id })
  var hasPrev = idx > 0
  var hasNext = idx < photos.length - 1
  var catInfo = CATS[photo.cat] || {}

  useEffect(function(){
    document.body.style.overflow = 'hidden'
    function onKey(e){
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return function(){
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  /* Thumbnail click: navigate to that photo */
  function goToPhoto(p) {
    var i = photos.findIndex(function(x){ return x.id === p.id })
    if (i > idx) { for (var k = idx; k < i; k++) onNext() }
    else if (i < idx) { for (var k = idx; k > i; k--) onPrev() }
  }

  return (
    <>
      <style>{`
        .lb-nav-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,.08);
          border: 1.5px solid rgba(255,255,255,.14);
          color: rgba(255,253,248,.85); font-size: 26px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all .22s; line-height: 1; flex-shrink: 0;
          position: absolute; z-index: 3; top: 50%; transform: translateY(-50%);
        }
        .lb-nav-btn:hover { background: rgba(232,118,26,.38); border-color: rgba(232,118,26,.55); }
        .lb-close-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,.08); border: 1.5px solid rgba(255,255,255,.14);
          color: rgba(255,253,248,.85); font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s; line-height: 1;
        }
        .lb-close-btn:hover { background: rgba(232,118,26,.45); border-color: rgba(232,118,26,.6); }
        .lb-thumb {
          width: 60px; height: 46px; border-radius: 8px; overflow: hidden;
          flex-shrink: 0; cursor: pointer; transition: all .2s;
        }
        .lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Mobile */
        @media (max-width: 640px) {
          .lb-main-pad { padding: 60px 14px 110px !important; }
          .lb-nav-btn  { width: 40px; height: 40px; font-size: 20px; }
          .lb-nav-prev { left: 8px !important; }
          .lb-nav-next { right: 8px !important; }
          .lb-thumb    { width: 44px; height: 34px; }
          .lb-caption-title { font-size: 15px !important; }
          .lb-topbar  { padding: 12px 14px !important; }
        }
      `}</style>

      <div
        style={{position:'fixed',inset:0,zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div style={{position:'absolute',inset:0,background:'rgba(8,4,1,.95)',backdropFilter:'blur(16px)'}} />

        {/* Top bar */}
        <div className="lb-topbar" style={{position:'absolute',top:0,left:0,right:0,zIndex:4,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 24px',background:'linear-gradient(to bottom,rgba(8,4,1,.75),transparent)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
            <div style={{padding:'5px 13px',borderRadius:'20px',background:'rgba(232,118,26,.2)',border:'1px solid rgba(232,118,26,.4)',fontSize:'11.5px',fontWeight:'800',color:'#E8761A',letterSpacing:'.8px',textTransform:'uppercase'}}>
              {catInfo.emoji} {catInfo.label}
            </div>
            <div style={{fontSize:'12px',color:'rgba(255,220,150,.45)',fontWeight:'600'}}>{photo.year}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'12px',color:'rgba(255,220,150,.4)',fontWeight:'600'}}>{idx + 1} / {photos.length}</span>
            <button className="lb-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Prev */}
        {hasPrev && (
          <button className="lb-nav-btn lb-nav-prev" style={{left:'18px'}}
            onClick={function(e){ e.stopPropagation(); onPrev() }}>‹</button>
        )}

        {/* Next */}
        {hasNext && (
          <button className="lb-nav-btn lb-nav-next" style={{right:'18px'}}
            onClick={function(e){ e.stopPropagation(); onNext() }}>›</button>
        )}

        {/* Main image */}
        <div className="lb-main-pad"
          style={{position:'relative',zIndex:2,width:'100%',maxWidth:'900px',padding:'70px 72px 100px',boxSizing:'border-box'}}
          onClick={function(e){ e.stopPropagation() }}
        >
          <div style={{borderRadius:'18px',overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,.75)',border:'1px solid rgba(255,255,255,.06)'}}>
            <img
              src={photo.img}
              alt={photo.title}
              style={{width:'100%',maxHeight:'65vh',objectFit:'cover',display:'block'}}
            />
          </div>

          {/* Caption */}
          <div style={{textAlign:'center',marginTop:'22px'}}>
            <div className="lb-caption-title" style={{fontFamily:"'Playfair Display',serif",fontSize:'21px',fontWeight:'700',color:'#FFFDF8',marginBottom:'8px'}}>
              {photo.title}
            </div>
            <div style={{width:'40px',height:'2.5px',background:'linear-gradient(90deg,#E8761A,#F5B800)',borderRadius:'2px',margin:'0 auto'}} />
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{
          position:'absolute',bottom:0,left:0,right:0,zIndex:4,
          padding:'14px 20px 18px',
          background:'linear-gradient(to top,rgba(8,4,1,.85) 60%,transparent)',
          display:'flex',gap:'8px',justifyContent:'center',
          overflowX:'auto',scrollbarWidth:'none',
        }}>
          {photos.map(function(p) {
            var isActive = p.id === photo.id
            return (
              <div
                key={p.id}
                className="lb-thumb"
                style={{
                  border:     isActive ? '2.5px solid #E8761A' : '2px solid rgba(255,255,255,.1)',
                  opacity:    isActive ? 1 : .4,
                  transform:  isActive ? 'translateY(-4px) scale(1.06)' : 'none',
                  boxShadow:  isActive ? '0 6px 18px rgba(232,118,26,.4)' : 'none',
                }}
                onClick={function(e){ e.stopPropagation(); goToPhoto(p) }}
                onMouseEnter={function(e){ if(!isActive){ e.currentTarget.style.opacity='.75'; e.currentTarget.style.borderColor='rgba(232,118,26,.4)' }}}
                onMouseLeave={function(e){ if(!isActive){ e.currentTarget.style.opacity='.4';  e.currentTarget.style.borderColor='rgba(255,255,255,.1)' }}}
              >
                <img src={p.img} alt={p.title} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}