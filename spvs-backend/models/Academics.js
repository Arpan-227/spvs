const mongoose = require('mongoose')

const AcademicsSchema = new mongoose.Schema({
  streams: [
    {
      name:        { type: String, required: true },
      icon:        { type: String, default: '📚' },
      clr:         { type: String, default: '#E8761A' },
      description: { type: String, default: '' },
      eligibility: { type: String, default: '' },
      subjects:    [{ type: String }],
    }
  ],
  classes: [
    {
      name:     { type: String, required: true },
      age:      { type: String, default: '' },
      students: { type: String, default: '0' },
      sections: { type: String, default: '1' },
    }
  ],
  fees: [
    {
      category:  { type: String, required: true },
      tuition:   { type: String, default: '0' },
      annual:    { type: String, default: '0' },
      admission: { type: String, default: '0' },
      transport: { type: String, default: '0' },
    }
  ],
  curriculum: {
    cbseNote:     { type: String, default: '' },
    examPattern:  { type: String, default: '' },
    activities:   [{ type: String }],
    achievements: [{ type: String }],
  },
  // ✅ NEW
  syllabuses: [
    {
      level:   { type: String, required: true },
      fileUrl: { type: String, default: '' },
      year:    { type: String, default: '2026-27' },
    }
  ],
}, { timestamps: true })

module.exports = mongoose.model('Academics', AcademicsSchema)