const mongoose = require('mongoose');
require('dotenv').config();

console.log('\n═══════════════════════════════════════════════');
console.log('DATABASE CONNECTION INFO');
console.log('═══════════════════════════════════════════════\n');

console.log('MongoDB URI from .env:');
console.log(`  ${process.env.MONGODB_URI}\n`);

const connectAndCheck = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected Successfully!');
    console.log(`  Host: ${mongoose.connection.host}`);
    console.log(`  Port: ${mongoose.connection.port}`);
    console.log(`  Database: ${mongoose.connection.name}`);
    console.log(`  State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in this database:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    console.log('\n═══════════════════════════════════════════════\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\nConnection Error:', error.message);
    process.exit(1);
  }
};

connectAndCheck();
