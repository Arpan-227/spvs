const Faculty = require('../models/Faculty')

const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: faculty })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create({
      ...req.body,
      image: req.file ? req.file.path : req.body.image,
    })
    res.status(201).json({ success: true, data: faculty })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateFaculty = async (req, res) => {
  try {
    const update = { ...req.body }
    if (req.file) update.image = req.file.path
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' })
    res.json({ success: true, data: faculty })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id)
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' })
    res.json({ success: true, message: 'Faculty deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllFaculty, createFaculty, updateFaculty, deleteFaculty }