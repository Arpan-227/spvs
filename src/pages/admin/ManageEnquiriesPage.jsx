import { useState } from 'react'

var CLASSES  = ['All','Nursery','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII']
var STATUSES = ['All','New','In Progress','Admitted','Not Interested','Follow Up']
var STATUS_CLR = { New:'#6C3FC5', 'In Progress':'#C45F0A', Admitted:'#22a35a', 'Not Interested':'#dc2626', 'Follow Up':'#E8761A' }
var STATUS_ICO = { New:'🆕', 'In Progress':'⏳', Admitted:'✅', 'Not Interested':'❌', 'Follow Up':'🔔' }

var INIT = [
  { id:1,  name:'Ramesh Gupta',       phone:'9876543001', email:'ramesh@gmail.com',  class:'Class VI',   date:'5 Mar 2026',  status:'New',            note:'' },
  { id:2,  name:'Sunita Devi',        phone:'9876543002', email:'',                  class:'Class I',    date:'4 Mar 2026',  status:'In Progress',    note:'Called back, asked for fee structure' },
  { id:3,  name:'Anil Kumar Singh',   phone:'9876543003', email:'anil@gmail.com',    class:'Class IX',   date:'3 Mar 2026',  status:'Follow Up',      note:'Interested, wants to visit campus' },
  { id:4,  name:'Priya Sharma',       phone:'9876543004', email:'priya@gmail.com',   class:'Nursery',    date:'2 Mar 2026',  status:'Admitted',       note:'Admission form submitted, fee paid' },
  { id:5,  name:'Vikram Pandey',      phone:'9876543005', email:'',                  class:'Class XI',   date:'1 Mar 2026',  status:'New',            note:'' },
  { id:6,  name:'Meena Tripathi',     phone:'9876543006', email:'meena@gmail.com',   class:'Class III',  date:'28 Feb 2026', status:'Not Interested', note:'Opted for a school closer to home' },
  { id:7,  name:'Suresh Yadav',       phone:'9876543007', email:'',                  class:'Class VI',   date:'27 Feb 2026', status:'Admitted',       note:'Full admission complete' },
  { id:8,  name:'Kavita Mishra',      phone:'9876543008', email:'kavita@gmail.com',  class:'Class XII',  date:'26 Feb 2026', status:'Follow Up',      note:'Needs TC from previous school' },
  { id:9,  name:'Deepak Verma',       phone:'9876543009', email:'deepak@gmail.com',  class:'Class IV',   date:'25 Feb 2026', status:'In Progress',    note:'Documents being verified' },
  { id:10, name:'Anita Srivastava',   phone:'9876543010', email:'',                  class:'Class VIII', date:'24 Feb 2026', status:'New',            note:'' },
  { id:11, name:'Rohit Bajpai',       phone:'9876543011', email:'rohit@gmail.com',   class:'Class X',    date:'23 Feb 2026', status:'Admitted',       note:'Transferred from Delhi school' },
  { id:12, name:'Geeta Tiwari',       phone:'9876543012', email:'geeta@gmail.com',   class:'Class II',   date:'22 Feb 2026', status:'New',            note:'' },
]

var EMPTY = { name:'', phone:'', email:'', class:'Class VI', date:'', status:'New', note:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageEnquiriesPage() {
  var [items, setItems]     = useState(INIT)
  var [sFilter, setSFilter] = useState('All')
  var [cFilter, setCFilter] = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = items.filter(function(e){
    var ms = sFilter==='All' || e.status===sFilter
    var mc = cFilter==='All' || e.class===cFilter
    var mt = e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search)
    return ms && mc && mt
  })

  var counts = {}
  STATUSES.filter(function(s){ return s!=='All' }).forEach(function(s){ counts[s]=items.filter(function(e){ return e.status===s }).length })

  function openAdd()    { setCurrent({...EMPTY,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}); setModal('add'); setSaved(false) }
  function openEdit(e)  { setCurrent({...e}); setEditId(e.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.name.trim()||!current.phone.trim()) return
    if(modal==='add'){
      setItems(function(p){ return [{...current,id:Date.now()},...p] })
    } else {
      setItems(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setItems(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }

  function changeStatus(id, st){ setItems(function(p){ return p.map(function(x){ return x.id===id?{...x,status:st}:x }) }) }

  function avatar(name){ return name.split(' ').slice(0,2).map(function(w){ return w[0] }).join('').toUpperCase() }

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>📋 Admission Enquiries</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Track and manage all admission enquiries</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Enquiry</button>
      </div>

      {/* STATUS CARDS */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'10px',marginBottom:'20px'}}>
        {STATUSES.filter(function(s){ return s!=='All' }).map(function(st){
          var sc=STATUS_CLR[st]
          return (
            <div key={st} onClick={function(){setSFilter(sFilter===st?'All':st)}} style={{...s.card,cursor:'pointer',borderColor:sFilter===st?sc:'rgba(232,118,26,.12)',background:sFilter===st?sc+'08':'#FFFFFF',transition:'all .2s',padding:'14px 16px'}}>
              <div style={{fontSize:'18px',marginBottom:'6px'}}>{STATUS_ICO[st]}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:sFilter===st?sc:'#1C0A00'}}>{counts[st]||0}</div>
              <div style={{fontSize:'11px',color:sFilter===st?sc:'#7A4010',fontWeight:'700'}}>{st}</div>
            </div>
          )
        })}
      </div>

      {/* FILTERS */}
      <div style={{...s.card,marginBottom:'16px',padding:'14px 18px'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search by name or phone..." style={{...s.inp,width:'220px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <select value={cFilter} onChange={function(e){setCFilter(e.target.value)}} style={{...s.inp,width:'150px'}} onFocus={inf} onBlur={inb}>
            {CLASSES.map(function(c){ return <option key={c}>{c}</option> })}
          </select>
          <div style={{fontSize:'12.5px',color:'#B87832',fontWeight:'600'}}>{visible.length} of {items.length} enquiries</div>
        </div>
      </div>

      {/* TABLE */}
      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['Enquirer','Phone / Email','Class','Date','Status','Notes','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length===0 && <tr><td colSpan={7} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No enquiries found</td></tr>}
              {visible.map(function(e,i){
                var sc=STATUS_CLR[e.status]||'#7A4010'
                return (
                  <tr key={e.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                    onMouseEnter={function(el){el.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(el){el.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
                        <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(e.name)}</div>
                        <span style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{e.name}</span>
                      </div>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{fontSize:'12.5px',color:'#3D1A00',fontWeight:'600'}}>{e.phone}</div>
                      {e.email && <div style={{fontSize:'11px',color:'#B87832'}}>{e.email}</div>}
                    </td>
                    <td style={{padding:'12px 14px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A',whiteSpace:'nowrap'}}>{e.class}</span></td>
                    <td style={{padding:'12px 14px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{e.date}</td>
                    <td style={{padding:'12px 14px'}}>
                      <select value={e.status} onChange={function(ev){changeStatus(e.id,ev.target.value)}}
                        style={{padding:'4px 8px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:sc+'12',color:sc,outline:'none',fontFamily:"'DM Sans',sans-serif"}}>
                        {STATUSES.filter(function(s){ return s!=='All' }).map(function(st){ return <option key={st} value={st}>{STATUS_ICO[st]} {st}</option> })}
                      </select>
                    </td>
                    <td style={{padding:'12px 14px',maxWidth:'180px'}}>
                      <div style={{fontSize:'11.5px',color:'#7A4010',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.note||<span style={{color:'#B87832',fontStyle:'italic'}}>No notes</span>}</div>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button onClick={function(){openEdit(e)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(el){el.currentTarget.style.background='#E8761A'}} onMouseLeave={function(el){el.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                        <button onClick={function(){openDel(e.id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(el){el.currentTarget.style.background='#dc2626'}} onMouseLeave={function(el){el.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
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
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Enquiry':'✏️ Edit Enquiry'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Parent / Guardian Name *</label>
                <input name="name" value={current.name} onChange={handleChange} placeholder="Full name..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Phone *</label>
                  <input name="phone" value={current.phone} onChange={handleChange} placeholder="10-digit number" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Email</label>
                  <input name="email" value={current.email} onChange={handleChange} placeholder="Optional" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Class Enquired For</label>
                  <select name="class" value={current.class} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {CLASSES.filter(function(c){ return c!=='All' }).map(function(c){ return <option key={c}>{c}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {STATUSES.filter(function(s){ return s!=='All' }).map(function(st){ return <option key={st}>{st}</option> })}
                  </select>
                </div>
              </div>
              <div>
                <label style={s.label}>Date</label>
                <input name="date" type="date" value={current.date} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>Notes / Follow-up Remarks</label>
                <textarea name="note" value={current.note} onChange={handleChange} rows={3} placeholder="Any notes about this enquiry..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Enquiry':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Enquiry?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This enquiry record will be permanently deleted.</p>
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