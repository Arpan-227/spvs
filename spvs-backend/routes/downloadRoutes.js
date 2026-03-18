const express = require('express')
const router  = express.Router()
const { getAllDownloads, createDownload, deleteDownload } = require('../controllers/downloadController')
const { protect }     = require('../middleware/auth')
const { uploadImage } = require('../middleware/upload')

router.get('/',       getAllDownloads)
router.post('/',      protect, uploadImage.single('file'), createDownload)
router.delete('/:id', protect, deleteDownload)

module.exports = router