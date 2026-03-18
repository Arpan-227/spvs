// controllers/tcController.js
const TC = require('../models/Tc')

/* ── Helper: normalize DOB to DD-MM-YYYY for comparison ── */
function normalizeDob(dob) {
  if (!dob) return ''
  dob = dob.trim()
  // YYYY-MM-DD → DD-MM-YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    var p = dob.split('-')
    return p[2] + '-' + p[1] + '-' + p[0]
  }
  return dob
}

/* ── GET ALL ── */
exports.getAll = async (req, res) => {
  try {
    const tcs = await TC.find().sort({ createdAt: -1 })
    res.json({ success: true, data: tcs })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/* ── GET BY ID ── */
exports.getById = async (req, res) => {
  try {
    const tc = await TC.findById(req.params.id)
    if (!tc) return res.status(404).json({ message: 'TC not found' })
    res.json({ success: true, data: tc })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/* ── CREATE ── */
exports.create = async (req, res) => {
  try {
    const tc = await TC.create(req.body)
    res.status(201).json({ success: true, data: tc })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

/* ── UPDATE ── */
exports.update = async (req, res) => {
  try {
    const tc = await TC.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!tc) return res.status(404).json({ message: 'TC not found' })
    res.json({ success: true, data: tc })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

/* ── DELETE ── */
exports.delete = async (req, res) => {
  try {
    await TC.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'TC deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/* ── VERIFY (public) ── */
exports.verify = async (req, res) => {
  try {
    const { admissionNo, dob } = req.body
    if (!admissionNo || !dob)
      return res.status(400).json({ message: 'Admission number and date of birth are required' })

    const admNo    = admissionNo.trim().toUpperCase()
    const dobNorm  = normalizeDob(dob)       // always DD-MM-YYYY
    const dobAlt   = dob.trim()              // original as sent

    /* Match against both DD-MM-YYYY and YYYY-MM-DD stored formats */
    const tc = await TC.findOne({
      admissionNo: admNo,
      status:      'Published',
      $or: [
        { dob: dobNorm },
        { dob: dobAlt  },
      ]
    })

    if (!tc)
      return res.status(404).json({
        message: 'No Transfer Certificate found. Please check your Admission Number and Date of Birth.'
      })

    res.json({ success: true, data: tc })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}