import { Link } from 'react-router-dom'

var SECTIONS = [
  {
    title: 'A. General Information',
    icon: '🏫',
    rows: [
      ['Name of the School',                'Sant Pathik Vidyalaya'],
      ['Affiliation No.',                   '2130176'],
      ['School No.',                        '70178'],
      ['Complete Address',                  'Pashupati Nagar, Bahraich, Uttar Pradesh – 271802'],
      ['Principal Name',                    'Mrs. Pooja Agarwal'],
      ['Principal Qualification',           'M.A., B.Ed'],
      ['School Email',                      'spvbrh@gmail.com'],
      ['Contact No.',                       '+91 9198783830'],
      ['Year of Establishment',             '1987'],
      ['Status of School',                  'Independent'],
      ['Type of Affiliation',               'Provisional'],
      ['Period of Affiliation',             'Up to 31.03.2025'],
      ['UDISE Code',                        '09500707504'],
    ]
  },
  {
    title: 'B. Documents & Certificates',
    icon: '📋',
    rows: [
      ['Copies of Affiliation / Upgradation Letter', 'Available at School Office'],
      ['Copies of Societies / Trust / Company Registration', 'Available at School Office'],
      ['Copy of No Objection Certificate (NOC)', 'Available — Issued by State Govt.'],
      ['Copies of Recognition Certificate', 'Available at School Office'],
      ['Copy of Valid Building Safety Certificate', 'Available at School Office'],
      ['Copy of Valid Fire Safety Certificate', 'Available at School Office'],
      ['Copy of Self Certification', 'Submitted to CBSE'],
      ['Copies of Land Certificate', 'Available at School Office'],
    ]
  },
  {
    title: 'C. Result & Academics',
    icon: '📊',
    rows: [
      ['Fee Structure',                     'As per CBSE guidelines — See Academics page'],
      ['Annual Academic Calendar',          'Available on Campus Life page'],
      ['List of School Management Committee', 'Available at School Office'],
      ['List of Parents Teachers Association', 'Available at School Office'],
      ['Last 3 Years Board Results (Class X)', '100% Pass — Distinction in Multiple Subjects'],
      ['Last 3 Years Board Results (Class XII)', '100% Pass — Science, Commerce & Humanities'],
    ]
  },
  {
    title: 'D. Staff Information',
    icon: '👨‍🏫',
    rows: [
      ['Total Teaching Staff',              '64 (14 PGT + 20 TGT + 30 PRT)'],
      ['Principal',                         'Mrs. Pooja Agarwal — M.A., B.Ed'],
      ['Vice Principal',                    'Mr. Bhikha Ram Tripathi — M.Sc., B.Ed'],
      ['No. of Administrative Staff',       '8'],
      ['No. of Non-Teaching Staff',         '12'],
      ['Teacher–Student Ratio',             '1 : 22 (Approx.)'],
      ['Details of Special Educator',       'Available at School Office'],
      ['Details of Counsellor / Wellness Teacher', 'Available at School Office'],
    ]
  },
  {
    title: 'E. School Infrastructure',
    icon: '🏗️',
    rows: [
      ['Total Campus Area',                 '10 Acres (approx.)'],
      ['No. of Classrooms',                 '73'],
      ['No. of Labs',                       '8 (Physics, Chemistry, Biology, Computer × 2, STEM, Language, Maths)'],
      ['Internet Facility',                 'Yes — Available in Computer Labs & Staff Room'],
      ['No. of Girls Toilets',              'Available — As per CBSE norms'],
      ['No. of Boys Toilets',               'Available — As per CBSE norms'],
      ['Swimming Pool',                     'No'],
      ['Indoor Games',                      'Yes — Table Tennis, Carrom, Chess'],
      ['Dance Room',                        'Yes'],
      ['Gymnasium',                         'No'],
      ['Music Room',                        'Yes'],
      ['Hostel',                            'Yes — Boys Hostel Available'],
      ['Health & Medical Check-up',         'Annual health check-up for all students'],
    ]
  },
  {
    title: 'F. Transport',
    icon: '🚌',
    rows: [
      ['Own Buses',                         '22 Buses covering all major routes'],
      ['Buses Hired on Contract',           'None'],
      ['Details of Transport Charges',      'As per route — available at school office'],
      ['GPS Tracking',                      'Available in all school buses'],
    ]
  },
]

export default function MandatoryDisclosurePage() {
  return (
    <>
      {/* BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">📋 Mandatory Disclosure</div>
          <h1 className="pb-title">Mandatory <span style={{color:'var(--gd2)', fontStyle:'italic'}}>Disclosure</span></h1>
          <p className="pb-sub">As per CBSE Affiliation Bye-Laws — complete school information for transparency and accountability</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Mandatory Disclosure</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'60px 20px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>

          {/* CBSE Notice */}
          <div style={{background:'rgba(108,63,197,.06)', border:'1.5px solid rgba(108,63,197,.2)', borderRadius:'16px', padding:'20px 24px', marginBottom:'44px', display:'flex', gap:'14px', alignItems:'flex-start'}}>
            <div style={{fontSize:'28px', flexShrink:0}}>ℹ️</div>
            <div>
              <div style={{fontWeight:'700', fontSize:'14px', color:'#6C3FC5', marginBottom:'4px'}}>CBSE Mandatory Disclosure</div>
              <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.6'}}>
                This disclosure is published as per the requirements of CBSE Affiliation Bye-Laws. Sant Pathik Vidyalaya is affiliated to the Central Board of Secondary Education (CBSE), New Delhi. Affiliation No. <strong>2130176</strong>.
              </div>
            </div>
          </div>

          {/* Sections */}
          <div style={{display:'flex', flexDirection:'column', gap:'28px'}}>
            {SECTIONS.map(function(sec) {
              return (
                <div key={sec.title} style={{borderRadius:'20px', overflow:'hidden', border:'1.5px solid var(--brd)', boxShadow:'0 4px 20px rgba(0,0,0,.04)'}}>
                  {/* Section header */}
                  <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))', padding:'16px 24px', display:'flex', alignItems:'center', gap:'12px'}}>
                    <span style={{fontSize:'22px'}}>{sec.icon}</span>
                    <span style={{fontFamily:"'Playfair Display',serif", fontSize:'17px', fontWeight:'700', color:'#fff'}}>{sec.title}</span>
                  </div>
                  {/* Rows */}
                  <table style={{width:'100%', borderCollapse:'collapse'}}>
                    <tbody>
                      {sec.rows.map(function(row, i) {
                        return (
                          <tr key={row[0]}
                            style={{borderTop: i===0 ? 'none' : '1px solid var(--brd)', background: i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)', transition:'background .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.03)'}}
                            onMouseLeave={function(e){e.currentTarget.style.background= i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)'}}
                          >
                            <td style={{padding:'13px 24px', fontSize:'13.5px', fontWeight:'600', color:'var(--txt3)', width:'40%', verticalAlign:'top'}}>{row[0]}</td>
                            <td style={{padding:'13px 24px', fontSize:'13.5px', fontWeight:'600', color:'var(--dark)', verticalAlign:'top'}}>{row[1]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>

          {/* Footer note */}
          <div style={{marginTop:'40px', padding:'20px 24px', borderRadius:'14px', background:'rgba(232,118,26,.05)', border:'1.5px solid rgba(232,118,26,.15)', textAlign:'center'}}>
            <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.7'}}>
              For any additional information or document verification, please contact the school office.<br />
              <strong style={{color:'var(--or)'}}>📞 +91 9198783830</strong> &nbsp;|&nbsp; <strong style={{color:'var(--or)'}}>📧 spvbrh@gmail.com</strong> &nbsp;|&nbsp; <strong style={{color:'var(--or)'}}>🕐 Mon–Sat, 8:00 AM – 3:00 PM</strong>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}