import { useState, useEffect } from 'react'
import { settingsAPI, siteStatusAPI, authAPI } from '../../api'
import { FaCog, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSpinner, FaSave, FaLock, FaGlobe, FaUser, FaLink } from 'react-icons/fa'

var TABS = ['Admission', 'Site Status', 'Security']

var INIT_ADMISSION = {
  open:        true,
  session:     '2026-27',
  classesFrom: 'Nursery',
  classesTo:   'Class XII',
  lastDate:    '30 Apr 2026',
  fee:         '500',
  notice:      'Admissions are open for the academic session 2026-27. Limited seats available.',
  showBanner:  true,
}

var STATUS_META = {
  live:        { label:'Live',        bg:'rgba(34,163,90,.12)',  clr:'#22a35a', icon:<FaCheckCircle size={12}/> },
  maintenance: { label:'Maintenance', bg:'rgba(245,184,0,.15)',  clr:'#C45F0A', icon:'🔧' },
  coming_soon: { label:'Coming Soon', bg:'rgba(108,63,197,.1)',  clr:'#6C3FC5', icon:'🔜' },
  offline:     { label:'Offline',     bg:'rgba(220,38,38,.1)',   clr:'#dc2626', icon:<FaTimesCircle size={12}/> },
}

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'28px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
  sec:   { marginBottom:'24px', paddingBottom:'24px', borderBottom:'1px solid rgba(232,118,26,.1)' },
  secHd: { fontFamily:"'Playfair Display',serif", fontSize:'15px', fontWeight:'700', color:'#1C0A00', margin:'0 0 16px' },
}

function inf(e) { e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e) { e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

function Field({ label, name, value, onChange, placeholder, type, full }) {
  return (
    <div style={full ? { gridColumn:'1/-1' } : {}}>
      <label style={s.label}>{label}</label>
      <input name={name} type={type||'text'} value={value||''} onChange={onChange} placeholder={placeholder||''} style={s.inp} onFocus={inf} onBlur={inb} />
    </div>
  )
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderRadius:'12px', background:'#FFF6EA', border:'1.5px solid rgba(232,118,26,.15)' }}>
      <div>
        <div style={{ fontSize:'13.5px', fontWeight:'700', color:'#1C0A00' }}>{label}</div>
        {desc && <div style={{ fontSize:'11.5px', color:'#B87832', marginTop:'2px' }}>{desc}</div>}
      </div>
      <div onClick={onChange} style={{ width:'46px', height:'26px', borderRadius:'13px', background:checked?'linear-gradient(135deg,#E8761A,#F5B800)':'rgba(184,120,50,.2)', cursor:'pointer', position:'relative', transition:'background .25s', flexShrink:0 }}>
        <div style={{ position:'absolute', top:'3px', left:checked?'23px':'3px', width:'20px', height:'20px', borderRadius:'50%', background:'#fff', boxShadow:'0 2px 6px rgba(0,0,0,.15)', transition:'left .25s' }} />
      </div>
    </div>
  )
}

export default function SettingsPage() {
  var user = JSON.parse(localStorage.getItem('spvs_admin') || '{}').username || 'spvs_admin'
  var [tab,          setTab]          = useState('Admission')
  var [admission,    setAdmission]    = useState(INIT_ADMISSION)
  var [pages,        setPages]        = useState([])
  var [pwForm,       setPwForm]       = useState({ current:'', newPw:'', confirm:'' })
  var [loading,      setLoading]      = useState(true)
  var [saving,       setSaving]       = useState(false)
  var [saved,        setSaved]        = useState(false)
  var [pagesSaving,  setPagesSaving]  = useState(false)
  var [pagesSaved,   setPagesSaved]   = useState(false)
  var [error,        setError]        = useState('')
  var [pagesError,   setPagesError]   = useState('')
  var [pwMsg,        setPwMsg]        = useState('')

  useEffect(function() {
    settingsAPI.getAll()
      .then(function(res) { var d = res.data || {}; if (d.admission) setAdmission(function(p) { return {...p, ...d.admission} }); setLoading(false) })
      .catch(function() { setLoading(false) })
    siteStatusAPI.getAll()
      .then(function(res) { if (res.data && res.data.length > 0) setPages(res.data) })
      .catch(function() {})
  }, [])

  function chgAdmission(e) { var k=e.target.name,v=e.target.value; setAdmission(function(p){ var n={...p}; n[k]=v; return n }) }
  function updatePageStatus(id, status) { setPages(function(prev){ return prev.map(function(p){ return p._id === id ? {...p, status} : p }) }) }

  async function handleSaveAdmission() {
    setSaving(true); setError('')
    try { await settingsAPI.save({ admission }); setSaved(true); setTimeout(function() { setSaved(false) }, 3000) }
    catch (err) { setError(err.message || 'Failed to save settings') }
    finally { setSaving(false) }
  }

  async function handleSavePageStatus() {
    setPagesSaving(true); setPagesError('')
    try { await siteStatusAPI.updateAll({ pages }); setPagesSaved(true); setTimeout(function() { setPagesSaved(false) }, 2500) }
    catch (err) { setPagesError(err.message || 'Failed to save page status') }
    finally { setPagesSaving(false) }
  }

  async function handlePw() {
    if (!pwForm.current || !pwForm.newPw) { setPwMsg('error:Please fill all fields'); return }
    if (pwForm.newPw !== pwForm.confirm)  { setPwMsg('error:Passwords do not match'); return }
    if (pwForm.newPw.length < 8)          { setPwMsg('error:Password must be at least 8 characters'); return }
    try {
      await authAPI.changePassword({ currentPassword: pwForm.current, newPassword: pwForm.newPw })
      setPwMsg('success:Password updated successfully!'); setPwForm({ current:'', newPw:'', confirm:'' })
      setTimeout(function() { setPwMsg('') }, 3000)
    } catch (err) { setPwMsg('error:' + (err.message || 'Failed to update password')) }
  }

  var saveBg   = saved ? 'linear-gradient(135deg,#22a35a,#16a34a)' : 'linear-gradient(135deg,#E8761A,#F5B800)'
  var pgSaveBg = pagesSaved ? 'linear-gradient(135deg,#22a35a,#16a34a)' : 'linear-gradient(135deg,#E8761A,#F5B800)'

  return (
    <div style={{ maxWidth:'900px' }}>
      <style>{`
        @keyframes spin { to{transform:rotate(360deg)} }
        .sp-g2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .dp-page-row { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:9px 12px; border-radius:10px; border:1.5px solid rgba(232,118,26,.1); background:#FFF6EA; transition:all .15s; }
        .dp-page-left { display:flex; align-items:center; gap:8px; flex:1; min-width:0; }
        .dp-page-right { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        @media (max-width:600px) { .sp-g2 { grid-template-columns:1fr; } }
        @media (max-width:480px) { .dp-page-row { flex-wrap:wrap; gap:6px; } .dp-page-left { min-width:100%; } .dp-page-right { width:100%; justify-content:flex-end; } }
      `}</style>

      <div style={{ marginBottom:'24px' }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(20px,4vw,26px)', fontWeight:'700', color:'#1C0A00', margin:'0 0 5px', display:'inline-flex', alignItems:'center', gap:'10px' }}>
          <FaCog size={22} color="#E8761A"/> Settings
        </h1>
        <p style={{ fontSize:'13px', color:'#7A4010', margin:0 }}>Manage admission settings, site page status, and security</p>
      </div>

      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'22px' }}>
        {TABS.map(function(t) {
          var isA = tab === t
          return (
            <button key={t} onClick={function() { setTab(t) }}
              style={{ padding:'9px 18px', borderRadius:'10px', border:'1.5px solid', borderColor:isA?'#E8761A':'rgba(232,118,26,.2)', background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFFFF', color:isA?'#fff':'#7A4010', fontSize:'13px', fontWeight:'700', cursor:'pointer', transition:'all .2s', boxShadow:isA?'0 4px 14px rgba(232,118,26,.25)':'none', display:'inline-flex', alignItems:'center', gap:'7px' }}>
              {t==='Admission' ? <FaUser size={13}/> : t==='Site Status' ? <FaGlobe size={13}/> : <FaLock size={13}/>} {t}
            </button>
          )
        })}
      </div>

      {error && (
        <div style={{ padding:'10px 14px', borderRadius:'10px', background:'rgba(220,38,38,.08)', border:'1.5px solid rgba(220,38,38,.2)', color:'#dc2626', fontSize:'13px', fontWeight:'700', marginBottom:'14px', display:'inline-flex', alignItems:'center', gap:'7px', width:'100%', boxSizing:'border-box' }}>
          <FaExclamationTriangle size={13}/> {error}
        </div>
      )}

      {tab === 'Admission' && (
        <div>
          {loading ? (
            <div style={{ textAlign:'center', padding:'40px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
              <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading settings...
            </div>
          ) : (
            <div style={s.card}>
              <div style={s.sec}>
                <div style={{...s.secHd, display:'inline-flex', alignItems:'center', gap:'8px'}}><FaUser size={15} color="#E8761A"/> Admission Settings</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'16px' }}>
                  <Toggle label="Admissions Open" desc="Show 'Admissions Open' banner on website" checked={admission.open} onChange={function() { setAdmission(function(p) { return {...p, open:!p.open} }) }} />
                  <Toggle label="Show Admission Banner" desc="Display CTA banner across all public pages" checked={admission.showBanner} onChange={function() { setAdmission(function(p) { return {...p, showBanner:!p.showBanner} }) }} />
                </div>
                <div className="sp-g2">
                  <Field label="Current Session"     name="session"     value={admission.session}     onChange={chgAdmission} />
                  <Field label="Last Date to Apply"  name="lastDate"    value={admission.lastDate}    onChange={chgAdmission} />
                  <Field label="Classes From"        name="classesFrom" value={admission.classesFrom} onChange={chgAdmission} />
                  <Field label="Classes To"          name="classesTo"   value={admission.classesTo}   onChange={chgAdmission} />
                  <Field label="Application Fee (₹)" name="fee"         value={admission.fee}         onChange={chgAdmission} />
                </div>
                <div style={{ marginTop:'14px' }}>
                  <label style={s.label}>Admission Notice Text</label>
                  <textarea name="notice" value={admission.notice||''} onChange={chgAdmission} rows={3} style={{ ...s.inp, resize:'vertical' }} onFocus={inf} onBlur={inb} />
                </div>
              </div>
            </div>
          )}
          {!loading && (
            <div style={{ marginTop:'22px', display:'flex', justifyContent:'flex-end' }}>
              <button onClick={handleSaveAdmission} disabled={saving}
                style={{ ...s.btn, background:saveBg, color:'#fff', boxShadow:'0 6px 20px rgba(232,118,26,.3)', padding:'13px 32px', fontSize:'14px', opacity:saving?0.7:1, display:'inline-flex', alignItems:'center', gap:'7px' }}>
                {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : saved ? <><FaCheckCircle size={13}/> Saved!</> : <><FaSave size={13}/> Save & Go Live</>}
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'Site Status' && (
        <div style={s.card}>
          <div style={{...s.secHd, display:'inline-flex', alignItems:'center', gap:'8px'}}><FaGlobe size={15} color="#E8761A"/> Site Pages Status</div>
          <p style={{ fontSize:'12.5px', color:'#7A4010', marginBottom:'16px', marginTop:'-8px' }}>
            Set any page to Maintenance, Coming Soon, or Offline. Changes are saved to DB and reflect on the public website instantly.
          </p>
          {pagesError && (
            <div style={{ marginBottom:'12px', padding:'10px 14px', borderRadius:'10px', background:'rgba(220,38,38,.08)', border:'1.5px solid rgba(220,38,38,.2)', color:'#dc2626', fontSize:'13px', fontWeight:'700', display:'inline-flex', alignItems:'center', gap:'7px', width:'100%', boxSizing:'border-box' }}>
              <FaExclamationTriangle size={13}/> {pagesError}
            </div>
          )}
          {pages.length === 0 ? (
            <div style={{ textAlign:'center', padding:'30px', color:'#B87832', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
              <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading pages...
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'6px', maxHeight:'480px', overflowY:'auto' }}>
              {pages.map(function(p) {
                var sm = STATUS_META[p.status] || STATUS_META.live
                return (
                  <div key={p._id} className="dp-page-row"
                    onMouseEnter={function(e){ e.currentTarget.style.background='#FEF0D4'; e.currentTarget.style.borderColor='rgba(232,118,26,.25)' }}
                    onMouseLeave={function(e){ e.currentTarget.style.background='#FFF6EA'; e.currentTarget.style.borderColor='rgba(232,118,26,.1)' }}>
                    <div className="dp-page-left">
                      <span style={{ fontSize:'12px', color:sm.clr }}>{sm.icon}</span>
                      <span style={{ fontSize:'12px', color:'#1C0A00', fontWeight:'700', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</span>
                      <span style={{ fontSize:'10.5px', color:'#B87832', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flexShrink:1 }}>{p.path}</span>
                    </div>
                    <div className="dp-page-right">
                      <span style={{ padding:'2px 9px', borderRadius:'20px', fontSize:'10px', fontWeight:'800', background:sm.bg, color:sm.clr, whiteSpace:'nowrap' }}>{sm.label}</span>
                      <select value={p.status} onChange={function(e) { updatePageStatus(p._id, e.target.value) }}
                        style={{ padding:'4px 6px', borderRadius:'7px', border:'1.5px solid rgba(232,118,26,.2)', background:'#fff', color:'#7A4010', fontSize:'11px', fontWeight:'700', cursor:'pointer', outline:'none' }}>
                        <option value="live">Live</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="coming_soon">Coming Soon</option>
                        <option value="offline">Offline</option>
                      </select>
                      <a href={p.path} target="_blank" rel="noreferrer"
                        style={{ width:'26px', height:'26px', borderRadius:'7px', border:'1.5px solid rgba(232,118,26,.2)', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', flexShrink:0 }}
                        onMouseEnter={function(e){ e.currentTarget.style.background='rgba(232,118,26,.1)' }}
                        onMouseLeave={function(e){ e.currentTarget.style.background='#fff' }}>
                        <FaLink size={11} color="#E8761A"/>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <div style={{ marginTop:'16px', display:'flex', justifyContent:'flex-end' }}>
            <button onClick={handleSavePageStatus} disabled={pagesSaving}
              style={{ ...s.btn, background:pgSaveBg, color:'#fff', boxShadow:'0 6px 20px rgba(232,118,26,.3)', padding:'13px 32px', fontSize:'14px', opacity:pagesSaving?0.7:1, display:'inline-flex', alignItems:'center', gap:'7px' }}>
              {pagesSaving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : pagesSaved ? <><FaCheckCircle size={13}/> Saved!</> : <><FaSave size={13}/> Save Page Status</>}
            </button>
          </div>
        </div>
      )}

      {tab === 'Security' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div style={s.card}>
            <div style={{...s.secHd, display:'inline-flex', alignItems:'center', gap:'8px'}}><FaLock size={15} color="#E8761A"/> Change Password</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px', maxWidth:'420px' }}>
              {pwMsg && (
                <div style={{ padding:'10px 14px', borderRadius:'10px', fontSize:'13px', fontWeight:'700', background:pwMsg.startsWith('success')?'rgba(34,163,90,.1)':'rgba(220,38,38,.08)', border:'1.5px solid', borderColor:pwMsg.startsWith('success')?'rgba(34,163,90,.25)':'rgba(220,38,38,.2)', color:pwMsg.startsWith('success')?'#22a35a':'#dc2626', display:'inline-flex', alignItems:'center', gap:'7px' }}>
                  {pwMsg.startsWith('success') ? <FaCheckCircle size={13}/> : <FaExclamationTriangle size={13}/>} {pwMsg.split(':')[1]}
                </div>
              )}
              <div><label style={s.label}>Current Password</label><input type="password" value={pwForm.current} onChange={function(e){ var v=e.target.value; setPwForm(function(p){return{...p,current:v}}) }} style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div><label style={s.label}>New Password</label><input type="password" value={pwForm.newPw} onChange={function(e){ var v=e.target.value; setPwForm(function(p){return{...p,newPw:v}}) }} style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div><label style={s.label}>Confirm New Password</label><input type="password" value={pwForm.confirm} onChange={function(e){ var v=e.target.value; setPwForm(function(p){return{...p,confirm:v}}) }} style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <button onClick={handlePw}
                style={{ ...s.btn, background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', boxShadow:'0 4px 14px rgba(232,118,26,.3)', alignSelf:'flex-start', padding:'12px 24px', display:'inline-flex', alignItems:'center', gap:'7px' }}>
                <FaLock size={13}/> Update Password
              </button>
            </div>
          </div>

          <div style={s.card}>
            <div style={{...s.secHd, display:'inline-flex', alignItems:'center', gap:'8px'}}><FaUser size={15} color="#E8761A"/> Admin Account Info</div>
            <div className="sp-g2" style={{ maxWidth:'480px' }}>
              {[['Username', user], ['Role', 'Super Admin'], ['Session', '8 hours token']].map(function(row) {
                return (
                  <div key={row[0]} style={{ padding:'12px 16px', borderRadius:'11px', background:'#FFF6EA', border:'1.5px solid rgba(232,118,26,.15)' }}>
                    <div style={{ fontSize:'11px', fontWeight:'800', color:'#B87832', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'5px' }}>{row[0]}</div>
                    <div style={{ fontSize:'15px', fontWeight:'700', color:'#1C0A00' }}>{row[1]}</div>
                  </div>
                )
              })}
              <div style={{ padding:'12px 16px', borderRadius:'11px', background:'rgba(34,163,90,.06)', border:'1.5px solid rgba(34,163,90,.2)' }}>
                <div style={{ fontSize:'11px', fontWeight:'800', color:'#22a35a', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'5px' }}>Status</div>
                <div style={{ fontSize:'14px', fontWeight:'700', color:'#22a35a', display:'inline-flex', alignItems:'center', gap:'6px' }}><FaCheckCircle size={13}/> Active</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}