const Testimonial = require('../models/Testimonial')

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: testimonials })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body)
    res.status(201).json({ success: true, data: testimonial })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: testimonial })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Testimonial deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial }