const Gallery = require('../models/Gallery')

const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 })
    res.json({ success: true, data: gallery })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create({
      ...req.body,
      image: req.file ? req.file.path : req.body.image,
    })
    res.status(201).json({ success: true, data: gallery })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id)
    if (!gallery) return res.status(404).json({ success: false, message: 'Image not found' })
    res.json({ success: true, message: 'Image deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllGallery, createGallery, deleteGallery }