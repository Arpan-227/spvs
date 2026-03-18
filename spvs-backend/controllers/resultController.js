const Result = require('../models/Result')

// ── GET all results (ADMIN) ───────────────────────────────────────────────────
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 })
    res.json({ success: true, data: results })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET single result by ID (ADMIN) ──────────────────────────────────────────
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── CREATE result (ADMIN) ─────────────────────────────────────────────────────
exports.createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body)
    res.status(201).json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── UPDATE result (ADMIN) ─────────────────────────────────────────────────────
exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' })
    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── DELETE result (ADMIN) ─────────────────────────────────────────────────────
exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Result deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── VERIFY result (PUBLIC) — student checks with admissionNo + dob ────────────
exports.verifyResult = async (req, res) => {
  try {
    const { admissionNo, dob } = req.body

    if (!admissionNo || !dob) {
      return res.status(400).json({ success: false, message: 'Admission number and date of birth are required' })
    }

    const result = await Result.findOne({
      admissionNo: admissionNo.trim().toUpperCase(),
      dob:         dob.trim(),
      status:      'Published',
    })

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No published result found. Please check your admission number and date of birth.',
      })
    }

    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}