const jwt    = require('jsonwebtoken')
const Admin  = require('../models/Admin')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

// ── POST /api/auth/login ──────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password)
      return res.status(400).json({ success: false, message: 'Please provide username and password' })

    const admin = await Admin.findOne({ username })
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' })

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: { id: admin._id, username: admin.username },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password')
  res.json({ success: true, admin })
}

// ── POST /api/auth/change-password  (ADMIN PROTECTED) ────────────────────────
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters'
      })
    }

    const admin = await Admin.findById(req.admin.id)
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' })
    }

    // Check current password is correct
    const isMatch = await admin.matchPassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // ✅ Set plain text — Admin.js pre-save hook hashes it automatically
    // ❌ Do NOT bcrypt.hash() here — causes double hashing → login breaks
    admin.password = newPassword
    await admin.save()

    res.json({ success: true, message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { login, getMe, changePassword }