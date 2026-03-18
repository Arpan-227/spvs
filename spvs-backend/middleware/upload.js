const multer = require('multer')
const { storage, resumeStorage, syllabusStorage, pdfStorage } = require('../config/cloudinary')

// ── Image upload ──────────────────────────────────────────────────────────────
const uploadImage = multer({ storage })

// ── Resume upload ─────────────────────────────────────────────────────────────
const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function(req, file, cb) {
    var allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and Word documents allowed'))
    }
  },
})

// ── Syllabus PDF upload ───────────────────────────────────────────────────────
const uploadSyllabus = multer({
  storage: syllabusStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files allowed'))
    }
  },
})

// ── General PDF upload ────────────────────────────────────────────────────────
const uploadPDF = multer({
  storage: pdfStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files allowed'))
    }
  },
})

module.exports = { uploadImage, uploadResume, uploadSyllabus, uploadPDF }