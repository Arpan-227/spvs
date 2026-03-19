const mongoose = require('mongoose')

const tcSchema = new mongoose.Schema({
  admissionNo: { type: String, required: true, trim: true },
  dob:         { type: String, required: true },  // DD-MM-YYYY
  pdfUrl:      { type: String, required: true },  // Cloudinary URL
  status:      { type: String, enum: ['Draft','Published'], default: 'Draft' },
}, { timestamps: true })

module.exports = mongoose.model('TC', tcSchema)