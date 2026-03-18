import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '../../api'

// Fallback static updates if DB is empty
var FALLBACK = [
  { ic:'🎉', tag:'Admissions',    date:'Mar 2025', title:'Admissions Open 2025-26',       desc:'Enrolling students for Play Group to Class XII. Limited seats available. Apply early to secure admission.' },
  { ic:'🏅', tag:'Achievement',   date:'Jan 2025', title:'District Sports Champions',      desc:'SPVS wins Gold in Kabaddi, Chess, Volleyball, Shot-put, 100m, 200m, 400m, 800m and Long Jump.' },
  { ic:'📺', tag:'National',      date:'Dec 2024', title:'KBC Winner — ₹3,20,000',        desc:'Aarav Raghuvansh of Class V wins ₹3,20,000 on Kaun Banega Crorepati. School felicitated him with cheque.' },
  { ic:'🏆', tag:'Results',       date:'Jun 2024', title:'100% Board Results Again',       desc:'SPVS achieves 100% pass rate in CBSE Class X and Class XII board examinations for the academic year.' },
  { ic:'🔬', tag:'Infrastructure', date:'Apr 2024', title:'New STEM Lab Inaugurated',      desc:'State-of-the-art STEM & Junior Tinkering Lab opened for students to explore robotics and innovation.' },
  { ic:'🏃', tag:'Sports',        date:'Mar 2024', title:'CBSE Cluster Level — Runner Up', desc:'School reaches Runner-Up position in Kabaddi (U-17) at CBSE cluster level games and sports event.' },
]

var CAT_EMOJI = { Academic:'🎓', Achievement:'🏆', Event:'🎉', Holiday:'📅', Competition:'🏅', Notice:'📌', Sports:'⚽', Admission:'📋', General:'📰' }

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN',{month:'short',year:'numeric'})
}

export default function LatestUpdates() {
  var [posts,   setPosts]   = useState([])
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    blogAPI.getAll()
      .then(function(res){ setPosts(res.data||[]); setLoading(false) })
      .catch(function(){ setLoading(false) })
  }, [])

  // Show latest 6 posts; fallback to static if empty
  var display = posts.length > 0 ? posts.slice(0,6) : FALLBACK

  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'48px',flexWrap:'wrap',gap:'16px'}}>
          <div className="rv">
            <div className="chip"><span className="chip-dot"></span>Latest News</div>
            <h2 className="sec-title">Updates &amp; <span className="hl">News</span></h2>
            <div className="s-bar" style={{marginBottom:'0'}}></div>
          </div>
          <Link to="/blog" className="btn-out rv" style={{transitionDelay:'.2s'}}>View All →</Link>
        </div>

        {loading ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'18px'}}>
            {[0,1,2,3,4,5].map(function(i){
              return (
                <div key={i} className="wcard" style={{padding:'22px 24px',opacity:.5}}>
                  <div style={{height:'14px',background:'rgba(232,118,26,.15)',borderRadius:'7px',marginBottom:'10px',width:'60%'}}/>
                  <div style={{height:'18px',background:'rgba(232,118,26,.1)',borderRadius:'7px',marginBottom:'8px'}}/>
                  <div style={{height:'40px',background:'rgba(232,118,26,.07)',borderRadius:'7px'}}/>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'18px'}}>
            {display.map(function(u, i) {
              // Support both DB posts and fallback static items
              var isDB   = !!u._id
              var ic     = isDB ? (CAT_EMOJI[u.category]||'📰') : u.ic
              var tag    = isDB ? u.category : u.tag
              var date   = isDB ? fmtDate(u.createdAt) : u.date
              var title  = u.title
              var desc   = isDB ? (u.excerpt||u.content?.slice(0,130)||'') : u.desc

              return (
                <div key={u._id||i} className="wcard" style={{padding:'22px 24px',cursor:'pointer'}}
                  onClick={isDB ? function(){ window.location.hash = '/blog/'+u._id } : undefined}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                    <span style={{fontSize:'24px'}}>{ic}</span>
                    <span style={{fontSize:'11px',fontWeight:'700',color:'var(--or)',background:'rgba(232,118,26,.08)',padding:'3px 10px',borderRadius:'50px',letterSpacing:'1px',textTransform:'uppercase'}}>{tag}</span>
                    <span style={{fontSize:'11px',color:'var(--txt3)',marginLeft:'auto'}}>{date}</span>
                  </div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px',lineHeight:'1.35'}}>{title}</div>
                  <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical'}}>{desc}</div>
                  {isDB && (
                    <div style={{marginTop:'10px',fontSize:'12px',fontWeight:'700',color:'var(--or)'}}>Read more →</div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}