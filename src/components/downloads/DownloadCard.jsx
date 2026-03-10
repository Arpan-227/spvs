export default function DownloadCard({ item }) {
  var TYPE_CLR = { PDF:'#E8761A', DOC:'#6C3FC5', XLS:'#22a35a', IMG:'#F5B800' }
  var TYPE_ICN = { PDF:'📄', DOC:'📝', XLS:'📊', IMG:'🖼️' }
  var clr = TYPE_CLR[item.type] || '#E8761A'
  var icn = TYPE_ICN[item.type] || '📄'

  return (
    <div
      style={{display:'flex', alignItems:'center', gap:'16px', padding:'16px 20px', borderRadius:'14px', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .3s cubic-bezier(.34,1.56,.64,1)'}}
      onMouseEnter={function(e){e.currentTarget.style.transform='translateX(4px)';e.currentTarget.style.boxShadow='0 8px 24px '+clr+'20';e.currentTarget.style.borderColor=clr+'44'}}
      onMouseLeave={function(e){e.currentTarget.style.transform='translateX(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
    >
      {/* Type badge */}
      <div style={{width:'50px', height:'50px', borderRadius:'12px', background:clr+'15', border:'1.5px solid '+clr+'25', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, gap:'2px'}}>
        <div style={{fontSize:'18px'}}>{icn}</div>
        <div style={{fontSize:'9px', fontWeight:'900', color:clr, letterSpacing:'.5px'}}>{item.type}</div>
      </div>

      {/* Info */}
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)', marginBottom:'3px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item.title}</div>
        <div style={{fontSize:'12px', color:'var(--txt3)'}}>
          {item.size && <span style={{marginRight:'12px'}}>📦 {item.size}</span>}
          {item.date && <span>🗓️ {item.date}</span>}
        </div>
      </div>

      {/* Download button */}
      <a
        href={item.url || '#'}
        download
        target="_blank"
        rel="noreferrer"
        style={{padding:'8px 18px', borderRadius:'50px', background:'linear-gradient(135deg,'+clr+','+clr+'bb)', color:'#fff', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:'800', flexShrink:0, boxShadow:'0 4px 12px '+clr+'30', transition:'all .2s', display:'flex', alignItems:'center', gap:'6px'}}
        onMouseEnter={function(e){e.currentTarget.style.transform='scale(1.06)'}}
        onMouseLeave={function(e){e.currentTarget.style.transform='scale(1)'}}
      >
        ⬇ Download
      </a>
    </div>
  )
}