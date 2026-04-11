import { useState } from 'react'
import { jobAppAPI } from '../../api'
import { FaPhone, FaCheckCircle, FaExclamationTriangle, FaPaperclip, FaFileAlt, FaPaperPlane, FaSpinner, FaGift } from 'react-icons/fa'

export default function JobApplyForm({ job, onClose }) {
  var [form, setForm]             = useState({ name:'', phone:'', email:'', qual:'', exp:'', message:'' })
  var [resume, setResume]         = useState(null)
  var [resumeName, setResumeName] = useState('')
  var [sent, setSent]             = useState(false)
  var [loading, setLoading]       = useState(false)
  var [error, setError]           = useState('')

  function handleChange(e) {
    var key=e.target.name, val=e.target.value
    setForm(function(prev){ var n={}; for(var k in prev) n[k]=prev[k]; n[key]=val; return n })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!resume) { setError('Please upload your Resume / CV'); return }
    setLoading(true)
    try {
      var fd = new FormData()
      fd.append('jobId',    job._id || job.title)
      fd.append('jobTitle', job.title)
      fd.append('name',     form.name)
      fd.append('phone',    form.phone)
      fd.append('email',    form.email)
      fd.append('qual',     form.qual)
      fd.append('exp',      form.exp)
      fd.append('message',  form.message)
      fd.append('resume',   resume)
      await jobAppAPI.apply(fd)
      setSent(true)
    } catch(err) {
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .jaf-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.55); z-index:1000; display:flex; align-items:center; justify-content:center; padding:16px; }
        .jaf-modal    { background:var(--card); border-radius:24px; padding:32px 28px; width:100%; max-width:540px; max-height:92vh; overflow-y:auto; border:1.5px solid var(--brd); box-shadow:0 24px 80px rgba(0,0,0,.28); }
        .jaf-grid-2   { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .jaf-inp      { width:100%; padding:11px 14px; border-radius:10px; border:1.5px solid var(--brd); background:var(--bg); color:var(--txt); font-family:'DM Sans',sans-serif; font-size:13.5px; outline:none; box-sizing:border-box; transition:border-color .2s; }
        .jaf-inp:focus { border-color:var(--or); }
        .jaf-lbl      { font-size:11px; font-weight:800; color:var(--txt3); letter-spacing:.5px; text-transform:uppercase; display:block; margin-bottom:5px; }
        .jaf-submit   { width:100%; padding:13px; border-radius:50px; border:none; cursor:pointer; background:linear-gradient(135deg,var(--or),var(--gd)); color:#fff; font-family:'DM Sans',sans-serif; font-size:clamp(13px,3vw,14px); font-weight:800; box-shadow:0 6px 24px rgba(232,118,26,.35); transition:all .25s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .jaf-submit:disabled { opacity:.7; cursor:wait; }
        @media (max-width:480px) { .jaf-modal { padding:22px 16px; border-radius:20px; } .jaf-grid-2 { grid-template-columns:1fr; } }
      `}</style>

      <div className="jaf-backdrop" onClick={function(e){if(e.target===e.currentTarget)onClose()}}>
        <div className="jaf-modal">
          {sent ? (
            <div style={{textAlign:'center',padding:'28px 0'}}>
              <div style={{display:'flex',justifyContent:'center',gap:'10px',marginBottom:'14px'}}>
                 <FaCheckCircle size={52} color="#22a35a"/>
                 <FaGift size={40} color="#E8761A"/>
              </div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'var(--dark)',marginBottom:'10px'}}>Application Submitted!</div>
              <div style={{fontSize:'14px',color:'var(--txt2)',marginBottom:'6px'}}>Thank you for applying for <strong>{job.title}</strong>.</div>
              <div style={{fontSize:'13px',color:'var(--txt3)',marginBottom:'24px'}}>Our HR team will contact you within 3–5 working days.</div>
              <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                <a href="tel:+919198783830" style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'10px 22px',borderRadius:'50px',background:'var(--or)',color:'#fff',textDecoration:'none',fontWeight:'800',fontSize:'13px',fontFamily:"'DM Sans',sans-serif"}}>
                  <FaPhone size={13}/> Call Us
                </a>
                <button onClick={onClose} style={{padding:'10px 22px',borderRadius:'50px',border:'1.5px solid var(--brd)',cursor:'pointer',background:'transparent',color:'var(--txt2)',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700'}}>Close</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'22px',gap:'12px'}}>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:'11px',fontWeight:'800',color:'var(--or)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'4px'}}>Applying for</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'var(--dark)',lineHeight:'1.3'}}>{job.title}</div>
                  <div style={{fontSize:'12px',color:'var(--txt3)',marginTop:'3px'}}>{job.dept} · {job.type}</div>
                </div>
                <button onClick={onClose} style={{width:'36px',height:'36px',borderRadius:'50%',border:'1.5px solid var(--brd)',background:'var(--bg)',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--txt3)',flexShrink:0}}>✕</button>
              </div>

              {error && (
                <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(239,68,68,.06)',border:'1.5px solid rgba(239,68,68,.2)',borderRadius:'10px',padding:'10px 14px',marginBottom:'14px',fontSize:'12.5px',color:'#dc2626',fontWeight:'600'}}>
                  <FaExclamationTriangle size={13}/> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'13px'}}>
                <div className="jaf-grid-2">
                  <div>
                    <label className="jaf-lbl">Full Name *</label>
                    <input className="jaf-inp" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                  </div>
                  <div>
                    <label className="jaf-lbl">Phone *</label>
                    <input className="jaf-inp" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div>
                  <label className="jaf-lbl">Email *</label>
                  <input className="jaf-inp" name="email" value={form.email} onChange={handleChange} required type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="jaf-lbl">Qualification *</label>
                  <input className="jaf-inp" name="qual" value={form.qual} onChange={handleChange} required placeholder="e.g. M.Sc. Mathematics, B.Ed" />
                </div>
                <div>
                  <label className="jaf-lbl">Experience</label>
                  <input className="jaf-inp" name="exp" value={form.exp} onChange={handleChange} placeholder="e.g. 3 years at XYZ School" />
                </div>
                <div>
                  <label className="jaf-lbl">Cover Note</label>
                  <textarea className="jaf-inp" name="message" value={form.message} onChange={handleChange} placeholder="Tell us why you are a good fit..." rows={3} style={{resize:'vertical',lineHeight:'1.6'}} />
                </div>

                {/* Resume upload */}
                <div>
                  <label className="jaf-lbl">Resume / CV <span style={{color:'var(--or)'}}>*</span></label>
                  <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'14px',background:'rgba(232,118,26,.03)'}}>
                    {resumeName ? (
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'9px',background:'rgba(232,118,26,.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                          <FaFileAlt size={18} color="#E8761A"/>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:'13px',fontWeight:'700',color:'var(--dark)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{resumeName}</div>
                          <div style={{fontSize:'11.5px',color:'var(--txt3)',display:'flex',alignItems:'center',gap:'4px'}}><FaCheckCircle size={10} color="#22a35a"/> Resume uploaded</div>
                        </div>
                        <button type="button" onClick={function(){setResume(null);setResumeName('')}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--txt3)',fontSize:'16px',padding:'4px',flexShrink:0}}>✕</button>
                      </div>
                    ) : (
                      <label style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',padding:'8px 0'}}>
                        <FaPaperclip size={28} color="#E8761A" style={{marginBottom:'6px'}}/>
                        <div style={{fontSize:'13px',fontWeight:'700',color:'var(--or)',marginBottom:'3px'}}>Click to upload Resume / CV</div>
                        <div style={{fontSize:'11.5px',color:'var(--txt3)'}}>PDF, DOC, DOCX — Max 5MB</div>
                        <input type="file" accept=".pdf,.doc,.docx" style={{display:'none'}}
                          onChange={function(e){
                            var file=e.target.files&&e.target.files[0]
                            if(!file) return
                            setResume(file); setResumeName(file.name)
                          }} />
                      </label>
                    )}
                  </div>
                </div>

                <button type="submit" className="jaf-submit" disabled={loading}>
                  {loading
                    ? <><FaSpinner size={14} style={{animation:'spin .8s linear infinite'}}/> Submitting...</>
                    : <><FaPaperPlane size={14}/> Submit Application</>
                  }
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </>
  )
}