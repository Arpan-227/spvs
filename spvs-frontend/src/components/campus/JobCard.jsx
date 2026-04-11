import { FaBriefcase, FaCheckCircle } from 'react-icons/fa'

export default function JobCard({ job, onApply }) {
  var isOpen = job.status === 'Open'

  return (
    <div
      style={{padding:'20px 24px',borderRadius:'16px',background:'var(--card)',border:'1.5px solid var(--brd)',transition:'all .3s',opacity:isOpen?'1':'.65'}}
      onMouseEnter={function(e){ if(isOpen){ e.currentTarget.style.borderColor='rgba(232,118,26,.4)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(232,118,26,.1)' } }}
      onMouseLeave={function(e){ e.currentTarget.style.borderColor='var(--brd)'; e.currentTarget.style.boxShadow='none' }}
    >
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        {/* Left */}
        <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
          <div style={{width:'50px',height:'50px',borderRadius:'14px',background:isOpen?'rgba(232,118,26,.12)':'var(--bg2)',border:'1.5px solid '+(isOpen?'rgba(232,118,26,.25)':'var(--brd)'),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:isOpen?'#E8761A':'var(--txt3)'}}>
            {isOpen ? <FaBriefcase size={22}/> : <FaCheckCircle size={22}/>}
          </div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--dark)',marginBottom:'5px'}}>{job.title}</div>
            <div style={{display:'flex',gap:'7px',flexWrap:'wrap',alignItems:'center'}}>
              <span style={{fontSize:'11px',fontWeight:'700',color:'var(--txt3)',background:'var(--bg2)',padding:'2px 10px',borderRadius:'50px'}}>{job.dept}</span>
              <span style={{fontSize:'11px',fontWeight:'700',color:'var(--txt3)',background:'var(--bg2)',padding:'2px 10px',borderRadius:'50px'}}>{job.type}</span>
              <span style={{fontSize:'11px',color:'var(--txt3)'}}>Exp: {job.exp}</span>
              <span style={{fontSize:'11px',color:'var(--txt3)'}}>Posted: {job.posted}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <span style={{fontSize:'11px',fontWeight:'800',padding:'4px 12px',borderRadius:'50px',background:isOpen?'rgba(34,163,90,.12)':'rgba(0,0,0,.06)',color:isOpen?'#22a35a':'var(--txt3)',display:'flex',alignItems:'center',gap:'5px'}}>
            {isOpen
              ? <><span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#22a35a',display:'inline-block'}}/> Open</>
              : <><FaCheckCircle size={10}/> Filled</>
            }
          </span>
          {isOpen && (
            <button
              onClick={function(){ onApply(job) }}
              style={{padding:'9px 20px',borderRadius:'50px',border:'none',cursor:'pointer',background:'linear-gradient(135deg,var(--or),var(--gd))',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'12.5px',fontWeight:'800',boxShadow:'0 4px 14px rgba(232,118,26,.3)',transition:'all .2s'}}
              onMouseEnter={function(e){e.currentTarget.style.transform='scale(1.05)'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='scale(1)'}}
            >
              Apply →
            </button>
          )}
        </div>
      </div>

      <div style={{marginTop:'12px',paddingTop:'12px',borderTop:'1px solid var(--brd)',fontSize:'12.5px',color:'var(--txt2)'}}>
        <span style={{color:'var(--txt3)'}}>Qualification required: </span>{job.qual}
      </div>
    </div>
  )
}