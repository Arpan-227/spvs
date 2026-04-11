import { useState, useEffect } from 'react'
import { resultAPI } from '../../api'
import { FaTrophy, FaChartBar, FaCheckCircle, FaFileAlt, FaPencilAlt, FaTrash, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'

var CLASSES  = ['Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII']
var SECTIONS = ['A','B','C','D','E']
var SESSIONS = ['2025-26','2024-25','2023-24','2022-23']

var DEFAULT_SUBJECTS_BY_CLASS = {
  'Class I':    ['English','Hindi','Mathematics','Environmental Studies','General Knowledge'],
  'Class II':   ['English','Hindi','Mathematics','Environmental Studies','General Knowledge'],
  'Class III':  ['English','Hindi','Mathematics','Environmental Studies','General Knowledge'],
  'Class IV':   ['English','Hindi','Mathematics','Environmental Studies','Social Science'],
  'Class V':    ['English','Hindi','Mathematics','Environmental Studies','Social Science'],
  'Class VI':   ['English','Hindi','Sanskrit','Mathematics','Science','Social Science'],
  'Class VII':  ['English','Hindi','Sanskrit','Mathematics','Science','Social Science'],
  'Class VIII': ['English','Hindi','Sanskrit','Mathematics','Science','Social Science'],
  'Class IX':   ['English','Hindi','Mathematics','Science','Social Science','Information Technology'],
  'Class X':    ['English','Hindi','Mathematics','Science','Social Science','Information Technology'],
  'Class XI':   ['English','Physics','Chemistry','Biology','Mathematics','Computer Science'],
  'Class XII':  ['English','Physics','Chemistry','Biology','Mathematics','Computer Science'],
}

var CO_SCHOLASTIC    = ['Art Education','Work Education','Health and Physical Education','Computer Education','General Knowledge','Holiday Home Work']
var CHARACTER_VALUES = ['Discipline','Honesty','Courtesy','Obedience','Cleanliness']
var GRADES_5         = ['A','B','C','D','E']

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'10px 13px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', outline:'none', boxSizing:'border-box' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700' },
}

function calcGrade(rawSum) {
  var r = Number(rawSum) || 0
  if (r >= 181) return 'A1'; if (r >= 161) return 'A2'; if (r >= 141) return 'B1'
  if (r >= 121) return 'B2'; if (r >= 101) return 'C1'; if (r >= 81)  return 'C2'
  if (r >= 66)  return 'D'; return 'E'
}

function computeTotals(subjects) {
  var totalMax      = subjects.length * 100
  var totalObtained = subjects.reduce(function(sum, sub) { return sum + (Number(sub.marksObtained) || 0) }, 0)
  var pct = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) + '%' : ''
  return { totalMaxMarks: totalMax, totalMarks: totalObtained, percentage: pct }
}

function makeEmptyResult(cls) {
  var subjectNames = DEFAULT_SUBJECTS_BY_CLASS[cls] || DEFAULT_SUBJECTS_BY_CLASS['Class VI']
  return {
    admissionNo:'', rollNo:'', studentName:'', motherName:'', fatherName:'', dob:'',
    class: cls || 'Class VI', section:'A', session:'2024-25',
    subjects: subjectNames.map(function(name) {
      return { name, t1BestPT:0, t1NoteBook:0, t1SubjectEnrich:0, t1HalfYearly:0, t2BestPT:0, t2NoteBook:0, t2SubjectEnrich:0, t2Annual:0, maxMarks:100, marksObtained:0, grade:'' }
    }),
    coScholastic:    CO_SCHOLASTIC.map(function(a)    { return { activity:a, grade:'A' } }),
    characterValues: CHARACTER_VALUES.map(function(a) { return { activity:a, grade:'A' } }),
    totalMaxMarks:0, totalMarks:0, percentage:'', rank:'', result:'Pass', teacherRemarks:'', date:'', status:'Draft',
  }
}

export default function ManageResultsPage() {
  var [results,   setResults]   = useState([])
  var [loading,   setLoading]   = useState(true)
  var [modal,     setModal]     = useState(null)
  var [current,   setCurrent]   = useState(makeEmptyResult('Class VI'))
  var [editId,    setEditId]    = useState(null)
  var [delId,     setDelId]     = useState(null)
  var [saving,    setSaving]    = useState(false)
  var [saved,     setSaved]     = useState(false)
  var [error,     setError]     = useState('')
  var [search,    setSearch]    = useState('')
  var [filter,    setFilter]    = useState('All')
  var [activeTab, setActiveTab] = useState('info')

  useEffect(function() {
    resultAPI.getAll()
      .then(function(res) { setResults(res.data || []); setLoading(false) })
      .catch(function()   { setLoading(false) })
  }, [])

  var visible = results.filter(function(r) {
    var ms = filter === 'All' || r.status === filter || r.class === filter
    var mq = (r.studentName||'').toLowerCase().includes(search.toLowerCase()) || (r.admissionNo||'').toLowerCase().includes(search.toLowerCase())
    return ms && mq
  })

  function openAdd() { setCurrent(makeEmptyResult('Class VI')); setEditId(null); setModal('form'); setActiveTab('info'); setSaved(false); setError('') }
  function openEdit(r) { setCurrent({...r}); setEditId(r._id); setModal('form'); setActiveTab('info'); setSaved(false); setError('') }
  function closeModal() { setModal(null); setCurrent(makeEmptyResult('Class VI')); setEditId(null); setSaved(false); setError('') }

  function handleInfo(e) {
    var k = e.target.name, v = e.target.value
    setCurrent(function(p) {
      var n = {...p, [k]: v}
      if (k === 'class') {
        var subNames = DEFAULT_SUBJECTS_BY_CLASS[v] || DEFAULT_SUBJECTS_BY_CLASS['Class VI']
        n.subjects = subNames.map(function(name) {
          return { name, t1BestPT:0, t1NoteBook:0, t1SubjectEnrich:0, t1HalfYearly:0, t2BestPT:0, t2NoteBook:0, t2SubjectEnrich:0, t2Annual:0, maxMarks:100, marksObtained:0, grade:'' }
        })
        var totals = computeTotals(n.subjects)
        n.totalMaxMarks = totals.totalMaxMarks; n.totalMarks = totals.totalMarks; n.percentage = totals.percentage
      }
      return n
    })
  }

  function handleSubject(idx, field, val) {
    setCurrent(function(p) {
      var subs = p.subjects.map(function(s, i) {
        if (i !== idx) return s
        var updated = {...s, [field]: val}
        var rawSum = Number(updated.t1BestPT||0)+Number(updated.t1NoteBook||0)+Number(updated.t1SubjectEnrich||0)+Number(updated.t1HalfYearly||0)+Number(updated.t2BestPT||0)+Number(updated.t2NoteBook||0)+Number(updated.t2SubjectEnrich||0)+Number(updated.t2Annual||0)
        updated.marksObtained = Math.round(rawSum / 2); updated.maxMarks = 100; updated.grade = calcGrade(rawSum)
        return updated
      })
      var totals = computeTotals(subs)
      return {...p, subjects: subs, ...totals}
    })
  }

  function handleCoScholastic(idx, val) { setCurrent(function(p) { var arr = p.coScholastic.map(function(c, i) { return i === idx ? {...c, grade: val} : c }); return {...p, coScholastic: arr} }) }
  function handleCharacter(idx, val) { setCurrent(function(p) { var arr = p.characterValues.map(function(c, i) { return i === idx ? {...c, grade: val} : c }); return {...p, characterValues: arr} }) }

  async function handleSave() {
    if (!current.admissionNo.trim() || !current.studentName.trim()) { setError('Admission number and student name are required'); setActiveTab('info'); return }
    setSaving(true); setError('')
    try {
      if (editId) {
        var res = await resultAPI.update(editId, current)
        setResults(function(p) { return p.map(function(r) { return r._id === editId ? res.data : r }) })
      } else {
        var res2 = await resultAPI.create(current)
        setResults(function(p) { return [res2.data, ...p] })
      }
      setSaved(true); setTimeout(closeModal, 1200)
    } catch (err) { setError(err.message || 'Save failed') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try { await resultAPI.delete(delId); setResults(function(p) { return p.filter(function(r) { return r._id !== delId }) }); closeModal() }
    catch (err) { setError(err.message) }
  }

  async function toggleStatus(r) {
    var newStatus = r.status === 'Published' ? 'Draft' : 'Published'
    try { var res = await resultAPI.update(r._id, {...r, status: newStatus}); setResults(function(p) { return p.map(function(x) { return x._id === r._id ? res.data : x }) }) }
    catch (err) {}
  }

  function tabStyle(t) {
    var isA = activeTab === t
    return { padding:'8px 16px', borderRadius:'8px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:isA?'800':'600', background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent', color:isA?'#fff':'#B87832', transition:'all .18s', whiteSpace:'nowrap' }
  }

  var STATS = [
    { label:'Total',     value:results.length, icon:<FaChartBar size={18} color="#E8761A"/>, clr:'#E8761A' },
    { label:'Published', value:results.filter(function(r){return r.status==='Published'}).length, icon:<FaCheckCircle size={18} color="#22a35a"/>, clr:'#22a35a' },
    { label:'Drafts',    value:results.filter(function(r){return r.status==='Draft'}).length, icon:<FaFileAlt size={18} color="#6C3FC5"/>, clr:'#6C3FC5' },
  ]

  return (
    <div style={{maxWidth:'1100px'}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px',display:'inline-flex',alignItems:'center',gap:'10px'}}>
            <FaTrophy size={22} color="#E8761A"/> Results Management
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Upload and manage student progress report cards</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 24px',fontSize:'14px'}}>+ Add Result</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px',marginBottom:'20px'}}>
        {STATS.map(function(st) {
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

      <div style={{...s.card,marginBottom:'16px',padding:'14px 18px'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search by name or admission no..."
            style={{...s.inp,width:'260px',padding:'9px 13px'}} />
          {['All','Published','Draft'].map(function(f) {
            var isA = filter === f
            return (
              <button key={f} onClick={function(){setFilter(f)}}
                style={{padding:'7px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>
                {f}
              </button>
            )
          })}
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'40px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/>
          </div>
        ) : (
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Adm. No','Name','Class','Session','Marks','%','Rank','Status','Actions'].map(function(h) {
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && <tr><td colSpan={9} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No results found</td></tr>}
                {visible.map(function(r, i) {
                  var rowBg = i%2===0 ? '#FFFFFF' : '#FFFDF8'
                  return (
                    <tr key={r._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:rowBg}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=rowBg}}>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#E8761A',fontSize:'13px'}}>{r.admissionNo}</td>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#1C0A00',fontSize:'13px'}}>{r.studentName}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#3D1A00'}}>{r.class} {r.section}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#7A4010'}}>{r.session}</td>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#1C0A00',textAlign:'center'}}>{r.totalMarks}/{r.totalMaxMarks}</td>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#22a35a',textAlign:'center'}}>{r.percentage}</td>
                      <td style={{padding:'10px 12px',fontWeight:'700',color:'#6C3FC5',textAlign:'center'}}>{r.rank || '—'}</td>
                      <td style={{padding:'10px 12px'}}>
                        <button onClick={function(){toggleStatus(r)}}
                          style={{padding:'4px 11px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:r.status==='Published'?'rgba(34,163,90,.12)':'rgba(108,63,197,.12)',color:r.status==='Published'?'#22a35a':'#6C3FC5',display:'inline-flex',alignItems:'center',gap:'4px'}}>
                          {r.status==='Published'?<><FaCheckCircle size={10}/> Published</>:<><FaFileAlt size={10}/> Draft</>}
                        </button>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(r)}}
                            style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>
                            <FaPencilAlt size={13} color="#7A4010"/>
                          </button>
                          <button onClick={function(){setDelId(r._id); setModal('delete')}}
                            style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
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
        )}
      </div>

      {modal === 'form' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}}
          onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',width:'100%',maxWidth:'860px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.25)'}}>
            <div style={{background:'linear-gradient(135deg,#E8761A,#F5B800)',padding:'18px 24px',borderRadius:'18px 18px 0 0',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#1C0A00',display:'inline-flex',alignItems:'center',gap:'8px'}}>
                {editId ? <><FaPencilAlt size={16}/> Edit Result</> : '+ Add Result'}
              </div>
              <button onClick={closeModal} style={{background:'rgba(0,0,0,.15)',border:'none',borderRadius:'8px',width:'32px',height:'32px',cursor:'pointer',fontSize:'16px',color:'#1C0A00',fontWeight:'700'}}>✕</button>
            </div>

            <div style={{padding:'22px 24px'}}>
              {error && <div style={{marginBottom:'14px',padding:'10px 14px',borderRadius:'10px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',color:'#dc2626',fontSize:'13px',fontWeight:'600',display:'inline-flex',alignItems:'center',gap:'7px',width:'100%',boxSizing:'border-box'}}><FaExclamationTriangle size={13}/> {error}</div>}
              {saved && <div style={{marginBottom:'14px',padding:'10px 14px',borderRadius:'10px',background:'rgba(34,163,90,.08)',border:'1px solid rgba(34,163,90,.2)',color:'#22a35a',fontSize:'13px',fontWeight:'600',display:'inline-flex',alignItems:'center',gap:'7px',width:'100%',boxSizing:'border-box'}}><FaCheckCircle size={13}/> Saved successfully!</div>}

              <div style={{display:'flex',gap:'4px',background:'#fff',padding:'4px',borderRadius:'10px',border:'1.5px solid rgba(232,118,26,.12)',width:'fit-content',marginBottom:'20px',flexWrap:'wrap'}}>
                {[['info','Student Info'],['marks','Marks'],['activities','Activities'],['meta','Meta']].map(function(t) {
                  return <button key={t[0]} onClick={function(){setActiveTab(t[0])}} style={tabStyle(t[0])}>{t[1]}</button>
                })}
              </div>

              {activeTab === 'info' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  {[
                    {label:'Admission Number *',name:'admissionNo',placeholder:'e.g. 9157'},
                    {label:'Roll Number',name:'rollNo',placeholder:'e.g. 3'},
                    {label:'Student Name *',name:'studentName',placeholder:'Full name as per records'},
                    {label:'Date of Birth *',name:'dob',type:'date'},
                    {label:"Father's Name",name:'fatherName',placeholder:"Father's full name"},
                    {label:"Mother's Name",name:'motherName',placeholder:"Mother's full name"},
                  ].map(function(f) {
                    return (<div key={f.name}><label style={s.label}>{f.label}</label><input name={f.name} type={f.type||'text'} value={current[f.name]||''} onChange={handleInfo} placeholder={f.placeholder||''} style={s.inp} /></div>)
                  })}
                  <div><label style={s.label}>Class</label><select name="class" value={current.class} onChange={handleInfo} style={s.inp}>{CLASSES.map(function(c){ return <option key={c}>{c}</option> })}</select></div>
                  <div><label style={s.label}>Section</label><select name="section" value={current.section} onChange={handleInfo} style={s.inp}>{SECTIONS.map(function(c){ return <option key={c}>{c}</option> })}</select></div>
                  <div><label style={s.label}>Session</label><select name="session" value={current.session} onChange={handleInfo} style={s.inp}>{SESSIONS.map(function(c){ return <option key={c}>{c}</option> })}</select></div>
                  <div><label style={s.label}>Status</label><select name="status" value={current.status} onChange={handleInfo} style={s.inp}><option>Draft</option><option>Published</option></select></div>
                </div>
              )}

              {activeTab === 'marks' && (
                <div>
                  <div style={{background:'rgba(232,118,26,.05)',border:'1.5px solid rgba(232,118,26,.15)',borderRadius:'12px',padding:'12px 16px',marginBottom:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:'800',color:'#B87832',marginBottom:'8px'}}>Grading System (out of 200 raw)</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                      {[['181–200','A1'],['161–180','A2'],['141–160','B1'],['121–140','B2'],['101–120','C1'],['81–100','C2'],['66–80','D'],['≤65','E']].map(function(g){
                        return <span key={g[1]} style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A'}}>{g[0]} → {g[1]}</span>
                      })}
                    </div>
                    <div style={{fontSize:'11.5px',color:'#7A4010',marginTop:'8px',fontWeight:'600'}}>Marks Obtained = Raw Sum ÷ 2 (displayed out of 100)</div>
                  </div>
                  <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px',minWidth:'800px'}}>
                      <thead>
                        <tr style={{background:'#FFF6EA'}}>
                          <th style={{padding:'8px',textAlign:'left',fontWeight:'800',color:'#1C0A00',borderBottom:'2px solid rgba(232,118,26,.15)',minWidth:'110px',fontSize:'12px'}}>Subject</th>
                          {['T1 PT (10)','T1 NB (5)','T1 SE (5)','Half Yearly (80)','T2 PT (10)','T2 NB (5)','T2 SE (5)','Annual (80)','Max (100)','Obtained (÷2)','Grade'].map(function(h){
                            return <th key={h} style={{padding:'8px',textAlign:'center',fontWeight:'800',color:'#7A4010',borderBottom:'2px solid rgba(232,118,26,.15)',fontSize:'11px'}}>{h}</th>
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {current.subjects.map(function(sub, idx) {
                          var rowBg = idx%2===0 ? '#fff' : '#FFFDF8'
                          return (
                            <tr key={idx} style={{borderBottom:'1px solid rgba(232,118,26,.06)',background:rowBg}}>
                              <td style={{padding:'6px 8px',fontWeight:'700',color:'#1C0A00',fontSize:'12.5px'}}>{sub.name}</td>
                              {['t1BestPT','t1NoteBook','t1SubjectEnrich','t1HalfYearly','t2BestPT','t2NoteBook','t2SubjectEnrich','t2Annual'].map(function(field) {
                                return (<td key={field} style={{padding:'3px'}}><input type="number" min="0" value={sub[field]||0} onChange={function(e){handleSubject(idx,field,e.target.value)}} style={{width:'50px',padding:'5px 4px',borderRadius:'6px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFFDF8',color:'#1C0A00',fontSize:'12px',textAlign:'center',outline:'none',fontFamily:"'DM Sans',sans-serif"}} /></td>)
                              })}
                              <td style={{padding:'6px 4px',textAlign:'center',fontWeight:'700',color:'#E8761A',fontSize:'13px'}}>100</td>
                              <td style={{padding:'6px 4px',textAlign:'center',fontWeight:'800',color:'#E8761A',fontSize:'14px'}}>{sub.marksObtained}</td>
                              <td style={{padding:'6px 4px',textAlign:'center'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A'}}>{sub.grade}</span></td>
                            </tr>
                          )
                        })}
                        <tr style={{background:'linear-gradient(135deg,#FFF6EA,#FEF0D4)',borderTop:'2px solid rgba(232,118,26,.2)'}}>
                          <td colSpan={9} style={{padding:'8px',fontWeight:'800',color:'#1C0A00',fontSize:'13px'}}>Total</td>
                          <td style={{padding:'8px',textAlign:'center',fontWeight:'800',color:'#E8761A',fontSize:'13px'}}>{current.totalMaxMarks}</td>
                          <td style={{padding:'8px',textAlign:'center',fontWeight:'800',color:'#22a35a',fontSize:'14px'}}>{current.totalMarks}</td>
                          <td style={{padding:'8px',textAlign:'center',fontWeight:'800',color:'#22a35a',fontSize:'13px'}}>{current.percentage}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{marginTop:'16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                    <div><label style={s.label}>Rank</label><input name="rank" value={current.rank||''} onChange={handleInfo} placeholder="e.g. 8" style={s.inp} /></div>
                    <div><label style={s.label}>Result</label><select name="result" value={current.result} onChange={handleInfo} style={s.inp}><option>Pass</option><option>Fail</option><option>Promoted</option></select></div>
                  </div>
                </div>
              )}

              {activeTab === 'activities' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'#1C0A00',marginBottom:'12px'}}>Co-Scholastic Area</div>
                    <div style={{background:'rgba(232,118,26,.04)',borderRadius:'12px',padding:'14px',border:'1.5px solid rgba(232,118,26,.1)'}}>
                      {current.coScholastic.map(function(c, idx) {
                        return (
                          <div key={idx} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 10px',borderRadius:'8px',marginBottom:'4px',background:idx%2===0?'transparent':'rgba(232,118,26,.04)'}}>
                            <span style={{fontSize:'13px',fontWeight:'600',color:'#1C0A00'}}>{c.activity}</span>
                            <select value={c.grade} onChange={function(e){handleCoScholastic(idx,e.target.value)}} style={{padding:'5px 10px',borderRadius:'7px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFFDF8',fontSize:'13px',fontWeight:'800',color:'#E8761A',outline:'none',cursor:'pointer'}}>
                              {GRADES_5.map(function(g){ return <option key={g}>{g}</option> })}
                            </select>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'#1C0A00',marginBottom:'12px'}}>Character Building Values</div>
                    <div style={{background:'rgba(108,63,197,.04)',borderRadius:'12px',padding:'14px',border:'1.5px solid rgba(108,63,197,.1)'}}>
                      {current.characterValues.map(function(c, idx) {
                        return (
                          <div key={idx} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 10px',borderRadius:'8px',marginBottom:'4px',background:idx%2===0?'transparent':'rgba(108,63,197,.04)'}}>
                            <span style={{fontSize:'13px',fontWeight:'600',color:'#1C0A00'}}>{c.activity}</span>
                            <select value={c.grade} onChange={function(e){handleCharacter(idx,e.target.value)}} style={{padding:'5px 10px',borderRadius:'7px',border:'1.5px solid rgba(108,63,197,.2)',background:'#FFFDF8',fontSize:'13px',fontWeight:'800',color:'#6C3FC5',outline:'none',cursor:'pointer'}}>
                              {GRADES_5.map(function(g){ return <option key={g}>{g}</option> })}
                            </select>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'meta' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  <div style={{gridColumn:'1/-1'}}><label style={s.label}>Class Teacher's Remarks</label><textarea name="teacherRemarks" value={current.teacherRemarks||''} onChange={handleInfo} rows={3} style={{...s.inp,resize:'vertical',lineHeight:'1.6'}} placeholder="e.g. Excellent performance, keep it up!" /></div>
                  <div><label style={s.label}>Date of Issue</label><input name="date" type="date" value={current.date||''} onChange={handleInfo} style={s.inp} /></div>
                  <div><label style={s.label}>Status</label><select name="status" value={current.status} onChange={handleInfo} style={s.inp}><option>Draft</option><option>Published</option></select></div>
                </div>
              )}
            </div>

            <div style={{padding:'16px 24px 20px',borderTop:'1px solid rgba(232,118,26,.1)',display:'flex',gap:'10px',justifyContent:'flex-end',position:'sticky',bottom:0,background:'#FFFDF8',borderRadius:'0 0 20px 20px'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving}
                style={{...s.btn,background:saving?'#ccc':'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?0.7:1,padding:'10px 28px',display:'inline-flex',alignItems:'center',gap:'7px'}}>
                {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : editId ? 'Save Changes' : '+ Add Result'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 'delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}
          onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',padding:'30px',width:'100%',maxWidth:'380px',textAlign:'center',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <FaTrash size={48} color="#dc2626" style={{marginBottom:'14px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Result?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 22px'}}>This result will be permanently deleted from the database.</p>
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