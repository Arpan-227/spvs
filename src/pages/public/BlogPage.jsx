import { Link } from 'react-router-dom'
import BlogList from '../../components/blog/BlogList'

export default function BlogPage() {
  return (
    <>
      {/* PAGE BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">📰 Blog & Updates</div>
          <h1 className="pb-title">Latest <span style={{color:'var(--gd2)', fontStyle:'italic'}}>News & Updates</span></h1>
          <p className="pb-sub">School announcements, achievements, events and academic updates — stay informed with SPVS</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Blog & Updates</span>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))', padding:'18px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'16px'}}>
          {[['8+','Posts Published','📝'],['6','Categories','🏷️'],['2026','Latest Year','📅'],['100%','Board Results','🏆']].map(function(s) {
            return (
              <div key={s[1]} style={{textAlign:'center', color:'#fff'}}>
                <div style={{fontSize:'16px', marginBottom:'2px'}}>{s[2]}</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', lineHeight:'1'}}>{s[0]}</div>
                <div style={{fontSize:'11px', fontWeight:'700', opacity:'.8', letterSpacing:'1px', textTransform:'uppercase', marginTop:'3px'}}>{s[1]}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'60px 20px', minHeight:'60vh'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <BlogList />
        </div>
      </div>
    </>
  )
}