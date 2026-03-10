import { useState } from 'react'

var CATS     = ['All','General','Exam','Holiday','Event','Admission','Result','Notice','Sports']
var PRIORITY = ['Normal','Important','Urgent']
var CAT_CLR  = { General:'#7A4010', Exam:'#6C3FC5', Holiday:'#22a35a', Event:'#E8761A', Admission:'#6C3FC5', Result:'#22a35a', Notice:'#C45F0A', Sports:'#E8761A' }
var PRI_CLR  = { Normal:'#7A4010', Important:'#C45F0A', Urgent:'#dc2626' }

var INIT = [
  { id:1,  title:'CBSE Board Exams 2026 — Admit Card Released',      cat:'Exam',      priority:'Urgent',    date:'1 Feb 2026',  expiry:'28 Feb 2026', status:'Active',   pinned:true  },
  { id:2,  title:'Admissions Open for Session 2026–27',               cat:'Admission', priority:'Important', date:'1 Jan 2026',  expiry:'30 Apr 2026', status:'Active',   pinned:true  },
  { id:3,  title:'Annual Sports Meet — 15 Feb 2026',                  cat:'Sports',    priority:'Normal',    date:'1 Feb 2026',  expiry:'15 Feb 2026', status:'Expired',  pinned:false },
  { id:4,  title:'School Holiday — Holi 2026 (14 Mar)',               cat:'Holiday',   priority:'Normal',    date:'10 Mar 2026', expiry:'15 Mar 2026', status:'Active',   pinned:false },
  { id:5,  title:'Class X Pre-Board Exam Schedule Released',          cat:'Exam',      priority:'Important', date:'20 Jan 2026', expiry:'1 Mar 2026',  status:'Active',   pinned:false },
  { id:6,  title:'Science Exhibition 2025 — Registration Open',       cat:'Event',     priority:'Normal',    date:'1 Nov 2025',  expiry:'15 Nov 2025', status:'Expired',  pinned:false },
  { id:7,  title:'Fee Payment Reminder — Q4 2025-26',                 cat:'Notice',    priority:'Important', date:'25 Jan 2026', expiry:'15 Feb 2026', status:'Active',   pinned:false },
  { id:8,  title:'PTM Schedule — 22 Feb 2026',                        cat:'General',   priority:'Normal',    date:'15 Feb 2026', expiry:'22 Feb 2026', status:'Draft',    pinned:false },
]

var EMPTY = { title:'', cat:'General', priority:'Normal', date:'', expiry:'', status:'Active', pinned:false, description:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

var STATUS_CLR = { Active:'#22a35a', Expired:'#B87832', Draft:'#6C3FC5' }

export default function ManageAnnouncementsPage() {
  var [items, setItems]     = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = items.filter(function(a){
    var mc = filter==='All' || a.cat===filter || a.status===filter || a.priority===filter
    var ms = a.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  var active  = items.filter(function(a){ return a.status==='Active' }).length
  var pinned  = items.filter(function(a){ return a.pinned }).length
  var urgent  = items.filter(function(a){ return a.priority==='Urgent' }).length

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(a)  { setCurrent({...a}); setEditId(a.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.type==='checkbox'?e.target.checked:e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.title.trim()) return
    if(modal==='add'){
      setItems(function(p){ return [{...current,id:Date.now(),date:current.date||new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})},...p] })
    } else {
      setItems(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setItems(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function togglePin(id){ setItems(function(p){ return p.map(function(x){ return x.id===id?{...x,pinned:!x.pinned}:x }) }) }
  function cycleStatus(id){ setItems(function(p){ return p.map(function(x){ if(x.id!==id) return x; var n=x.status==='Active'?'Expired':x.status==='Expired'?'Draft':'Active'; return {...x,status:n} }) }) }

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>📢 Announcements</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage school announcements and notices shown on the website</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ New Announcement</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[{label:'Total',value:items.length,icon:'📢',clr:'#E8761A'},{label:'Active',value:active,icon:'✅',clr:'#22a35a'},{label:'Pinned',value:pinned,icon:'📌',clr:'#C45F0A'},{label:'Urgent',value:urgent,icon:'🚨',clr:'#dc2626'}].map(function(st){
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
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search announcements..." style={{...s.inp,width:'230px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {['All',...CATS.filter(function(c){ return c!=='All' }),'Active','Expired','Draft','Urgent'].map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        {visible.length===0 && <div style={{...s.card,textAlign:'center',padding:'48px',color:'#B87832'}}>No announcements found</div>}
        {visible.map(function(a){
          var cc  = CAT_CLR[a.cat]||'#E8761A'
          var pc  = PRI_CLR[a.priority]||'#7A4010'
          var sc  = STATUS_CLR[a.status]||'#7A4010'
          return (
            <div key={a.id} style={{...s.card,borderLeft: a.pinned?'4px solid #E8761A':'1.5px solid rgba(232,118,26,.12)',transition:'all .2s',padding:'16px 20px'}}
              onMouseEnter={function(e){e.currentTarget.style.boxShadow='0 8px 24px rgba(232,118,26,.1)'}}
              onMouseLeave={function(e){e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
              <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',gap:'7px',alignItems:'center',flexWrap:'wrap',marginBottom:'6px'}}>
                    {a.pinned && <span style={{fontSize:'13px'}}>📌</span>}
                    <span style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00'}}>{a.title}</span>
                  </div>
                  <div style={{display:'flex',gap:'6px',flexWrap:'wrap',alignItems:'center'}}>
                    <span style={{padding:'2px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:cc+'15',color:cc}}>{a.cat}</span>
                    <span style={{padding:'2px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:pc+'12',color:pc}}>{a.priority==='Urgent'?'🚨 ':a.priority==='Important'?'⚠️ ':''}{a.priority}</span>
                    <span style={{fontSize:'11.5px',color:'#B87832'}}>Posted: {a.date||'—'}</span>
                    {a.expiry && <span style={{fontSize:'11.5px',color:'#B87832'}}>Expires: {a.expiry}</span>}
                  </div>
                </div>
                <div style={{display:'flex',gap:'6px',flexShrink:0,flexWrap:'wrap',justifyContent:'flex-end'}}>
                  <button onClick={function(){togglePin(a.id)}} style={{padding:'5px 11px',borderRadius:'8px',border:'1.5px solid',borderColor:a.pinned?'#E8761A':'rgba(232,118,26,.2)',background:a.pinned?'rgba(232,118,26,.1)':'#FFF6EA',color:a.pinned?'#E8761A':'#7A4010',fontSize:'11px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s'}}>
                    {a.pinned?'📌 Pinned':'📌 Pin'}
                  </button>
                  <button onClick={function(){cycleStatus(a.id)}} style={{padding:'5px 11px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:sc+'12',color:sc,whiteSpace:'nowrap',transition:'all .2s'}}>
                    {a.status==='Active'?'✅ Active':a.status==='Expired'?'⏰ Expired':'📝 Draft'}
                  </button>
                  <button onClick={function(){openEdit(a)}} style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                  <button onClick={function(){openDel(a.id)}} style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'30px',width:'100%',maxWidth:'540px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ New Announcement':'✏️ Edit Announcement'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Title *</label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="Announcement title..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Category</label>
                  <select name="cat" value={current.cat} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {CATS.filter(function(c){ return c!=='All' }).map(function(c){ return <option key={c}>{c}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Priority</label>
                  <select name="priority" value={current.priority} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {PRIORITY.map(function(p){ return <option key={p}>{p}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    <option>Active</option><option>Expired</option><option>Draft</option>
                  </select>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Post Date</label>
                  <input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Expiry Date</label>
                  <input name="expiry" type="date" value={current.expiry} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div>
                <label style={s.label}>Description (Optional)</label>
                <textarea name="description" value={current.description} onChange={handleChange} rows={3} placeholder="Additional details..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <input type="checkbox" name="pinned" id="pin" checked={current.pinned} onChange={handleChange} style={{width:'16px',height:'16px',accentColor:'#E8761A'}} />
                <label htmlFor="pin" style={{fontSize:'13px',fontWeight:'600',color:'#7A4010',cursor:'pointer'}}>📌 Pin to top (Show prominently on announcement bar)</label>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Publish':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Announcement?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This announcement will be permanently removed.</p>
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