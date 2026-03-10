import { useState } from 'react'

var CATS = ['Academic','Achievement','Event','Holiday','Competition','Notice','Sports','Admission']
var CAT_CLR = { Academic:'#6C3FC5', Achievement:'#E8761A', Event:'#22a35a', Notice:'#C45F0A', Sports:'#E8761A', Admission:'#6C3FC5', Holiday:'#22a35a', Competition:'#E94F37' }

var INIT = [
  { id:1, title:'Annual Sports Meet 2026 — A Grand Celebration', category:'Sports',      status:'Published', date:'15 Feb 2026', author:'SPVS Admin',      views:142, image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80' },
  { id:2, title:'SPVS Achieves 100% Results in CBSE Board 2025', category:'Achievement', status:'Published', date:'10 Feb 2026', author:'Principal Office', views:389 },
  { id:3, title:'Admissions Open for Academic Year 2026–27',     category:'Admission',   status:'Published', date:'1 Jan 2026',  author:'Admissions',      views:521 },
  { id:4, title:'Science Exhibition 2025 — Innovation on Display',category:'Academic',   status:'Published', date:'20 Sep 2025', author:'Science Dept.',   views:98  },
  { id:5, title:'Cultural Fest 2025 — Colors of Talent',         category:'Event',       status:'Published', date:'15 Nov 2025', author:'SPVS Admin',      views:176 },
  { id:6, title:'School Holiday List 2026 — Full Year Calendar', category:'Holiday',     status:'Published', date:'1 Jan 2026',  author:'Principal Office', views:634 },
  { id:7, title:'CBSE Science Olympiad 2026 — Registrations',    category:'Competition', status:'Draft',     date:'5 Mar 2026',  author:'Science Dept.',   views:0   },
  { id:8, title:'Summer Vacation Notice 2026',                   category:'Holiday',     status:'Draft',     date:'10 Apr 2026', author:'Principal Office', views:0   },
]

var EMPTY = { title:'', category:'Academic', status:'Published', date:'', author:'SPVS Admin', excerpt:'', content:'', image:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}

function inp_focus(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inp_blur(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageBlogsPage() {
  var [posts, setPosts]     = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = posts.filter(function(p){
    var mc = filter === 'All' || p.category === filter
    var ms = p.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(p)  { setCurrent({...p}); setEditId(p.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }

  function handleChange(e){
    var k=e.target.name, v=e.target.value
    setCurrent(function(p){ var n={...p}; n[k]=v; return n })
  }

  function handleSave(){
    if(!current.title.trim()) return
    if(modal==='add'){
      var np = {...current, id:Date.now(), views:0, date: current.date || new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
      setPosts(function(p){ return [np,...p] })
    } else {
      setPosts(function(p){ return p.map(function(x){ return x.id===editId ? {...current,id:editId,views:x.views} : x }) })
    }
    setSaved(true)
    setTimeout(closeModal, 800)
  }

  function handleDelete(){
    setPosts(function(p){ return p.filter(function(x){ return x.id!==delId }) })
    closeModal()
  }

  function toggleStatus(id){
    setPosts(function(p){ return p.map(function(x){ return x.id===id ? {...x, status: x.status==='Published'?'Draft':'Published'} : x }) })
  }

  var pub   = posts.filter(function(p){ return p.status==='Published' }).length
  var draft = posts.filter(function(p){ return p.status==='Draft' }).length

  return (
    <div style={{maxWidth:'1100px'}}>

      {/* HEADER */}
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', gap:'16px', flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:'700', color:'#1C0A00', margin:'0 0 5px'}}>📰 Blogs & Updates</h1>
          <p style={{fontSize:'13px', color:'#7A4010', margin:0}}>Manage all school blog posts and announcements</p>
        </div>
        <button onClick={openAdd} style={{...s.btn, background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', boxShadow:'0 6px 20px rgba(232,118,26,.3)', padding:'12px 24px', fontSize:'14px'}}>
          + Add New Post
        </button>
      </div>

      {/* STATS ROW */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'20px'}}>
        {[
          { label:'Total Posts', value: posts.length, icon:'📰', clr:'#E8761A' },
          { label:'Published',   value: pub,           icon:'✅', clr:'#22a35a' },
          { label:'Drafts',      value: draft,          icon:'📝', clr:'#C45F0A' },
        ].map(function(st){
          return (
            <div key={st.label} style={{...s.card, display:'flex', alignItems:'center', gap:'14px'}}>
              <div style={{width:'44px', height:'44px', borderRadius:'12px', background:st.clr+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'12px', color:'#7A4010', fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* FILTERS */}
      <div style={{...s.card, marginBottom:'16px', padding:'16px 20px'}}>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search posts..." style={{...s.inp, width:'220px', padding:'9px 13px'}} onFocus={inp_focus} onBlur={inp_blur} />
          <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
            {['All',...CATS].map(function(c){
              var isActive = filter===c
              return (
                <button key={c} onClick={function(){setFilter(c)}}
                  style={{padding:'7px 14px', borderRadius:'8px', border:'1.5px solid', borderColor: isActive ? '#E8761A' : 'rgba(232,118,26,.2)', background: isActive ? 'linear-gradient(135deg,#E8761A,#F5B800)' : '#FFF6EA', color: isActive ? '#fff' : '#7A4010', fontSize:'12px', fontWeight:'700', cursor:'pointer', transition:'all .15s'}}>
                  {c}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['','Title','Category','Status','Date','Author','Views','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:'800', color:'#B87832', textTransform:'uppercase', letterSpacing:'.8px', whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr><td colSpan={7} style={{padding:'40px', textAlign:'center', color:'#B87832', fontSize:'14px'}}>No posts found</td></tr>
              )}
              {visible.map(function(p, i){
                var cc = CAT_CLR[p.category] || '#E8761A'
                return (
                  <tr key={p.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)', background: i%2===0 ? '#FFFFFF' : '#FFFDF8', transition:'background .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                    <td style={{padding:'8px 10px', width:'52px'}}>
                      {p.image ? (
                        <img src={p.image} alt="" style={{width:'46px', height:'36px', objectFit:'cover', borderRadius:'8px', display:'block'}} />
                      ) : (
                        <div style={{width:'46px', height:'36px', borderRadius:'8px', background:'rgba(232,118,26,.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px'}}>📰</div>
                      )}
                    </td>
                    <td style={{padding:'12px 14px', maxWidth:'260px'}}>
                      <div style={{fontSize:'13px', fontWeight:'700', color:'#1C0A00', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.title}</div>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <span style={{padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'800', background:cc+'15', color:cc}}>{p.category}</span>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <button onClick={function(){toggleStatus(p.id)}}
                        style={{padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'800', border:'none', cursor:'pointer', background: p.status==='Published' ? 'rgba(34,163,90,.12)' : 'rgba(196,95,10,.12)', color: p.status==='Published' ? '#22a35a' : '#C45F0A', transition:'all .2s'}}>
                        {p.status==='Published' ? '✅ Published' : '📝 Draft'}
                      </button>
                    </td>
                    <td style={{padding:'12px 14px', fontSize:'12.5px', color:'#7A4010', whiteSpace:'nowrap'}}>{p.date}</td>
                    <td style={{padding:'12px 14px', fontSize:'12.5px', color:'#7A4010', whiteSpace:'nowrap'}}>{p.author}</td>
                    <td style={{padding:'12px 14px', fontSize:'12.5px', color:'#B87832', fontWeight:'600'}}>{p.views}</td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex', gap:'6px'}}>
                        <button onClick={function(){openEdit(p)}} title="Edit"
                          style={{width:'32px', height:'32px', borderRadius:'8px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFF6EA', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#E8761A';e.currentTarget.style.borderColor='#E8761A'}}
                          onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.borderColor='rgba(232,118,26,.2)'}}>✏️</button>
                        <button onClick={function(){openDel(p.id)}} title="Delete"
                          style={{width:'32px', height:'32px', borderRadius:'8px', border:'1.5px solid rgba(220,38,38,.15)', background:'rgba(254,242,242,.6)', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#dc2626';e.currentTarget.style.borderColor='#dc2626'}}
                          onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)';e.currentTarget.style.borderColor='rgba(220,38,38,.15)'}}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {(modal==='add' || modal==='edit') && (
        <div style={{position:'fixed', inset:0, background:'rgba(28,10,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8', borderRadius:'20px', border:'1.5px solid rgba(232,118,26,.2)', padding:'30px', width:'100%', maxWidth:'560px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#1C0A00', margin:0}}>{modal==='add' ? '+ Add New Post' : '✏️ Edit Post'}</h2>
              <button onClick={closeModal} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer', color:'#B87832'}}>✕</button>
            </div>

            {saved && <div style={{background:'rgba(34,163,90,.1)', border:'1.5px solid rgba(34,163,90,.25)', borderRadius:'10px', padding:'10px 14px', marginBottom:'16px', fontSize:'13px', color:'#22a35a', fontWeight:'700'}}>✅ Saved successfully!</div>}

            <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
              <div>
                <label style={s.label}>Title *</label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="Post title..." style={s.inp} onFocus={inp_focus} onBlur={inp_blur} />
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div>
                  <label style={s.label}>Category</label>
                  <select name="category" value={current.category} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}>
                    {CATS.map(function(c){ return <option key={c}>{c}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div>
                  <label style={s.label}>Author</label>
                  <input name="author" value={current.author} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur} />
                </div>
                <div>
                  <label style={s.label}>Date</label>
                  <input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur} />
                </div>
              </div>
              <div>
                <label style={s.label}>Excerpt / Summary</label>
                <textarea name="excerpt" value={current.excerpt} onChange={handleChange} rows={2} placeholder="Short summary..." style={{...s.inp, resize:'vertical'}} onFocus={inp_focus} onBlur={inp_blur} />
              </div>
              <div>
                <label style={s.label}>Content</label>
                <textarea name="content" value={current.content} onChange={handleChange} rows={5} placeholder="Full blog content..." style={{...s.inp, resize:'vertical'}} onFocus={inp_focus} onBlur={inp_blur} />
              </div>

              {/* IMAGE SECTION */}
              <div>
                <label style={s.label}>Featured Image</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)', borderRadius:'12px', padding:'16px', background:'rgba(232,118,26,.03)', transition:'border-color .2s'}}
                  onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.5)'}}
                  onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.25)'}}>

                  {/* Preview */}
                  {current.image ? (
                    <div style={{position:'relative', marginBottom:'12px'}}>
                      <img src={current.image} alt="Preview"
                        style={{width:'100%', height:'160px', objectFit:'cover', borderRadius:'9px', display:'block'}} />
                      <button
                        onClick={function(){ setCurrent(function(p){ return {...p, image:''} }) }}
                        style={{position:'absolute', top:'8px', right:'8px', width:'28px', height:'28px', borderRadius:'50%', background:'rgba(220,38,38,.85)', border:'none', cursor:'pointer', color:'#fff', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900'}}>✕</button>
                    </div>
                  ) : (
                    <div style={{textAlign:'center', padding:'20px 0', marginBottom:'12px'}}>
                      <div style={{fontSize:'32px', marginBottom:'6px'}}>🖼️</div>
                      <div style={{fontSize:'12.5px', color:'#B87832', fontWeight:'600'}}>Add a featured image for this blog post</div>
                    </div>
                  )}

                  {/* Upload from device */}
                  <div style={{marginBottom:'10px'}}>
                    <label style={{display:'flex', alignItems:'center', gap:'8px', padding:'9px 14px', borderRadius:'9px', border:'1.5px solid rgba(232,118,26,.25)', background:'#fff', cursor:'pointer', fontSize:'13px', fontWeight:'700', color:'#E8761A', transition:'all .15s', justifyContent:'center'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.06)'}}
                      onMouseLeave={function(e){e.currentTarget.style.background='#fff'}}>
                      📁 Upload from Device
                      <input type="file" accept="image/*" style={{display:'none'}}
                        onChange={function(e){
                          var file = e.target.files && e.target.files[0]
                          if(!file) return
                          var reader = new FileReader()
                          reader.onload = function(ev){ setCurrent(function(p){ return {...p, image: ev.target.result} }) }
                          reader.readAsDataURL(file)
                        }} />
                    </label>
                  </div>

                  {/* OR paste URL */}
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px'}}>
                    <div style={{flex:1, height:'1px', background:'rgba(232,118,26,.15)'}} />
                    <span style={{fontSize:'11px', color:'#B87832', fontWeight:'700'}}>OR</span>
                    <div style={{flex:1, height:'1px', background:'rgba(232,118,26,.15)'}} />
                  </div>
                  <input
                    name="image"
                    value={current.image && current.image.startsWith('data:') ? '' : current.image}
                    onChange={handleChange}
                    placeholder="Paste image URL (https://...)"
                    style={{...s.inp, marginTop:'8px', fontSize:'12.5px'}}
                    onFocus={inp_focus} onBlur={inp_blur}
                  />
                </div>
              </div>
            </div>

            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end', marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn, background:'#FFF6EA', color:'#7A4010', border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn, background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add' ? '+ Publish Post' : '💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {modal==='delete' && (
        <div style={{position:'fixed', inset:0, background:'rgba(28,10,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8', borderRadius:'20px', border:'1.5px solid rgba(220,38,38,.2)', padding:'30px', width:'100%', maxWidth:'400px', boxShadow:'0 24px 64px rgba(28,10,0,.2)', textAlign:'center'}}>
            <div style={{fontSize:'48px', marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#1C0A00', margin:'0 0 8px'}}>Delete Post?</h2>
            <p style={{fontSize:'13px', color:'#7A4010', margin:'0 0 22px'}}>This action cannot be undone. The post will be permanently removed.</p>
            <div style={{display:'flex', gap:'10px', justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn, background:'#FFF6EA', color:'#7A4010', border:'1.5px solid rgba(232,118,26,.2)', padding:'11px 24px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn, background:'linear-gradient(135deg,#dc2626,#ef4444)', color:'#fff', padding:'11px 24px', boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}