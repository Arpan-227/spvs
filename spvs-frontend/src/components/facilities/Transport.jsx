import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { transportAPI } from '../../api'
import { FaBus, FaMapMarkerAlt, FaUsers, FaPhone, FaSearch, FaBuilding } from 'react-icons/fa'

var FALLBACK = [
  { _id:1,  area:'Bahraich City Centre',   stops:'Gandhi Chowk, Bus Stand, Civil Lines, Court Road, Collectorate',           busNo:'Bus 01', departs:'7:10 AM', status:'Active' },
  { _id:2,  area:'Nanpara Road',            stops:'Nanpara Chowk, ITI Crossing, Petrol Pump, Bypass, Nawabganj',              busNo:'Bus 02', departs:'7:00 AM', status:'Active' },
  { _id:3,  area:'Kaiserganj',              stops:'Kaiserganj Bazar, Tahsil, Patel Nagar, Azadnagar, SBI Branch',            busNo:'Bus 03', departs:'6:55 AM', status:'Active' },
  { _id:4,  area:'Payagpur Road',           stops:'Payagpur, Jarwal Chowk, Mahsi, Gram Sabha, Harraiya',                     busNo:'Bus 04', departs:'6:45 AM', status:'Active' },
  { _id:5,  area:'Mihinpurwa',              stops:'Mihinpurwa, Ramnagar, Fakhrpur, Rajpur, Turtipur',                        busNo:'Bus 05', departs:'6:40 AM', status:'Active' },
  { _id:6,  area:'Bhinga Road',             stops:'Bhinga, Shravasti Crossing, Ekma, Ikauna, Patna',                        busNo:'Bus 06', departs:'6:35 AM', status:'Active' },
  { _id:7,  area:'Balrampur Road',          stops:'Balrampur Gate, Tulsipur, Utraula, Shivpur, Gainsari',                   busNo:'Bus 07', departs:'6:30 AM', status:'Active' },
  { _id:8,  area:'Gonda Road',              stops:'Gonda Crossing, Tarabganj, Colonelganj, Nawabganj, Mankapur',            busNo:'Bus 08', departs:'6:50 AM', status:'Active' },
  { _id:9,  area:'Pashupati Nagar (Local)', stops:'Wireless Colony, Power House, Stadium Gate, Medical Chowk, DM Residence', busNo:'Bus 09', departs:'7:20 AM', status:'Active' },
  { _id:10, area:'Huzoorpur',               stops:'Huzoorpur Bazar, Singha, Chilwaria, Kherma, Bhawanipur',                 busNo:'Bus 10', departs:'6:45 AM', status:'Active' },
]

var COLORS = ['#E8761A','#6C3FC5','#22a35a','#F5B800','#C45F0A','#E8761A','#6C3FC5','#22a35a','#F5B800','#C45F0A']

function RouteCard({ r, color, isOpen, onToggle }) {
  var stopList = typeof r.stops === 'string' ? r.stops.split(',').map(function(s){ return s.trim() }) : (r.stops||[])
  return (
    <div onClick={onToggle} style={{borderRadius:'16px',border:'1.5px solid '+(isOpen?color:'var(--brd)'),background:isOpen?color+'11':'var(--card)',cursor:'pointer',overflow:'hidden',transition:'all .3s cubic-bezier(.34,1.56,.64,1)',boxShadow:isOpen?'0 10px 30px '+color+'33':'none',transform:isOpen?'translateY(-3px)':'translateY(0)'}}>
      <div style={{padding:'18px',display:'flex',alignItems:'center',gap:'12px'}}>
        <div style={{width:'46px',height:'46px',borderRadius:'14px',background:'linear-gradient(135deg,'+color+','+color+'99)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 4px 14px '+color+'44'}}>
          <FaBus size={20} color="#fff"/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'var(--dark)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.area}</div>
          <div style={{fontSize:'11px',color:color,fontWeight:'700',marginTop:'3px'}}>{r.busNo||r.route||''} · Departs {r.departs||'—'}</div>
        </div>
        <div style={{fontSize:'16px',transition:'.3s',transform:isOpen?'rotate(180deg)':'rotate(0deg)',color:'var(--txt3)',flexShrink:0}}>▾</div>
      </div>
      {isOpen && (
        <div style={{padding:'0 18px 18px'}}>
          <div style={{fontSize:'11px',fontWeight:'800',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--txt3)',marginBottom:'10px'}}>Stops</div>
          <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
            {stopList.map(function(stop,i){
              return (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'13px',color:'var(--txt2)'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:color+'18',border:'1.5px solid '+color+'55',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:'800',color:color,flexShrink:0}}>{i+1}</div>
                  {stop}
                </div>
              )
            })}
          </div>
          {r.driver && (
            <div style={{marginTop:'12px',padding:'8px 12px',borderRadius:'10px',background:'var(--bg2)',border:'1px solid var(--brd)',fontSize:'12px',color:'var(--txt2)'}}>
              <span style={{fontWeight:'700',color:'var(--dark)'}}>Driver:</span> {r.driver}
              {r.driverPhone && <span> · <FaPhone size={10} style={{verticalAlign:'middle',marginRight:'3px'}}/><a href={'tel:'+r.driverPhone} style={{color:color,fontWeight:'700',textDecoration:'none'}}>{r.driverPhone}</a></span>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Transport({ embedded = false }) {
  var [routes,  setRoutes]  = useState([])
  var [loading, setLoading] = useState(true)
  var [search,  setSearch]  = useState('')
  var [selected,setSelected]= useState(null)

  useEffect(function() {
    transportAPI.getAll()
      .then(function(res){ setRoutes(res.data||[]); setLoading(false) })
      .catch(function(){ setLoading(false) })
  }, [])

  var display  = routes.length > 0 ? routes.filter(function(r){ return r.status !== 'Inactive' }) : FALLBACK
  var filtered = display.filter(function(r){
    var q = search.toLowerCase()
    var stopsStr = typeof r.stops === 'string' ? r.stops : (r.stops||[]).join(', ')
    return (r.area||'').toLowerCase().includes(q) || stopsStr.toLowerCase().includes(q) || (r.busNo||'').toLowerCase().includes(q)
  })

  var totalBuses    = routes.length || 22
  var totalStudents = routes.reduce(function(a,b){ return a+(Number(b.students)||0) },0) || 600
  var activeRoutes  = routes.filter(function(r){ return r.status==='Active' }).length || 10

  function toggle(id){ setSelected(selected===id?null:id) }

  return (
    <>
      <style>{`@keyframes spin { to{transform:rotate(360deg)} }`}</style>

      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaBuilding size={12}/> Facilities</div>
            <h1 className="pb-title">School <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Transport</span></h1>
            <p className="pb-sub">{totalBuses} buses covering all major areas of Bahraich — safe, timely and reliable</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Transport</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)',padding:embedded?'0':'60px 20px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { icon:<FaBus size={22} color="#E8761A"/>,          n:totalBuses,          l:'School Buses' },
              { icon:<FaMapMarkerAlt size={22} color="#E8761A"/>, n:activeRoutes,         l:'Active Routes' },
              { icon:<FaUsers size={22} color="#E8761A"/>,        n:totalStudents||'600+',l:'Students' },
              { icon:<FaPhone size={22} color="#E8761A"/>,        n:'Available',          l:'Help' },
            ].map(function(item){
              return (
                <div key={item.l} style={{padding:'16px 12px',borderRadius:'14px',background:'var(--card)',border:'1.5px solid var(--brd)',textAlign:'center'}}>
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'6px'}}>{item.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--or)',lineHeight:'1.2'}}>{item.n}</div>
                  <div style={{fontSize:'10px',color:'var(--txt3)',marginTop:'4px'}}>{item.l}</div>
                </div>
              )
            })}
          </div>

          {/* Transport incharge bar */}
          <div style={{padding:'16px 20px',borderRadius:'14px',background:'rgba(232,118,26,.06)',border:'1.5px solid rgba(232,118,26,.2)',marginBottom:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap'}}>
              <FaPhone size={24} color="#E8761A" style={{flexShrink:0}}/>
              <div style={{flex:1,minWidth:'180px'}}>
                <div style={{fontWeight:'700',color:'var(--dark)'}}>Transport Incharge: Ravikant Srivastava</div>
                <div style={{fontSize:'13px',color:'var(--txt2)'}}>For route enquiries, fee and new registration</div>
              </div>
              <a href="tel:+917985287461" className="btn-or" style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'10px 18px',fontSize:'13px',flexShrink:0}}>
                <FaPhone size={12}/> +91 7985287461
              </a>
            </div>
          </div>

          {/* Search */}
          <div style={{marginBottom:'18px',position:'relative'}}>
            <FaSearch size={14} color="#B87832" style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search your area or stop name..."
              style={{width:'100%',padding:'12px 16px 12px 40px',borderRadius:'12px',border:'1.5px solid var(--brd)',background:'var(--bg)',color:'var(--txt)',fontFamily:"'DM Sans',sans-serif",fontSize:'14px',outline:'none',boxSizing:'border-box'}}
              onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
          </div>

          {loading ? (
            <div style={{textAlign:'center',padding:'60px'}}>
              <div style={{width:'44px',height:'44px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 14px'}}/>
              <div style={{color:'var(--txt3)',fontSize:'14px'}}>Loading bus routes...</div>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'12px'}}>
              {filtered.map(function(r,i){
                return <RouteCard key={r._id} r={r} color={COLORS[i%COLORS.length]} isOpen={selected===r._id} onToggle={function(){toggle(r._id)}} />
              })}
            </div>
          )}

          {!loading && filtered.length===0 && (
            <div style={{textAlign:'center',padding:'48px'}}>
              <FaSearch size={36} color="var(--txt3)" style={{marginBottom:'12px'}}/>
              <div style={{fontWeight:'600',color:'var(--txt2)'}}>No route found for "{search}"</div>
              <div style={{fontSize:'13px',marginTop:'8px',color:'var(--txt3)'}}>Contact: +91 7985287461</div>
            </div>
          )}

          <div style={{marginTop:'20px',textAlign:'center',padding:'20px',borderRadius:'16px',background:'var(--bg2)',border:'1.5px solid var(--brd)'}}>
            <div style={{fontSize:'13px',color:'var(--txt2)',marginBottom:'10px'}}>Don't see your area? We may be able to add a stop!</div>
            <a href="tel:+919198783830" className="btn-or" style={{display:'inline-flex',alignItems:'center',gap:'7px',fontSize:'13px',padding:'10px 22px'}}>
              <FaPhone size={12}/> Call School Office
            </a>
          </div>
        </div>
      </div>
    </>
  )
}