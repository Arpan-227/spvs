const express = require('express')
const router  = express.Router()
const { getAllJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController')
const { protect } = require('../middleware/auth')

router.get('/',       getAllJobs)
router.post('/',      protect, createJob)
router.put('/:id',    protect, updateJob)
router.delete('/:id', protect, deleteJob)

module.exports = router