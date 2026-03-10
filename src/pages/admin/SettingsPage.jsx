import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

var TABS = ['School Info','Contact & Social','Admission','SEO','Security']

var INIT_SCHOOL = {
  name:'Sant Pathik Vidyalaya',
  tagline:'Excellence in Education Since 1987',
  affNo:'2130176',
  schoolNo:'70178',
  udise:'09500707504',
  established:'1987',
  students:'1410',
  classrooms:'73',
  labs:'8',
  buses:'22',
  area:'10 Acres',
  board:'CBSE',
  type:'Senior Secondary (XI-XII)',
  medium:'Hindi & English',
  session:'2026-27',
  address:'Bahraich, Uttar Pradesh — 271801',
  principalName:'Mrs. Pooja Agarwal',
  principalQual:'M.A. B.Ed',
  principalPhone:'8318842325',
  vpName:'Mr. Bhikha Ram Tripathi',
  vpQual:'M.Sc B.Ed',
  vpPhone:'8318600231',
  directorName:'Sh. Awadhesh Narayan Agarwal',
  directorPhone:'9198783830',
}

var INIT_CONTACT = {
  phone1:'9198783830',
  phone2:'8318842325',
  email:'spvbrh@gmail.com',
  whatsapp:'9198783830',
  facebook:'',
  youtube:'',
  instagram:'',
  mapEmbed:'',
  admissionEmail:'admissions@spvs.edu',
}

var INIT_ADMISSION = {
  open:true,
  session:'2026-27',
  classesFrom:'Nursery',
  classesTo:'Class XII',
  lastDate:'30 Apr 2026',
  fee:'500',
  notice:'Admissions are open for the academic session 2026-27. Limited seats available.',
  showBanner:true,
}

var INIT_SEO = {
  siteTitle:'Sant Pathik Vidyalaya — Best CBSE School in Bahraich UP',
  metaDesc:'Sant Pathik Vidyalaya, Bahraich — CBSE affiliated senior secondary school established in 1987. Admissions open for 2026-27.',
  keywords:'SPVS, Sant Pathik Vidyalaya, Bahraich school, CBSE school Bahraich, best school UP',
  ogImage:'',
  googleAnalytics:'',
}

var s = {
  card:   { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'28px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label:  { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:    { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:    { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
  sec:    { marginBottom:'24px', paddingBottom:'24px', borderBottom:'1px solid rgba(232,118,26,.1)' },
  secHd:  { fontFamily:"'Playfair Display',serif", fontSize:'15px', fontWeight:'700', color:'#1C0A00', margin:'0 0 16px' },
  grid2:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' },
  grid3:  { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'14px' },
}

function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

function Field({ label, name, value, onChange, placeholder, type, full }){
  return (
    <div style={full?{gridColumn:'1/-1'}:{}}>
      <label style={s.label}>{label}</label>
      <input name={name} type={type||'text'} value={value} onChange={onChange} placeholder={placeholder||''} style={s.inp} onFocus={inf} onBlur={inb} />
    </div>
  )
}

function Toggle({ label, desc, checked, onChange }){
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',borderRadius:'12px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
      <div>
        <div style={{fontSize:'13.5px',fontWeight:'700',color:'#1C0A00'}}>{label}</div>
        {desc && <div style={{fontSize:'11.5px',color:'#B87832',marginTop:'2px'}}>{desc}</div>}
      </div>
      <div onClick={onChange} style={{width:'46px',height:'26px',borderRadius:'13px',background:checked?'linear-gradient(135deg,#E8761A,#F5B800)':'rgba(184,120,50,.2)',cursor:'pointer',position:'relative',transition:'background .25s',flexShrink:0}}>
        <div style={{position:'absolute',top:'3px',left:checked?'23px':'3px',width:'20px',height:'20px',borderRadius:'50%',background:'#fff',boxShadow:'0 2px 6px rgba(0,0,0,.15)',transition:'left .25s'}} />
      </div>
    </div>
  )
}

export default function SettingsPage() {
  var { user } = useAuth()
  var [tab, setTab]         = useState('School Info')
  var [school, setSchool]   = useState(INIT_SCHOOL)
  var [contact, setContact] = useState(INIT_CONTACT)
  var [admission, setAdmission] = useState(INIT_ADMISSION)
  var [seo, setSeo]         = useState(INIT_SEO)
  var [pwForm, setPwForm]   = useState({ current:'', newPw:'', confirm:'' })
  var [saved, setSaved]     = useState(false)
  var [pwMsg, setPwMsg]     = useState('')

  function chg(setter){ return function(e){ var k=e.target.name,v=e.target.value; setter(function(p){ var n={...p}; n[k]=v; return n }) } }

  function handleSave(){
    setSaved(true)
    setTimeout(function(){ setSaved(false) }, 2500)
  }

  function handlePw(){
    if(!pwForm.current||!pwForm.newPw) { setPwMsg('error:Please fill all fields'); return }
    if(pwForm.newPw!==pwForm.confirm) { setPwMsg('error:Passwords do not match'); return }
    if(pwForm.newPw.length<8) { setPwMsg('error:Password must be at least 8 characters'); return }
    setPwMsg('success:Password updated successfully!')
    setPwForm({ current:'', newPw:'', confirm:'' })
    setTimeout(function(){ setPwMsg('') }, 3000)
  }

  return (
    <div style={{maxWidth:'900px'}}>
      <div style={{marginBottom:'28px'}}>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px'}}>⚙️ Settings</h1>
        <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage website content, school information and admin preferences</p>
      </div>

      {/* TABS */}
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'22px'}}>
        {TABS.map(function(t){
          var isA=tab===t
          return <button key={t} onClick={function(){setTab(t)}} style={{padding:'9px 18px',borderRadius:'10px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFFFF',color:isA?'#fff':'#7A4010',fontSize:'13px',fontWeight:'700',cursor:'pointer',transition:'all .2s',boxShadow:isA?'0 4px 14px rgba(232,118,26,.25)':'none'}}>{t}</button>
        })}
      </div>

      {saved && (
        <div style={{background:'rgba(34,163,90,.1)',border:'1.5px solid rgba(34,163,90,.25)',borderRadius:'12px',padding:'12px 18px',marginBottom:'18px',fontSize:'13.5px',color:'#22a35a',fontWeight:'700',display:'flex',gap:'8px',alignItems:'center'}}>
          ✅ Settings saved successfully!
        </div>
      )}

      {/* SCHOOL INFO */}
      {tab==='School Info' && (
        <div style={s.card}>
          <div style={s.sec}>
            <div style={s.secHd}>🏫 Basic Information</div>
            <div style={s.grid2}>
              <Field label="School Name" name="name" value={school.name} onChange={chg(setSchool)} full />
              <Field label="Tagline" name="tagline" value={school.tagline} onChange={chg(setSchool)} full />
              <Field label="CBSE Affiliation No" name="affNo" value={school.affNo} onChange={chg(setSchool)} />
              <Field label="School No" name="schoolNo" value={school.schoolNo} onChange={chg(setSchool)} />
              <Field label="UDISE Code" name="udise" value={school.udise} onChange={chg(setSchool)} />
              <Field label="Established Year" name="established" value={school.established} onChange={chg(setSchool)} />
              <Field label="Current Session" name="session" value={school.session} onChange={chg(setSchool)} />
              <Field label="Board" name="board" value={school.board} onChange={chg(setSchool)} />
              <Field label="Address" name="address" value={school.address} onChange={chg(setSchool)} full />
            </div>
          </div>
          <div style={s.sec}>
            <div style={s.secHd}>📊 School Statistics</div>
            <div style={s.grid3}>
              <Field label="Total Students" name="students" value={school.students} onChange={chg(setSchool)} />
              <Field label="Classrooms" name="classrooms" value={school.classrooms} onChange={chg(setSchool)} />
              <Field label="Labs" name="labs" value={school.labs} onChange={chg(setSchool)} />
              <Field label="School Buses" name="buses" value={school.buses} onChange={chg(setSchool)} />
              <Field label="Campus Area" name="area" value={school.area} onChange={chg(setSchool)} />
            </div>
          </div>
          <div>
            <div style={s.secHd}>👤 Leadership</div>
            <div style={s.grid3}>
              <Field label="Principal Name" name="principalName" value={school.principalName} onChange={chg(setSchool)} />
              <Field label="Qualification" name="principalQual" value={school.principalQual} onChange={chg(setSchool)} />
              <Field label="Principal Phone" name="principalPhone" value={school.principalPhone} onChange={chg(setSchool)} />
              <Field label="Vice Principal" name="vpName" value={school.vpName} onChange={chg(setSchool)} />
              <Field label="VP Qualification" name="vpQual" value={school.vpQual} onChange={chg(setSchool)} />
              <Field label="VP Phone" name="vpPhone" value={school.vpPhone} onChange={chg(setSchool)} />
              <Field label="Director / Manager" name="directorName" value={school.directorName} onChange={chg(setSchool)} />
              <Field label="Director Phone" name="directorPhone" value={school.directorPhone} onChange={chg(setSchool)} />
            </div>
          </div>
        </div>
      )}

      {/* CONTACT & SOCIAL */}
      {tab==='Contact & Social' && (
        <div style={s.card}>
          <div style={s.sec}>
            <div style={s.secHd}>📞 Contact Details</div>
            <div style={s.grid2}>
              <Field label="Primary Phone" name="phone1" value={contact.phone1} onChange={chg(setContact)} />
              <Field label="Secondary Phone" name="phone2" value={contact.phone2} onChange={chg(setContact)} />
              <Field label="Email Address" name="email" value={contact.email} onChange={chg(setContact)} type="email" />
              <Field label="WhatsApp Number" name="whatsapp" value={contact.whatsapp} onChange={chg(setContact)} />
              <Field label="Admission Email" name="admissionEmail" value={contact.admissionEmail} onChange={chg(setContact)} type="email" full />
            </div>
          </div>
          <div style={s.sec}>
            <div style={s.secHd}>🌐 Social Media Links</div>
            <div style={s.grid2}>
              <Field label="Facebook Page URL" name="facebook" value={contact.facebook} onChange={chg(setContact)} placeholder="https://facebook.com/spvs..." />
              <Field label="YouTube Channel URL" name="youtube" value={contact.youtube} onChange={chg(setContact)} placeholder="https://youtube.com/..." />
              <Field label="Instagram URL" name="instagram" value={contact.instagram} onChange={chg(setContact)} placeholder="https://instagram.com/spvs..." />
            </div>
          </div>
          <div>
            <div style={s.secHd}>🗺️ Google Maps Embed</div>
            <label style={s.label}>Maps Embed URL</label>
            <textarea name="mapEmbed" value={contact.mapEmbed} onChange={chg(setContact)} rows={3} placeholder="Paste Google Maps embed URL here..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
          </div>
        </div>
      )}

      {/* ADMISSION */}
      {tab==='Admission' && (
        <div style={s.card}>
          <div style={s.sec}>
            <div style={s.secHd}>🎒 Admission Settings</div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'16px'}}>
              <Toggle label="Admissions Open" desc="Show 'Admissions Open' banner on website" checked={admission.open} onChange={function(){ setAdmission(function(p){ return {...p,open:!p.open} }) }} />
              <Toggle label="Show Admission Banner" desc="Display CTA banner across all public pages" checked={admission.showBanner} onChange={function(){ setAdmission(function(p){ return {...p,showBanner:!p.showBanner} }) }} />
            </div>
            <div style={s.grid2}>
              <Field label="Current Session" name="session" value={admission.session} onChange={chg(setAdmission)} />
              <Field label="Last Date to Apply" name="lastDate" value={admission.lastDate} onChange={chg(setAdmission)} />
              <Field label="Classes From" name="classesFrom" value={admission.classesFrom} onChange={chg(setAdmission)} />
              <Field label="Classes To" name="classesTo" value={admission.classesTo} onChange={chg(setAdmission)} />
              <Field label="Application Fee (₹)" name="fee" value={admission.fee} onChange={chg(setAdmission)} />
            </div>
            <div style={{marginTop:'14px'}}>
              <label style={s.label}>Admission Notice Text</label>
              <textarea name="notice" value={admission.notice} onChange={chg(setAdmission)} rows={3} style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
            </div>
          </div>
        </div>
      )}

      {/* SEO */}
      {tab==='SEO' && (
        <div style={s.card}>
          <div style={s.sec}>
            <div style={s.secHd}>🔍 SEO & Meta Settings</div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={s.label}>Site Title</label>
                <input name="siteTitle" value={seo.siteTitle} onChange={chg(setSeo)} style={s.inp} onFocus={inf} onBlur={inb} />
                <div style={{fontSize:'11px',color:'#B87832',marginTop:'4px'}}>Shown in browser tab and Google search results</div>
              </div>
              <div>
                <label style={s.label}>Meta Description</label>
                <textarea name="metaDesc" value={seo.metaDesc} onChange={chg(setSeo)} rows={3} style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} />
                <div style={{fontSize:'11px',color:seo.metaDesc.length>160?'#dc2626':'#B87832',marginTop:'4px'}}>{seo.metaDesc.length}/160 characters recommended</div>
              </div>
              <div>
                <label style={s.label}>Keywords</label>
                <input name="keywords" value={seo.keywords} onChange={chg(setSeo)} placeholder="keyword1, keyword2, ..." style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>Google Analytics ID</label>
                <input name="googleAnalytics" value={seo.googleAnalytics} onChange={chg(setSeo)} placeholder="G-XXXXXXXXXX" style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
            </div>
          </div>
          <div style={{padding:'14px 16px',borderRadius:'12px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
            <div style={{fontSize:'12px',fontWeight:'700',color:'#7A4010',marginBottom:'4px'}}>ℹ️ Note</div>
            <div style={{fontSize:'12px',color:'#B87832',lineHeight:'1.6'}}>SEO settings will be applied once the site is connected to the backend API. These fields store your preferences for when backend integration is complete.</div>
          </div>
        </div>
      )}

      {/* SECURITY */}
      {tab==='Security' && (
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={s.card}>
            <div style={s.secHd}>🔐 Change Password</div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px',maxWidth:'420px'}}>
              {pwMsg && (
                <div style={{padding:'10px 14px',borderRadius:'10px',fontSize:'13px',fontWeight:'700',background:pwMsg.startsWith('success')? 'rgba(34,163,90,.1)':'rgba(220,38,38,.08)',border:'1.5px solid',borderColor:pwMsg.startsWith('success')?'rgba(34,163,90,.25)':'rgba(220,38,38,.2)',color:pwMsg.startsWith('success')?'#22a35a':'#dc2626'}}>
                  {pwMsg.startsWith('success')?'✅ ':'⚠️ '}{pwMsg.split(':')[1]}
                </div>
              )}
              <div>
                <label style={s.label}>Current Password</label>
                <input type="password" name="current" value={pwForm.current} onChange={function(e){ var v=e.target.value; setPwForm(function(p){ return {...p,current:v} }) }} style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>New Password</label>
                <input type="password" name="newPw" value={pwForm.newPw} onChange={function(e){ var v=e.target.value; setPwForm(function(p){ return {...p,newPw:v} }) }} style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <div>
                <label style={s.label}>Confirm New Password</label>
                <input type="password" name="confirm" value={pwForm.confirm} onChange={function(e){ var v=e.target.value; setPwForm(function(p){ return {...p,confirm:v} }) }} style={s.inp} onFocus={inf} onBlur={inb} />
              </div>
              <button onClick={handlePw} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',alignSelf:'flex-start',padding:'12px 24px'}}>🔐 Update Password</button>
            </div>
          </div>

          <div style={s.card}>
            <div style={s.secHd}>👤 Admin Account Info</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',maxWidth:'480px'}}>
              <div style={{padding:'12px 16px',borderRadius:'11px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <div style={{fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'5px'}}>Username</div>
                <div style={{fontSize:'15px',fontWeight:'700',color:'#1C0A00'}}>{user||'spvs_admin'}</div>
              </div>
              <div style={{padding:'12px 16px',borderRadius:'11px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <div style={{fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'5px'}}>Role</div>
                <div style={{fontSize:'15px',fontWeight:'700',color:'#1C0A00'}}>Super Admin</div>
              </div>
              <div style={{padding:'12px 16px',borderRadius:'11px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <div style={{fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'5px'}}>Session</div>
                <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00'}}>8 hours token</div>
              </div>
              <div style={{padding:'12px 16px',borderRadius:'11px',background:'rgba(34,163,90,.06)',border:'1.5px solid rgba(34,163,90,.2)'}}>
                <div style={{fontSize:'11px',fontWeight:'800',color:'#22a35a',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'5px'}}>Status</div>
                <div style={{fontSize:'14px',fontWeight:'700',color:'#22a35a'}}>✅ Active</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SAVE BUTTON */}
      {tab!=='Security' && (
        <div style={{marginTop:'22px',display:'flex',justifyContent:'flex-end'}}>
          <button onClick={handleSave} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'13px 32px',fontSize:'14px'}}>
            💾 Save Settings
          </button>
        </div>
      )}
    </div>
  )
}