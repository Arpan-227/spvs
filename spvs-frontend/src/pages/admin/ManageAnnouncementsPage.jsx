import { useState, useEffect } from 'react'
import { announcementAPI } from '../../api'

var CATS     = ['All','General','Exam','Holiday','Event','Admission','Result','Notice','Sports']
var PRIORITY = ['Normal','Important','Urgent']
var CAT_CLR  = { General:'#7A4010', Exam:'#6C3FC5', Holiday:'#22a35a', Event:'#E8761A', Admission:'#6C3FC5', Result:'#22a35a', Notice:'#C45F0A', Sports:'#E8761A' }

var EMPTY = { title:'', link:'', active:true, cat:'General', priority:'Normal', description:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageAnnouncementsPage() {
  var [items,   setItems]   = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)

  function fetchItems() {
    setLoading(true)
    // Fetch all (including inactive) for admin — use direct fetch with auth
    var BASE  = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
    var token = localStorage.getItem('spvs_token')
    fetch(BASE + '/announcements', { headers: token ? { Authorization:'Bearer '+token } : {} })
      .then(function(r){ return r.json() })
      .then(function(res){ setItems(res.data||[]); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }
  useEffect(fetchItems, [])

  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = items.filter(function(a){
    var mc = filter==='All' || (a.cat&&a.cat===filter) || (filter==='Active'&&a.active) || (filter==='Inactive'&&!a.active)
    var ms = (a.title||'').toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  var active = items.filter(function(a){ return a.active }).length

  function openAdd()   { setCurrent(EMPTY); setModal('add') }
  function openEdit(a) { setCurrent({ title:a.title, link:a.link||'', active:a.active, cat:a.cat||'General', priority:a.priority||'Normal', description:a.description||'' }); setEditId(a._id); setModal('edit') }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null) }
  function handleChange(e){ var k=e.target.name,v=e.target.type==='checkbox'?e.target.checked:e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  async function handleSave() {
    if (!current.title.trim()) return
    setSaving(true)
    try {
      var body = { title:current.title, link:current.link, active:current.active, cat:current.cat, priority:current.priority, description:current.description }
      if (modal==='add') {
        var res = await announcementAPI.create(body)
        setItems(function(p){ return [res.data,...p] })
        showToast('Announcement published!')
      } else {
        var res2 = await announcementAPI.update(editId, body)
        setItems(function(p){ return p.map(function(x){ return x._id===editId?res2.data:x }) })
        showToast('Announcement updated!')
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
      await announcementAPI.delete(delId)
      setItems(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Announcement deleted')
      closeModal()
    } catch(err) { showToast(err.message,'error') }
  }

  async function toggleActive(a) {
    try {
      var res = await announcementAPI.update(a._id, { active: !a.active })
      setItems(function(p){ return p.map(function(x){ return x._id===a._id?res.data:x }) })
    } catch(err) { showToast(err.message,'error') }
  }

  return (
    <div style={{maxWidth:'1100px'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .map-stats   { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .map-filters { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .map-cats    { display:flex; gap:6px; flex-wrap:wrap; }
        .map-mgrid   { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .map-stats   { grid-template-columns:1fr 1fr; }
          .map-filters { flex-direction:column; align-items:stretch; }
          .map-cats    { overflow-x:auto; flex-wrap:nowrap; scrollbar-width:none; }
          .map-cats::-webkit-scrollbar { display:none; }
          .map-mgrid   { grid-template-columns:1fr; }
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
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>📢 Announcements</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage school notices shown in the marquee and announce bar</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ New Announcement</button>
      </div>

      {/* Stats */}
      <div className="map-stats">
        {[
          { label:'Total',    value:loading?'...':items.length,  icon:'📢', clr:'#E8761A' },
          { label:'Active',   value:loading?'...':active,         icon:'✅', clr:'#22a35a' },
          { label:'Inactive', value:loading?'...':(items.length-active), icon:'⏸️', clr:'#C45F0A' },
          { label:'In Marquee', value:loading?'...':active,       icon:'📡', clr:'#6C3FC5' },
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

      {/* Info banner */}
      <div style={{padding:'12px 16px',borderRadius:'12px',background:'rgba(108,63,197,.06)',border:'1.5px solid rgba(108,63,197,.15)',marginBottom:'16px',fontSize:'12.5px',color:'#6C3FC5',fontWeight:'600'}}>
        📡 Active announcements automatically appear in the <strong>top marquee bar</strong> and <strong>AnnounceBar</strong> on the homepage. Toggle Active/Inactive to control visibility.
      </div>

      {/* Filters */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="map-filters">
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search announcements..." style={{...s.inp,width:'100%',maxWidth:'230px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div className="map-cats">
            {['All','Active','Inactive'].map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'12px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div style={{...s.card,textAlign:'center',padding:'60px'}}>
          <div style={{width:'40px',height:'40px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px'}}/>
          <div style={{color:'#B87832',fontSize:'14px'}}>Loading announcements...</div>
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {visible.length===0 && <div style={{...s.card,textAlign:'center',padding:'48px',color:'#B87832'}}>No announcements found</div>}
          {visible.map(function(a){
            var cc = CAT_CLR[a.cat]||'#E8761A'
            return (
              <div key={a._id} style={{...s.card,borderLeft:a.active?'4px solid #22a35a':'4px solid rgba(232,118,26,.2)',transition:'all .2s',padding:'16px 20px',opacity:a.active?1:.7}}
                onMouseEnter={function(e){e.currentTarget.style.boxShadow='0 8px 24px rgba(232,118,26,.1)'}}
                onMouseLeave={function(e){e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                <div style={{display:'flex',gap:'12px',alignItems:'flex-start',flexWrap:'wrap'}}>
                  <div style={{flex:1,minWidth:'200px'}}>
                    <div style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00',marginBottom:'6px'}}>{a.title}</div>
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap',alignItems:'center'}}>
                      {a.cat && <span style={{padding:'2px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:cc+'15',color:cc}}>{a.cat}</span>}
                      {a.link && <a href={a.link} target="_blank" rel="noreferrer" style={{fontSize:'11px',color:'#6C3FC5',fontWeight:'700'}}>🔗 Link</a>}
                      <span style={{fontSize:'11px',color:'#B87832'}}>{a.date ? new Date(a.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ''}</span>
                    </div>
                    {a.description && <div style={{fontSize:'12px',color:'#7A4010',marginTop:'6px',lineHeight:'1.5'}}>{a.description}</div>}
                  </div>
                  <div style={{display:'flex',gap:'6px',flexShrink:0,flexWrap:'wrap',justifyContent:'flex-end'}}>
                    <button onClick={function(){toggleActive(a)}} style={{padding:'5px 11px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:a.active?'rgba(34,163,90,.12)':'rgba(196,95,10,.12)',color:a.active?'#22a35a':'#C45F0A',whiteSpace:'nowrap',transition:'all .2s'}}>
                      {a.active?'✅ Active':'⏸️ Inactive'}
                    </button>
                    <button onClick={function(){openEdit(a)}} style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                    <button onClick={function(){openDel(a._id)}} style={{width:'30px',height:'30px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'540px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ New Announcement':'✏️ Edit Announcement'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Title * <span style={{color:'#B87832',fontSize:'10px',fontWeight:'600',textTransform:'none',letterSpacing:'0'}}>(shown in marquee)</span></label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="e.g. 🎉 Admissions Open 2026–27 — Apply Now!" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>Link (Optional)</label>
                <input name="link" value={current.link} onChange={handleChange} placeholder="https://... or /contact" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div className="map-mgrid">
                <div>
                  <label style={s.label}>Category</label>
                  <select name="cat" value={current.cat} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {CATS.filter(function(c){return c!=='All'}).map(function(c){ return <option key={c}>{c}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Priority</label>
                  <select name="priority" value={current.priority} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {PRIORITY.map(function(p){ return <option key={p}>{p}</option> })}
                  </select>
                </div>
                <div style={{display:'flex',alignItems:'flex-end',paddingBottom:'2px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'11px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)',width:'100%',boxSizing:'border-box'}}>
                    <input type="checkbox" name="active" id="act" checked={current.active} onChange={handleChange} style={{width:'16px',height:'16px',accentColor:'#E8761A'}} />
                    <label htmlFor="act" style={{fontSize:'13px',fontWeight:'600',color:'#7A4010',cursor:'pointer'}}>✅ Active</label>
                  </div>
                </div>
              </div>
              <div>
                <label style={s.label}>Description (Optional)</label>
                <textarea name="description" value={current.description} onChange={handleChange} rows={3} placeholder="Additional details..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1}}>
                {saving?'⏳ Saving...':modal==='add'?'+ Publish':'💾 Save Changes'}
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
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Announcement?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This announcement will be permanently removed from the website.</p>
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