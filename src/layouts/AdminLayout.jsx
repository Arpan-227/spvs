import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

var NAV_GROUPS = [
  {
    group: 'Content',
    items: [
      { label:'Dashboard',       icon:'📊', path:'/admin/dashboard' },
      { label:'Blogs & Updates', icon:'📰', path:'/admin/blogs' },
      { label:'Gallery',         icon:'🖼️',  path:'/admin/gallery' },
      { label:'Announcements',   icon:'📢', path:'/admin/announcements' },
    ]
  },
  {
    group: 'School',
    items: [
      { label:'Faculty',         icon:'👨‍🏫', path:'/admin/faculty' },
      { label:'Alumni',          icon:'🎓', path:'/admin/alumni' },
      { label:'Results',         icon:'🏆', path:'/admin/results' },
      { label:'Transport',       icon:'🚌', path:'/admin/transport' },
    ]
  },
  {
    group: 'Manage',
    items: [
      { label:'Academics',       icon:'📚', path:'/admin/academics' },
      { label:'Mandatory Disc.', icon:'📋', path:'/admin/mandatory' },
      { label:'Certificates',    icon:'📜', path:'/admin/certificates' },
      { label:'Jobs',            icon:'💼', path:'/admin/jobs' },
      { label:'Testimonials',    icon:'💬', path:'/admin/testimonials' },
    ]
  },
  {
    group: 'Enquiries',
    items: [
      { label:'Enquiries',       icon:'📩', path:'/admin/enquiries' },
      { label:'Settings',        icon:'⚙️',  path:'/admin/settings' },
    ]
  },
]

var ALL_NAV = NAV_GROUPS.flatMap(function(g){ return g.items })

export default function AdminLayout({ children }) {
  var { user, logout } = useAuth()
  var location = useLocation()
  var navigate  = useNavigate()
  var [collapsed, setCollapsed] = useState(false)

  function handleLogout() { logout(); navigate('/admin/login') }

  var active = ALL_NAV.find(function(n){ return n.path === location.pathname })

  return (
    <div style={{display:'flex', minHeight:'100vh', background:'#FFF6EA', fontFamily:"'DM Sans',sans-serif"}}>

      {/* SIDEBAR */}
      <div style={{
        width: collapsed ? '64px' : '228px',
        minHeight:'100vh',
        background:'#1C0A00',
        display:'flex', flexDirection:'column',
        transition:'width .25s ease',
        flexShrink:0, position:'sticky', top:0, height:'100vh',
        overflowY:'auto', overflowX:'hidden', zIndex:100,
        boxShadow:'4px 0 24px rgba(28,10,0,.18)'
      }}>

        {/* Logo area */}
        <div style={{
          padding: collapsed ? '16px 0' : '16px 14px',
          borderBottom:'1px solid rgba(232,118,26,.18)',
          display:'flex', alignItems:'center', gap:'10px',
          minHeight:'66px', justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink:0
        }}>
          <div style={{
            width:'36px', height:'36px', borderRadius:'10px',
            background:'linear-gradient(135deg,#E8761A,#F5B800)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'18px', flexShrink:0,
            boxShadow:'0 4px 14px rgba(232,118,26,.45)'
          }}>🏫</div>
          {!collapsed && (
            <div style={{overflow:'hidden', whiteSpace:'nowrap'}}>
              <div style={{fontFamily:"'Playfair Display',serif", fontSize:'13.5px', fontWeight:'700', color:'#FFCF40', lineHeight:'1.2'}}>SPVS Admin</div>
              <div style={{fontSize:'9px', color:'rgba(255,207,64,.38)', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', marginTop:'2px'}}>Management Portal</div>
            </div>
          )}
        </div>

        {/* Nav groups */}
        <nav style={{flex:1, padding: collapsed ? '8px 6px' : '8px 10px', display:'flex', flexDirection:'column', overflowY:'auto'}}>
          {NAV_GROUPS.map(function(group) {
            return (
              <div key={group.group} style={{marginBottom:'2px'}}>

                {/* Group label */}
                {!collapsed && (
                  <div style={{
                    fontSize:'9px', fontWeight:'900',
                    color:'rgba(255,207,64,.22)',
                    letterSpacing:'2px', textTransform:'uppercase',
                    padding:'12px 10px 5px',
                    userSelect:'none'
                  }}>{group.group}</div>
                )}
                {collapsed && (
                  <div style={{height:'1px', background:'rgba(232,118,26,.1)', margin:'8px 4px 6px'}} />
                )}

                {/* Nav items */}
                {group.items.map(function(item) {
                  var isActive = location.pathname === item.path
                  return (
                    <Link key={item.path} to={item.path}
                      title={collapsed ? item.label : ''}
                      style={{
                        display:'flex', alignItems:'center', gap:'10px',
                        padding: collapsed ? '9px 0' : '9px 10px',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        borderRadius:'10px', textDecoration:'none',
                        transition:'all .15s ease',
                        background: isActive ? 'rgba(232,118,26,.18)' : 'transparent',
                        color: isActive ? '#F5B800' : 'rgba(255,207,64,.5)',
                        borderLeft: collapsed ? 'none' : (isActive ? '3px solid #E8761A' : '3px solid transparent'),
                        marginBottom:'1px', overflow:'hidden', whiteSpace:'nowrap',
                        minHeight:'38px'
                      }}
                      onMouseEnter={function(e){
                        if(!isActive){
                          e.currentTarget.style.background='rgba(232,118,26,.1)'
                          e.currentTarget.style.color='rgba(255,207,64,.8)'
                        }
                      }}
                      onMouseLeave={function(e){
                        if(!isActive){
                          e.currentTarget.style.background='transparent'
                          e.currentTarget.style.color='rgba(255,207,64,.5)'
                        }
                      }}
                    >
                      <span style={{fontSize:'16px', flexShrink:0, width:'20px', textAlign:'center'}}>{item.icon}</span>
                      {!collapsed && (
                        <span style={{fontSize:'13px', fontWeight: isActive ? '700' : '500', flex:1}}>{item.label}</span>
                      )}
                      {isActive && !collapsed && (
                        <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#F5B800', flexShrink:0, marginRight:'2px'}} />
                      )}
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </nav>

        {/* Collapse button */}
        <div style={{padding: collapsed ? '10px 6px' : '10px', borderTop:'1px solid rgba(232,118,26,.12)', flexShrink:0}}>
          <button
            onClick={function(){setCollapsed(function(c){return !c})}}
            style={{
              width:'100%', padding: collapsed ? '9px 0' : '9px 10px',
              borderRadius:'9px', border:'none',
              background:'rgba(232,118,26,.08)',
              cursor:'pointer', color:'rgba(255,207,64,.5)',
              display:'flex', alignItems:'center', gap:'10px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px',
              transition:'all .15s'
            }}
            onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.18)';e.currentTarget.style.color='rgba(255,207,64,.8)'}}
            onMouseLeave={function(e){e.currentTarget.style.background='rgba(232,118,26,.08)';e.currentTarget.style.color='rgba(255,207,64,.5)'}}>
            <span style={{fontSize:'14px', flexShrink:0}}>{collapsed ? '→' : '←'}</span>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{flex:1, display:'flex', flexDirection:'column', minWidth:0}}>

        {/* TOPBAR */}
        <div style={{
          height:'66px',
          background:'#FFFFFF',
          borderBottom:'1.5px solid rgba(232,118,26,.12)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 28px', flexShrink:0,
          position:'sticky', top:0, zIndex:50,
          boxShadow:'0 2px 16px rgba(232,118,26,.07)'
        }}>
          {/* Left: page title */}
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <span style={{fontSize:'20px'}}>{active ? active.icon : '📊'}</span>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00', lineHeight:'1.2'}}>
                {active ? active.label : 'Dashboard'}
              </div>
              <div style={{fontSize:'10.5px', color:'#B87832', fontWeight:'600'}}>Sant Pathik Vidyalaya Admin</div>
            </div>
          </div>

          {/* Right: actions */}
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>

            {/* View Site button */}
            <a href="/" target="_blank" rel="noreferrer"
              style={{
                padding:'7px 16px', borderRadius:'9px',
                border:'1.5px solid rgba(232,118,26,.25)',
                color:'#E8761A', textDecoration:'none',
                fontSize:'12.5px', fontWeight:'700',
                transition:'all .15s', display:'flex', alignItems:'center', gap:'6px',
                background:'transparent'
              }}
              onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.08)';e.currentTarget.style.borderColor='rgba(232,118,26,.45)'}}
              onMouseLeave={function(e){e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(232,118,26,.25)'}}>
              🌐 View Site
            </a>

            {/* User chip */}
            <div style={{
              display:'flex', alignItems:'center', gap:'9px',
              padding:'6px 14px 6px 7px', borderRadius:'12px',
              background:'#FFF6EA', border:'1.5px solid rgba(232,118,26,.18)'
            }}>
              <div style={{
                width:'32px', height:'32px', borderRadius:'9px',
                background:'linear-gradient(135deg,#E8761A,#F5B800)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'14px', fontWeight:'900', color:'#fff',
                boxShadow:'0 3px 10px rgba(232,118,26,.3)', flexShrink:0
              }}>
                {user ? user[0].toUpperCase() : 'A'}
              </div>
              <div>
                <div style={{fontSize:'13px', color:'#3D1A00', fontWeight:'700', lineHeight:'1.1'}}>{user || 'Admin'}</div>
                <div style={{fontSize:'10px', color:'#B87832'}}>Administrator</div>
              </div>

              {/* Logout */}
              <button onClick={handleLogout} title="Logout"
                style={{
                  marginLeft:'4px', background:'none',
                  border:'none', cursor:'pointer',
                  color:'#B87832', fontSize:'18px',
                  lineHeight:1, transition:'color .15s', padding:'2px'
                }}
                onMouseEnter={function(e){e.currentTarget.style.color='#dc2626'}}
                onMouseLeave={function(e){e.currentTarget.style.color='#B87832'}}>⏻</button>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{
          padding:'7px 28px',
          background:'#FFFFFF',
          borderBottom:'1px solid rgba(232,118,26,.08)',
          display:'flex', alignItems:'center', gap:'6px'
        }}>
          <Link to="/admin/dashboard" style={{fontSize:'12px', color:'#B87832', textDecoration:'none', fontWeight:'600', transition:'color .15s'}}
            onMouseEnter={function(e){e.currentTarget.style.color='#E8761A'}}
            onMouseLeave={function(e){e.currentTarget.style.color='#B87832'}}>
            🏠 Dashboard
          </Link>
          {active && active.path !== '/admin/dashboard' && (
            <>
              <span style={{color:'rgba(184,120,50,.35)', fontSize:'12px'}}>›</span>
              <span style={{fontSize:'12px', color:'#E8761A', fontWeight:'700'}}>{active.label}</span>
            </>
          )}
        </div>

        {/* PAGE CONTENT */}
        <div style={{flex:1, overflowY:'auto', padding:'28px', background:'#FFF6EA'}}>
          {children}
        </div>
      </div>
    </div>
  )
}