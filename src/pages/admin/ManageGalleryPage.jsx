import { useState } from 'react'

var CATS = ['All','Events','Sports','Academic','Cultural','Infrastructure','Alumni','Miscellaneous']
var CAT_CLR = { Events:'#E8761A', Sports:'#22a35a', Academic:'#6C3FC5', Cultural:'#E94F37', Infrastructure:'#C45F0A', Alumni:'#F5B800', Miscellaneous:'#7A4010' }

var EMOJIS = ['🏫','⚽','📚','🎨','🏆','🔬','🎤','🌳','🏅','🎭','📸','🎯','🚌','🏋️','🎶']

var INIT = [
  { id:1,  title:'Annual Sports Meet 2026',         category:'Sports',         emoji:'⚽', date:'15 Feb 2026', photos:24 },
  { id:2,  title:'Republic Day Celebration 2026',   category:'Events',         emoji:'🎤', date:'26 Jan 2026', photos:18 },
  { id:3,  title:'Science Exhibition 2025',          category:'Academic',       emoji:'🔬', date:'20 Nov 2025', photos:31 },
  { id:4,  title:'Cultural Fest 2025',               category:'Cultural',       emoji:'🎨', date:'15 Nov 2025', photos:42 },
  { id:5,  title:'New School Building Wing',         category:'Infrastructure', emoji:'🏫', date:'10 Oct 2025', photos:12 },
  { id:6,  title:'Alumni Reunion 2025',              category:'Alumni',         emoji:'🎓', date:'5 Sep 2025',  photos:28 },
  { id:7,  title:'Inter-School Debate Competition',  category:'Events',         emoji:'🎯', date:'20 Aug 2025', photos:15 },
  { id:8,  title:'Independence Day 2025',            category:'Events',         emoji:'🇮🇳', date:'15 Aug 2025', photos:20 },
  { id:9,  title:'Football Tournament Finals',       category:'Sports',         emoji:'🏆', date:'10 Jul 2025', photos:33 },
  { id:10, title:'Library Inauguration',             category:'Infrastructure', emoji:'📚', date:'1 Jun 2025',  photos:8  },
]

var EMPTY = { title:'', category:'Events', emoji:'📸', date:'', photos:0, description:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}

function inp_focus(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inp_blur(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageGalleryPage() {
  var [albums, setAlbums]   = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [view, setView]       = useState('grid')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = albums.filter(function(a){
    var mc = filter === 'All' || a.category === filter
    var ms = a.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  var totalPhotos = albums.reduce(function(acc, a){ return acc + a.photos }, 0)

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(a)  { setCurrent({...a}); setEditId(a.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }

  function handleChange(e){
    var k=e.target.name, v=e.target.value
    setCurrent(function(p){ var n={...p}; n[k]=v; return n })
  }

  function handleSave(){
    if(!current.title.trim()) return
    if(modal==='add'){
      var na = {...current, id:Date.now(), photos: Number(current.photos)||0, date: current.date || new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
      setAlbums(function(p){ return [na,...p] })
    } else {
      setAlbums(function(p){ return p.map(function(x){ return x.id===editId ? {...current, id:editId, photos:Number(current.photos)||0} : x }) })
    }
    setSaved(true)
    setTimeout(closeModal, 800)
  }

  function handleDelete(){
    setAlbums(function(p){ return p.filter(function(x){ return x.id!==delId }) })
    closeModal()
  }

  return (
    <div style={{maxWidth:'1100px'}}>

      {/* HEADER */}
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', gap:'16px', flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:'700', color:'#1C0A00', margin:'0 0 5px'}}>🖼️ Gallery Management</h1>
          <p style={{fontSize:'13px', color:'#7A4010', margin:0}}>Manage photo albums and school event galleries</p>
        </div>
        <button onClick={openAdd} style={{...s.btn, background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', boxShadow:'0 6px 20px rgba(232,118,26,.3)', padding:'12px 24px', fontSize:'14px'}}>
          + Add New Album
        </button>
      </div>

      {/* STATS */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'20px'}}>
        {[
          { label:'Total Albums', value: albums.length, icon:'🗂️', clr:'#E8761A' },
          { label:'Total Photos', value: totalPhotos,   icon:'📸', clr:'#6C3FC5' },
          { label:'Categories',   value: CATS.length-1, icon:'🏷️', clr:'#22a35a' },
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

      {/* FILTERS + VIEW TOGGLE */}
      <div style={{...s.card, marginBottom:'16px', padding:'16px 20px'}}>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
            <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search albums..." style={{...s.inp, width:'200px', padding:'9px 13px'}} onFocus={inp_focus} onBlur={inp_blur} />
            <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
              {CATS.map(function(c){
                var isActive = filter===c
                return (
                  <button key={c} onClick={function(){setFilter(c)}}
                    style={{padding:'7px 13px', borderRadius:'8px', border:'1.5px solid', borderColor: isActive ? '#E8761A' : 'rgba(232,118,26,.2)', background: isActive ? 'linear-gradient(135deg,#E8761A,#F5B800)' : '#FFF6EA', color: isActive ? '#fff' : '#7A4010', fontSize:'11.5px', fontWeight:'700', cursor:'pointer', transition:'all .15s'}}>
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
          <div style={{display:'flex', gap:'6px'}}>
            {['grid','list'].map(function(v){
              return (
                <button key={v} onClick={function(){setView(v)}}
                  style={{width:'36px', height:'36px', borderRadius:'8px', border:'1.5px solid', borderColor: view===v ? '#E8761A' : 'rgba(232,118,26,.2)', background: view===v ? 'linear-gradient(135deg,#E8761A,#F5B800)' : '#FFF6EA', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s'}}>
                  {v==='grid' ? '⊞' : '☰'}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === 'grid' && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:'14px'}}>
          {visible.length === 0 && (
            <div style={{...s.card, gridColumn:'1/-1', textAlign:'center', padding:'48px', color:'#B87832'}}>No albums found</div>
          )}
          {visible.map(function(a){
            var cc = CAT_CLR[a.category] || '#E8761A'
            return (
              <div key={a.id} style={{...s.card, padding:'0', overflow:'hidden', transition:'all .25s', cursor:'pointer'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(232,118,26,.15)'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                {/* Album Cover */}
                <div style={{height:'130px', background:'linear-gradient(135deg,'+cc+'22,'+cc+'10)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'54px', borderBottom:'1px solid rgba(232,118,26,.1)', position:'relative'}}>
                  {a.emoji}
                  <span style={{position:'absolute', top:'10px', right:'10px', padding:'3px 9px', borderRadius:'20px', fontSize:'10px', fontWeight:'800', background:cc+'20', color:cc}}>{a.category}</span>
                </div>
                <div style={{padding:'14px'}}>
                  <div style={{fontSize:'13.5px', fontWeight:'700', color:'#1C0A00', marginBottom:'5px', lineHeight:'1.35'}}>{a.title}</div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                    <span style={{fontSize:'11.5px', color:'#B87832'}}>{a.date}</span>
                    <span style={{fontSize:'11.5px', color:'#7A4010', fontWeight:'700'}}>📸 {a.photos} photos</span>
                  </div>
                  <div style={{display:'flex', gap:'6px'}}>
                    <button onClick={function(){openEdit(a)}} style={{flex:1, padding:'7px', borderRadius:'8px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFF6EA', color:'#E8761A', fontSize:'12px', fontWeight:'700', cursor:'pointer', transition:'all .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#E8761A';e.currentTarget.style.color='#fff'}}
                      onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.color='#E8761A'}}>✏️ Edit</button>
                    <button onClick={function(){openDel(a.id)}} style={{width:'34px', borderRadius:'8px', border:'1.5px solid rgba(220,38,38,.15)', background:'rgba(254,242,242,.6)', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}}
                      onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {view === 'list' && (
        <div style={s.card}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Album','Category','Date','Photos','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:'800', color:'#B87832', textTransform:'uppercase', letterSpacing:'.8px'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr><td colSpan={5} style={{padding:'40px', textAlign:'center', color:'#B87832'}}>No albums found</td></tr>
                )}
                {visible.map(function(a, i){
                  var cc = CAT_CLR[a.category] || '#E8761A'
                  return (
                    <tr key={a.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)', background: i%2===0?'#FFFFFF':'#FFFDF8', transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <span style={{fontSize:'24px'}}>{a.emoji}</span>
                          <span style={{fontSize:'13px', fontWeight:'700', color:'#1C0A00'}}>{a.title}</span>
                        </div>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <span style={{padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'800', background:cc+'15', color:cc}}>{a.category}</span>
                      </td>
                      <td style={{padding:'12px 14px', fontSize:'12.5px', color:'#7A4010'}}>{a.date}</td>
                      <td style={{padding:'12px 14px', fontSize:'13px', fontWeight:'700', color:'#1C0A00'}}>📸 {a.photos}</td>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{display:'flex', gap:'6px'}}>
                          <button onClick={function(){openEdit(a)}} style={{width:'32px', height:'32px', borderRadius:'8px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFF6EA', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}}
                            onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                          <button onClick={function(){openDel(a.id)}} style={{width:'32px', height:'32px', borderRadius:'8px', border:'1.5px solid rgba(220,38,38,.15)', background:'rgba(254,242,242,.6)', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s'}}
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
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {(modal==='add' || modal==='edit') && (
        <div style={{position:'fixed', inset:0, background:'rgba(28,10,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8', borderRadius:'20px', border:'1.5px solid rgba(232,118,26,.2)', padding:'30px', width:'100%', maxWidth:'520px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#1C0A00', margin:0}}>{modal==='add' ? '+ Add Album' : '✏️ Edit Album'}</h2>
              <button onClick={closeModal} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer', color:'#B87832'}}>✕</button>
            </div>

            {saved && <div style={{background:'rgba(34,163,90,.1)', border:'1.5px solid rgba(34,163,90,.25)', borderRadius:'10px', padding:'10px 14px', marginBottom:'16px', fontSize:'13px', color:'#22a35a', fontWeight:'700'}}>✅ Saved successfully!</div>}

            <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
              <div>
                <label style={s.label}>Album Title *</label>
                <input name="title" value={current.title} onChange={handleChange} placeholder="Album name..." style={s.inp} onFocus={inp_focus} onBlur={inp_blur} />
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div>
                  <label style={s.label}>Category</label>
                  <select name="category" value={current.category} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}>
                    {CATS.filter(function(c){ return c!=='All' }).map(function(c){ return <option key={c}>{c}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Cover Emoji</label>
                  <select name="emoji" value={current.emoji} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}>
                    {EMOJIS.map(function(em){ return <option key={em} value={em}>{em}</option> })}
                  </select>
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div>
                  <label style={s.label}>Date</label>
                  <input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur} />
                </div>
                <div>
                  <label style={s.label}>Number of Photos</label>
                  <input name="photos" type="number" min="0" value={current.photos} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur} />
                </div>
              </div>
              <div>
                <label style={s.label}>Description</label>
                <textarea name="description" value={current.description} onChange={handleChange} rows={3} placeholder="Short album description..." style={{...s.inp, resize:'vertical'}} onFocus={inp_focus} onBlur={inp_blur} />
              </div>
              <div style={{padding:'14px', borderRadius:'12px', background:'#FFF6EA', border:'1.5px solid rgba(232,118,26,.15)', textAlign:'center'}}>
                <div style={{fontSize:'28px', marginBottom:'6px'}}>📷</div>
                <div style={{fontSize:'13px', fontWeight:'700', color:'#7A4010', marginBottom:'3px'}}>Photo Upload</div>
                <div style={{fontSize:'11.5px', color:'#B87832'}}>Photo upload will be connected to backend storage. Use photo count field for now.</div>
              </div>
            </div>

            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end', marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn, background:'#FFF6EA', color:'#7A4010', border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn, background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add' ? '+ Add Album' : '💾 Save Changes'}
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
            <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#1C0A00', margin:'0 0 8px'}}>Delete Album?</h2>
            <p style={{fontSize:'13px', color:'#7A4010', margin:'0 0 22px'}}>This will permanently delete the album and all its photos. This cannot be undone.</p>
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