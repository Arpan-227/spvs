const mongoose = require('mongoose')

const MandatoryDisclosureSchema = new mongoose.Schema({
  schoolInfo: [
    {
      key:   { type: String, required: true },
      value: { type: String, default: '' },
    }
  ],
  infrastructure: [
    {
      key:   { type: String, required: true },
      value: { type: String, default: '' },
    }
  ],
  academic: [
    {
      key:   { type: String, required: true },
      value: { type: String, default: '' },
    }
  ],
  staff: [
    {
      key:   { type: String, required: true },
      value: { type: String, default: '' },
    }
  ],
  transport: [
    {
      key:   { type: String, required: true },
      value: { type: String, default: '' },
    }
  ],
}, { timestamps: true })

module.exports = mongoose.model('MandatoryDisclosure', MandatoryDisclosureSchema)