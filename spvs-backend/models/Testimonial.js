const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  role:     { type: String },
  message:  { type: String, required: true },
  rating:   { type: Number, default: 5 },
  approved: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Testimonial', testimonialSchema)