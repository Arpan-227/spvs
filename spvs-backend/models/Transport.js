// spvs-backend/models/Transport.js
const mongoose = require('mongoose')

const transportSchema = new mongoose.Schema({
  busNo:       { type: String, required: true },
  route:       { type: String, required: true },
  area:        { type: String },
  driver:      { type: String },
  driverPhone: { type: String },
  conductor:   { type: String },
  capacity:    { type: Number, default: 42 },
  students:    { type: Number, default: 0 },
  stops:       { type: String },      // comma-separated string
  departs:     { type: String },
  returns:     { type: String },
  status:      { type: String, enum: ['Active','Inactive','Under Repair'], default: 'Active' },
  order:       { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Transport', transportSchema)