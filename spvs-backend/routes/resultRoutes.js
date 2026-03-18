const express  = require('express')
const router   = express.Router()
const {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
  verifyResult,
} = require('../controllers/resultController')
const { protect } = require('../middleware/auth')

// Public
router.post('/verify', verifyResult)

// Admin protected
router.get('/',          protect, getAllResults)
router.get('/:id',       protect, getResultById)
router.post('/',         protect, createResult)
router.put('/:id',       protect, updateResult)
router.delete('/:id',    protect, deleteResult)

module.exports = router 