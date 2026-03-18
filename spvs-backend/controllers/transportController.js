// spvs-backend/controllers/transportController.js
const Transport = require('../models/Transport')

const getAllTransport = async (req, res) => {
  try {
    const buses = await Transport.find().sort({ order: 1, createdAt: 1 })
    res.json({ success: true, data: buses })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createTransport = async (req, res) => {
  try {
    const bus = await Transport.create(req.body)
    res.status(201).json({ success: true, data: bus })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateTransport = async (req, res) => {
  try {
    const bus = await Transport.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' })
    res.json({ success: true, data: bus })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteTransport = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Bus route deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllTransport, createTransport, updateTransport, deleteTransport }