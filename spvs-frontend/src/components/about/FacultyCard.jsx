var DEPT_CLR = {
  'Principal':         { bg:'rgba(232,118,26,.12)', clr:'#C45F0A' },
  'Vice Principal':    { bg:'rgba(108,63,197,.1)',  clr:'#6C3FC5' },
  'P.G.T':             { bg:'rgba(34,163,90,.1)',   clr:'#22a35a' },
  'T.G.T':             { bg:'rgba(232,118,26,.1)',  clr:'#E8761A' },
  'Primary':           { bg:'rgba(196,95,10,.1)',   clr:'#C45F0A' },
  'Office':            { bg:'rgba(122,64,16,.1)',   clr:'#7A4010' },
}

function getInitials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i,'').split(' ').slice(0,2).map(function(w){ return w[0] }).join('').toUpperCase()
}

function getGradient(name) {
  var gradients = [
    'linear-gradient(135deg,#E8761A,#F5B800)',
    'linear-gradient(135deg,#C45F0A,#E8761A)',
    'linear-gradient(135deg,#7A4010,#C45F0A)',
    'linear-gradient(135deg,#1C0A00,#7A4010)',
    'linear-gradient(135deg,#6C3FC5,#9B6FE8)',
    'linear-gradient(135deg,#22a35a,#4ADE80)',
  ]
  var idx = name.charCodeAt(0) % gradients.length
  return gradients[idx]
}

export default function FacultyCard({ name, designation, subject, qualification, experience, phone, department }) {
  var roleKey = designation && designation.includes('Principal') ? designation : designation && designation.includes('P.G.T') ? 'P.G.T' : designation && designation.includes('T.G.T') ? 'T.G.T' : designation && designation.includes('Primary') ? 'Primary' : 'Office'
  var clrs = DEPT_CLR[roleKey] || DEPT_CLR['Office']

  return (
    <div style={{background:'#FFFFFF', borderRadius:'18px', border:'1.5px solid rgba(232,118,26,.12)', padding:'24px', boxShadow:'0 4px 16px rgba(232,118,26,.06)', transition:'all .25s', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}
      onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(232,118,26,.13)'; e.currentTarget.style.borderColor='rgba(232,118,26,.25)' }}
      onMouseLeave={function(e){ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'; e.currentTarget.style.borderColor='rgba(232,118,26,.12)' }}>

      {/* Avatar */}
      <div style={{width:'72px', height:'72px', borderRadius:'50%', background:getGradient(name), display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', fontWeight:'800', color:'#fff', marginBottom:'14px', boxShadow:'0 6px 20px rgba(232,118,26,.25)', flexShrink:0, letterSpacing:'.5px'}}>
        {getInitials(name)}
      </div>

      {/* Name */}
      <div style={{fontFamily:"'Playfair Display',serif", fontSize:'14.5px', fontWeight:'700', color:'#1C0A00', marginBottom:'5px', lineHeight:'1.3'}}>{name}</div>

      {/* Designation badge */}
      {designation && (
        <div style={{padding:'3px 11px', borderRadius:'20px', fontSize:'10.5px', fontWeight:'800', background:clrs.bg, color:clrs.clr, letterSpacing:'.5px', marginBottom:'10px', display:'inline-block'}}>{designation}</div>
      )}

      {/* Subject */}
      {subject && (
        <div style={{fontSize:'12px', color:'#7A4010', fontWeight:'600', marginBottom:'6px'}}>{subject}</div>
      )}

      {/* Qualification */}
      {qualification && (
        <div style={{fontSize:'11.5px', color:'#B87832', marginBottom: (experience||phone)?'6px':'0', padding:'4px 10px', borderRadius:'8px', background:'#FFF6EA'}}>{qualification}</div>
      )}

      {/* Experience */}
      {experience && (
        <div style={{fontSize:'11.5px', color:'#7A4010', fontWeight:'700', marginBottom: phone?'6px':'0', padding:'3px 10px', borderRadius:'8px', background:'rgba(232,118,26,.08)', border:'1px solid rgba(232,118,26,.12)'}}>🕐 {experience}</div>
      )}

      {/* Phone */}
      {phone && (
        <div style={{display:'flex', alignItems:'center', gap:'5px', marginTop:'8px', fontSize:'12px', color:'#7A4010', fontWeight:'600'}}>
          <span>📞</span> {phone}
        </div>
      )}
    </div>
  )
}