const Settings = require('../models/Settings')

// Default admission data — seeds DB on first load
var DEFAULT_ADMISSION = {
  open:        true,
  session:     '2026-27',
  classesFrom: 'Nursery',
  classesTo:   'Class XII',
  lastDate:    '30 Apr 2026',
  fee:         '500',
  notice:      'Admissions are open for the academic session 2026-27. Limited seats available.',
  showBanner:  true,
}

// ── GET /api/settings  (PUBLIC) ───────────────────────────────────────────────
// Returns { data: { admission: {...} } }
// Frontend: settingsAPI.getAll() → res.data.admission
const getAllSettings = async (req, res) => {
  try {
    let admissionDoc = await Settings.findOne({ key: 'admission' })

    // First time — seed default admission data
    if (!admissionDoc) {
      admissionDoc = await Settings.create({
        key:   'admission',
        value: DEFAULT_ADMISSION,
      })
    }

    res.json({
      success: true,
      data: {
        admission: admissionDoc.value,
      }
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/settings/:key  (PUBLIC) ─────────────────────────────────────────
// Returns single setting value by key
// e.g. GET /api/settings/admission
const getSetting = async (req, res) => {
  try {
    const doc = await Settings.findOne({ key: req.params.key })
    if (!doc) return res.status(404).json({ success: false, message: 'Setting not found' })
    res.json({ success: true, data: doc.value })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PUT /api/settings  (ADMIN PROTECTED) ─────────────────────────────────────
// Frontend sends: { admission: {...} }
// Saves each section as a separate DB key
const bulkUpsert = async (req, res) => {
  try {
    const { admission } = req.body

    var ops = []

    if (admission) {
      ops.push({
        updateOne: {
          filter: { key: 'admission' },
          update: { $set: { key: 'admission', value: admission } },
          upsert: true,
        }
      })
    }

    if (ops.length > 0) {
      await Settings.bulkWrite(ops)
    }

    res.json({ success: true, message: 'Settings saved successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PUT /api/settings/:key  (ADMIN PROTECTED) ────────────────────────────────
// Upsert a single setting by key
const upsertSetting = async (req, res) => {
  try {
    const doc = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value },
      { new: true, upsert: true, returnDocument: 'after' }
    )
    res.json({ success: true, data: doc.value })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllSettings, getSetting, upsertSetting, bulkUpsert }