import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteStatusAPI } from '../../api'

function MaintenancePage() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#FFF6EA', gap:'20px', padding:'40px', textAlign:'center' }}>
      <div style={{ fontSize:'72px' }}>🔧</div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'32px', color:'#1C0A00', margin:0 }}>
        Under Maintenance
      </h1>
      <p style={{ fontSize:'15px', color:'#7A4010', maxWidth:'440px', lineHeight:'1.8', margin:0 }}>
        This page is currently under maintenance. We are working hard to improve your experience. Please check back soon.
      </p>
      <a href="/" style={{ padding:'12px 32px', borderRadius:'10px', background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', textDecoration:'none', fontWeight:'800', fontSize:'14px', boxShadow:'0 4px 14px rgba(232,118,26,.3)' }}>
        ← Back to Home
      </a>
    </div>
  )
}

function ComingSoonPage() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#F5F0FF', gap:'20px', padding:'40px', textAlign:'center' }}>
      <div style={{ fontSize:'72px' }}>🔜</div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'32px', color:'#1C0A00', margin:0 }}>
        Coming Soon
      </h1>
      <p style={{ fontSize:'15px', color:'#7A4010', maxWidth:'440px', lineHeight:'1.8', margin:0 }}>
        We are working on something exciting! This page will be available very soon.
      </p>
      <a href="/" style={{ padding:'12px 32px', borderRadius:'10px', background:'linear-gradient(135deg,#6C3FC5,#9B6DFF)', color:'#fff', textDecoration:'none', fontWeight:'800', fontSize:'14px', boxShadow:'0 4px 14px rgba(108,63,197,.3)' }}>
        ← Back to Home
      </a>
    </div>
  )
}

function OfflinePage() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#FFF0F0', gap:'20px', padding:'40px', textAlign:'center' }}>
      <div style={{ fontSize:'72px' }}>🔴</div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'32px', color:'#1C0A00', margin:0 }}>
        Page Offline
      </h1>
      <p style={{ fontSize:'15px', color:'#7A4010', maxWidth:'440px', lineHeight:'1.8', margin:0 }}>
        This page is currently offline. Please try again later or contact the school office.
      </p>
      <a href="/" style={{ padding:'12px 32px', borderRadius:'10px', background:'linear-gradient(135deg,#dc2626,#ef4444)', color:'#fff', textDecoration:'none', fontWeight:'800', fontSize:'14px', boxShadow:'0 4px 14px rgba(220,38,38,.3)' }}>
        ← Back to Home
      </a>
    </div>
  )
}

export default function SiteStatusGuard({ children }) {
  var location = useLocation()
  var [status,  setStatus]  = useState('live')
  var [checked, setChecked] = useState(false)

  useEffect(function() {
    siteStatusAPI.getAll()
      .then(function(res) {
        var pages = res.data || []
        var currentPath = location.pathname
        var page = pages.find(function(p) { return p.path === currentPath })
        setStatus(page ? page.status : 'live')
        setChecked(true)
      })
      .catch(function() {
        setStatus('live')
        setChecked(true)
      })
  }, [location.pathname])

  if (!checked) return null
  if (status === 'maintenance') return <MaintenancePage />
  if (status === 'coming_soon') return <ComingSoonPage />
  if (status === 'offline')     return <OfflinePage />
  return children
}