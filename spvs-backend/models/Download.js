const mongoose = require('mongoose')

const downloadSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  fileUrl:  { type: String, required: true },
  category: { type: String, default: 'General' },
  fileType: { type: String, default: 'pdf' },
}, { timestamps: true })

module.exports = mongoose.model('Download', downloadSchema)