const express  = require('express')
const router   = express.Router()
const multer   = require('multer')
const path     = require('path')
const fs       = require('fs')
const {
  getAcademics,
  updateAcademics,
  uploadSyllabus,
  deleteSyllabus,
} = require('../controllers/academicsController')
const { protect } = require('../middleware/auth')

// ✅ Local disk storage for syllabuses
var syllabusDir = path.join(__dirname, '../public/syllabuses')
if (!fs.existsSync(syllabusDir)) fs.mkdirSync(syllabusDir, { recursive: true })

var syllabusStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, syllabusDir)
  },
  filename: function(req, file, cb) {
    var levelName = (req.body.level || 'syllabus').replace(/[^a-zA-Z0-9]/g, '_')
    cb(null, levelName + '_' + Date.now() + '.pdf')
  }
})

var uploadSyllabusMW = multer({
  storage: syllabusStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files allowed'))
    }
  }
})

router.get('/',                             getAcademics)
router.put('/',            protect,         updateAcademics)
router.post('/upload-syllabus', protect,    uploadSyllabusMW.single('pdf'), uploadSyllabus)
router.delete('/syllabus/:level', protect,  deleteSyllabus)

module.exports = router