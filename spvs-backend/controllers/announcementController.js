const Announcement = require('../models/Announcement')

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: announcements })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body)
    res.status(201).json({ success: true, data: announcement })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' })
    res.json({ success: true, data: announcement })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Announcement deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement }