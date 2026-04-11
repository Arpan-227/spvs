import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ClassesInfra           from '../../components/academics/ClassesInfra'
import SubjectList             from '../../components/academics/SubjectList'
import FeeStructure            from '../../components/academics/FeeStructure'
import TeachersQualification   from '../../components/academics/TeachersQualification'
import { FaSchool, FaBook, FaMoneyBillWave, FaChalkboardTeacher } from 'react-icons/fa'

const TABS = [
  { id:'classes',  icon:<FaSchool size={14}/>,           label:'Classes',  short:'Classes'  },
  { id:'subjects', icon:<FaBook size={14}/>,             label:'Subjects', short:'Subjects' },
  { id:'fees',     icon:<FaMoneyBillWave size={14}/>,    label:'Fees',     short:'Fees'     },
  { id:'faculty',  icon:<FaChalkboardTeacher size={14}/>,label:'Faculty',  short:'Faculty'  },
]

export default function AcademicsPage() {
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const tabParam = params.get('tab')

  const [activeTab, setActiveTab] = useState(
    TABS.find(t => t.id === tabParam) ? tabParam : 'classes'
  )

  useEffect(() => {
    const p = new URLSearchParams(location.search).get('tab')
    if (p && TABS.find(t => t.id === p)) setActiveTab(p)
  }, [location.search])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv, .rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [activeTab])

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaBook size={12}/> Academics</div>
          <h1 className="pb-title">
            Academic <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Excellence</span>
          </h1>
          <p className="pb-sub">CBSE curriculum · Experienced faculty · Modern infrastructure · 100% board results</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Academics</span>
          </div>
        </div>
      </div>

      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))',padding:'16px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 16px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'10px'}}>
          {[['1410+','Students'],['64+','Teachers'],['PG–XII','Classes'],['100%','Results'],['8','Labs']].map(([n,l]) => (
            <div key={l} style={{textAlign:'center',color:'#fff',minWidth:'54px'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',lineHeight:'1'}}>{n}</div>
              <div style={{fontSize:'9px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'var(--bg)',minHeight:'60vh'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'32px 14px'}}>
          <div style={{display:'flex',gap:'5px',background:'var(--bg2)',padding:'5px',borderRadius:'14px',border:'1.5px solid var(--brd)',marginBottom:'28px'}}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                flex:1, padding:'10px 4px', borderRadius:'10px', border:'none', cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif", fontWeight:'700',
                transition:'all .28s cubic-bezier(.34,1.56,.64,1)',
                background: activeTab===t.id ? 'var(--card)' : 'transparent',
                color: activeTab===t.id ? 'var(--or)' : 'var(--txt2)',
                boxShadow: activeTab===t.id ? '0 4px 20px var(--shd)' : 'none',
                transform: activeTab===t.id ? 'scale(1.02)' : 'scale(1)',
                fontSize:'clamp(11px,2.5vw,14px)', whiteSpace:'nowrap',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'5px',
              }}>
                {t.icon} {t.short}
              </button>
            ))}
          </div>

          <div key={activeTab} style={{animation:'fU .35s ease both'}}>
            {activeTab === 'classes'  && <ClassesInfra        embedded />}
            {activeTab === 'subjects' && <SubjectList          embedded />}
            {activeTab === 'fees'     && <FeeStructure         embedded />}
            {activeTab === 'faculty'  && <TeachersQualification embedded />}
          </div>
        </div>
      </div>
    </>
  )
}