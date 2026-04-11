import { useState } from 'react'
import { enquiryAPI } from '../../api'
import useSettings from '../../hooks/useSettings'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaIdCard, FaClock, FaClipboardList, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

export default function ContactSection() {
  var [form, setForm]       = useState({ name:'', phone:'', email:'', class:'', message:'' })
  var [sent, setSent]       = useState(false)
  var [loading, setLoading] = useState(false)
  var [error, setError]     = useState('')

  const { settings } = useSettings()
  const school  = settings.school  || {}
  const contact = settings.contact || {}

  const phone1  = contact.phone1 || '9198783830'
  const phone2  = contact.phone2 || '8318842325'
  const email   = contact.email  || 'spvbrh@gmail.com'
  const address = school.address || 'Pashupati Nagar, Wireless Fidelity, Bahraich, UP 271802'
  const affNo   = school.affNo   || '2130176'
  const schoolNo= school.schoolNo|| '70178'
  const udise   = school.udise   || '09500707504'

  function handleChange(e) {
    var k=e.target.name||e.target.id, v=e.target.value
    setForm(function(p){ var n={...p}; n[k]=v; return n })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await enquiryAPI.submit({
        name: form.name, phone: form.phone, email: form.email,
        message: (form.class ? '[Class: ' + form.class + '] ' : '') + (form.message || ''),
        type: 'General',
      })
      setSent(true)
      setTimeout(function(){ setSent(false); setForm({name:'',phone:'',email:'',class:'',message:''}) }, 5000)
    } catch(err) {
      setError(err.message || 'Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-sect sect">
      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Contact & Admission</div>
          <h2 className="sec-title">Get in <span className="hl">Touch</span></h2>
          <div className="s-bar"></div>
        </div>
        <div className="contact-grid">
          <div className="ct-info">
            {[
              { ic:<FaMapMarkerAlt size={18} color="#000"/>, lbl:'Address',      val: address },
              { ic:<FaPhone size={18} color="#000"/>,        lbl:'Phone',        val:<><a href={'tel:+91'+phone1}>+91 {phone1}</a><br/><a href={'tel:+91'+phone2}>+91 {phone2} (Principal)</a></> },
              { ic:<FaEnvelope size={18} color="#000"/>,     lbl:'Email',        val:<a href={'mailto:'+email}>{email}</a> },
              { ic:<FaGlobe size={18} color="#000"/>,        lbl:'Website',      val:'www.santpathikvidyalaya.org' },
              { ic:<FaIdCard size={18} color="#000"/>,       lbl:'CBSE Details', val:'Affiliation No. ' + affNo + ' · School No. ' + schoolNo + ' · UDISE: ' + udise },
              { ic:<FaClock size={18} color="#000"/>,        lbl:'School Hours', val:'7:30 AM – 2:30 PM (Mon–Sat)' },
            ].map(function(c, i) {
              return (
                <div className={'ct-card rv d' + ((i%5)+1)} key={i}>
                  <div className="ct-ic">{c.ic}</div>
                  <div><div className="ct-lb">{c.lbl}</div><div className="ct-vl">{c.val}</div></div>
                </div>
              )
            })}
          </div>

          <div className="form-box rv" style={{transitionDelay:'.2s'}}>
            <div className="form-title" style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <FaClipboardList size={16} color="#E8761A"/> Admission / General Enquiry
            </div>
            {error && (
              <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(239,68,68,.06)',border:'1.5px solid rgba(239,68,68,.2)',borderRadius:'10px',padding:'10px 14px',marginBottom:'12px',fontSize:'12.5px',color:'#dc2626',fontWeight:'600'}}>
                <FaExclamationTriangle size={14}/> {error}
              </div>
            )}
            {sent ? (
              <div style={{textAlign:'center',padding:'40px',background:'rgba(34,163,90,.08)',borderRadius:'12px',border:'1.5px solid rgba(34,163,90,.2)'}}>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'12px'}}>
                  <FaCheckCircle size={48} color="#22a35a"/>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#22a35a'}}>Enquiry Sent!</div>
                <p style={{color:'var(--txt2)',marginTop:'8px'}}>We'll contact you within 24 hours. Call +91 {phone1} for urgent queries.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="frow">
                  <div><label className="flb">Full Name *</label><input className="finp" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" /></div>
                  <div><label className="flb">Mobile *</label><input className="finp" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" /></div>
                </div>
                <div className="frow">
                  <div><label className="flb">Email</label><input className="finp" name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" /></div>
                  <div>
                    <label className="flb">Class Seeking</label>
                    <select className="fsel" name="class" value={form.class} onChange={handleChange}>
                      <option value="">Select Class</option>
                      {['Play Group','Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI (Science)','XI (Commerce)','XI (Humanities)','XII'].map(function(c){ return <option key={c}>{c}</option> })}
                    </select>
                  </div>
                </div>
                <div className="fg"><label className="flb">Message</label><textarea className="fta" name="message" value={form.message} onChange={handleChange} placeholder="Any specific questions about admission, hostel, fees..." /></div>
                <button className="fsub" type="submit" disabled={loading} style={{opacity:loading?.7:1,cursor:loading?'wait':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                  {loading ? 'Sending...' : <><FaPaperPlane size={14}/> Send Enquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}