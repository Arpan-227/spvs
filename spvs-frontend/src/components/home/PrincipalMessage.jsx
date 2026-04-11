import { FaUserTie, FaChalkboardTeacher } from 'react-icons/fa'

export default function PrincipalMessage() {
  return (
    <section className="lead-sect sect">
      <div className="s-cont">
        <div className="lead-intro rv">
          <div className="chip"><span className="chip-dot"></span>Leadership</div>
          <h2 className="sec-title">Our <span className="hl">Leadership</span></h2>
          <div className="s-bar" style={{margin:'10px auto 18px'}}></div>
          <p className="s-desc">Guided by vision, driven by commitment to student excellence.</p>
        </div>
        <div className="lead-grid">
          {/* Manager */}
          <div className="lcard rv d1">
            <div className="l-av" style={{background:'linear-gradient(135deg,var(--or),var(--gd))',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <div className="l-spin"></div>
              <FaUserTie size={40} color="#fff"/>
            </div>
            <div className="l-name">Sh. Awadhesh Narayan Agarwal</div>
            <div className="l-role">Manager</div>
            <div className="l-quote">"Education is the most powerful tool to achieve the goal. We move from knowledge to skill, competition to cooperation."</div>
          </div>
          {/* Principal */}
          <div className="lcard rv d2">
            <div className="l-av" style={{background:'linear-gradient(135deg,var(--gd),var(--or3))',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <div className="l-spin"></div>
              <FaChalkboardTeacher size={40} color="#fff"/>
            </div>
            <div className="l-name">Mrs. Pooja Agarwal</div>
            <div className="l-role">Principal — M.A. B.Ed</div>
            <div className="l-quote">"Our children are not only taught to fly high but also to stay attached to their roots. Each one is special, each one is beautiful."</div>
          </div>
        </div>
        {/* Full quote */}
        <div className="lead-note rv">
          <p className="ln-body">
            "The essence of Sant Pathik Vidyalaya lies in its inclusiveness. Our mentors are competent, hardworking, and dedicated. We maintain perfect harmony between school curriculum and extra-curricular activities — and we are fortunate to have a community of parents who are both understanding and supportive."
          </p>
          <div className="ln-auth">
            <div className="ln-av" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <FaChalkboardTeacher size={22} color="#000"/>
            </div>
            <div>
              <div className="ln-nm">Mrs. Pooja Agarwal</div>
              <div className="ln-rl">Principal, Sant Pathik Vidyalaya</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}