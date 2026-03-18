export default function Highlights() {
  const items = [
    { ic:'🥇', n:'75%+', lbl:'Gold Medals', sub:'District Inter-School Sports 2024' },
    { ic:'🏏', n:'1st', lbl:'Kabaddi Champions', sub:'CBSE District Level Competition' },
    { ic:'📺', n:'₹3.2L', lbl:'KBC Winner', sub:'Aarav Raghuvansh, Class V' },
    { ic:'🏅', n:'National', lbl:'Essay Medal', sub:'Vaishnavi Singh, Class XI — CVC' },
    { ic:'📚', n:'100%', lbl:'Board Results', sub:'Class X & XII — Every year' },
    { ic:'🔬', n:'8', lbl:'Equipped Labs', sub:'Physics · Chemistry · Biology · CS · STEM' },
  ]
  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">
        <div className="rv" style={{textAlign:'center',marginBottom:'48px'}}>
          <div className="chip"><span className="chip-dot"></span>Achievements</div>
          <h2 className="sec-title">Our <span className="hl">Highlights</span> &amp; Pride</h2>
          <div className="s-bar" style={{margin:'10px auto 0'}}></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'18px'}}>
          {items.map((item,i) => (
            <div className={`wcard rv d${(i%5)+1}`} key={i} style={{padding:'26px 20px',textAlign:'center',cursor:'default'}}>
              <div style={{fontSize:'38px',marginBottom:'10px'}}>{item.ic}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',fontWeight:'700',color:'var(--or)',lineHeight:'1',marginBottom:'6px'}}>{item.n}</div>
              <div style={{fontWeight:'700',color:'var(--dark)',marginBottom:'4px',fontSize:'14px'}}>{item.lbl}</div>
              <div style={{fontSize:'12px',color:'var(--txt3)'}}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}