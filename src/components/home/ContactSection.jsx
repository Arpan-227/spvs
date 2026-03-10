import { useState } from 'react'
export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
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
          {/* Info */}
          <div className="ct-info">
            {[
              { ic:'📍', lbl:'Address', val:'Pashupati Nagar, Wireless Fidelity, Bahraich, UP 271802' },
              { ic:'📞', lbl:'Phone', val:<><a href="tel:+919198783830">+91 9198783830</a><br/><a href="tel:+918318842325">+91 8318842325 (Principal)</a></> },
              { ic:'✉️', lbl:'Email', val:<a href="mailto:spvbrh@gmail.com">spvbrh@gmail.com</a> },
              { ic:'🌐', lbl:'Website', val:'www.santpathikvidyalaya.org' },
              { ic:'📋', lbl:'CBSE Details', val:'Affiliation No. 2130176 · School No. 70178 · UDISE: 09500707504' },
              { ic:'🕐', lbl:'School Hours', val:'7:30 AM – 2:30 PM (Mon–Sat)' },
            ].map((c,i) => (
              <div className={`ct-card rv d${(i%5)+1}`} key={i}>
                <div className="ct-ic">{c.ic}</div>
                <div><div className="ct-lb">{c.lbl}</div><div className="ct-vl">{c.val}</div></div>
              </div>
            ))}
          </div>
          {/* Form */}
          <div className="form-box rv" style={{transitionDelay:'.2s'}}>
            <div className="form-title">📋 Admission / General Enquiry</div>
            {sent ? (
              <div style={{textAlign:'center',padding:'40px',background:'rgba(34,163,90,.08)',borderRadius:'12px',border:'1.5px solid rgba(34,163,90,.2)'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>✅</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#22a35a'}}>Enquiry Sent!</div>
                <p style={{color:'var(--txt2)',marginTop:'8px'}}>We'll contact you within 24 hours. Call +91 9198783830 for urgent queries.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="frow">
                  <div><label className="flb">Full Name *</label><input className="finp" required placeholder="Your full name" /></div>
                  <div><label className="flb">Mobile *</label><input className="finp" required placeholder="+91 XXXXX XXXXX" /></div>
                </div>
                <div className="frow">
                  <div><label className="flb">Email</label><input className="finp" type="email" placeholder="your@email.com" /></div>
                  <div><label className="flb">Class Seeking</label>
                    <select className="fsel">
                      <option>Select Class</option>
                      {['Play Group','Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI (Science)','XI (Commerce)','XI (Humanities)','XII'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="fg"><label className="flb">Message</label><textarea className="fta" placeholder="Any specific questions about admission, hostel, fees..." /></div>
                <button className="fsub" type="submit">📨 Send Enquiry →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}