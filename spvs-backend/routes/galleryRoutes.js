const express = require('express')
const router  = express.Router()
const { getAllGallery, createGallery, deleteGallery } = require('../controllers/galleryController')
const { protect }     = require('../middleware/auth')
const { uploadImage } = require('../middleware/upload')

router.get('/',       getAllGallery)
router.post('/',      protect, uploadImage.single('image'), createGallery)
router.delete('/:id', protect, deleteGallery)

module.exports = router