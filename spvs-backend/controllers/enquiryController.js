const Enquiry = require('../models/Enquiry')

const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body)
    res.status(201).json({ success: true, message: 'Enquiry submitted successfully', data: enquiry })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    res.json({ success: true, data: enquiries })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const markRead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    res.json({ success: true, data: enquiry })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Enquiry deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { createEnquiry, getAllEnquiries, markRead, deleteEnquiry }