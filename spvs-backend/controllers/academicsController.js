const Academics = require('../models/Academics')
const path      = require('path')
const fs        = require('fs')

const DEFAULT_DATA = {
  streams: [
    { name:'Science',    icon:'🔬', clr:'#22a35a', description:'For students aiming at engineering, medicine, and research careers.', eligibility:'Min. 60% in Class X Science & Maths', subjects:['Physics','Chemistry','Biology','Mathematics','Computer Science','English Core','Physical Education'] },
    { name:'Commerce',   icon:'📈', clr:'#E8761A', description:'For students aiming at CA, MBA, banking, and business careers.',      eligibility:'Min. 55% in Class X',               subjects:['Accountancy','Business Studies','Economics','Mathematics','English Core','Information Practices'] },
    { name:'Humanities', icon:'🎭', clr:'#6C3FC5', description:'For students aiming at UPSC, law, journalism, and social sciences.',  eligibility:'Open to all Class X pass students', subjects:['History','Political Science','Geography','Economics','English Core','Hindi Core','Sociology'] },
  ],
  classes: [
    { name:'Play Group', age:'3–4 yrs',   students:'45', sections:'2' },
    { name:'Nursery',    age:'4–5 yrs',   students:'60', sections:'2' },
    { name:'KG',         age:'5–6 yrs',   students:'65', sections:'2' },
    { name:'Class I',    age:'6–7 yrs',   students:'75', sections:'3' },
    { name:'Class II',   age:'7–8 yrs',   students:'70', sections:'3' },
    { name:'Class III',  age:'8–9 yrs',   students:'72', sections:'3' },
    { name:'Class IV',   age:'9–10 yrs',  students:'68', sections:'3' },
    { name:'Class V',    age:'10–11 yrs', students:'74', sections:'3' },
    { name:'Class VI',   age:'11–12 yrs', students:'80', sections:'3' },
    { name:'Class VII',  age:'12–13 yrs', students:'78', sections:'3' },
    { name:'Class VIII', age:'13–14 yrs', students:'76', sections:'3' },
    { name:'Class IX',   age:'14–15 yrs', students:'82', sections:'3' },
    { name:'Class X',    age:'15–16 yrs', students:'85', sections:'3' },
    { name:'Class XI',   age:'16–17 yrs', students:'90', sections:'3' },
    { name:'Class XII',  age:'17–18 yrs', students:'88', sections:'3' },
  ],
  fees: [
    { category:'Play Group – KG',          tuition:'800',  annual:'2500', admission:'3000', transport:'1200' },
    { category:'Class I – V',              tuition:'1000', annual:'3000', admission:'4000', transport:'1200' },
    { category:'Class VI – VIII',          tuition:'1200', annual:'3500', admission:'5000', transport:'1200' },
    { category:'Class IX – X',             tuition:'1400', annual:'4000', admission:'6000', transport:'1200' },
    { category:'Class XI – XII (Science)', tuition:'1600', annual:'5000', admission:'7000', transport:'1200' },
    { category:'Class XI – XII (Com/Hum)', tuition:'1500', annual:'4500', admission:'7000', transport:'1200' },
  ],
  curriculum: {
    cbseNote:    'Sant Pathik Vidyalaya follows the CBSE curriculum from Play Group to Class XII.',
    examPattern: 'Classes I–VIII: CCE. Classes IX–XII: As per CBSE Board examination pattern.',
    activities:  ['Morning Assembly','Sports Period (Daily)','Library Period','Art & Craft','Music & Dance','Computer Lab','Science Experiments','Debate & Elocution','NCC/Scout'],
    achievements:['100% Board Results (2024-25)','12 District Level Sports Medals','State Level Science Olympiad Winners','Best School Award — Bahraich 2023'],
  },
  syllabuses: [],
}

// ── GET /api/academics  (PUBLIC) ─────────────────────────────────────────────
exports.getAcademics = async (req, res) => {
  try {
    let doc = await Academics.findOne()
    if (!doc) doc = await Academics.create(DEFAULT_DATA)
    res.json({ success: true, data: doc })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PUT /api/academics  (ADMIN) ───────────────────────────────────────────────
exports.updateAcademics = async (req, res) => {
  try {
    const { streams, classes, fees, curriculum } = req.body
    let doc = await Academics.findOne()
    if (!doc) {
      doc = await Academics.create({ streams, classes, fees, curriculum })
    } else {
      if (streams)    doc.streams    = streams
      if (classes)    doc.classes    = classes
      if (fees)       doc.fees       = fees
      if (curriculum) doc.curriculum = curriculum
      await doc.save()
    }
    res.json({ success: true, message: 'Updated successfully', data: doc })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── POST /api/academics/upload-syllabus  (ADMIN) ─────────────────────────────
// Uses local disk storage — file saved to /public/syllabuses/
exports.uploadSyllabus = async (req, res) => {
  try {
    const { level, year } = req.body

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }
    if (!level) {
      return res.status(400).json({ success: false, message: 'Level is required' })
    }

    // ✅ Build public URL — served directly by Express static middleware
    var fileName = req.file.filename
    var fileUrl  = process.env.BACKEND_URL + '/syllabuses/' + fileName

    let doc = await Academics.findOne()
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Academics not found. Open academics page first.' })
    }

    const idx = doc.syllabuses.findIndex(function(s) { return s.level === level })
    if (idx !== -1) {
      // Delete old file from disk
      var oldFile = doc.syllabuses[idx].fileUrl
      if (oldFile) {
        var oldFileName = oldFile.split('/syllabuses/')[1]
        var oldPath = path.join(__dirname, '../public/syllabuses', oldFileName)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      doc.syllabuses[idx].fileUrl = fileUrl
      doc.syllabuses[idx].year   = year || '2026-27'
    } else {
      doc.syllabuses.push({ level: level, fileUrl: fileUrl, year: year || '2026-27' })
    }

    await doc.save()
    res.json({ success: true, fileUrl: fileUrl, message: 'Syllabus uploaded successfully' })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── DELETE /api/academics/syllabus/:level  (ADMIN) ───────────────────────────
exports.deleteSyllabus = async (req, res) => {
  try {
    const level = decodeURIComponent(req.params.level)
    let doc = await Academics.findOne()
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' })

    // Delete file from disk
    var entry = doc.syllabuses.find(function(s) { return s.level === level })
    if (entry && entry.fileUrl) {
      var fileName = entry.fileUrl.split('/syllabuses/')[1]
      var filePath = path.join(__dirname, '../public/syllabuses', fileName)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    doc.syllabuses = doc.syllabuses.filter(function(s) { return s.level !== level })
    await doc.save()
    res.json({ success: true, message: 'Syllabus deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}