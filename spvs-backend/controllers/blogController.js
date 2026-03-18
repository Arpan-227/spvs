const Blog = require('../models/Blog')

// @GET /api/blogs - Public
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: blogs })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @GET /api/blogs/:id - Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    res.json({ success: true, data: blog })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @POST /api/blogs - Protected
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      image: req.file ? req.file.path : req.body.image,
    })
    res.status(201).json({ success: true, data: blog })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @PUT /api/blogs/:id - Protected
const updateBlog = async (req, res) => {
  try {
    const update = { ...req.body }
    if (req.file) update.image = req.file.path
    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    res.json({ success: true, data: blog })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @DELETE /api/blogs/:id - Protected
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    res.json({ success: true, message: 'Blog deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog }