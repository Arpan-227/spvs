const TC   = require('../models/Tc')
const path = require('path')
const fs   = require('fs')

function normalizeDob(dob) {
  if (!dob) return ''
  dob = dob.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    var p = dob.split('-')
    return p[2] + '-' + p[1] + '-' + p[0]
  }
  return dob
}

exports.getAll = async (req, res) => {
  try {
    const tcs = await TC.find().sort({ createdAt: -1 })
    res.json({ success: true, data: tcs })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const tc = await TC.findById(req.params.id)
    if (!tc) return res.status(404).json({ success: false, message: 'TC not found' })
    res.json({ success: true, data: tc })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { admissionNo, dob, status } = req.body
    if (!admissionNo || !dob)
      return res.status(400).json({ success: false, message: 'Admission number and DOB are required' })
    if (!req.file)
      return res.status(400).json({ success: false, message: 'PDF file is required' })

    // ✅ Build public URL — served by Express static middleware (same as syllabus)
    var pdfUrl = process.env.BACKEND_URL + '/tc/' + req.file.filename

    const tc = await TC.create({
      admissionNo: admissionNo.trim().toUpperCase(),
      dob:         normalizeDob(dob),
      pdfUrl,
      status:      status || 'Draft',
    })
    res.status(201).json({ success: true, data: tc })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const updates = {
      admissionNo: req.body.admissionNo?.trim().toUpperCase(),
      dob:         normalizeDob(req.body.dob),
      status:      req.body.status,
    }

    if (req.file) {
      // Delete old PDF from disk
      const existing = await TC.findById(req.params.id)
      if (existing && existing.pdfUrl) {
        var oldFileName = existing.pdfUrl.split('/tc/')[1]
        if (oldFileName) {
          var oldPath = path.join(__dirname, '../public/tc', oldFileName)
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
        }
      }
      updates.pdfUrl = process.env.BACKEND_URL + '/tc/' + req.file.filename
    }

    const tc = await TC.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!tc) return res.status(404).json({ success: false, message: 'TC not found' })
    res.json({ success: true, data: tc })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    const tc = await TC.findById(req.params.id)
    // Delete PDF from disk
    if (tc && tc.pdfUrl) {
      var fileName = tc.pdfUrl.split('/tc/')[1]
      if (fileName) {
        var filePath = path.join(__dirname, '../public/tc', fileName)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
      }
    }
    await TC.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'TC deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.verify = async (req, res) => {
  try {
    const { admissionNo, dob } = req.body
    if (!admissionNo || !dob)
      return res.status(400).json({ success: false, message: 'Admission number and date of birth are required' })

    const admNo   = admissionNo.trim().toUpperCase()
    const dobNorm = normalizeDob(dob)
    const dobAlt  = dob.trim()

    const tc = await TC.findOne({
      admissionNo: admNo,
      status: 'Published',
      $or: [{ dob: dobNorm }, { dob: dobAlt }]
    })

    if (!tc)
      return res.status(404).json({
        success: false,
        message: 'No Transfer Certificate found. Please check your Admission Number and Date of Birth.'
      })

    res.json({ success: true, data: tc })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}