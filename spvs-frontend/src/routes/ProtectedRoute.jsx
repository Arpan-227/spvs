import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  var token = localStorage.getItem('spvs_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}