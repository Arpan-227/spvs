import { Link } from 'react-router-dom'

const ALUMNI = [
  { em:'👨‍⚕️', name:'Dr. Shivansh Vishwakarma', batch:'2010', role:'Senior Resident, Ram Manohar Lohia Hospital, LKO', tag:'MBBS · MD' },
  { em:'👨‍💻', name:'Kushal Agarwal', batch:'2005', role:'Senior Software Engineer, Govt. Employee Insurance Co. — Washington DC, USA', tag:'Tech' },
  { em:'👩‍🔬', name:'Shrami Agarwal', batch:'2022', role:'IIT BHU (4th Year)', tag:'IIT' },
  { em:'👨‍⚕️', name:'Dr. Pratul Agarwal', batch:'2013', role:'Medical Officer, Indian Railway NER', tag:'MBBS' },
  { em:'👨‍💼', name:'Kumar Saurabh', batch:'2001', role:'Senior Manager (R&C), Steel Authority of India Ltd.', tag:'SAIL' },
  { em:'⚖️', name:'Kirti Vardhan Singh', batch:'2009', role:'PCS, Labour Enforcement Officer', tag:'PCS' },
]

export default function AlumniSection() {
  return (
    <section className="sect" style={{background:'var(--bg2)'}}>
      <div className="s-cont">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'48px',flexWrap:'wrap',gap:'16px'}}>
          <div className="rv">
            <div className="chip"><span className="chip-dot"></span>Our Alumni</div>
            <h2 className="sec-title">Our <span className="hl">Pride</span> &amp; Success Stories</h2>
            <div className="s-bar" style={{marginBottom:0}}></div>
          </div>
          <Link to="/alumni" className="btn-out rv" style={{transitionDelay:'.2s'}}>Meet All Alumni →</Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'18px'}}>
          {ALUMNI.map((a,i) => (
            <div key={i} className={`wcard rv3d d${(i%5)+1}`} style={{padding:'24px',cursor:'default',display:'flex',flexDirection:'column',gap:'12px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{
                  width:'60px',height:'60px',borderRadius:'50%',flexShrink:0,
                  background:'linear-gradient(135deg,var(--or),var(--gd))',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'26px',border:'2.5px solid rgba(245,184,0,.3)',
                  boxShadow:'0 4px 16px var(--shd)',
                  transition:'all .35s cubic-bezier(.34,1.56,.64,1)'
                }}>{a.em}</div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'var(--dark)',lineHeight:'1.25'}}>{a.name}</div>
                  <div style={{fontSize:'11px',fontWeight:'700',color:'var(--or)',letterSpacing:'1px',marginTop:'3px'}}>Batch of {a.batch}</div>
                </div>
              </div>
              <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.6'}}>{a.role}</div>
              <div style={{display:'inline-flex',alignItems:'center',background:'rgba(232,118,26,.07)',borderRadius:'50px',padding:'3px 12px',fontSize:'11px',fontWeight:'700',color:'var(--or2)',letterSpacing:'.5px',width:'fit-content'}}>
                {a.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="rv" style={{
          marginTop:'40px',display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px'
        }}>
          {[
            {n:'11+',lbl:'Notable Alumni'},
            {n:'Doctors',lbl:'Medical Officers & Professors'},
            {n:'IIT',lbl:'Students at Premier Institutes'},
            {n:'Govt.',lbl:'Officers & Civil Servants'},
          ].map((s,i) => (
            <div key={i} style={{
              background:'linear-gradient(135deg,var(--dark),var(--dark2))',
              borderRadius:'16px',padding:'20px',textAlign:'center'
            }}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'var(--gd2)',lineHeight:'1'}}>{s.n}</div>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,.4)',marginTop:'6px',letterSpacing:'.6px'}}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}