import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { announcementAPI } from '../../api'

var FALLBACK = [
  '🎉 Admissions Open 2025–26 for classes Play Group to XII!',
  '🏅 KBC Winner Aarav Raghuvansh (Class V) wins ₹3,20,000!',
]

export default function AnnounceBar() {
  var [items, setItems] = useState([])

  useEffect(function() {
    announcementAPI.getAll()
      .then(function(res){ if((res.data||[]).length > 0) setItems(res.data) })
      .catch(function(){})
  }, [])

  var display = items.length > 0 ? items : FALLBACK.map(function(t,i){ return { _id:i, title:t } })

  return (
    <div className="ann">
      <div className="ann-in">
        <span className="ann-bell">🔔</span>
        <span className="ann-label">Notice</span>
        <span className="ann-text">
          {display.map(function(a, i) {
            return (
              <span key={a._id}>
                {a.link ? (
                  <a href={a.link} style={{color:'inherit',textDecoration:'underline'}}>{a.title}</a>
                ) : (
                  <span>{a.title}</span>
                )}
                {i < display.length - 1 && <span style={{margin:'0 12px',opacity:.5}}>|</span>}
              </span>
            )
          })}
          &nbsp;
          <Link to="/contact">Apply Now →</Link>
        </span>
      </div>
    </div>
  )
}