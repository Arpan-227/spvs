import { Link } from 'react-router-dom'
import SchoolLogo from './SchoolLogo'
import useSettings from '../../hooks/useSettings'

export default function Footer() {
  const { settings } = useSettings()
  const school    = settings.school    || {}
  const contact   = settings.contact   || {}
  const admission = settings.admission || {}

  const name      = school.name        || 'Sant Pathik Vidyalaya'
  const affNo     = school.affNo       || '2130176'
  const est       = school.established || '1987'
  const phone1    = contact.phone1     || '9198783830'
  const phone2    = contact.phone2     || '8318842325'
  const email     = contact.email      || 'spvbrh@gmail.com'
  const address   = school.address     || 'Pashupati Nagar, Bahraich UP 271802'
  const facebook  = contact.facebook   || '#'
  const youtube   = contact.youtube    || '#'
  const instagram = contact.instagram  || '#'
  const whatsapp  = contact.whatsapp   || phone1

  return (
    <footer>
      <div className="foot-grid">
        {/* Brand */}
        <div>
          <div className="foot-brand-row">
            <div className="foot-logo"><SchoolLogo size={54} /></div>
            <div>
              <div className="foot-sn">{name}</div>
              <div className="foot-st">{school.board||'CBSE'} Affiliated · Est. {est}</div>
            </div>
          </div>
          <p className="foot-desc">
            A co-educational Day & Boarding Senior Secondary School committed to education with values and excellence since {est} in Pashupati Nagar, Bahraich, UP.
          </p>
          <div className="foot-motto">✨ "{school.tagline || 'Work is Worship'}"</div>
          <div className="foot-soc">
            <a className="fsoc" href={facebook}   aria-label="Facebook">f</a>
            <a className="fsoc" href={youtube}    aria-label="YouTube">▶</a>
            <a className="fsoc" href={instagram}  aria-label="Instagram">In</a>
            <a className="fsoc" href={'https://wa.me/91' + whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">W</a>
          </div>
          <a href="https://www.welltechup.com" target="_blank" rel="noopener noreferrer"
            style={{marginTop:'20px',display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',borderRadius:'12px',background:'rgba(108,63,197,.12)',border:'1px solid rgba(108,63,197,.25)',textDecoration:'none',transition:'all .25s',width:'fit-content'}}
            onMouseEnter={function(e){e.currentTarget.style.background='rgba(108,63,197,.22)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={function(e){e.currentTarget.style.background='rgba(108,63,197,.12)';e.currentTarget.style.transform='none'}}>
            <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'linear-gradient(135deg,#6C3FC5,#9B59F5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'900',color:'#fff',flexShrink:0,boxShadow:'0 4px 12px rgba(108,63,197,.4)'}}>W</div>
            <div>
              <div style={{fontSize:'10px',fontWeight:'700',color:'rgba(255,255,255,.5)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'2px'}}>Designed & Developed by</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',background:'linear-gradient(135deg,#B57BFF,#9B59F5)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',letterSpacing:'.4px'}}>Welltechup <span style={{fontSize:'10px',WebkitTextFillColor:'rgba(155,89,245,.6)'}}>↗</span></div>
            </div>
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <div className="foot-col-h">Quick Links</div>
          <ul className="foot-ul">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About School</Link></li>
            <li><Link to="/about#vision">Vision & Mission</Link></li>
            <li><Link to="/about#principal">Principal's Message</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
            <li><Link to="/campus-life">Campus Life</Link></li>
            <li><Link to="/campus-life?tab=jobs">Jobs & Careers</Link></li>
            <li><Link to="/mandatory-disclosure">Mandatory Disclosure</Link></li>
          </ul>
        </div>

        {/* Academics */}
        <div>
          <div className="foot-col-h">Academics</div>
          <ul className="foot-ul">
            <li><Link to="/academics">Classes (PG – XII)</Link></li>
            <li><Link to="/academics#science">Science Stream</Link></li>
            <li><Link to="/academics#commerce">Commerce Stream</Link></li>
            <li><Link to="/academics#humanities">Humanities Stream</Link></li>
            <li><Link to="/academics/fees">Fee Structure</Link></li>
            <li><Link to="/downloads">Certificates</Link></li>
            <li><Link to="/blog">Updates & News</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="foot-col-h">Contact Us</div>
          <ul className="foot-ul" style={{marginBottom:'18px'}}>
            <li><a href={'tel:+91' + phone1}>+91 {phone1}</a></li>
            <li><a href={'tel:+91' + phone2}>+91 {phone2} (Principal)</a></li>
            <li><a href={'mailto:' + email}>{email}</a></li>
            <li><span style={{color:'rgba(255,255,255,.85)'}}>{address}</span></li>
          </ul>
          {admission.open && (
            <div style={{padding:'10px 14px',borderRadius:'10px',background:'rgba(232,118,26,.15)',border:'1px solid rgba(232,118,26,.25)',marginBottom:'14px',fontSize:'12px',color:'#FFCF40',fontWeight:'600'}}>
              🎒 {admission.notice || 'Admissions Open — Apply Now!'}
            </div>
          )}
          <div className="foot-acts">
            <Link className="fa fa1" to="/contact">📋 Apply Now</Link>
            <a className="fa fa2" href={'https://wa.me/91' + whatsapp} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Mobile bottom links — always visible on mobile */}
      <div className="foot-mob-wrap">
        <Link to="/about" className="foot-mob-lnk">Privacy Policy</Link>
        <Link to="/admin" className="foot-mob-lnk foot-mob-admin">Admin</Link>
      </div>

      {/* Bottom bar */}
      <div className="foot-bot">
        <div className="foot-copy">
          © {new Date().getFullYear()} {name}. All rights reserved. CBSE Affiliation No. {affNo}
        </div>
        <div className="foot-bl-desk">
          <Link to="/about" className="foot-bl-lnk">Privacy Policy</Link>
          <Link to="/admin" className="foot-bl-lnk foot-admin-lnk">Admin</Link>
        </div>
      </div>

      <style>{`
        .foot-bot { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; padding:16px 32px; border-top:1px solid rgba(255,255,255,.08); }
        .foot-copy { font-size:12px; color:rgba(255,255,255,.45); font-family:'DM Sans',sans-serif; line-height:1.6; }
        .foot-bl-desk { display:flex; gap:16px; align-items:center; }
        .foot-bl-lnk  { font-size:12px; color:rgba(255,255,255,.45); text-decoration:none; font-family:'DM Sans',sans-serif; white-space:nowrap; transition:color .2s; }
        .foot-bl-lnk:hover { color:#E8761A; }
        .foot-admin-lnk { color:rgba(255,255,255,.3) !important; }
        .foot-admin-lnk:hover { color:rgba(255,255,255,.6) !important; }

        /* Mobile bottom links */
        .foot-mob-wrap {
          display: none;
          gap: 10px;
          padding: 14px 18px;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .foot-mob-lnk {
          flex: 1;
          display: block;
          padding: 12px 0;
          border-radius: 10px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          text-align: center;
          text-decoration: none;
          color: rgba(255,255,255,.75);
          font-size: 13px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          transition: all .2s;
        }
        .foot-mob-admin {
          background: rgba(255,255,255,.05) !important;
          border: 1px solid rgba(255,255,255,.1) !important;
          color: rgba(255,255,255,.3) !important;
        }
        .foot-mob-admin:hover {
          color: rgba(255,255,255,.6) !important;
        }

        @media (max-width:640px) {
          .foot-bot      { flex-direction:column; align-items:stretch; padding:10px 18px 16px; gap:6px; }
          .foot-copy     { font-size:11px; text-align:center; line-height:1.7; display:block !important; }
          .foot-bl-desk  { display:none !important; }
          .foot-mob-wrap { display:flex !important; }
        }
      `}</style>
    </footer>
  )
}