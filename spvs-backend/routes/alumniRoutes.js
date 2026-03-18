const express = require('express')
const router  = express.Router()
const { getAllAlumni, createAlumni, updateAlumni, deleteAlumni, toggleFeatured } = require('../controllers/alumniController')
const { protect }     = require('../middleware/auth')
const { uploadImage } = require('../middleware/upload')

router.get('/',              getAllAlumni)
router.post('/',             protect, uploadImage.single('image'), createAlumni)
router.put('/:id',           protect, uploadImage.single('image'), updateAlumni)
router.delete('/:id',        protect, deleteAlumni)
router.patch('/:id/feature', protect, toggleFeatured)

module.exports = router