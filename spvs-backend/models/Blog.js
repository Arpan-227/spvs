const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  excerpt:   { type: String },
  image:     { type: String },
  category:  { type: String, default: 'General' },
  author:    { type: String, default: 'SPVS Admin' },
  featured:  { type: Boolean, default: false },
  published: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)