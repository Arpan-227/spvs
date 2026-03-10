import { useState } from 'react'

var BATCHES = ['All','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
var FIELDS  = ['Medicine','Engineering','Civil Services','Law','Education','Business','Arts & Media','Science & Research','Armed Forces','Other']
var ICONS   = ['⚕️','🏛️','🚀','⚖️','🎓','💼','🎨','🔬','🪖','🌟']

var INIT = [
  { id:1, name:'Dr. Priya Shukla',     batch:'2003', field:'Civil Services', role:'IAS Officer, UP Cadre 2010',         icon:'🏛️', featured:true,  phone:'', email:'' },
  { id:2, name:'Mr. Rahul Verma',      batch:'2005', field:'Medicine',       role:'Senior Cardiologist, AIIMS Delhi',   icon:'⚕️', featured:true,  phone:'', email:'' },
  { id:3, name:'Mr. Amit Srivastava',  batch:'2001', field:'Engineering',    role:'Sr. Engineer, ISRO Bangalore',       icon:'🚀', featured:true,  phone:'', email:'' },
  { id:4, name:'Mrs. Neha Tiwari',     batch:'2007', field:'Education',      role:'Principal, DPS Lucknow',             icon:'🎓', featured:true,  phone:'', email:'' },
  { id:5, name:'Mr. Sanjay Gupta',     batch:'2009', field:'Business',       role:'CEO, TechVentures India Pvt. Ltd',   icon:'💼', featured:false, phone:'', email:'' },
  { id:6, name:'Mrs. Kavya Pandey',    batch:'2010', field:'Law',            role:'Advocate, Allahabad High Court',     icon:'⚖️', featured:false, phone:'', email:'' },
  { id:7, name:'Mr. Rohit Mishra',     batch:'2012', field:'Engineering',    role:'Software Engineer, Google India',    icon:'🔬', featured:false, phone:'', email:'' },
  { id:8, name:'Dr. Aisha Khan',       batch:'2008', field:'Medicine',       role:'Gynaecologist, KGMU Lucknow',        icon:'⚕️', featured:false, phone:'', email:'' },
]

var EMPTY = { name:'', batch:'2010', field:'Medicine', role:'', icon:'🌟', featured:false, phone:'', email:'', image:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageAlumniPage() {
  var [alumni, setAlumni]   = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = alumni.filter(function(a){
    var mf = filter==='All' || a.field===filter || a.batch===filter
    var ms = a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(a)  { setCurrent({...a}); setEditId(a.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.type==='checkbox'?e.target.checked:e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.name.trim()) return
    if(modal==='add'){
      setAlumni(function(p){ return [{...current,id:Date.now()},...p] })
    } else {
      setAlumni(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setAlumni(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function toggleFeatured(id){ setAlumni(function(p){ return p.map(function(x){ return x.id===id?{...x,featured:!x.featured}:x }) }) }

  var featured = alumni.filter(function(a){ return a.featured }).length

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>🎓 Alumni Management</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage alumni records and success stories</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Alumni</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[{label:'Total Alumni',value:alumni.length,icon:'🎓',clr:'#E8761A'},{label:'Featured',value:featured,icon:'⭐',clr:'#F5B800'},{label:'Fields',value:FIELDS.length,icon:'🏛️',clr:'#6C3FC5'}].map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'14px'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'12px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{...s.card,marginBottom:'16px',padding:'16px 20px'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search alumni..." style={{...s.inp,width:'210px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            <button onClick={function(){setFilter('All')}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:filter==='All'?'#E8761A':'rgba(232,118,26,.2)',background:filter==='All'?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:filter==='All'?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>All</button>
            {FIELDS.map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'14px'}}>
        {visible.length===0 && <div style={{...s.card,gridColumn:'1/-1',textAlign:'center',padding:'48px',color:'#B87832'}}>No alumni found</div>}
        {visible.map(function(a){
          return (
            <div key={a.id} style={{...s.card,position:'relative',transition:'all .25s'}}
              onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,118,26,.12)'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
              {a.featured && <div style={{position:'absolute',top:'14px',right:'14px',fontSize:'14px'}}>⭐</div>}
              <div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'12px'}}>
                {a.image ? (
                  <img src={a.image} alt={a.name} style={{width:'52px',height:'52px',borderRadius:'14px',objectFit:'cover',flexShrink:0,border:'2px solid rgba(232,118,26,.25)'}} />
                ) : (
                  <div style={{width:'52px',height:'52px',borderRadius:'14px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>{a.icon}</div>
                )}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00',marginBottom:'2px'}}>{a.name}</div>
                  <div style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600',marginBottom:'2px'}}>{a.role}</div>
                  <div style={{display:'flex',gap:'6px'}}>
                    <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A'}}>Batch {a.batch}</span>
                    <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(108,63,197,.1)',color:'#6C3FC5'}}>{a.field}</span>
                  </div>
                </div>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                <button onClick={function(){toggleFeatured(a.id)}} style={{flex:1,padding:'7px',borderRadius:'8px',border:'1.5px solid',borderColor:a.featured?'#F5B800':'rgba(232,118,26,.2)',background:a.featured?'rgba(245,184,0,.1)':'#FFF6EA',color:a.featured?'#C45F0A':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>
                  {a.featured?'⭐ Featured':'☆ Feature'}
                </button>
                <button onClick={function(){openEdit(a)}} style={{width:'34px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                  onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                <button onClick={function(){openDel(a.id)}} style={{width:'34px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                  onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
              </div>
            </div>
          )
        })}
      </div>

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'30px',width:'100%',maxWidth:'520px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Alumni':'✏️ Edit Alumni'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Full Name *</label>
                <input name="name" value={current.name} onChange={handleChange} placeholder="Alumni full name..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Batch Year</label>
                  <select name="batch" value={current.batch} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {BATCHES.filter(function(b){ return b!=='All' }).map(function(b){ return <option key={b}>{b}</option> })}
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
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
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
                <label htmlFor="feat" style={{fontSize:'13px',fontWeight:'600',color:'#7A4010',cursor:'pointer'}}>⭐ Feature on Alumni Page (Show as success story)</label>
              </div>

              {/* PHOTO */}
              <div>
                <label style={s.label}>Alumni Photo</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'16px',background:'rgba(232,118,26,.03)'}}>
                  {current.image ? (
                    <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'12px'}}>
                      <img src={current.image} alt="Preview" style={{width:'64px',height:'64px',objectFit:'cover',borderRadius:'12px',border:'2px solid rgba(232,118,26,.2)',flexShrink:0}} />
                      <div style={{flex:1}}>
                        <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',marginBottom:'6px'}}>Photo added ✅</div>
                        <button onClick={function(){setCurrent(function(p){return{...p,image:''}})}} style={{padding:'5px 12px',borderRadius:'7px',border:'1.5px solid rgba(220,38,38,.2)',background:'rgba(254,242,242,.7)',color:'#dc2626',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>✕ Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{textAlign:'center',padding:'8px 0 12px'}}>
                      <div style={{fontSize:'32px',marginBottom:'4px'}}>🎓</div>
                      <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600',marginBottom:'10px'}}>Upload alumni photo</div>
                    </div>
                  )}
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'9px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',marginBottom:'10px'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.06)'}}
                    onMouseLeave={function(e){e.currentTarget.style.background='#fff'}}>
                    📁 Upload Photo
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={function(e){var file=e.target.files&&e.target.files[0];if(!file)return;var r=new FileReader();r.onload=function(ev){setCurrent(function(p){return{...p,image:ev.target.result}})};r.readAsDataURL(file)}} />
                  </label>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                    <div style={{flex:1,height:'1px',background:'rgba(232,118,26,.15)'}} />
                    <span style={{fontSize:'11px',color:'#B87832',fontWeight:'700'}}>OR</span>
                    <div style={{flex:1,height:'1px',background:'rgba(232,118,26,.15)'}} />
                  </div>
                  <input name="image" value={current.image&&current.image.startsWith('data:')?'':current.image} onChange={handleChange} placeholder="Paste photo URL (https://...)" style={{...s.inp,fontSize:'12.5px'}} onFocus={inf} onBlur={inb} />
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Alumni':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Remove Alumni?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This alumni record will be permanently deleted.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 24px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 24px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}