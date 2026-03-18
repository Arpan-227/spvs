import { Link } from 'react-router-dom'
// Mobile sticky bottom bar (shown on mobile only via CSS)
export default function AdmissionCTA() {
  return (
    <div className="mob-cta">
      <Link to="/contact" className="mcta-1">📋 Apply Now</Link>
      <a href="tel:+919198783830" className="mcta-2">📞 Call Us</a>
    </div>
  )
}