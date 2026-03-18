const mongoose = require('mongoose')

const SiteStatusSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  path:   { type: String, required: true, unique: true },
  status: { type: String, default: 'live', enum: ['live','maintenance','coming_soon','offline'] },
}, { timestamps: true })

module.exports = mongoose.model('SiteStatus', SiteStatusSchema)