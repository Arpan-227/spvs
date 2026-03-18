const express = require('express')
const router  = express.Router()
const { submitRequest, getAllRequests, updateRequestStatus } = require('../controllers/certificateController')
const { protect } = require('../middleware/auth')

router.post('/',       submitRequest)
router.get('/',        protect, getAllRequests)
router.patch('/:id',   protect, updateRequestStatus)

module.exports = router