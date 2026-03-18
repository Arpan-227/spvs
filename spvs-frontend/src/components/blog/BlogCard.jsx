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

var CAT_EM = {
  'Academic':    '🎓',
  'Achievement': '🏆',
  'Event':       '🎉',
  'Notice':      '📌',
  'Sports':      '⚽',
  'Admission':   '📋',
  'Holiday':     '📅',
  'Competition': '🏅',
}

export default function BlogCard({ post, featured }) {
  var clr = CAT_CLR[post.category] || '#E8761A'
  var em  = post.emoji || CAT_EM[post.category] || '📰'

  if (featured) {
    return (
      <>
        <style>{`
          .bc-feat { border-radius:26px; overflow:hidden; background:var(--card); border:1.5px solid var(--brd); display:grid; grid-template-columns:1fr 1fr; transition:box-shadow .35s, border-color .35s; }
          .bc-feat:hover { box-shadow:0 24px 60px ${clr}28; border-color:${clr}55; }
          .bc-feat-img { position:relative; min-height:320px; overflow:hidden; background:linear-gradient(135deg,${clr}22,${clr}08); }
          .bc-feat-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s cubic-bezier(.25,1,.4,1); }
          .bc-feat:hover .bc-feat-img img { transform:scale(1.08); }
          .bc-feat-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 55%); pointer-events:none; }

          .bc-feat-mob { display:none; border-radius:22px; overflow:hidden; background:var(--card); border:1.5px solid var(--brd); }
          .bc-feat-mob-img { height:220px; position:relative; overflow:hidden; background:linear-gradient(135deg,${clr}22,${clr}08); }
          .bc-feat-mob-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s cubic-bezier(.25,1,.4,1); }
          .bc-feat-mob:hover .bc-feat-mob-img img { transform:scale(1.06); }

          @media (max-width:640px) {
            .bc-feat     { display:none !important; }
            .bc-feat-mob { display:block !important; }
          }
        `}</style>

        {/* ── DESKTOP featured ── */}
        <div className="bc-feat">
          <div className="bc-feat-img">
            {post.image
              ? <img src={post.image} alt={post.title} />
              : <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'90px'}}>{em}</div>
            }
            <div className="bc-feat-overlay" />
            <div style={{position:'absolute',top:'18px',left:'18px',display:'flex',gap:'8px'}}>
              <span style={{background:'rgba(255,255,255,.18)',backdropFilter:'blur(8px)',color:'#fff',fontSize:'11px',fontWeight:'800',padding:'5px 14px',borderRadius:'50px',border:'1px solid rgba(255,255,255,.3)',letterSpacing:'.5px'}}>⭐ Featured</span>
              <span style={{background:clr,color:'#fff',fontSize:'11px',fontWeight:'800',padding:'5px 14px',borderRadius:'50px'}}>{post.category}</span>
            </div>
            {/* Bottom meta overlay */}
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px 24px'}}>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.7)'}}>📅 {post.date} &nbsp;·&nbsp; ✍️ {post.author}</div>
            </div>
          </div>

          {/* Content side */}
          <div style={{padding:'36px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'7px',background:clr+'15',borderRadius:'50px',padding:'6px 14px',marginBottom:'18px',width:'fit-content'}}>
              <span style={{fontSize:'14px'}}>{em}</span>
              <span style={{fontSize:'11px',fontWeight:'800',color:clr,letterSpacing:'.5px',textTransform:'uppercase'}}>{post.category}</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'var(--dark)',marginBottom:'14px',lineHeight:'1.35'}}>{post.title}</h2>
            <p style={{fontSize:'13.5px',color:'var(--txt2)',lineHeight:'1.75',marginBottom:'24px',flex:1}}>{post.excerpt}</p>
            {/* Divider */}
            <div style={{height:'1.5px',background:'linear-gradient(90deg,'+clr+'40,transparent)',borderRadius:'2px',marginBottom:'22px'}} />
            <Link to={'/blog/'+post.slug} style={{
              display:'inline-flex',alignItems:'center',gap:'10px',
              padding:'13px 26px',borderRadius:'50px',width:'fit-content',
              background:'linear-gradient(135deg,'+clr+','+clr+'cc)',
              color:'#fff',textDecoration:'none',
              fontFamily:"'DM Sans',sans-serif",fontSize:'13.5px',fontWeight:'800',
              boxShadow:'0 6px 20px '+clr+'44',
              transition:'transform .25s,box-shadow .25s',
            }}
              onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 28px '+clr+'55'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 20px '+clr+'44'}}
            >
              Read Full Article <span style={{fontSize:'16px'}}>→</span>
            </Link>
          </div>
        </div>

        {/* ── MOBILE featured ── */}
        <div className="bc-feat-mob">
          <div className="bc-feat-mob-img">
            {post.image
              ? <img src={post.image} alt={post.title} />
              : <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'72px'}}>{em}</div>
            }
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 55%)',pointerEvents:'none'}} />
            <div style={{position:'absolute',top:'12px',left:'12px',display:'flex',gap:'6px'}}>
              <span style={{background:'rgba(255,255,255,.2)',backdropFilter:'blur(6px)',color:'#fff',fontSize:'10px',fontWeight:'800',padding:'4px 10px',borderRadius:'50px',border:'1px solid rgba(255,255,255,.25)'}}>⭐ Featured</span>
              <span style={{background:clr,color:'#fff',fontSize:'10px',fontWeight:'800',padding:'4px 10px',borderRadius:'50px'}}>{post.category}</span>
            </div>
          </div>
          <div style={{padding:'20px'}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'19px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px',lineHeight:'1.4'}}>{post.title}</h2>
            <p style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65',marginBottom:'16px'}}>{post.excerpt.slice(0,140)}...</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
              <div style={{fontSize:'11px',color:'var(--txt3)'}}>📅 {post.date}</div>
              <Link to={'/blog/'+post.slug} style={{padding:'9px 20px',borderRadius:'50px',background:'linear-gradient(135deg,'+clr+','+clr+'cc)',color:'#fff',textDecoration:'none',fontSize:'12.5px',fontWeight:'800',boxShadow:'0 4px 14px '+clr+'44'}}>
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  /* ── Regular card ── */
  return (
    <>
      <style>{`
        .bc-card-${post.slug.replace(/[^a-z0-9]/g,'-')} { border-radius:20px; overflow:hidden; background:var(--card); border:1.5px solid var(--brd); display:flex; flex-direction:column; transition:transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s, border-color .35s; }
        .bc-card-${post.slug.replace(/[^a-z0-9]/g,'-')}:hover { transform:translateY(-7px); box-shadow:0 20px 48px ${clr}28; border-color:${clr}50; }
        .bc-card-${post.slug.replace(/[^a-z0-9]/g,'-')} .bc-img img { transition:transform .6s cubic-bezier(.25,1,.4,1); }
        .bc-card-${post.slug.replace(/[^a-z0-9]/g,'-')}:hover .bc-img img { transform:scale(1.1); }
      `}</style>

      <div className={'bc-card-'+post.slug.replace(/[^a-z0-9]/g,'-')}>
        {/* Image */}
        <div className="bc-img" style={{height:'190px',position:'relative',overflow:'hidden',background:'linear-gradient(135deg,'+clr+'22,'+clr+'08)',flexShrink:0}}>
          {post.image
            ? <img src={post.image} alt={post.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
            : <>
                <div style={{position:'absolute',width:'110px',height:'110px',borderRadius:'50%',background:clr+'0c',top:'-22px',right:'-22px'}} />
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'52px'}}>{em}</div>
              </>
          }
          {/* Gradient overlay */}
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.45) 0%,transparent 50%)',pointerEvents:'none'}} />
          {/* Category badge */}
          <div style={{position:'absolute',top:'12px',left:'12px',display:'flex',alignItems:'center',gap:'5px',background:'rgba(0,0,0,.4)',backdropFilter:'blur(6px)',borderRadius:'50px',padding:'4px 11px',border:'1px solid rgba(255,255,255,.15)'}}>
            <span style={{fontSize:'11px'}}>{em}</span>
            <span style={{fontSize:'10px',fontWeight:'800',color:'#fff',letterSpacing:'.3px'}}>{post.category}</span>
          </div>
          {/* Date overlay bottom */}
          <div style={{position:'absolute',bottom:'10px',left:'12px',fontSize:'10.5px',color:'rgba(255,255,255,.8)',fontWeight:'600'}}>📅 {post.date}</div>
        </div>

        {/* Content */}
        <div style={{padding:'18px 20px',flex:1,display:'flex',flexDirection:'column'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'15.5px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px',lineHeight:'1.45',flex:1}}>{post.title}</h3>
          <p style={{fontSize:'12.5px',color:'var(--txt2)',lineHeight:'1.65',marginBottom:'14px'}}>{post.excerpt.slice(0,105)}...</p>
          {/* Footer */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'12px',borderTop:'1.5px solid var(--brd)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:clr,boxShadow:'0 0 6px '+clr}} />
              <span style={{fontSize:'11px',fontWeight:'700',color:clr}}>{post.author || 'SPVS'}</span>
            </div>
            <Link to={'/blog/'+post.slug} style={{
              display:'inline-flex',alignItems:'center',gap:'5px',
              fontSize:'12px',fontWeight:'800',color:'#fff',
              background:'linear-gradient(135deg,'+clr+','+clr+'cc)',
              padding:'6px 14px',borderRadius:'50px',textDecoration:'none',
              boxShadow:'0 3px 10px '+clr+'40',
              transition:'transform .2s,box-shadow .2s',
            }}
              onMouseEnter={function(e){e.currentTarget.style.transform='scale(1.05)';e.currentTarget.style.boxShadow='0 5px 16px '+clr+'55'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 3px 10px '+clr+'40'}}
            >Read →</Link>
          </div>
        </div>
      </div>
    </>
  )
}