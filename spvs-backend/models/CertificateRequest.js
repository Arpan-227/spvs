const mongoose = require('mongoose')

const certificateRequestSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  regNo:    { type: String, required: true },
  dob:      { type: String },
  phone:    { type: String },
  email:    { type: String },
  certType: { type: String, required: true },
  status:   { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  note:     { type: String },
}, { timestamps: true })

module.exports = mongoose.model('CertificateRequest', certificateRequestSchema)