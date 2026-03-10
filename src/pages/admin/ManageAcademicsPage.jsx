import { useState } from 'react'

var INIT_STREAMS = [
  {
    id:1, name:'Science', icon:'🔬', clr:'#22a35a',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English Core', 'Physical Education'],
    description:'For students aiming at engineering, medicine, and research careers.',
    eligibility:'Min. 60% in Class X Science & Maths',
  },
  {
    id:2, name:'Commerce', icon:'📈', clr:'#E8761A',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English Core', 'Information Practices'],
    description:'For students aiming at CA, MBA, banking, and business careers.',
    eligibility:'Min. 55% in Class X',
  },
  {
    id:3, name:'Humanities', icon:'🎭', clr:'#6C3FC5',
    subjects: ['History', 'Political Science', 'Geography', 'Economics', 'English Core', 'Hindi Core', 'Sociology'],
    description:'For students aiming at UPSC, law, journalism, and social sciences.',
    eligibility:'Open to all Class X pass students',
  },
]

var INIT_CLASSES = [
  { id:1, name:'Play Group',   age:'3–4 yrs',  students:'45', sections:'2' },
  { id:2, name:'Nursery',      age:'4–5 yrs',  students:'60', sections:'2' },
  { id:3, name:'KG',           age:'5–6 yrs',  students:'65', sections:'2' },
  { id:4, name:'Class I',      age:'6–7 yrs',  students:'75', sections:'3' },
  { id:5, name:'Class II',     age:'7–8 yrs',  students:'70', sections:'3' },
  { id:6, name:'Class III',    age:'8–9 yrs',  students:'72', sections:'3' },
  { id:7, name:'Class IV',     age:'9–10 yrs', students:'68', sections:'3' },
  { id:8, name:'Class V',      age:'10–11 yrs',students:'74', sections:'3' },
  { id:9, name:'Class VI',     age:'11–12 yrs',students:'80', sections:'3' },
  { id:10, name:'Class VII',   age:'12–13 yrs',students:'78', sections:'3' },
  { id:11, name:'Class VIII',  age:'13–14 yrs',students:'76', sections:'3' },
  { id:12, name:'Class IX',    age:'14–15 yrs',students:'82', sections:'3' },
  { id:13, name:'Class X',     age:'15–16 yrs',students:'85', sections:'3' },
  { id:14, name:'Class XI',    age:'16–17 yrs',students:'90', sections:'3' },
  { id:15, name:'Class XII',   age:'17–18 yrs',students:'88', sections:'3' },
]

var INIT_FEE = [
  { id:1, category:'Play Group – KG',         tuition:'800',  annual:'2500', admission:'3000', transport:'1200' },
  { id:2, category:'Class I – V',             tuition:'1000', annual:'3000', admission:'4000', transport:'1200' },
  { id:3, category:'Class VI – VIII',         tuition:'1200', annual:'3500', admission:'5000', transport:'1200' },
  { id:4, category:'Class IX – X',            tuition:'1400', annual:'4000', admission:'6000', transport:'1200' },
  { id:5, category:'Class XI – XII (Science)',tuition:'1600', annual:'5000', admission:'7000', transport:'1200' },
  { id:6, category:'Class XI – XII (Com/Hum)',tuition:'1500', annual:'4500', admission:'7000', transport:'1200' },
]

var INIT_CURRICULUM = {
  cbseNote: 'Sant Pathik Vidyalaya follows the CBSE curriculum from Play Group to Class XII. All textbooks, syllabi, and examinations are conducted as per CBSE norms.',
  examPattern: 'Classes I–VIII: Continuous and Comprehensive Evaluation (CCE). Classes IX–XII: As per CBSE Board examination pattern.',
  activities: ['Morning Assembly', 'Sports Period (Daily)', 'Library Period', 'Art & Craft', 'Music & Dance', 'Computer Lab', 'Science Experiments', 'Debate & Elocution', 'NCC/Scout'],
  achievements: ['100% Board Results (2024-25)', '12 District Level Sports Medals', 'State Level Science Olympiad Winners', 'Best School Award — Bahraich 2023'],
}

var TABS = ['Streams (XI-XII)', 'Classes & Sections', 'Fee Structure', 'Curriculum Info']

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', boxShadow:'0 2px 12px rgba(232,118,26,.06)' },
  h2:    { fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00', margin:0 },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'.8px', textTransform:'uppercase', display:'block', marginBottom:'4px' },
  input: { width:'100%', padding:'8px 11px', borderRadius:'8px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', outline:'none', boxSizing:'border-box', fontWeight:'600' },
}

export default function ManageAcademicsPage() {
  var [tab, setTab]           = useState('Streams (XI-XII)')
  var [streams, setStreams]   = useState(INIT_STREAMS)
  var [classes, setClasses]   = useState(INIT_CLASSES)
  var [fees, setFees]         = useState(INIT_FEE)
  var [curr, setCurr]         = useState(INIT_CURRICULUM)
  var [saved, setSaved]       = useState(false)
  var [editStream, setEditStream] = useState(null)

  function handleSave() { setSaved(true); setTimeout(function(){ setSaved(false) }, 2500) }

  function updateClass(id, field, val) {
    setClasses(function(prev){ return prev.map(function(c){ return c.id===id ? Object.assign({},c,{[field]:val}) : c }) })
  }
  function updateFee(id, field, val) {
    setFees(function(prev){ return prev.map(function(f){ return f.id===id ? Object.assign({},f,{[field]:val}) : f }) })
  }
  function updateStream(id, field, val) {
    setStreams(function(prev){ return prev.map(function(s){ return s.id===id ? Object.assign({},s,{[field]:val}) : s }) })
  }
  function updateStreamSubject(id, idx, val) {
    setStreams(function(prev){ return prev.map(function(s){
      if(s.id!==id) return s
      var subs = s.subjects.slice(); subs[idx]=val
      return Object.assign({},s,{subjects:subs})
    })})
  }

  return (
    <div style={{maxWidth:'1100px'}}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px'}}>
        <div>
          <h1 style={{...s.h2, fontSize:'22px', marginBottom:'4px'}}>Academics Management</h1>
          <p style={{fontSize:'13px', color:'#B87832', margin:0}}>Edit streams, classes, fee structure and curriculum details</p>
        </div>
        <button onClick={handleSave}
          style={{padding:'10px 24px', borderRadius:'10px', border:'none', background: saved ? 'linear-gradient(135deg,#22a35a,#16a34a)' : 'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', fontSize:'13px', fontWeight:'800', cursor:'pointer', boxShadow: saved ? '0 4px 14px rgba(34,163,90,.3)' : '0 4px 14px rgba(232,118,26,.3)', transition:'all .25s'}}>
          {saved ? '✓ Saved!' : '💾 Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:'4px', marginBottom:'20px', background:'#fff', padding:'5px', borderRadius:'12px', border:'1.5px solid rgba(232,118,26,.12)', width:'fit-content', flexWrap:'wrap'}}>
        {TABS.map(function(t) {
          var active = tab === t
          return (
            <button key={t} onClick={function(){setTab(t)}}
              style={{padding:'8px 16px', borderRadius:'9px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight: active ? '800' : '600', background: active ? 'linear-gradient(135deg,#E8761A,#F5B800)' : 'transparent', color: active ? '#fff' : '#B87832', transition:'all .18s', boxShadow: active ? '0 3px 10px rgba(232,118,26,.3)' : 'none', whiteSpace:'nowrap'}}>
              {t}
            </button>
          )
        })}
      </div>

      {/* STREAMS TAB */}
      {tab === 'Streams (XI-XII)' && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'16px'}}>
          {streams.map(function(stream) {
            var isEdit = editStream === stream.id
            return (
              <div key={stream.id} style={{...s.card, padding:'20px', border:'1.5px solid '+(isEdit ? stream.clr+'55' : 'rgba(232,118,26,.12)')}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <div style={{width:'38px', height:'38px', borderRadius:'10px', background:stream.clr+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'}}>{stream.icon}</div>
                    <div style={{fontFamily:"'Playfair Display',serif", fontSize:'17px', fontWeight:'700', color:'#1C0A00'}}>{stream.name}</div>
                  </div>
                  <button onClick={function(){ setEditStream(isEdit ? null : stream.id) }}
                    style={{padding:'5px 12px', borderRadius:'7px', border:'1.5px solid '+(isEdit ? stream.clr+'55' : 'rgba(232,118,26,.2)'), background: isEdit ? stream.clr+'12' : 'transparent', color: isEdit ? stream.clr : '#B87832', fontSize:'11.5px', fontWeight:'800', cursor:'pointer'}}>
                    {isEdit ? '✓ Done' : '✏ Edit'}
                  </button>
                </div>

                {isEdit ? (
                  <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    <div>
                      <label style={s.label}>Description</label>
                      <textarea value={stream.description} rows={2}
                        onChange={function(e){ updateStream(stream.id,'description',e.target.value) }}
                        style={{...s.input, resize:'vertical', lineHeight:'1.5'}} />
                    </div>
                    <div>
                      <label style={s.label}>Eligibility</label>
                      <input value={stream.eligibility}
                        onChange={function(e){ updateStream(stream.id,'eligibility',e.target.value) }}
                        style={s.input} />
                    </div>
                    <div>
                      <label style={s.label}>Subjects</label>
                      {stream.subjects.map(function(sub, idx) {
                        return (
                          <input key={idx} value={sub}
                            onChange={function(e){ updateStreamSubject(stream.id, idx, e.target.value) }}
                            style={{...s.input, marginBottom:'5px'}} placeholder={'Subject '+(idx+1)} />
                        )
                      })}
                      <button
                        onClick={function(){ setStreams(function(prev){ return prev.map(function(s){ return s.id===stream.id ? Object.assign({},s,{subjects:s.subjects.concat([''])}) : s }) }) }}
                        style={{marginTop:'4px', padding:'6px 12px', borderRadius:'7px', border:'1.5px dashed rgba(232,118,26,.3)', background:'transparent', color:'#E8761A', fontSize:'11.5px', fontWeight:'700', cursor:'pointer'}}>
                        + Add Subject
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{fontSize:'12.5px', color:'#7A4010', marginBottom:'10px', lineHeight:'1.6'}}>{stream.description}</p>
                    <div style={{fontSize:'11.5px', color:'#B87832', marginBottom:'12px'}}>📋 {stream.eligibility}</div>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'5px'}}>
                      {stream.subjects.map(function(sub){ return (
                        <span key={sub} style={{fontSize:'11px', padding:'3px 9px', borderRadius:'50px', background:stream.clr+'12', color:stream.clr, fontWeight:'700'}}>{sub}</span>
                      )})}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* CLASSES TAB */}
      {tab === 'Classes & Sections' && (
        <div style={{...s.card, padding:'0', overflow:'hidden'}}>
          <div style={{padding:'16px 20px', borderBottom:'1px solid rgba(232,118,26,.1)', display:'flex', alignItems:'center', gap:'8px'}}>
            <div style={{width:'30px', height:'30px', borderRadius:'8px', background:'rgba(232,118,26,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>🏫</div>
            <div style={s.h2}>Classes & Sections</div>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#FFF6EA'}}>
                  {['Class', 'Age Group', 'No. of Students', 'No. of Sections'].map(function(h){
                    return <th key={h} style={{padding:'10px 16px', fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'.8px', textTransform:'uppercase', textAlign:'left', borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {classes.map(function(cls, i) {
                  return (
                    <tr key={cls.id} style={{borderBottom:'1px solid rgba(232,118,26,.06)', background: i%2===0 ? '#fff' : '#FFFDF8'}}>
                      <td style={{padding:'8px 16px', fontWeight:'700', fontSize:'13px', color:'#1C0A00'}}>{cls.name}</td>
                      <td style={{padding:'8px 16px'}}>
                        <input value={cls.age} onChange={function(e){updateClass(cls.id,'age',e.target.value)}} style={{...s.input, width:'120px', padding:'6px 10px', fontSize:'12.5px'}} />
                      </td>
                      <td style={{padding:'8px 16px'}}>
                        <input value={cls.students} onChange={function(e){updateClass(cls.id,'students',e.target.value)}} style={{...s.input, width:'80px', padding:'6px 10px', fontSize:'12.5px', textAlign:'center'}} />
                      </td>
                      <td style={{padding:'8px 16px'}}>
                        <input value={cls.sections} onChange={function(e){updateClass(cls.id,'sections',e.target.value)}} style={{...s.input, width:'60px', padding:'6px 10px', fontSize:'12.5px', textAlign:'center'}} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FEE STRUCTURE TAB */}
      {tab === 'Fee Structure' && (
        <div style={{...s.card, padding:'0', overflow:'hidden'}}>
          <div style={{padding:'16px 20px', borderBottom:'1px solid rgba(232,118,26,.1)', display:'flex', alignItems:'center', gap:'8px'}}>
            <div style={{width:'30px', height:'30px', borderRadius:'8px', background:'rgba(34,163,90,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>💰</div>
            <div style={s.h2}>Fee Structure (Monthly, in ₹)</div>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#FFF6EA'}}>
                  {['Category', 'Tuition Fee/mo', 'Annual Charges', 'Admission Fee', 'Transport/mo'].map(function(h){
                    return <th key={h} style={{padding:'10px 16px', fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'.8px', textTransform:'uppercase', textAlign:'left', borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {fees.map(function(fee, i) {
                  return (
                    <tr key={fee.id} style={{borderBottom:'1px solid rgba(232,118,26,.06)', background: i%2===0 ? '#fff' : '#FFFDF8'}}>
                      <td style={{padding:'8px 16px'}}>
                        <input value={fee.category} onChange={function(e){updateFee(fee.id,'category',e.target.value)}} style={{...s.input, width:'100%', padding:'6px 10px', fontSize:'12.5px'}} />
                      </td>
                      {['tuition','annual','admission','transport'].map(function(field){
                        return (
                          <td key={field} style={{padding:'8px 16px'}}>
                            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                              <span style={{fontSize:'12px', color:'#22a35a', fontWeight:'700'}}>₹</span>
                              <input value={fee[field]} onChange={function(e){updateFee(fee.id,field,e.target.value)}} style={{...s.input, width:'90px', padding:'6px 10px', fontSize:'12.5px', textAlign:'right'}} />
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:'12px 20px', borderTop:'1px solid rgba(232,118,26,.08)'}}>
            <button onClick={function(){ setFees(function(prev){ return prev.concat([{id:Date.now(),category:'',tuition:'',annual:'',admission:'',transport:''}]) }) }}
              style={{padding:'7px 16px', borderRadius:'8px', border:'1.5px dashed rgba(232,118,26,.3)', background:'transparent', color:'#E8761A', fontSize:'12px', fontWeight:'700', cursor:'pointer'}}>
              + Add Category
            </button>
          </div>
        </div>
      )}

      {/* CURRICULUM TAB */}
      {tab === 'Curriculum Info' && (
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div style={{...s.card, padding:'20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px'}}>
              <div style={{width:'30px', height:'30px', borderRadius:'8px', background:'rgba(108,63,197,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>📖</div>
              <div style={s.h2}>CBSE Curriculum Note</div>
            </div>
            <textarea value={curr.cbseNote} rows={3}
              onChange={function(e){ setCurr(function(p){ return Object.assign({},p,{cbseNote:e.target.value}) }) }}
              style={{...s.input, resize:'vertical', lineHeight:'1.6'}} />
          </div>

          <div style={{...s.card, padding:'20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px'}}>
              <div style={{width:'30px', height:'30px', borderRadius:'8px', background:'rgba(232,118,26,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>📝</div>
              <div style={s.h2}>Exam Pattern</div>
            </div>
            <textarea value={curr.examPattern} rows={2}
              onChange={function(e){ setCurr(function(p){ return Object.assign({},p,{examPattern:e.target.value}) }) }}
              style={{...s.input, resize:'vertical', lineHeight:'1.6'}} />
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            <div style={{...s.card, padding:'20px'}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px'}}>
                <div style={s.h2}>🎯 Co-curricular Activities</div>
              </div>
              {curr.activities.map(function(act, i) {
                return (
                  <div key={i} style={{display:'flex', gap:'6px', marginBottom:'6px', alignItems:'center'}}>
                    <span style={{color:'#E8761A', fontSize:'12px', flexShrink:0}}>◆</span>
                    <input value={act}
                      onChange={function(e){ setCurr(function(p){ var a=p.activities.slice(); a[i]=e.target.value; return Object.assign({},p,{activities:a}) }) }}
                      style={{...s.input, padding:'6px 10px', fontSize:'12.5px'}} />
                  </div>
                )
              })}
              <button onClick={function(){ setCurr(function(p){ return Object.assign({},p,{activities:p.activities.concat([''])}) }) }}
                style={{marginTop:'6px', padding:'6px 12px', borderRadius:'7px', border:'1.5px dashed rgba(232,118,26,.3)', background:'transparent', color:'#E8761A', fontSize:'11.5px', fontWeight:'700', cursor:'pointer'}}>
                + Add Activity
              </button>
            </div>

            <div style={{...s.card, padding:'20px'}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px'}}>
                <div style={s.h2}>🏆 Key Achievements</div>
              </div>
              {curr.achievements.map(function(ach, i) {
                return (
                  <div key={i} style={{display:'flex', gap:'6px', marginBottom:'6px', alignItems:'center'}}>
                    <span style={{color:'#22a35a', fontSize:'12px', flexShrink:0}}>◆</span>
                    <input value={ach}
                      onChange={function(e){ setCurr(function(p){ var a=p.achievements.slice(); a[i]=e.target.value; return Object.assign({},p,{achievements:a}) }) }}
                      style={{...s.input, padding:'6px 10px', fontSize:'12.5px'}} />
                  </div>
                )
              })}
              <button onClick={function(){ setCurr(function(p){ return Object.assign({},p,{achievements:p.achievements.concat([''])}) }) }}
                style={{marginTop:'6px', padding:'6px 12px', borderRadius:'7px', border:'1.5px dashed rgba(34,163,90,.3)', background:'transparent', color:'#22a35a', fontSize:'11.5px', fontWeight:'700', cursor:'pointer'}}>
                + Add Achievement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}