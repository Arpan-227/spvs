const JobApplication = require('../models/JobApplication')

// @POST /api/applications — public
const applyForJob = async (req, res) => {
  try {
    // resumeStorage uploads directly to Cloudinary → req.file.path = secure_url
    const resumeUrl = req.file ? req.file.path : ''

    const application = await JobApplication.create({
      ...req.body,
      resumeUrl,
    })
    res.status(201).json({ success: true, message: 'Application submitted', data: application })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @GET /api/applications — protected
const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 })
    res.json({ success: true, data: applications })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @PATCH /api/applications/:id — protected
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    res.json({ success: true, data: application })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { applyForJob, getAllApplications, updateApplicationStatus }