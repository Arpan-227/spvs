import { useState, useEffect, useRef } from 'react'

/* ── Single photo card ─────────────────────────────────── */
function PhotoCard({ photo, onClick, delay }) {
  var [vis,     setVis]     = useState(false)
  var [hovered, setHovered] = useState(false)
  var [loaded,  setLoaded]  = useState(false)
  var ref = useRef()

  useEffect(function(){
    var t = setTimeout(function(){ setVis(true) }, delay)
    return function(){ clearTimeout(t) }
  },[delay])

  var isWide = photo.span === 2

  return (
    <div ref={ref}
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        aspectRatio: isWide ? '16/9' : '4/3',
        borderRadius:'14px',
        overflow:'hidden',
        position:'relative',
        cursor:'pointer',
        background:'#F5EDD8',
        border: hovered ? '2px solid rgba(232,118,26,.4)' : '2px solid rgba(232,118,26,.08)',
        boxShadow: hovered
          ? '0 20px 56px rgba(28,10,0,.18), 0 4px 16px rgba(232,118,26,.12)'
          : '0 2px 12px rgba(28,10,0,.07)',
        opacity:  vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(24px)',
        transition:'opacity .5s ease, transform .5s ease, box-shadow .28s ease, border-color .28s ease',
      }}
      onClick={onClick}
      onMouseEnter={function(){ setHovered(true)  }}
      onMouseLeave={function(){ setHovered(false) }}>

      {/* Shimmer skeleton */}
      {!loaded && (
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#F0E4CC 25%,#FAF0DC 50%,#F0E4CC 75%)',backgroundSize:'200% 100%',animation:'shimmer 1.5s infinite'}} />
      )}

      {/* Image */}
      <img
        src={photo.img}
        alt={photo.title}
        onLoad={function(){ setLoaded(true) }}
        style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition:'transform .55s cubic-bezier(.25,.46,.45,.94)',
          opacity: loaded ? 1 : 0,
        }} />

      {/* Dark gradient overlay */}
      <div style={{
        position:'absolute', inset:0,
        background: hovered
          ? 'linear-gradient(to top,rgba(28,10,0,.78) 0%,rgba(28,10,0,.18) 55%,transparent 100%)'
          : 'linear-gradient(to top,rgba(28,10,0,.52) 0%,transparent 55%)',
        transition:'background .35s ease',
      }} />

      {/* Top right — year badge */}
      <div style={{
        position:'absolute', top:'11px', right:'11px',
        padding:'3px 10px', borderRadius:'20px',
        background:'rgba(232,118,26,.82)', backdropFilter:'blur(6px)',
        fontSize:'10.5px', fontWeight:'800', color:'#fff', letterSpacing:'.4px',
      }}>{photo.year}</div>

      {/* Top left — category dot */}
      <div style={{
        position:'absolute', top:'11px', left:'11px',
        width:'8px', height:'8px', borderRadius:'50%',
        background:'linear-gradient(135deg,#E8761A,#F5B800)',
        boxShadow:'0 0 0 3px rgba(255,255,255,.2)',
        opacity: hovered ? 1 : 0,
        transition:'opacity .25s',
      }} />

      {/* Bottom caption */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'14px 15px 13px',
        transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        transition:'transform .32s ease',
      }}>
        <div style={{
          fontSize: isWide ? '15px' : '13.5px',
          fontWeight:'700',
          color:'#FFFDF8',
          lineHeight:'1.3',
          marginBottom: hovered ? '6px' : '0',
          textShadow:'0 1px 6px rgba(0,0,0,.5)',
        }}>{photo.title}</div>

        {hovered && (
          <div style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'11.5px',fontWeight:'700',color:'#FFD97A',letterSpacing:'.3px'}}>
            <span style={{width:'16px',height:'1.5px',background:'#E8761A',display:'inline-block',borderRadius:'2px'}} />
            View Full Photo
          </div>
        )}
      </div>

      {/* Hover — expand icon */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform: hovered ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.6)',
        width:'48px', height:'48px', borderRadius:'50%',
        background:'rgba(255,255,255,.12)', backdropFilter:'blur(8px)',
        border:'1.5px solid rgba(255,255,255,.2)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'18px',
        opacity: hovered ? 1 : 0,
        transition:'all .28s cubic-bezier(.34,1.56,.64,1)',
        pointerEvents:'none',
      }}>⛶</div>
    </div>
  )
}

/* ── Grid ──────────────────────────────────────────────── */
export default function GalleryGrid({ photos, onPhotoClick }) {

  if(photos.length === 0){
    return (
      <div style={{textAlign:'center',padding:'90px 24px'}}>
        <div style={{fontSize:'56px',marginBottom:'18px',filter:'grayscale(.4)'}}>🖼️</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#1C0A00',marginBottom:'8px'}}>No Photos Found</div>
        <div style={{fontSize:'14px',color:'#B87832'}}>Try selecting a different category or clearing the search.</div>
      </div>
    )
  }

  return (
    <div style={{
      display:'grid',
      gridTemplateColumns:'repeat(3,1fr)',
      gap:'14px',
      gridAutoRows:'240px',
    }}>
      {photos.map(function(photo, i){
        return (
          <PhotoCard
            key={photo.id}
            photo={photo}
            delay={i * 55}
            onClick={function(){ onPhotoClick(photo) }} />
        )
      })}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
      `}</style>
    </div>
  )
}