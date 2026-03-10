import { Link } from 'react-router-dom'

var CAT_CLR = {
  'Academic':    '#6C3FC5',
  'Achievement': '#E8761A',
  'Event':       '#22a35a',
  'Notice':      '#F5B800',
  'Sports':      '#E8761A',
  'Admission':   '#6C3FC5',
  'Holiday':     '#22a35a',
  'Competition': '#E94F37',
}

export default function BlogCard({ post, featured }) {
  var clr = CAT_CLR[post.category] || '#E8761A'

  if (featured) {
    return (
      <div
        style={{borderRadius:'24px', overflow:'hidden', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .35s cubic-bezier(.34,1.56,.64,1)', display:'grid', gridTemplateColumns:'1fr 1fr'}}
        onMouseEnter={function(e){e.currentTarget.style.boxShadow='0 20px 50px '+clr+'22';e.currentTarget.style.borderColor=clr+'44'}}
        onMouseLeave={function(e){e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
      >
        {/* Image area */}
        <div style={{position:'relative', minHeight:'280px', overflow:'hidden', background:'linear-gradient(135deg,'+clr+'22,'+clr+'08)'}}>
          {post.image ? (
            <img src={post.image} alt={post.title}
              style={{width:'100%', height:'280px', objectFit:'cover', transition:'transform .5s cubic-bezier(.34,1.56,.64,1)', display:'block'}}
              onMouseEnter={function(e){e.currentTarget.style.transform='scale(1.08)'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='scale(1)'}} />
          ) : (
            <>
              <div style={{position:'absolute', width:'200px', height:'200px', borderRadius:'50%', background:clr+'0a', top:'-40px', right:'-40px'}} />
              <div style={{position:'absolute', width:'140px', height:'140px', borderRadius:'50%', background:clr+'08', bottom:'-20px', left:'-20px'}} />
              <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'80px'}}>{post.emoji}</div>
            </>
          )}
          <div style={{position:'absolute', top:'14px', left:'14px', background:clr, color:'#fff', fontSize:'11px', fontWeight:'800', padding:'4px 12px', borderRadius:'50px', letterSpacing:'.5px'}}>⭐ Featured</div>
        </div>
        {/* Content */}
        <div style={{padding:'36px'}}>
          <div style={{display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap'}}>
            <span style={{fontSize:'11px', fontWeight:'800', color:clr, background:clr+'12', padding:'3px 12px', borderRadius:'50px'}}>⭐ Featured</span>
            <span style={{fontSize:'11px', fontWeight:'800', color:clr, background:clr+'12', padding:'3px 12px', borderRadius:'50px'}}>{post.category}</span>
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'12px', lineHeight:'1.4'}}>{post.title}</h2>
          <p style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.7', marginBottom:'20px'}}>{post.excerpt}</p>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'10px'}}>
            <div style={{fontSize:'12px', color:'var(--txt3)'}}>📅 {post.date} &nbsp;·&nbsp; ✍️ {post.author}</div>
            <Link to={'/blog/'+post.slug} style={{padding:'9px 20px', borderRadius:'50px', background:'linear-gradient(135deg,'+clr+','+clr+'bb)', color:'#fff', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'800', boxShadow:'0 4px 14px '+clr+'33'}}>
              Read More →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{borderRadius:'20px', overflow:'hidden', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .35s cubic-bezier(.34,1.56,.64,1)', display:'flex', flexDirection:'column'}}
      onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 40px '+clr+'22';e.currentTarget.style.borderColor=clr+'44'}}
      onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
    >
      {/* Image / color band */}
      <div style={{height:'180px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,'+clr+'20,'+clr+'08)', flexShrink:0}}>
        {post.image ? (
          <img src={post.image} alt={post.title}
            style={{width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s cubic-bezier(.25,1,.4,1)', display:'block'}}
            onMouseEnter={function(e){e.currentTarget.style.transform='scale(1.1)'}}
            onMouseLeave={function(e){e.currentTarget.style.transform='scale(1)'}} />
        ) : (
          <>
            <div style={{position:'absolute', width:'100px', height:'100px', borderRadius:'50%', background:clr+'0a', top:'-20px', right:'-20px'}} />
            <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'48px'}}>{post.emoji}</div>
          </>
        )}
        <div style={{position:'absolute', top:'10px', left:'12px', background:clr, color:'#fff', fontSize:'10px', fontWeight:'800', padding:'3px 10px', borderRadius:'50px'}}>{post.category}</div>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.35) 100)', pointerEvents:'none'}} />
      </div>
      {/* Content */}
      <div style={{padding:'20px', flex:1, display:'flex', flexDirection:'column'}}>

        <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'var(--dark)', marginBottom:'8px', lineHeight:'1.4', flex:1}}>{post.title}</h3>
        <p style={{fontSize:'12.5px', color:'var(--txt2)', lineHeight:'1.6', marginBottom:'14px'}}>{post.excerpt.slice(0,100)}...</p>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid var(--brd)', paddingTop:'12px'}}>
          <div style={{fontSize:'11px', color:'var(--txt3)'}}>📅 {post.date}</div>
          <Link to={'/blog/'+post.slug} style={{fontSize:'12px', fontWeight:'800', color:clr, textDecoration:'none'}}>Read →</Link>
        </div>
      </div>
    </div>
  )
}