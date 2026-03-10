import { useParams, Link } from 'react-router-dom'

var CAT_CLR = {
  'Academic':    '#6C3FC5',
  'Achievement': '#E8761A',
  'Event':       '#22a35a',
  'Notice':      '#F5B800',
  'Sports':      '#E8761A',
  'Admission':   '#6C3FC5',
  'Holiday':     '#22a35a',
  'Competition': '#E94F37',
}

var POSTS = [
  {
    slug:'annual-sports-meet-2026', image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    title:'Annual Sports Meet 2026 — A Grand Celebration',
    category:'Sports', emoji:'⚽',
    author:'SPVS Admin', date:'15 Feb 2026',
    excerpt:'The Annual Sports Meet 2026 was a spectacular event with over 600 students participating in 20+ events.',
    content:[
      { type:'para', text:'The Annual Sports Meet 2026 at Sant Pathik Vidyalaya was a grand celebration of talent, discipline, and sportsmanship. Held over two days on the school grounds, the event saw enthusiastic participation from over 600 students across all classes.' },
      { type:'heading', text:'Events Held' },
      { type:'para', text:'The meet featured a wide variety of events including 100m, 200m, and 400m sprint races, long jump, high jump, shot put, football, kabaddi, kho-kho, and yoga demonstration. Each event was fiercely contested with students giving their personal best.' },
      { type:'highlight', text:'SPVS students won 12 medals at the District Level Sports Competition held in Bahraich, including 4 Gold medals.' },
      { type:'heading', text:'Chief Guest' },
      { type:'para', text:'The event was graced by the presence of the District Education Officer as the Chief Guest. The Director Sh. Awadhesh Narayan Agarwal and Principal Mrs. Pooja Agarwal felicitated the winners with medals and certificates.' },
      { type:'heading', text:'Message from Principal' },
      { type:'para', text:'Principal Mrs. Pooja Agarwal congratulated all participants and said that sports is an integral part of a student\'s holistic development. She encouraged students to maintain a balance between academics and physical fitness.' },
    ]
  },
  {
    slug:'cbse-results-2025', image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    title:'SPVS Achieves 100% Results in CBSE Board 2025',
    category:'Achievement', emoji:'🏆',
    author:'Principal Office', date:'10 Feb 2026',
    excerpt:'We are proud to announce 100% pass rate in CBSE Class X and XII Board Examinations 2025.',
    content:[
      { type:'para', text:'Sant Pathik Vidyalaya is proud to announce that all students who appeared in the CBSE Board Examinations 2025 for Class X and Class XII have successfully passed, maintaining our tradition of 100% results.' },
      { type:'highlight', text:'Class X: 100% Pass | Class XII: 100% Pass | 15 students scored above 90% aggregate.' },
      { type:'heading', text:'Top Performers' },
      { type:'para', text:'Ananya Shukla topped Class XII Science stream with 96.4%, while Rohan Verma led Class X with 95.8%. The school management felicitated all top performers in a special assembly.' },
      { type:'heading', text:'Message from Director' },
      { type:'para', text:'Director Sh. Awadhesh Narayan Agarwal congratulated all students, teachers and parents for this outstanding achievement. He attributed the success to the tireless efforts of the dedicated faculty and the hard work of every student.' },
    ]
  },
  {
    slug:'admissions-open-2026', image:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    title:'Admissions Open for Academic Year 2026–27',
    category:'Admission', emoji:'📋',
    author:'Admissions Office', date:'1 Jan 2026',
    excerpt:'Admissions are now open for 2026–27 for classes Play Group to Class XII. Limited seats available.',
    content:[
      { type:'para', text:'Sant Pathik Vidyalaya is pleased to announce that admissions are now open for the academic year 2026–27 for all classes from Play Group to Class XII. We invite parents to visit the school and explore our world-class facilities.' },
      { type:'highlight', text:'Admission Forms available at school office — Mon to Sat, 8:00 AM to 2:00 PM.' },
      { type:'heading', text:'Classes Available' },
      { type:'para', text:'Admissions are open for Play Group, Nursery, LKG, UKG, Class I through Class XII (Science, Commerce and Humanities streams). Seats are limited, so early registration is strongly advised.' },
      { type:'heading', text:'How to Apply' },
      { type:'para', text:'Parents can collect the admission form from the school office or fill the online enquiry form on our Contact page. For further details, call +91 9198783830 or email spvbrh@gmail.com.' },
    ]
  },
  {
    slug:'science-exhibition-2025', image:'https://images.unsplash.com/photo-1532094349884-543559a8c9bd?w=1200&q=80',
    title:'Science Exhibition 2025 — Innovation on Display',
    category:'Academic', emoji:'🔬',
    author:'Science Dept.', date:'20 Sep 2025',
    excerpt:'Students from Classes VI to XII presented 40+ innovative science projects at the Annual Science Exhibition.',
    content:[
      { type:'para', text:'The Annual Science Exhibition 2025 at Sant Pathik Vidyalaya was a showcase of creativity, innovation, and scientific thinking. Students from Classes VI to XII presented over 40 projects covering topics from renewable energy to environmental science.' },
      { type:'highlight', text:'Best Project Award went to Class XI students for their "Solar-Powered Water Purification" model.' },
      { type:'heading', text:'Highlights' },
      { type:'para', text:'Notable projects included a working earthquake alert system, a model of a smart city, a rainwater harvesting unit, and a biodegradable packaging prototype. Judges from local colleges evaluated the projects and awarded prizes to the top three teams.' },
    ]
  },
  {
    slug:'cultural-fest-2025', image:'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80',
    title:'Cultural Fest 2025 — Colors of Talent',
    category:'Event', emoji:'🎨',
    author:'SPVS Admin', date:'15 Nov 2025',
    excerpt:'The Annual Cultural Fest saw breathtaking performances in classical dance, music, drama and art.',
    content:[
      { type:'para', text:'The Annual Cultural Fest 2025 at Sant Pathik Vidyalaya was a vibrant celebration of art, culture, and student talent. Over 300 students participated in classical dance, folk dance, music, drama, painting, and poetry recitation.' },
      { type:'highlight', text:'The evening show was attended by 500+ parents, alumni, and guests.' },
      { type:'heading', text:'Performances' },
      { type:'para', text:'Highlights of the evening included a mesmerising Kathak performance by students of Class IX, a skit on environmental awareness by Class VIII, and a choir performance by the school music group. The Principal praised students for their dedication and rehearsal efforts.' },
    ]
  },
  {
    slug:'independence-day-2025', image:'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80',
    title:'Independence Day Celebration at SPVS',
    category:'Event', emoji:'🇮🇳',
    author:'SPVS Admin', date:'15 Aug 2025',
    excerpt:'Independence Day was celebrated with great patriotic fervour at SPVS.',
    content:[
      { type:'para', text:'Independence Day 2025 was celebrated with great patriotic fervour at Sant Pathik Vidyalaya. The morning began with the hoisting of the National Flag by Principal Mrs. Pooja Agarwal, followed by the National Anthem sung by the entire school.' },
      { type:'highlight', text:'"Our students are the future of this nation — may they always uphold its values and dignity." — Mrs. Pooja Agarwal, Principal' },
      { type:'heading', text:'Programme' },
      { type:'para', text:'The cultural programme included patriotic songs, speeches by students on the theme of national unity, a march past by the NCC and scout units, and a special drama on the freedom struggle. Sweets were distributed to all students at the end of the ceremony.' },
    ]
  },
  {
    slug:'new-smart-classes', image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
    title:'New Smart Classrooms Inaugurated',
    category:'Academic', emoji:'📱',
    author:'Management', date:'1 Apr 2025',
    excerpt:'SPVS inaugurated 10 new smart classrooms equipped with digital boards, projectors and high-speed internet.',
    content:[
      { type:'para', text:'Sant Pathik Vidyalaya took a major step towards modern education by inaugurating 10 new smart classrooms. Each classroom is equipped with a 75-inch interactive digital board, HD projector, high-speed Wi-Fi, and a teacher console system.' },
      { type:'highlight', text:'Total smart classrooms now: 20 — covering Classes VI to XII across all subjects.' },
      { type:'heading', text:'Vision' },
      { type:'para', text:'Director Sh. Awadhesh Narayan Agarwal said that the school is committed to providing the best learning environment to every student. The smart classrooms will enable teachers to deliver engaging, multimedia-rich lessons and help students grasp concepts more effectively.' },
    ]
  },
  {
    slug:'winter-carnival-2024', image:'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80',
    title:'Winter Carnival & Annual Prize Day 2024',
    category:'Event', emoji:'🎉',
    author:'SPVS Admin', date:'20 Dec 2024',
    excerpt:'The Winter Carnival and Annual Prize Distribution Ceremony was held with great enthusiasm.',
    content:[
      { type:'para', text:'The Winter Carnival and Annual Prize Distribution Day 2024 was celebrated with great joy and festivity at Sant Pathik Vidyalaya. The event brought together students, teachers, parents and alumni for a memorable evening.' },
      { type:'highlight', text:'Over 150 awards were distributed across academics, sports, arts, and co-curricular activities.' },
      { type:'heading', text:'Prize Distribution' },
      { type:'para', text:'Director Sh. Awadhesh Narayan Agarwal and Principal Mrs. Pooja Agarwal felicitated the top performers in academics, sports, and extracurricular activities. Special awards were also given to teachers for their outstanding contributions to student development.' },
    ]
  },
]

var RECENT = POSTS.slice(0,4)

export default function BlogDetail() {
  var { slug } = useParams()
  var post = POSTS.find(function(p) { return p.slug === slug })

  if (!post) {
    return (
      <div style={{background:'var(--bg)', minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 20px', textAlign:'center'}}>
        <div style={{fontSize:'64px', marginBottom:'16px'}}>📭</div>
        <div style={{fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:'var(--dark)', marginBottom:'10px'}}>Post Not Found</div>
        <div style={{fontSize:'14px', color:'var(--txt2)', marginBottom:'24px'}}>The blog post you are looking for does not exist.</div>
        <Link to="/blog" style={{padding:'11px 28px', borderRadius:'50px', background:'var(--or)', color:'#fff', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:'700'}}>← Back to Blog</Link>
      </div>
    )
  }

  var clr = CAT_CLR[post.category] || '#E8761A'

  return (
    <>
      {/* BANNER */}
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">{post.emoji} {post.category}</div>
          <h1 className="pb-title" style={{maxWidth:'800px', margin:'0 auto 12px'}}>{post.title}</h1>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', fontSize:'13px', color:'rgba(255,255,255,.7)', marginBottom:'14px'}}>
            <span>📅 {post.date}</span>
            <span>✍️ {post.author}</span>
            <span style={{background:'rgba(255,255,255,.15)', padding:'2px 12px', borderRadius:'50px', color:'#fff', fontWeight:'700'}}>{post.category}</span>
          </div>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/blog">Blog</Link><span>›</span>
            <span className="bc-cur">{post.title.slice(0,40)}...</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'60px 20px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 300px', gap:'32px', alignItems:'start'}}>

          {/* MAIN CONTENT */}
          <div>
            {/* Hero image */}
            {post.image ? (
              <div style={{height:'340px', borderRadius:'20px', overflow:'hidden', marginBottom:'32px', border:'1.5px solid '+clr+'20', position:'relative'}}>
                <img src={post.image} alt={post.title} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
                <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,.45) 100%)'}} />
                <div style={{position:'absolute', bottom:'18px', left:'20px', display:'flex', gap:'8px', flexWrap:'wrap'}}>
                  <span style={{background:clr, color:'#fff', fontSize:'11px', fontWeight:'800', padding:'4px 12px', borderRadius:'50px'}}>{post.emoji} {post.category}</span>
                </div>
              </div>
            ) : (
              <div style={{height:'200px', borderRadius:'20px', background:'linear-gradient(135deg,'+clr+'18,'+clr+'06)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'32px', border:'1.5px solid '+clr+'20', position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', width:'200px', height:'200px', borderRadius:'50%', background:clr+'08', top:'-60px', right:'-60px'}} />
                <div style={{position:'absolute', width:'140px', height:'140px', borderRadius:'50%', background:clr+'06', bottom:'-40px', left:'-40px'}} />
                <div style={{fontSize:'90px', position:'relative', zIndex:1}}>{post.emoji}</div>
              </div>
            )}

            {/* Content blocks */}
            <div style={{background:'var(--card)', borderRadius:'20px', padding:'36px', border:'1.5px solid var(--brd)'}}>
              {post.content.map(function(block, i) {
                if (block.type === 'heading') {
                  return (
                    <h2 key={i} style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'var(--dark)', margin:'28px 0 12px', paddingBottom:'10px', borderBottom:'2px solid '+clr+'25'}}>
                      {block.text}
                    </h2>
                  )
                }
                if (block.type === 'highlight') {
                  return (
                    <div key={i} style={{background:clr+'10', border:'1.5px solid '+clr+'25', borderLeft:'4px solid '+clr, borderRadius:'0 12px 12px 0', padding:'16px 20px', margin:'20px 0', fontSize:'14px', fontWeight:'600', color:'var(--dark)', lineHeight:'1.6'}}>
                      {block.text}
                    </div>
                  )
                }
                return (
                  <p key={i} style={{fontSize:'14.5px', color:'var(--txt2)', lineHeight:'1.8', marginBottom:'16px'}}>
                    {block.text}
                  </p>
                )
              })}

              {/* Tags + share */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px', marginTop:'32px', paddingTop:'24px', borderTop:'1px solid var(--brd)'}}>
                <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                  <span style={{fontSize:'12px', color:'var(--txt3)', fontWeight:'700'}}>Category:</span>
                  <span style={{fontSize:'12px', fontWeight:'800', color:clr, background:clr+'12', padding:'3px 12px', borderRadius:'50px'}}>{post.category}</span>
                </div>
                <div style={{display:'flex', gap:'8px'}}>
                  <span style={{fontSize:'12px', color:'var(--txt3)', fontWeight:'700', alignSelf:'center'}}>Share:</span>
                  {['WhatsApp','Facebook','Twitter'].map(function(s) {
                    return (
                      <button key={s} style={{padding:'6px 14px', borderRadius:'50px', border:'1.5px solid var(--brd)', background:'transparent', cursor:'pointer', fontSize:'11.5px', fontWeight:'700', color:'var(--txt2)', fontFamily:"'DM Sans',sans-serif", transition:'all .2s'}}
                        onMouseEnter={function(e){e.currentTarget.style.borderColor=clr;e.currentTarget.style.color=clr}}
                        onMouseLeave={function(e){e.currentTarget.style.borderColor='var(--brd)';e.currentTarget.style.color='var(--txt2)'}}
                      >{s}</button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Back button */}
            <div style={{marginTop:'24px'}}>
              <Link to="/blog" style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'11px 24px', borderRadius:'50px', border:'1.5px solid var(--brd)', background:'transparent', color:'var(--txt2)', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', fontWeight:'700', transition:'all .2s'}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor=clr;e.currentTarget.style.color=clr}}
                onMouseLeave={function(e){e.currentTarget.style.borderColor='var(--brd)';e.currentTarget.style.color='var(--txt2)'}}
              >← Back to Blog</Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{display:'flex', flexDirection:'column', gap:'20px', position:'sticky', top:'100px'}}>

            {/* Author card */}
            <div style={{background:'var(--card)', borderRadius:'16px', padding:'20px', border:'1.5px solid var(--brd)'}}>
              <div style={{fontWeight:'800', fontSize:'11px', color:'var(--txt3)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'12px'}}>Posted By</div>
              <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                <div style={{width:'44px', height:'44px', borderRadius:'12px', background:'linear-gradient(135deg,var(--or),var(--gd))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>🏫</div>
                <div>
                  <div style={{fontWeight:'700', fontSize:'14px', color:'var(--dark)'}}>{post.author}</div>
                  <div style={{fontSize:'12px', color:'var(--txt3)'}}>📅 {post.date}</div>
                </div>
              </div>
            </div>

            {/* Recent posts */}
            <div style={{background:'var(--card)', borderRadius:'16px', padding:'20px', border:'1.5px solid var(--brd)'}}>
              <div style={{fontWeight:'800', fontSize:'11px', color:'var(--txt3)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'14px'}}>Recent Posts</div>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {RECENT.filter(function(r){ return r.slug !== slug }).slice(0,3).map(function(r) {
                  var rclr = CAT_CLR[r.category] || '#E8761A'
                  return (
                    <Link key={r.slug} to={'/blog/'+r.slug} style={{display:'flex', gap:'10px', alignItems:'flex-start', textDecoration:'none', padding:'10px', borderRadius:'10px', border:'1px solid transparent', transition:'all .2s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='var(--bg2)';e.currentTarget.style.borderColor='var(--brd)'}}
                      onMouseLeave={function(e){e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='transparent'}}
                    >
                      <div style={{width:'38px', height:'38px', borderRadius:'10px', background:rclr+'15', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>{r.emoji}</div>
                      <div>
                        <div style={{fontSize:'12.5px', fontWeight:'700', color:'var(--dark)', lineHeight:'1.4', marginBottom:'3px'}}>{r.title.slice(0,50)}...</div>
                        <div style={{fontSize:'11px', color:'var(--txt3)'}}>{r.date}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div style={{background:'linear-gradient(135deg,var(--or),var(--gd))', borderRadius:'16px', padding:'20px', textAlign:'center'}}>
              <div style={{fontSize:'28px', marginBottom:'8px'}}>📞</div>
              <div style={{fontFamily:"'Playfair Display',serif", fontSize:'15px', fontWeight:'700', color:'#fff', marginBottom:'6px'}}>Admission Enquiry</div>
              <div style={{fontSize:'12px', color:'rgba(255,255,255,.8)', marginBottom:'14px'}}>Call us for admissions 2026–27</div>
              <a href="tel:+919198783830" style={{display:'block', padding:'9px', borderRadius:'50px', background:'rgba(255,255,255,.2)', color:'#fff', textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'800', border:'1.5px solid rgba(255,255,255,.3)'}}>+91 9198783830</a>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}