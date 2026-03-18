const Download = require('../models/Download')

const getAllDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({ createdAt: -1 })
    res.json({ success: true, data: downloads })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createDownload = async (req, res) => {
  try {
    const download = await Download.create({
      ...req.body,
      fileUrl: req.file ? req.file.path : req.body.fileUrl,
    })
    res.status(201).json({ success: true, data: download })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteDownload = async (req, res) => {
  try {
    await Download.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Download deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllDownloads, createDownload, deleteDownload }