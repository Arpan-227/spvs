const mongoose = require('mongoose')

const jobApplicationSchema = new mongoose.Schema({
  jobId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  jobTitle:  { type: String },
  name:      { type: String, required: true },
  phone:     { type: String, required: true },
  email:     { type: String, required: true },
  qual:      { type: String },
  exp:       { type: String },
  message:   { type: String },
  resumeUrl: { type: String },
  status:    { type: String, enum: ['Pending', 'Shortlisted', 'Rejected', 'Hired'], default: 'Pending' },
}, { timestamps: true })

module.exports = mongoose.model('JobApplication', jobApplicationSchema)