const SiteStatus = require('../models/SiteStatus')

const DEFAULT_PAGES = [
  { name:'Home',            path:'/'                     },
  { name:'About Us',        path:'/about'                },
  { name:'Academics',       path:'/academics'            },
  { name:'Facilities',      path:'/facilities'           },
  { name:'Contact',         path:'/contact'              },
  { name:'Campus Life',     path:'/campus-life'          },
  { name:'Why Choose Us',   path:'/why-choose-us'        },
  { name:'Alumni',          path:'/alumni'               },
  { name:'Blog',            path:'/blog'                 },
  { name:'Gallery',         path:'/gallery'              },
  { name:'Downloads',       path:'/downloads'            },
  { name:'Mandatory Disc.', path:'/mandatory-disclosure' },
  { name:'Admissions',      path:'/admissions',  status:'coming_soon' },
  { name:'Results',         path:'/results',     status:'coming_soon' },
]

// ── GET /api/site-status  (PUBLIC) ────────────────────────────────────────────
exports.getSiteStatus = async (req, res) => {
  try {
    let pages = await SiteStatus.find()

    // First time — seed default pages
    if (!pages || pages.length === 0) {
      pages = await SiteStatus.insertMany(
        DEFAULT_PAGES.map(function(p) {
          return { name: p.name, path: p.path, status: p.status || 'live' }
        })
      )
    }

    res.json({ success: true, data: pages })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PATCH /api/site-status/:id  (ADMIN) ──────────────────────────────────────
exports.updatePageStatus = async (req, res) => {
  try {
    const { status } = req.body
    const page = await SiteStatus.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' })
    res.json({ success: true, data: page })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PATCH /api/site-status  (ADMIN) — update all pages at once ───────────────
exports.updateAllStatus = async (req, res) => {
  try {
    const { pages } = req.body
    const ops = pages.map(function(p) {
      return {
        updateOne: {
          filter: { _id: p._id },
          update: { $set: { status: p.status } },
        }
      }
    })
    await SiteStatus.bulkWrite(ops)
    res.json({ success: true, message: 'All page statuses updated' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}