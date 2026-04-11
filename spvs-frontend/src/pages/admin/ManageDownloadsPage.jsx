import { useState } from 'react'
import {
  FaDownload, FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaImage, FaFileArchive,
  FaCheckCircle, FaEyeSlash, FaPencilAlt, FaTrash, FaTags, FaSearch, FaPaperclip,
} from 'react-icons/fa'

var CATS = ['All','Admission Forms','Academic Calendar','Fee Structure','Exam & Results','Circulars & Notices','Holidays List','Mandatory Disclosure','SLC','TC & Migration']
var FILE_ICONS = {
  pdf: <FaFilePdf size={18} color="#dc2626"/>,
  doc: <FaFileWord size={18} color="#2563eb"/>,
  xls: <FaFileExcel size={18} color="#16a34a"/>,
  img: <FaImage size={18} color="#7c3aed"/>,
  zip: <FaFileArchive size={18} color="#92400e"/>,
}
var FILE_TYPES = ['pdf','doc','xls','img','zip']

var INIT = [
  { id:1,  title:'Admission Form 2026–27 (Class I–V)',          cat:'Admission Forms',       type:'pdf', size:'245 KB', date:'1 Jan 2026',  downloads:312, status:'Active' },
  { id:2,  title:'Admission Form 2026–27 (Class VI–XII)',       cat:'Admission Forms',       type:'pdf', size:'267 KB', date:'1 Jan 2026',  downloads:289, status:'Active' },
  { id:3,  title:'Fee Structure 2026–27 (All Classes)',         cat:'Fee Structure',          type:'pdf', size:'180 KB', date:'5 Jan 2026',  downloads:445, status:'Active' },
  { id:4,  title:'Academic Calendar 2026–27',                   cat:'Academic Calendar',     type:'pdf', size:'320 KB', date:'1 Jan 2026',  downloads:198, status:'Active' },
  { id:5,  title:'Holiday List 2026 (Full Year)',               cat:'Holidays List',          type:'pdf', size:'145 KB', date:'1 Jan 2026',  downloads:523, status:'Active' },
  { id:6,  title:'CBSE Class X Syllabus 2025–26',              cat:'Academic Calendar',     type:'pdf', size:'412 KB', date:'10 Apr 2025', downloads:167, status:'Active' },
  { id:7,  title:'CBSE Class XII Syllabus 2025–26',            cat:'Academic Calendar',     type:'pdf', size:'398 KB', date:'10 Apr 2025', downloads:154, status:'Active' },
  { id:8,  title:'Circular — Board Exam Guidelines 2026',      cat:'Circulars & Notices',   type:'pdf', size:'98 KB',  date:'20 Jan 2026', downloads:87,  status:'Active' },
  { id:9,  title:'Mandatory Disclosure 2025–26',               cat:'Mandatory Disclosure',  type:'pdf', size:'560 KB', date:'1 Apr 2025',  downloads:43,  status:'Active' },
  { id:10, title:'SLC Application Form',                       cat:'SLC',                   type:'pdf', size:'134 KB', date:'1 Jun 2025',  downloads:76,  status:'Active' },
  { id:11, title:'TC Application Form',                        cat:'TC & Migration',         type:'pdf', size:'128 KB', date:'1 Jun 2025',  downloads:58,  status:'Active' },
  { id:12, title:'Class X Result 2024–25',                     cat:'Exam & Results',         type:'pdf', size:'890 KB', date:'15 May 2025', downloads:634, status:'Active' },
]

var EMPTY = { title:'', cat:'Admission Forms', type:'pdf', size:'', date:'', downloads:0, status:'Active' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageDownloadsPage() {
  var [docs, setDocs]       = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = docs.filter(function(d){
    var mc = filter==='All' || d.cat===filter
    var ms = d.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  var totalDl = docs.reduce(function(a,d){ return a+d.downloads },0)

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(d)  { setCurrent({...d}); setEditId(d.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.title.trim()) return
    if(modal==='add'){
      setDocs(function(p){ return [{...current,id:Date.now(),downloads:0,date:current.date||new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})},...p] })
    } else {
      setDocs(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setDocs(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function toggleStatus(id){ setDocs(function(p){ return p.map(function(x){ return x.id===id?{...x,status:x.status==='Active'?'Hidden':'Active'}:x }) }) }

  var STATS = [
    { label:'Total Documents', value:docs.length,      icon:<FaFolder size={18} color="#E8761A"/>,   clr:'#E8761A' },
    { label:'Total Downloads', value:totalDl,           icon:<FaDownload size={18} color="#6C3FC5"/>, clr:'#6C3FC5' },
    { label:'Active',          value:docs.filter(function(d){return d.status==='Active'}).length, icon:<FaCheckCircle size={18} color="#22a35a"/>, clr:'#22a35a' },
    { label:'Categories',      value:CATS.length-1,    icon:<FaTags size={18} color="#C45F0A"/>,     clr:'#C45F0A' },
  ]

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px',display:'inline-flex',alignItems:'center',gap:'10px'}}>
            <FaDownload size={22} color="#E8761A"/> Downloads Management
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage all downloadable documents and forms</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Upload Document</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {STATS.map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'11px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{st.icon}</div>
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
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search documents..."
              style={{...s.inp,width:'220px',padding:'9px 13px 9px 32px'}} onFocus={inf} onBlur={inb} />
          </div>
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {CATS.map(function(c){
              var isA=filter===c
              return <button key={c} onClick={function(){setFilter(c)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{c}</button>
            })}
          </div>
        </div>
      </div>

      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['Document','Category','Type','Size','Date','Downloads','Status','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length===0 && <tr><td colSpan={8} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No documents found</td></tr>}
              {visible.map(function(d,i){
                return (
                  <tr key={d.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                    <td style={{padding:'12px 14px',maxWidth:'260px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        {FILE_ICONS[d.type]||<FaFilePdf size={18} color="#dc2626"/>}
                        <span style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.title}</span>
                      </div>
                    </td>
                    <td style={{padding:'12px 14px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A',whiteSpace:'nowrap'}}>{d.cat}</span></td>
                    <td style={{padding:'12px 14px'}}><span style={{padding:'3px 9px',borderRadius:'6px',fontSize:'11px',fontWeight:'800',background:'rgba(108,63,197,.1)',color:'#6C3FC5',textTransform:'uppercase'}}>{d.type}</span></td>
                    <td style={{padding:'12px 14px',fontSize:'12px',color:'#7A4010'}}>{d.size}</td>
                    <td style={{padding:'12px 14px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{d.date}</td>
                    <td style={{padding:'12px 14px',fontSize:'13px',fontWeight:'700',color:'#1C0A00'}}>{d.downloads}</td>
                    <td style={{padding:'12px 14px'}}>
                      <button onClick={function(){toggleStatus(d.id)}} style={{padding:'4px 11px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:d.status==='Active'?'rgba(34,163,90,.12)':'rgba(196,95,10,.12)',color:d.status==='Active'?'#22a35a':'#C45F0A',transition:'all .2s',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                        {d.status==='Active' ? <><FaCheckCircle size={10}/> Active</> : <><FaEyeSlash size={10}/> Hidden</>}
                      </button>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button onClick={function(){openEdit(d)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>
                          <FaPencilAlt size={13} color="#7A4010"/>
                        </button>
                        <button onClick={function(){openDel(d.id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>
                          <FaTrash size={13} color="#dc2626"/>
                        </button>
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
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'30px',width:'100%',maxWidth:'520px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
                {modal==='add' ? <><FaPaperclip size={16} color="#E8761A"/> Upload Document</> : <><FaPencilAlt size={16} color="#E8761A"/> Edit Document</>}
              </h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && (
              <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700',display:'inline-flex',alignItems:'center',gap:'7px'}}>
                <FaCheckCircle size={13}/> Saved!
              </div>
            )}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div><label style={s.label}>Document Title *</label><input name="title" value={current.title} onChange={handleChange} placeholder="Document name..." style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div><label style={s.label}>Category</label><select name="cat" value={current.cat} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{CATS.filter(function(c){ return c!=='All' }).map(function(c){ return <option key={c}>{c}</option> })}</select></div>
                <div><label style={s.label}>File Type</label><select name="type" value={current.type} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{FILE_TYPES.map(function(t){ return <option key={t}>{t}</option> })}</select></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div><label style={s.label}>File Size</label><input name="size" value={current.size} onChange={handleChange} placeholder="e.g. 245 KB" style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Date</label><input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} /></div>
              </div>
              <div><label style={s.label}>Status</label><select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}><option>Active</option><option>Hidden</option></select></div>
              <div style={{padding:'14px',borderRadius:'12px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)',textAlign:'center'}}>
                <FaPaperclip size={28} color="#E8761A" style={{marginBottom:'6px'}}/>
                <div style={{fontSize:'13px',fontWeight:'700',color:'#7A4010',marginBottom:'3px'}}>File Upload</div>
                <div style={{fontSize:'11.5px',color:'#B87832'}}>File upload will connect to backend storage. Enter file details above for now.</div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Document':'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <FaTrash size={48} color="#dc2626" style={{marginBottom:'14px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Document?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This document will be permanently removed from the portal.</p>
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