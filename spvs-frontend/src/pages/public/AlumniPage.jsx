import { useState } from 'react'
import { Link } from 'react-router-dom'

var NOTABLE = [
  { name:'Dr. Arvind Mishra',      batch:'1998', field:'Medicine',       role:'Senior Cardiologist, AIIMS Delhi',         avatar:'AM', clr:'#E8761A' },
  { name:'Ms. Priya Shukla',       batch:'2003', field:'Civil Services', role:'IAS Officer, Uttar Pradesh Cadre',          avatar:'PS', clr:'#6C3FC5' },
  { name:'Mr. Rahul Verma',        batch:'2005', field:'Engineering',    role:'Senior Engineer, ISRO Bengaluru',           avatar:'RV', clr:'#22a35a' },
  { name:'Dr. Neha Tiwari',        batch:'2001', field:'Medicine',       role:'Gynaecologist, District Hospital Bahraich', avatar:'NT', clr:'#F5B800' },
  { name:'Mr. Sanjay Agarwal',     batch:'2007', field:'Business',       role:'Founder & CEO, TechStart India',            avatar:'SA', clr:'#E8761A' },
  { name:'Ms. Ankita Singh',       batch:'2010', field:'Education',      role:'Principal, Government School Lucknow',      avatar:'AS', clr:'#6C3FC5' },
  { name:'Mr. Vivek Pandey',       batch:'2004', field:'Law',            role:'Advocate, Allahabad High Court',            avatar:'VP', clr:'#22a35a' },
  { name:'Mr. Deepak Yadav',       batch:'2012', field:'Engineering',    role:'Software Engineer, Google India',           avatar:'DY', clr:'#F5B800' },
]

var FIELDS = ['All', 'Medicine', 'Civil Services', 'Engineering', 'Business', 'Education', 'Law']

var TESTIMONIALS = [
  { name:'Priya Shukla',   batch:'2003', text:'SPVS gave me the discipline and values to crack UPSC. I am forever grateful to my teachers who believed in me.', avatar:'PS', clr:'#6C3FC5' },
  { name:'Rahul Verma',    batch:'2005', text:'The science labs and dedicated faculty at SPVS built my passion for engineering. ISRO was a dream SPVS helped me achieve.', avatar:'RV', clr:'#22a35a' },
  { name:'Sanjay Agarwal', batch:'2007', text:'Entrepreneurship needs courage. SPVS gave me that courage through its co-curricular activities and strong mentorship.', avatar:'SA', clr:'#E8761A' },
]

var STATS = [
  { n:'5000+', l:'Alumni Worldwide',   em:'🌍' },
  { n:'37+',   l:'Batches Passed Out', em:'🎓' },
  { n:'100+',  l:'In Civil Services',  em:'🏛️' },
  { n:'500+',  l:'In Medicine',        em:'⚕️' },
]

export default function AlumniPage() {
  var [filter, setFilter] = useState('All')
  var [form, setForm] = useState({ name:'', batch:'', phone:'', email:'', field:'', city:'', message:'' })
  var [sent, setSent] = useState(false)
  var [loading, setLoading] = useState(false)

  var filtered = filter === 'All' ? NOTABLE : NOTABLE.filter(function(a) { return a.field === filter })

  function handleChange(e) {
    var key = e.target.name, val = e.target.value
    setForm(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[key] = val; return n })
  }

  function handleSubmit(e) {
    e.preventDefault(); setLoading(true)
    setTimeout(function() { setLoading(false); setSent(true) }, 1200)
  }

  var inp = { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s' }
  var lbl = { fontSize:'11px', fontWeight:'800', color:'var(--txt3)', letterSpacing:'.5px', textTransform:'uppercase', display:'block', marginBottom:'5px' }

  return (
    <>
      {/* BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">🎓 Alumni</div>
          <h1 className="pb-title">Our <span style={{color:'var(--gd2)', fontStyle:'italic'}}>Alumni</span></h1>
          <p className="pb-sub">5000+ proud alumni — doctors, engineers, IAS officers and entrepreneurs — the living legacy of SPVS</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Alumni</span>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))', padding:'22px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'16px'}}>
          {STATS.map(function(s) {
            return (
              <div key={s.l} style={{textAlign:'center', color:'#fff'}}>
                <div style={{fontSize:'20px', marginBottom:'2px'}}>{s.em}</div>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', lineHeight:'1'}}>{s.n}</div>
                <div style={{fontSize:'11px', fontWeight:'700', opacity:'.8', letterSpacing:'1px', textTransform:'uppercase', marginTop:'3px'}}>{s.l}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'70px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* NOTABLE ALUMNI */}
          <div style={{marginBottom:'72px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Hall of Fame</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:'0 0 28px'}}>Notable <span style={{color:'var(--or)', fontStyle:'italic'}}>Alumni</span></h2>
              {/* Filter */}
              <div style={{display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap'}}>
                {FIELDS.map(function(f) {
                  var active = filter === f
                  return (
                    <button key={f} onClick={function(){setFilter(f)}} style={{padding:'8px 18px', borderRadius:'50px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'700', transition:'all .2s', background: active ? 'var(--or)' : 'var(--bg2)', color: active ? '#fff' : 'var(--txt2)', boxShadow: active ? '0 4px 14px rgba(232,118,26,.3)' : 'none'}}>
                      {f}
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'16px'}}>
              {filtered.map(function(a) {
                return (
                  <div key={a.name}
                    style={{padding:'24px', borderRadius:'20px', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .35s cubic-bezier(.34,1.56,.64,1)', display:'flex', gap:'16px', alignItems:'flex-start'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+a.clr+'25';e.currentTarget.style.borderColor=a.clr+'44'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                  >
                    <div style={{width:'56px', height:'56px', borderRadius:'16px', background:'linear-gradient(135deg,'+a.clr+','+a.clr+'bb)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", fontSize:'16px', fontWeight:'900', color:'#fff', flexShrink:0, boxShadow:'0 4px 14px '+a.clr+'40'}}>
                      {a.avatar}
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontFamily:"'Playfair Display',serif", fontSize:'15px', fontWeight:'700', color:'var(--dark)', marginBottom:'4px'}}>{a.name}</div>
                      <div style={{fontSize:'11px', fontWeight:'800', color:a.clr, background:a.clr+'12', padding:'2px 10px', borderRadius:'50px', display:'inline-block', marginBottom:'6px'}}>{a.field} · Batch {a.batch}</div>
                      <div style={{fontSize:'12.5px', color:'var(--txt2)', lineHeight:'1.5'}}>{a.role}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div style={{marginBottom:'72px'}}>
            <div style={{textAlign:'center', marginBottom:'36px'}}>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'12px'}}>Alumni Speak</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'32px', fontWeight:'700', color:'var(--dark)', margin:0}}>Words from Our <span style={{color:'var(--or)', fontStyle:'italic'}}>Alumni</span></h2>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'18px'}}>
              {TESTIMONIALS.map(function(t) {
                return (
                  <div key={t.name}
                    style={{padding:'28px', borderRadius:'20px', background:'var(--card)', border:'1.5px solid var(--brd)', transition:'all .3s cubic-bezier(.34,1.56,.64,1)', display:'flex', flexDirection:'column', gap:'14px'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+t.clr+'22';e.currentTarget.style.borderColor=t.clr+'44'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
                  >
                    <div style={{fontSize:'40px', lineHeight:'1', color:t.clr, opacity:'.4', fontFamily:'Georgia,serif', marginBottom:'-6px'}}>"</div>
                    <div style={{fontSize:'13.5px', color:'var(--txt2)', lineHeight:'1.7', fontStyle:'italic', flex:1}}>{t.text}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'12px', paddingTop:'14px', borderTop:'1px solid var(--brd)'}}>
                      <div style={{width:'44px', height:'44px', borderRadius:'12px', background:'linear-gradient(135deg,'+t.clr+','+t.clr+'bb)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'900', color:'#fff', flexShrink:0}}>{t.avatar}</div>
                      <div>
                        <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)'}}>{t.name}</div>
                        <div style={{fontSize:'11.5px', color:'var(--txt3)'}}>Batch {t.batch}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* REGISTRATION FORM */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start'}}>

            {/* Left — info */}
            <div>
              <div style={{display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--or)', background:'rgba(232,118,26,.1)', padding:'6px 16px', borderRadius:'50px', marginBottom:'16px'}}>Stay Connected</div>
              <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'30px', fontWeight:'700', color:'var(--dark)', margin:'0 0 14px'}}>Register as an <span style={{color:'var(--or)', fontStyle:'italic'}}>Alumnus</span></h2>
              <p style={{fontSize:'14px', color:'var(--txt2)', lineHeight:'1.7', marginBottom:'28px'}}>
                Are you a SPVS graduate? Register to stay connected with your alma mater, attend reunions and inspire current students.
              </p>
              {[
                ['🎉', 'Alumni Reunions',     'Annual gatherings to reconnect with batchmates and teachers'],
                ['📢', 'Guest Lectures',      'Share your journey and inspire current students'],
                ['🤝', 'Mentorship Program',  'Guide students in career choices and opportunities'],
                ['📰', 'Alumni Newsletter',   'Stay updated with school news and fellow alumni'],
              ].map(function(item) {
                return (
                  <div key={item[1]} style={{display:'flex', gap:'14px', alignItems:'flex-start', marginBottom:'18px'}}>
                    <div style={{width:'42px', height:'42px', borderRadius:'12px', background:'rgba(232,118,26,.1)', border:'1.5px solid rgba(232,118,26,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>{item[0]}</div>
                    <div>
                      <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)', marginBottom:'3px'}}>{item[1]}</div>
                      <div style={{fontSize:'13px', color:'var(--txt2)'}}>{item[2]}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right — form */}
            <div style={{background:'var(--card)', borderRadius:'20px', padding:'32px', border:'1.5px solid var(--brd)', boxShadow:'0 6px 28px rgba(0,0,0,.04)'}}>
              {sent ? (
                <div style={{textAlign:'center', padding:'32px 0'}}>
                  <div style={{fontSize:'52px', marginBottom:'14px'}}>🎉</div>
                  <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Welcome Back!</div>
                  <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'24px'}}>Thank you for registering. We will be in touch soon.</div>
                  <button onClick={function(){setSent(false);setForm({name:'',batch:'',phone:'',email:'',field:'',city:'',message:''})}} style={{padding:'11px 28px', borderRadius:'50px', border:'none', cursor:'pointer', background:'var(--or)', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'700'}}>Done</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'13px'}}>
                  <div style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:'var(--dark)', marginBottom:'4px'}}>Alumni Registration</div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                    <div>
                      <label style={lbl}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                    </div>
                    <div>
                      <label style={lbl}>Passing Year *</label>
                      <input name="batch" value={form.batch} onChange={handleChange} required placeholder="e.g. 2005" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                    </div>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                    <div>
                      <label style={lbl}>Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                    </div>
                    <div>
                      <label style={lbl}>Email *</label>
                      <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="your@email.com" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                    </div>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                    <div>
                      <label style={lbl}>Profession / Field</label>
                      <input name="field" value={form.field} onChange={handleChange} placeholder="e.g. Medicine, Engineering" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                    </div>
                    <div>
                      <label style={lbl}>Current City</label>
                      <input name="city" value={form.city} onChange={handleChange} placeholder="City you live in" style={inp} onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Message to School</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Share a memory or message for current students..." rows={3}
                      style={{width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s', resize:'vertical', lineHeight:'1.6'}}
                      onFocus={function(e){e.target.style.borderColor='var(--or)'}} onBlur={function(e){e.target.style.borderColor='var(--brd)'}} />
                  </div>
                  <button type="submit" disabled={loading} style={{padding:'13px 32px', borderRadius:'50px', border:'none', cursor: loading ? 'wait' : 'pointer', background:'linear-gradient(135deg,var(--or),var(--gd))', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'800', boxShadow:'0 6px 24px rgba(232,118,26,.35)', opacity: loading ? '.7' : '1', transition:'all .25s'}}>
                    {loading ? '⏳ Registering...' : '🎓 Register as Alumnus →'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}