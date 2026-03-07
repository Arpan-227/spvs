import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ROUTES = [
  { id:1,  area:'Bahraich City Centre',   stops:['Gandhi Chowk','Bus Stand','Civil Lines','Court Road','Collectorate'],              bus:'Bus 01', time:'7:10 AM', color:'#E8761A' },
  { id:2,  area:'Nanpara Road',            stops:['Nanpara Chowk','ITI Crossing','Petrol Pump','Bypass','Nawabganj'],                 bus:'Bus 02', time:'7:00 AM', color:'#6C3FC5' },
  { id:3,  area:'Kaiserganj',              stops:['Kaiserganj Bazar','Tahsil','Patel Nagar','Azadnagar','SBI Branch'],               bus:'Bus 03', time:'6:55 AM', color:'#22a35a' },
  { id:4,  area:'Payagpur Road',           stops:['Payagpur','Jarwal Chowk','Mahsi','Gram Sabha','Harraiya'],                        bus:'Bus 04', time:'6:45 AM', color:'#F5B800' },
  { id:5,  area:'Mihinpurwa',              stops:['Mihinpurwa','Ramnagar','Fakhrpur','Rajpur','Turtipur'],                           bus:'Bus 05', time:'6:40 AM', color:'#E8761A' },
  { id:6,  area:'Bhinga Road',             stops:['Bhinga','Shravasti Crossing','Ekma','Ikauna','Patna'],                           bus:'Bus 06', time:'6:35 AM', color:'#6C3FC5' },
  { id:7,  area:'Balrampur Road',          stops:['Balrampur Gate','Tulsipur','Utraula','Shivpur','Gainsari'],                      bus:'Bus 07', time:'6:30 AM', color:'#22a35a' },
  { id:8,  area:'Gonda Road',              stops:['Gonda Crossing','Tarabganj','Colonelganj','Nawabganj','Mankapur'],               bus:'Bus 08', time:'6:50 AM', color:'#F5B800' },
  { id:9,  area:'Pashupati Nagar (Local)', stops:['Wireless Colony','Power House','Stadium Gate','Medical Chowk','DM Residence'],   bus:'Bus 09', time:'7:20 AM', color:'#E8761A' },
  { id:10, area:'Huzoorpur',               stops:['Huzoorpur Bazar','Singha','Chilwaria','Kherma','Bhawanipur'],                    bus:'Bus 10', time:'6:45 AM', color:'#6C3FC5' },
]

function BusIcon({ color }) {
  var style = {
    width:'48px', height:'48px', borderRadius:'14px',
    background: 'linear-gradient(135deg,' + color + ' 0%,' + color + '99 100%)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'22px', flexShrink:0,
    boxShadow: '0 4px 14px ' + color + '44',
  }
  return <div style={style}>🚌</div>
}

function StopNumber({ color, num }) {
  var style = {
    width:'22px', height:'22px', borderRadius:'50%',
    background: color + '18',
    border: '1.5px solid ' + color + '55',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'10px', fontWeight:'800', color: color, flexShrink:0,
  }
  return <div style={style}>{num}</div>
}

function RouteCard({ r, isOpen, onToggle }) {
  var wrapStyle = {
    borderRadius:'18px',
    border: '1.5px solid ' + (isOpen ? r.color : 'var(--brd)'),
    background: isOpen ? r.color + '11' : 'var(--card)',
    cursor:'pointer', overflow:'hidden',
    transition:'all .3s cubic-bezier(.34,1.56,.64,1)',
    boxShadow: isOpen ? '0 10px 30px ' + r.color + '33' : 'none',
    transform: isOpen ? 'translateY(-4px)' : 'translateY(0)',
  }
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  
  return (
    <div onClick={onToggle} className="" style={wrapStyle}>
      <div style={{padding:'20px', display:'flex', alignItems:'center', gap:'14px'}}>
        <BusIcon color={r.color} />
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Playfair Display',serif", fontSize:'15px', fontWeight:'700', color:'var(--dark)'}}>
            {r.area}
          </div>
          <div style={{fontSize:'11px', color:r.color, fontWeight:'700', marginTop:'3px'}}>
            {r.bus} · Departs {r.time}
          </div>
        </div>
        <div style={{fontSize:'18px', transition:'.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color:'var(--txt3)'}}>
          ▾
        </div>
      </div>
      {isOpen && (
        <div style={{padding:'0 20px 20px'}}>
          <div style={{fontSize:'11px', fontWeight:'800', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--txt3)', marginBottom:'10px'}}>
            Stops
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
            {r.stops.map(function(stop, i) {
              return (
                <div key={i} style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px', color:'var(--txt2)'}}>
                  <StopNumber color={r.color} num={i + 1} />
                  {stop}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Transport({ embedded = false }) {
  var [search, setSearch] = useState('')
  var [selected, setSelected] = useState(null)

  var filtered = ROUTES.filter(function(r) {
    var q = search.toLowerCase()
    return r.area.toLowerCase().includes(q) || r.stops.some(function(s) { return s.toLowerCase().includes(q) })
  })

  function toggle(id) { setSelected(selected === id ? null : id) }

  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">🏗️ Facilities</div>
            <h1 className="pb-title">School <span style={{color:'var(--gd2)', fontStyle:'italic'}}>Transport</span></h1>
            <p className="pb-sub">22 buses covering all major areas of Bahraich — safe, timely and reliable</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Transport</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          <div className="" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'14px', marginBottom:'28px'}}>
            {[['🚌','22','School Buses'],['🗺️','10+','Routes'],['👥','600+','Students Covered'],['📞','Available','Transport Help']].map(function(item) {
              return (
                <div key={item[2]} style={{padding:'20px', borderRadius:'16px', background:'var(--card)', border:'1.5px solid var(--brd)', textAlign:'center'}}>
                  <div style={{fontSize:'26px', marginBottom:'8px'}}>{item[0]}</div>
                  <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:'var(--or)', lineHeight:'1.2'}}>{item[1]}</div>
                  <div style={{fontSize:'11px', color:'var(--txt3)', marginTop:'5px'}}>{item[2]}</div>
                </div>
              )
            })}
          </div>

          <div className="" style={{padding:'16px 22px', borderRadius:'14px', background:'rgba(232,118,26,.06)', border:'1.5px solid rgba(232,118,26,.2)', marginBottom:'24px', display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap'}}>
            <div style={{fontSize:'26px'}}>📞</div>
            <div>
              <div style={{fontWeight:'700', color:'var(--dark)'}}>Transport Incharge: Ravikant Srivastava</div>
              <div style={{fontSize:'13px', color:'var(--txt2)'}}>For route enquiries, fee and new registration</div>
            </div>
            <a href="tel:+917985287461" className="btn-or" style={{marginLeft:'auto', padding:'10px 20px', fontSize:'13px', flexShrink:0}}>📞 +91 7985287461</a>
          </div>

          <div className="" style={{marginBottom:'20px'}}>
            <input
              value={search}
              onChange={function(e) { setSearch(e.target.value) }}
              placeholder="🔍 Search your area or stop name..."
              style={{width:'100%', padding:'13px 18px', borderRadius:'12px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            />
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'14px'}}>
            {filtered.map(function(r) {
              return <RouteCard key={r.id} r={r} isOpen={selected === r.id} onToggle={function() { toggle(r.id) }} />
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{textAlign:'center', padding:'48px'}}>
              <div style={{fontSize:'40px', marginBottom:'12px'}}>🔍</div>
              <div style={{fontWeight:'600', color:'var(--txt2)'}}>No route found for "{search}"</div>
              <div style={{fontSize:'13px', marginTop:'8px', color:'var(--txt3)'}}>Contact: +91 7985287461</div>
            </div>
          )}

          <div className="" style={{marginTop:'24px', textAlign:'center', padding:'24px', borderRadius:'16px', background:'var(--bg2)', border:'1.5px solid var(--brd)'}}>
            <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'12px'}}>Don't see your area? We may be able to add a stop!</div>
            <a href="tel:+919198783830" className="btn-or" style={{fontSize:'13px', padding:'11px 24px'}}>📞 Call School Office</a>
          </div>

        </div>
      </div>
    </>
  )
}