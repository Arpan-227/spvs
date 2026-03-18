const express  = require('express')
const router   = express.Router()
const { getDisclosure, updateDisclosure } = require('../controllers/mandatoryDisclosureController')
const { protect } = require('../middleware/auth')

router.get('/', getDisclosure)
router.put('/', protect, updateDisclosure)

module.exports = router