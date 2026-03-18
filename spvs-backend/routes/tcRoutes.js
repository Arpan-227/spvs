// routes/tcRoutes.js
const express = require('express')
const router  = express.Router()
const ctrl    = require('../controllers/tcController')
const { protect } = require('../middleware/auth')

// ── PUBLIC ──
router.post('/verify', ctrl.verify)

// ── ADMIN PROTECTED ──
router.get('/',       protect, ctrl.getAll)
router.get('/:id',    protect, ctrl.getById)
router.post('/',      protect, ctrl.create)
router.put('/:id',    protect, ctrl.update)
router.delete('/:id', protect, ctrl.delete)

module.exports = router