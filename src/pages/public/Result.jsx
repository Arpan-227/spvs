import { useState } from 'react'

function gradeColor(g) {
  if (!g) return '#1C0A00'
  if (g === 'A1' || g === 'A') return '#166534'
  if (g === 'A2')               return '#15803d'
  if (g === 'B1' || g === 'B') return '#1d4ed8'
  if (g === 'B2')               return '#2563eb'
  if (g === 'C1' || g === 'C') return '#b45309'
  if (g === 'C2')               return '#d97706'
  if (g === 'D')                return '#92400e'
  return '#dc2626'
}

function fmtDob(dob) {
  if (!dob) return ''
  if (dob.includes('/')) return dob
  var p = dob.split('-')
  return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : dob
}

function fmtDate(d) {
  if (!d) return new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'2-digit', year:'numeric' })
  try { return new Date(d+'T00:00:00').toLocaleDateString('en-IN', { day:'2-digit', month:'2-digit', year:'numeric' }) }
  catch { return d }
}

/* ── Light golden-orange palette (matches screenshot) ── */
var H1  = '#E8A020'   /* golden-orange header     */
var H2  = '#F0B030'   /* lighter term header      */
var H3  = '#F5C040'   /* sub-col header           */
var H4  = '#E09018'   /* overall header           */
var ROW = '#FFF5DC'   /* alt row — light cream    */
var BDR = '#E8B060'   /* border                   */
var ACC = '#E8A020'   /* accent                   */
var TTL = '#5C3000'   /* title / label text       */

function buildPrintHTML(data) {
  function gc(g) {
    if (!g) return '#1C0A00'
    if (g==='A1'||g==='A') return '#166534'
    if (g==='A2') return '#15803d'
    if (g==='B1'||g==='B') return '#1d4ed8'
    if (g==='B2') return '#2563eb'
    if (g==='C1'||g==='C') return '#b45309'
    if (g==='C2') return '#d97706'
    if (g==='D') return '#92400e'
    return '#dc2626'
  }
  var TH  = 'padding:5px;border:1px solid  #C88010;font-weight:700;font-size:10px;text-align:center;background:#E8A020;color:black;line-height:1.3;'
  var TH2 = 'padding:5px;border:1px solid #C88010;font-weight:700;font-size:10px;text-align:center;background:#F0B030;color:black;line-height:1.3;'
  var TH3 = 'padding:5px;border:1px solid #C88010;font-weight:700;font-size:10px;text-align:center;background:#F5C040;color:#1C0A00;line-height:1.3;'
  var TH4 = 'padding:5px;border:1px solid #C88010;font-weight:700;font-size:10px;text-align:center;background:#E09018;color:#fff;line-height:1.3;'
  var TD  = 'padding:0px 4px;border:1px solid #E8B060;font-size:15.5px;text-align:center;color:#1C0A00;'
  var TDL = 'padding:2px 8px;border:1px solid #E8B060;font-size:12px;text-align:left;color:#1C0A00;font-weight:700;'

  var sRows = (data.subjects||[]).map(function(s,i){
    var bg = i%2===0 ? '#fff' : '#FFF5DC'
    return '<tr style="background:'+bg+'">'+
      '<td style="'+TDL+'">'+s.name+'</td>'+
      '<td style="'+TD+'">'+s.t1BestPT+'</td>'+
      '<td style="'+TD+'">'+s.t1NoteBook+'</td>'+
      '<td style="'+TD+'">'+s.t1SubjectEnrich+'</td>'+
      '<td style="'+TD+'">'+s.t1HalfYearly+'</td>'+
      '<td style="'+TD+'">'+s.t2BestPT+'</td>'+
      '<td style="'+TD+'">'+s.t2NoteBook+'</td>'+
      '<td style="'+TD+'">'+s.t2SubjectEnrich+'</td>'+
      '<td style="'+TD+'">'+s.t2Annual+'</td>'+
      '<td style="'+TD+';font-weight:600; font-size:13px;">'+(s.maxMarks||100)+'</td>'+
      '<td style="'+TD+';font-weight:800;color:#1C0A00;font-size:13px;">'+s.marksObtained+'</td>'+
      '<td style="'+TD+';font-weight:900;font-size:13px;color:'+gc(s.grade)+';">'+s.grade+'</td>'+
    '</tr>'
  }).join('')

  var coRows = (data.coScholastic||[]).map(function(c,i){
    var bg = i%2===0 ? '#fff' : '#FFF5DC'
    return '<tr style="background:'+bg+'"><td style="'+TDL+'">'+c.activity+'</td><td style="'+TD+';font-weight:800;color:'+gc(c.grade)+';">'+c.grade+'</td></tr>'
  }).join('')

  var cvRows = (data.characterValues||[]).map(function(c,i){
    var bg = i%2===0 ? '#fff' : '#FFF5DC'
    return '<tr style="background:'+bg+'"><td style="'+TDL+'">'+c.activity+'</td><td style="'+TD+';font-weight:800;color:'+gc(c.grade)+';">'+c.grade+'</td></tr>'
  }).join('')

  var g5rows = [['Excellent','A'],['Very Good','B'],['Good','C'],['Satisfactory','D'],['Needs Improvement','E']].map(function(r,i){
    var bg = i%2===0?'#fff':'#FFF5DC'
    return '<tr style="background:'+bg+'"><td style="'+TD+';text-align:left;padding-left:8px;">'+r[0]+'</td><td style="'+TD+';font-weight:800;color:'+gc(r[1])+';">'+r[1]+'</td></tr>'
  }).join('')

  var g8rows = [['181–200','A1'],['161–180','A2'],['141–160','B1'],['121–140','B2'],['101–120','C1'],['81–100','C2'],['66–80','D'],['65 & Below','E']].map(function(r,i){
    var bg = i%2===0?'#fff':'#FFF5DC'
    return '<tr style="background:'+bg+'"><td style="'+TD+';">'+r[0]+'</td><td style="'+TD+';font-weight:800;color:'+gc(r[1])+';">'+r[1]+'</td></tr>'
  }).join('')

  var fmtD = function(dob) {
    if (!dob) return ''
    if (dob.includes('/')) return dob
    var p = dob.split('-')
    return p.length===3 ? p[2]+'/'+p[1]+'/'+p[0] : dob
  }
  var today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'})
  var dateStr = data.date ? (function(){ try{ return new Date(data.date+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'}) }catch(e){ return data.date } })() : today

//   return `<!DOCTYPE html><html><head><meta charset="UTF-8">
// <title>Report Card - ${data.studentName}</title>
// <style>
//   * { margin:0; padding:0; box-sizing:border-box; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
//   body { font-family:"Times New Roman",serif; background:#fff; padding:10px; font-size:12px; color:#1C0A00; }
//   table { border-collapse:collapse; width:100%; }
//   @page { size:A4 landscape; margin:8mm; }
//   @media print {
//     body { padding:0; }
//     * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
//   }
// </style>
// </head><body>
// <div style="max-width:100%;border:2px solid #E8A020;">

//   <!-- Header -->
//   <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #E8A020;padding:10px 14px;">
//     <img src="/logo/cbse.png" style="width:65px;height:65px;object-fit:contain;" onerror="this.style.display='none'">
//     <div style="flex:1;text-align:center;padding:0 10px;">
//       <div style="font-family:Georgia,serif;font-size:24px;font-weight:900;color:#1C0A00;">SANT PATHIK VIDYALAYA</div>
//       <div style="font-size:12px;font-weight:700;margin-top:3px;">PASHUPATI NAGAR, BAHRAICH(U.P)</div>
//       <div style="font-size:11.5px;margin-top:2px;">Affiliated to CBSE New Delhi</div>
//       <div style="font-size:11px;color:#1C0A00;margin-top:2px;">Website:- www.santpathikvidyalaya.org | Email:- spvbrh@gmail.com</div>
//     </div>
//     <img src="/logo/school.PNG" style="width:65px;height:65px;object-fit:contain;" onerror="this.style.display='none'">
//   </div>

//   <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;padding:5px 14px;">
//     <span>Affiliation Number: 2130176</span><span>School No:- 70178</span>
//   </div>

//   <!-- Title -->
//   <div style="background:#F0B030;padding:7px;text-align:center;margin:5px 0;">
//     <span style="font-family:Georgia,serif;font-size:15px;font-weight:900;color:#1C0A00;letter-spacing:2px;">PROGRESS REPORT CARD</span>
//   </div>

//   <!-- Student Info -->
//   <table style="margin-bottom:8px;font-size:12.5px;border:1px solid #E8B060;">
//     <tr style="background:#fff;border-bottom:1px solid #E8B060;">
//       <td style="padding:5px 8px;width:22%;color:#1C0A00;font-weight:700;">Admission Number</td>
//       <td style="padding:5px 8px;width:28%;font-weight:800;color:#1C0A00;font-size:13px;">${data.admissionNo}</td>
//       <td style="padding:5px 8px;width:22%;color:#1C0A00;font-weight:700;">Roll Number</td>
//       <td style="padding:5px 8px;width:28%;font-weight:800;">${data.rollNo}</td>
//     </tr>
//     <tr style="background:#FFF5DC;border-bottom:1px solid #E8B060;">
//       <td style="padding:5px 8px;color:#1C0A00;font-weight:700;">Student's Name</td>
//       <td style="padding:5px 8px;font-weight:800;">${data.studentName}</td>
//       <td style="padding:5px 8px;color:#1C0A00;font-weight:700;">Class</td>
//       <td style="padding:5px 8px;font-weight:800;">${data.class} ${data.section}</td>
//     </tr>
//     <tr style="background:#fff;border-bottom:1px solid #E8B060;">
//       <td style="padding:5px 8px;color:#1C0A00;font-weight:700;">Mother's Name</td>
//       <td style="padding:5px 8px;font-weight:700;">${data.motherName}</td>
//       <td style="padding:5px 8px;color:#1C0A00;font-weight:700;">Session</td>
//       <td style="padding:5px 8px;font-weight:800;">${data.session}</td>
//     </tr>
//     <tr style="background:#FFF5DC;">
//       <td style="padding:5px 8px;color:#1C0A00;font-weight:700;">Father's Name</td>
//       <td style="padding:5px 8px;font-weight:700;">${data.fatherName}</td>
//       <td style="padding:5px 8px;color:#1C0A00;font-weight:700;">Date of Birth</td>
//       <td style="padding:5px 8px;font-weight:800;">${fmtD(data.dob)}</td>
//     </tr>
//   </table>

//   <!-- Scholastic Table -->
//   <table style="margin-bottom:8px;font-size:10.5px;">
//     <thead>
//       <tr>
//         <th rowspan="2" style="${TH};width:90px;vertical-align:middle;font-size:11px;">SCHOLASTIC<br>AREAS:</th>
//         <th colspan="4" style="${TH2}">TERM-I &nbsp; T1</th>
//         <th colspan="4" style="${TH2}">TERM-II &nbsp; T2</th>
//         <th colspan="3" style="${TH}">OVERALL &nbsp; T1+T2</th>
//       </tr>
//       <tr>
//         <th style="${TH3}">Best<br>Periodic<br>Test<br>(10)</th>
//         <th style="${TH3}">Note<br>Book<br>(5)</th>
//         <th style="${TH3}">Subject<br>Enrich<br>ment<br>(5)</th>
//         <th style="${TH3}">Half Yearly<br>Exam<br>(80)</th>
//         <th style="${TH3}">Best<br>Periodic<br>Test<br>(10)</th>
//         <th style="${TH3}">Note<br>Book<br>(5)</th>
//         <th style="${TH3}">Subject<br>Enrich<br>ment<br>(5)</th>
//         <th style="${TH3}">Annual<br>Exam<br>(80)</th>
//         <th style="${TH4}">Maximum<br>Marks<br>(200)</th>
//         <th style="${TH4}">Marks<br>Obtained</th>
//         <th style="${TH4}">Grade</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${sRows}
//       <tr style="background:#FFE8A0;border-top:2px solid #E8A020;">
//         <td colspan="9" style="${TDL};color:#1C0A00;font-size:12.5px;background:#FFE8A0;">Total Marks</td>
//         <td style="${TD};font-weight:800;color:#1C0A00;font-size:13px;background:#FFE8A0;">${data.totalMaxMarks}</td>
//         <td style="${TD};font-weight:900;color:#1C0A00;font-size:14px;background:#FFE8A0;">${data.totalMarks}</td>
//         <td style="${TD};background:#FFE8A0;"></td>
//       </tr>
//       <tr style="background:#FFF3CC;">
//         <td colspan="9" style="${TDL};color:#1C0A00;background:#FFF3CC;">Percentage</td>
//         <td colspan="2" style="${TD};font-weight:900;color:#1C0A00;font-size:13px;background:#FFF3CC;">${data.percentage}</td>
//         <td style="${TD};background:#FFF3CC;"></td>
//       </tr>
//       <tr style="background:#FFE8A0;">
//         <td colspan="9" style="${TDL};color:#1C0A00;background:#FFE8A0;">Rank</td>
//         <td colspan="2" style="${TD};font-weight:900;color:#1C0A00;font-size:13px;background:#FFE8A0;">${data.rank||'—'}</td>
//         <td style="${TD};background:#FFE8A0;"></td>
//       </tr>
//     </tbody>
//   </table>

//   <!-- Co-Scholastic + Character -->
//   <div style="display:flex;gap:10px;margin-bottom:8px;">
//     <table style="flex:1;font-size:12px;">
//       <thead>
//         <tr><th colspan="2" style="${TH};font-size:11.5px;">CO-SCHOLASTIC AREA</th></tr>
//         <tr>
//           <th style="${TH2};text-align:left;padding-left:9px;">CO-SCHOLASTIC ACTIVITIY</th>
//           <th style="${TH2};width:70px;">GRADE</th>
//         </tr>
//       </thead>
//       <tbody>${coRows}</tbody>
//     </table>
//     <table style="flex:1;font-size:12px;">
//       <thead>
//         <tr><th colspan="2" style="${TH};font-size:11.5px;">CHARACTER BUILDING VALUES</th></tr>
//         <tr>
//           <th style="${TH2};text-align:left;padding-left:9px;">ACTIVITY</th>
//           <th style="${TH2};width:70px;">GRADE</th>
//         </tr>
//       </thead>
//       <tbody>${cvRows}</tbody>
//     </table>
//   </div>

//   <!-- Footer -->
//   <div style="border-top:1.5px solid #E8B060;padding:8px 4px 4px;">
//     <div style="font-size:12.5px;margin-bottom:5px;font-weight:600;">
//       <strong>Class Teacher's Remarks :</strong>
//       <span style="border-bottom:1px solid #333;display:inline-block;min-width:300px;">${data.teacherRemarks||''}</span>
//     </div>
//     <div style="font-size:12.5px;margin-bottom:3px;">
//       <strong>Result :</strong>
//       <strong style="color:${'#1C0A00'};">${data.result}</strong>
//     </div>
//     <div style="font-size:12px;"><strong>Place:</strong> Bahraich</div>
//     <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:22px;">
//       <div style="font-size:12px;"><strong>Date:</strong> ${dateStr}</div>
//       <div style="text-align:center;">
//         <div style="border-top:1.5px solid #333;width:160px;margin-bottom:4px;"></div>
//         <div style="font-size:11.5px;font-weight:700;">Signature of Class Teacher</div>
//       </div>
//       <div style="text-align:center;">
//         <div style="border-top:1.5px solid #333;width:160px;margin-bottom:4px;"></div>
//         <div style="font-size:11.5px;font-weight:700;">Signature of Principal</div>
//       </div>
//     </div>
//   </div>

//   <!-- Grading System -->
//   <div style="border-top:2px solid #E8A020;padding-top:7px;margin-top:4px;">
//     <div style="font-family:Georgia,serif;font-size:13px;font-weight:700;color:#1C0A00;text-align:center;margin-bottom:7px;letter-spacing:.8px;">GRADING SYSTEM</div>
//     <div style="display:flex;gap:14px;">
//       <div style="flex:1;">
//         <div style="font-size:11px;font-weight:700;text-align:center;margin-bottom:5px;">
//           Grading scale for co-scholastic area &amp; character building values<br>
//           <span style="font-weight:600;color:#1C0A00;">(Grading on 5 point scale)</span>
//         </div>
//         <table style="font-size:11.5px;">
//           <thead><tr><th style="${TH}">PERFORMANCE</th><th style="${TH}">GRADE</th></tr></thead>
//           <tbody>${g5rows}</tbody>
//         </table>
//       </div>
//       <div style="flex:1;">
//         <div style="font-size:11px;font-weight:700;text-align:center;margin-bottom:5px;">
//           Grading scale for scholastic areas:<br>
//           <span style="font-weight:600;color:#1C0A00;">(Grading on 8-point scale)</span>
//         </div>
//         <table style="font-size:11.5px;">
//           <thead><tr><th style="${TH}">MARKS RANGE</th><th style="${TH}">GRADE</th></tr></thead>
//           <tbody>${g8rows}</tbody>
//         </table>
//       </div>
//     </div>
//   </div>

// </div>
// <script>
//   window.onload = function() {
//     setTimeout(function() { window.print() }, 800)
//   }
// </script>
// </body></html>`
// }
return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Report Card - ${data.studentName}</title>
<style>
  * { margin:0; padding:1px; box-sizing:border-box; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
  body { font-family:"Times New Roman",serif; background:#fff; padding:4mm; font-size:10px; color:#1C0A00; width:210mm; height:297mm; overflow:show; }
  table { border-collapse:collapse; width:100%; font-size:9px; }
  @page { size:A4 portrait; margin:2mm; }
  @media print {
    body { padding:4mm; width:210mm; height:297mm; overflow:hidden; }
    * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
  }
</style>
</head><body>
<div style="max-width:100%;border:px solid #E8A020;">

  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:0px solid #E8A020;padding:10px 14px;">
    <img src="/logo/cbse.png" style="width:79px;height:79px;object-fit:contain;" onerror="this.style.display='none'">
    <div style="flex:1;text-align:center;padding:0 10px;">
      <div style="font-family:Georgia,serif;font-size:30px;font-weight:900;color:#1C0A00;">SANT PATHIK VIDYALAYA</div>
      <div style="font-size:17px;font-weight:700;margin-top:2px;">PASHUPATI NAGAR, BAHRAICH(U.P)</div>
      <div style="font-size:16.5px;margin-top:0px; font-weight:700;">Affiliated to CBSE New Delhi</div>
      <div style="font-size:14px;color:#1C0A00;margin-top:0px; font-weight:700;">Website:- www.santpathikvidyalaya.org | Email:- spvbrh@gmail.com</div>
    </div>
    <img src="/logo/school.PNG" style="width:79px;height:79px;object-fit:contain;" onerror="this.style.display='none'">
  </div>

  <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:400;padding:2px 5px;">
    <span>Affiliation Number: 2130176</span><span>School No:- 70178</span>
  </div>

  <!-- Title -->
  <div style="background:white;border: 2px solid #ebbc13; padding:1px;text-align:center;margin:0px 0;  border-left: none;  border-right: none; margin-top: 1px;">
    <span style="font-family:Georgia,serif;font-size:20px;font-weight:800;color:#1C0A00;letter-spacing:1px;">PROGRESS REPORT CARD</span>
  </div>

 <!-- Student Info -->
  <table style="   border-collapse: separate;   
    border-spacing: 0 5px;    
margin-bottom:8px; margin-top:0px;font-size:15.5px;border:1px solid #E8B060; border-bottom:2px solid #E8B060; border-left:2px solid #E8B060; border-right:2px solid #E8B060;">
    <tr style="background:#fff;border-bottom:2px solid #E8B060; border-top:1px solid #E8B060;">
      <td style="padding:0px 8px; padding-right:0px;width:22%;color:#1C0A00;font-weight:700;">Admission Number</td>
      <td style="padding:0px 8px;width:28%;font-weight:800;color:#1C0A00;font-size:15.5px;">${data.admissionNo}</td>
      <td style="padding:0px 8px;width:22%;color:#1C0A00;font-weight:700;">Roll Number</td>
      <td style="padding:0px 8px;width:28%;font-weight:800;color:#1C0A00;font-size:15.5px;">${data.rollNo}</td>
    </tr>
    <tr style="border-bottom:2px solid #E8B060;">
      <td style="padding:0px 8px;color:#1C0A00;font-weight:700;">Student's Name</td>
      <td style="padding:0px 8px;font-weight:800;">${data.studentName}</td>
      <td style="padding:0px 8px;color:#1C0A00;font-weight:700;">Class</td>
      <td style="padding:0px 8px;font-weight:800;">${data.class} ${data.section}</td>
    </tr>
    <tr style="border-bottom:2px solid #E8B060;">
      <td style="padding:0px 8px;color:#1C0A00;font-weight:700;">Mother's Name</td>
      <td style="padding:0px 8px;font-weight:700;">${data.motherName}</td>
      <td style="padding:0px 8px;color:#1C0A00;font-weight:700;">Session</td>
      <td style="padding:0px 8px;font-weight:800;">${data.session}</td>
    </tr>
    <tr style="">
      <td style="padding:0px 8px;color:#1C0A00;font-weight:700;">Father's Name</td>
      <td style="padding:0px 8px;font-weight:700;">${data.fatherName}</td>
      <td style="padding:0px 8px;color:#1C0A00;font-weight:700;">Date of Birth</td>
      <td style="padding:0px 8px;font-weight:800;">${fmtD(data.dob)}</td>
    </tr>
  </table>

   <!-- Scholastic Table -->


  
  <table style="margin-bottom:8px;font-size:12.5px;  border-collapse: collapse; border:1px solid #333;">
    <thead style="" >
      <tr >
        <th rowspan="1" style="${TH};font-size:16px;  color:black;font-weight:1000; width:185px;vertical-align:middle;font-size:14px;  padding-bottom:5px; padding-top:5px; background:#ffcb6b; text-align:center;border:1px solid  #ffcb6b;">SCHOLASTIC AREAS:</th>
        <th colspan="4" style="${TH2} ;font-size:14px;  color:black;font-weight:1000; font-size:14px; font-weight:1000; text-align:center;border:1px solid #ffcb6b;background:#ffcb6b; ">TERM-I &nbsp; <br> T1</th>
        <th colspan="4" style="${TH2} font-size:14px;  color:black; font-weight:1000;font-size:14px; font-weight:1000; text-align:center;border:1px solid #ffcb6b;background:#ffcb6b; ">TERM-II &nbsp; <br> T2</th>
        <th colspan="3" style="${TH} font-size:14px;  color:black; font-weight:1000; font-size:14px; font-weight:1000; text-align:center;border:1px solid #ffcb6b   ;background:#ffcb6b; ;">OVERALL &nbsp; <br> T1+T2</th>
        
      </tr>
      <tr style="background:#FFE8A0; border:2px solid #ffcb6b; ">
        <th style="${TH3} font-size:15px; padding-top:4px; padding-bottom:3px;  font-weight:1000;border:1px solid  #ffcb6b; ">Subject</th>

        <th style="${TH3} font-size:12px; padding-top:4px; padding-bottom:3px; font-weight:800;border:1px solid  #ffcb6b;">Best<br>Periodic<br>Test<br>(10)</th>
        <th style="${TH3}  font-size:12px;  padding-top:4px; padding-bottom:3px;font-weight:800;border:1px solid  #ffcb6b;">Note<br>Book<br>(5)</th>
        <th style="${TH3} font-size:12px;  padding-top:4px; padding-bottom:3px;font-weight:800;border:1px solid  #ffcb6b;">Subject<br>Enrich<br>ment<br>(5)</th>
        <th style="${TH3} font-size:12px;  padding-top:4px; padding-bottom:3px;font-weight:800;border:1px solid  #ffcb6b;">Half Yearly<br>Exam<br>(80)</th>
        <th style="${TH3} font-size:12px; padding-top:4px; padding-bottom:3px; font-weight:800;border:1px solid  #ffcb6b;">Best<br>Periodic<br>Test<br>(10)</th>
        <th style="${TH3} font-size:12px;  padding-top:4px; padding-bottom:3px;font-weight:800;border:1px solid  #ffcb6b;">Note<br>Book<br>(5)</th>
        <th style="${TH3} font-size:12px;  padding-top:4px; padding-bottom:3px;font-weight:800;border:1px solid  #ffcb6b;">Subject<br>Enrich<br>ment<br>(5)</th>
        <th style="${TH3} font-size:12px;  padding-top:4px; padding-bottom:3px;font-weight:800;border:1px solid  #ffcb6b;">Annual<br>Exam<br>(80)</th>
        <th style="${TH4} font-size:12px; padding-top:4px; padding-bottom:3px; font-weight:800; border:1px solid #ffcb6b; color:black;">Maximum<br>Marks<br>(200)</th>
        <th style="${TH4} font-size:12px; padding-top:4px; padding-bottom:3px; font-weight:800; border:1px solid #ffcb6b; color:black;">Marks<br>Obtained</th>
        <th style="${TH4}  font-size:12px; padding-top:4px; padding-bottom:3px; font-weight:800; border:1px solid #ffcb6b; color:black;">Grade</th>
      </tr>
    </thead>
    <tbody>
      ${sRows}
      <tr style="background:#FFE8A0;border:2px solid #ffcb6b;; padding:5px 0 ;">
        <td colspan="9" style="${TDL};font-size:13px; background:#FFE8A0; border-right:2px solid #ffcb6b; padding:1px 5px;">Total Marks</td>
        <td style="${TD};font-weight:800;color:#1C0A00;font-size:14px;background:#FFE8A0; padding:2px 10px; border-right:2px solid #ffcb6b; align:center; text-align:center; border-right:2px solid #ffcb6b;">${data.totalMaxMarks}</td>
        <td style="${TD};font-weight:900;color:#1C0A00;font-size:14px;background:#FFE8A0; padding:2px 10px; ; text-align:center; border-right:2px solid #ffcb6b;">${data.totalMarks}</td>
        <td style="${TD};background:#FFE8A0; padding:5px 5px;"></td>
      </tr>
      <tr style=" background:#ffcb6b0;border:2px solid #ffcb6b;">
        <td colspan="10" style="${TDL};background:#FFE8A0; font-size:13px;  border-right:2px solid #ffcb6b; padding:1px 5px;">Percentage</td>
        <td colspan="1" style="font-size:14.5px; ${TD};font-weight:900;color:#1C0A00;font-size:14px;background:#FFE8A0; padding:1px 10px; text-align:center ;border-left:2px solid #ffcb6b; border-right:2px solid #ffcb6b;">${data.percentage}</td>
        <td style=" ${TD};background:#FFE8A0;"></td>
      </tr>
      <tr style="background:#FFE8A0;border:2px solid #ffcb6b; font-size:14.5px;">
        <td colspan="10" style=" ${TDL};background:#FFE8A0; font-size:13px; border-right:2px solid #ffcb6b; padding:1px 5px; ">Rank</td>
        <td colspan="1" style="${TD};font-weight:900;color:#1C0A00;font-size:13px;background:#FFE8A0; padding:1px 10px;text-align:center; border-left:2px solid #ffcb6b; border-right:2px solid #ffcb6b;">${data.rank||'—'}</td>
        <td style="${TD};background:#FFE8A0;"></td>
      </tr>
    </tbody>
  </table>

   <!-- Co-Scholastic + Character -->
  <div style="display:flex;gap:10px;margin-bottom:2px; padding:0 2px ;">
    <table style="flex:1;font-size:12px; padding-top:0px; ">
      <thead>
        <tr><th colspan="2" style="${TH};font-size:11.5px;">CO-SCHOLASTIC AREA</th></tr>
        <tr>
          <th style="${TH2};text-align:left;padding:0px; padding-left:9px;  padding-top:0px;">CO-SCHOLASTIC ACTIVITIY</th>
          <th style="${TH2};width:70px;">GRADE</th>
        </tr>
      </thead>
      <tbody>${coRows}</tbody>
    </table>
    <table style="flex:1;font-size:12px;">
      <thead>
        <tr><th colspan="2" style="${TH};font-size:11.5px;">CHARACTER BUILDING VALUES</th></tr>
        <tr class="padding:0px;">
          <th style="${TH2};text-align:left;padding-left:9px; color:black; font-weight:800; font-size:12px;">ACTIVITY</th>
          <th style="${TH2};width:70px;">GRADE</th>
        </tr>
      </thead>
      <tbody>${cvRows}</tbody>
    </table>
  </div>

  <!-- Footer -->
  <div style="border-top:1.5px solid #E8B060;padding:8px 4px 4px; padding-top:1px; padding-bottom:0px;">
    <div style="font-size:12.5px;margin-bottom:5px;font-weight:600; padding-top:0px;">
      <strong>Class Teacher's Remarks :</strong>
      <span style="border-bottom:1px solid #333;display:inline-block;min-width:300px;">${data.teacherRemarks||''}</span>
    </div>
    <div style="font-size:12.5px;margin-bottom:3px;">
      <strong>Result :</strong>
      <strong style="color:${'#1C0A00'};">${data.result}</strong>
    </div>
    <div style="font-size:12px;  padding-top:0px;"><strong>Place:</strong> Bahraich</div>
    <div style="display:flex;justify-content:space-between; padding:0px;align-items:flex-end;margin-top:8px; margin-bottom:2px;">
      <div style="font-size:12px;"><strong>Date:</strong> ${dateStr}</div>
      <div style="text-align:center; padding:0px;">
        <div style="border-top:1.5px solid #333;width:160px;margin-bottom:4px;"></div>
        <div style="font-size:11.5px;font-weight:700;">Signature of Class Teacher</div>
      </div>
      <div style="text-align:center; padding:0px;">
        <div style="border-top:1.5px solid #333;width:160px;margin-bottom:4px;"></div>
        <div style="font-size:11.5px;font-weight:700;">Signature of Principal</div>
      </div>
    </div>
  </div>

  <!-- Grading System -->
  <div style="border-top:2px solid #E8A020;padding-top:4px;margin-top:5px; margin-bottom:3px;">
    <div style="font-family:Georgia,serif;font-size:13px;font-weight:800;text-align:center;margin-bottom:7px;letter-spacing:.8px;">GRADING SYSTEM</div>
    <div style="display:flex;gap:14px;">
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:800;text-align:center;margin-bottom:2px;">
          Grading scale for co-scholastic area &amp; character building values<br>
          <span style="font-weight:800;">(Grading on 5 point scale)</span>
        </div>
        <table style="font-size:12.5px;">
          <thead><tr><th style="${TH} color:black; ">PERFORMANCE</th><th style="${TH} ">GRADE</th></tr></thead>
          <tbody>${g5rows}</tbody>
        </table>
      </div>
      <div style="flex:1;">
        <div style="font-size:12px;font-weight:800;text-align:center;margin-bottom:2px;">
          Grading scale for scholastic areas:<br>
          <span style="font-weight:800;">(Grading on 8-point scale)</span>
        </div>
        <table style="font-size:12.5px;">
          <thead><tr><th style="${TH}">MARKS RANGE</th><th style="${TH}">GRADE</th></tr></thead>
          <tbody>${g8rows}</tbody>
        </table>
      </div>
    </div>
  </div>

</div>
<script>
  window.onload = function() {
    setTimeout(function() { window.print() }, 800)
  }
</script>
</body></html>  `
}
export default function ResultCard({ data, onBack }) {
  var [downloading, setDownloading] = useState(false)

  function handleDownload() {
    setDownloading(true)
    try {
      var html  = buildPrintHTML(data)
      var win   = window.open('', '_blank', 'width=1200,height=900')
      win.document.open()
      win.document.write(html)
      win.document.close()
    } catch(e) {
      alert('Could not open print window. Please allow popups for this site.')
    }
    setTimeout(function(){ setDownloading(false) }, 2000)
  }

  /* ── Screen theme: light golden-orange ── */
  var TH  = { padding:'5px', border:'1px solid '+BDR, fontWeight:'700', fontSize:'10px',  textAlign:'center', background:H1, color:'#fff', lineHeight:'1.3' }
  var TH2 = { ...TH, background:H2 }
  var TH3 = { ...TH, background:H3, color:'#1C0A00' }
  var TH4 = { ...TH, background:H4 }
  var TD  = { padding:'5px 4px', border:'1px solid '+BDR, fontSize:'11.5px', textAlign:'center', color:'#1C0A00' }
  var TDL = { ...TD, textAlign:'left', paddingLeft:'8px', fontWeight:'700', fontSize:'12px' }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        #spv-report-card {
          font-family: 'Times New Roman', Times, serif;
          max-width: 900px; margin: 0 auto;
          background: #fff; padding: 16px 20px 14px;
          color: #1C0A00;
          border: 2px solid ${ACC};
          border-radius: 4px;
        }
        #spv-report-card table { border-collapse: collapse; width:100%; }
        @keyframes slideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
      `}</style>

      {/* Action bar */}
      <div style={{ maxWidth:'900px', margin:'0 auto 16px', display:'flex', gap:'10px', alignItems:'center' }}>
        <button onClick={onBack}
          style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'11px 22px', borderRadius:'12px', border:'1.5px solid rgba(232,160,32,.35)', background:'#FFFDF8', color:ACC, fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', cursor:'pointer' }}>
          ← New Request
        </button>
        <div style={{ flex:1 }} />
        <button onClick={handleDownload} disabled={downloading}
          style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'11px 26px', borderRadius:'12px', background: downloading?'rgba(232,160,32,.5)':'linear-gradient(135deg,#E8A020,#F5C040)', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'800', border:'none', cursor: downloading?'wait':'pointer', boxShadow:'0 6px 20px rgba(232,160,32,.35)' }}>
          {downloading ? '⏳ Opening…' : '⬇ Download PDF'}
        </button>
      </div>

      {/* ══ REPORT CARD (screen view) ══ */}
      <div id="spv-report-card" style={{ animation:'slideUp .5s ease both' }}>

        {/* School Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'2px solid '+ACC, paddingBottom:'10px', marginBottom:'6px' }}>
          <img src="/logo/cbse.png" alt="CBSE" style={{ width:'68px', height:'68px', objectFit:'contain', flexShrink:0 }} />
          <div style={{ flex:1, textAlign:'center', padding:'0 10px' }}>
            <div style={{ fontFamily:'Georgia,serif', fontSize:'25px', fontWeight:'900', color:'#1C0A00' }}>SANT PATHIK VIDYALAYA</div>
            <div style={{ fontSize:'12.5px', fontWeight:'700', color:'#1C0A00', marginTop:'3px' }}>PASHUPATI NAGAR, BAHRAICH(U.P)</div>
            <div style={{ fontSize:'11.5px', color:'#1C0A00', marginTop:'2px' }}>Affiliated to CBSE New Delhi</div>
            <div style={{ fontSize:'11px', color:'#1C0A00', marginTop:'2px' }}>Website:- www.santpathikvidyalaya.org &nbsp;|&nbsp; Email:- spvbrh@gmail.com</div>
          </div>
          <img src="/logo/school.PNG" alt="School" style={{ width:'68px', height:'68px', objectFit:'contain', flexShrink:0 }} />
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11.5px', fontWeight:'700', marginBottom:'6px' }}>
          <span>Affiliation Number: 2130176</span><span>School No:- 70178</span>
        </div>

        {/* Golden title banner */}
        <div style={{ background:H2, padding:'8px 12px', textAlign:'center', marginBottom:'9px', borderRadius:'3px' }}>
          <div style={{ fontFamily:'Georgia,serif', fontSize:'16px', fontWeight:'900', color:'#1C0A00', letterSpacing:'2.5px' }}>PROGRESS REPORT CARD</div>
        </div>

        {/* Student info */}
        <table style={{ marginBottom:'9px', fontSize:'12.5px' }}>
          <tbody>
            <tr style={{ borderBottom:'1px solid '+BDR }}>
              <td style={{ padding:'5px 8px', width:'22%', color:'#1C0A00', fontWeight:'700' }}>Admission Number</td>
              <td style={{ padding:'5px 8px', width:'28%', fontWeight:'800', color:'#1C0A00', fontSize:'13px' }}>{data.admissionNo}</td>
              <td style={{ padding:'5px 8px', width:'22%', color:'#1C0A00', fontWeight:'700' }}>Roll Number</td>
              <td style={{ padding:'5px 8px', width:'28%', fontWeight:'800' }}>{data.rollNo}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid '+BDR, background:ROW }}>
              <td style={{ padding:'5px 8px', color:'#1C0A00', fontWeight:'700' }}>Student's Name</td>
              <td style={{ padding:'5px 8px', fontWeight:'800' }}>{data.studentName}</td>
              <td style={{ padding:'5px 8px', color:'#1C0A00', fontWeight:'700' }}>Class</td>
              <td style={{ padding:'5px 8px', fontWeight:'800' }}>{data.class} {data.section}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid '+BDR }}>
              <td style={{ padding:'5px 8px', color:'#1C0A00', fontWeight:'700' }}>Mother's Name</td>
              <td style={{ padding:'5px 8px', fontWeight:'700' }}>{data.motherName}</td>
              <td style={{ padding:'5px 8px', color:'#1C0A00', fontWeight:'700' }}>Session</td>
              <td style={{ padding:'5px 8px', fontWeight:'800' }}>{data.session}</td>
            </tr>
            <tr>
              <td style={{ padding:'5px 8px', color:'#1C0A00', fontWeight:'700' }}>Father's Name</td>
              <td style={{ padding:'5px 8px', fontWeight:'700' }}>{data.fatherName}</td>
              <td style={{ padding:'5px 8px', color:'#1C0A00', fontWeight:'700' }}>Date of Birth</td>
              <td style={{ padding:'5px 8px', fontWeight:'800' }}>{fmtDob(data.dob)}</td>
            </tr>
          </tbody>
        </table>

        {/* Scholastic table */}
        <table style={{ marginBottom:'10px', fontSize:'11px' }}>
          <thead>
            <tr>
              <th rowSpan={2} style={{ ...TH, width:'90px', fontSize:'11px', verticalAlign:'middle' }}>SCHOLASTIC<br/>AREAS:</th>
              <th colSpan={4} style={TH2}>TERM-I &nbsp; T1</th>
              <th colSpan={4} style={TH2}>TERM-II &nbsp; T2</th>
              <th colSpan={3} style={TH}>OVERALL &nbsp; T1+T2</th>
            </tr>
            <tr>
              {['Best<br/>Periodic<br/>Test<br/>(10)','Note<br/>Book<br/>(5)','Subject<br/>Enrich<br/>ment<br/>(5)','Half Yearly<br/>Exam<br/>(80)','Best<br/>Periodic<br/>Test<br/>(10)','Note<br/>Book<br/>(5)','Subject<br/>Enrich<br/>ment<br/>(5)','Annual<br/>Exam<br/>(80)'].map(function(t,i){
                return <th key={i} style={TH3} dangerouslySetInnerHTML={{ __html:t }} />
              })}
              <th style={TH4}>Maximum<br/>Marks<br/>(200)</th>
              <th style={TH4}>Marks<br/>Obtained</th>
              <th style={TH4}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {(data.subjects||[]).map(function(sub,i){
              var bg = i%2===0 ? '#fff' : ROW
              return (
                <tr key={i} style={{ background:bg }}>
                  <td style={TDL}>{sub.name}</td>
                  <td style={TD}>{sub.t1BestPT}</td><td style={TD}>{sub.t1NoteBook}</td>
                  <td style={TD}>{sub.t1SubjectEnrich}</td><td style={TD}>{sub.t1HalfYearly}</td>
                  <td style={TD}>{sub.t2BestPT}</td><td style={TD}>{sub.t2NoteBook}</td>
                  <td style={TD}>{sub.t2SubjectEnrich}</td><td style={TD}>{sub.t2Annual}</td>
                  <td style={{ ...TD, fontWeight:'200' }}>{sub.maxMarks||100}</td>
                  <td style={{ ...TD, fontWeight:'800', fontSize:'13px', color:'#1C0A00' }}>{sub.marksObtained}</td>
                  <td style={{ ...TD, fontWeight:'900', fontSize:'13px', color:gradeColor(sub.grade) }}>{sub.grade}</td>
                </tr>
              )
            })}
            <tr style={{ background:'#FFE8A0', borderTop:'2px solid '+ACC }}>
              <td colSpan={9} style={{ ...TDL, color:'#1C0A00', fontSize:'12.5px' }}>Total Marks</td>
              <td style={{ ...TD, fontWeight:'800', color:'#1C0A00', fontSize:'13px' }}>{data.totalMaxMarks}</td>
              <td style={{ ...TD, fontWeight:'900', color:'#1C0A00', fontSize:'14px' }}>{data.totalMarks}</td>
              <td style={TD}></td>
            </tr>
            <tr style={{ background:'#FFF3CC' }}>
              <td colSpan={9} style={{ ...TDL, color:'#1C0A00' }}>Percentage</td>
              <td colSpan={2} style={{ ...TD, fontWeight:'900', color:'#1C0A00', fontSize:'13px' }}>{data.percentage}</td>
              <td style={TD}></td>
            </tr>
            <tr style={{ background:'#FFE8A0' }}>
              <td colSpan={9} style={{ ...TDL, color:'#1C0A00' }}>Rank</td>
              <td colSpan={2} style={{ ...TD, fontWeight:'900', color:'#1C0A00', fontSize:'13px' }}>{data.rank||'—'}</td>
              <td style={TD}></td>
            </tr>
          </tbody>
        </table>

        {/* Co-Scholastic + Character */}
        <div style={{ display:'flex', gap:'12px', marginBottom:'10px' }}>
          <table style={{ flex:1, fontSize:'12px' }}>
            <thead>
              <tr><th colSpan={2} style={{ ...TH, fontSize:'11.5px' }}>CO-SCHOLASTIC AREA</th></tr>
              <tr>
                <th style={{ ...TH2, textAlign:'left', paddingLeft:'9px' }}>CO-SCHOLASTIC ACTIVITIY</th>
                <th style={{ ...TH2, width:'70px' }}>GRADE</th>
              </tr>
            </thead>
            <tbody>
              {(data.coScholastic||[]).map(function(c,i){
                return <tr key={i} style={{ background:i%2===0?'#fff':ROW }}>
                  <td style={{ ...TD, textAlign:'left', paddingLeft:'9px' }}>{c.activity}</td>
                  <td style={{ ...TD, fontWeight:'800', color:gradeColor(c.grade) }}>{c.grade}</td>
                </tr>
              })}
            </tbody>
          </table>
          <table style={{ flex:1, fontSize:'12px' }}>
            <thead>
              <tr><th colSpan={2} style={{ ...TH, fontSize:'11.5px' }}>CHARACTER BUILDING VALUES</th></tr>
              <tr>
                <th style={{ ...TH2, textAlign:'left', paddingLeft:'9px' }}>ACTIVITY</th>
                <th style={{ ...TH2, width:'70px' }}>GRADE</th>
              </tr>
            </thead>
            <tbody>
              {(data.characterValues||[]).map(function(c,i){
                return <tr key={i} style={{ background:i%2===0?'#fff':ROW }}>
                  <td style={{ ...TD, textAlign:'left', paddingLeft:'9px' }}>{c.activity}</td>
                  <td style={{ ...TD, fontWeight:'800', color:gradeColor(c.grade) }}>{c.grade}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1.5px solid '+BDR, paddingTop:'8px', marginBottom:'8px' }}>
          <div style={{ fontSize:'12.5px', marginBottom:'6px', fontWeight:'600' }}>
            <strong>Class Teacher's Remarks :</strong>&nbsp;
            <span style={{ borderBottom:'1px solid #333', display:'inline-block', minWidth:'300px' }}>{data.teacherRemarks||''}</span>
          </div>
          <div style={{ fontSize:'12.5px', marginBottom:'4px' }}>
            <strong>Result :</strong>&nbsp;
            <strong style={{ fontSize:'13px', color: '#1C0A00' }}>{data.result}</strong>
          </div>
          <div style={{ fontSize:'12px' }}><strong>Place:</strong> Bahraich</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'26px' }}>
            <div style={{ fontSize:'12px' }}><strong>Date:</strong> {fmtDate(data.date)}</div>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1.5px solid #333', width:'160px', marginBottom:'5px' }} />
              <div style={{ fontSize:'11.5px', fontWeight:'700' }}>Signature of Class Teacher</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ borderTop:'1.5px solid #333', width:'160px', marginBottom:'5px' }} />
              <div style={{ fontSize:'11.5px', fontWeight:'700' }}>Signature of Principal</div>
            </div>
          </div>
        </div>

        {/* Grading System */}
        <div style={{ borderTop:'2px solid '+ACC, paddingTop:'8px' }}>
          <div style={{ fontFamily:'Georgia,serif', fontSize:'13px', fontWeight:'700', color:'#1C0A00', textAlign:'center', marginBottom:'8px', letterSpacing:'.8px' }}>GRADING SYSTEM</div>
          <div style={{ display:'flex', gap:'14px' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'11px', fontWeight:'700', textAlign:'center', marginBottom:'6px' }}>
                Grading scale for co-scholastic area &amp; character building values<br/>
                <span style={{ fontWeight:'600', color:'#1C0A00' }}>(Grading on 5 point scale)</span>
              </div>
              <table style={{ fontSize:'11.5px' }}>
                <thead><tr><th style={{ ...TH, fontSize:'11px' }}>PERFORMANCE</th><th style={{ ...TH, fontSize:'11px' }}>GRADE</th></tr></thead>
                <tbody>
                  {[['Excellent','A'],['Very Good','B'],['Good','C'],['Satisfactory','D'],['Needs Improvement','E']].map(function(r,i){
                    return <tr key={r[0]} style={{ background:i%2===0?'#fff':ROW }}>
                      <td style={{ ...TD, textAlign:'left', paddingLeft:'8px' }}>{r[0]}</td>
                      <td style={{ ...TD, fontWeight:'800', color:gradeColor(r[1]) }}>{r[1]}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'11px', fontWeight:'700', textAlign:'center', marginBottom:'6px' }}>
                Grading scale for scholastic areas:<br/>
                <span style={{ fontWeight:'600', color:'#1C0A00' }}>(Grading on 8-point scale)</span>
              </div>
              <table style={{ fontSize:'11.5px' }}>
                <thead><tr><th style={{ ...TH, fontSize:'11px' }}>MARKS RANGE</th><th style={{ ...TH, fontSize:'11px' }}>GRADE</th></tr></thead>
                <tbody>
                  {[['181–200','A1'],['161–180','A2'],['141–160','B1'],['121–140','B2'],['101–120','C1'],['81–100','C2'],['66–80','D'],['65 & Below','E']].map(function(r,i){
                    return <tr key={r[0]} style={{ background:i%2===0?'#fff':ROW }}>
                      <td style={TD}>{r[0]}</td>
                      <td style={{ ...TD, fontWeight:'800', color:gradeColor(r[1]) }}>{r[1]}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}