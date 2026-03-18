const mongoose = require('mongoose')
const dotenv   = require('dotenv')
const Admin    = require('../models/Admin')

dotenv.config()

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  await Admin.deleteMany()
  await Admin.create({ username: 'spvs_admin', password: 'SPVS@2026#Admin' })
  console.log('✅ Admin created: spvs_admin / SPVS@2026#Admin')
  process.exit()
}

seed()