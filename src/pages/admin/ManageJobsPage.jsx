import { useState } from 'react'

var DEPTS    = ['All','Science','Mathematics','English','Hindi','Social Science','Computer Science','Physical Education','Arts','Commerce','Administration','Support Staff']
var JOB_TYPES= ['Full Time','Part Time','Contract','Temporary']
var STATUSES = ['Open','Closed','Draft']

var INIT = [
  { id:1, title:'PGT Mathematics',           dept:'Mathematics',       type:'Full Time', posted:'1 Feb 2026',  deadline:'28 Feb 2026', status:'Open',   applicants:14 },
  { id:2, title:'TGT English',               dept:'English',           type:'Full Time', posted:'1 Feb 2026',  deadline:'28 Feb 2026', status:'Open',   applicants:22 },
  { id:3, title:'PGT Physics',               dept:'Science',           type:'Full Time', posted:'15 Jan 2026', deadline:'15 Feb 2026', status:'Closed', applicants:31 },
  { id:4, title:'PRT General (Class I–V)',   dept:'Administration',    type:'Full Time', posted:'10 Jan 2026', deadline:'10 Feb 2026', status:'Closed', applicants:45 },
  { id:5, title:'Computer Lab Assistant',    dept:'Computer Science',  type:'Full Time', posted:'5 Mar 2026',  deadline:'31 Mar 2026', status:'Open',   applicants:7  },
  { id:6, title:'Sports Coach (Cricket)',    dept:'Physical Education', type:'Contract',  posted:'1 Mar 2026',  deadline:'20 Mar 2026', status:'Open',   applicants:3  },
  { id:7, title:'Accountant',               dept:'Administration',    type:'Full Time', posted:'20 Feb 2026', deadline:'20 Mar 2026', status:'Draft',  applicants:0  },
  { id:8, title:'Hindi Teacher (TGT)',       dept:'Hindi',             type:'Full Time', posted:'',            deadline:'',            status:'Draft',  applicants:0  },
]

var EMPTY = { title:'', dept:'Science', type:'Full Time', posted:'', deadline:'', status:'Open', applicants:0, description:'', requirements:'' }

var STATUS_CLR = { Open:'#22a35a', Closed:'#C45F0A', Draft:'#6C3FC5' }
var TYPE_CLR   = { 'Full Time':'#E8761A', 'Part Time':'#22a35a', Contract:'#6C3FC5', Temporary:'#C45F0A' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageJobsPage() {
  var [jobs, setJobs]       = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = jobs.filter(function(j){
    var mf = filter==='All' || j.status===filter || j.dept===filter
    var ms = j.title.toLowerCase().includes(search.toLowerCase()) || j.dept.toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  var open   = jobs.filter(function(j){ return j.status==='Open' }).length
  var closed = jobs.filter(function(j){ return j.status==='Closed' }).length
  var draft  = jobs.filter(function(j){ return j.status==='Draft' }).length
  var totalApp = jobs.reduce(function(a,j){ return a+j.applicants },0)

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(j)  { setCurrent({...j}); setEditId(j.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.title.trim()) return
    if(modal==='add'){
      var today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})
      setJobs(function(p){ return [{...current,id:Date.now(),applicants:0,posted:current.posted||today},...p] })
    } else {
      setJobs(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId,applicants:x.applicants}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setJobs(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }

  function cycleStatus(id){
    setJobs(function(p){ return p.map(function(x){
      if(x.id!==id) return x
      var next = x.status==='Open'?'Closed':x.status==='Closed'?'Draft':'Open'
      return {...x, status:next}
    })})
  }

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>💼 Job Postings</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage vacancies and recruitment listings</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Post New Job</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[{label:'Open',value:open,icon:'✅',clr:'#22a35a'},{label:'Closed',value:closed,icon:'🔒',clr:'#C45F0A'},{label:'Drafts',value:draft,icon:'📝',clr:'#6C3FC5'},{label:'Applications',value:totalApp,icon:'📋',clr:'#E8761A'}].map(function(st){
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

      <div style={{...s.card,marginBottom:'16px',padding:'16px 20px'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search jobs..." style={{...s.inp,width:'210px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {['All','Open','Closed','Draft'].map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 13px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'12px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['Job Title','Department','Type','Posted','Deadline','Applicants','Status','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length===0 && <tr><td colSpan={8} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No jobs found</td></tr>}
              {visible.map(function(j,i){
                var sc = STATUS_CLR[j.status]||'#E8761A'
                var tc = TYPE_CLR[j.type]||'#E8761A'
                return (
                  <tr key={j.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{j.title}</div>
                    </td>
                    <td style={{padding:'12px 14px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',whiteSpace:'nowrap'}}>{j.dept}</td>
                    <td style={{padding:'12px 14px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:tc+'15',color:tc,whiteSpace:'nowrap'}}>{j.type}</span></td>
                    <td style={{padding:'12px 14px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{j.posted||'—'}</td>
                    <td style={{padding:'12px 14px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{j.deadline||'—'}</td>
                    <td style={{padding:'12px 14px'}}>
                      <span style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'#1C0A00'}}>{j.applicants}</span>
                      <span style={{fontSize:'11px',color:'#B87832',marginLeft:'3px'}}>applied</span>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <button onClick={function(){cycleStatus(j.id)}} style={{padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:sc+'12',color:sc,transition:'all .2s',whiteSpace:'nowrap'}}>
                        {j.status==='Open'?'✅ Open':j.status==='Closed'?'🔒 Closed':'📝 Draft'}
                      </button>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button onClick={function(){openEdit(j)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                        <button onClick={function(){openDel(j.id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'30px',width:'100%',maxWidth:'560px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Post New Job':'✏️ Edit Job'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Job Title *</label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="e.g. PGT Mathematics" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Department</label>
                  <select name="dept" value={current.dept} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {DEPTS.filter(function(d){ return d!=='All' }).map(function(d){ return <option key={d}>{d}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Job Type</label>
                  <select name="type" value={current.type} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {JOB_TYPES.map(function(t){ return <option key={t}>{t}</option> })}
                  </select>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Posted Date</label>
                  <input name="posted" type="date" value={current.posted} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Application Deadline</label>
                  <input name="deadline" type="date" value={current.deadline} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
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
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Post Job':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Job Posting?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This job listing will be permanently removed.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 24px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 24px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}