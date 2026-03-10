import { useState } from 'react'

var AREAS = ['All','Bahraich City','Nanpara','Kaiserganj','Mihinpurwa','Jarwal','Bhinga','Shravasti','Balrampur']
var STATUSES = ['Active','Inactive','Under Repair']
var STATUS_CLR = { Active:'#22a35a', Inactive:'#C45F0A', 'Under Repair':'#dc2626' }

var INIT = [
  { id:1,  busNo:'UP 41 T 1001', route:'Route A — City Centre',       area:'Bahraich City', driver:'Ram Prasad',    driverPhone:'9876501001', conductor:'Shyam Lal',   capacity:42, students:38, stops:'Civil Lines, Kotwali, Tehsil Chowk, Collector Office, Gandhi Chowk',    departs:'7:00 AM', returns:'2:30 PM', status:'Active' },
  { id:2,  busNo:'UP 41 T 1002', route:'Route B — Nanpara Road',      area:'Nanpara',       driver:'Mohan Singh',   driverPhone:'9876501002', conductor:'Raju Kumar',  capacity:42, students:35, stops:'Nanpara Bus Stand, Fatehpur, Jarwal Road, Tulsipurwa, SPVS Gate',        departs:'6:45 AM', returns:'2:45 PM', status:'Active' },
  { id:3,  busNo:'UP 41 T 1003', route:'Route C — Kaiserganj',        area:'Kaiserganj',    driver:'Suresh Yadav',  driverPhone:'9876501003', conductor:'Anil Kumar',  capacity:36, students:30, stops:'Kaiserganj Chowk, Bhupati Nagar, Tarabganj, Highway Cross, SPVS Gate',  departs:'6:30 AM', returns:'3:00 PM', status:'Active' },
  { id:4,  busNo:'UP 41 T 1004', route:'Route D — Mihinpurwa',        area:'Mihinpurwa',    driver:'Rajesh Pandey', driverPhone:'9876501004', conductor:'Dinesh Lal',  capacity:42, students:28, stops:'Mihinpurwa Market, Huzurpur, Payagpur Cross, Kichha Road, SPVS Gate',   departs:'6:20 AM', returns:'3:10 PM', status:'Active' },
  { id:5,  busNo:'UP 41 T 1005', route:'Route E — Jarwal Road',       area:'Jarwal',        driver:'Vijay Kumar',   driverPhone:'9876501005', conductor:'Manoj Singh', capacity:36, students:22, stops:'Jarwal Town, Sirsiya, Badka Gaon, NH27 Junction, SPVS Gate',            departs:'6:15 AM', returns:'3:15 PM', status:'Active' },
  { id:6,  busNo:'UP 41 T 1006', route:'Route F — Bhinga / Shravasti',area:'Shravasti',     driver:'Deepak Verma',  driverPhone:'9876501006', conductor:'Santosh Pal', capacity:42, students:18, stops:'Bhinga Chowk, Haripur, Tulsipur Road, Shravasti Cross, SPVS Gate',      departs:'6:00 AM', returns:'3:30 PM', status:'Active' },
  { id:7,  busNo:'UP 41 T 1007', route:'Route G — Local City',        area:'Bahraich City', driver:'Rakesh Tiwari', driverPhone:'9876501007', conductor:'Umesh Lal',   capacity:42, students:40, stops:'Medical College, Pilibhit Road, Station Road, Ghantaghar, SPVS Gate',   departs:'7:15 AM', returns:'2:15 PM', status:'Active' },
  { id:8,  busNo:'UP 41 T 1008', route:'Route H — Balrampur Road',    area:'Balrampur',     driver:'Arun Gupta',    driverPhone:'9876501008', conductor:'Sonu Kumar',  capacity:36, students:0,  stops:'Balrampur Cross, Tulsipur, Utraula Road, Itia Thok, SPVS Gate',         departs:'6:10 AM', returns:'3:20 PM', status:'Under Repair' },
]

var EMPTY = { busNo:'', route:'', area:'Bahraich City', driver:'', driverPhone:'', conductor:'', capacity:42, students:0, stops:'', departs:'7:00 AM', returns:'2:30 PM', status:'Active' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageTransportPage() {
  var [buses, setBuses]     = useState(INIT)
  var [filter, setFilter]   = useState('All')
  var [search, setSearch]   = useState('')
  var [view, setView]       = useState('grid')
  var [modal, setModal]     = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId, setEditId]   = useState(null)
  var [delId, setDelId]     = useState(null)
  var [saved, setSaved]     = useState(false)

  var visible = buses.filter(function(b){
    var ma = filter==='All' || b.area===filter || b.status===filter
    var ms = b.route.toLowerCase().includes(search.toLowerCase()) || b.busNo.toLowerCase().includes(search.toLowerCase()) || b.driver.toLowerCase().includes(search.toLowerCase())
    return ma && ms
  })

  var totalStudents = buses.reduce(function(a,b){ return a+b.students },0)
  var totalCap      = buses.reduce(function(a,b){ return a+b.capacity },0)
  var active        = buses.filter(function(b){ return b.status==='Active' }).length

  function openAdd()    { setCurrent(EMPTY); setModal('add'); setSaved(false) }
  function openEdit(b)  { setCurrent({...b}); setEditId(b.id); setModal('edit'); setSaved(false) }
  function openDel(id)  { setDelId(id); setModal('delete') }
  function closeModal() { setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setSaved(false) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  function handleSave(){
    if(!current.busNo.trim()||!current.route.trim()) return
    if(modal==='add'){
      setBuses(function(p){ return [{...current,id:Date.now(),capacity:Number(current.capacity),students:Number(current.students)},...p] })
    } else {
      setBuses(function(p){ return p.map(function(x){ return x.id===editId?{...current,id:editId,capacity:Number(current.capacity),students:Number(current.students)}:x }) })
    }
    setSaved(true); setTimeout(closeModal,800)
  }

  function handleDelete(){ setBuses(function(p){ return p.filter(function(x){ return x.id!==delId }) }); closeModal() }
  function cycleStatus(id){ setBuses(function(p){ return p.map(function(x){ if(x.id!==id) return x; var n=x.status==='Active'?'Inactive':x.status==='Inactive'?'Under Repair':'Active'; return {...x,status:n} }) }) }

  return (
    <div style={{maxWidth:'1200px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>🚌 Transport Management</h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage school bus routes, drivers and student capacity</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Bus Route</button>
      </div>

      {/* STATS */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        {[
          {label:'Total Buses',     value:buses.length,   icon:'🚌', clr:'#E8761A'},
          {label:'Active Routes',   value:active,          icon:'✅', clr:'#22a35a'},
          {label:'Students Served', value:totalStudents,   icon:'👧', clr:'#6C3FC5'},
          {label:'Total Capacity',  value:totalCap,        icon:'💺', clr:'#C45F0A'},
        ].map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'42px',height:'42px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'12px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* FILTERS */}
      <div style={{...s.card,marginBottom:'16px',padding:'16px 20px'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
            <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="🔍  Search route, bus no, driver..." style={{...s.inp,width:'230px',padding:'9px 13px'}} onFocus={inf} onBlur={inb} />
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              {['All',...AREAS.filter(function(a){ return a!=='All' }),'Active','Inactive','Under Repair'].map(function(f){
                var isA=filter===f
                return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}>{f}</button>
              })}
            </div>
          </div>
          <div style={{display:'flex',gap:'6px'}}>
            {['grid','list'].map(function(v){
              return <button key={v} onClick={function(){setView(v)}} style={{width:'36px',height:'36px',borderRadius:'8px',border:'1.5px solid',borderColor:view===v?'#E8761A':'rgba(232,118,26,.2)',background:view===v?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>{v==='grid'?'⊞':'☰'}</button>
            })}
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {view==='grid' && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'14px'}}>
          {visible.length===0 && <div style={{...s.card,gridColumn:'1/-1',textAlign:'center',padding:'48px',color:'#B87832'}}>No buses found</div>}
          {visible.map(function(b){
            var sc  = STATUS_CLR[b.status]||'#22a35a'
            var pct = Math.round((b.students/b.capacity)*100)
            var barClr = pct>=90?'#dc2626':pct>=70?'#C45F0A':'#22a35a'
            return (
              <div key={b.id} style={{...s.card,transition:'all .25s'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,118,26,.12)'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px'}}>
                      <span style={{fontSize:'20px'}}>🚌</span>
                      <span style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'#1C0A00'}}>{b.busNo}</span>
                    </div>
                    <div style={{fontSize:'12.5px',fontWeight:'700',color:'#7A4010'}}>{b.route}</div>
                  </div>
                  <button onClick={function(){cycleStatus(b.id)}} style={{padding:'4px 10px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',border:'none',cursor:'pointer',background:sc+'12',color:sc,whiteSpace:'nowrap',transition:'all .2s'}}>
                    {b.status==='Active'?'✅ Active':b.status==='Inactive'?'⛔ Inactive':'🔧 Repair'}
                  </button>
                </div>

                {/* Capacity bar */}
                <div style={{marginBottom:'12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                    <span style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600'}}>Occupancy</span>
                    <span style={{fontSize:'12px',fontWeight:'800',color:barClr}}>{b.students}/{b.capacity} ({pct}%)</span>
                  </div>
                  <div style={{height:'6px',borderRadius:'3px',background:'rgba(232,118,26,.15)',overflow:'hidden'}}>
                    <div style={{height:'100%',width:pct+'%',background:barClr,borderRadius:'3px',transition:'width .5s'}} />
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'12px'}}>
                  <div style={{padding:'8px 10px',borderRadius:'9px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                    <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>Driver</div>
                    <div style={{fontSize:'12.5px',fontWeight:'700',color:'#1C0A00'}}>{b.driver}</div>
                    <div style={{fontSize:'11px',color:'#7A4010'}}>{b.driverPhone}</div>
                  </div>
                  <div style={{padding:'8px 10px',borderRadius:'9px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                    <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>Timings</div>
                    <div style={{fontSize:'12px',fontWeight:'700',color:'#1C0A00'}}>▶ {b.departs}</div>
                    <div style={{fontSize:'12px',color:'#7A4010'}}>◀ {b.returns}</div>
                  </div>
                </div>

                <div style={{padding:'8px 10px',borderRadius:'9px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)',marginBottom:'12px'}}>
                  <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'3px'}}>Stops</div>
                  <div style={{fontSize:'11.5px',color:'#7A4010',lineHeight:'1.5'}}>{b.stops}</div>
                </div>

                <div style={{display:'flex',gap:'6px'}}>
                  <button onClick={function(){openEdit(b)}} style={{flex:1,padding:'8px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',color:'#E8761A',fontSize:'12.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#E8761A';e.currentTarget.style.color='#fff'}}
                    onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.color='#E8761A'}}>✏️ Edit</button>
                  <button onClick={function(){openDel(b.id)}} style={{width:'36px',borderRadius:'9px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'15px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>🗑️</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {view==='list' && (
        <div style={s.card}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Bus No','Route','Area','Driver','Students','Departs','Returns','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && <tr><td colSpan={9} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No buses found</td></tr>}
                {visible.map(function(b,i){
                  var sc=STATUS_CLR[b.status]||'#22a35a'
                  var pct=Math.round((b.students/b.capacity)*100)
                  return (
                    <tr key={b.id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'12px 14px',fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>🚌 {b.busNo}</td>
                      <td style={{padding:'12px 14px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.route}</td>
                      <td style={{padding:'12px 14px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A',whiteSpace:'nowrap'}}>{b.area}</span></td>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{fontSize:'12.5px',fontWeight:'700',color:'#1C0A00'}}>{b.driver}</div>
                        <div style={{fontSize:'11px',color:'#7A4010'}}>{b.driverPhone}</div>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00'}}>{b.students}/{b.capacity}</div>
                        <div style={{fontSize:'10.5px',color:'#B87832'}}>{pct}% full</div>
                      </td>
                      <td style={{padding:'12px 14px',fontSize:'12.5px',color:'#7A4010',whiteSpace:'nowrap'}}>{b.departs}</td>
                      <td style={{padding:'12px 14px',fontSize:'12.5px',color:'#7A4010',whiteSpace:'nowrap'}}>{b.returns}</td>
                      <td style={{padding:'12px 14px'}}>
                        <button onClick={function(){cycleStatus(b.id)}} style={{padding:'4px 11px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:sc+'12',color:sc,whiteSpace:'nowrap'}}>
                          {b.status==='Active'?'✅ Active':b.status==='Inactive'?'⛔ Inactive':'🔧 Repair'}
                        </button>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(b)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>✏️</button>
                          <button onClick={function(){openDel(b.id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
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
      )}

      {/* ADD/EDIT MODAL */}
      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'30px',width:'100%',maxWidth:'580px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:0}}>{modal==='add'?'+ Add Bus Route':'✏️ Edit Bus Route'}</h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832'}}>✕</button>
            </div>
            {saved && <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'10px',padding:'10px 14px',marginBottom:'16px',fontSize:'13px',color:'#22a35a',fontWeight:'700'}}>✅ Saved!</div>}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Bus Number *</label>
                  <input name="busNo" value={current.busNo} onChange={handleChange} placeholder="e.g. UP 41 T 1001" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Area / Region</label>
                  <select name="area" value={current.area} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {AREAS.filter(function(a){ return a!=='All' }).map(function(a){ return <option key={a}>{a}</option> })}
                  </select>
                </div>
              </div>
              <div>
                <label style={s.label}>Route Name *</label>
                <input name="route" value={current.route} onChange={handleChange} placeholder="e.g. Route A — City Centre" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Driver Name</label>
                  <input name="driver" value={current.driver} onChange={handleChange} placeholder="Driver full name" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Driver Phone</label>
                  <input name="driverPhone" value={current.driverPhone} onChange={handleChange} placeholder="10-digit number" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div>
                <label style={s.label}>Conductor Name</label>
                <input name="conductor" value={current.conductor} onChange={handleChange} placeholder="Conductor name" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Capacity</label>
                  <input name="capacity" type="number" value={current.capacity} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Students</label>
                  <input name="students" type="number" value={current.students} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>
                    {STATUSES.map(function(st){ return <option key={st}>{st}</option> })}
                  </select>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={s.label}>Departure Time</label>
                  <input name="departs" value={current.departs} onChange={handleChange} placeholder="e.g. 7:00 AM" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
                <div>
                  <label style={s.label}>Return Time</label>
                  <input name="returns" value={current.returns} onChange={handleChange} placeholder="e.g. 2:30 PM" style={s.inp} onFocus={inf} onBlur={inb} />
                </div>
              </div>
              <div>
                <label style={s.label}>Bus Stops (comma separated)</label>
                <textarea name="stops" value={current.stops} onChange={handleChange} rows={3} placeholder="Stop 1, Stop 2, Stop 3, SPVS Gate" style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'22px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                {modal==='add'?'+ Add Route':'💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'30px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'14px'}}>🗑️</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Remove Bus Route?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This bus route record will be permanently deleted.</p>
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