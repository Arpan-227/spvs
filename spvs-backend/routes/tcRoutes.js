const express  = require('express')
const router   = express.Router()
const multer   = require('multer')
const path     = require('path')
const fs       = require('fs')
const ctrl     = require('../controllers/tcController')
const { protect } = require('../middleware/auth')

// ── Local disk storage for TC PDFs (same as syllabus approach) ──────────────
var tcDir = path.join(__dirname, '../public/tc')
if (!fs.existsSync(tcDir)) fs.mkdirSync(tcDir, { recursive: true })

var tcStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tcDir)
  },
  filename: function(req, file, cb) {
    var admNo = (req.body.admissionNo || 'tc').replace(/[^a-zA-Z0-9]/g, '_')
    cb(null, 'TC_' + admNo + '.pdf')
  }
})

var uploadTC = multer({
  storage: tcStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files allowed'))
  }
})

// PUBLIC
router.post('/verify', ctrl.verify)

// ADMIN PROTECTED
router.get('/',       protect, ctrl.getAll)
router.get('/:id',    protect, ctrl.getById)
router.post('/',      protect, uploadTC.single('pdf'), ctrl.create)
router.put('/:id',    protect, uploadTC.single('pdf'), ctrl.update)
router.delete('/:id', protect, ctrl.delete)

module.exports = router