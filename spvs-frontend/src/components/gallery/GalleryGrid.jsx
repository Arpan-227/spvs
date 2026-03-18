import { useState, useEffect } from 'react'

/* ── Single photo card ─────────────────────────────────── */
function PhotoCard({ photo, onClick, delay }) {
  var [vis,    setVis]    = useState(false)
  var [loaded, setLoaded] = useState(false)
  var isWide = photo.span === 2

  useEffect(function(){
    var t = setTimeout(function(){ setVis(true) }, delay)
    return function(){ clearTimeout(t) }
  }, [delay])

  var cardId = 'pc-' + photo.id

  return (
    <>
      <style>{`
        #${cardId} {
          grid-column: ${isWide ? 'span 2' : 'span 1'};
          aspect-ratio: ${isWide ? '16/9' : '4/3'};
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: #F5EDD8;
          border: 2px solid rgba(232,118,26,.08);
          box-shadow: 0 2px 16px rgba(28,10,0,.08);
          opacity: ${vis ? 1 : 0};
          transform: ${vis ? 'translateY(0)' : 'translateY(28px)'};
          transition: opacity .5s ease, transform .5s ease, box-shadow .3s ease, border-color .3s ease;
          width: 100%;
          min-height: 0;
        }
        #${cardId}:hover {
          border-color: rgba(232,118,26,.45);
          box-shadow: 0 24px 60px rgba(28,10,0,.2), 0 4px 16px rgba(232,118,26,.14);
          transform: translateY(-4px);
        }
        #${cardId} .pc-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .6s cubic-bezier(.25,.46,.45,.94);
          opacity: ${loaded ? 1 : 0};
        }
        #${cardId}:hover .pc-img { transform: scale(1.1); }
        #${cardId} .pc-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,10,0,.55) 0%, transparent 55%);
          transition: background .35s ease;
        }
        #${cardId}:hover .pc-overlay {
          background: linear-gradient(to top, rgba(28,10,0,.82) 0%, rgba(28,10,0,.22) 55%, transparent 100%);
        }
        #${cardId} .pc-expand {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%) scale(.55);
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,.13); backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255,255,255,.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          opacity: 0;
          transition: all .3s cubic-bezier(.34,1.56,.64,1);
          pointer-events: none;
        }
        #${cardId}:hover .pc-expand {
          transform: translate(-50%,-50%) scale(1);
          opacity: 1;
        }
        #${cardId} .pc-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 16px 16px 14px;
          transform: translateY(5px);
          transition: transform .32s ease;
        }
        #${cardId}:hover .pc-caption { transform: translateY(0); }
        #${cardId} .pc-view-hint {
          display: flex; align-items: center; gap: 5px;
          font-size: 11.5px; font-weight: 700; color: #FFD97A; letter-spacing: .3px;
          margin-top: 6px;
          opacity: 0; transform: translateY(4px);
          transition: opacity .25s .05s ease, transform .25s .05s ease;
        }
        #${cardId}:hover .pc-view-hint { opacity: 1; transform: translateY(0); }
        #${cardId} .pc-dot {
          position: absolute; top: 12px; left: 12px;
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg,#E8761A,#F5B800);
          box-shadow: 0 0 0 3px rgba(255,255,255,.22);
          opacity: 0; transition: opacity .25s;
        }
        #${cardId}:hover .pc-dot { opacity: 1; }

        @media (max-width: 640px) {
          #${cardId} { grid-column: span 1 !important; aspect-ratio: 4/3 !important; border-radius: 12px; transform: translateY(0) !important; }
        }
      `}</style>

      <div id={cardId} onClick={onClick}>
        {/* Shimmer skeleton */}
        {!loaded && (
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#F0E4CC 25%,#FAF0DC 50%,#F0E4CC 75%)',backgroundSize:'200% 100%',animation:'shimmer 1.5s infinite'}} />
        )}

        {/* Image */}
        <img
          className="pc-img"
          src={photo.img}
          alt={photo.title}
          onLoad={function(){ setLoaded(true) }}
        />

        {/* Gradient overlay */}
        <div className="pc-overlay" />

        {/* Year badge */}
        <div style={{position:'absolute',top:'12px',right:'12px',padding:'3px 11px',borderRadius:'20px',background:'rgba(232,118,26,.85)',backdropFilter:'blur(6px)',fontSize:'10.5px',fontWeight:'800',color:'#fff',letterSpacing:'.5px'}}>
          {photo.year}
        </div>

        {/* Category dot (hover) */}
        <div className="pc-dot" />

        {/* Expand icon (hover) */}
        <div className="pc-expand">🔍</div>

        {/* Caption */}
        <div className="pc-caption">
          <div style={{fontSize: isWide ? '15px' : '13.5px',fontWeight:'700',color:'#FFFDF8',lineHeight:'1.3',textShadow:'0 1px 6px rgba(0,0,0,.5)'}}>
            {photo.title}
          </div>
          <div className="pc-view-hint">
            <span style={{width:'16px',height:'1.5px',background:'#E8761A',display:'inline-block',borderRadius:'2px'}} />
            View Full Photo
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Grid ──────────────────────────────────────────────── */
export default function GalleryGrid({ photos, onPhotoClick }) {

  if (photos.length === 0) {
    return (
      <div style={{textAlign:'center',padding:'90px 24px'}}>
        <div style={{fontSize:'56px',marginBottom:'18px',filter:'grayscale(.4)'}}>🖼️</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#1C0A00',marginBottom:'8px'}}>No Photos Found</div>
        <div style={{fontSize:'14px',color:'#B87832'}}>Try selecting a different category or clearing the search.</div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 400px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="gallery-grid">
        {photos.map(function(photo, i) {
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              delay={i * 50}
              onClick={function(){ onPhotoClick(photo) }}
            />
          )
        })}
      </div>
    </>
  )
}