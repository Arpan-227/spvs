import { useState } from 'react'

export default function JobApplyForm({ job, onClose }) {
  var [form, setForm] = useState({ name:'', phone:'', email:'', qual:'', exp:'', message:'' })
  var [resume, setResume] = useState(null)
  var [resumeName, setResumeName] = useState('')
  var [sent, setSent] = useState(false)
  var [loading, setLoading] = useState(false)

  function handleChange(e) {
    var key = e.target.name, val = e.target.value
    setForm(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[key] = val; return n })
  }

  function handleSubmit(e) {
    e.preventDefault(); setLoading(true)
    setTimeout(function() { setLoading(false); setSent(true) }, 1400)
  }

  var inp = { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }
  var lbl = { fontSize:'11px', fontWeight:'800', color:'var(--txt3)', letterSpacing:'.5px', textTransform:'uppercase', display:'block', marginBottom:'5px' }

  return (
    <div
      style={{position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}
      onClick={function(e) { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{background:'var(--card)', borderRadius:'24px', padding:'36px', maxWidth:'540px', width:'100%', maxHeight:'90vh', overflowY:'auto', border:'1.5px solid var(--brd)', boxShadow:'0 24px 80px rgba(0,0,0,.25)'}}>

        {sent ? (
          <div style={{textAlign:'center', padding:'32px 0'}}>
            <div style={{fontSize:'52px', marginBottom:'14px'}}>🎉</div>
            <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Application Submitted!</div>
            <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'6px'}}>Thank you for applying for <strong>{job.title}</strong>.</div>
            <div style={{fontSize:'13px', color:'var(--txt3)', marginBottom:'24px'}}>Our HR team will contact you within 3–5 working days.</div>
            <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap'}}>
              <a href="tel:+919198783830" style={{padding:'10px 22px', borderRadius:'50px', background:'var(--or)', color:'#fff', textDecoration:'none', fontWeight:'800', fontSize:'13px', fontFamily:"'DM Sans',sans-serif"}}>📞 Call Us</a>
              <button onClick={onClose} style={{padding:'10px 22px', borderRadius:'50px', border:'1.5px solid var(--brd)', cursor:'pointer', background:'transparent', color:'var(--txt2)', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700'}}>Close</button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px'}}>
              <div>
                <div style={{fontSize:'11px', fontWeight:'800', color:'var(--or)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'4px'}}>Applying for</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'var(--dark)'}}>{job.title}</div>
                <div style={{fontSize:'12px', color:'var(--txt3)', marginTop:'2px'}}>{job.dept} · {job.type}</div>
              </div>
              <button onClick={onClose} style={{width:'36px', height:'36px', borderRadius:'50%', border:'1.5px solid var(--brd)', background:'var(--bg)', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--txt3)', flexShrink:0}}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'13px'}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                </div>
                <div>
                  <label style={lbl}>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                </div>
              </div>

              <div>
                <label style={lbl}>Email *</label>
                <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="your@email.com" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
              </div>

              <div>
                <label style={lbl}>Qualification *</label>
                <input name="qual" value={form.qual} onChange={handleChange} required placeholder="e.g. M.Sc. Mathematics, B.Ed" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
              </div>

              <div>
                <label style={lbl}>Experience</label>
                <input name="exp" value={form.exp} onChange={handleChange} placeholder="e.g. 3 years at XYZ School" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
              </div>

              <div>
                <label style={lbl}>Cover Note</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us why you are a good fit..." rows={3}
                  style={{width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', resize:'vertical', lineHeight:'1.6'}}
                  onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
              </div>

              {/* RESUME UPLOAD */}
              <div>
                <label style={lbl}>Resume / CV <span style={{color:'var(--or)'}}>*</span></label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)', borderRadius:'12px', padding:'14px', background:'rgba(232,118,26,.03)', transition:'border-color .2s'}}
                  onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.5)'}}
                  onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.25)'}}>
                  {resumeName ? (
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <div style={{width:'36px', height:'36px', borderRadius:'9px', background:'rgba(232,118,26,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>📄</div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:'13px', fontWeight:'700', color:'var(--dark)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{resumeName}</div>
                        <div style={{fontSize:'11.5px', color:'var(--txt3)'}}>Resume uploaded ✅</div>
                      </div>
                      <button type="button" onClick={function(){setResume(null);setResumeName('')}}
                        style={{background:'none', border:'none', cursor:'pointer', color:'var(--txt3)', fontSize:'16px', padding:'4px'}}>✕</button>
                    </div>
                  ) : (
                    <label style={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', padding:'8px 0'}}>
                      <div style={{fontSize:'28px', marginBottom:'6px'}}>📎</div>
                      <div style={{fontSize:'13px', fontWeight:'700', color:'var(--or)', marginBottom:'3px'}}>Click to upload Resume / CV</div>
                      <div style={{fontSize:'11.5px', color:'var(--txt3)'}}>PDF, DOC, DOCX — Max 5MB</div>
                      <input type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} required
                        onChange={function(e){
                          var file = e.target.files && e.target.files[0]
                          if(!file) return
                          setResume(file)
                          setResumeName(file.name)
                        }} />
                    </label>
                  )}
                </div>
              </div>

              <button type="submit" disabled={loading} style={{padding:'13px 32px', borderRadius:'50px', border:'none', cursor: loading ? 'wait' : 'pointer', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 6px 24px rgba(232,118,26,.35)', opacity: loading ? '.7' : '1', transition:'all .25s'}}>
                {loading ? '⏳ Submitting...' : '📨 Submit Application →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}