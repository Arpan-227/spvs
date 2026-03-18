const express = require('express')
const router  = express.Router()
const { getSiteStatus, updatePageStatus, updateAllStatus } = require('../controllers/siteStatusController')
const { protect } = require('../middleware/auth')

router.get('/',        getSiteStatus)
router.patch('/:id',   protect, updatePageStatus)
router.patch('/',      protect, updateAllStatus)

module.exports = router