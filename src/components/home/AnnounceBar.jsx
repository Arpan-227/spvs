import { Link } from 'react-router-dom'
export default function AnnounceBar() {
  return (
    <div className="ann">
      <div className="ann-in">
        <span className="ann-bell">🔔</span>
        <span className="ann-label">Notice</span>
        <span className="ann-text">
          🎉 Admissions Open 2025–26 for classes Play Group to XII! &nbsp;
          <Link to="/contact">Apply Now →</Link>
          &nbsp;|&nbsp; 🏅 KBC Winner Aarav Raghuvansh (Class V) wins ₹3,20,000!
        </span>
      </div>
    </div>
  )
}