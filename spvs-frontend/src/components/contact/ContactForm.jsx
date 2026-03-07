import { useState } from 'react'

export default function ContactForm() {
  var init = { name:'', phone:'', email:'', subject:'', message:'' }
  var [form, setForm] = useState(init)
  var [sent, setSent] = useState(false)
  var [loading, setLoading] = useState(false)

  function handleChange(e) {
    var key = e.target.name, val = e.target.value
    setForm(function(prev) {
      var next = {}; for (var k in prev) next[k] = prev[k]; next[key] = val; return next
    })
  }

  function handleSubmit(e) {
    e.preventDefault(); setLoading(true)
    setTimeout(function() { setLoading(false); setSent(true) }, 1200)
  }

  var inp = { width:'100%', padding:'12px 16px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }
  var lbl = { fontSize:'11px', fontWeight:'800', color:'var(--txt3)', letterSpacing:'.6px', textTransform:'uppercase', display:'block', marginBottom:'6px' }

  if (sent) return (
    <div style={{textAlign:'center', padding:'48px 20px'}}>
      <div style={{fontSize:'56px', marginBottom:'16px'}}>✅</div>
      <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Message Sent!</div>
      <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'24px'}}>We will get back to you within 24 hours.</div>
      <button onClick={function(){setForm(init);setSent(false)}} style={{padding:'11px 28px', borderRadius:'50px', border:'none', cursor:'pointer', background:'var(--or)', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'700'}}>Send Another</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'14px'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px'}}>
        <div>
          <label style={lbl}>Your Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
        <div>
          <label style={lbl}>Phone *</label>
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
        </div>
      </div>

      <div>
        <label style={lbl}>Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
      </div>

      <div>
        <label style={lbl}>Subject *</label>
        <select name="subject" value={form.subject} onChange={handleChange} required style={{width:'100%', padding:'12px 16px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', cursor:'pointer'}} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}}>
          <option value="">Select a subject...</option>
          <option>General Enquiry</option>
          <option>Admission Enquiry</option>
          <option>Fee Related</option>
          <option>Transport Enquiry</option>
          <option>Hostel Enquiry</option>
          <option>Result / Certificate</option>
          <option>Complaint / Feedback</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label style={lbl}>Message *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Write your message here..." rows={4} style={{width:'100%', padding:'12px 16px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', resize:'vertical', lineHeight:'1.6'}} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
      </div>

      <button type="submit" disabled={loading} style={{padding:'13px 32px', borderRadius:'50px', border:'none', cursor: loading ? 'wait' : 'pointer', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 6px 24px rgba(232,118,26,.35)', transition:'all .25s', opacity: loading ? '.7' : '1'}}>
        {loading ? '⏳ Sending...' : '📨 Send Message →'}
      </button>
    </form>
  )
}