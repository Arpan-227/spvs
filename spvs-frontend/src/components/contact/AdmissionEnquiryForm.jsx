import { useState } from 'react'

var CLASSES = ['Play Group','Nursery','LKG','UKG','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII']

export default function AdmissionEnquiryForm() {
  var init = { studentName:'', dob:'', gender:'', applyClass:'', parentName:'', phone:'', email:'', address:'', hostel:'No', message:'' }
  var [form, setForm] = useState(init)
  var [sent, setSent] = useState(false)
  var [loading, setLoading] = useState(false)

  function handleChange(e) {
    var key = e.target.name, val = e.target.value
    setForm(function(prev) { var next = {}; for (var k in prev) next[k] = prev[k]; next[key] = val; return next })
  }
  function setHostel(val) {
    setForm(function(prev) { var next = {}; for (var k in prev) next[k] = prev[k]; next.hostel = val; return next })
  }
  function handleSubmit(e) {
    e.preventDefault(); setLoading(true)
    setTimeout(function() { setLoading(false); setSent(true) }, 1400)
  }

  var inp = { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }
  var lbl = { fontSize:'11px', fontWeight:'800', color:'var(--txt3)', letterSpacing:'.6px', textTransform:'uppercase', display:'block', marginBottom:'5px' }
  var sec = { fontSize:'11px', fontWeight:'800', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--or)', paddingBottom:'8px', borderBottom:'1px solid var(--brd)', marginTop:'4px' }

  if (sent) return (
    <div style={{textAlign:'center', padding:'48px 20px'}}>
      <div style={{fontSize:'56px', marginBottom:'16px'}}>🎉</div>
      <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Enquiry Submitted!</div>
      <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'6px'}}>Thank you for your interest in Sant Pathik Vidyalaya.</div>
      <div style={{fontSize:'13px', color:'var(--txt3)', marginBottom:'24px'}}>Our admissions team will contact you within 24 hours.</div>
      <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap'}}>
        <a href="tel:+919198783830" style={{padding:'11px 24px', borderRadius:'50px', background:'var(--or)', color:'#fff', textDecoration:'none', fontWeight:'800', fontSize:'13px', fontFamily:"'DM Sans',sans-serif"}}>📞 Call Now</a>
        <button onClick={function(){setForm(init);setSent(false)}} style={{padding:'11px 24px', borderRadius:'50px', border:'1.5px solid var(--brd)', cursor:'pointer', background:'transparent', color:'var(--txt2)', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700'}}>New Enquiry</button>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'14px'}}>

      <div style={sec}>Student Details</div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
        <div>
          <label style={lbl}>Student Name *</label>
          <input name="studentName" value={form.studentName} onChange={handleChange} required placeholder="Full name" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
        <div>
          <label style={lbl}>Date of Birth *</label>
          <input name="dob" value={form.dob} onChange={handleChange} required type="date" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
        <div>
          <label style={lbl}>Gender *</label>
          <select name="gender" value={form.gender} onChange={handleChange} required style={{width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', cursor:'pointer'}} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}}>
            <option value="">Select...</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label style={lbl}>Applying for Class *</label>
          <select name="applyClass" value={form.applyClass} onChange={handleChange} required style={{width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', cursor:'pointer'}} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}}>
            <option value="">Select class...</option>
            {CLASSES.map(function(c) { return <option key={c}>{c}</option> })}
          </select>
        </div>
      </div>

      <div style={sec}>Parent / Guardian Details</div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
        <div>
          <label style={lbl}>Parent Name *</label>
          <input name="parentName" value={form.parentName} onChange={handleChange} required placeholder="Father / Mother name" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
        <div>
          <label style={lbl}>Phone *</label>
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
        <div>
          <label style={lbl}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
        <div>
          <label style={lbl}>Address</label>
          <input name="address" value={form.address} onChange={handleChange} placeholder="Village / Town, District" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
      </div>

      {/* Hostel toggle */}
      <div style={{display:'flex', alignItems:'center', gap:'14px', padding:'14px 16px', borderRadius:'12px', background:'rgba(232,118,26,.05)', border:'1.5px solid rgba(232,118,26,.18)'}}>
        <div style={{fontSize:'22px'}}>🏠</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:'700', color:'var(--dark)', fontSize:'13.5px'}}>Hostel Required?</div>
          <div style={{fontSize:'12px', color:'var(--txt3)'}}>Boys hostel available for outstation students</div>
        </div>
        <div style={{display:'flex', gap:'8px'}}>
          {['Yes','No'].map(function(opt) {
            var active = form.hostel === opt
            return (
              <button key={opt} type="button" onClick={function(){setHostel(opt)}} style={{padding:'7px 18px', borderRadius:'50px', border:'1.5px solid var(--brd)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'700', transition:'all .2s', background: active ? 'var(--or)' : 'var(--bg)', color: active ? '#fff' : 'var(--txt2)', borderColor: active ? 'var(--or)' : 'var(--brd)'}}>
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label style={lbl}>Additional Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Any specific questions or requirements..." rows={3} style={{width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', resize:'vertical', lineHeight:'1.6'}} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
      </div>

      <button type="submit" disabled={loading} style={{padding:'13px 32px', borderRadius:'50px', border:'none', cursor: loading ? 'wait' : 'pointer', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 6px 24px rgba(232,118,26,.35)', transition:'all .25s', opacity: loading ? '.7' : '1'}}>
        {loading ? '⏳ Submitting...' : '🎓 Submit Admission Enquiry →'}
      </button>

    </form>
  )
}