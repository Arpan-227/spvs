const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  dept:   { type: String },
  type:   { type: String, default: 'Full Time' },
  qual:   { type: String },
  exp:    { type: String },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)