import { useState, useEffect, useRef } from 'react'
import { tcAPI } from '../../api'

var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
var WDAYS  = ['Su','Mo','Tu','We','Th','Fr','Sa']

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'10px 13px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', outline:'none', boxSizing:'border-box' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700' },
}

function CBtn({ onClick, children }) {
  return (
    <button onClick={onClick}
      style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(255,255,255,.1)', border:'none', color:'#FFCF40', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
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

function AdminCalendarPicker({ labelText, placeholder, value, onChange }) {
  function parseVal(v) {
    if (!v) return null
    var p = v.split('-')
    if (p.length === 3 && p[0].length === 2) return new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0]))
    if (p.length === 3 && p[0].length === 4) return new Date(parseInt(p[0]), parseInt(p[1])-1, parseInt(p[2]))
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
      <div onClick={function(){ setOpen(function(o){ return !o }) }}
        style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', borderRadius:'14px', border:'1.5px solid '+(open?'#E8761A':'rgba(232,118,26,.22)'), background:'#FFFDF8', cursor:'pointer', transition:'border .2s,box-shadow .2s', boxShadow:open?'0 0 0 3px rgba(232,118,26,.12)':'none', userSelect:'none' }}>
        <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:'linear-gradient(135deg,#E8761A,#F5B800)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>📅</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'10px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'2px' }}>{labelText}</div>
          <div style={{ fontSize:'14px', fontWeight:parsed?'700':'400', color:parsed?'#1C0A00':'rgba(184,120,50,.55)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {parsed ? display : placeholder||'Select date'}
          </div>
        </div>
        <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition:'transform .25s', transform:open?'rotate(180deg)':'none', flexShrink:0 }}>
          <path d="M1 1l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 10px)', left:0, right:0, zIndex:9999, background:'#FFFFFF', borderRadius:'22px', boxShadow:'0 32px 80px rgba(28,10,0,.2)', border:'1.5px solid rgba(232,118,26,.15)', overflow:'hidden', animation:'calDrop .22s cubic-bezier(.34,1.56,.64,1)' }}>
          <div style={{ background:'linear-gradient(135deg,#1C0A00,#3D1A00)', padding:'13px 15px' }}>
            {view==='day' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <CBtn onClick={prevM}>‹</CBtn>
                <div style={{ display:'flex', gap:'7px' }}>
                  <CHdr onClick={function(){ setView('month') }}>{MONTHS[month].slice(0,3)}</CHdr>
                  <CHdr onClick={function(){ setView('year') }}>{year}</CHdr>
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
                  {WDAYS.map(function(w){ return <div key={w} style={{ textAlign:'center', fontSize:'9.5px', fontWeight:'900', color:'#B87832', padding:'3px 0' }}>{w}</div> })}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px' }}>
                  {cells.map(function(cell,i){
                    var sel=isSel(cell.n,cell.ghost); var tod=isToday(cell.n,cell.ghost)
                    return (
                      <button key={i} onClick={function(){ if(!cell.ghost) pickDay(cell.n) }}
                        style={{ height:'34px', borderRadius:'9px', border:tod&&!sel?'1.5px solid #E8761A':'none', background:sel?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent', color:cell.ghost?'rgba(180,120,50,.2)':sel?'#1C0A00':tod?'#E8761A':'#2C1500', fontSize:'12.5px', fontWeight:sel||tod?'800':'500', cursor:cell.ghost?'default':'pointer', fontFamily:"'DM Sans',sans-serif" }}
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
                  return <button key={m} onClick={function(){ setMonth(i); setView('day') }}
                    style={{ padding:'11px 4px', borderRadius:'11px', border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'), background:act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8', color:act?'#1C0A00':'#3D1A00', fontSize:'12.5px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}
                    onMouseEnter={function(e){ if(!act) e.currentTarget.style.background='#FFF3E0' }}
                    onMouseLeave={function(e){ if(!act) e.currentTarget.style.background='#FFFDF8' }}>{m.slice(0,3)}</button>
                })}
              </div>
            )}
            {view==='year' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'5px' }}>
                {yrGrid.map(function(y){
                  var act=y===year
                  return <button key={y} onClick={function(){ setYear(y); setView('month') }}
                    style={{ padding:'10px 2px', borderRadius:'11px', border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'), background:act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8', color:act?'#1C0A00':'#3D1A00', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}
                    onMouseEnter={function(e){ if(!act) e.currentTarget.style.background='#FFF3E0' }}
                    onMouseLeave={function(e){ if(!act) e.currentTarget.style.background='#FFFDF8' }}>{y}</button>
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

function emptyForm() {
  return { admissionNo:'', dob:'', status:'Draft' }
}

export default function ManageCertificatePage() {
  var [list,    setList]    = useState([])
  var [loading, setLoading] = useState(true)
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(emptyForm())
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)
  var [pdfFile, setPdfFile] = useState(null)
  var [saving,  setSaving]  = useState(false)
  var [saved,   setSaved]   = useState(false)
  var [error,   setError]   = useState('')
  var [search,  setSearch]  = useState('')
  var [filter,  setFilter]  = useState('All')

  useEffect(function() {
    tcAPI.getAll()
      .then(function(res){ setList(res.data||[]); setLoading(false) })
      .catch(function()  { setLoading(false) })
  }, [])

  var visible = list.filter(function(r) {
    var ms = filter==='All' || r.status===filter
    var mq = (r.admissionNo||'').toLowerCase().includes(search.toLowerCase())
    return ms && mq
  })

  function openAdd()   { setCurrent(emptyForm()); setPdfFile(null); setEditId(null); setModal('form'); setSaved(false); setError('') }
  function openEdit(r) { setCurrent({ admissionNo:r.admissionNo, dob:r.dob, status:r.status }); setPdfFile(null); setEditId(r._id); setModal('form'); setSaved(false); setError('') }
  function closeModal(){ setModal(null); setCurrent(emptyForm()); setPdfFile(null); setEditId(null); setSaved(false); setError('') }
  function setField(k,v){ setCurrent(function(p){ return {...p,[k]:v} }) }

  async function handleSave() {
    if (!current.admissionNo.trim()) { setError('Admission number is required'); return }
    if (!current.dob)                { setError('Date of birth is required'); return }
    if (!editId && !pdfFile)         { setError('Please upload the TC PDF file'); return }

    setSaving(true); setError('')
    try {
      var fd = new FormData()
      fd.append('admissionNo', current.admissionNo.trim().toUpperCase())
      fd.append('dob',         current.dob)
      fd.append('status',      current.status)
      if (pdfFile) fd.append('pdf', pdfFile)

      if (editId) {
        var res = await tcAPI.update(editId, fd)
        setList(function(p){ return p.map(function(r){ return r._id===editId?res.data:r }) })
      } else {
        var res2 = await tcAPI.create(fd)
        setList(function(p){ return [res2.data,...p] })
      }
      setSaved(true); setTimeout(closeModal, 1200)
    } catch(err) { setError(err.message||'Save failed') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await tcAPI.delete(delId)
      setList(function(p){ return p.filter(function(r){ return r._id!==delId }) })
      setModal(null); setDelId(null)
    } catch(err) { setError(err.message) }
  }

  async function toggleStatus(r) {
    var ns = r.status==='Published'?'Draft':'Published'
    try {
      var fd = new FormData()
      fd.append('admissionNo', r.admissionNo)
      fd.append('dob',         r.dob)
      fd.append('status',      ns)
      var res = await tcAPI.update(r._id, fd)
      setList(function(p){ return p.map(function(x){ return x._id===r._id?res.data:x }) })
    } catch(e){}
  }

  return (
    <div style={{maxWidth:'1100px',width:'100%',boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes calDrop { from{opacity:0;transform:translateY(-10px) scale(.97)} to{opacity:1;transform:none} }
        .mcp-stats  { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
        .mcp-search { max-width:100%; width:100%; box-sizing:border-box; }
        .mcp-filters{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .mcp-tbl    { overflow-x:auto; }
        .mcp-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:640px){
          .mcp-stats      { grid-template-columns:1fr 1fr; gap:8px; }
          .mcp-filters    { flex-direction:column; align-items:stretch; gap:8px; }
          .mcp-form-grid  { grid-template-columns:1fr; }
        }
      `}</style>

      {/* Header */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>📋 Transfer Certificates</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Upload TC PDFs — students verify & download instantly</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Upload TC</button>
      </div>

      {/* Stats */}
      <div className="mcp-stats">
        {[
          {label:'Total TCs', value:list.length, icon:'📋', clr:'#E8761A'},
          {label:'Published', value:list.filter(function(r){return r.status==='Published'}).length, icon:'✅', clr:'#22a35a'},
          {label:'Drafts',    value:list.filter(function(r){return r.status==='Draft'}).length,     icon:'📝', clr:'#6C3FC5'},
        ].map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px',padding:'16px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'11px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="mcp-filters">
          <input className="mcp-search" value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍 Search by admission no..."
            style={{...s.inp,maxWidth:'260px',padding:'9px 13px'}} />
          {['All','Published','Draft'].map(function(f){
            var isA=filter===f
            return <button key={f} onClick={function(){setFilter(f)}}
              style={{padding:'7px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap'}}>
              {f}
            </button>
          })}
        </div>
      </div>

      {/* Table */}
      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'40px'}}>
            <div style={{width:'36px',height:'36px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto'}} />
          </div>
        ) : (
          <div className="mcp-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'560px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Adm. No','Date of Birth','PDF','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && (
                  <tr><td colSpan={5} style={{padding:'40px',textAlign:'center',color:'#B87832',fontSize:'14px'}}>
                    No TCs found. Click <strong>+ Upload TC</strong> to add one.
                  </td></tr>
                )}
                {visible.map(function(r,i){
                  var rowBg=i%2===0?'#FFFFFF':'#FFFDF8'
                  return (
                    <tr key={r._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:rowBg,transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=rowBg}}>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#E8761A',fontSize:'13px'}}>{r.admissionNo}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#3D1A00'}}>{r.dob||'—'}</td>
                      <td style={{padding:'10px 12px'}}>
                        {r.pdfUrl
                          ? <a href={r.pdfUrl} target="_blank" rel="noreferrer"
                              style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'4px 10px',borderRadius:'7px',background:'rgba(232,118,26,.08)',color:'#E8761A',fontSize:'12px',fontWeight:'700',textDecoration:'none',border:'1px solid rgba(232,118,26,.2)'}}>
                              📄 View PDF
                            </a>
                          : <span style={{color:'#B87832',fontSize:'12px'}}>—</span>
                        }
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <button onClick={function(){toggleStatus(r)}}
                          style={{padding:'4px 11px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:r.status==='Published'?'rgba(34,163,90,.12)':'rgba(108,63,197,.12)',color:r.status==='Published'?'#22a35a':'#6C3FC5',whiteSpace:'nowrap'}}>
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

      {/* ADD/EDIT MODAL */}
      {modal==='form' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}}
          onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',width:'100%',maxWidth:'540px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.25)'}}>

            {/* Modal Header */}
            <div style={{background:'linear-gradient(135deg,#E8761A,#F5B800)',padding:'18px 24px',borderRadius:'18px 18px 0 0',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#1C0A00'}}>
                {editId?'✏️ Edit TC':'📋 Upload Transfer Certificate'}
              </div>
              <button onClick={closeModal} style={{background:'rgba(0,0,0,.15)',border:'none',borderRadius:'8px',width:'32px',height:'32px',cursor:'pointer',fontSize:'16px',color:'#1C0A00',fontWeight:'700'}}>✕</button>
            </div>

            <div style={{padding:'22px 24px',display:'flex',flexDirection:'column',gap:'18px'}}>
              {error && <div style={{padding:'10px 14px',borderRadius:'10px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',color:'#dc2626',fontSize:'13px',fontWeight:'600'}}>❌ {error}</div>}
              {saved  && <div style={{padding:'10px 14px',borderRadius:'10px',background:'rgba(34,163,90,.08)',border:'1px solid rgba(34,163,90,.2)',color:'#22a35a',fontSize:'13px',fontWeight:'600'}}>✅ Saved successfully!</div>}

              <div style={{padding:'12px 15px',borderRadius:'12px',background:'rgba(232,118,26,.05)',border:'1.5px solid rgba(232,118,26,.12)',fontSize:'12.5px',color:'#7A4010',lineHeight:'1.7'}}>
                ℹ️ Student verifies using <strong>Admission No</strong> + <strong>Date of Birth</strong>. Upload the actual TC PDF — student will download it directly.
              </div>

              {/* Form fields */}
              <div className="mcp-form-grid">
                {/* Admission No */}
                <div>
                  <label style={s.label}>Admission Number *</label>
                  <input value={current.admissionNo} onChange={function(e){setField('admissionNo',e.target.value)}}
                    placeholder="e.g. 8753" style={s.inp} />
                </div>

                {/* Status */}
                <div>
                  <label style={s.label}>Status</label>
                  <select value={current.status} onChange={function(e){setField('status',e.target.value)}} style={s.inp}>
                    <option value="Draft">📝 Draft</option>
                    <option value="Published">✅ Published</option>
                  </select>
                </div>
              </div>

              {/* DOB Calendar */}
              <div>
                <label style={s.label}>Date of Birth *</label>
                <AdminCalendarPicker
                  labelText="Date of Birth"
                  placeholder="Select student's date of birth"
                  value={current.dob||''}
                  onChange={function(v){ setField('dob',v) }}
                />
                {current.dob && <div style={{fontSize:'11px',color:'#22a35a',marginTop:'5px',fontWeight:'600'}}>✓ {current.dob}</div>}
              </div>

              {/* PDF Upload */}
              <div>
                <label style={s.label}>Transfer Certificate PDF {!editId && '*'}</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'14px',padding:'20px',background:'rgba(232,118,26,.02)',textAlign:'center'}}>
                  {pdfFile ? (
                    <div style={{display:'flex',alignItems:'center',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 16px',borderRadius:'10px',background:'rgba(34,163,90,.08)',border:'1.5px solid rgba(34,163,90,.2)'}}>
                        <span style={{fontSize:'22px'}}>📄</span>
                        <div style={{textAlign:'left'}}>
                          <div style={{fontSize:'12.5px',fontWeight:'700',color:'#166534',maxWidth:'180px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{pdfFile.name}</div>
                          <div style={{fontSize:'11px',color:'#22a35a'}}>{(pdfFile.size/1024/1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <button onClick={function(){setPdfFile(null)}}
                        style={{padding:'6px 14px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.2)',background:'rgba(254,242,242,.7)',color:'#dc2626',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}>
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{fontSize:'36px',marginBottom:'8px'}}>📤</div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#7A4010',marginBottom:'4px'}}>Upload TC PDF</div>
                      <div style={{fontSize:'11.5px',color:'#B87832',marginBottom:'14px'}}>Max 10MB • PDF only</div>
                      {editId && <div style={{fontSize:'11px',color:'#B87832',marginBottom:'10px'}}>Leave empty to keep existing PDF</div>}
                    </>
                  )}
                  {!pdfFile && (
                    <label style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 20px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.3)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',marginTop:pdfFile?'10px':'0'}}>
                      📁 {editId?'Replace PDF':'Choose PDF File'}
                      <input type="file" accept="application/pdf" style={{display:'none'}}
                        onChange={function(e){ var f=e.target.files&&e.target.files[0]; if(f) setPdfFile(f) }} />
                    </label>
                  )}
                </div>
              </div>

              {/* Publishing info */}
              <div style={{padding:'14px',borderRadius:'12px',background:'rgba(34,163,90,.05)',border:'1.5px solid rgba(34,163,90,.15)',fontSize:'12.5px',color:'#166534',lineHeight:'1.75'}}>
                <div style={{fontWeight:'800',marginBottom:'6px'}}>✅ Publishing Checklist</div>
                <div>• Admission Number is filled</div>
                <div>• Date of Birth is selected</div>
                <div>• TC PDF is uploaded</div>
                <div style={{marginTop:'6px',color:'#7A4010'}}>Set status to <strong>Published</strong> so students can verify & download.</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{padding:'16px 24px 20px',borderTop:'1px solid rgba(232,118,26,.1)',display:'flex',gap:'10px',justifyContent:'flex-end',flexWrap:'wrap',position:'sticky',bottom:0,background:'#FFFDF8',borderRadius:'0 0 20px 20px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving}
                style={{...s.btn,background:saving?'rgba(232,118,26,.4)':'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?0.7:1,padding:'10px 28px'}}>
                {saving?'⏳ Saving...':editId?'💾 Save Changes':'📤 Upload TC'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}
          onClick={function(e){if(e.target===e.currentTarget){setModal(null);setDelId(null)}}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',padding:'30px',width:'100%',maxWidth:'380px',textAlign:'center',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete TC?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This Transfer Certificate will be <strong>permanently deleted</strong>.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={function(){setModal(null);setDelId(null)}} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 24px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 24px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}