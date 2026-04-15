const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');
    
    const users = await User.find({}).select('+password');
    console.log('═'.repeat(60));
    console.log(`TOTAL USERS IN DATABASE: ${users.length}`);
    console.log('═'.repeat(60));
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Type: ${user.userType}`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Password Hash: ${user.password.substring(0, 25)}...`);
      console.log(`   Created: ${user.createdAt}`);
    });
    
    console.log('\n' + '═'.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkUsers();
