var CATS = [
  { id:'all',      label:'All Photos',             emoji:'🖼️',  count:0 },
  { id:'events',   label:'Annual Function & Events',emoji:'🎉',  count:0 },
  { id:'sports',   label:'Sports & Games',          emoji:'🏆',  count:0 },
  { id:'labs',     label:'Labs & Science',          emoji:'🔬',  count:0 },
  { id:'campus',   label:'Classroom & Campus',      emoji:'🏫',  count:0 },
  { id:'cultural', label:'Cultural Programs',       emoji:'🎭',  count:0 },
  { id:'prize',    label:'Prize Distribution',      emoji:'🥇',  count:0 },
]

export default function GalleryFilter({ activeCat, onCatChange, search, onSearchChange, photos, filteredCount }) {

  /* compute counts */
  var counts = { all: photos.length }
  photos.forEach(function(p){ counts[p.cat] = (counts[p.cat]||0)+1 })

  return (
    <div style={{position:'sticky',top:'0',zIndex:100,background:'rgba(255,253,248,.95)',backdropFilter:'blur(14px)',borderBottom:'1.5px solid rgba(232,118,26,.1)',boxShadow:'0 4px 24px rgba(232,118,26,.06)'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px'}}>

        {/* ── Top row: search + count ── */}
        <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'14px 0 10px',borderBottom:'1px solid rgba(232,118,26,.07)'}}>

          {/* Search */}
          <div style={{position:'relative',flex:'0 0 260px'}}>
            <span style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'13px',pointerEvents:'none',color:'#B87832'}}>🔍</span>
            <input
              value={search}
              onChange={function(e){onSearchChange(e.target.value)}}
              placeholder="Search photos..."
              style={{width:'100%',padding:'9px 14px 9px 36px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.18)',background:'#FFFDF8',color:'#1C0A00',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',outline:'none',boxSizing:'border-box',transition:'border-color .2s, box-shadow .2s'}}
              onFocus={function(e){e.target.style.borderColor='#E8761A';e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)'}}
              onBlur={function(e){e.target.style.borderColor='rgba(232,118,26,.18)';e.target.style.boxShadow='none'}} />
          </div>

          {/* Divider */}
          <div style={{height:'28px',width:'1.5px',background:'rgba(232,118,26,.12)',flexShrink:0}} />

          {/* Count */}
          <div style={{fontSize:'12.5px',color:'#B87832',fontWeight:'700'}}>
            Showing <span style={{color:'#E8761A',fontFamily:"'Playfair Display',serif",fontSize:'15px",fontWeight:"700'}}>{filteredCount}</span> photos
          </div>
        </div>

        {/* ── Category pills row ── */}
        <div style={{display:'flex',gap:'6px',padding:'10px 0',overflowX:'auto',scrollbarWidth:'none'}}>
          {CATS.map(function(cat){
            var isActive = activeCat === cat.id
            var count    = counts[cat.id] || 0
            return (
              <button key={cat.id}
                onClick={function(){ onCatChange(cat.id) }}
                style={{
                  display:'flex', alignItems:'center', gap:'6px',
                  padding:'7px 15px',
                  borderRadius:'30px',
                  border: isActive ? '1.5px solid #E8761A' : '1.5px solid rgba(232,118,26,.15)',
                  background: isActive ? 'linear-gradient(135deg,#E8761A,#F5B800)' : '#FFFFFF',
                  color: isActive ? '#1C0A00' : '#7A4010',
                  fontFamily:"'DM Sans',sans-serif",
                  fontSize:'12.5px',
                  fontWeight:'700',
                  cursor:'pointer',
                  transition:'all .22s',
                  whiteSpace:'nowrap',
                  flexShrink:0,
                  boxShadow: isActive ? '0 4px 14px rgba(232,118,26,.25)' : '0 1px 4px rgba(232,118,26,.06)',
                }}
                onMouseEnter={function(e){ if(!isActive){ e.currentTarget.style.borderColor='rgba(232,118,26,.35)'; e.currentTarget.style.background='#FFF6EA' }}}
                onMouseLeave={function(e){ if(!isActive){ e.currentTarget.style.borderColor='rgba(232,118,26,.15)'; e.currentTarget.style.background='#FFFFFF' }}}>
                <span style={{fontSize:'14px'}}>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span style={{
                  padding:'1px 7px', borderRadius:'20px',
                  background: isActive ? 'rgba(28,10,0,.15)' : 'rgba(232,118,26,.1)',
                  fontSize:'10.5px', fontWeight:'800',
                  color: isActive ? '#1C0A00' : '#E8761A',
                }}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}