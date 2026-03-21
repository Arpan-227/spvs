import { useState } from 'react'
import { enquiryAPI } from '../../api'

var CLASSES = ['Play Group','Nursery','LKG','UKG','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII']

export default function AdmissionEnquiryForm() {
  var init = { studentName:'', dob:'', gender:'', applyClass:'', parentName:'', phone:'', email:'', address:'', hostel:'No', message:'' }
  var [form, setForm]       = useState(init)
  var [sent, setSent]       = useState(false)
  var [loading, setLoading] = useState(false)
  var [error, setError]     = useState('')

  function handleChange(e) {
    var key = e.target.name, val = e.target.value
    setForm(function(prev){ var n={}; for(var k in prev) n[k]=prev[k]; n[key]=val; return n })
    setError('')
  }
  function setHostel(val) {
    setForm(function(prev){ var n={}; for(var k in prev) n[k]=prev[k]; n.hostel=val; return n })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await enquiryAPI.submit({
        name:    form.parentName,
        phone:   form.phone,
        email:   form.email,
        message: [
          'Student: '  + form.studentName,
          'DOB: '      + form.dob,
          'Gender: '   + form.gender,
          'Class: '    + form.applyClass,
          'Hostel: '   + form.hostel,
          'Address: '  + (form.address || 'N/A'),
          form.message ? 'Note: ' + form.message : '',
        ].filter(Boolean).join(' | '),
        type: 'Admission',
      })
      setSent(true)
    } catch(err) {
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div style={{textAlign:'center', padding:'48px 20px'}}>
      <div style={{fontSize:'56px', marginBottom:'16px'}}>🎉</div>
      <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Enquiry Submitted!</div>
      <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'6px'}}>Thank you for your interest in Sant Pathik Vidyalaya.</div>
      <div style={{fontSize:'13px', color:'var(--txt3)', marginBottom:'24px'}}>Our admissions team will contact you within 24 hours.</div>
      <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap'}}>
        <a href="tel:+919198783830" style={{padding:'11px 24px', borderRadius:'50px', background:'var(--or)', color:'#fff', textDecoration:'none', fontWeight:'800', fontSize:'13px', fontFamily:"'DM Sans',sans-serif"}}>📞 Call Now</a>
        <button onClick={function(){ setForm(init); setSent(false) }} style={{padding:'11px 24px', borderRadius:'50px', border:'1.5px solid var(--brd)', cursor:'pointer', background:'transparent', color:'var(--txt2)', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700'}}>New Enquiry</button>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        .aef-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .aef-inp {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid var(--brd); background: var(--bg); color: var(--txt);
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          outline: none; box-sizing: border-box; transition: border-color .2s;
        }
        .aef-inp:focus { border-color: var(--or); }
        .aef-sel { cursor: pointer; }
        .aef-lbl { font-size: 11px; font-weight: 800; color: var(--txt3); letter-spacing: .6px; text-transform: uppercase; display: block; margin-bottom: 5px; }
        .aef-sec { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: var(--or); padding-bottom: 8px; border-bottom: 1px solid var(--brd); margin-top: 4px; }
        .aef-hostel { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 14px 16px; border-radius: 12px; background: rgba(232,118,26,.05); border: 1.5px solid rgba(232,118,26,.18); }
        .aef-hostel-btns { display: flex; gap: 8px; flex-shrink: 0; }
        @media (max-width: 480px) {
          .aef-grid-2 { grid-template-columns: 1fr; }
          .aef-hostel { gap: 10px; }
        }
      `}</style>

      {error && (
        <div style={{background:'rgba(239,68,68,.06)', border:'1.5px solid rgba(239,68,68,.2)', borderRadius:'10px', padding:'10px 14px', marginBottom:'14px', fontSize:'12.5px', color:'#dc2626', fontWeight:'600'}}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'14px'}}>

        <div className="aef-sec">Student Details</div>

        <div className="aef-grid-2">
          <div>
            <label className="aef-lbl">Student Name *</label>
            <input className="aef-inp" name="studentName" value={form.studentName} onChange={handleChange} required placeholder="Full name" />
          </div>
          <div>
            <label className="aef-lbl">Date of Birth *</label>
            <input className="aef-inp" name="dob" value={form.dob} onChange={handleChange} required type="date" />
          </div>
        </div>

        <div className="aef-grid-2">
          <div>
            <label className="aef-lbl">Gender *</label>
            <select className="aef-inp aef-sel" name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select...</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="aef-lbl">Applying for Class *</label>
            <select className="aef-inp aef-sel" name="applyClass" value={form.applyClass} onChange={handleChange} required>
              <option value="">Select class...</option>
              {CLASSES.map(function(c){ return <option key={c}>{c}</option> })}
            </select>
          </div>
        </div>

        <div className="aef-sec">Parent / Guardian Details</div>

        <div className="aef-grid-2">
          <div>
            <label className="aef-lbl">Parent Name *</label>
            <input className="aef-inp" name="parentName" value={form.parentName} onChange={handleChange} required placeholder="Father / Mother name" />
          </div>
          <div>
            <label className="aef-lbl">Phone *</label>
            <input className="aef-inp" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>

        <div className="aef-grid-2">
          <div>
            <label className="aef-lbl">Email</label>
            <input className="aef-inp" name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label className="aef-lbl">Address</label>
            <input className="aef-inp" name="address" value={form.address} onChange={handleChange} placeholder="Village / Town, District" />
          </div>
        </div>

        {/* Hostel toggle */}
        <div className="aef-hostel">
          <div style={{fontSize:'22px'}}>🏠</div>
          <div style={{flex:1, minWidth:'120px'}}>
            <div style={{fontWeight:'700', color:'var(--dark)', fontSize:'13.5px'}}>Hostel Required?</div>
            <div style={{fontSize:'12px', color:'var(--txt3)'}}>Boys hostel available for outstation students</div>
          </div>
          <div className="aef-hostel-btns">
            {['Yes','No'].map(function(opt) {
              var active = form.hostel === opt
              return (
                <button key={opt} type="button" onClick={function(){ setHostel(opt) }} style={{padding:'7px 18px', borderRadius:'50px', border:'1.5px solid var(--brd)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'700', transition:'all .2s', background: active ? 'var(--or)' : 'var(--bg)', color: active ? '#fff' : 'var(--txt2)', borderColor: active ? 'var(--or)' : 'var(--brd)'}}>
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="aef-lbl">Additional Message</label>
          <textarea className="aef-inp" name="message" value={form.message} onChange={handleChange} placeholder="Any specific questions or requirements..." rows={3} style={{resize:'vertical', lineHeight:'1.6'}} />
        </div>

        <button type="submit" disabled={loading} style={{padding:'13px 32px', borderRadius:'50px', border:'none', cursor: loading ? 'wait' : 'pointer', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 6px 24px rgba(232,118,26,.35)', transition:'all .25s', opacity: loading ? '.7' : '1'}}>
          {loading ? '⏳ Submitting...' : '🎓 Submit Admission Enquiry →'}
        </button>

      </form>
    </>
  )
}