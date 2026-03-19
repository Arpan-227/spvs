const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Image storage (photos, gallery, faculty, alumni, blog) ──────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          'spvs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation:  [{ width: 800, quality: 'auto' }],
  },
})

// ── Resume / Document storage (job applications) ─────────────────────────────
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async function(req, file) {
    return {
      folder:        'spvs/resumes',
      resource_type: 'raw',
      public_id:     file.originalname.replace(/\.[^/.]+$/, '') + '_' + Date.now(),
      format:        'pdf',
    }
  },
})

// ── Syllabus PDF storage ──────────────────────────────────────────────────────
const syllabusStorage = new CloudinaryStorage({
  cloudinary,
  params: async function(req, file) {
    var levelName = (req.body.level || 'syllabus').replace(/[^a-zA-Z0-9]/g, '_')
    return {
      folder:        'spvs/syllabuses',
      resource_type: 'auto',          // ✅ Changed from 'raw' to 'auto'
      public_id:     levelName + '_' + Date.now(),
      format:        'pdf',
    }
  },
})

// ── General PDF storage (downloads, certificates, mandatory disclosure) ──────
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: async function(req, file) {
    var fileName = (req.body.name || file.originalname || 'document').replace(/[^a-zA-Z0-9]/g, '_')
    return {
      folder:        'spvs/pdfs',
      resource_type: 'auto',   // ✅ Changed from 'raw' to 'auto' — fixes browser open
      public_id:     fileName + '_' + Date.now(),
      format:        'pdf',
    }
  },
})

module.exports = { cloudinary, storage, resumeStorage, syllabusStorage, pdfStorage }