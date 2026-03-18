import { useState, useEffect, useRef } from 'react'
import { tcAPI } from '../../api'

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'10px 13px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', outline:'none', boxSizing:'border-box' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700' },
}

var CLASSES = ['Play Group','Nursery','LKG','UKG','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII']
var MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December']
var WDAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa']

/* ── helper buttons (identical to certificate.jsx) ── */
function CBtn({ onClick, children }) {
  return (
    <button onClick={onClick}
      style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(255,255,255,.1)', border:'none', color:'#FFCF40', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}
      onMouseEnter={function(e){ e.currentTarget.style.background='rgba(232,118,26,.3)' }}
      onMouseLeave={function(e){ e.currentTarget.style.background='rgba(255,255,255,.1)' }}>
      {children}
    </button>
  )
}
function CHdr({ onClick, children }) {
  return (
    <button onClick={onClick}
      style={{ padding:'4px 11px', borderRadius:'7px', background:'rgba(232,118,26,.18)', border:'1px solid rgba(232,118,26,.3)', color:'#FFCF40', fontSize:'12px', fontWeight:'800', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}
      onMouseEnter={function(e){ e.currentTarget.style.background='rgba(232,118,26,.32)' }}
      onMouseLeave={function(e){ e.currentTarget.style.background='rgba(232,118,26,.18)' }}>
      {children}
    </button>
  )
}

/* ══════════════════════════════════════════
   ADMIN CALENDAR PICKER
   • Identical design to certificate.jsx
   • Stores as DD-MM-YYYY
   • labelText: shown as the upper label
   • placeholder: shown when empty
══════════════════════════════════════════ */
function AdminCalendarPicker({ labelText, placeholder, value, onChange }) {
  /* parse DD-MM-YYYY */
  function parseVal(v) {
    if (!v) return null
    var p = v.split('-')
    if (p.length === 3 && p[0].length === 2) {
      return new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0]))
    }
    if (p.length === 3 && p[0].length === 4) {
      return new Date(parseInt(p[0]), parseInt(p[1])-1, parseInt(p[2]))
    }
    return null
  }

  var parsed  = parseVal(value)
  var today   = new Date()
  var [open,   setOpen]   = useState(false)
  var [view,   setView]   = useState('day')
  var [month,  setMonth]  = useState(parsed ? parsed.getMonth()    : today.getMonth())
  var [year,   setYear]   = useState(parsed ? parsed.getFullYear() : today.getFullYear())
  var [yrBase, setYrBase] = useState(Math.floor((parsed ? parsed.getFullYear() : today.getFullYear()) / 12) * 12)
  var ref = useRef()

  useEffect(function() {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return function() { document.removeEventListener('mousedown', h) }
  }, [])

  var firstDay  = new Date(year, month, 1).getDay()
  var daysInMon = new Date(year, month+1, 0).getDate()
  var prevDays  = new Date(year, month, 0).getDate()
  var cells = []
  for (var i = 0; i < firstDay; i++) cells.push({ n: prevDays-firstDay+1+i, ghost:true })
  for (var d = 1; d <= daysInMon; d++) cells.push({ n:d, ghost:false })
  var rem = 42 - cells.length
  for (var k = 1; k <= rem; k++) cells.push({ n:k, ghost:true })

  function pickDay(n) {
    var mm = String(month+1).padStart(2,'0')
    var dd = String(n).padStart(2,'0')
    onChange(dd+'-'+mm+'-'+year)
    setOpen(false); setView('day')
  }

  function prevM() { if(month===0){setMonth(11);setYear(function(y){return y-1})}else setMonth(function(m){return m-1}) }
  function nextM() { if(month===11){setMonth(0);setYear(function(y){return y+1})}else setMonth(function(m){return m+1}) }

  var isSel   = function(n,g){ return !g && parsed && parsed.getFullYear()===year && parsed.getMonth()===month && parsed.getDate()===n }
  var isToday = function(n,g){ return !g && today.getFullYear()===year && today.getMonth()===month && today.getDate()===n }

  var display = parsed ? parsed.toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'}) : ''
  var yrGrid  = Array.from({length:12}, function(_,i){ return yrBase+i })

  return (
    <div ref={ref} style={{ position:'relative', width:'100%' }}>
      {/* ── Trigger — identical to certificate.jsx ── */}
      <div onClick={function(){ setOpen(function(o){ return !o }) }}
        style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', borderRadius:'14px', border:'1.5px solid '+(open?'#E8761A':'rgba(232,118,26,.22)'), background:'#FFFDF8', cursor:'pointer', transition:'border .2s,box-shadow .2s', boxShadow:open?'0 0 0 3px rgba(232,118,26,.12)':'none', userSelect:'none' }}>
        <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:'linear-gradient(135deg,#E8761A,#F5B800)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>📅</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'10px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'2px' }}>{labelText}</div>
          <div style={{ fontSize:'14px', fontWeight:parsed?'700':'400', color:parsed?'#1C0A00':'rgba(184,120,50,.55)' }}>
            {parsed ? display : placeholder||'Select date'}
          </div>
        </div>
        <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition:'transform .25s', transform:open?'rotate(180deg)':'none', flexShrink:0 }}>
          <path d="M1 1l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* ── Dropdown — identical to certificate.jsx ── */}
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 10px)', left:0, right:0, zIndex:9999, background:'#FFFFFF', borderRadius:'22px', boxShadow:'0 32px 80px rgba(28,10,0,.2)', border:'1.5px solid rgba(232,118,26,.15)', overflow:'hidden', animation:'calDrop .22s cubic-bezier(.34,1.56,.64,1)' }}>

          {/* Header */}
          <div style={{ background:'linear-gradient(135deg,#1C0A00,#3D1A00)', padding:'13px 15px' }}>
            {view==='day' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <CBtn onClick={prevM}>‹</CBtn>
                <div style={{ display:'flex', gap:'7px' }}>
                  <CHdr onClick={function(){ setView('month') }}>{MONTHS[month].slice(0,3)}</CHdr>
                  <CHdr onClick={function(){ setView('year')  }}>{year}</CHdr>
                </div>
                <CBtn onClick={nextM}>›</CBtn>
              </div>
            )}
            {view==='month' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'14px', fontWeight:'700', color:'#FFCF40' }}>Choose Month</span>
                <CHdr onClick={function(){ setView('day') }}>← Back</CHdr>
              </div>
            )}
            {view==='year' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <CBtn onClick={function(){ setYrBase(function(b){ return b-12 }) }}>‹</CBtn>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'13px', fontWeight:'700', color:'#FFCF40' }}>{yrBase} – {yrBase+11}</span>
                <CBtn onClick={function(){ setYrBase(function(b){ return b+12 }) }}>›</CBtn>
              </div>
            )}
          </div>

          <div style={{ padding:'12px 13px' }}>
            {view==='day' && (
              <>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:'4px' }}>
                  {WDAYS.map(function(w){ return <div key={w} style={{ textAlign:'center', fontSize:'9.5px', fontWeight:'900', color:'#B87832', padding:'3px 0', letterSpacing:'.5px' }}>{w}</div> })}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px' }}>
                  {cells.map(function(cell,i){
                    var sel=isSel(cell.n,cell.ghost); var tod=isToday(cell.n,cell.ghost)
                    return (
                      <button key={i} onClick={function(){ if(!cell.ghost) pickDay(cell.n) }}
                        style={{ height:'34px', borderRadius:'9px', border:tod&&!sel?'1.5px solid #E8761A':'none', background:sel?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent', color:cell.ghost?'rgba(180,120,50,.2)':sel?'#1C0A00':tod?'#E8761A':'#2C1500', fontSize:'12.5px', fontWeight:sel||tod?'800':'500', cursor:cell.ghost?'default':'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .15s' }}
                        onMouseEnter={function(e){ if(!cell.ghost&&!sel) e.currentTarget.style.background='rgba(232,118,26,.1)' }}
                        onMouseLeave={function(e){ if(!cell.ghost&&!sel) e.currentTarget.style.background='transparent' }}>
                        {cell.n}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
            {view==='month' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px' }}>
                {MONTHS.map(function(m,i){
                  var act=i===month
                  return (
                    <button key={m} onClick={function(){ setMonth(i); setView('day') }}
                      style={{ padding:'11px 4px', borderRadius:'11px', border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'), background:act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8', color:act?'#1C0A00':'#3D1A00', fontSize:'12.5px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}
                      onMouseEnter={function(e){ if(!act) e.currentTarget.style.background='#FFF3E0' }}
                      onMouseLeave={function(e){ if(!act) e.currentTarget.style.background='#FFFDF8' }}>
                      {m.slice(0,3)}
                    </button>
                  )
                })}
              </div>
            )}
            {view==='year' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'5px' }}>
                {yrGrid.map(function(y){
                  var act=y===year
                  return (
                    <button key={y} onClick={function(){ setYear(y); setView('month') }}
                      style={{ padding:'10px 2px', borderRadius:'11px', border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'), background:act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8', color:act?'#1C0A00':'#3D1A00', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}
                      onMouseEnter={function(e){ if(!act) e.currentTarget.style.background='#FFF3E0' }}
                      onMouseLeave={function(e){ if(!act) e.currentTarget.style.background='#FFFDF8' }}>
                      {y}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div style={{ padding:'8px 14px 11px', borderTop:'1px solid rgba(232,118,26,.08)', textAlign:'center', fontSize:'10.5px', color:'#B87832', fontWeight:'600' }}>
            Year → Month → Date
          </div>
        </div>
      )}
    </div>
  )
}

function emptyTC() {
  return {
    admissionNo:'', penNo:'', studentName:'', motherName:'', fatherName:'',
    nationality:'INDIAN', category:'N/A', dob:'', dobInWords:'',
    dateOfFirstAdmission:'', admissionClass:'', lastStudiedClass:'',
    examResult:'', subjectsOffered:'', qualifiedForPromotion:'',
    duesPaid:'YES', dateOfRemoval:'', dateOfApplication:'', dateOfIssue:'',
    reasonForLeaving:'', generalConduct:'GOOD', remarks:'N/A', status:'Draft',
  }
}

function tabStyle(activeTab, t) {
  var isA = activeTab === t
  return { padding:'8px 16px', borderRadius:'8px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:isA?'800':'600', background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent', color:isA?'#fff':'#B87832', transition:'all .18s', whiteSpace:'nowrap' }
}

export default function ManageCertificatePage() {
  var [list,      setList]      = useState([])
  var [loading,   setLoading]   = useState(true)
  var [modal,     setModal]     = useState(null)
  var [current,   setCurrent]   = useState(emptyTC())
  var [editId,    setEditId]    = useState(null)
  var [delId,     setDelId]     = useState(null)
  var [saving,    setSaving]    = useState(false)
  var [saved,     setSaved]     = useState(false)
  var [error,     setError]     = useState('')
  var [search,    setSearch]    = useState('')
  var [filter,    setFilter]    = useState('All')
  var [activeTab, setActiveTab] = useState('info')

  useEffect(function() {
    tcAPI.getAll()
      .then(function(res){ setList(res.data||[]); setLoading(false) })
      .catch(function()  { setLoading(false) })
  }, [])

  var visible = list.filter(function(r) {
    var ms = filter==='All' || r.status===filter
    var mq = (r.studentName||'').toLowerCase().includes(search.toLowerCase()) ||
             (r.admissionNo||'').toLowerCase().includes(search.toLowerCase())
    return ms && mq
  })

  function openAdd()   { setCurrent(emptyTC()); setEditId(null); setModal('form'); setActiveTab('info'); setSaved(false); setError('') }
  function openEdit(r) { setCurrent({...r}); setEditId(r._id); setModal('form'); setActiveTab('info'); setSaved(false); setError('') }
  function closeModal(){ setModal(null); setCurrent(emptyTC()); setEditId(null); setSaved(false); setError('') }

  function handle(e) { var k=e.target.name,v=e.target.value; setCurrent(function(p){ return {...p,[k]:v} }) }
  function setField(k,v){ setCurrent(function(p){ return {...p,[k]:v} }) }

  async function handleSave() {
    if(!current.admissionNo.trim()||!current.studentName.trim()){
      setError('Admission number and student name are required'); setActiveTab('info'); return
    }
    setSaving(true); setError('')
    try {
      if(editId){
        var res=await tcAPI.update(editId,current)
        setList(function(p){ return p.map(function(r){ return r._id===editId?res.data:r }) })
      } else {
        var res2=await tcAPI.create(current)
        setList(function(p){ return [res2.data,...p] })
      }
      setSaved(true); setTimeout(closeModal,1200)
    } catch(err){ setError(err.message||'Save failed') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await tcAPI.delete(delId)
      setList(function(p){ return p.filter(function(r){ return r._id!==delId }) })
      setModal(null); setDelId(null)
    } catch(err){ setError(err.message) }
  }

  async function toggleStatus(r) {
    var ns=r.status==='Published'?'Draft':'Published'
    try {
      var res=await tcAPI.update(r._id,{...r,status:ns})
      setList(function(p){ return p.map(function(x){ return x._id===r._id?res.data:x }) })
    } catch(e){}
  }

  return (
    <div style={{maxWidth:'1100px'}}>
      <style>{`
        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes calDrop { from{opacity:0;transform:translateY(-10px) scale(.97)} to{opacity:1;transform:none} }
      `}</style>

      {/* ── Header ── */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>📋 Transfer Certificates</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage student Transfer Certificates — admin fills details, students download PDF</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add TC</button>
      </div>

      {/* ── Stats ── */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px',marginBottom:'20px'}}>
        {[
          {label:'Total TCs',value:list.length,icon:'📋',clr:'#E8761A'},
          {label:'Published',value:list.filter(function(r){return r.status==='Published'}).length,icon:'✅',clr:'#22a35a'},
          {label:'Drafts',   value:list.filter(function(r){return r.status==='Draft'}).length,   icon:'📝',clr:'#6C3FC5'},
        ].map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'11px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Search + Filter ── */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 18px'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍 Search by name or admission no..."
            style={{...s.inp,width:'260px',padding:'9px 13px'}} />
          {['All','Published','Draft'].map(function(f){
            var isA=filter===f
            return <button key={f} onClick={function(){setFilter(f)}}
              style={{padding:'7px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>
              {f}
            </button>
          })}
        </div>
      </div>

      {/* ── Table ── */}
      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'40px'}}>
            <div style={{width:'36px',height:'36px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto'}} />
          </div>
        ) : (
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Adm. No','PEN No','Student Name','Last Class','Date of Issue','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && (
                  <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#B87832',fontSize:'14px'}}>
                    No Transfer Certificates found. Click <strong>+ Add TC</strong> to create one.
                  </td></tr>
                )}
                {visible.map(function(r,i){
                  var rowBg=i%2===0?'#FFFFFF':'#FFFDF8'
                  return (
                    <tr key={r._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:rowBg,transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=rowBg}}>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#E8761A',fontSize:'13px'}}>{r.admissionNo}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#7A4010'}}>{r.penNo||'—'}</td>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#1C0A00',fontSize:'13px'}}>{r.studentName}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#3D1A00'}}>{r.lastStudiedClass||'—'}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#7A4010'}}>{r.dateOfIssue||'—'}</td>
                      <td style={{padding:'10px 12px'}}>
                        <button onClick={function(){toggleStatus(r)}}
                          style={{padding:'4px 11px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:r.status==='Published'?'rgba(34,163,90,.12)':'rgba(108,63,197,.12)',color:r.status==='Published'?'#22a35a':'#6C3FC5'}}>
                          {r.status==='Published'?'✅ Published':'📝 Draft'}
                        </button>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(r)}}
                            style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}}
                            onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                          <button onClick={function(){setDelId(r._id);setModal('delete')}}
                            style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}}
                            onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
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

      {/* ══ ADD/EDIT MODAL ══ */}
      {modal==='form' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}}
          onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',width:'100%',maxWidth:'860px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.25)'}}>

            {/* Modal Header */}
            <div style={{background:'linear-gradient(135deg,#E8761A,#F5B800)',padding:'18px 24px',borderRadius:'18px 18px 0 0',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#1C0A00'}}>
                {editId?'✏️ Edit Transfer Certificate':'📋 Add Transfer Certificate'}
              </div>
              <button onClick={closeModal} style={{background:'rgba(0,0,0,.15)',border:'none',borderRadius:'8px',width:'32px',height:'32px',cursor:'pointer',fontSize:'16px',color:'#1C0A00',fontWeight:'700'}}>✕</button>
            </div>

            <div style={{padding:'22px 24px'}}>
              {error && <div style={{marginBottom:'14px',padding:'10px 14px',borderRadius:'10px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',color:'#dc2626',fontSize:'13px',fontWeight:'600'}}>❌ {error}</div>}
              {saved  && <div style={{marginBottom:'14px',padding:'10px 14px',borderRadius:'10px',background:'rgba(34,163,90,.08)',border:'1px solid rgba(34,163,90,.2)',color:'#22a35a',fontSize:'13px',fontWeight:'600'}}>✅ Saved successfully!</div>}

              <div style={{marginBottom:'18px',padding:'12px 15px',borderRadius:'12px',background:'rgba(232,118,26,.05)',border:'1.5px solid rgba(232,118,26,.12)',fontSize:'12.5px',color:'#7A4010',lineHeight:'1.7'}}>
                ℹ️ Fill all details <strong>exactly</strong> as per school records. Students verify using <strong>Admission Number</strong> + <strong>Date of Birth (DD-MM-YYYY)</strong>.
              </div>

              {/* Tabs */}
              <div style={{display:'flex',gap:'4px',background:'#fff',padding:'4px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.12)',width:'fit-content',marginBottom:'20px',flexWrap:'wrap'}}>
                {[['info','👤 Student Info'],['dob','📅 DOB & Admission'],['academic','🎓 Academic'],['dates','📆 Dates'],['status','⚙️ Status']].map(function(t){
                  return <button key={t[0]} onClick={function(){setActiveTab(t[0])}} style={tabStyle(activeTab,t[0])}>{t[1]}</button>
                })}
              </div>

              {/* ── TAB: STUDENT INFO ── */}
              {activeTab==='info' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  {[
                    {label:'Admission Number *',name:'admissionNo',placeholder:'e.g. 8753',full:false},
                    {label:'PEN Number',         name:'penNo',      placeholder:'e.g. 21123385877',full:false},
                    {label:'Student Name *',     name:'studentName',placeholder:'Full name in CAPITALS',full:true},
                    {label:"Mother's Name",      name:'motherName', placeholder:"Mother's full name",full:false},
                    {label:"Father's Name",      name:'fatherName', placeholder:"Father's full name",full:false},
                    {label:'Nationality',        name:'nationality',placeholder:'e.g. INDIAN',full:false},
                    {label:'SC/ST/OBC Category', name:'category',   placeholder:'e.g. N/A or OBC',full:false},
                  ].map(function(f){
                    return (
                      <div key={f.name} style={{gridColumn:f.full?'1/-1':'auto'}}>
                        <label style={s.label}>{f.label}</label>
                        <input name={f.name} value={current[f.name]||''} onChange={handle} placeholder={f.placeholder} style={s.inp} />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* ── TAB: DOB & ADMISSION ── */}
              {activeTab==='dob' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>

                  {/* Date of Birth — calendar */}
                  <div>
                    <label style={s.label}>Date of Birth *</label>
                    <AdminCalendarPicker
                      labelText="Date of Birth"
                      placeholder="Select date of birth"
                      value={current.dob||''}
                      onChange={function(v){ setField('dob',v) }}
                    />
                    {current.dob && <div style={{fontSize:'11px',color:'#22a35a',marginTop:'5px',fontWeight:'600'}}>✓ {current.dob}</div>}
                  </div>

                  {/* Date of First Admission — calendar */}
                  <div>
                    <label style={s.label}>Date of First Admission</label>
                    <AdminCalendarPicker
                      labelText="Date of First Admission"
                      placeholder="Select admission date"
                      value={current.dateOfFirstAdmission||''}
                      onChange={function(v){ setField('dateOfFirstAdmission',v) }}
                    />
                    {current.dateOfFirstAdmission && <div style={{fontSize:'11px',color:'#22a35a',marginTop:'5px',fontWeight:'600'}}>✓ {current.dateOfFirstAdmission}</div>}
                  </div>

                  {/* Class at First Admission — dropdown */}
                  <div>
                    <label style={s.label}>Class at First Admission</label>
                    <select name="admissionClass" value={current.admissionClass||''} onChange={handle} style={s.inp}>
                      <option value="">Select class...</option>
                      {CLASSES.map(function(c){ return <option key={c} value={c}>{c}</option> })}
                    </select>
                  </div>

                  {/* Last Studied Class — dropdown */}
                  <div>
                    <label style={s.label}>Last Studied Class</label>
                    <select name="lastStudiedClass" value={current.lastStudiedClass||''} onChange={handle} style={s.inp}>
                      <option value="">Select class...</option>
                      {CLASSES.map(function(c){ return <option key={c} value={c}>{c}</option> })}
                    </select>
                  </div>

                  {/* DOB in Words */}
                  <div style={{gridColumn:'1/-1'}}>
                    <label style={s.label}>DOB in Words</label>
                    <input name="dobInWords" value={current.dobInWords||''} onChange={handle}
                      placeholder="e.g. TENTH SEPTEMBER TWO THOUSAND EIGHT" style={s.inp} />
                  </div>
                </div>
              )}

              {/* ── TAB: ACADEMIC ── */}
              {activeTab==='academic' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  <div>
                    <label style={s.label}>Exam Result</label>
                    <input name="examResult" value={current.examResult||''} onChange={handle} placeholder="e.g. PASS/CBSE (2024-25)" style={s.inp} />
                  </div>

                  {/* Qualified for Promotion — dropdown */}
                  <div>
                    <label style={s.label}>Qualified for Promotion</label>
                    <select name="qualifiedForPromotion" value={current.qualifiedForPromotion||''} onChange={handle} style={s.inp}>
                      <option value="">Select...</option>
                      {CLASSES.map(function(c){ return <option key={c} value={'YES ('+c+')'}>YES ({c})</option> })}
                      <option value="NO">NO</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </div>

                  {/* Dues Paid — dropdown */}
                  <div>
                    <label style={s.label}>Dues Paid</label>
                    <select name="duesPaid" value={current.duesPaid||'YES'} onChange={handle} style={s.inp}>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>

                  {/* General Conduct — dropdown */}
                  <div>
                    <label style={s.label}>General Conduct</label>
                    <select name="generalConduct" value={current.generalConduct||'GOOD'} onChange={handle} style={s.inp}>
                      <option value="EXCELLENT">EXCELLENT</option>
                      <option value="GOOD">GOOD</option>
                      <option value="SATISFACTORY">SATISFACTORY</option>
                      <option value="POOR">POOR</option>
                    </select>
                  </div>

                  <div>
                    <label style={s.label}>Reason for Leaving</label>
                    <input name="reasonForLeaving" value={current.reasonForLeaving||''} onChange={handle} placeholder="e.g. GUARDIAN WISH" style={s.inp} />
                  </div>

                  <div>
                    <label style={s.label}>Any Other Remarks</label>
                    <input name="remarks" value={current.remarks||''} onChange={handle} placeholder="e.g. N/A" style={s.inp} />
                  </div>

                  <div style={{gridColumn:'1/-1'}}>
                    <label style={s.label}>Subjects Offered</label>
                    <textarea name="subjectsOffered" value={current.subjectsOffered||''} onChange={handle}
                      placeholder="e.g. HINDI ENGLISH MATHEMATICS SCIENCE SOCIAL SCIENCE" rows={3}
                      style={{...s.inp,resize:'vertical',lineHeight:'1.6'}} />
                  </div>
                </div>
              )}

              {/* ── TAB: DATES — all calendar pickers ── */}
              {activeTab==='dates' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  <div>
                    <label style={s.label}>Date of Removal</label>
                    <AdminCalendarPicker labelText="Date of Removal" placeholder="Select date" value={current.dateOfRemoval||''} onChange={function(v){setField('dateOfRemoval',v)}} />
                    {current.dateOfRemoval && <div style={{fontSize:'11px',color:'#22a35a',marginTop:'5px',fontWeight:'600'}}>✓ {current.dateOfRemoval}</div>}
                  </div>
                  <div>
                    <label style={s.label}>Date of Application</label>
                    <AdminCalendarPicker labelText="Date of Application" placeholder="Select date" value={current.dateOfApplication||''} onChange={function(v){setField('dateOfApplication',v)}} />
                    {current.dateOfApplication && <div style={{fontSize:'11px',color:'#22a35a',marginTop:'5px',fontWeight:'600'}}>✓ {current.dateOfApplication}</div>}
                  </div>
                  <div>
                    <label style={s.label}>Date of Issue of Certificate</label>
                    <AdminCalendarPicker labelText="Date of Issue" placeholder="Select date" value={current.dateOfIssue||''} onChange={function(v){setField('dateOfIssue',v)}} />
                    {current.dateOfIssue && <div style={{fontSize:'11px',color:'#22a35a',marginTop:'5px',fontWeight:'600'}}>✓ {current.dateOfIssue}</div>}
                  </div>
                </div>
              )}

              {/* ── TAB: STATUS ── */}
              {activeTab==='status' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  <div style={{gridColumn:'1/-1'}}>
                    <div style={{padding:'16px',borderRadius:'12px',background:'rgba(34,163,90,.05)',border:'1.5px solid rgba(34,163,90,.15)',fontSize:'13px',color:'#166534',lineHeight:'1.8'}}>
                      <div style={{fontWeight:'800',marginBottom:'6px'}}>✅ Publishing Checklist</div>
                      <div>• Admission Number is filled</div>
                      <div>• Student Name is filled</div>
                      <div>• Date of Birth is selected (DD-MM-YYYY)</div>
                      <div>• Date of Issue is selected</div>
                      <div style={{marginTop:'8px',color:'#7A4010'}}>When Published, students can verify using Admission No + DOB on the Certificate page.</div>
                    </div>
                  </div>
                  <div>
                    <label style={s.label}>Publication Status</label>
                    <select name="status" value={current.status} onChange={handle} style={s.inp}>
                      <option value="Draft">📝 Draft — Not visible to students</option>
                      <option value="Published">✅ Published — Students can verify & download</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{padding:'16px 24px 20px',borderTop:'1px solid rgba(232,118,26,.1)',display:'flex',gap:'10px',justifyContent:'flex-end',position:'sticky',bottom:0,background:'#FFFDF8',borderRadius:'0 0 20px 20px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving}
                style={{...s.btn,background:saving?'rgba(232,118,26,.4)':'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?0.7:1,padding:'10px 28px'}}>
                {saving?'⏳ Saving...':editId?'💾 Save Changes':'+ Add TC'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE MODAL ══ */}
      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}
          onClick={function(e){if(e.target===e.currentTarget){setModal(null);setDelId(null)}}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',padding:'30px',width:'100%',maxWidth:'380px',textAlign:'center',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete TC?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This Transfer Certificate will be <strong>permanently deleted</strong>.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={function(){setModal(null);setDelId(null)}} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 24px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 24px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}