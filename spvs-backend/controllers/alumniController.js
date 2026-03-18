const Alumni = require('../models/Alumni')

const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 })
    res.json({ success: true, data: alumni })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.create({
      ...req.body,
      image: req.file ? req.file.path : req.body.image,
    })
    res.status(201).json({ success: true, data: alumni })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateAlumni = async (req, res) => {
  try {
    const update = { ...req.body }
    if (req.file) update.image = req.file.path
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!alumni) return res.status(404).json({ success: false, message: 'Alumni not found' })
    res.json({ success: true, data: alumni })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id)
    if (!alumni) return res.status(404).json({ success: false, message: 'Alumni not found' })
    res.json({ success: true, message: 'Alumni deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const toggleFeatured = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id)
    if (!alumni) return res.status(404).json({ success: false, message: 'Alumni not found' })
    alumni.featured = !alumni.featured
    await alumni.save()
    res.json({ success: true, data: alumni })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllAlumni, createAlumni, updateAlumni, deleteAlumni, toggleFeatured }