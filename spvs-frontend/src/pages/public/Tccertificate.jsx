import { useState } from 'react'

function fmtDate(str) {
  if (!str) return ''
  if (str.includes('-') && str.length === 10 && str[4] === '-') {
    var p = str.split('-')
    return p[2] + '-' + p[1] + '-' + p[0]
  }
  return str
}

function buildTCHtml(data) {
  var rows = [
    { no:'1.',  label:"Name of Pupil",                                                           value: data.studentName || '' },
    { no:'2.',  label:"Mother's Name",                                                           value: data.motherName  || '' },
    { no:'3.',  label:"Father's Name",                                                           value: data.fatherName  || '' },
    { no:'4.',  label:"Nationality",                                                             value: data.nationality || 'INDIAN' },
    { no:'5.',  label:"Whether the pupil belongs to SC/ ST/ OBC category",                       value: data.category    || 'N/A' },
    { no:'6.',  label:"Date of birth According to Admission Register",                           value: (fmtDate(data.dob)||'') + (data.dobInWords ? '&nbsp;&nbsp;&nbsp;' + data.dobInWords : '') },
    { no:'7.',  label:"Date of first admission in the school with class",                        value: (fmtDate(data.dateOfFirstAdmission)||'') + (data.admissionClass ? '&nbsp;&nbsp;&nbsp;' + data.admissionClass : '') },
    { no:'8.',  label:"Class in which the pupil last studied",                                   value: data.lastStudiedClass || '' },
    { no:'9.',  label:"School/Board Annual Examination last taken with result",                   value: data.examResult  || '' },
    { no:'10.', label:"Subject Offered",                                                         value: data.subjectsOffered || '' },
    { no:'11.', label:"Whether Qualified for promotion to the higher class If so, to which class",value: data.qualifiedForPromotion || '' },
    { no:'12.', label:"Whether the pupil has paid all the dues to the school",                   value: data.duesPaid    || 'YES' },
    { no:'13.', label:"Date of Removal",                                                         value: fmtDate(data.dateOfRemoval)     || '' },
    { no:'14.', label:"Date of Application for certificate",                                     value: fmtDate(data.dateOfApplication) || '' },
    { no:'15.', label:"Date of Issue of certificate",                                            value: fmtDate(data.dateOfIssue)       || '' },
    { no:'16.', label:"Reason for leaving the School",                                           value: data.reasonForLeaving || '' },
    { no:'17.', label:"General Conduct",                                                         value: data.generalConduct  || 'GOOD' },
    { no:'18.', label:"Any other remarks",                                                       value: data.remarks         || 'N/A' },
  ]

  var rowsHtml = rows.map(function(r) {
    return '<tr>' +
      '<td style="padding:6px 8px;width:40px;font-weight:700;vertical-align:top;white-space:nowrap;">' + r.no + '</td>' +
      '<td style="padding:6px 8px;width:55%;vertical-align:top;">' + r.label + '</td>' +
      '<td style="padding:6px 8px;font-weight:700;vertical-align:top;">: ' + r.value + '</td>' +
    '</tr>'
  }).join('')

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Transfer Certificate - ' + data.studentName + '</title>' +
  '<style>' +
  '* { margin:0; padding:0; box-sizing:border-box; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }' +
  'body { font-family:"Times New Roman",Times,serif; background:#fff; padding:16px; color:#000; font-size:13px; }' +
  '@page { size:A4 portrait; margin:12mm; }' +
  '@media print { body{padding:0;} * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; } }' +
  'table { border-collapse:collapse; width:100%; }' +
  '</style></head><body>' +
  '<div style="max-width:780px;margin:0 auto;border:1.5px solid #333;padding:0;">' +

  '<div style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:2px solid #000;">' +
    '<img src="/logo/school.PNG" style="width:72px;height:72px;object-fit:contain;flex-shrink:0;" onerror="this.style.display=\'none\'">' +
    '<div style="flex:1;text-align:center;">' +
      '<div style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;letter-spacing:1px;">SANT PATHIK VIDYALAYA</div>' +
      '<div style="font-size:13px;font-weight:700;margin-top:2px;">(SENIOR SECONDARY SCHOOL)</div>' +
      '<div style="font-size:11.5px;margin-top:3px;">Pashupati Nagar Post - Bubkapur, Bahraich (U.P) Pin \u2013 271902</div>' +
      '<div style="font-size:11px;margin-top:2px;">Website:- www.santpathikvidyalaya.org , Email:- spvbrh@gmail.com</div>' +
    '</div>' +
  '</div>' +

  '<div style="display:flex;justify-content:space-between;padding:5px 18px;border-bottom:1.5px solid #000;font-size:12px;font-weight:700;">' +
    '<span>School No. 70178</span><span>Affiliation No. 2130176</span>' +
  '</div>' +

  '<div style="text-align:center;padding:16px 0 10px;">' +
    '<span style="font-size:18px;font-weight:900;text-decoration:underline;letter-spacing:2px;">TRANSFER CERTIFICATE</span>' +
  '</div>' +

  '<div style="padding:4px 18px 10px;display:flex;gap:60px;">' +
    '<div><span style="font-weight:600;">Admission No</span> <span style="font-weight:700;">: ' + data.admissionNo + '</span></div>' +
    '<div><span style="font-weight:600;">PEN NO.</span> <span style="font-weight:700;">: ' + (data.penNo||'') + '</span></div>' +
  '</div>' +

  '<div style="padding:0 18px 16px;">' +
    '<table style="font-size:12.5px;"><tbody>' + rowsHtml + '</tbody></table>' +
  '</div>' +

  /* ── Signatures with big space above ── */
  '<div style="border-top:1.5px solid #000;padding:50px 28px 28px;display:flex;justify-content:space-between;align-items:flex-end;">' +
    '<div style="text-align:center;">' +
      '<div style="border-top:1px solid #000;width:150px;margin-bottom:5px;"></div>' +
      '<div style="font-size:12px;font-weight:700;">Signature of Class Teacher</div>' +
    '</div>' +
    '<div style="text-align:center;">' +
      '<div style="border-top:1px solid #000;width:150px;margin-bottom:5px;"></div>' +
      '<div style="font-size:12px;font-weight:700;">Checked By (Name &amp; Desig.)</div>' +
    '</div>' +
    '<div style="text-align:center;">' +
      '<div style="border-top:1px solid #000;width:150px;margin-bottom:5px;"></div>' +
      '<div style="font-size:12px;font-weight:700;">Principal</div>' +
    '</div>' +
  '</div>' +

  '</div>' +
  '<script>window.onload=function(){ setTimeout(function(){ window.print() }, 800) }</script>' +
  '</body></html>'
}

/* ══════════════════════════════════════════
   SUMMARY CARD — shown after verification
   Click "View TC" → shows full TC on page
   Then "Download PDF" at top → print dialog
══════════════════════════════════════════ */
export default function TcCertificate({ data, onBack }) {
  var [showFull, setShowFull] = useState(false)
  var [downloading, setDownloading] = useState(false)

  /* PDF via print window */
  function handleDownload() {
    setDownloading(true)
    try {
      var html = buildTCHtml(data)
      var win  = window.open('', '_blank', 'width=900,height=900')
      win.document.open()
      win.document.write(html)
      win.document.close()
    } catch(e) {
      alert('Could not open print window. Please allow pop-ups for this site.')
    }
    setTimeout(function(){ setDownloading(false) }, 2000)
  }

  /* ── FULL TC VIEW (same as ResultCard pattern) ── */
  if (showFull) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
          * { box-sizing:border-box; }
          #tc-full { font-family:'Times New Roman',Times,serif; max-width:780px; margin:0 auto; background:#fff; padding:18px 22px 14px; color:#000; border:1.5px solid #333; }
          #tc-full table { border-collapse:collapse; width:100%; }
          @keyframes slideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        `}</style>

        {/* Action bar */}
        <div className="no-print" style={{ maxWidth:'780px', margin:'0 auto 18px', display:'flex', gap:'10px', alignItems:'center', padding:'0 4px' }}>
          <button onClick={function(){ setShowFull(false) }}
            style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'11px 22px', borderRadius:'12px', border:'1.5px solid rgba(232,118,26,.28)', background:'#FFFDF8', color:'#E8761A', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', cursor:'pointer' }}>
            ← Back
          </button>
          <div style={{ flex:1 }} />
          <button onClick={handleDownload} disabled={downloading}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'11px 26px', borderRadius:'12px', background:downloading?'rgba(232,118,26,.5)':'linear-gradient(135deg,#E8761A,#F5B800)', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'800', border:'none', cursor:downloading?'wait':'pointer', boxShadow:'0 6px 20px rgba(232,118,26,.32)' }}>
            {downloading ? '⏳ Opening…' : '⬇ Download PDF'}
          </button>
        </div>

        {/* Full TC document */}
        <div id="tc-full" style={{ animation:'slideUp .5s ease both' }}>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', paddingBottom:'12px', borderBottom:'2px solid #000', marginBottom:'6px' }}>
            <img src="/logo/school.PNG" alt="SPV" style={{ width:'72px', height:'72px', objectFit:'contain', flexShrink:0 }} />
            <div style={{ flex:1, textAlign:'center' }}>
              <div style={{ fontFamily:'Arial,sans-serif', fontSize:'26px', fontWeight:'900', letterSpacing:'1px' }}>SANT PATHIK VIDYALAYA</div>
              <div style={{ fontSize:'13px', fontWeight:'700', marginTop:'2px' }}>(SENIOR SECONDARY SCHOOL)</div>
              <div style={{ fontSize:'11.5px', marginTop:'3px' }}>Pashupati Nagar Post - Bubkapur, Bahraich (U.P) Pin – 271902</div>
              <div style={{ fontSize:'11px', color:'#333', marginTop:'2px' }}>Website:- www.santpathikvidyalaya.org , Email:- spvbrh@gmail.com</div>
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', fontWeight:'700', marginBottom:'6px' }}>
            <span>School No. 70178</span><span>Affiliation No. 2130176</span>
          </div>

          {/* Title */}
          <div style={{ textAlign:'center', padding:'14px 0 10px' }}>
            <span style={{ fontSize:'18px', fontWeight:'900', textDecoration:'underline', letterSpacing:'2px' }}>TRANSFER CERTIFICATE</span>
          </div>

          {/* Adm + PEN */}
          <div style={{ display:'flex', gap:'60px', padding:'4px 0 10px', fontSize:'13px' }}>
            <div><span style={{ fontWeight:'600' }}>Admission No</span> <span style={{ fontWeight:'700' }}>: {data.admissionNo}</span></div>
            <div><span style={{ fontWeight:'600' }}>PEN NO.</span> <span style={{ fontWeight:'700' }}>: {data.penNo||''}</span></div>
          </div>

          {/* 18 rows */}
          <table style={{ fontSize:'12.5px', marginBottom:'16px' }}>
            <tbody>
              {[
                ['1.',  'Name of Pupil',                                                             data.studentName],
                ['2.',  "Mother's Name",                                                             data.motherName],
                ['3.',  "Father's Name",                                                             data.fatherName],
                ['4.',  'Nationality',                                                               data.nationality||'INDIAN'],
                ['5.',  'Whether the pupil belongs to SC/ ST/ OBC category',                        data.category||'N/A'],
                ['6.',  'Date of birth According to Admission Register',                             fmtDate(data.dob) + (data.dobInWords ? '   ' + data.dobInWords : '')],
                ['7.',  'Date of first admission in the school with class',                          fmtDate(data.dateOfFirstAdmission) + (data.admissionClass ? '   ' + data.admissionClass : '')],
                ['8.',  'Class in which the pupil last studied',                                     data.lastStudiedClass],
                ['9.',  'School/Board Annual Examination last taken with result',                     data.examResult],
                ['10.', 'Subject Offered',                                                           data.subjectsOffered],
                ['11.', 'Whether Qualified for promotion to the higher class If so, to which class', data.qualifiedForPromotion],
                ['12.', 'Whether the pupil has paid all the dues to the school',                     data.duesPaid||'YES'],
                ['13.', 'Date of Removal',                                                           fmtDate(data.dateOfRemoval)],
                ['14.', 'Date of Application for certificate',                                       fmtDate(data.dateOfApplication)],
                ['15.', 'Date of Issue of certificate',                                              fmtDate(data.dateOfIssue)],
                ['16.', 'Reason for leaving the School',                                             data.reasonForLeaving],
                ['17.', 'General Conduct',                                                           data.generalConduct||'GOOD'],
                ['18.', 'Any other remarks',                                                         data.remarks||'N/A'],
              ].map(function(r,i){
                return (
                  <tr key={i}>
                    <td style={{ padding:'5px 8px', width:'38px', fontWeight:'700', verticalAlign:'top', whiteSpace:'nowrap' }}>{r[0]}</td>
                    <td style={{ padding:'5px 8px', width:'55%', verticalAlign:'top' }}>{r[1]}</td>
                    <td style={{ padding:'5px 8px', fontWeight:'700', verticalAlign:'top' }}>: {r[2]||''}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Signatures with big space */}
          <div style={{ borderTop:'1.5px solid #000', paddingTop:'60px', paddingBottom:'20px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1px solid #000', width:'160px', marginBottom:'5px' }} />
              <div style={{ fontSize:'12px', fontWeight:'700' }}>Signature of Class Teacher</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1px solid #000', width:'160px', marginBottom:'5px' }} />
              <div style={{ fontSize:'12px', fontWeight:'700' }}>Checked By (Name & Desig.)</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1px solid #000', width:'160px', marginBottom:'5px' }} />
              <div style={{ fontSize:'12px', fontWeight:'700' }}>Principal</div>
            </div>
          </div>

        </div>
      </>
    )
  }

  /* ── SUMMARY CARD ── */
  var summaryRows = [
    { l:'Student Name',       v: data.studentName },
    { l:'Admission No.',      v: data.admissionNo },
    { l:"Father's Name",      v: data.fatherName },
    { l:"Mother's Name",      v: data.motherName },
    { l:'Last Studied Class', v: data.lastStudiedClass },
    { l:'Date of Issue',      v: fmtDate(data.dateOfIssue) },
    { l:'Reason for Leaving', v: data.reasonForLeaving },
    { l:'General Conduct',    v: data.generalConduct },
  ]

  return (
    <>
      <style>{`
        @keyframes popIn  { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
      `}</style>

      <div style={{ minHeight:'100vh', background:'#FFFDF8', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'48px 20px', fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ width:'100%', maxWidth:'500px', textAlign:'center', animation:'fadeUp .5s ease both' }}>

          {/* Green tick */}
          <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'#22c55e', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', color:'#fff', margin:'0 auto 20px', boxShadow:'0 8px 28px rgba(34,197,94,.3)', animation:'popIn .5s cubic-bezier(.34,1.56,.64,1) both' }}>✓</div>

          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(22px,4vw,28px)', fontWeight:'700', color:'#1C0A00', marginBottom:'6px' }}>
            Verified Successfully!
          </div>
          <div style={{ fontSize:'14px', color:'#7A4010', marginBottom:'28px' }}>
            Your Transfer Certificate is ready to download.
          </div>

          {/* Summary card */}
          <div style={{ background:'linear-gradient(135deg,#FFF9F0,#FEF3DC)', borderRadius:'20px', border:'1.5px solid rgba(232,118,26,.22)', padding:'22px 20px', marginBottom:'28px', textAlign:'left', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#E8761A,#F5B800)' }} />
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
              <div style={{ width:'46px', height:'46px', borderRadius:'12px', background:'rgba(34,163,90,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>📋</div>
              <div>
                <div style={{ fontSize:'10px', fontWeight:'800', color:'#B87832', letterSpacing:'1.1px', textTransform:'uppercase', marginBottom:'2px' }}>Certificate Ready</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00' }}>Transfer Certificate</div>
              </div>
            </div>
            {summaryRows.map(function(row, i) {
              return (
                <div key={row.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:i<summaryRows.length-1?'1px dashed rgba(232,118,26,.15)':'none', fontSize:'13.5px' }}>
                  <span style={{ color:'#B87832', fontWeight:'700' }}>{row.l}</span>
                  <span style={{ color:'#1C0A00', fontWeight:'700', textAlign:'right', maxWidth:'55%' }}>{row.v||'—'}</span>
                </div>
              )
            })}
          </div>

          {/* Buttons — View TC first, then download */}
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={function(){ setShowFull(true); window.scrollTo({top:0,behavior:'smooth'}) }}
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 28px', borderRadius:'14px', background:'linear-gradient(135deg,#E8761A,#F5B800)', color:'#1C0A00', fontWeight:'900', fontSize:'15px', border:'none', cursor:'pointer', boxShadow:'0 8px 28px rgba(232,118,26,.32)', fontFamily:"'DM Sans',sans-serif", transition:'all .22s' }}
              onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(232,118,26,.44)' }}
              onMouseLeave={function(e){ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 28px rgba(232,118,26,.32)' }}>
              ↓ Download TC
            </button>
            <button onClick={onBack}
              style={{ padding:'14px 24px', borderRadius:'14px', background:'transparent', color:'#7A4010', fontWeight:'700', fontSize:'14px', border:'1.5px solid rgba(232,118,26,.28)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s' }}
              onMouseEnter={function(e){ e.currentTarget.style.background='#FFF6EA' }}
              onMouseLeave={function(e){ e.currentTarget.style.background='transparent' }}>
              ← New Request
            </button>
          </div>

        </div>
      </div>
    </>
  )
}