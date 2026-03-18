// spvs-backend/utils/seedTransport.js
// Run: node utils/seedTransport.js
require('dotenv').config()
const mongoose  = require('mongoose')
const Transport = require('../models/Transport')

const BUSES = [
  { busNo:'UP 41 T 1001', route:'Route A — City Centre',        area:'Bahraich City', driver:'Ram Prasad',    driverPhone:'9876501001', conductor:'Shyam Lal',   capacity:42, students:38, stops:'Civil Lines, Kotwali, Tehsil Chowk, Collector Office, Gandhi Chowk',    departs:'7:00 AM', returns:'2:30 PM', status:'Active',       order:1 },
  { busNo:'UP 41 T 1002', route:'Route B — Nanpara Road',       area:'Nanpara',       driver:'Mohan Singh',   driverPhone:'9876501002', conductor:'Raju Kumar',  capacity:42, students:35, stops:'Nanpara Bus Stand, Fatehpur, Jarwal Road, Tulsipurwa, SPVS Gate',        departs:'6:45 AM', returns:'2:45 PM', status:'Active',       order:2 },
  { busNo:'UP 41 T 1003', route:'Route C — Kaiserganj',         area:'Kaiserganj',    driver:'Suresh Yadav',  driverPhone:'9876501003', conductor:'Anil Kumar',  capacity:36, students:30, stops:'Kaiserganj Chowk, Bhupati Nagar, Tarabganj, Highway Cross, SPVS Gate',  departs:'6:30 AM', returns:'3:00 PM', status:'Active',       order:3 },
  { busNo:'UP 41 T 1004', route:'Route D — Mihinpurwa',         area:'Mihinpurwa',    driver:'Rajesh Pandey', driverPhone:'9876501004', conductor:'Dinesh Lal',  capacity:42, students:28, stops:'Mihinpurwa Market, Huzurpur, Payagpur Cross, Kichha Road, SPVS Gate',   departs:'6:20 AM', returns:'3:10 PM', status:'Active',       order:4 },
  { busNo:'UP 41 T 1005', route:'Route E — Jarwal Road',        area:'Jarwal',        driver:'Vijay Kumar',   driverPhone:'9876501005', conductor:'Manoj Singh', capacity:36, students:22, stops:'Jarwal Town, Sirsiya, Badka Gaon, NH27 Junction, SPVS Gate',            departs:'6:15 AM', returns:'3:15 PM', status:'Active',       order:5 },
  { busNo:'UP 41 T 1006', route:'Route F — Bhinga / Shravasti', area:'Shravasti',     driver:'Deepak Verma',  driverPhone:'9876501006', conductor:'Santosh Pal', capacity:42, students:18, stops:'Bhinga Chowk, Haripur, Tulsipur Road, Shravasti Cross, SPVS Gate',      departs:'6:00 AM', returns:'3:30 PM', status:'Active',       order:6 },
  { busNo:'UP 41 T 1007', route:'Route G — Local City',         area:'Bahraich City', driver:'Rakesh Tiwari', driverPhone:'9876501007', conductor:'Umesh Lal',   capacity:42, students:40, stops:'Medical College, Pilibhit Road, Station Road, Ghantaghar, SPVS Gate',   departs:'7:15 AM', returns:'2:15 PM', status:'Active',       order:7 },
  { busNo:'UP 41 T 1008', route:'Route H — Balrampur Road',     area:'Balrampur',     driver:'Arun Gupta',    driverPhone:'9876501008', conductor:'Sonu Kumar',  capacity:36, students:0,  stops:'Balrampur Cross, Tulsipur, Utraula Road, Itia Thok, SPVS Gate',         departs:'6:10 AM', returns:'3:20 PM', status:'Under Repair', order:8 },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')
  await Transport.deleteMany({})
  console.log('Cleared existing transport data')
  await Transport.insertMany(BUSES)
  console.log('✅ Seeded ' + BUSES.length + ' bus routes!')
  mongoose.disconnect()
}

seed().catch(function(err){ console.error(err); mongoose.disconnect() })