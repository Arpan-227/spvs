import { useState } from 'react'
import { Link } from 'react-router-dom'
import ContactForm          from '../../components/contact/ContactForm'
import AdmissionEnquiryForm from '../../components/contact/AdmissionEnquiryForm'

var QUICK = [
  { em:'📞', label:'Call Office',  val:'+91 9198783830',   href:'tel:+919198783830',           clr:'#E8761A' },
  { em:'💬', label:'WhatsApp',     val:'+91 9198783830',   href:'https://wa.me/919198783830',   clr:'#25D366' },
  { em:'📧', label:'Email Us',     val:'spvbrh@gmail.com', href:'mailto:spvbrh@gmail.com',      clr:'#6C3FC5' },
  { em:'📍', label:'Visit Us',     val:'Pashupati Nagar, Bahraich', href:'https://maps.google.com/?q=Sant+Pathik+Vidyalaya+Bahraich', clr:'#F5B800' },
]

var INFO = [
  { em:'📍', label:'Address',       val:'Pashupati Nagar, Bahraich, UP 271802' },
  { em:'📞', label:'School Office', val:'+91 9198783830' },
  { em:'👩‍🏫', label:'Principal',     val:'+91 8318842325' },
  { em:'👨‍🏫', label:'Vice Principal',val:'+91 8318600231' },
  { em:'📧', label:'Email',         val:'spvbrh@gmail.com' },
  { em:'🕐', label:'Office Hours',  val:'Mon – Sat  |  8:00 AM – 3:00 PM' },
  { em:'🏫', label:'CBSE Affil.',   val:'2130176  ·  School No. 70178' },
  { em:'📋', label:'UDISE Code',    val:'09500707504' },
]

var TABS = [
  { id:'contact',   label:'✉️ General Contact'   },
  { id:'admission', label:'🎓 Admission Enquiry' },
]

export default function ContactPage() {
  var [tab, setTab] = useState('contact')

  return (
    <>
      {/* PAGE BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">📞 Contact Us</div>
          <h1 className="pb-title">Get in <span style={{color:'var(--gd2)', fontStyle:'italic'}}>Touch</span></h1>
          <p className="pb-sub">We are here to help — reach out for admissions, general enquiries or feedback</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Contact</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Quick contact cards */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'14px', marginBottom:'52px'}}>
            {QUICK.map(function(q) {
              return (
                <a key={q.label} href={q.href} target={q.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
                  style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'24px 16px', borderRadius:'18px', background:'var(--card)', border:'1.5px solid var(--brd)', textDecoration:'none', transition:'all .3s cubic-bezier(.34,1.56,.64,1)'}}
                  onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+q.clr+'33';e.currentTarget.style.borderColor=q.clr+'55'}}
                  onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                >
                  <div style={{width:'52px', height:'52px', borderRadius:'16px', background:q.clr+'18', border:'1.5px solid '+q.clr+'30', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', marginBottom:'12px'}}>{q.em}</div>
                  <div style={{fontSize:'11px', fontWeight:'800', color:'var(--txt3)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'5px'}}>{q.label}</div>
                  <div style={{fontSize:'13px', fontWeight:'700', color:q.clr}}>{q.val}</div>
                </a>
              )
            })}
          </div>

          {/* Main grid */}
          <div style={{display:'grid', gridTemplateColumns:'1.15fr .85fr', gap:'28px', alignItems:'start'}}>

            {/* LEFT — form */}
            <div>
              {/* Tab switcher */}
              <div style={{display:'flex', gap:'6px', background:'var(--bg2)', padding:'5px', borderRadius:'14px', border:'1.5px solid var(--brd)', marginBottom:'24px'}}>
                {TABS.map(function(t) {
                  var active = tab === t.id
                  return (
                    <button key={t.id} onClick={function(){setTab(t.id)}} style={{flex:1, padding:'12px 16px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', fontWeight:'700', transition:'all .25s cubic-bezier(.34,1.56,.64,1)', background: active ? 'var(--card)' : 'transparent', color: active ? 'var(--or)' : 'var(--txt2)', boxShadow: active ? '0 4px 16px var(--shd)' : 'none', transform: active ? 'scale(1.02)' : 'scale(1)'}}>
                      {t.label}
                    </button>
                  )
                })}
              </div>

              {/* Form card */}
              <div style={{background:'var(--card)', borderRadius:'20px', padding:'32px', border:'1.5px solid var(--brd)', boxShadow:'0 6px 28px rgba(0,0,0,.04)'}}>
                <div key={tab} style={{animation:'fU .3s ease both'}}>
                  {tab === 'contact'   && <ContactForm />}
                  {tab === 'admission' && <AdmissionEnquiryForm />}
                </div>
              </div>
            </div>

            {/* RIGHT — info + map */}
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>

              {/* Info card */}
              <div style={{background:'var(--card)', borderRadius:'20px', padding:'28px', border:'1.5px solid var(--brd)', boxShadow:'0 6px 28px rgba(0,0,0,.04)'}}>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:'var(--dark)', marginBottom:'20px'}}>
                  School Information
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'13px'}}>
                  {INFO.map(function(item) {
                    return (
                      <div key={item.label} style={{display:'flex', gap:'12px', alignItems:'flex-start'}}>
                        <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(232,118,26,.1)', border:'1.5px solid rgba(232,118,26,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0}}>
                          {item.em}
                        </div>
                        <div>
                          <div style={{fontSize:'10px', fontWeight:'800', color:'var(--txt3)', letterSpacing:'.8px', textTransform:'uppercase', marginBottom:'2px'}}>{item.label}</div>
                          <div style={{fontSize:'13.5px', fontWeight:'600', color:'var(--dark)'}}>{item.val}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

{/* Social / CTA strip */}
              <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))', borderRadius:'18px', padding:'22px', textAlign:'center'}}>
                <div style={{fontSize:'13px', fontWeight:'700', color:'rgba(255,255,255,.6)', marginBottom:'6px', letterSpacing:'.5px'}}>ESTABLISHED 1987</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'17px', fontWeight:'700', color:'#fff', marginBottom:'4px'}}>Sant Pathik Vidyalaya</div>
                <div style={{fontSize:'12px', color:'rgba(255,255,255,.5)', marginBottom:'18px'}}>CBSE Affiliation No. 2130176</div>
                <a href="tel:+919198783830" style={{display:'inline-block', padding:'11px 28px', borderRadius:'50px', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', fontWeight:'800', boxShadow:'0 6px 20px rgba(232,118,26,.4)'}}>
                  📞 Call Now for Admission
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}