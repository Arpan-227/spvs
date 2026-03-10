import { useState } from 'react'

var DEPTS = ['All','Science','Mathematics','English','Hindi','Social Science','Computer Science','Physical Education','Arts','Commerce','Administration']
var ROLES = ['Principal','Vice Principal','PGT','TGT','PRT','Lab Assistant','Librarian','Sports Coach','Admin Staff']
var QUAL  = ['M.Sc B.Ed','M.A B.Ed','B.Sc B.Ed','M.Com B.Ed','M.P.Ed','MCA B.Ed','M.A','Ph.D','MBA']

var INIT = [
  { id:1,  name:'Mrs. Pooja Agarwal',      role:'Principal',         dept:'Administration',   qual:'M.A B.Ed',   exp:'22 yrs', phone:'8318842325', email:'principal@spvs.edu', status:'Active' },
  { id:2,  name:'Mr. Bhikha Ram Tripathi', role:'Vice Principal',    dept:'Science',          qual:'M.Sc B.Ed',  exp:'18 yrs', phone:'8318600231', email:'vp@spvs.edu',        status:'Active' },
  { id:3,  name:'Mrs. Sunita Sharma',      role:'PGT',               dept:'Mathematics',      qual:'M.Sc B.Ed',  exp:'14 yrs', phone:'9876543210', email:'sunita@spvs.edu',    status:'Active' },
  { id:4,  name:'Mr. Rakesh Verma',        role:'PGT',               dept:'Science',          qual:'M.Sc B.Ed',  exp:'10 yrs', phone:'9876543211', email:'rakesh@spvs.edu',    status:'Active' },
  { id:5,  name:'Mrs. Anita Gupta',        role:'TGT',               dept:'English',          qual:'M.A B.Ed',   exp:'8 yrs',  phone:'9876543212', email:'anita@spvs.edu',     status:'Active' },
  { id:6,  name:'Mr. Ramesh Singh',        role:'TGT',               dept:'Hindi',            qual:'M.A B.Ed',   exp:'12 yrs', phone:'9876543213', email:'ramesh@spvs.edu',    status:'Active' },
  { id:7,  name:'Mrs. Priya Mishra',       role:'TGT',               dept:'Social Science',   qual:'M.A B.Ed',   exp:'6 yrs',  phone:'9876543214', email:'priya@spvs.edu',     status:'Active' },
  { id:8,  name:'Mr. Anil Kumar',          role:'PGT',               dept:'Computer Science', qual:'MCA B.Ed',   exp:'9 yrs',  phone:'9876543215', email:'anil@spvs.edu',      status:'Active' },
  { id:9,  name:'Mr. Deepak Yadav',        role:'Sports Coach',      dept:'Physical Education',qual:'M.P.Ed',    exp:'7 yrs',  phone:'9876543216', email:'deepak@spvs.edu',    status:'Active' },
  { id:10, name:'Mrs. Kavita Tiwari',      role:'PRT',               dept:'Arts',             qual:'B.Sc B.Ed',  exp:'5 yrs',  phone:'9876543217', email:'kavita@spvs.edu',    status:'Active' },
  { id:11, name:'Mr. Suresh Pandey',       role:'Lab Assistant',     dept:'Science',          qual:'B.Sc',       exp:'4 yrs',  phone:'9876543218', email:'suresh@spvs.edu',    status:'Active' },
  { id:12, name:'Mrs. Meena Srivastava',   role:'Librarian',         dept:'Administration',   qual:'M.A',        exp:'11 yrs', phone:'9876543219', email:'meena@spvs.edu',     status:'On Leave' },
]

var EMPTY = { name:'', role:'TGT', dept:'Science', qual:'M.Sc B.Ed', exp:'', phone:'', email:'', status:'Active', image:'' }

var ROLE_CLR = { Principal:'#E8761A', 'Vice Principal':'#C45F0A', PGT:'#6C3FC5', TGT:'#22a35a', PRT:'#E94F37', 'Lab Assistant':'#F5B800', Librarian:'#7A4010', 'Sports Coach':'#22a35a', 'Admin Staff':'#B87832' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageFacultyPage() {
  var [staff, setStaff]     = useState(INIT)
  var [deptF, setDeptF]     = useState('All')
  var [search, setSearch]   = useState('')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = staff.filter(function(f){
    var md = deptF==='All' || f.dept===deptF
    var ms = f.name.toLowerCase().includes(search.toLowerCase()) || f.role.toLowerCase().includes(search.toLowerCase())
    return md && ms
  })

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(f)  { setCurrent({...f}); setEditId(f.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.name.trim()) return
    if(modal==='add'){
      setStaff(function(p){ return [{...current,id:Date.now()},...p] })
    } else {
      setStaff(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setStaff(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function toggleStatus(id){ setStaff(function(p){ return p.map(function(x){ return x.id===id?{...x,status:x.status==='Active'?'On Leave':'Active'}:x }) }) }

  var active   = staff.filter(function(f){ return f.status==='Active' }).length
  var onLeave  = staff.filter(function(f){ return f.status==='On Leave' }).length
  var depts    = [...new Set(staff.map(function(f){ return f.dept }))].length

  function avatar(name){ return name.split(' ').slice(0,2).map(function(w){ return w[0] }).join('').toUpperCase() }

  return (
    <div style={{maxWidth:'1100px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>👨‍🏫 Faculty Management</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage all teaching and non-teaching staff records</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Faculty</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[{label:'Total Staff',value:staff.length,icon:'👥',clr:'#E8761A'},{label:'Active',value:active,icon:'✅',clr:'#22a35a'},{label:'On Leave',value:onLeave,icon:'🏖️',clr:'#C45F0A'},{label:'Departments',value:depts,icon:'🏛️',clr:'#6C3FC5'}].map(function(st){
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
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search by name or role..." style={{...s.inp,width:'230px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {DEPTS.map(function(d){
              var isA=deptF===d
              return <button key={d} onClick={function(){setDeptF(d)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{d}</button>
            })}
          </div>
        </div>
      </div>

      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['Faculty','Role','Department','Qualification','Experience','Contact','Status','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length===0 && <tr><td colSpan={8} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No faculty found</td></tr>}
              {visible.map(function(f,i){
                var rc = ROLE_CLR[f.role]||'#E8761A'
                return (
                  <tr key={f.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        {f.image ? (
                          <img src={f.image} alt={f.name} style={{width:'38px',height:'38px',borderRadius:'10px',objectFit:'cover',flexShrink:0,border:'2px solid rgba(232,118,26,.2)'}} />
                        ) : (
                          <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(f.name)}</div>
                        )}
                        <span style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{f.name}</span>
                      </div>
                    </td>
                    <td style={{padding:'12px 14px'}}><span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:rc+'15',color:rc,whiteSpace:'nowrap'}}>{f.role}</span></td>
                    <td style={{padding:'12px 14px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',whiteSpace:'nowrap'}}>{f.dept}</td>
                    <td style={{padding:'12px 14px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{f.qual}</td>
                    <td style={{padding:'12px 14px',fontSize:'12.5px',color:'#7A4010',fontWeight:'600',whiteSpace:'nowrap'}}>{f.exp}</td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{fontSize:'11.5px',color:'#7A4010'}}>{f.phone}</div>
                      <div style={{fontSize:'11px',color:'#B87832'}}>{f.email}</div>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <button onClick={function(){toggleStatus(f.id)}} style={{padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:f.status==='Active'?'rgba(34,163,90,.12)':'rgba(196,95,10,.12)',color:f.status==='Active'?'#22a35a':'#C45F0A',transition:'all .2s'}}>
                        {f.status==='Active'?'✅ Active':'🏖️ On Leave'}
                      </button>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button onClick={function(){openEdit(f)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                        <button onClick={function(){openDel(f.id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                          onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
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
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'30px',width:'100%',maxWidth:'560px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Faculty':'✏️ Edit Faculty'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Full Name *</label>
                <input name="name" value={current.name} onChange={handleChange} placeholder="Faculty full name..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Role</label>
                  <select name="role" value={current.role} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {ROLES.map(function(r){ return <option key={r}>{r}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Department</label>
                  <select name="dept" value={current.dept} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {DEPTS.filter(function(d){ return d!=='All' }).map(function(d){ return <option key={d}>{d}</option> })}
                  </select>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Qualification</label>
                  <select name="qual" value={current.qual} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {QUAL.map(function(q){ return <option key={q}>{q}</option> })}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Experience</label>
                  <input name="exp" value={current.exp} onChange={handleChange} placeholder="e.g. 10 yrs" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Phone</label>
                  <input name="phone" value={current.phone} onChange={handleChange} placeholder="10-digit number" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Email</label>
                  <input name="email" value={current.email} onChange={handleChange} placeholder="email@spvs.edu" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div>
                <label style={s.label}>Status</label>
                <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                  <option>Active</option>
                  <option>On Leave</option>
                </select>
              </div>

              {/* PHOTO SECTION */}
              <div>
                <label style={s.label}>Faculty Photo</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'16px',background:'rgba(232,118,26,.03)'}}>

                  {current.image ? (
                    <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'12px'}}>
                      <img src={current.image} alt="Preview"
                        style={{width:'72px',height:'80px',objectFit:'cover',borderRadius:'10px',border:'2px solid rgba(232,118,26,.2)',flexShrink:0}} />
                      <div style={{flex:1}}>
                        <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',marginBottom:'4px'}}>Photo added ✅</div>
                        <div style={{fontSize:'11.5px',color:'#B87832',marginBottom:'10px'}}>Will show on faculty page & public website</div>
                        <button
                          onClick={function(){ setCurrent(function(p){ return {...p,image:''} }) }}
                          style={{padding:'5px 12px',borderRadius:'7px',border:'1.5px solid rgba(220,38,38,.2)',background:'rgba(254,242,242,.7)',color:'#dc2626',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>
                          ✕ Remove Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{textAlign:'center',padding:'10px 0 14px'}}>
                      <div style={{fontSize:'36px',marginBottom:'5px'}}>👤</div>
                      <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600',marginBottom:'12px'}}>Upload faculty photo (passport size preferred)</div>
                    </div>
                  )}

                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'9px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',transition:'all .15s',marginBottom:'10px'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.06)'}}
                    onMouseLeave={function(e){e.currentTarget.style.background='#fff'}}>
                    📁 Upload Photo
                    <input type="file" accept="image/*" style={{display:'none'}}
                      onChange={function(e){
                        var file=e.target.files&&e.target.files[0]
                        if(!file) return
                        var reader=new FileReader()
                        reader.onload=function(ev){ setCurrent(function(p){ return {...p,image:ev.target.result} }) }
                        reader.readAsDataURL(file)
                      }} />
                  </label>

                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                    <div style={{flex:1,height:'1px',background:'rgba(232,118,26,.15)'}} />
                    <span style={{fontSize:'11px',color:'#B87832',fontWeight:'700'}}>OR</span>
                    <div style={{flex:1,height:'1px',background:'rgba(232,118,26,.15)'}} />
                  </div>
                  <input
                    name="image"
                    value={current.image&&current.image.startsWith('data:')?'':current.image}
                    onChange={handleChange}
                    placeholder="Paste photo URL (https://...)"
                    style={{...s.inp,fontSize:'12.5px'}}
                    onFocus={inf} onBlur={inb}
                  />
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Faculty':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Remove Faculty?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This faculty record will be permanently deleted.</p>
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