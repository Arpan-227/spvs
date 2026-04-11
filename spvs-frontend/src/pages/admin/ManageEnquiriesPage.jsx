import { useState, useEffect } from 'react'
import { enquiryAPI } from '../../api'
import {
  FaClipboardList, FaCheckCircle, FaTimesCircle, FaSpinner, FaBell,
  FaSync, FaEye, FaTrash, FaSearch, FaUser, FaPhone, FaEnvelope, FaTags,
  FaCalendarAlt, FaComments, FaUserPlus,
} from 'react-icons/fa'

var STATUSES = ['All','New','In Progress','Admitted','Not Interested','Follow Up']
var STATUS_CLR = { New:'#6C3FC5', 'In Progress':'#C45F0A', Admitted:'#22a35a', 'Not Interested':'#dc2626', 'Follow Up':'#E8761A' }
var STATUS_ICO_COMP = {
  New:            <FaUserPlus size={13}/>,
  'In Progress':  <FaSpinner size={13}/>,
  Admitted:       <FaCheckCircle size={13}/>,
  'Not Interested':<FaTimesCircle size={13}/>,
  'Follow Up':    <FaBell size={13}/>,
}
var STATUS_ICO = { New:'🆕', 'In Progress':'⏳', Admitted:'✅', 'Not Interested':'❌', 'Follow Up':'🔔' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function avatar(name){ return (name||'?').split(' ').slice(0,2).map(function(w){ return w[0] }).join('').toUpperCase() }
function fmtDate(d){ if(!d) return ''; return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) }

export default function ManageEnquiriesPage() {
  var [items,   setItems]   = useState([])
  var [loading, setLoading] = useState(true)
  var [toast,   setToast]   = useState(null)
  var [sFilter, setSFilter] = useState('All')
  var [tFilter, setTFilter] = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [view,    setView]    = useState(null)
  var [delId,   setDelId]   = useState(null)
  var [statuses, setStatuses] = useState({})
  var [notes,    setNotes]    = useState({})

  function fetchEnquiries() {
    setLoading(true)
    enquiryAPI.getAll()
      .then(function(res){ setItems(res.data || []); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }
  useEffect(fetchEnquiries, [])

  function showToast(msg, type) { setToast({ msg, type: type||'success' }); setTimeout(function(){ setToast(null) }, 3000) }
  function getStatus(id)  { return statuses[id] || 'New' }
  function setStatus(id, st) { setStatuses(function(p){ var n={...p}; n[id]=st; return n }) }
  function getNote(id)    { return notes[id] || '' }
  function setNote(id, v) { setNotes(function(p){ var n={...p}; n[id]=v; return n }) }

  var visible = items.filter(function(e) {
    var ms = sFilter==='All' || getStatus(e._id)===sFilter
    var mt = tFilter==='All' || e.type===tFilter
    var mq = (e.name||'').toLowerCase().includes(search.toLowerCase()) || (e.phone||'').includes(search)
    return ms && mt && mq
  })

  async function markRead(id) {
    try {
      await enquiryAPI.markRead(id)
      setItems(function(p){ return p.map(function(x){ return x._id===id ? {...x, read:true} : x }) })
    } catch(err) { showToast(err.message,'error') }
  }

  async function handleDelete() {
    try {
      await enquiryAPI.delete(delId)
      setItems(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Enquiry deleted')
      setModal(null); setDelId(null)
    } catch(err) { showToast(err.message,'error') }
  }

  var counts = {}
  STATUSES.filter(function(s){ return s!=='All' }).forEach(function(s){ counts[s]=items.filter(function(e){ return getStatus(e._id)===s }).length })
  var unread = items.filter(function(e){ return !e.read }).length

  return (
    <div style={{maxWidth:'1100px'}}>
      <style>{`
        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .meq-status-cards { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:20px; }
        .meq-tbl { overflow-x:auto; }
        .meq-filters { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        @media (max-width:700px) { .meq-status-cards { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:480px) { .meq-status-cards { grid-template-columns:repeat(2,1fr); } .meq-filters { flex-direction:column; align-items:stretch; } }
      `}</style>

      {toast && (
        <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          {toast.type==='error' ? <FaTimesCircle size={13}/> : <FaCheckCircle size={13}/>} {toast.msg}
        </div>
      )}

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px',display:'inline-flex',alignItems:'center',gap:'10px'}}>
            <FaClipboardList size={22} color="#E8761A"/> Enquiries
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
            All contact and admission enquiries from the website
            {unread > 0 && <span style={{padding:'2px 10px',borderRadius:'20px',background:'#E8761A',color:'#fff',fontSize:'11px',fontWeight:'800'}}>{unread} unread</span>}
          </p>
        </div>
        <button onClick={fetchEnquiries} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'10px 18px',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          <FaSync size={13}/> Refresh
        </button>
      </div>

      <div className="meq-status-cards">
        {STATUSES.filter(function(s){ return s!=='All' }).map(function(st){
          var sc=STATUS_CLR[st]
          return (
            <div key={st} onClick={function(){setSFilter(sFilter===st?'All':st)}} style={{...s.card,cursor:'pointer',borderColor:sFilter===st?sc:'rgba(232,118,26,.12)',background:sFilter===st?sc+'08':'#FFFFFF',transition:'all .2s',padding:'14px 16px'}}>
              <div style={{marginBottom:'6px',color:sFilter===st?sc:'#7A4010'}}>{STATUS_ICO_COMP[st]}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:sFilter===st?sc:'#1C0A00'}}>{counts[st]||0}</div>
              <div style={{fontSize:'11px',color:sFilter===st?sc:'#7A4010',fontWeight:'700'}}>{st}</div>
            </div>
          )
        })}
      </div>

      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="meq-filters">
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search by name or phone..."
              style={{...s.inp,width:'100%',maxWidth:'240px',padding:'9px 13px 9px 32px'}} onFocus={inf} onBlur={inb} />
          </div>
          <select value={tFilter} onChange={function(e){setTFilter(e.target.value)}} style={{...s.inp,width:'150px',padding:'9px 13px'}} onFocus={inf} onBlur={inb}>
            <option value="All">All Types</option>
            <option value="General">General</option>
            <option value="Admission">Admission</option>
          </select>
          <div style={{fontSize:'12.5px',color:'#B87832',fontWeight:'600'}}>{visible.length} of {items.length}</div>
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading enquiries...
          </div>
        ) : (
          <div className="meq-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'650px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['','Enquirer','Contact','Type','Date','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No enquiries found</td></tr>}
                {visible.map(function(e, i){
                  var st  = getStatus(e._id)
                  var sc  = STATUS_CLR[st] || '#7A4010'
                  var isUnread = !e.read
                  return (
                    <tr key={e._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:isUnread?'#FFFBF5':i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                      onMouseEnter={function(el){el.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(el){el.currentTarget.style.background=isUnread?'#FFFBF5':i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'10px 8px',width:'20px'}}>
                        {isUnread && <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#E8761A',margin:'0 auto'}}/>}
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
                          <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(e.name)}</div>
                          <span style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{e.name}</span>
                        </div>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{fontSize:'12.5px',color:'#3D1A00',fontWeight:'600'}}>{e.phone}</div>
                        {e.email && <div style={{fontSize:'11px',color:'#B87832',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'140px'}}>{e.email}</div>}
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:e.type==='Admission'?'rgba(108,63,197,.1)':'rgba(232,118,26,.1)',color:e.type==='Admission'?'#6C3FC5':'#C45F0A',whiteSpace:'nowrap'}}>{e.type||'General'}</span>
                      </td>
                      <td style={{padding:'10px 12px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{fmtDate(e.createdAt)}</td>
                      <td style={{padding:'10px 12px'}}>
                        <select value={st} onChange={function(ev){setStatus(e._id,ev.target.value)}}
                          style={{padding:'4px 8px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:sc+'12',color:sc,outline:'none',fontFamily:"'DM Sans',sans-serif"}}>
                          {STATUSES.filter(function(s){ return s!=='All' }).map(function(opt){ return <option key={opt} value={opt}>{STATUS_ICO[opt]} {opt}</option> })}
                        </select>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',gap:'5px'}}>
                          <button onClick={function(){setView(e);if(!e.read)markRead(e._id)}} title="View"
                            style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(el){el.currentTarget.style.background='#6C3FC5';el.currentTarget.style.borderColor='#6C3FC5'}}
                            onMouseLeave={function(el){el.currentTarget.style.background='#FFF6EA';el.currentTarget.style.borderColor='rgba(232,118,26,.2)'}}>
                            <FaEye size={13} color="#7A4010"/>
                          </button>
                          <button onClick={function(){setDelId(e._id);setModal('delete')}} title="Delete"
                            style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(el){el.currentTarget.style.background='#dc2626'}}
                            onMouseLeave={function(el){el.currentTarget.style.background='rgba(254,242,242,.6)'}}>
                            <FaTrash size={13} color="#dc2626"/>
                          </button>
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
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'500px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#1C0A00',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
                <FaClipboardList size={16} color="#E8761A"/> Enquiry Detail
              </h2>
              <button onClick={function(){setView(null)}} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                { icon:<FaUser size={11}/>,        label:'Name',    val:view.name },
                { icon:<FaPhone size={11}/>,       label:'Phone',   val:view.phone },
                { icon:<FaEnvelope size={11}/>,    label:'Email',   val:view.email||'—' },
                { icon:<FaTags size={11}/>,        label:'Type',    val:view.type||'General' },
                { icon:<FaCalendarAlt size={11}/>, label:'Date',    val:fmtDate(view.createdAt) },
              ].map(function(row){
                return (
                  <div key={row.label} style={{display:'flex',gap:'12px',padding:'10px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                    <span style={{fontSize:'12px',fontWeight:'800',color:'#B87832',minWidth:'80px',display:'inline-flex',alignItems:'center',gap:'5px'}}>{row.icon} {row.label}</span>
                    <span style={{fontSize:'13px',color:'#1C0A00',fontWeight:'600',wordBreak:'break-word'}}>{row.val}</span>
                  </div>
                )
              })}
              {view.message && (
                <div style={{padding:'12px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                  <div style={{fontSize:'12px',fontWeight:'800',color:'#B87832',marginBottom:'6px',display:'inline-flex',alignItems:'center',gap:'5px'}}><FaComments size={11}/> Message</div>
                  <div style={{fontSize:'13px',color:'#1C0A00',lineHeight:'1.65'}}>{view.message}</div>
                </div>
              )}
              <div>
                <label style={{fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'1px',textTransform:'uppercase',display:'block',marginBottom:'6px'}}>Admin Notes</label>
                <textarea value={getNote(view._id)} onChange={function(e){setNote(view._id,e.target.value)}} rows={3} placeholder="Add follow-up notes..."
                  style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFFDF8',color:'#2C1500',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',outline:'none',boxSizing:'border-box',resize:'vertical'}}
                  onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                <select value={getStatus(view._id)} onChange={function(e){setStatus(view._id,e.target.value)}}
                  style={{flex:1,padding:'10px 12px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFFDF8',color:'#2C1500',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',outline:'none',cursor:'pointer'}}>
                  {STATUSES.filter(function(s){return s!=='All'}).map(function(st){return <option key={st} value={st}>{STATUS_ICO[st]} {st}</option>})}
                </select>
                <button onClick={function(){setView(null)}} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',padding:'10px 20px'}}>Save & Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget){setModal(null);setDelId(null)}}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <FaTrash size={44} color="#dc2626" style={{marginBottom:'12px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Enquiry?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This enquiry record will be permanently deleted.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={function(){setModal(null);setDelId(null)}} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 22px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 22px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}