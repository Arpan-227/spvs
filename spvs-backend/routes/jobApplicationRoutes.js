const express = require('express')
const router  = express.Router()
const { applyForJob, getAllApplications, updateApplicationStatus } = require('../controllers/jobApplicationController')
const { protect }      = require('../middleware/auth')
const { uploadResume } = require('../middleware/upload')

router.post('/',          uploadResume.single('resume'), applyForJob)
router.get('/',           protect, getAllApplications)
router.patch('/:id',      protect, updateApplicationStatus)

module.exports = router