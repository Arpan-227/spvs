import { useState, useEffect } from 'react'
import { jobAPI } from '../../api'

var DEPTS     = ['Science','Mathematics','English','Hindi','Social Science','Computer Science','Physical Education','Arts','Commerce','Administration','Support Staff']
var JOB_TYPES = ['Full Time','Part Time','Contract','Temporary']
var STATUSES  = ['Open','Closed']

var STATUS_CLR = { Open:'#22a35a', Closed:'#C45F0A', Draft:'#6C3FC5' }
var TYPE_CLR   = { 'Full Time':'#E8761A', 'Part Time':'#22a35a', Contract:'#6C3FC5', Temporary:'#C45F0A' }

var EMPTY = { title:'', dept:'Science', type:'Full Time', qual:'', exp:'', status:'Open', description:'', requirements:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function fmtDate(d){ return d ? new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—' }

export default function ManageJobsPage() {
  var [jobs,    setJobs]    = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)

  function fetchJobs() {
    setLoading(true)
    jobAPI.getAll()
      .then(function(res){ setJobs(res.data||[]); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }
  useEffect(fetchJobs, [])

  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = jobs.filter(function(j){
    var mf = filter==='All' || j.status===filter
    var ms = (j.title||'').toLowerCase().includes(search.toLowerCase()) || (j.dept||'').toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  var open  = jobs.filter(function(j){ return j.status==='Open' }).length
  var closed= jobs.filter(function(j){ return j.status==='Closed'}).length

  function openAdd()   { setCurrent(EMPTY); setModal('add') }
  function openEdit(j) { setCurrent({ title:j.title, dept:j.dept||'Science', type:j.type||'Full Time', qual:j.qual||'', exp:j.exp||'', status:j.status||'Open', description:j.description||'', requirements:j.requirements||'' }); setEditId(j._id); setModal('edit') }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  async function handleSave() {
    if (!current.title.trim()) return
    setSaving(true)
    try {
      if (modal==='add') {
        var res = await jobAPI.create(current)
        setJobs(function(p){ return [res.data,...p] })
        showToast('Job posted!')
      } else {
        var res2 = await jobAPI.update(editId, current)
        setJobs(function(p){ return p.map(function(x){ return x._id===editId?res2.data:x }) })
        showToast('Job updated!')
      }
      closeModal()
    } catch(err) {
      showToast(err.message,'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await jobAPI.delete(delId)
      setJobs(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Job deleted')
      closeModal()
    } catch(err) { showToast(err.message,'error') }
  }

  async function toggleStatus(j) {
    var next = j.status==='Open' ? 'Closed' : 'Open'
    try {
      var res = await jobAPI.update(j._id, { status: next })
      setJobs(function(p){ return p.map(function(x){ return x._id===j._id?res.data:x }) })
    } catch(err) { showToast(err.message,'error') }
  }

  return (
    <div style={{maxWidth:'1100px'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .mjp-stats  { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
        .mjp-tbl    { overflow-x:auto; }
        .mjp-filters{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .mjp-mgrid  { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .mjp-stats   { grid-template-columns:1fr 1fr; }
          .mjp-filters { flex-direction:column; align-items:stretch; }
          .mjp-mgrid   { grid-template-columns:1fr; }
        }
      `}</style>

      {toast && (
        <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease'}}>
          {toast.type==='error'?'❌ ':'✅ '}{toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>💼 Job Postings</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage vacancies and recruitment listings</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Post New Job</button>
      </div>

      {/* Stats */}
      <div className="mjp-stats">
        {[
          { label:'Total Jobs', value:loading?'...':jobs.length, icon:'💼', clr:'#E8761A' },
          { label:'Open',       value:loading?'...':open,        icon:'✅', clr:'#22a35a' },
          { label:'Closed',     value:loading?'...':closed,      icon:'🔒', clr:'#C45F0A' },
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

      {/* Filters */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="mjp-filters">
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search jobs..." style={{...s.inp,width:'100%',maxWidth:'210px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {['All','Open','Closed'].map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 13px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'12px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px'}}>
            <div style={{width:'40px',height:'40px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px'}}/>
            <div style={{color:'#B87832',fontSize:'14px'}}>Loading jobs...</div>
          </div>
        ) : (
          <div className="mjp-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Job Title','Department','Type','Posted','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && <tr><td colSpan={6} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No jobs found</td></tr>}
                {visible.map(function(j,i){
                  var sc=STATUS_CLR[j.status]||'#E8761A'
                  var tc=TYPE_CLR[j.type]||'#E8761A'
                  return (
                    <tr key={j._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'12px',fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{j.title}</td>
                      <td style={{padding:'12px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',whiteSpace:'nowrap'}}>{j.dept||'—'}</td>
                      <td style={{padding:'12px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:tc+'15',color:tc,whiteSpace:'nowrap'}}>{j.type}</span></td>
                      <td style={{padding:'12px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{fmtDate(j.createdAt)}</td>
                      <td style={{padding:'12px'}}>
                        <button onClick={function(){toggleStatus(j)}} style={{padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:sc+'12',color:sc,transition:'all .2s',whiteSpace:'nowrap'}}>
                          {j.status==='Open'?'✅ Open':'🔒 Closed'}
                        </button>
                      </td>
                      <td style={{padding:'12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(j)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                          <button onClick={function(){openDel(j._id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
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
      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'560px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Post New Job':'✏️ Edit Job'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Job Title *</label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="e.g. PGT Mathematics" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div className="mjp-mgrid">
                <div>
                  <label style={s.label}>Department</label>
                  <select name="dept" value={current.dept} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {DEPTS.map(function(d){ return <option key={d}>{d}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Job Type</label>
                  <select name="type" value={current.type} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {JOB_TYPES.map(function(t){ return <option key={t}>{t}</option> })}
                  </select>
                </div>
              </div>
              <div className="mjp-mgrid">
                <div>
                  <label style={s.label}>Qualification</label>
                  <input name="qual" value={current.qual} onChange={handleChange} placeholder="e.g. M.Sc., B.Ed" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Experience</label>
                  <input name="exp" value={current.exp} onChange={handleChange} placeholder="e.g. 2+ years" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div>
                <label style={s.label}>Status</label>
                <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                  {STATUSES.map(function(st){ return <option key={st}>{st}</option> })}
                </select>
              </div>
              <div>
                <label style={s.label}>Job Description</label>
                <textarea name="description" value={current.description} onChange={handleChange} rows={3} placeholder="Role responsibilities..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>Requirements / Qualifications</label>
                <textarea name="requirements" value={current.requirements} onChange={handleChange} rows={3} placeholder="Educational qualifications, experience..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1}}>
                {saving?'⏳ Saving...':modal==='add'?'+ Post Job':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'44px',marginBottom:'12px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Job Posting?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This job listing will be permanently removed.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 22px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 22px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}