import { useState } from 'react'

var INIT_REQUESTS = [
  { id:1, name:'Rahul Sharma',    regNo:'SPVS2019045', dob:'2004-03-12', certType:'Transfer Certificate',   status:'Pending',  reqDate:'08 Mar 2026', phone:'9876543210', email:'rahul@gmail.com',   note:'' },
  { id:2, name:'Priya Singh',     regNo:'SPVS2020112', dob:'2005-07-22', certType:'School Leaving Certificate', status:'Approved', reqDate:'06 Mar 2026', phone:'9876543211', email:'priya@gmail.com',   note:'Ready for pickup' },
  { id:3, name:'Amit Verma',      regNo:'SPVS2018033', dob:'2003-11-05', certType:'Migration Certificate',   status:'Pending',  reqDate:'05 Mar 2026', phone:'9876543212', email:'amit@gmail.com',    note:'' },
  { id:4, name:'Sneha Gupta',     regNo:'SPVS2021088', dob:'2006-01-30', certType:'Bonafide Certificate',    status:'Rejected', reqDate:'04 Mar 2026', phone:'9876543213', email:'sneha@gmail.com',   note:'Incomplete documents' },
  { id:5, name:'Rohan Tiwari',    regNo:'SPVS2017021', dob:'2002-09-14', certType:'Character Certificate',   status:'Approved', reqDate:'02 Mar 2026', phone:'9876543214', email:'rohan@gmail.com',   note:'Dispatched by post' },
  { id:6, name:'Kavita Pandey',   regNo:'SPVS2022055', dob:'2007-05-18', certType:'Results / Marksheet',    status:'Pending',  reqDate:'01 Mar 2026', phone:'9876543215', email:'kavita@gmail.com',  note:'' },
]

var CERT_TYPES = ['All','School Leaving Certificate','Transfer Certificate','Migration Certificate','Bonafide Certificate','Character Certificate','Results / Marksheet']
var STATUS_OPTS = ['Pending','Approved','Rejected']

var STATUS_STYLE = {
  Pending:  { bg:'rgba(245,184,0,.12)',  clr:'#C45F0A', icon:'⏳' },
  Approved: { bg:'rgba(34,163,90,.12)',  clr:'#22a35a', icon:'✅' },
  Rejected: { bg:'rgba(220,38,38,.1)',   clr:'#dc2626', icon:'❌' },
}

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'6px' },
  inp:   { width:'100%', padding:'10px 13px', borderRadius:'9px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', outline:'none', boxSizing:'border-box', transition:'border-color .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

export default function ManageCertificatesPage() {
  var [requests, setRequests] = useState(INIT_REQUESTS)
  var [filterStatus, setFilterStatus] = useState('All')
  var [filterType,   setFilterType]   = useState('All')
  var [search,       setSearch]       = useState('')
  var [modal,        setModal]        = useState(null)   // 'view' | null
  var [selected,     setSelected]     = useState(null)
  var [noteInput,    setNoteInput]    = useState('')

  var visible = requests.filter(function(r) {
    var ms = filterStatus === 'All' || r.status === filterStatus
    var mt = filterType   === 'All' || r.certType === filterType
    var mq = r.name.toLowerCase().includes(search.toLowerCase()) ||
             r.regNo.toLowerCase().includes(search.toLowerCase())
    return ms && mt && mq
  })

  var pending  = requests.filter(function(r){ return r.status === 'Pending'  }).length
  var approved = requests.filter(function(r){ return r.status === 'Approved' }).length
  var rejected = requests.filter(function(r){ return r.status === 'Rejected' }).length

  function openView(r) { setSelected(r); setNoteInput(r.note || ''); setModal('view') }
  function closeModal() { setModal(null); setSelected(null); setNoteInput('') }

  function updateStatus(id, status) {
    setRequests(function(prev) {
      return prev.map(function(r) {
        return r.id === id ? {...r, status: status, note: noteInput} : r
      })
    })
    closeModal()
  }

  function updateNote(id) {
    setRequests(function(prev) {
      return prev.map(function(r) { return r.id === id ? {...r, note: noteInput} : r })
    })
  }

  return (
    <div style={{maxWidth:'1100px'}}>

      {/* HEADER */}
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', gap:'16px', flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:'700', color:'#1C0A00', margin:'0 0 5px'}}>📋 Certificate Requests</h1>
          <p style={{fontSize:'13px', color:'#7A4010', margin:0}}>Review and approve certificate requests submitted by students from the website</p>
        </div>
      </div>

      {/* STATS */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px'}}>
        {[
          { label:'Total Requests', value:requests.length, icon:'📋', clr:'#E8761A' },
          { label:'Pending',        value:pending,          icon:'⏳', clr:'#C45F0A' },
          { label:'Approved',       value:approved,         icon:'✅', clr:'#22a35a' },
          { label:'Rejected',       value:rejected,         icon:'❌', clr:'#dc2626' },
        ].map(function(st) {
          return (
            <div key={st.label} style={{...s.card, display:'flex', alignItems:'center', gap:'12px'}}>
              <div style={{width:'42px', height:'42px', borderRadius:'12px', background:st.clr+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'11.5px', color:'#7A4010', fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* FILTERS */}
      <div style={{...s.card, marginBottom:'16px', padding:'14px 18px'}}>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}}
            placeholder="🔍  Search by name or reg no..."
            style={{...s.inp, width:'220px', padding:'8px 12px'}} onFocus={inf} onBlur={inb} />

          <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
            {['All','Pending','Approved','Rejected'].map(function(st) {
              var isA = filterStatus === st
              var stl = STATUS_STYLE[st] || { bg:'#FFF6EA', clr:'#7A4010' }
              return (
                <button key={st} onClick={function(){setFilterStatus(st)}}
                  style={{padding:'6px 13px', borderRadius:'8px', border:'1.5px solid', fontSize:'12px', fontWeight:'700', cursor:'pointer', transition:'all .15s',
                    borderColor: isA ? '#E8761A' : 'rgba(232,118,26,.2)',
                    background:  isA ? 'linear-gradient(135deg,#E8761A,#F5B800)' : '#FFF6EA',
                    color:       isA ? '#fff' : '#7A4010' }}>
                  {st !== 'All' && (STATUS_STYLE[st]?.icon + ' ')}{st}
                </button>
              )
            })}
          </div>

          <select value={filterType} onChange={function(e){setFilterType(e.target.value)}}
            style={{...s.inp, width:'200px', padding:'8px 12px'}} onFocus={inf} onBlur={inb}>
            {CERT_TYPES.map(function(t){ return <option key={t}>{t}</option> })}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div style={s.card}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                {['Student','Reg. No.','Certificate Type','Requested On','Status','Note','Actions'].map(function(h){
                  return <th key={h} style={{padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:'800', color:'#B87832', textTransform:'uppercase', letterSpacing:'.8px', whiteSpace:'nowrap'}}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr><td colSpan={7} style={{padding:'48px', textAlign:'center', color:'#B87832', fontSize:'14px'}}>No requests found</td></tr>
              )}
              {visible.map(function(r, i) {
                var ss = STATUS_STYLE[r.status] || STATUS_STYLE.Pending
                return (
                  <tr key={r.id}
                    style={{borderBottom:'1px solid rgba(232,118,26,.07)', background: i%2===0 ? '#FFFFFF' : '#FFFDF8', transition:'background .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>

                    <td style={{padding:'12px 14px'}}>
                      <div style={{fontSize:'13px', fontWeight:'700', color:'#1C0A00'}}>{r.name}</div>
                      <div style={{fontSize:'11.5px', color:'#B87832'}}>{r.phone}</div>
                    </td>
                    <td style={{padding:'12px 14px', fontSize:'12.5px', color:'#3D1A00', fontWeight:'700', fontFamily:"'DM Sans',monospace", whiteSpace:'nowrap'}}>{r.regNo}</td>
                    <td style={{padding:'12px 14px'}}>
                      <span style={{padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'800', background:'rgba(108,63,197,.1)', color:'#6C3FC5', whiteSpace:'nowrap'}}>{r.certType}</span>
                    </td>
                    <td style={{padding:'12px 14px', fontSize:'12px', color:'#7A4010', whiteSpace:'nowrap'}}>{r.reqDate}</td>
                    <td style={{padding:'12px 14px'}}>
                      <span style={{padding:'4px 12px', borderRadius:'20px', fontSize:'11.5px', fontWeight:'800', background:ss.bg, color:ss.clr, whiteSpace:'nowrap'}}>{ss.icon} {r.status}</span>
                    </td>
                    <td style={{padding:'12px 14px', fontSize:'12px', color:'#7A4010', maxWidth:'140px'}}>
                      <div style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{r.note || '—'}</div>
                    </td>
                    <td style={{padding:'12px 14px'}}>
                      <button onClick={function(){openView(r)}}
                        style={{padding:'6px 14px', borderRadius:'8px', border:'1.5px solid rgba(232,118,26,.25)', background:'#FFF6EA', cursor:'pointer', fontSize:'12px', fontWeight:'700', color:'#E8761A', transition:'all .15s', whiteSpace:'nowrap'}}
                        onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.1)'}}
                        onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>
                        👁 Review
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW / ACTION MODAL */}
      {modal === 'view' && selected && (
        <div style={{position:'fixed', inset:0, background:'rgba(28,10,0,.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}}
          onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8', borderRadius:'22px', border:'1.5px solid rgba(232,118,26,.2)', padding:'30px', width:'100%', maxWidth:'500px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'22px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#1C0A00', margin:0}}>Certificate Request</h2>
              <button onClick={closeModal} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer', color:'#B87832'}}>✕</button>
            </div>

            {/* Student info */}
            <div style={{background:'#FFF6EA', borderRadius:'12px', padding:'16px', marginBottom:'16px', border:'1.5px solid rgba(232,118,26,.12)'}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                {[
                  ['Student Name', selected.name],
                  ['Reg. Number',  selected.regNo],
                  ['Date of Birth', selected.dob],
                  ['Phone',        selected.phone],
                  ['Email',        selected.email],
                  ['Requested On', selected.reqDate],
                ].map(function(row) {
                  return (
                    <div key={row[0]}>
                      <div style={{fontSize:'10px', fontWeight:'800', color:'#B87832', letterSpacing:'.8px', textTransform:'uppercase', marginBottom:'2px'}}>{row[0]}</div>
                      <div style={{fontSize:'13px', fontWeight:'700', color:'#1C0A00'}}>{row[1]}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Certificate type */}
            <div style={{marginBottom:'16px', padding:'12px 16px', borderRadius:'10px', background:'rgba(108,63,197,.06)', border:'1.5px solid rgba(108,63,197,.15)'}}>
              <div style={{fontSize:'10px', fontWeight:'800', color:'#6C3FC5', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'4px'}}>Certificate Requested</div>
              <div style={{fontSize:'15px', fontWeight:'700', color:'#1C0A00'}}>{selected.certType}</div>
            </div>

            {/* Current status */}
            <div style={{marginBottom:'16px'}}>
              <label style={s.label}>Current Status</label>
              <div style={{display:'flex', gap:'8px'}}>
                {STATUS_OPTS.map(function(st) {
                  var ss = STATUS_STYLE[st]
                  var isActive = selected.status === st
                  return (
                    <button key={st}
                      onClick={function(){ setSelected(function(p){ return {...p, status:st} }) }}
                      style={{flex:1, padding:'9px 10px', borderRadius:'9px', border:'2px solid', cursor:'pointer', fontSize:'12.5px', fontWeight:'800', transition:'all .18s',
                        borderColor: isActive ? ss.clr : 'rgba(232,118,26,.15)',
                        background:  isActive ? ss.bg  : 'transparent',
                        color:       isActive ? ss.clr : '#B87832' }}>
                      {ss.icon} {st}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Note */}
            <div style={{marginBottom:'20px'}}>
              <label style={s.label}>Admin Note (visible to student)</label>
              <textarea
                value={noteInput}
                onChange={function(e){setNoteInput(e.target.value)}}
                rows={2}
                placeholder="e.g. Ready for pickup, Bring original documents, Dispatched by post..."
                style={{...s.inp, resize:'vertical', lineHeight:'1.6'}}
                onFocus={inf} onBlur={inb}
              />
            </div>

            {/* Actions */}
            <div style={{display:'flex', gap:'8px'}}>
              <button onClick={closeModal}
                style={{...s.btn, flex:1, background:'#FFF6EA', color:'#7A4010', border:'1.5px solid rgba(232,118,26,.2)'}}>
                Cancel
              </button>
              <button
                onClick={function(){ updateStatus(selected.id, selected.status) }}
                style={{...s.btn, flex:2, background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', boxShadow:'0 4px 14px rgba(232,118,26,.3)'}}>
                💾 Save & Update Status
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}