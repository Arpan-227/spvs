import { useState, useEffect } from 'react'
import { alumniAPI } from '../../api'

var BATCHES = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024']
var FIELDS  = ['Medicine','Engineering','Civil Services','Law','Education','Business','Arts & Media','Science & Research','Armed Forces','Other']
var ICONS   = ['⚕️','🏛️','🚀','⚖️','🎓','💼','🎨','🔬','🪖','🌟']
var EMPTY   = { name:'', batch:'2010', field:'Medicine', role:'', icon:'🌟', featured:false, phone:'', email:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageAlumniPage() {
  var [alumni,  setAlumni]  = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)
  var [imgFile, setImgFile] = useState(null)

  function fetchAlumni() {
    setLoading(true)
    alumniAPI.getAll()
      .then(function(res){ setAlumni(res.data || []); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }
  useEffect(fetchAlumni, [])

  function showToast(msg, type) {
    setToast({ msg, type: type||'success' })
    setTimeout(function(){ setToast(null) }, 3000)
  }

  var visible = alumni.filter(function(a){
    var mf = filter==='All' || a.field===filter
    var ms = a.name.toLowerCase().includes(search.toLowerCase()) || (a.role||'').toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  function openAdd()   { setCurrent(EMPTY); setImgFile(null); setModal('add') }
  function openEdit(a) {
    setCurrent({ name:a.name, batch:a.batch||'2010', field:a.field||'Medicine', role:a.role||'', icon:a.icon||'🌟', featured:a.featured||false, phone:a.phone||'', email:a.email||'', image:a.image||'' })
    setEditId(a._id); setImgFile(null); setModal('edit')
  }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setImgFile(null) }

  function handleChange(e) {
    var k=e.target.name, v=e.target.type==='checkbox'?e.target.checked:e.target.value
    setCurrent(function(p){ var n={...p}; n[k]=v; return n })
  }

  async function handleSave() {
    if (!current.name.trim()) return
    setSaving(true)
    try {
      var fd = new FormData()
      fd.append('name',     current.name)
      fd.append('batch',    current.batch)
      fd.append('field',    current.field)
      fd.append('role',     current.role)
      fd.append('icon',     current.icon)
      fd.append('featured', current.featured ? 'true' : 'false')
      fd.append('phone',    current.phone)
      fd.append('email',    current.email)
      if (imgFile) fd.append('image', imgFile)
      else if (current.image && !current.image.startsWith('data:')) fd.append('image', current.image)
      if (modal === 'add') {
        var res = await alumniAPI.create(fd)
        setAlumni(function(p){ return [res.data, ...p] })
        showToast('Alumni added!')
      } else {
        var res2 = await alumniAPI.update(editId, fd)
        setAlumni(function(p){ return p.map(function(x){ return x._id===editId ? res2.data : x }) })
        showToast('Alumni updated!')
      }
      closeModal()
    } catch(err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await alumniAPI.delete(delId)
      setAlumni(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Alumni removed')
      closeModal()
    } catch(err) { showToast(err.message, 'error') }
  }

  async function toggleFeatured(a) {
    try {
      var res = await alumniAPI.toggleFeatured(a._id)
      setAlumni(function(p){ return p.map(function(x){ return x._id===a._id ? res.data : x }) })
    } catch(err) { showToast(err.message, 'error') }
  }

  var featuredCount = alumni.filter(function(a){ return a.featured }).length

  return (
    <div style={{maxWidth:'1100px', width:'100%', boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }

        .map-stats   { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
        .map-grid    { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; }
        .map-filters { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .map-cats    { display:flex; gap:6px; flex-wrap:wrap; }
        .map-mgrid   { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        @media (max-width:640px) {
          .map-stats        { grid-template-columns:1fr 1fr; gap:8px; }
          .map-grid         { grid-template-columns:1fr; }
          .map-filters      { flex-direction:column; align-items:stretch; gap:8px; }
          .map-search       { max-width:100% !important; width:100% !important; box-sizing:border-box; }
          .map-cats-wrap    { width:100%; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .map-cats-wrap::-webkit-scrollbar { display:none; }
          .map-cats         { flex-wrap:nowrap !important; width:max-content; }
          .map-mgrid        { grid-template-columns:1fr; }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease'}}>
          {toast.type==='error'?'❌ ':'✅ '}{toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>🎓 Alumni Management</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage alumni records and success stories</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Add Alumni</button>
      </div>

      {/* Stats */}
      <div className="map-stats">
        {[
          { label:'Total Alumni', value:loading?'...':alumni.length, icon:'🎓', clr:'#E8761A' },
          { label:'Featured',     value:loading?'...':featuredCount,  icon:'⭐', clr:'#F5B800' },
          { label:'Fields',       value:FIELDS.length,                 icon:'🏛️', clr:'#6C3FC5' },
        ].map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px',padding:'16px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'11px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="map-filters">
          <input
            className="map-search"
            value={search}
            onChange={function(e){setSearch(e.target.value)}}
            placeholder="🔍  Search alumni..."
            style={{...s.inp,maxWidth:'220px',padding:'9px 13px'}}
            onFocus={inf} onBlur={inb}
          />
          <div className="map-cats-wrap">
            <div className="map-cats">
              {['All',...FIELDS].map(function(f){
                var isA=filter===f
                return (
                  <button key={f} onClick={function(){setFilter(f)}}
                    style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s',flexShrink:0}}>
                    {f}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{...s.card,textAlign:'center',padding:'60px'}}>
          <div style={{width:'40px',height:'40px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px'}}/>
          <div style={{color:'#B87832',fontSize:'14px'}}>Loading alumni...</div>
        </div>
      ) : (
        <div className="map-grid">
          {visible.length===0 && <div style={{...s.card,gridColumn:'1/-1',textAlign:'center',padding:'48px',color:'#B87832'}}>No alumni found</div>}
          {visible.map(function(a){
            return (
              <div key={a._id} style={{...s.card,position:'relative',transition:'all .25s'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,118,26,.12)'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                {a.featured && <div style={{position:'absolute',top:'14px',right:'14px',fontSize:'14px'}}>⭐</div>}
                <div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                  {a.image ? (
                    <img src={a.image} alt={a.name} style={{width:'52px',height:'52px',borderRadius:'14px',objectFit:'cover',flexShrink:0,border:'2px solid rgba(232,118,26,.25)'}} />
                  ) : (
                    <div style={{width:'52px',height:'52px',borderRadius:'14px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>{a.icon||'🎓'}</div>
                  )}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00',marginBottom:'2px'}}>{a.name}</div>
                    <div style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600',marginBottom:'4px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.role}</div>
                    <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                      <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A'}}>Batch {a.batch}</span>
                      <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(108,63,197,.1)',color:'#6C3FC5'}}>{a.field}</span>
                    </div>
                  </div>
                </div>
                <div style={{display:'flex',gap:'6px'}}>
                  <button onClick={function(){toggleFeatured(a)}} style={{flex:1,padding:'7px',borderRadius:'8px',border:'1.5px solid',borderColor:a.featured?'#F5B800':'rgba(232,118,26,.2)',background:a.featured?'rgba(245,184,0,.1)':'#FFF6EA',color:a.featured?'#C45F0A':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>
                    {a.featured?'⭐ Featured':'☆ Feature'}
                  </button>
                  <button onClick={function(){openEdit(a)}} style={{width:'34px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                  <button onClick={function(){openDel(a._id)}} style={{width:'34px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'520px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Alumni':'✏️ Edit Alumni'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
              <div>
                <label style={s.label}>Full Name *</label>
                <input name="name" value={current.name} onChange={handleChange} placeholder="Alumni full name..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div className="map-mgrid">
                <div>
                  <label style={s.label}>Batch Year</label>
                  <select name="batch" value={current.batch} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {BATCHES.map(function(b){ return <option key={b}>{b}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Field</label>
                  <select name="field" value={current.field} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {FIELDS.map(function(f){ return <option key={f}>{f}</option> })}
                  </select>
                </div>
              </div>
              <div>
                <label style={s.label}>Current Role / Achievement</label>
                <input name="role" value={current.role} onChange={handleChange} placeholder="e.g. IAS Officer, UP Cadre 2010" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div className="map-mgrid">
                <div>
                  <label style={s.label}>Icon</label>
                  <select name="icon" value={current.icon} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {ICONS.map(function(ic){ return <option key={ic} value={ic}>{ic}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Phone</label>
                  <input name="phone" value={current.phone} onChange={handleChange} placeholder="Optional" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div>
                <label style={s.label}>Email</label>
                <input name="email" value={current.email} onChange={handleChange} placeholder="Optional" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <input type="checkbox" name="featured" id="feat" checked={current.featured} onChange={handleChange} style={{width:'16px',height:'16px',accentColor:'#E8761A'}} />
                <label htmlFor="feat" style={{fontSize:'13px',fontWeight:'600',color:'#7A4010',cursor:'pointer'}}>⭐ Feature on Alumni Page</label>
              </div>
              <div>
                <label style={s.label}>Alumni Photo</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'14px',background:'rgba(232,118,26,.03)'}}>
                  {(imgFile||current.image) ? (
                    <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px'}}>
                      <img src={imgFile?URL.createObjectURL(imgFile):current.image} alt="Preview" style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'12px',border:'2px solid rgba(232,118,26,.2)',flexShrink:0}} />
                      <button onClick={function(){setImgFile(null);setCurrent(function(p){return{...p,image:''}})}} style={{padding:'5px 12px',borderRadius:'7px',border:'1.5px solid rgba(220,38,38,.2)',background:'rgba(254,242,242,.7)',color:'#dc2626',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>✕ Remove</button>
                    </div>
                  ) : (
                    <div style={{textAlign:'center',padding:'8px 0 10px'}}>
                      <div style={{fontSize:'28px',marginBottom:'4px'}}>🎓</div>
                      <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600'}}>Upload alumni photo</div>
                    </div>
                  )}
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'9px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',marginBottom:'8px'}}>
                    📁 Upload Photo
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={function(e){var f=e.target.files&&e.target.files[0];if(f){setImgFile(f);setCurrent(function(p){return{...p,image:''}})}}} />
                  </label>
                  <input name="image" value={imgFile?'':(current.image||'')} onChange={handleChange} placeholder="Or paste photo URL..." style={{...s.inp,fontSize:'12px'}} onFocus={inf} onBlur={inb} />
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1}}>
                {saving?'⏳ Saving...':modal==='add'?'+ Add Alumni':'💾 Save Changes'}
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
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Remove Alumni?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This alumni record will be permanently deleted.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 22px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 22px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}