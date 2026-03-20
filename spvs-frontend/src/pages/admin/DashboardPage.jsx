import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI, galleryAPI, facultyAPI, alumniAPI, jobAPI, enquiryAPI, testimonialAPI } from '../../api'

var QUICK = [
  { label:'Add Blog Post',    icon:'✍️',  path:'/admin/blogs',         clr:'#E8761A' },
  { label:'Upload Photo',     icon:'📷',  path:'/admin/gallery',       clr:'#6C3FC5' },
  { label:'Add Faculty',      icon:'👤',  path:'/admin/faculty',       clr:'#22a35a' },
  { label:'Upload Document',  icon:'📄',  path:'/admin/downloads',     clr:'#C45F0A' },
  { label:'Post a Job',       icon:'💼',  path:'/admin/jobs',          clr:'#6C3FC5' },
  { label:'Applications',     icon:'📨',  path:'/admin/applications',  clr:'#E8761A' },
  { label:'Manage Academics', icon:'📚',  path:'/admin/academics',     clr:'#6C3FC5' },
  { label:'Mandatory Disc.',  icon:'📋',  path:'/admin/mandatory',     clr:'#22a35a' },
  { label:'Add Announcement', icon:'📢',  path:'/admin/announcements', clr:'#C45F0A' },
]

var s = {
  card: { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'20px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  h2:   { fontFamily:"'Playfair Display',serif", fontSize:'15px', fontWeight:'700', color:'#1C0A00', margin:'0 0 16px' },
}

export default function DashboardPage() {
  var user = JSON.parse(localStorage.getItem('spvs_admin') || '{}').username || 'Admin'

  var [stats, setStats] = useState({
    blogs:'...', gallery:'...', faculty:'...', alumni:'...',
    jobs:'...', enquiries:'...', testimonials:'...'
  })

  useEffect(function() {
    var safe = function(p){ return p.catch(function(){ return { data:[] } }) }
    Promise.all([
      safe(blogAPI.getAll()),
      safe(galleryAPI.getAll()),
      safe(facultyAPI.getAll()),
      safe(alumniAPI.getAll()),
      safe(jobAPI.getAll()),
      safe(enquiryAPI.getAll()),
      safe(testimonialAPI.getAll()),
    ]).then(function(results) {
      setStats({
        blogs:        (results[0].data||[]).length,
        gallery:      (results[1].data||[]).length,
        faculty:      (results[2].data||[]).length,
        alumni:       (results[3].data||[]).length,
        jobs:         (results[4].data||[]).filter(function(j){ return j.status==='Open' }).length,
        enquiries:    (results[5].data||[]).filter(function(e){ return !e.read }).length,
        testimonials: (results[6].data||[]).length,
      })
    })
  }, [])

  var STATS = [
    { label:'Blog Posts',      value:stats.blogs,        icon:'📰', clr:'#E8761A', path:'/admin/blogs'        },
    { label:'Gallery Photos',  value:stats.gallery,      icon:'🖼️',  clr:'#6C3FC5', path:'/admin/gallery'      },
    { label:'Faculty Members', value:stats.faculty,      icon:'👨‍🏫', clr:'#22a35a', path:'/admin/faculty'      },
    { label:'Alumni Records',  value:stats.alumni,       icon:'🎓',  clr:'#E8761A', path:'/admin/alumni'       },
    { label:'Open Jobs',       value:stats.jobs,         icon:'💼',  clr:'#6C3FC5', path:'/admin/jobs'         },
    { label:'New Enquiries',   value:stats.enquiries,    icon:'📋',  clr:'#22a35a', path:'/admin/enquiries'    },
    { label:'Testimonials',    value:stats.testimonials, icon:'💬',  clr:'#C45F0A', path:'/admin/testimonials' },
  ]

  var hour = new Date().getHours()
  var greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div style={{maxWidth:'1200px'}}>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg) } }

        .dp-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .dp-quick {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .dp-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .dp-quick { grid-template-columns: 1fr 1fr; gap: 8px; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .dp-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .dp-quick { grid-template-columns: 1fr 1fr; gap: 6px; }
          .dp-stat-card { padding: 14px !important; }
          .dp-stat-num  { font-size: 22px !important; }
          .dp-stat-lbl  { font-size: 10.5px !important; }
          .dp-stat-icon { width: 34px !important; height: 34px !important; font-size: 15px !important; }
          .dp-quick-item { padding: 9px 10px !important; }
          .dp-quick-lbl  { font-size: 11px !important; }
        }
      `}</style>

      {/* Greeting */}
      <div style={{marginBottom:'24px'}}>
        <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600',marginBottom:'4px'}}>{greeting} 👋</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 4px'}}>
          Welcome, <span style={{color:'#E8761A'}}>{user}</span>
        </h1>
        <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Sant Pathik Vidyalaya — Admin Dashboard</p>
      </div>

      {/* Live Stats */}
      <div className="dp-stats">
        {STATS.map(function(st) {
          return (
            <Link key={st.label} to={st.path} style={{textDecoration:'none'}}>
              <div className="dp-stat-card"
                style={{...s.card, cursor:'pointer', transition:'all .25s', height:'100%'}}
                onMouseEnter={function(e){
                  e.currentTarget.style.transform='translateY(-3px)'
                  e.currentTarget.style.borderColor=st.clr+'55'
                  e.currentTarget.style.boxShadow='0 10px 28px '+st.clr+'18'
                }}
                onMouseLeave={function(e){
                  e.currentTarget.style.transform='none'
                  e.currentTarget.style.borderColor='rgba(232,118,26,.12)'
                  e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'
                }}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                  <div className="dp-stat-icon" style={{width:'40px',height:'40px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>{st.icon}</div>
                  <span style={{fontSize:'10px',fontWeight:'800',color:st.clr,letterSpacing:'.5px'}}>VIEW →</span>
                </div>
                <div className="dp-stat-num" style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,3vw,26px)',fontWeight:'700',color:'#1C0A00',marginBottom:'3px'}}>
                  {st.value === '...' ? (
                    <div style={{width:'28px',height:'28px',border:'3px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',display:'inline-block'}} />
                  ) : st.value}
                </div>
                <div className="dp-stat-lbl" style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div style={s.card}>
        <div style={s.h2}> Quick Actions</div>
        <div className="dp-quick">
          {QUICK.map(function(q) {
            return (
              <Link key={q.label} to={q.path} style={{textDecoration:'none'}}>
                <div className="dp-quick-item"
                  style={{padding:'10px 12px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.1)',display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',transition:'all .15s'}}
                  onMouseEnter={function(e){e.currentTarget.style.background=q.clr+'12';e.currentTarget.style.borderColor=q.clr+'40'}}
                  onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                  <span style={{fontSize:'16px',flexShrink:0}}>{q.icon}</span>
                  <span className="dp-quick-lbl" style={{fontSize:'11.5px',fontWeight:'600',color:'#7A4010',lineHeight:'1.3'}}>{q.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}