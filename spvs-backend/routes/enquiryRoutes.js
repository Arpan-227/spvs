const express = require('express')
const router  = express.Router()
const { createEnquiry, getAllEnquiries, markRead, deleteEnquiry } = require('../controllers/enquiryController')
const { protect } = require('../middleware/auth')

router.post('/',          createEnquiry)
router.get('/',           protect, getAllEnquiries)
router.patch('/:id/read', protect, markRead)
router.delete('/:id',     protect, deleteEnquiry)

module.exports = router