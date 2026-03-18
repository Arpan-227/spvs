const CertificateRequest = require('../models/CertificateRequest')

const submitRequest = async (req, res) => {
  try {
    const request = await CertificateRequest.create(req.body)
    res.status(201).json({ success: true, message: 'Request submitted successfully', data: request })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const getAllRequests = async (req, res) => {
  try {
    const requests = await CertificateRequest.find().sort({ createdAt: -1 })
    res.json({ success: true, data: requests })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateRequestStatus = async (req, res) => {
  try {
    const request = await CertificateRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, note: req.body.note },
      { new: true }
    )
    res.json({ success: true, data: request })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { submitRequest, getAllRequests, updateRequestStatus }