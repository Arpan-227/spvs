import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { settingsAPI } from '../../api'
import { FaSchool, FaPhone, FaClipboardList } from 'react-icons/fa'

export default function AdmissionCTA() {
  var [admission, setAdmission] = useState(null)
  var [loaded, setLoaded]       = useState(false)

  useEffect(function() {
    settingsAPI.get('admission')
      .then(function(res){ setAdmission(res.data); setLoaded(true) })
      .catch(function(){ setLoaded(true) })
  }, [])

  if (!loaded) return null
  if (!admission || !admission.showBanner) return null

  var session = admission.session || '2026-27'

  return (
    <div className="mob-cta">
      {admission.open ? (
        <Link to="/contact" className="mcta-1" style={{display:'flex',alignItems:'center',gap:'7px'}}>
          <FaSchool size={14}/> Apply Now — {session}
        </Link>
      ) : (
        <span className="mcta-1" style={{opacity:0.7,cursor:'default',display:'flex',alignItems:'center',gap:'7px'}}>
          <FaClipboardList size={14}/> Admissions Closed
        </span>
      )}
      <a href="tel:+919198783830" className="mcta-2" style={{display:'flex',alignItems:'center',gap:'7px'}}>
        <FaPhone size={13}/> Call Us
      </a>
    </div>
  )
}