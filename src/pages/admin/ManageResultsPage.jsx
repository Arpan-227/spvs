import { useState } from 'react'

var CLASSES  = ['All','Class X','Class XII','Class IX','Class XI','Class VIII','Class VII','Class VI','Class V']
var EXAMS    = ['CBSE Board','Half Yearly','Annual','Unit Test','Pre-Board','Quarterly']
var SESSIONS = ['2025-26','2024-25','2023-24','2022-23','2021-22']
var STREAMS  = ['All Streams','Science','Commerce','Arts','N/A']

var INIT = [
  { id:1,  title:'CBSE Class X Board Result 2024-25',        cls:'Class X',   exam:'CBSE Board',  session:'2024-25', passRate:'98.5%', topScore:'98.6%', totalStudents:142, stream:'N/A',      status:'Published', date:'15 May 2025' },
  { id:2,  title:'CBSE Class XII Board Result 2024-25',      cls:'Class XII', exam:'CBSE Board',  session:'2024-25', passRate:'97.2%', topScore:'97.4%', totalStudents:118, stream:'Science',   status:'Published', date:'15 May 2025' },
  { id:3,  title:'CBSE Class XII Commerce Result 2024-25',   cls:'Class XII', exam:'CBSE Board',  session:'2024-25', passRate:'96.8%', topScore:'95.8%', totalStudents:64,  stream:'Commerce',  status:'Published', date:'15 May 2025' },
  { id:4,  title:'Class X Half Yearly Exam 2025-26',         cls:'Class X',   exam:'Half Yearly', session:'2025-26', passRate:'94.0%', topScore:'96.0%', totalStudents:148, stream:'N/A',      status:'Published', date:'20 Dec 2025' },
  { id:5,  title:'Class XII Science Half Yearly 2025-26',    cls:'Class XII', exam:'Half Yearly', session:'2025-26', passRate:'91.5%', topScore:'95.2%', totalStudents:122, stream:'Science',   status:'Published', date:'20 Dec 2025' },
  { id:6,  title:'Class IX Annual Exam 2024-25',             cls:'Class IX',  exam:'Annual',      session:'2024-25', passRate:'95.3%', topScore:'94.8%', totalStudents:156, stream:'N/A',      status:'Published', date:'10 Apr 2025' },
  { id:7,  title:'Class X Pre-Board 2025-26',                cls:'Class X',   exam:'Pre-Board',   session:'2025-26', passRate:'',      topScore:'',      totalStudents:148, stream:'N/A',      status:'Draft',     date:'' },
  { id:8,  title:'Class XII Pre-Board Science 2025-26',      cls:'Class XII', exam:'Pre-Board',   session:'2025-26', passRate:'',      topScore:'',      totalStudents:122, stream:'Science',   status:'Draft',     date:'' },
]

var EMPTY = { title:'', cls:'Class X', exam:'CBSE Board', session:'2025-26', passRate:'', topScore:'', totalStudents:'', stream:'N/A', status:'Published', date:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageResultsPage() {
  var [results, setResults] = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = results.filter(function(r){
    var mc = filter==='All' || r.cls===filter || r.exam===filter
    var ms = r.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  var pub   = results.filter(function(r){ return r.status==='Published' }).length
  var draft = results.filter(function(r){ return r.status==='Draft' }).length
  var avgPass = results.filter(function(r){ return r.passRate }).reduce(function(a,r,_,arr){ return a + parseFloat(r.passRate)/arr.length },0).toFixed(1)

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(r)  { setCurrent({...r}); setEditId(r.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.title.trim()) return
    if(modal==='add'){
      setResults(function(p){ return [{...current,id:Date.now()},...p] })
    } else {
      setResults(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setResults(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function toggleStatus(id){ setResults(function(p){ return p.map(function(x){ return x.id===id?{...x,status:x.status==='Published'?'Draft':'Published'}:x }) }) }

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>🏆 Results Management</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage exam results and academic performance records</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Result</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[{label:'Total Results',value:results.length,icon:'📊',clr:'#E8761A'},{label:'Published',value:pub,icon:'✅',clr:'#22a35a'},{label:'Drafts',value:draft,icon:'📝',clr:'#6C3FC5'},{label:'Avg Pass Rate',value:avgPass+'%',icon:'🏅',clr:'#C45F0A'}].map(function(st){
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
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search results..." style={{...s.inp,width:'220px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {['All','Class X','Class XII','Class IX','CBSE Board','Half Yearly','Annual','Pre-Board'].map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['Result Title','Class','Exam Type','Session','Students','Pass Rate','Top Score','Status','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length===0 && <tr><td colSpan={9} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No results found</td></tr>}
              {visible.map(function(r,i){
                var pass = parseFloat(r.passRate)||0
                var passClr = pass>=95?'#22a35a':pass>=85?'#C45F0A':'#dc2626'
                return (
                  <tr key={r.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                    <td style={{padding:'12px',maxWidth:'220px'}}>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.title}</div>
                      <div style={{fontSize:'11px',color:'#B87832',marginTop:'2px'}}>{r.date||'Date TBD'}</div>
                    </td>
                    <td style={{padding:'12px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A',whiteSpace:'nowrap'}}>{r.cls}</span></td>
                    <td style={{padding:'12px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',whiteSpace:'nowrap'}}>{r.exam}</td>
                    <td style={{padding:'12px',fontSize:'12.5px',color:'#7A4010',whiteSpace:'nowrap'}}>{r.session}</td>
                    <td style={{padding:'12px',fontSize:'13px',fontWeight:'700',color:'#1C0A00',textAlign:'center'}}>{r.totalStudents||'—'}</td>
                    <td style={{padding:'12px',textAlign:'center'}}>
                      {r.passRate ? <span style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:passClr}}>{r.passRate}</span> : <span style={{color:'#B87832',fontSize:'12px'}}>Pending</span>}
                    </td>
                    <td style={{padding:'12px',textAlign:'center'}}>
                      {r.topScore ? <span style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'#22a35a'}}>{r.topScore}</span> : <span style={{color:'#B87832',fontSize:'12px'}}>Pending</span>}
                    </td>
                    <td style={{padding:'12px'}}>
                      <button onClick={function(){toggleStatus(r.id)}} style={{padding:'4px 11px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:r.status==='Published'?'rgba(34,163,90,.12)':'rgba(108,63,197,.12)',color:r.status==='Published'?'#22a35a':'#6C3FC5',transition:'all .2s',whiteSpace:'nowrap'}}>
                        {r.status==='Published'?'✅ Published':'📝 Draft'}
                      </button>
                    </td>
                    <td style={{padding:'12px'}}>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button onClick={function(){openEdit(r)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                        <button onClick={function(){openDel(r.id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
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
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Result':'✏️ Edit Result'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Result Title *</label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="e.g. CBSE Class X Board Result 2025-26" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Class</label>
                  <select name="cls" value={current.cls} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {CLASSES.filter(function(c){ return c!=='All' }).map(function(c){ return <option key={c}>{c}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Exam Type</label>
                  <select name="exam" value={current.exam} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {EXAMS.map(function(e){ return <option key={e}>{e}</option> })}
                  </select>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Session</label>
                  <select name="session" value={current.session} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {SESSIONS.map(function(s){ return <option key={s}>{s}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Stream</label>
                  <select name="stream" value={current.stream} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {STREAMS.map(function(s){ return <option key={s}>{s}</option> })}
                  </select>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Total Students</label>
                  <input name="totalStudents" type="number" value={current.totalStudents} onChange={handleChange} placeholder="e.g. 142" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Pass Rate %</label>
                  <input name="passRate" value={current.passRate} onChange={handleChange} placeholder="e.g. 98.5%" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Top Score %</label>
                  <input name="topScore" value={current.topScore} onChange={handleChange} placeholder="e.g. 98.6%" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Date Announced</label>
                  <input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    <option>Published</option><option>Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Result':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Result?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This result record will be permanently deleted.</p>
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