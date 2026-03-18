// spvs-backend/routes/transportRoutes.js
const express    = require('express')
const router     = express.Router()
const { getAllTransport, createTransport, updateTransport, deleteTransport } = require('../controllers/transportController')
const { protect } = require('../middleware/auth')

router.get('/',       getAllTransport)
router.post('/',      protect, createTransport)
router.put('/:id',    protect, updateTransport)
router.delete('/:id', protect, deleteTransport)

module.exports = router