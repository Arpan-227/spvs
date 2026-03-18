// models/tcModel.js
const mongoose = require('mongoose')

const tcSchema = new mongoose.Schema({
  // Basic identifiers
  admissionNo:        { type: String, required: true, trim: true },
  penNo:              { type: String, trim: true, default: '' },

  // Student details
  studentName:        { type: String, required: true, trim: true },
  motherName:         { type: String, trim: true, default: '' },
  fatherName:         { type: String, trim: true, default: '' },
  nationality:        { type: String, trim: true, default: 'INDIAN' },
  category:           { type: String, trim: true, default: 'N/A' },  // SC/ST/OBC

  // Dates & admission
  dob:                { type: String, default: '' },   // DD-MM-YYYY
  dobInWords:         { type: String, default: '' },   // e.g. TENTH SEPTEMBER TWO THOUSAND EIGHT
  dateOfFirstAdmission: { type: String, default: '' }, // DD-MM-YYYY
  admissionClass:     { type: String, default: '' },   // class at first admission e.g. VII

  // Academic
  lastStudiedClass:   { type: String, default: '' },   // e.g. VIII
  examResult:         { type: String, default: '' },   // e.g. PASS/CBSE (2024-25)
  subjectsOffered:    { type: String, default: '' },   // comma or space separated
  qualifiedForPromotion: { type: String, default: '' },// e.g. YES (IX)

  // Dues & dates
  duesPaid:           { type: String, default: 'YES' },
  dateOfRemoval:      { type: String, default: '' },   // DD-MM-YYYY
  dateOfApplication:  { type: String, default: '' },   // DD-MM-YYYY
  dateOfIssue:        { type: String, default: '' },   // DD-MM-YYYY

  // Reason & conduct
  reasonForLeaving:   { type: String, default: '' },
  generalConduct:     { type: String, default: 'GOOD' },
  remarks:            { type: String, default: 'N/A' },

  // Admin control
  status:             { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
}, { timestamps: true })

module.exports = mongoose.model('TC', tcSchema)