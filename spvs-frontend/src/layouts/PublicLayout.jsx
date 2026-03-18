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

      {/* Scroll-to-top — right side, always above chatbot icon */}
      <button
        className={`stbtn${showTop ? ' vis' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >↑</button>

      <style>{`
        /*
          Stack order on ALL screens (bottom → top):
          ┌─────────────────────────────┐
          │  Chatbot     right:16 bot:24  │  ≈52px tall
          │  Scroll↑     right:16 bot:88  │  (24 + 52 + 12gap)
          └─────────────────────────────┘
        */
        .stbtn {
          position: fixed;
          right: 16px;
          bottom: 88px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8761A, #F5B800);
          color: #fff;
          border: none;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          z-index: 450;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 20px rgba(232,118,26,.4);
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
          transition: opacity .3s ease, transform .3s ease, box-shadow .3s ease;
        }
        .stbtn.vis {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        .stbtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(232,118,26,.55);
        }

        /*
          Mobile stack (bottom → top):
          ┌──────────────────────────────────┐
          │  AdmissionCTA bar   bot:0  h≈60   │
          │  Chatbot            bot:124        │
          │  Scroll↑            bot:178        │  (124 + 44 + 10gap)
          └──────────────────────────────────┘
        */
        @media (max-width: 768px) {
          .stbtn {
            right: 14px;
            bottom: 178px;
            width: 38px;
            height: 38px;
            font-size: 15px;
          }
        }

        /* Very small phones — chatbot hidden, drop scroll btn closer to bottom */
        @media (max-width: 390px) {
          .stbtn {
            right: 14px;
            bottom: 80px;
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  )
}