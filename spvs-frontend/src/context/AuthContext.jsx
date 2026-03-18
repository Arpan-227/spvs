import { createContext, useContext, useState, useEffect } from 'react'
import { isAuthenticated, login as doLogin, logout as doLogout, getAdminUser } from '../utils/auth'

var AuthContext = createContext(null)

export function AuthProvider({ children }) {
  var [authed, setAuthed]   = useState(false)
  var [user, setUser]       = useState(null)
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    var ok = isAuthenticated()
    setAuthed(ok)
    setUser(ok ? getAdminUser() : null)
    setLoading(false)
  }, [])

  function login(username, password) {
    var result = doLogin(username, password)
    if (result.success) { setAuthed(true); setUser(username) }
    return result
  }

  function logout() {
    doLogout()
    setAuthed(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ authed, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}