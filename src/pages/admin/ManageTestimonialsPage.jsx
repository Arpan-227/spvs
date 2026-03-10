import { useState } from 'react'

var TYPES   = ['All','Parent','Student','Alumni','Teacher']
var RATINGS = [5,4,3,2,1]

var INIT = [
  { id:1, name:'Mrs. Sunita Agarwal',   type:'Parent',  relation:'Parent of Class IX student',          rating:5, text:'SPVS has been a life-changing experience for my child. The teachers are dedicated and the infrastructure is excellent. My daughter has grown both academically and personally.',                featured:true,  status:'Published', date:'10 Feb 2026' },
  { id:2, name:'Mr. Rajesh Kumar',      type:'Parent',  relation:'Parent of Class XII student',         rating:5, text:'The school provides a holistic environment that nurtures every student. The CBSE results speak for themselves. I am very proud to have my son study here.',                                featured:true,  status:'Published', date:'5 Feb 2026'  },
  { id:3, name:'Ananya Shukla',         type:'Student', relation:'Class XII Science student',           rating:5, text:'The faculty here is incredible. They go beyond textbooks to make every concept clear. I scored 94% in boards and I owe it all to my teachers at SPVS.',                                   featured:true,  status:'Published', date:'20 Jan 2026' },
  { id:4, name:'Dr. Priya Verma',       type:'Alumni',  relation:'Alumni — Batch 2005, IAS Officer',   rating:5, text:'SPVS shaped my character and built my foundation. The values I learned here have stayed with me throughout my career. Proud to be an SPVSian.',                                         featured:true,  status:'Published', date:'15 Jan 2026' },
  { id:5, name:'Mr. Anil Pandey',       type:'Parent',  relation:'Parent of Class VI student',         rating:4, text:'Very good school with experienced teachers. The campus is clean and safe. My child loves going to school every day which says a lot about the environment here.',                          featured:false, status:'Published', date:'1 Jan 2026'  },
  { id:6, name:'Rohit Mishra',          type:'Student', relation:'Class X student',                    rating:5, text:'Best school in Bahraich! The sports facilities and science labs are top-notch. The annual sports meet and cultural fest are highlights of the year.',                                      featured:false, status:'Published', date:'28 Dec 2025' },
  { id:7, name:'Mrs. Kavita Singh',     type:'Parent',  relation:'Parent of twins in Class IV and VI', rating:5, text:'Both my children study at SPVS and I could not be happier. The school maintains excellent discipline while also encouraging creativity and individual growth.',                            featured:false, status:'Draft',     date:'' },
]

var EMPTY = { name:'', type:'Parent', relation:'', rating:5, text:'', featured:false, status:'Published', date:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function stars(n){ return Array.from({length:5},function(_,i){ return i<n?'⭐':'☆' }).join('') }

function avatar(name){ return name.split(' ').slice(0,2).map(function(w){ return w[0] }).join('').toUpperCase() }

var TYPE_CLR = { Parent:'#E8761A', Student:'#22a35a', Alumni:'#6C3FC5', Teacher:'#C45F0A' }

export default function ManageTestimonialsPage() {
  var [items, setItems]     = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = items.filter(function(t){
    var mf = filter==='All' || t.type===filter
    var ms = t.name.toLowerCase().includes(search.toLowerCase()) || t.text.toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  var featured = items.filter(function(t){ return t.featured }).length
  var pub      = items.filter(function(t){ return t.status==='Published' }).length
  var avgRating= (items.reduce(function(a,t){ return a+t.rating },0)/items.length).toFixed(1)

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(t)  { setCurrent({...t}); setEditId(t.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.type==='checkbox'?e.target.checked:e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.name.trim()||!current.text.trim()) return
    if(modal==='add'){
      setItems(function(p){ return [{...current,id:Date.now(),rating:Number(current.rating),date:current.date||new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})},...p] })
    } else {
      setItems(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId,rating:Number(current.rating)}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setItems(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function toggleFeatured(id){ setItems(function(p){ return p.map(function(x){ return x.id===id?{...x,featured:!x.featured}:x }) }) }
  function toggleStatus(id){ setItems(function(p){ return p.map(function(x){ return x.id===id?{...x,status:x.status==='Published'?'Draft':'Published'}:x }) }) }

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>💬 Testimonials</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage reviews and testimonials shown on the website</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Testimonial</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[{label:'Total',value:items.length,icon:'💬',clr:'#E8761A'},{label:'Published',value:pub,icon:'✅',clr:'#22a35a'},{label:'Featured',value:featured,icon:'⭐',clr:'#F5B800'},{label:'Avg Rating',value:avgRating+'★',icon:'🏅',clr:'#6C3FC5'}].map(function(st){
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
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search testimonials..." style={{...s.inp,width:'220px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px'}}>
            {TYPES.map(function(f){
              var isA=filter===f
              return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 13px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'12px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
            })}
          </div>
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {visible.length===0 && <div style={{...s.card,textAlign:'center',padding:'48px',color:'#B87832'}}>No testimonials found</div>}
        {visible.map(function(t){
          var tc = TYPE_CLR[t.type]||'#E8761A'
          return (
            <div key={t.id} style={{...s.card,transition:'all .2s'}}
              onMouseEnter={function(e){e.currentTarget.style.boxShadow='0 8px 28px rgba(232,118,26,.1)'}}
              onMouseLeave={function(e){e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
              <div style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <div style={{width:'46px',height:'46px',borderRadius:'13px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(t.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap',marginBottom:'4px'}}>
                    <span style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00'}}>{t.name}</span>
                    <span style={{padding:'2px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:tc+'15',color:tc}}>{t.type}</span>
                    {t.featured && <span style={{fontSize:'12px'}}>⭐</span>}
                    <span style={{fontSize:'12px',color:'#F5B800',letterSpacing:'1px'}}>{stars(t.rating)}</span>
                  </div>
                  <div style={{fontSize:'11.5px',color:'#B87832',marginBottom:'8px'}}>{t.relation}</div>
                  <div style={{fontSize:'13px',color:'#3D1A00',lineHeight:'1.65',fontStyle:'italic'}}>"{t.text}"</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'6px',flexShrink:0}}>
                  <button onClick={function(){toggleFeatured(t.id)}} style={{padding:'5px 11px',borderRadius:'8px',border:'1.5px solid',borderColor:t.featured?'#F5B800':'rgba(232,118,26,.2)',background:t.featured?'rgba(245,184,0,.1)':'#FFF6EA',color:t.featured?'#C45F0A':'#7A4010',fontSize:'11px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s'}}>
                    {t.featured?'⭐ Featured':'☆ Feature'}
                  </button>
                  <button onClick={function(){toggleStatus(t.id)}} style={{padding:'5px 11px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:t.status==='Published'?'rgba(34,163,90,.12)':'rgba(108,63,197,.12)',color:t.status==='Published'?'#22a35a':'#6C3FC5',transition:'all .2s',whiteSpace:'nowrap'}}>
                    {t.status==='Published'?'✅ Published':'📝 Draft'}
                  </button>
                  <div style={{display:'flex',gap:'5px'}}>
                    <button onClick={function(){openEdit(t)}} style={{flex:1,padding:'5px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'13px',transition:'all .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                    <button onClick={function(){openDel(t.id)}} style={{flex:1,padding:'5px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'13px',transition:'all .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                  </div>
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
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Testimonial':'✏️ Edit Testimonial'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Full Name *</label>
                <input name="name" value={current.name} onChange={handleChange} placeholder="Reviewer name..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Type</label>
                  <select name="type" value={current.type} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {TYPES.filter(function(t){ return t!=='All' }).map(function(t){ return <option key={t}>{t}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Rating</label>
                  <select name="rating" value={current.rating} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {RATINGS.map(function(r){ return <option key={r} value={r}>{r} Star{r!==1?'s':''}</option> })}
                  </select>
                </div>
              </div>
              <div>
                <label style={s.label}>Relation / Role</label>
                <input name="relation" value={current.relation} onChange={handleChange} placeholder="e.g. Parent of Class IX student" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>Testimonial Text *</label>
                <textarea name="text" value={current.text} onChange={handleChange} rows={4} placeholder="What they said about SPVS..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Date</label>
                  <input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    <option>Published</option><option>Draft</option>
                  </select>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <input type="checkbox" name="featured" id="feat" checked={current.featured} onChange={handleChange} style={{width:'16px',height:'16px',accentColor:'#E8761A'}} />
                <label htmlFor="feat" style={{fontSize:'13px',fontWeight:'600',color:'#7A4010',cursor:'pointer'}}>⭐ Feature on Homepage (Show in testimonials section)</label>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Testimonial':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Testimonial?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This testimonial will be permanently removed.</p>
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