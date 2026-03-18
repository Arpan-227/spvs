const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
  name:              { type: String, required: true },
  t1BestPT:          { type: Number, default: 0 },
  t1NoteBook:        { type: Number, default: 0 },
  t1SubjectEnrich:   { type: Number, default: 0 },
  t1HalfYearly:      { type: Number, default: 0 },
  t2BestPT:          { type: Number, default: 0 },
  t2NoteBook:        { type: Number, default: 0 },
  t2SubjectEnrich:   { type: Number, default: 0 },
  t2Annual:          { type: Number, default: 0 },
  maxMarks:          { type: Number, default: 100 },
  marksObtained:     { type: Number, default: 0 },
  grade:             { type: String, default: '' },
})

const ResultSchema = new mongoose.Schema({
  admissionNo:    { type: String, required: true },
  rollNo:         { type: String, default: '' },
  studentName:    { type: String, required: true },
  motherName:     { type: String, default: '' },
  fatherName:     { type: String, default: '' },
  dob:            { type: String, required: true },
  class:          { type: String, required: true },
  section:        { type: String, default: 'A' },
  session:        { type: String, required: true },
  subjects:       [SubjectSchema],
  coScholastic: [
    {
      activity: { type: String },
      grade:    { type: String, default: 'A' },
    }
  ],
  characterValues: [
    {
      activity: { type: String },
      grade:    { type: String, default: 'A' },
    }
  ],
  totalMaxMarks:   { type: Number, default: 0 },
  totalMarks:      { type: Number, default: 0 },
  percentage:      { type: String, default: '' },
  rank:            { type: String, default: '' },
  result:          { type: String, default: 'Pass' },
  teacherRemarks:  { type: String, default: '' },
  date:            { type: String, default: '' },
  status:          { type: String, enum: ['Published','Draft'], default: 'Draft' },
}, { timestamps: true })

module.exports = mongoose.model('Result', ResultSchema)