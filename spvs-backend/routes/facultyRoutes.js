const express = require('express')
const router  = express.Router()
const { getAllFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController')
const { protect }     = require('../middleware/auth')
const { uploadImage } = require('../middleware/upload')

router.get('/',       getAllFaculty)
router.post('/',      protect, uploadImage.single('image'), createFaculty)
router.put('/:id',    protect, uploadImage.single('image'), updateFaculty)
router.delete('/:id', protect, deleteFaculty)

module.exports = router