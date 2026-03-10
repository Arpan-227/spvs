var ADMIN_USER = 'spvs_admin'
var ADMIN_PASS = 'SPVS@2026#Admin'
var TOKEN_KEY  = 'spvs_admin_token'

function makeToken(username) {
  var payload = { username: username, iat: Date.now(), exp: Date.now() + 8 * 60 * 60 * 1000 }
  return btoa(JSON.stringify(payload))
}

function parseToken(token) {
  try { return JSON.parse(atob(token)) }
  catch(e) { return null }
}

export function login(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    var token = makeToken(username)
    localStorage.setItem(TOKEN_KEY, token)
    return { success: true }
  }
  return { success: false, error: 'Invalid username or password' }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated() {
  var token = localStorage.getItem(TOKEN_KEY)
  if (!token) return false
  var data = parseToken(token)
  if (!data) return false
  if (Date.now() > data.exp) { logout(); return false }
  return true
}

export function getAdminUser() {
  var token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null
  var data = parseToken(token)
  return data ? data.username : null
}