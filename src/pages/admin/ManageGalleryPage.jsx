import { useState, useEffect } from 'react'
import { galleryAPI } from '../../api'

var CATS = ['All','Events','Sports','Academic','Cultural','Infrastructure','Alumni','Miscellaneous']
var CAT_CLR = { Events:'#E8761A', Sports:'#22a35a', Academic:'#6C3FC5', Cultural:'#E94F37', Infrastructure:'#C45F0A', Alumni:'#F5B800', Miscellaneous:'#7A4010' }

function mapCat(c) {
  if (!c) return 'Events'
  var map = { events:'Events', sports:'Sports', labs:'Academic', campus:'Infrastructure', cultural:'Cultural', prize:'Events', general:'Events', alumni:'Alumni', miscellaneous:'Miscellaneous' }
  return map[c.toLowerCase()] || c
}

var EMPTY = { title:'', category:'Events', image:'' }
var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inp_focus(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inp_blur(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageGalleryPage() {
  var [items,   setItems]   = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [error,   setError]   = useState(null)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [view,    setView]    = useState('grid')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)
  var [imgFile, setImgFile] = useState(null)

  function fetchItems() {
    setLoading(true)
    galleryAPI.getAll()
      .then(function(res){ setItems(res.data||[]); setLoading(false) })
      .catch(function(err){ setError(err.message); setLoading(false) })
  }
  useEffect(fetchItems, [])
  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = items.filter(function(a){
    var mc = filter==='All' || mapCat(a.category)===filter
    var ms = a.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  function openAdd()   { setCurrent(EMPTY); setImgFile(null); setModal('add') }
  function openEdit(a) { setCurrent({title:a.title,category:mapCat(a.category),image:a.image||''}); setEditId(a._id); setImgFile(null); setModal('edit') }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setImgFile(null) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){var n={...p};n[k]=v;return n}) }

  async function handleSave() {
    if(!current.title.trim()) return
    if(modal==='add'&&!imgFile&&!current.image.trim()){showToast('Please upload an image or paste a URL','error');return}
    setSaving(true)
    try {
      var fd=new FormData(); fd.append('title',current.title); fd.append('category',current.category.toLowerCase())
      if(imgFile) fd.append('image',imgFile); else if(current.image) fd.append('image',current.image)
      if(modal==='add'){var res=await galleryAPI.create(fd);setItems(function(p){return[res.data,...p]});showToast('Photo uploaded!')}
      else{var res2=await galleryAPI.update(editId,fd);setItems(function(p){return p.map(function(x){return x._id===editId?res2.data:x})});showToast('Photo updated!')}
      closeModal()
    } catch(err){showToast(err.message,'error')}
    finally{setSaving(false)}
  }

  async function handleDelete() {
    try{await galleryAPI.delete(delId);setItems(function(p){return p.filter(function(x){return x._id!==delId})});showToast('Photo deleted');closeModal()}
    catch(err){showToast(err.message,'error')}
  }

  return (
    <div style={{maxWidth:'1100px',width:'100%',boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .mgp-stats      { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
        .mgp-filters    { display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between; }
        .mgp-cats       { display:flex; gap:6px; flex-wrap:wrap; }
        .mgp-grid       { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; }
        .mgp-modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .mgp-stats        { grid-template-columns:1fr 1fr; gap:8px; }
          .mgp-filters      { flex-direction:column; align-items:stretch; gap:8px; }
          .mgp-search       { max-width:100% !important; width:100% !important; box-sizing:border-box; }
          .mgp-cats-wrap    { width:100%; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .mgp-cats-wrap::-webkit-scrollbar { display:none; }
          .mgp-cats         { flex-wrap:nowrap !important; width:max-content; }
          .mgp-grid         { grid-template-columns:repeat(2,1fr); gap:10px; }
          .mgp-modal-grid   { grid-template-columns:1fr; }
          .mgp-view-btns    { align-self:flex-end; }
        }
      `}</style>

      {toast && <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease'}}>{toast.type==='error'?'❌ ':'✅ '}{toast.msg}</div>}

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>🖼️ Gallery Management</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Upload and manage school photos</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Upload Photo</button>
      </div>

      <div className="mgp-stats">
        {[
          {label:'Total Photos',value:loading?'...':items.length,  icon:'📸',clr:'#E8761A'},
          {label:'Categories',  value:CATS.length-1,               icon:'🏷️',clr:'#6C3FC5'},
          {label:'Showing',     value:loading?'...':visible.length,icon:'👁️',clr:'#22a35a'},
        ].map(function(st){
          return <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px',padding:'16px'}}><div style={{width:'40px',height:'40px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{st.icon}</div><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div><div style={{fontSize:'11px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div></div></div>
        })}
      </div>

      {/* Filters — with cats-wrap fix */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="mgp-filters">
          <input
              className="mgp-search"
              value={search} onChange={function(e){setSearch(e.target.value)}}
              placeholder="🔍  Search photos..."
              style={{...s.inp,maxWidth:'200px',padding:'9px 13px'}}
              onFocus={inp_focus} onBlur={inp_blur}
            />
          <div className="mgp-cats-wrap">
            <div className="mgp-cats">
              {CATS.map(function(c){
                var isActive=filter===c
                return <button key={c} onClick={function(){setFilter(c)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isActive?'#E8761A':'rgba(232,118,26,.2)',background:isActive?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isActive?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s',flexShrink:0}}>{c}</button>
              })}
            </div>
          </div>
          <div style={{display:'flex',gap:'6px',flexShrink:0}}>
            {['grid','list'].map(function(v){
              return <button key={v} onClick={function(){setView(v)}} style={{width:'34px',height:'34px',borderRadius:'8px',border:'1.5px solid',borderColor:view===v?'#E8761A':'rgba(232,118,26,.2)',background:view===v?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>{v==='grid'?'⊞':'☰'}</button>
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{...s.card,textAlign:'center',padding:'60px'}}><div style={{width:'40px',height:'40px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px'}}/><div style={{color:'#B87832',fontSize:'14px'}}>Loading photos...</div></div>
      ) : error ? (
        <div style={{...s.card,textAlign:'center',padding:'60px',color:'#dc2626'}}>{error}</div>
      ) : view==='grid' ? (
        <div className="mgp-grid">
          {visible.length===0&&<div style={{...s.card,gridColumn:'1/-1',textAlign:'center',padding:'48px',color:'#B87832'}}>No photos found</div>}
          {visible.map(function(a){
            var cc=CAT_CLR[mapCat(a.category)]||'#E8761A'
            return (
              <div key={a._id} style={{...s.card,padding:0,overflow:'hidden',transition:'all .25s'}} onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,118,26,.15)'}} onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                <div style={{height:'120px',overflow:'hidden',position:'relative'}}>
                  {a.image?<img src={a.image} alt={a.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>:<div style={{width:'100%',height:'100%',background:cc+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px'}}>🖼️</div>}
                  <span style={{position:'absolute',top:'8px',right:'8px',padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'800',background:cc,color:'#fff'}}>{mapCat(a.category)}</span>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:'12.5px',fontWeight:'700',color:'#1C0A00',marginBottom:'8px',lineHeight:'1.3',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.title}</div>
                  <div style={{display:'flex',gap:'6px'}}>
                    <button onClick={function(){openEdit(a)}} style={{flex:1,padding:'6px',borderRadius:'7px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',color:'#E8761A',fontSize:'11px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#E8761A';e.currentTarget.style.color='#fff'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.color='#E8761A'}}>✏️ Edit</button>
                    <button onClick={function(){openDel(a._id)}} style={{width:'30px',borderRadius:'7px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center'}} onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={s.card}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'500px'}}>
              <thead><tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>{['Photo','Title','Category','Actions'].map(function(h){return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px'}}>{h}</th>})}</tr></thead>
              <tbody>
                {visible.length===0&&<tr><td colSpan={4} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No photos found</td></tr>}
                {visible.map(function(a,i){
                  var cc=CAT_CLR[mapCat(a.category)]||'#E8761A'
                  return (
                    <tr key={a._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}} onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'8px 12px',width:'60px'}}>{a.image?<img src={a.image} alt="" style={{width:'52px',height:'40px',objectFit:'cover',borderRadius:'8px',display:'block'}}/>:<div style={{width:'52px',height:'40px',borderRadius:'8px',background:'rgba(232,118,26,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>🖼️</div>}</td>
                      <td style={{padding:'10px 12px',fontSize:'13px',fontWeight:'700',color:'#1C0A00'}}>{a.title}</td>
                      <td style={{padding:'10px 12px'}}><span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:cc+'15',color:cc,whiteSpace:'nowrap'}}>{mapCat(a.category)}</span></td>
                      <td style={{padding:'10px 12px'}}><div style={{display:'flex',gap:'6px'}}><button onClick={function(){openEdit(a)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button><button onClick={function(){openDel(a._id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button></div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'500px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Upload Photo':'✏️ Edit Photo'}</h2><button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button></div>
            <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
              <div><label style={s.label}>Title *</label><input name="title" value={current.title} onChange={handleChange} placeholder="Photo title..." style={s.inp} onFocus={inp_focus} onBlur={inp_blur} /></div>
              <div><label style={s.label}>Category</label><select name="category" value={current.category} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}>{CATS.filter(function(c){return c!=='All'}).map(function(c){return <option key={c}>{c}</option>})}</select></div>
              <div>
                <label style={s.label}>Photo {modal==='add'?'*':''}</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'14px',background:'rgba(232,118,26,.03)'}}>
                  {(imgFile||current.image)?(
                    <div style={{position:'relative',marginBottom:'10px'}}>
                      <img src={imgFile?URL.createObjectURL(imgFile):current.image} alt="Preview" style={{width:'100%',height:'160px',objectFit:'cover',borderRadius:'9px',display:'block'}}/>
                      <button onClick={function(){setImgFile(null);setCurrent(function(p){return{...p,image:''}})}} style={{position:'absolute',top:'8px',right:'8px',width:'26px',height:'26px',borderRadius:'50%',background:'rgba(220,38,38,.85)',border:'none',cursor:'pointer',color:'#fff',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                    </div>
                  ):(
                    <div style={{textAlign:'center',padding:'20px 0',marginBottom:'8px'}}><div style={{fontSize:'36px',marginBottom:'6px'}}>📷</div><div style={{fontSize:'12.5px',color:'#B87832',fontWeight:'600'}}>Upload a photo from your device</div><div style={{fontSize:'11px',color:'rgba(184,120,50,.6)',marginTop:'3px'}}>JPG, PNG, WEBP — Max 5MB</div></div>
                  )}
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'9px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',marginBottom:'8px'}}>
                    📁 Upload from Device<input type="file" accept="image/*" style={{display:'none'}} onChange={function(e){var f=e.target.files&&e.target.files[0];if(f){setImgFile(f);setCurrent(function(p){return{...p,image:''}})}}} />
                  </label>
                  <input name="image" value={imgFile?'':(current.image||'')} onChange={handleChange} placeholder="Or paste image URL..." style={{...s.inp,fontSize:'12px'}} onFocus={inp_focus} onBlur={inp_blur} />
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1}}>{saving?'⏳ Saving...':modal==='add'?'+ Upload Photo':'💾 Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'44px',marginBottom:'12px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Photo?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This will permanently delete the photo. This cannot be undone.</p>
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