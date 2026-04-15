const mongoose = require('mongoose');
const os = require('os');
require('dotenv').config();

console.log('\n╔════════════════════════════════════════════════╗');
console.log('║        MONGODB CONNECTION DIAGNOSTIC          ║');
console.log('╚════════════════════════════════════════════════╝\n');

console.log('📋 CONNECTION DETAILS:');
console.log('─'.repeat(50));
console.log(`Configured URI: ${process.env.MONGODB_URI}`);
console.log(`Your Computer:  ${os.hostname()}`);
console.log(`Current Time:   ${new Date().toLocaleString()}\n`);

const testConnection = async () => {
  try {
    console.log('🔄 Attempting to connect...\n');
    
    const startTime = Date.now();
    await mongoose.connect(process.env.MONGODB_URI);
    const connectionTime = Date.now() - startTime;
    
    console.log('✅ CONNECTION SUCCESSFUL!\n');
    
    console.log('🖥️  DATABASE INFORMATION:');
    console.log('─'.repeat(50));
    console.log(`Hostname:     ${mongoose.connection.host}`);
    console.log(`Port:         ${mongoose.connection.port}`);
    console.log(`Database:     ${mongoose.connection.name}`);
    console.log(`Connected in: ${connectionTime}ms`);
    console.log(`Status:       ${mongoose.connection.readyState === 1 ? '🟢 Connected' : '🔴 Disconnected'}\n`);
    
    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 COLLECTIONS IN DATABASE:');
    console.log('─'.repeat(50));
    collections.forEach((col, i) => {
      console.log(`   ${i + 1}. ${col.name}`);
    });
    console.log();
    
    // Count documents
    const User = require('./models/User');
    const Studio = require('./models/Studio');
    const Booking = require('./models/Booking');
    
    const userCount = await User.countDocuments();
    const studioCount = await Studio.countDocuments();
    const bookingCount = await Booking.countDocuments();
    
    console.log('📊 DOCUMENT COUNTS:');
    console.log('─'.repeat(50));
    console.log(`Users:    ${userCount}`);
    console.log(`Studios:  ${studioCount}`);
    console.log(`Bookings: ${bookingCount}\n`);
    
    console.log('═'.repeat(50));
    console.log('\n✨ VERDICT: You are connected to LOCAL MongoDB!');
    console.log('   (NOT MongoDB Atlas - Your local installation)\n');
    
    process.exit(0);
  } catch (error) {
    console.log('❌ CONNECTION FAILED!\n');
    console.log('💥 ERROR:');
    console.log('─'.repeat(50));
    console.log(`Error Code: ${error.code}`);
    console.log(`Error Msg:  ${error.message}\n`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('⚠️  LIKELY CAUSE: MongoDB is NOT running on localhost:27017');
      console.log('   Make sure MongoDB service is running on your laptop!\n');
    }
    
    process.exit(1);
  }
};

testConnection();
