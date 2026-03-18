const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
  name:   { type: String, required: true },
  role:   { type: String, required: true },
  dept:   { type: String, required: true },
  qual:   { type: String },
  exp:    { type: String },
  phone:  { type: String },
  email:  { type: String },
  image:  { type: String },
  status: { type: String, enum: ['Active', 'On Leave'], default: 'Active' },
  order:  { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Faculty', facultySchema)