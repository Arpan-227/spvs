const express = require('express')
const router  = express.Router()
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController')
const { protect }     = require('../middleware/auth')
const { uploadImage } = require('../middleware/upload')

router.get('/',     getAllBlogs)
router.get('/:id',  getBlogById)
router.post('/',    protect, uploadImage.single('image'), createBlog)
router.put('/:id',  protect, uploadImage.single('image'), updateBlog)
router.delete('/:id', protect, deleteBlog)

module.exports = router