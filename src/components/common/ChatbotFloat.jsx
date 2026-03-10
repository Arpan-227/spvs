import { useState } from 'react'

const QUICK = {
  'admission': 'Admissions are open for 2025-26! Classes Play Group to XII. Call +91 9198783830 or visit us at Pashupati Nagar, Bahraich.',
  'fee': 'Fee ranges from ₹1,600/month (Play Group) to ₹3,300/month (XI-XII). Annual fee extra. Call us for details: +91 9198783830.',
  'hostel': 'We have a Boys hostel with 24×7 security, visiting doctor, yoga, sports facilities, clean mess, and affordable dorms.',
  'transport': 'We run 22 school buses covering all routes in and around Bahraich. Contact transport: +91 7985287461.',
  'result': 'SPVS achieves 100% pass rate in board exams. Our students excel in Science, Commerce & Humanities streams.',
  'cbse': 'Yes! CBSE Affiliation No. 2130176. School No. 70178. Affiliated since 1987.',
}

export default function ChatbotFloat() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("👋 Hello! I'm your SPVS guide. Ask me about admissions, fees, hostel, transport or results!")
  const [inp, setInp] = useState('')

  const send = () => {
    if (!inp.trim()) return
    const q = inp.toLowerCase()
    let reply = "For detailed information, please call +91 9198783830 or email spvbrh@gmail.com. We're happy to help!"
    for (const [k, v] of Object.entries(QUICK)) {
      if (q.includes(k)) { reply = v; break }
    }
    setMsg(reply)
    setInp('')
  }

  return (
    <>
      <div className="chat-float">
        <button className="chat-btn" onClick={() => setOpen(o => !o)} aria-label="Open chat">🤖</button>
        <span className="chat-tip">AI Chat</span>
      </div>
      <div className={`chat-popup${open ? ' open' : ''}`} id="chatPop">
        <button className="cp-close" onClick={() => setOpen(false)}>✕</button>
        <div className="cp-head">
          <div className="cp-av">🤖</div>
          <div>
            <div className="cp-name">SPVS Assistant</div>
            <div className="cp-status"><span className="cp-dot"></span>Online Now</div>
          </div>
        </div>
        <div className="cp-msg">{msg}</div>
        <div className="cp-row">
          <input
            className="cp-input"
            value={inp}
            placeholder="Type your question..."
            onChange={e => setInp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button className="cp-send" onClick={send}>→</button>
        </div>
      </div>
    </>
  )
}