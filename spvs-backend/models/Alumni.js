const mongoose = require('mongoose')

const alumniSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  batch:    { type: String, required: true },
  field:    { type: String },
  role:     { type: String },
  image:    { type: String },
  icon:     { type: String, default: '🎓' },
  featured: { type: Boolean, default: false },
  phone:    { type: String },
  email:    { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Alumni', alumniSchema)