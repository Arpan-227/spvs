import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  var { authed, loading } = useAuth()

  if (loading) {
    return (
      <div style={{minHeight:'100vh', background:'#0f1117', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'40px', marginBottom:'14px'}}>🏫</div>
          <div style={{fontSize:'14px', color:'rgba(255,255,255,.4)', fontFamily:"'DM Sans',sans-serif"}}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!authed) return <Navigate to="/admin/login" replace />
  return children
}