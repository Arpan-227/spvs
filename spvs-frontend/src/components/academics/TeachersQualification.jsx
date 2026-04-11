import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { facultyAPI } from '../../api'
import { FaUsers, FaGraduationCap, FaBook, FaPencilAlt, FaUserTie, FaPhone, FaSearch } from 'react-icons/fa'

var CAT_STYLE = {
  Director:        { color:'#C45F0A', bg:'rgba(196,95,10,.1)',  grad:'linear-gradient(135deg,#C45F0A,#E8761A)' },
  Principal:       { color:'#E8761A', bg:'rgba(232,118,26,.1)', grad:'linear-gradient(135deg,#E8761A,#F5B800)' },
  'Vice Principal':{ color:'#C45F0A', bg:'rgba(196,95,10,.1)',  grad:'linear-gradient(135deg,#C45F0A,#E8761A)' },
  PGT:             { color:'#6C3FC5', bg:'rgba(108,63,197,.1)', grad:'linear-gradient(135deg,#6C3FC5,#9B59F5)' },
  TGT:             { color:'#22a35a', bg:'rgba(34,163,90,.1)',  grad:'linear-gradient(135deg,#22a35a,#2ecc71)' },
  PRT:             { color:'#000', bg:'rgba(245,184,0,0.1)',  grad:'linear-gradient(135deg,#F5B800,#ffd700)' },
  Librarian:       { color:'#7A4010', bg:'rgba(122,64,16,.1)',  grad:'linear-gradient(135deg,#7A4010,#C45F0A)' },
  'Sports Coach':  { color:'#22a35a', bg:'rgba(34,163,90,.1)',  grad:'linear-gradient(135deg,#22a35a,#2ecc71)' },
  'Lab Assistant': { color:'#B87832', bg:'rgba(184,120,50,.1)', grad:'linear-gradient(135deg,#B87832,#E8761A)' },
  'Admin Staff':   { color:'#7A4010', bg:'rgba(122,64,16,.1)',  grad:'linear-gradient(135deg,#7A4010,#C45F0A)' },
}

function getInitials(name) {
  return (name||'').replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Sh\.)\s*/i,'').split(' ').slice(0,2).map(function(p){ return p[0]||'' }).join('').toUpperCase()
}

function FacultyCard({ f }) {
  var st = CAT_STYLE[f.role] || CAT_STYLE['TGT']
  return (
    <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'16px 18px',borderRadius:'16px',background:'var(--card)',border:'1.5px solid var(--brd)'}}>
      {f.image ? (
        <div style={{width:'50px',height:'50px',borderRadius:'14px',overflow:'hidden',flexShrink:0,border:'2px solid '+st.color+'44',boxShadow:'0 4px 14px '+st.color+'33'}}>
          <img src={f.image} alt={f.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>
      ) : (
        <div style={{width:'50px',height:'50px',borderRadius:'14px',flexShrink:0,background:st.grad,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'DM Sans',sans-serif",fontSize:'16px',fontWeight:'900',color:'#fff',letterSpacing:'1px',boxShadow:'0 4px 14px '+st.color+'44'}}>
          {getInitials(f.name)}
        </div>
      )}
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'var(--dark)',marginBottom:'4px',lineHeight:'1.3'}}>{f.name}</div>
        <div style={{display:'inline-flex',alignItems:'center',fontSize:'10px',fontWeight:'800',color:st.color,background:st.bg,padding:'2px 9px',borderRadius:'50px',marginBottom:'6px'}}>{f.role} {f.dept ? '— '+f.dept : ''}</div>
        {f.qual && <div style={{fontSize:'12px',color:'var(--txt2)',marginBottom:'2px'}}>{f.qual}</div>}
        {f.exp  && <div style={{fontSize:'11px',color:'var(--txt3)'}}>{f.exp}</div>}
        {f.phone && (
          <a href={'tel:'+f.phone} style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'11px',color:'var(--or)',marginTop:'4px',fontWeight:'700',textDecoration:'none'}}>
            <FaPhone size={10}/> {f.phone}
          </a>
        )}
      </div>
    </div>
  )
}

export default function TeachersQualification({ embedded }) {
  var [faculty,  setFaculty]  = useState([])
  var [loading,  setLoading]  = useState(true)
  var [filter,   setFilter]   = useState('All')
  var [search,   setSearch]   = useState('')
  var [view,     setView]     = useState('grid')

  useEffect(function() {
    facultyAPI.getAll()
      .then(function(res){ setFaculty(res.data||[]); setLoading(false) })
      .catch(function(){   setLoading(false) })
  }, [])

  var cats = ['All','Director','Principal','Vice Principal','PGT','TGT','PRT','Librarian','Sports Coach']

  var filtered = faculty.filter(function(f) {
    var matchCat    = filter==='All' || f.role===filter
    var q           = search.toLowerCase()
    var matchSearch = (f.name||'').toLowerCase().includes(q) || (f.dept||'').toLowerCase().includes(q) || (f.qual||'').toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  var total = faculty.length
  var pgts  = faculty.filter(function(f){ return f.role==='PGT' }).length
  var tgts  = faculty.filter(function(f){ return f.role==='TGT' }).length
  var prts  = faculty.filter(function(f){ return f.role==='PRT' }).length
  var mgmt  = faculty.filter(function(f){ return ['Director','Principal','Vice Principal'].includes(f.role) }).length

  var STATS = [
    [total||'64+', 'Total Staff', <FaUsers size={20} color="#E8761A"/>,       '#E8761A'],
    [pgts||'16',   'PGTs',        <FaGraduationCap size={20} color="#6C3FC5"/>, '#6C3FC5'],
    [tgts||'20',   'TGTs',        <FaBook size={20} color="#22a35a"/>,          '#22a35a'],
    [prts||'10',   'PRTs',        <FaPencilAlt size={20} color="#000"/>,     '#000'],
    [mgmt||'4',    'Management',  <FaUserTie size={20} color="#E8761A"/>,       '#E8761A'],
  ]

  return (
    <>
      <style>{`@keyframes spin { to{transform:rotate(360deg)} }`}</style>

      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">Academics</div>
            <h1 className="pb-title">Teachers & <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Qualifications</span></h1>
            <p className="pb-sub">Meet our {total||'64'}+ dedicated faculty members — experienced, qualified and committed to excellence</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span><Link to="/academics">Academics</Link><span>›</span>
              <span className="bc-cur">Faculty</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)',minHeight:'40vh',padding:embedded?'0':'60px 20px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'12px',marginBottom:'28px'}}>
            {STATS.map(function(item){
              return (
                <div key={item[1]} style={{padding:'16px 10px',borderRadius:'14px',background:'var(--card)',textAlign:'center',border:'1.5px solid var(--brd)'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'12px',background:item[3]+'18',border:'1.5px solid '+item[3]+'30',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}>{item[2]}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:item[3],lineHeight:'1'}}>{item[0]}</div>
                  <div style={{fontSize:'10px',color:'var(--txt3)',marginTop:'4px',letterSpacing:'.8px',textTransform:'uppercase'}}>{item[1]}</div>
                </div>
              )
            })}
          </div>

          {/* Search + filters */}
          <div style={{marginBottom:'24px'}}>
            <div style={{position:'relative',marginBottom:'10px'}}>
              <FaSearch size={13} color="var(--txt3)" style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)'}}/>
              <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search name, department or qualification..."
                style={{width:'100%',boxSizing:'border-box',padding:'11px 16px 11px 38px',borderRadius:'10px',border:'1.5px solid var(--brd)',background:'var(--bg)',color:'var(--txt)',fontFamily:"'DM Sans',sans-serif",fontSize:'13.5px',outline:'none'}}
                onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
            </div>
            <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
              <div style={{display:'flex',gap:'5px',flexWrap:'wrap',flex:1}}>
                {cats.map(function(c){
                  var isActive = filter===c
                  return (
                    <button key={c} onClick={function(){setFilter(c)}} style={{padding:'8px 14px',borderRadius:'50px',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'12px',fontWeight:'700',background:isActive?'var(--or)':'var(--bg2)',color:isActive?'#fff':'var(--txt2)',boxShadow:isActive?'0 4px 14px rgba(232,118,26,.3)':'none'}}>
                      {c}
                    </button>
                  )
                })}
              </div>
              <div style={{display:'flex',gap:'4px',background:'var(--bg2)',padding:'4px',borderRadius:'10px',border:'1.5px solid var(--brd)',flexShrink:0}}>
                {[['grid','⊞'],['list','☰']].map(function(pair){
                  return <button key={pair[0]} onClick={function(){setView(pair[0])}} style={{padding:'7px 12px',borderRadius:'8px',border:'none',cursor:'pointer',fontSize:'14px',transition:'all .2s',background:view===pair[0]?'var(--card)':'transparent',color:view===pair[0]?'var(--or)':'var(--txt3)',boxShadow:view===pair[0]?'0 2px 8px rgba(232,118,26,.15)':'none'}}>{pair[1]}</button>
                })}
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{textAlign:'center',padding:'60px'}}>
              <div style={{width:'44px',height:'44px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 14px'}}/>
              <div style={{color:'var(--txt3)',fontSize:'14px'}}>Loading faculty...</div>
            </div>
          ) : view==='grid' ? (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'12px'}}>
              {filtered.map(function(f){ return <FacultyCard key={f._id} f={f} /> })}
            </div>
          ) : (
            <div style={{borderRadius:'18px',overflow:'hidden',border:'1.5px solid var(--brd)',boxShadow:'0 6px 28px rgba(232,118,26,.06)'}}>
              <div style={{overflowX:'auto',WebkitOverflowScrolling:'touch'}}>
                <table style={{width:'100%',borderCollapse:'collapse',minWidth:'560px'}}>
                  <thead>
                    <tr style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))'}}>
                      {['#','Name','Role','Qualification','Dept','Exp'].map(function(h){
                        return <th key={h} style={{padding:'12px 14px',textAlign:'left',fontSize:'10px',fontWeight:'800',color:'rgba(255,255,255,.6)',letterSpacing:'1px',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(function(f,i){
                      var st = CAT_STYLE[f.role]||CAT_STYLE['TGT']
                      return (
                        <tr key={f._id} style={{borderTop:'1px solid var(--brd)',background:i%2===0?'transparent':'rgba(0,0,0,.012)'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.03)'}}
                          onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'transparent':'rgba(0,0,0,.012)'}}>
                          <td style={{padding:'10px 14px',fontSize:'11px',color:'var(--txt3)',fontWeight:'600'}}>{i+1}</td>
                          <td style={{padding:'10px 14px',fontWeight:'700',color:'var(--dark)',fontSize:'13px',fontFamily:"'Playfair Display',serif",whiteSpace:'nowrap'}}>{f.name}</td>
                          <td style={{padding:'10px 14px',whiteSpace:'nowrap'}}><span style={{fontSize:'10px',fontWeight:'800',color:st.color,background:st.bg,padding:'2px 9px',borderRadius:'50px'}}>{f.role}</span></td>
                          <td style={{padding:'10px 14px',fontSize:'12.5px',color:'var(--txt2)',fontStyle:'italic',whiteSpace:'nowrap'}}>{f.qual}</td>
                          <td style={{padding:'10px 14px',fontSize:'12.5px',color:'var(--txt2)'}}>{f.dept}</td>
                          <td style={{padding:'10px 14px',fontSize:'12px',color:'var(--txt3)'}}>{f.exp||'—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && filtered.length===0 && (
            <div style={{textAlign:'center',padding:'60px',color:'var(--txt3)'}}>
              <FaSearch size={40} color="var(--txt3)" style={{marginBottom:'12px'}}/>
              <div style={{fontSize:'16px',fontWeight:'600',color:'var(--txt2)'}}>No results for "{search}"</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}