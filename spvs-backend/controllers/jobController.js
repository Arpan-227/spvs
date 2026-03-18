const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json({ success: true, data: jobs })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body)
    res.status(201).json({ success: true, data: job })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' })
    res.json({ success: true, data: job })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Job deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllJobs, createJob, updateJob, deleteJob }