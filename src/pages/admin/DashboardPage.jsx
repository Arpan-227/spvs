import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

var STATS = [
  { label:'Blog Posts',      value:'16',  icon:'📰', clr:'#E8761A', path:'/admin/blogs' },
  { label:'Gallery Items',   value:'24',  icon:'🖼️',  clr:'#6C3FC5', path:'/admin/gallery' },
  { label:'Faculty Members', value:'64',  icon:'👨‍🏫', clr:'#22a35a', path:'/admin/faculty' },
  { label:'Downloads',       value:'40',  icon:'⬇️',  clr:'#C45F0A', path:'/admin/downloads' },
  { label:'Alumni Records',  value:'8',   icon:'🎓', clr:'#E8761A', path:'/admin/alumni' },
  { label:'Open Jobs',       value:'5',   icon:'💼', clr:'#6C3FC5', path:'/admin/jobs' },
  { label:'Enquiries',       value:'12',  icon:'📋', clr:'#22a35a', path:'/admin/enquiries' },
  { label:'Testimonials',    value:'6',   icon:'💬', clr:'#C45F0A', path:'/admin/testimonials' },
]

var QUICK = [
  { label:'Add Blog Post',     icon:'✍️',  path:'/admin/blogs',        clr:'#E8761A' },
  { label:'Upload Photo',      icon:'📷', path:'/admin/gallery',       clr:'#6C3FC5' },
  { label:'Add Faculty',       icon:'👤', path:'/admin/faculty',       clr:'#22a35a' },
  { label:'Upload Document',   icon:'📄', path:'/admin/downloads',     clr:'#C45F0A' },
  { label:'Post a Job',        icon:'💼', path:'/admin/jobs',          clr:'#6C3FC5' },
  { label:'Manage Academics',   icon:'📚', path:'/admin/academics',     clr:'#6C3FC5' },
  { label:'Mandatory Disc.',   icon:'📋', path:'/admin/mandatory',     clr:'#22a35a' },
  { label:'Update Results',    icon:'🏆', path:'/admin/results',       clr:'#E8761A' },
  { label:'Add Announcement',  icon:'📢', path:'/admin/announcements', clr:'#C45F0A' },
]

var RECENT = [
  { action:'Blog post published',    item:'"Annual Sports Meet 2026"',      time:'2 hrs ago',  icon:'📰', clr:'#E8761A' },
  { action:'Faculty record updated', item:'Mrs. Pooja Agarwal — Principal', time:'1 day ago',  icon:'👨‍🏫', clr:'#22a35a' },
  { action:'Document uploaded',      item:'Fee Structure 2026–27.pdf',      time:'2 days ago', icon:'⬇️',  clr:'#C45F0A' },
  { action:'Job posting added',      item:'PGT Mathematics (Open)',         time:'3 days ago', icon:'💼', clr:'#6C3FC5' },
  { action:'New enquiry received',   item:'Admission — Class VI',           time:'4 days ago', icon:'📋', clr:'#22a35a' },
  { action:'Testimonial added',      item:'Alumni Priya Shukla — IAS',     time:'1 week ago', icon:'💬', clr:'#C45F0A' },
]

var INIT_PAGES = [
  { id:1,  name:'Home',               path:'/',                      status:'live'        },
  { id:2,  name:'Academics',          path:'/academics',             status:'live'        },
  { id:3,  name:'Facilities',         path:'/facilities',            status:'live'        },
  { id:4,  name:'Contact',            path:'/contact',               status:'live'        },
  { id:5,  name:'Campus Life',        path:'/campus-life',           status:'live'        },
  { id:6,  name:'Why Choose Us',      path:'/why-choose-us',         status:'live'        },
  { id:7,  name:'Alumni',             path:'/alumni',                status:'live'        },
  { id:8,  name:'Blog',               path:'/blog',                  status:'live'        },
  { id:9,  name:'Downloads',          path:'/downloads',             status:'live'        },
  { id:10, name:'Mandatory Disc.',    path:'/mandatory-disclosure',  status:'live'        },
  { id:11, name:'About Us',           path:'/about',                 status:'coming_soon' },
  { id:12, name:'Gallery',            path:'/gallery',               status:'coming_soon' },
  { id:13, name:'Admissions',         path:'/admissions',            status:'coming_soon' },
  { id:14, name:'Results',            path:'/results',               status:'coming_soon' },
]

var STATUS_META = {
  live:         { label:'Live',         bg:'rgba(34,163,90,.12)',   clr:'#22a35a', icon:'🟢' },
  maintenance:  { label:'Maintenance',  bg:'rgba(245,184,0,.15)',   clr:'#C45F0A', icon:'🔧' },
  coming_soon:  { label:'Coming Soon',  bg:'rgba(108,63,197,.1)',   clr:'#6C3FC5', icon:'🔜' },
  offline:      { label:'Offline',      bg:'rgba(220,38,38,.1)',    clr:'#dc2626', icon:'🔴' },
}

var s = {
  card: { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  h2:   { fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00', margin:'0 0 18px' },
}

export default function DashboardPage() {
  var { user } = useAuth()
  var [pages, setPages]           = useState(INIT_PAGES)
  var [siteMode, setSiteMode]     = useState('live')       // 'live' | 'maintenance' | 'offline'
  var [statusModal, setStatusModal] = useState(false)
  var [editPage, setEditPage]     = useState(null)

  function updatePageStatus(id, status) {
    setPages(function(prev){ return prev.map(function(p){ return p.id===id ? {...p, status:status} : p }) })
  }
  function toggleAllMaintenance() {
    var next = siteMode === 'maintenance' ? 'live' : 'maintenance'
    setSiteMode(next)
  }
  var hour = new Date().getHours()
  var greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div style={{maxWidth:'1200px'}}>

      {/* GREETING */}
      <div style={{marginBottom:'28px'}}>
        <div style={{fontSize:'12.5px', color:'#B87832', fontWeight:'600', marginBottom:'5px'}}>{greeting} 👋</div>
        <h1 style={{fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:'700', color:'#1C0A00', margin:'0 0 5px'}}>
          Welcome, <span style={{color:'#E8761A'}}>{user || 'Admin'}</span>
        </h1>
        <p style={{fontSize:'13px', color:'#7A4010', margin:0}}>Sant Pathik Vidyalaya — Admin Dashboard</p>
      </div>

      {/* STATS */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:'12px', marginBottom:'24px'}}>
        {STATS.map(function(st) {
          return (
            <Link key={st.label} to={st.path} style={{textDecoration:'none'}}>
              <div style={{...s.card, cursor:'pointer', transition:'all .25s'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor=st.clr+'55';e.currentTarget.style.boxShadow='0 10px 28px '+st.clr+'18'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(232,118,26,.12)';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px'}}>
                  <div style={{width:'42px', height:'42px', borderRadius:'12px', background:st.clr+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px'}}>{st.icon}</div>
                  <span style={{fontSize:'10px', fontWeight:'800', color:st.clr, letterSpacing:'.5px'}}>VIEW →</span>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'28px', fontWeight:'700', color:'#1C0A00', marginBottom:'3px'}}>{st.value}</div>
                <div style={{fontSize:'12px', color:'#7A4010', fontWeight:'600'}}>{st.label}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* QUICK ACTIONS + RECENT */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>

        {/* Quick Actions */}
        <div style={s.card}>
          <div style={s.h2}>⚡ Quick Actions</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
            {QUICK.map(function(q) {
              return (
                <Link key={q.label} to={q.path} style={{textDecoration:'none'}}>
                  <div style={{padding:'12px 14px', borderRadius:'10px', background:'#FFF6EA', border:'1.5px solid rgba(232,118,26,.1)', display:'flex', alignItems:'center', gap:'9px', cursor:'pointer', transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background=q.clr+'12';e.currentTarget.style.borderColor=q.clr+'40'}}
                    onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                    <span style={{fontSize:'18px'}}>{q.icon}</span>
                    <span style={{fontSize:'12px', fontWeight:'600', color:'#7A4010', lineHeight:'1.3'}}>{q.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={s.card}>
          <div style={s.h2}>🕐 Recent Activity</div>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            {RECENT.map(function(r, i) {
              return (
                <div key={i} style={{display:'flex', gap:'10px', alignItems:'flex-start', paddingBottom:'10px', borderBottom: i < RECENT.length-1 ? '1px solid rgba(232,118,26,.08)' : 'none'}}>
                  <div style={{width:'34px', height:'34px', borderRadius:'9px', background:r.clr+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', flexShrink:0}}>{r.icon}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:'12.5px', color:'#3D1A00', fontWeight:'600', marginBottom:'2px'}}>{r.action}</div>
                    <div style={{fontSize:'11.5px', color:'#B87832', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{r.item}</div>
                  </div>
                  <div style={{fontSize:'10.5px', color:'#B87832', whiteSpace:'nowrap', flexShrink:0}}>{r.time}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* SITE STATUS */}
      <div style={s.card}>
        <div style={s.h2}>🌐 Site Pages Status</div>
        {/* GLOBAL SITE BANNER */}
        {siteMode !== 'live' && (
          <div style={{marginBottom:'12px', padding:'11px 16px', borderRadius:'10px', background: siteMode==='maintenance' ? 'rgba(245,184,0,.15)' : 'rgba(220,38,38,.1)', border:'1.5px solid', borderColor: siteMode==='maintenance' ? 'rgba(196,95,10,.25)' : 'rgba(220,38,38,.25)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px'}}>
            <span style={{fontSize:'13px', fontWeight:'700', color: siteMode==='maintenance' ? '#C45F0A' : '#dc2626'}}>
              {siteMode==='maintenance' ? '🔧 Entire website is in Maintenance Mode' : '🔴 Entire website is Offline'}
            </span>
            <button onClick={function(){setSiteMode('live')}} style={{padding:'4px 12px', borderRadius:'7px', border:'none', cursor:'pointer', background:'#22a35a', color:'#fff', fontSize:'11.5px', fontWeight:'800'}}>Set Live</button>
          </div>
        )}

        {/* GLOBAL CONTROLS */}
        <div style={{display:'flex', gap:'7px', flexWrap:'wrap', marginBottom:'14px'}}>
          <button
            onClick={toggleAllMaintenance}
            style={{padding:'7px 14px', borderRadius:'8px', border:'1.5px solid', borderColor: siteMode==='maintenance'?'#C45F0A':'rgba(245,184,0,.4)', background: siteMode==='maintenance'?'rgba(245,184,0,.15)':'#fff', color: siteMode==='maintenance'?'#C45F0A':'#7A4010', fontSize:'12px', fontWeight:'800', cursor:'pointer', transition:'all .2s'}}>
            🔧 {siteMode==='maintenance' ? 'Disable' : 'Enable'} Maintenance Mode
          </button>
          <button
            onClick={function(){ setSiteMode(siteMode==='offline'?'live':'offline') }}
            style={{padding:'7px 14px', borderRadius:'8px', border:'1.5px solid', borderColor: siteMode==='offline'?'#dc2626':'rgba(220,38,38,.2)', background: siteMode==='offline'?'rgba(220,38,38,.1)':'#fff', color: siteMode==='offline'?'#dc2626':'#7A4010', fontSize:'12px', fontWeight:'800', cursor:'pointer', transition:'all .2s'}}>
            🔴 {siteMode==='offline' ? 'Bring Back Online' : 'Take Site Offline'}
          </button>
        </div>

        {/* PAGE LIST */}
        <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
          {pages.map(function(p) {
            var sm = STATUS_META[p.status] || STATUS_META.live
            return (
              <div key={p.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'10px', padding:'9px 12px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.1)', background:'#FFF6EA', transition:'all .15s'}}
                onMouseEnter={function(e){e.currentTarget.style.background='#FEF0D4'; e.currentTarget.style.borderColor='rgba(232,118,26,.25)'}}
                onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'; e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', flex:1, minWidth:0}}>
                  <span style={{fontSize:'13px'}}>{sm.icon}</span>
                  <span style={{fontSize:'12.5px', color:'#1C0A00', fontWeight:'700', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.name}</span>
                  <span style={{fontSize:'11px', color:'#B87832', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flexShrink:1}}>{p.path}</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'6px', flexShrink:0}}>
                  <span style={{padding:'3px 10px', borderRadius:'20px', fontSize:'10.5px', fontWeight:'800', background:sm.bg, color:sm.clr, whiteSpace:'nowrap'}}>{sm.label}</span>
                  <select
                    value={p.status}
                    onChange={function(e){ updatePageStatus(p.id, e.target.value) }}
                    style={{padding:'4px 8px', borderRadius:'7px', border:'1.5px solid rgba(232,118,26,.2)', background:'#fff', color:'#7A4010', fontSize:'11.5px', fontWeight:'700', cursor:'pointer', outline:'none'}}>
                    <option value="live">🟢 Live</option>
                    <option value="maintenance">🔧 Maintenance</option>
                    <option value="coming_soon">🔜 Coming Soon</option>
                    <option value="offline">🔴 Offline</option>
                  </select>
                  <a href={p.path} target="_blank" rel="noreferrer"
                    style={{width:'28px', height:'28px', borderRadius:'7px', border:'1.5px solid rgba(232,118,26,.2)', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', textDecoration:'none', flexShrink:0, transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.1)'}}
                    onMouseLeave={function(e){e.currentTarget.style.background='#fff'}}>
                    🔗
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}