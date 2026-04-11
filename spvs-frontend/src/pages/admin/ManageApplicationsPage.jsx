import { useState, useEffect } from 'react'
import { jobAppAPI } from '../../api'
import { FaEnvelopeOpen, FaSync, FaSpinner, FaCheckCircle, FaTimesCircle, FaClipboardList, FaEye, FaFileAlt, FaSearch } from 'react-icons/fa'

var STATUSES    = ['All','Pending','Shortlisted','Rejected','Hired']
var STATUS_CLR  = { Pending:'#C45F0A', Shortlisted:'#6C3FC5', Rejected:'#dc2626', Hired:'#22a35a' }
var STATUS_ICO  = { Pending:'⏳', Shortlisted:'📋', Rejected:'❌', Hired:'✅' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function fmtDate(d){ return d ? new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—' }
function avatar(name){ return (name||'?').split(' ').slice(0,2).map(function(w){return w[0]}).join('').toUpperCase() }

export default function ManageApplicationsPage() {
  var [apps,    setApps]    = useState([])
  var [loading, setLoading] = useState(true)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [view,    setView]    = useState(null)
  var [delId,   setDelId]   = useState(null)

  useEffect(function() {
    setLoading(true)
    jobAppAPI.getAll()
      .then(function(res){ setApps(res.data||[]); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }, [])

  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = apps.filter(function(a){
    var mf = filter==='All' || a.status===filter
    var ms = (a.name||'').toLowerCase().includes(search.toLowerCase()) ||
             (a.jobTitle||'').toLowerCase().includes(search.toLowerCase()) ||
             (a.phone||'').includes(search)
    return mf && ms
  })

  var counts = {}
  STATUSES.filter(function(s){return s!=='All'}).forEach(function(s){
    counts[s] = apps.filter(function(a){ return a.status===s }).length
  })

  async function updateStatus(id, status) {
    try {
      var res = await jobAppAPI.updateStatus(id, { status })
      setApps(function(p){ return p.map(function(x){ return x._id===id ? res.data : x }) })
      if (view && view._id===id) setView(res.data)
      showToast('Status updated to ' + status)
    } catch(err) { showToast(err.message,'error') }
  }

  var STATUS_ICONS_COMP = {
    Pending:     <FaSpinner size={14} color="#C45F0A"/>,
    Shortlisted: <FaClipboardList size={14} color="#6C3FC5"/>,
    Rejected:    <FaTimesCircle size={14} color="#dc2626"/>,
    Hired:       <FaCheckCircle size={14} color="#22a35a"/>,
  }

  return (
    <div style={{maxWidth:'1100px'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .map-status-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:20px; }
        .map-tbl          { overflow-x:auto; }
        .map-filters      { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        @media (max-width:700px) { .map-status-cards { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:480px) { .map-filters { flex-direction:column; align-items:stretch; } }
      `}</style>

      {toast && (
        <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          {toast.type==='error' ? <FaTimesCircle size={13}/> : <FaCheckCircle size={13}/>} {toast.msg}
        </div>
      )}

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px',display:'inline-flex',alignItems:'center',gap:'10px'}}>
            <FaEnvelopeOpen size={22} color="#E8761A"/> Job Applications
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Review and manage all job applications</p>
        </div>
        <button onClick={function(){setLoading(true);jobAppAPI.getAll().then(function(r){setApps(r.data||[]);setLoading(false)})}}
          style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'10px 18px',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          <FaSync size={13}/> Refresh
        </button>
      </div>

      <div className="map-status-cards">
        {STATUSES.filter(function(s){return s!=='All'}).map(function(st){
          var sc=STATUS_CLR[st]
          return (
            <div key={st} onClick={function(){setFilter(filter===st?'All':st)}}
              style={{...s.card,cursor:'pointer',borderColor:filter===st?sc:'rgba(232,118,26,.12)',background:filter===st?sc+'08':'#FFFFFF',transition:'all .2s',padding:'14px 16px'}}>
              <div style={{marginBottom:'6px'}}>{STATUS_ICONS_COMP[st]}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:filter===st?sc:'#1C0A00'}}>{counts[st]||0}</div>
              <div style={{fontSize:'11px',color:filter===st?sc:'#7A4010',fontWeight:'700'}}>{st}</div>
            </div>
          )
        })}
      </div>

      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="map-filters">
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search by name, job or phone..."
              style={{...s.inp,width:'100%',maxWidth:'260px',padding:'9px 13px 9px 32px'}} onFocus={inf} onBlur={inb} />
          </div>
          <div style={{fontSize:'12.5px',color:'#B87832',fontWeight:'600'}}>{visible.length} of {apps.length} applications</div>
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading applications...
          </div>
        ) : (
          <div className="map-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'650px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Applicant','Job Applied','Contact','Date','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && (
                  <tr><td colSpan={6} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>
                    {apps.length===0 ? 'No applications yet' : 'No applications match your filter'}
                  </td></tr>
                )}
                {visible.map(function(a,i){
                  var sc = STATUS_CLR[a.status]||'#C45F0A'
                  return (
                    <tr key={a._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
                          <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(a.name)}</div>
                          <div>
                            <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{a.name}</div>
                            <div style={{fontSize:'11px',color:'#B87832'}}>{a.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{fontSize:'13px',fontWeight:'600',color:'#3D1A00'}}>{a.jobTitle||'—'}</div>
                        {a.qual && <div style={{fontSize:'11px',color:'#B87832',marginTop:'2px'}}>{a.qual}</div>}
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{fontSize:'12.5px',fontWeight:'600',color:'#3D1A00'}}>{a.phone}</div>
                        {a.exp && <div style={{fontSize:'11px',color:'#B87832'}}>Exp: {a.exp}</div>}
                      </td>
                      <td style={{padding:'10px 12px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{fmtDate(a.createdAt)}</td>
                      <td style={{padding:'10px 12px'}}>
                        <select value={a.status||'Pending'} onChange={function(e){updateStatus(a._id,e.target.value)}}
                          style={{padding:'4px 8px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:sc+'15',color:sc,outline:'none',fontFamily:"'DM Sans',sans-serif"}}>
                          {STATUSES.filter(function(s){return s!=='All'}).map(function(st){ return <option key={st} value={st}>{STATUS_ICO[st]} {st}</option> })}
                        </select>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',gap:'5px'}}>
                          <button onClick={function(){setView(a)}} title="View"
                            style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#6C3FC5';e.currentTarget.style.borderColor='#6C3FC5'}}
                            onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.borderColor='rgba(232,118,26,.2)'}}>
                            <FaEye size={13} color="#7A4010"/>
                          </button>
                          {a.resumeUrl && (
                            <a href={'https://docs.google.com/viewer?url=' + encodeURIComponent(a.resumeUrl)} target="_blank" rel="noreferrer" title="View Resume"
                              style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(34,163,90,.2)',background:'rgba(34,163,90,.06)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',transition:'all .15s'}}
                              onMouseEnter={function(e){e.currentTarget.style.background='#22a35a'}}
                              onMouseLeave={function(e){e.currentTarget.style.background='rgba(34,163,90,.06)'}}>
                              <FaFileAlt size={13} color="#22a35a"/>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {view && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)setView(null)}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'520px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#1C0A00',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
                <FaEnvelopeOpen size={16} color="#E8761A"/> Application Detail
              </h2>
              <button onClick={function(){setView(null)}} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',gap:'14px',alignItems:'center',padding:'14px',borderRadius:'12px',background:'linear-gradient(135deg,rgba(232,118,26,.06),rgba(245,184,0,.04))',border:'1px solid rgba(232,118,26,.1)',marginBottom:'16px'}}>
              <div style={{width:'52px',height:'52px',borderRadius:'14px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(view.name)}</div>
              <div>
                <div style={{fontSize:'16px',fontWeight:'700',color:'#1C0A00'}}>{view.name}</div>
                <div style={{fontSize:'12px',color:'#B87832',marginTop:'2px'}}>Applied for: <strong>{view.jobTitle}</strong></div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
              {[
                ['Phone',         view.phone],
                ['Email',         view.email],
                ['Qualification', view.qual||'—'],
                ['Experience',    view.exp||'—'],
                ['Applied On',    fmtDate(view.createdAt)],
              ].map(function(row){
                return (
                  <div key={row[0]} style={{display:'flex',gap:'12px',padding:'9px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                    <span style={{fontSize:'12px',fontWeight:'800',color:'#B87832',minWidth:'100px',flexShrink:0}}>{row[0]}</span>
                    <span style={{fontSize:'13px',color:'#1C0A00',fontWeight:'600',wordBreak:'break-word'}}>{row[1]}</span>
                  </div>
                )
              })}
            </div>
            {view.message && (
              <div style={{padding:'12px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)',marginBottom:'16px'}}>
                <div style={{fontSize:'12px',fontWeight:'800',color:'#B87832',marginBottom:'6px'}}>Cover Note</div>
                <div style={{fontSize:'13px',color:'#1C0A00',lineHeight:'1.65'}}>{view.message}</div>
              </div>
            )}
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
              {view.resumeUrl && (
                <a href={'https://docs.google.com/viewer?url=' + encodeURIComponent(view.resumeUrl)} target="_blank" rel="noreferrer"
                  style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'10px 16px',borderRadius:'10px',background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.2)',color:'#22a35a',textDecoration:'none',fontSize:'13px',fontWeight:'700',fontFamily:"'DM Sans',sans-serif"}}>
                  <FaEye size={13}/> View Resume
                </a>
              )}
              <select value={view.status||'Pending'} onChange={function(e){updateStatus(view._id,e.target.value)}}
                style={{flex:1,padding:'10px 12px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFFDF8',color:'#2C1500',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',outline:'none',cursor:'pointer'}}>
                {STATUSES.filter(function(s){return s!=='All'}).map(function(st){ return <option key={st} value={st}>{STATUS_ICO[st]} {st}</option> })}
              </select>
              <button onClick={function(){setView(null)}} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',padding:'10px 20px'}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}