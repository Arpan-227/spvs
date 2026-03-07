import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/common/ScrollToTop'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import WhatsAppFloat from '../components/common/WhatsAppFloat'
import ChatbotFloat from '../components/common/ChatbotFloat'
import AdmissionCTA from '../components/home/AdmissionCTA'

export default function PublicLayout() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppFloat />
      <ChatbotFloat />
      <AdmissionCTA />
      <button
        className={`stbtn${showTop ? ' vis' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >↑</button>
    </>
  )
}