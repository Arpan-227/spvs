const express    = require('express')
const router     = express.Router()
const { getAllSettings, getSetting, upsertSetting, bulkUpsert } = require('../controllers/settingsController')
const { protect } = require('../middleware/auth')

router.get('/',     getAllSettings)          // PUBLIC  — frontend loads admission data
router.get('/:key', getSetting)             // PUBLIC  — fetch single key
router.put('/',     protect, bulkUpsert)    // ADMIN   — save admission settings
router.put('/:key', protect, upsertSetting) // ADMIN   — save single key

module.exports = router