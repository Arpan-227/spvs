import { useState } from 'react'
import { enquiryAPI } from '../../api'

export default function ContactForm() {
  var init = { name:'', phone:'', email:'', subject:'', message:'' }
  var [form, setForm]       = useState(init)
  var [sent, setSent]       = useState(false)
  var [loading, setLoading] = useState(false)
  var [error, setError]     = useState('')

  function handleChange(e) {
    var key = e.target.name, val = e.target.value
    setForm(function(prev){ var n={}; for(var k in prev) n[k]=prev[k]; n[key]=val; return n })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await enquiryAPI.submit({
        name:    form.name,
        phone:   form.phone,
        email:   form.email,
        message: (form.subject ? '[' + form.subject + '] ' : '') + form.message,
        type:    'General',
      })
      setSent(true)
    } catch(err) {
      setError(err.message || 'Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div style={{textAlign:'center', padding:'48px 20px'}}>
      <div style={{fontSize:'56px', marginBottom:'16px'}}>✅</div>
      <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Message Sent!</div>
      <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'24px'}}>We will get back to you within 24 hours.</div>
      <button onClick={function(){ setForm(init); setSent(false) }} style={{padding:'11px 28px', borderRadius:'50px', border:'none', cursor:'pointer', background:'var(--or)', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'700'}}>
        Send Another
      </button>
    </div>
  )

  return (
    <>
      <style>{`
        .cf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cf-inp {
          width: 100%; padding: 12px 16px; border-radius: 10px;
          border: 1.5px solid var(--brd); background: var(--bg); color: var(--txt);
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          outline: none; box-sizing: border-box; transition: border-color .2s;
        }
        .cf-inp:focus { border-color: var(--or); }
        .cf-lbl { font-size: 11px; font-weight: 800; color: var(--txt3); letter-spacing: .6px; text-transform: uppercase; display: block; margin-bottom: 6px; }
        @media (max-width: 480px) { .cf-grid-2 { grid-template-columns: 1fr; } }
      `}</style>

      {error && (
        <div style={{background:'rgba(239,68,68,.06)', border:'1.5px solid rgba(239,68,68,.2)', borderRadius:'10px', padding:'10px 14px', marginBottom:'14px', fontSize:'12.5px', color:'#dc2626', fontWeight:'600'}}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'14px'}}>
        <div className="cf-grid-2">
          <div>
            <label className="cf-lbl">Your Name *</label>
            <input className="cf-inp" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
          </div>
          <div>
            <label className="cf-lbl">Phone *</label>
            <input className="cf-inp" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>

        <div>
          <label className="cf-lbl">Email</label>
          <input className="cf-inp" name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" />
        </div>

        <div>
          <label className="cf-lbl">Subject *</label>
          <select className="cf-inp" name="subject" value={form.subject} onChange={handleChange} required style={{cursor:'pointer'}}>
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
          <label className="cf-lbl">Message *</label>
          <textarea className="cf-inp" name="message" value={form.message} onChange={handleChange} required placeholder="Write your message here..." rows={4} style={{resize:'vertical', lineHeight:'1.6'}} />
        </div>

        <button type="submit" disabled={loading} style={{padding:'13px 32px', borderRadius:'50px', border:'none', cursor: loading ? 'wait' : 'pointer', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 6px 24px rgba(232,118,26,.35)', transition:'all .25s', opacity: loading ? '.7' : '1'}}>
          {loading ? '⏳ Sending...' : '📨 Send Message →'}
        </button>
      </form>
    </>
  )
}