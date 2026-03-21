
export default function CertPreloader() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@500;700&display=swap');

        @keyframes cpl-spin1  { to { transform: rotate(360deg)  } }
        @keyframes cpl-spin2  { to { transform: rotate(-360deg) } }
        @keyframes cpl-spin3  { to { transform: rotate(360deg)  } }
        @keyframes cpl-pulse  { 0%,100%{ transform:scale(1);   opacity:.9 } 50%{ transform:scale(1.06); opacity:1 } }
        @keyframes cpl-fadein { from{ opacity:0 } to{ opacity:1 } }
        @keyframes cpl-dot    { 0%,80%,100%{ transform:translateY(0); opacity:.35 } 40%{ transform:translateY(-7px); opacity:1 } }
        @keyframes cpl-text   { from{ opacity:0; transform:translateY(10px) } to{ opacity:1; transform:none } }
      `}</style>

      <div style={{
        position:'fixed', inset:0, zIndex:9999,
        background:'#FFFDF8',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        gap:'24px',
        animation:'cpl-fadein .35s ease'
      }}>

        {/* ── Logo + rings ── */}
        <div style={{ position:'relative', width:'120px', height:'120px' }}>

          {/* Ring 1 — orange dashed outer */}
          <div style={{
            position:'absolute', inset:'-14px',
            borderRadius:'50%',
            border:'3px dashed rgba(232,118,26,.35)',
            animation:'cpl-spin1 8s linear infinite'
          }} />

          {/* Ring 2 — solid orange */}
          <div style={{
            position:'absolute', inset:'-6px',
            borderRadius:'50%',
            border:'3px solid transparent',
            borderTopColor:'#E8761A',
            borderRightColor:'#F5B800',
            animation:'cpl-spin2 1.4s linear infinite'
          }} />

          {/* Ring 3 — thin gold */}
          <div style={{
            position:'absolute', inset:'0px',
            borderRadius:'50%',
            border:'2.5px solid transparent',
            borderBottomColor:'#F5B800',
            borderLeftColor:'rgba(232,118,26,.4)',
            animation:'cpl-spin3 1s linear infinite'
          }} />

          {/* Logo circle */}
          <div style={{
            position:'absolute', inset:'8px',
            borderRadius:'50%',
            background:'#fff',
            boxShadow:'0 4px 24px rgba(232,118,26,.18)',
            display:'flex', alignItems:'center', justifyContent:'center',
            animation:'cpl-pulse 2.2s ease-in-out infinite',
            overflow:'hidden'
          }}>
            <img
              src="/logo/school.PNG"
              alt="Sant Pathik Vidyalaya"
              style={{
                width:'88px', height:'88px',
                objectFit:'contain',
                borderRadius:'50%'
              }}
            />
          </div>
        </div>

        {/* ── School name + tagline ── */}
        <div style={{ textAlign:'center', animation:'cpl-text .5s .2s ease both' }}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'17px', fontWeight:'700',
            color:'#1C0A00', letterSpacing:'.3px',
            marginBottom:'3px'
          }}>Sant Pathik Vidyalaya</div>
          <div style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:'12px', fontWeight:'500',
            color:'#B87832', letterSpacing:'.5px'
          }}>Verifying your details…</div>
        </div>

        {/* ── Bouncing dots ── */}
        <div style={{ display:'flex', gap:'6px' }}>
          {[0,1,2].map(function(i){
            return (
              <div key={i} style={{
                width:'7px', height:'7px', borderRadius:'50%',
                background:'linear-gradient(135deg,#E8761A,#F5B800)',
                animation:'cpl-dot 1.3s ease-in-out '+(i*0.2)+'s infinite'
              }} />
            )
          })}
        </div>

      </div>
    </>
  )
}