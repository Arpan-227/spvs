import { useState, useRef, useEffect } from 'react'

/* ─── Certificate types ─────────────────────────── */
var CERTS = [
  { id:'slc',       label:'SLC',                  full:'School Leaving Certificate', icon:'🎓', color:'#E8761A' },
  { id:'tc',        label:'TC',                   full:'Transfer Certificate',        icon:'📋', color:'#22a35a' },
  { id:'migration', label:'Migration Certificate', full:'Migration Certificate',       icon:'📄', color:'#1a6bbf' },
  { id:'syllabus',  label:'Syllabus',              full:'Syllabus',                    icon:'📚', color:'#6C3FC5' },
  { id:'results',   label:'Results',               full:'Results / Marksheet',         icon:'🏆', color:'#C45F0A' },
  { id:'holidays',  label:'Holidays List',         full:'Annual Holidays List',        icon:'📅', color:'#B87832' },
]

var MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December']
var WDAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa']

/* ══════════════════════════════════════════
   UNIQUE CALENDAR PICKER
══════════════════════════════════════════ */
function CalendarPicker({ value, onChange, hasError }) {
  var parsed   = value ? new Date(value+'T00:00:00') : null
  var [open,   setOpen]   = useState(false)
  var [view,   setView]   = useState('day')
  var [month,  setMonth]  = useState(parsed ? parsed.getMonth()    : 3)
  var [year,   setYear]   = useState(parsed ? parsed.getFullYear() : 2005)
  var [yrBase, setYrBase] = useState(Math.floor((parsed ? parsed.getFullYear() : 2005) / 12) * 12)
  var ref = useRef()

  useEffect(function () {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return function () { document.removeEventListener('mousedown', h) }
  }, [])

  /* build 42-cell grid */
  var firstDay  = new Date(year, month, 1).getDay()
  var daysInMon = new Date(year, month + 1, 0).getDate()
  var prevDays  = new Date(year, month, 0).getDate()
  var cells = []
  for (var i = 0; i < firstDay; i++) cells.push({ n: prevDays - firstDay + 1 + i, ghost: true })
  for (var d = 1; d <= daysInMon; d++) cells.push({ n: d, ghost: false })
  var rem = 42 - cells.length
  for (var k = 1; k <= rem; k++) cells.push({ n: k, ghost: true })

  function pickDay(n) {
    var dt = new Date(year, month, n)
    onChange(dt.toISOString().split('T')[0])
    setOpen(false)
    setView('day')
  }
  function prevM() { if (month === 0) { setMonth(11); setYear(function(y){return y-1}) } else setMonth(function(m){return m-1}) }
  function nextM() { if (month === 11) { setMonth(0);  setYear(function(y){return y+1}) } else setMonth(function(m){return m+1}) }

  var isSel   = function (n, g) { return !g && parsed && parsed.getFullYear()===year && parsed.getMonth()===month && parsed.getDate()===n }
  var isToday = function (n, g) { var t=new Date(); return !g && t.getFullYear()===year && t.getMonth()===month && t.getDate()===n }

  var display = parsed ? parsed.toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' }) : ''
  var yrGrid  = Array.from({ length: 12 }, function (_, i) { return yrBase + i })

  var inputBorder = hasError ? '#e74c3c' : open ? '#E8761A' : 'rgba(232,118,26,.22)'

  return (
    <div ref={ref} style={{ position:'relative', width:'100%' }}>

      {/* ── Trigger ── */}
      <div onClick={function () { setOpen(function(o){return !o}) }}
        style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', borderRadius:'14px', border:'1.5px solid '+inputBorder, background:'#FFFDF8', cursor:'pointer', transition:'border .2s, box-shadow .2s', boxShadow: open ? '0 0 0 3px rgba(232,118,26,.12)' : 'none', userSelect:'none' }}>
        <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:'linear-gradient(135deg,#E8761A,#F5B800)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>📅</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'10px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'2px' }}>Date of Birth</div>
          <div style={{ fontSize:'14px', fontWeight: parsed?'700':'400', color: parsed?'#1C0A00':'rgba(184,120,50,.55)' }}>
            {parsed ? display : 'Select your date of birth'}
          </div>
        </div>
        <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition:'transform .25s', transform: open?'rotate(180deg)':'none', flexShrink:0 }}>
          <path d="M1 1l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* ── Calendar dropdown ── */}
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 10px)', left:0, right:0, zIndex:9999, background:'#FFFFFF', borderRadius:'22px', boxShadow:'0 32px 80px rgba(28,10,0,.2)', border:'1.5px solid rgba(232,118,26,.15)', overflow:'hidden', animation:'calDrop .22s cubic-bezier(.34,1.56,.64,1)' }}>

          {/* Header bar */}
          <div style={{ background:'linear-gradient(135deg,#1C0A00,#3D1A00)', padding:'13px 15px' }}>
            {view === 'day' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <CBtn onClick={prevM}>‹</CBtn>
                <div style={{ display:'flex', gap:'7px' }}>
                  <CHdr onClick={function () { setView('month') }}>{MONTHS[month].slice(0,3)}</CHdr>
                  <CHdr onClick={function () { setView('year') }}>{year}</CHdr>
                </div>
                <CBtn onClick={nextM}>›</CBtn>
              </div>
            )}
            {view === 'month' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'14px', fontWeight:'700', color:'#FFCF40' }}>Choose Month</span>
                <CHdr onClick={function () { setView('day') }}>← Back</CHdr>
              </div>
            )}
            {view === 'year' && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <CBtn onClick={function () { setYrBase(function(b){return b-12}) }}>‹</CBtn>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'13px', fontWeight:'700', color:'#FFCF40' }}>{yrBase} – {yrBase+11}</span>
                <CBtn onClick={function () { setYrBase(function(b){return b+12}) }}>›</CBtn>
              </div>
            )}
          </div>

          <div style={{ padding:'12px 13px' }}>

            {/* Day grid */}
            {view === 'day' && (
              <>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:'4px' }}>
                  {WDAYS.map(function (w) {
                    return <div key={w} style={{ textAlign:'center', fontSize:'9.5px', fontWeight:'900', color:'#B87832', padding:'3px 0', letterSpacing:'.5px' }}>{w}</div>
                  })}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px' }}>
                  {cells.map(function (cell, i) {
                    var sel = isSel(cell.n, cell.ghost)
                    var tod = isToday(cell.n, cell.ghost)
                    return (
                      <button key={i} onClick={function () { if (!cell.ghost) pickDay(cell.n) }}
                        style={{ height:'34px', borderRadius:'9px', border: tod&&!sel ? '1.5px solid #E8761A' : 'none', background: sel ? 'linear-gradient(135deg,#E8761A,#F5B800)' : 'transparent', color: cell.ghost?'rgba(180,120,50,.2)' : sel?'#1C0A00' : tod?'#E8761A':'#2C1500', fontSize:'12.5px', fontWeight: sel||tod?'800':'500', cursor: cell.ghost?'default':'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .15s' }}
                        onMouseEnter={function (e) { if (!cell.ghost && !sel) e.currentTarget.style.background='rgba(232,118,26,.1)' }}
                        onMouseLeave={function (e) { if (!cell.ghost && !sel) e.currentTarget.style.background='transparent' }}>
                        {cell.n}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {/* Month grid */}
            {view === 'month' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px' }}>
                {MONTHS.map(function (m, i) {
                  var act = i === month
                  return (
                    <button key={m} onClick={function () { setMonth(i); setView('day') }}
                      style={{ padding:'11px 4px', borderRadius:'11px', border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'), background: act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8', color: act?'#1C0A00':'#3D1A00', fontSize:'12.5px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .15s' }}
                      onMouseEnter={function (e) { if (!act) e.currentTarget.style.background='#FFF3E0' }}
                      onMouseLeave={function (e) { if (!act) e.currentTarget.style.background='#FFFDF8' }}>
                      {m.slice(0, 3)}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Year grid */}
            {view === 'year' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'5px' }}>
                {yrGrid.map(function (y) {
                  var act = y === year
                  return (
                    <button key={y} onClick={function () { setYear(y); setView('month') }}
                      style={{ padding:'10px 2px', borderRadius:'11px', border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'), background: act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8', color: act?'#1C0A00':'#3D1A00', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .15s' }}
                      onMouseEnter={function (e) { if (!act) e.currentTarget.style.background='#FFF3E0' }}
                      onMouseLeave={function (e) { if (!act) e.currentTarget.style.background='#FFFDF8' }}>
                      {y}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div style={{ padding:'8px 14px 11px', borderTop:'1px solid rgba(232,118,26,.08)', textAlign:'center', fontSize:'10.5px', color:'#B87832', fontWeight:'600' }}>
            Year → Month → Date
          </div>
        </div>
      )}
    </div>
  )
}

/* small calendar helper buttons */
function CBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(255,255,255,.1)', border:'none', color:'#FFCF40', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit', transition:'background .15s' }}
      onMouseEnter={function (e) { e.currentTarget.style.background='rgba(232,118,26,.3)' }}
      onMouseLeave={function (e) { e.currentTarget.style.background='rgba(255,255,255,.1)' }}>
      {children}
    </button>
  )
}
function CHdr({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding:'4px 11px', borderRadius:'7px', background:'rgba(232,118,26,.18)', border:'1px solid rgba(232,118,26,.3)', color:'#FFCF40', fontSize:'12px', fontWeight:'800', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background .15s' }}
      onMouseEnter={function (e) { e.currentTarget.style.background='rgba(232,118,26,.32)' }}
      onMouseLeave={function (e) { e.currentTarget.style.background='rgba(232,118,26,.18)' }}>
      {children}
    </button>
  )
}

/* ══════════════════════════════════════════
   RESULT / DOWNLOAD SCREEN
══════════════════════════════════════════ */
function ResultScreen({ certId, regNo, dob, onBack }) {
  var [phase, setPhase] = useState('verifying')
  var cert = CERTS.find(function (c) { return c.id === certId })

  useEffect(function () {
    var t = setTimeout(function () {
      setPhase(regNo.trim().length >= 4 ? 'success' : 'fail')
    }, 3200)
    return function () { clearTimeout(t) }
  }, [])

  function downloadCert() {
    var dobFmt  = new Date(dob+'T00:00:00').toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' })
    var today   = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' })
    var serial  = 'SPVS/' + new Date().getFullYear() + '/' + Math.floor(Math.random()*90000+10000)

    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + cert.full + ' — SPVS</title><style>*{margin:0;padding:0;box-sizing:border-box}@import url(\'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;600;700&display=swap\');body{font-family:"DM Sans",sans-serif;background:#f5f0e8;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}.page{width:760px;background:#fff;position:relative;overflow:hidden}.top-stripe{height:6px;background:linear-gradient(90deg,#E8761A,#F5B800,#E8761A)}.content{padding:44px 50px 50px}.watermark{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-35deg);font-family:"Playfair Display",serif;font-size:80px;color:rgba(232,118,26,.04);font-weight:700;white-space:nowrap;pointer-events:none;user-select:none}.header{text-align:center;margin-bottom:28px}.school-logo{font-size:52px;margin-bottom:10px}.school-name{font-family:"Playfair Display",serif;font-size:26px;font-weight:700;color:#1C0A00;letter-spacing:.3px}.school-info{font-size:12px;color:#7A4010;margin-top:6px;line-height:1.7}.divider{height:3px;background:linear-gradient(90deg,transparent,#E8761A,#F5B800,#E8761A,transparent);margin:22px 0;border-radius:2px}.cert-badge{text-align:center;margin:20px 0}.cert-icon{font-size:42px;margin-bottom:8px}.cert-title{font-family:"Playfair Display",serif;font-size:22px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#1C0A00}.cert-line{width:80px;height:2px;background:linear-gradient(90deg,#E8761A,#F5B800);margin:10px auto 0}.fields{margin:28px 0}.field-row{display:flex;align-items:baseline;padding:11px 0;border-bottom:1px dashed rgba(232,118,26,.18)}.field-label{width:200px;font-size:11.5px;font-weight:700;color:#B87832;text-transform:uppercase;letter-spacing:.5px;flex-shrink:0}.field-value{flex:1;font-size:14.5px;font-weight:600;color:#1C0A00}.footer-row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:50px;padding-top:24px;border-top:1px solid rgba(232,118,26,.12)}.sig{text-align:center}.sig-line{width:140px;border-top:1.5px solid #3D1A00;margin-bottom:8px}.sig-name{font-size:12px;font-weight:700;color:#1C0A00}.sig-title{font-size:10.5px;color:#B87832;margin-top:2px}.seal{width:88px;height:88px;border-radius:50%;border:3px double #E8761A;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:9px;font-weight:800;color:#E8761A;line-height:1.5;letter-spacing:.3px}.serial{text-align:center;margin-top:20px;font-size:10px;color:rgba(184,120,50,.5);letter-spacing:1px}.bottom-stripe{height:4px;background:linear-gradient(90deg,#E8761A,#F5B800,#E8761A)}</style></head><body><div class="page"><div class="top-stripe"></div><div class="content"><div class="watermark">SANT PATHIK VIDYALAYA</div><div class="header"><div class="school-logo">🏫</div><div class="school-name">Sant Pathik Vidyalaya</div><div class="school-info">CBSE Affiliated Senior Secondary School<br>Affiliation No. 2130176 &nbsp;·&nbsp; School No. 70178 &nbsp;·&nbsp; Est. 1987<br>Pashupati Nagar, Bahraich, Uttar Pradesh – 271802<br>📞 +91 9198783830 &nbsp;|&nbsp; ✉ spvbrh@gmail.com</div></div><div class="divider"></div><div class="cert-badge"><div class="cert-icon">' + cert.icon + '</div><div class="cert-title">' + cert.full + '</div><div class="cert-line"></div></div><div class="fields"><div class="field-row"><div class="field-label">Registration No.</div><div class="field-value">' + regNo.toUpperCase() + '</div></div><div class="field-row"><div class="field-label">Date of Birth</div><div class="field-value">' + dobFmt + '</div></div><div class="field-row"><div class="field-label">Certificate Type</div><div class="field-value">' + cert.full + '</div></div><div class="field-row"><div class="field-label">Date of Issue</div><div class="field-value">' + today + '</div></div><div class="field-row"><div class="field-label">Issued By</div><div class="field-value">Sant Pathik Vidyalaya, Bahraich</div></div><div class="field-row"><div class="field-label">Principal</div><div class="field-value">Mrs. Pooja Agarwal &nbsp;(M.A., B.Ed)</div></div><div class="field-row"><div class="field-label">CBSE Affiliation</div><div class="field-value">2130176</div></div></div><div class="footer-row"><div class="sig"><div class="sig-line"></div><div class="sig-name">Student Signature</div></div><div class="seal">SPVS<br>OFFICIAL<br>SEAL<br>' + new Date().getFullYear() + '</div><div class="sig"><div class="sig-line"></div><div class="sig-name">Mrs. Pooja Agarwal</div><div class="sig-title">Principal</div></div></div><div class="serial">Serial No: ' + serial + '</div></div><div class="bottom-stripe"></div></div></body></html>'

    var blob = new Blob([html], { type:'text/html' })
    var url  = URL.createObjectURL(blob)
    var a    = document.createElement('a')
    a.href     = url
    a.download = cert.id + '-' + regNo.toUpperCase() + '.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight:'62vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 24px' }}>

      {/* ── Verifying ── */}
      {phase === 'verifying' && (
        <div style={{ textAlign:'center', maxWidth:'380px' }}>
          <div style={{ width:'82px', height:'82px', margin:'0 auto 28px', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'3px solid rgba(232,118,26,.1)', borderTop:'3px solid #E8761A', animation:'spin 1s linear infinite' }} />
            <div style={{ position:'absolute', inset:'10px', borderRadius:'50%', border:'2px solid rgba(245,184,0,.15)', borderBottom:'2px solid #F5B800', animation:'spin 1.4s linear reverse infinite' }} />
            <div style={{ position:'absolute', inset:'20px', borderRadius:'50%', background:'linear-gradient(135deg,rgba(232,118,26,.1),rgba(245,184,0,.1))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>🔍</div>
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:'#1C0A00', marginBottom:'8px' }}>Verifying Details…</div>
          <div style={{ fontSize:'14px', color:'#B87832', marginBottom:'24px' }}>Cross-checking with school records</div>
          <div style={{ display:'flex', gap:'6px', justifyContent:'center' }}>
            {[0,1,2].map(function (i) {
              return <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#E8761A', animation:'dotBounce 1.3s ease-in-out '+(i*0.18)+'s infinite' }} />
            })}
          </div>
        </div>
      )}

      {/* ── Success ── */}
      {phase === 'success' && (
        <div style={{ width:'100%', maxWidth:'560px', textAlign:'center' }}>
          {/* Tick */}
          <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'linear-gradient(135deg,#22a35a,#2ecc71)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', margin:'0 auto 22px', boxShadow:'0 8px 32px rgba(34,163,90,.28)', animation:'popIn .45s cubic-bezier(.34,1.56,.64,1)' }}>✓</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'26px', fontWeight:'700', color:'#1C0A00', marginBottom:'6px' }}>Verified Successfully!</div>
          <div style={{ fontSize:'14px', color:'#7A4010', marginBottom:'30px' }}>Your certificate is ready to download.</div>

          {/* Preview card */}
          <div style={{ background:'linear-gradient(135deg,#FFF9F0,#FEF0D4)', borderRadius:'22px', border:'2px solid rgba(232,118,26,.18)', padding:'28px 26px', marginBottom:'26px', position:'relative', overflow:'hidden', textAlign:'left' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(90deg,#E8761A,#F5B800)' }} />
            <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:cert.color+'18', border:'2px solid '+cert.color+'30', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', flexShrink:0 }}>{cert.icon}</div>
              <div>
                <div style={{ fontSize:'12px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase' }}>Certificate Ready</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'17px', fontWeight:'700', color:'#1C0A00', marginTop:'2px' }}>{cert.full}</div>
              </div>
            </div>
            {[
              { l:'Registration No.', v: regNo.toUpperCase() },
              { l:'Date of Birth',    v: new Date(dob+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'}) },
              { l:'Issued By',        v: 'Sant Pathik Vidyalaya, Bahraich' },
            ].map(function (row) {
              return (
                <div key={row.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px dashed rgba(232,118,26,.14)', fontSize:'13.5px' }}>
                  <span style={{ color:'#B87832', fontWeight:'700' }}>{row.l}</span>
                  <span style={{ color:'#1C0A00', fontWeight:'700' }}>{row.v}</span>
                </div>
              )
            })}
          </div>

          {/* Buttons */}
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={downloadCert}
              style={{ display:'inline-flex', alignItems:'center', gap:'9px', padding:'14px 32px', borderRadius:'14px', background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#1C0A00', fontWeight:'900', fontSize:'15px', border:'none', cursor:'pointer', boxShadow:'0 8px 28px rgba(232,118,26,.32)', fontFamily:"'DM Sans',sans-serif", transition:'all .22s' }}
              onMouseEnter={function (e) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(232,118,26,.44)' }}
              onMouseLeave={function (e) { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 28px rgba(232,118,26,.32)' }}>
              ⬇&nbsp; Download Certificate
            </button>
            <button onClick={onBack}
              style={{ padding:'14px 26px', borderRadius:'14px', background:'transparent', color:'#E8761A', fontWeight:'700', fontSize:'14px', border:'1.5px solid rgba(232,118,26,.28)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s' }}
              onMouseEnter={function (e) { e.currentTarget.style.background='#FFF6EA' }}
              onMouseLeave={function (e) { e.currentTarget.style.background='transparent' }}>
              ← New Request
            </button>
          </div>
        </div>
      )}

      {/* ── Fail ── */}
      {phase === 'fail' && (
        <div style={{ textAlign:'center', maxWidth:'460px' }}>
          <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'linear-gradient(135deg,#e74c3c,#c0392b)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'34px', margin:'0 auto 22px', boxShadow:'0 8px 28px rgba(231,76,60,.28)', animation:'popIn .45s cubic-bezier(.34,1.56,.64,1)' }}>✕</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:'#1C0A00', marginBottom:'8px' }}>Verification Failed</div>
          <div style={{ fontSize:'14px', color:'#7A4010', marginBottom:'12px' }}>No record found matching your details.</div>
          <div style={{ padding:'14px 18px', borderRadius:'14px', background:'rgba(231,76,60,.05)', border:'1.5px solid rgba(231,76,60,.14)', fontSize:'13px', color:'#7A4010', lineHeight:'1.65', marginBottom:'28px' }}>
            Please ensure your <strong>Registration Number</strong> and <strong>Date of Birth</strong> are entered exactly as per school records, or contact the office directly.
          </div>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={onBack}
              style={{ padding:'13px 28px', borderRadius:'13px', background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#1C0A00', fontWeight:'800', fontSize:'14px', border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(232,118,26,.28)', fontFamily:"'DM Sans',sans-serif" }}>
              ← Try Again
            </button>
            <a href="tel:+919198783830"
              style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'13px 22px', borderRadius:'13px', background:'transparent', color:'#E8761A', fontWeight:'700', fontSize:'14px', border:'1.5px solid rgba(232,118,26,.28)', textDecoration:'none', fontFamily:"'DM Sans',sans-serif" }}>
              📞 Call School
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function CertificatePage() {
  var [regNo,     setRegNo]     = useState('')
  var [dob,       setDob]       = useState('')
  var [certType,  setCertType]  = useState('')
  var [dropOpen,  setDropOpen]  = useState(false)
  var [submitted, setSubmitted] = useState(false)
  var [errors,    setErrors]    = useState({})
  var [touched,   setTouched]   = useState({})
  var dropRef = useRef()

  useEffect(function () {
    function h(e) { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', h)
    return function () { document.removeEventListener('mousedown', h) }
  }, [])

  function validate() {
    var e = {}
    if (!regNo.trim())  e.regNo    = 'Registration number is required'
    if (!dob)           e.dob      = 'Date of birth is required'
    if (!certType)      e.certType = 'Please select a certificate'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    setTouched({ regNo:true, dob:true, certType:true })
    if (!validate()) return
    setSubmitted(true)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  var selCert = CERTS.find(function (c) { return c.id === certType })

  /* ── Result screen ── */
  if (submitted) {
    return (
      <>
        <style>{`
          @keyframes spin      { to { transform: rotate(360deg) } }
          @keyframes dotBounce { 0%,80%,100% { transform:translateY(0) } 40% { transform:translateY(-10px) } }
          @keyframes popIn     { 0% { transform:scale(0) } 100% { transform:scale(1) } }
        `}</style>
        <div style={{ fontFamily:"'DM Sans',sans-serif", minHeight:'100vh', background:'#FFFDF8' }}>
          <div style={{ background:'linear-gradient(135deg,#1C0A00,#3D1A00)', padding:'28px 24px', textAlign:'center' }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#FFCF40' }}>Sant Pathik Vidyalaya</div>
            <div style={{ fontSize:'12px', color:'rgba(255,210,130,.45)', marginTop:'3px' }}>Certificate Verification Portal</div>
          </div>
          <ResultScreen certId={certType} regNo={regNo} dob={dob}
            onBack={function () { setSubmitted(false); setRegNo(''); setDob(''); setCertType(''); setErrors({}); setTouched({}) }} />
        </div>
      </>
    )
  }

  /* ── Form page ── */
  return (
    <>
      <style>{`
        @keyframes calDrop { from { opacity:0; transform:translateY(-10px) scale(.97) } to { opacity:1; transform:none } }
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:none } }
        @keyframes badgePop   { from { opacity:0; transform:scale(.85) } to { opacity:1; transform:scale(1) } }
      `}</style>

      <div style={{ fontFamily:"'DM Sans',sans-serif", minHeight:'100vh', background:'#FFFDF8' }}>

        {/* ════ HERO ════ */}
        <section style={{ background:'linear-gradient(145deg,#1C0A00 0%,#2E1100 45%,#1C0A00 100%)', padding:'88px 24px 76px', position:'relative', overflow:'hidden', textAlign:'center' }}>

          {/* bg dots */}
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(232,118,26,.07) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
          {/* glow blobs */}
          <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(232,118,26,.09),transparent 65%)', top:'-160px', right:'-120px', pointerEvents:'none' }} />
          <div style={{ position:'absolute', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(245,184,0,.06),transparent 65%)', bottom:'-100px', left:'-80px', pointerEvents:'none' }} />

          <div style={{ maxWidth:'620px', margin:'0 auto', position:'relative', zIndex:1, animation:'heroFadeUp .7s ease both' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'50px', background:'rgba(245,184,0,.1)', border:'1px solid rgba(245,184,0,.22)', color:'#F5B800', fontSize:'12px', fontWeight:'800', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'22px', animation:'badgePop .5s .2s ease both' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#F5B800', animation:'dotBounce 2s infinite', display:'inline-block' }} />
              Certificate Portal
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(30px,5vw,54px)', fontWeight:'700', color:'#FFFDF8', margin:'0 0 16px', lineHeight:1.12 }}>
              Request Your<br />
              <span style={{ background:'linear-gradient(90deg,#E8761A,#F5B800,#E8761A)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Certificate Online</span>
            </h1>
            <p style={{ fontSize:'clamp(14px,2vw,16px)', color:'rgba(255,220,150,.6)', lineHeight:1.8, maxWidth:'460px', margin:'0 auto 32px' }}>
              Enter your registration number and date of birth to verify and instantly download your official certificate from Sant Pathik Vidyalaya.
            </p>

            {/* 6 cert chips */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', justifyContent:'center' }}>
              {CERTS.map(function (c) {
                return (
                  <div key={c.id} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 13px', borderRadius:'50px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', fontSize:'12px', fontWeight:'600', color:'rgba(255,220,150,.7)' }}>
                    <span>{c.icon}</span>{c.label}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ════ FORM ════ */}
        <section style={{ padding:'60px 24px 80px', display:'flex', justifyContent:'center' }}>
          <div style={{ width:'100%', maxWidth:'560px' }}>

            {/* Card */}
            <div style={{ background:'#FFFFFF', borderRadius:'28px', boxShadow:'0 24px 72px rgba(28,10,0,.1)', border:'1.5px solid rgba(232,118,26,.1)' }}>

              {/* Card header */}
              <div style={{ background:'linear-gradient(135deg,#E8761A,#F5B800)', padding:'20px 28px', display:'flex', alignItems:'center', gap:'14px', borderRadius:'26px 26px 0 0' }}>
                <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:'rgba(255,255,255,.22)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', flexShrink:0 }}>🏫</div>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'17px', fontWeight:'700', color:'#1C0A00' }}>Verify &amp; Download Certificate</div>
                  <div style={{ fontSize:'12px', color:'rgba(28,10,0,.55)', marginTop:'2px' }}>Fill all details as per school records</div>
                </div>
              </div>

              <div style={{ padding:'30px 28px 28px', display:'flex', flexDirection:'column', gap:'22px' }}>

                {/* ── Field 1: Registration Number ── */}
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'8px' }}>
                    Registration Number <span style={{ color:'#e74c3c' }}>*</span>
                  </label>
                  <div style={{ position:'relative' }}>
                    <div style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', width:'38px', height:'38px', borderRadius:'10px', background:'linear-gradient(135deg,#E8761A,#F5B800)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🎫</div>
                    <input value={regNo}
                      onChange={function (e) { setRegNo(e.target.value); if (touched.regNo) setErrors(function(err){return{...err,regNo:''}}) }}
                      placeholder="e.g. SPVS2024001"
                      style={{ width:'100%', padding:'14px 16px 14px 64px', borderRadius:'14px', border:'1.5px solid '+(errors.regNo&&touched.regNo?'#e74c3c':'rgba(232,118,26,.2)'), background:'#FFFDF8', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'600', outline:'none', boxSizing:'border-box', transition:'border .2s, box-shadow .2s' }}
                      onFocus={function (e) { e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }}
                      onBlur={function (e) { setTouched(function(t){return{...t,regNo:true}}); e.target.style.borderColor=errors.regNo?'#e74c3c':'rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }} />
                  </div>
                  {errors.regNo && touched.regNo && <div style={{ fontSize:'12px', color:'#e74c3c', marginTop:'6px', fontWeight:'600', display:'flex', gap:'4px', alignItems:'center' }}>⚠ {errors.regNo}</div>}
                </div>

                {/* ── Field 2: Date of Birth ── */}
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'8px' }}>
                    Date of Birth <span style={{ color:'#e74c3c' }}>*</span>
                  </label>
                  <CalendarPicker value={dob} onChange={function (v) { setDob(v); if (touched.dob) setErrors(function(err){return{...err,dob:''}}) }} hasError={!!(errors.dob && touched.dob)} />
                  {errors.dob && touched.dob && <div style={{ fontSize:'12px', color:'#e74c3c', marginTop:'6px', fontWeight:'600' }}>⚠ {errors.dob}</div>}
                </div>

                {/* ── Field 3: Certificate Type ── */}
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'8px' }}>
                    Certificate Type <span style={{ color:'#e74c3c' }}>*</span>
                  </label>
                  <div ref={dropRef} style={{ position:'relative' }}>
                    <div onClick={function () { setDropOpen(function(o){return !o}) }}
                      style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', borderRadius:'14px', border:'1.5px solid '+(errors.certType&&touched.certType?'#e74c3c':dropOpen?'#E8761A':'rgba(232,118,26,.2)'), background:'#FFFDF8', cursor:'pointer', transition:'border .2s, box-shadow .2s', boxShadow:dropOpen?'0 0 0 3px rgba(232,118,26,.1)':'none', userSelect:'none' }}>
                      <div style={{ width:'40px', height:'40px', borderRadius:'10px', background: selCert ? selCert.color+'18' : 'rgba(232,118,26,.08)', border:'1.5px solid '+(selCert ? selCert.color+'30' : 'rgba(232,118,26,.14)'), display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>
                        {selCert ? selCert.icon : '📜'}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'10px', fontWeight:'800', color:'#B87832', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'2px' }}>Certificate</div>
                        <div style={{ fontSize:'14px', fontWeight: selCert?'700':'400', color: selCert?'#1C0A00':'rgba(184,120,50,.55)' }}>
                          {selCert ? selCert.full : 'Select certificate type'}
                        </div>
                      </div>
                      <svg width="10" height="6" viewBox="0 0 10 6" style={{ transition:'transform .25s', transform:dropOpen?'rotate(180deg)':'none', flexShrink:0 }}>
                        <path d="M1 1l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      </svg>
                    </div>

                    {/* Dropdown list */}
                    {dropOpen && (
                      <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, right:0, zIndex:99999, background:'#FFFFFF', borderRadius:'18px', boxShadow:'0 20px 56px rgba(28,10,0,.14)', border:'1.5px solid rgba(232,118,26,.12)', overflow:'hidden', animation:'calDrop .2s ease' }}>
                        {CERTS.map(function (c, idx) {
                          var isAct = certType === c.id
                          return (
                            <div key={c.id} onClick={function () { setCertType(c.id); setDropOpen(false); if (touched.certType) setErrors(function(err){return{...err,certType:''}}) }}
                              style={{ display:'flex', alignItems:'center', gap:'14px', padding:'13px 16px', cursor:'pointer', background: isAct?'linear-gradient(135deg,#FFF6EA,#FEF0D4)':'#FFFFFF', borderLeft:'3px solid '+(isAct?'#E8761A':'transparent'), borderBottom: idx<CERTS.length-1?'1px solid rgba(232,118,26,.07)':'none', transition:'all .15s' }}
                              onMouseEnter={function (e) { if (!isAct) e.currentTarget.style.background='#FFF9F3' }}
                              onMouseLeave={function (e) { if (!isAct) e.currentTarget.style.background='#FFFFFF' }}>
                              <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:c.color+'15', border:'1.5px solid '+c.color+'25', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'19px', flexShrink:0 }}>{c.icon}</div>
                              <div style={{ flex:1 }}>
                                <div style={{ fontWeight: isAct?'800':'700', color: isAct?'#E8761A':'#1C0A00', fontSize:'14px' }}>{c.full}</div>
                                <div style={{ fontSize:'11px', color:'#B87832', marginTop:'1px' }}>{c.label}</div>
                              </div>
                              {isAct && <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'#E8761A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', color:'#fff', fontWeight:'900', flexShrink:0 }}>✓</div>}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  {errors.certType && touched.certType && <div style={{ fontSize:'12px', color:'#e74c3c', marginTop:'6px', fontWeight:'600' }}>⚠ {errors.certType}</div>}
                </div>

                {/* Note */}
                <div style={{ padding:'13px 15px', borderRadius:'13px', background:'rgba(232,118,26,.05)', border:'1.5px solid rgba(232,118,26,.1)', display:'flex', gap:'10px', alignItems:'flex-start' }}>
                  <span style={{ fontSize:'17px', flexShrink:0 }}>ℹ️</span>
                  <p style={{ fontSize:'12.5px', color:'#7A4010', lineHeight:'1.65', margin:0 }}>
                    Details must match <strong>exactly</strong> as per school records. For help contact&nbsp;
                    <a href="tel:+919198783830" style={{ color:'#E8761A', fontWeight:'700', textDecoration:'none' }}>+91&nbsp;9198783830</a>.
                  </p>
                </div>

                {/* Submit */}
                <button onClick={handleSubmit}
                  style={{ width:'100%', padding:'17px', borderRadius:'16px', background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'16px', fontWeight:'900', border:'none', cursor:'pointer', boxShadow:'0 10px 32px rgba(232,118,26,.32)', transition:'all .25s', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', letterSpacing:'.3px' }}
                  onMouseEnter={function (e) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(232,118,26,.44)' }}
                  onMouseLeave={function (e) { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 10px 32px rgba(232,118,26,.32)' }}>
                  <span style={{ fontSize:'20px' }}>🔍</span>
                  Verify &amp; View Certificate
                </button>

              </div>
            </div>

            {/* Help links */}
            <div style={{ marginTop:'22px', display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
              {[
                { href:'tel:+919198783830',      icon:'📞', text:'Call School Office' },
                { href:'mailto:spvbrh@gmail.com', icon:'✉️', text:'Email Us' },
              ].map(function (btn) {
                return (
                  <a key={btn.href} href={btn.href}
                    style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'10px 18px', borderRadius:'11px', background:'#FFFFFF', border:'1.5px solid rgba(232,118,26,.14)', color:'#7A4010', fontSize:'13px', fontWeight:'700', textDecoration:'none', boxShadow:'0 2px 10px rgba(232,118,26,.06)', transition:'all .2s' }}
                    onMouseEnter={function (e) { e.currentTarget.style.borderColor='#E8761A'; e.currentTarget.style.color='#E8761A'; e.currentTarget.style.background='#FFF6EA' }}
                    onMouseLeave={function (e) { e.currentTarget.style.borderColor='rgba(232,118,26,.14)'; e.currentTarget.style.color='#7A4010'; e.currentTarget.style.background='#FFFFFF' }}>
                    {btn.icon} {btn.text}
                  </a>
                )
              })}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}