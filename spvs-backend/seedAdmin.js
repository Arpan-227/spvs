// Run this ONCE to create admin account
// Command: node seedAdmin.js

require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

mongoose.connect(process.env.MONGO_URI)
  .then(async function() {
    console.log('MongoDB Connected')

    // Import Admin model
    const Admin = require('./models/Admin')

    // Check if admin already exists
    const existing = await Admin.findOne({ username: 'spvs_admin' })
    if (existing) {
      console.log('Admin already exists! Updating password...')
      existing.password = 'Admin@1234'
      await existing.save()
      console.log('✅ Password updated to: Admin@1234')
    } else {
      await Admin.create({ username: 'spvs_admin', password: 'Admin@1234' })
      console.log('✅ Admin created!')
      console.log('Username: spvs_admin')
      console.log('Password: Admin@1234')
    }

    mongoose.disconnect()
  })
  .catch(function(err) {
    console.error('Error:', err.message)
    process.exit(1)
  })