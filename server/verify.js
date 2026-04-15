const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Studio = require('./models/Studio');
const Booking = require('./models/Booking');

const verifyDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studio_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    
    // Check collections
    const userCount = await User.countDocuments();
    const studioCount = await Studio.countDocuments();
    const bookingCount = await Booking.countDocuments();
    
    console.log('\n📊 Data Count in Database:');
    console.log(`Users: ${userCount}`);
    console.log(`Studios: ${studioCount}`);
    console.log(`Bookings: ${bookingCount}`);
    
    if (userCount > 0) {
      console.log('\n👥 Sample User:');
      const user = await User.findOne();
      console.log(JSON.stringify(user, null, 2));
    }
    
    if (studioCount > 0) {
      console.log('\n🏢 Sample Studio:');
      const studio = await Studio.findOne();
      console.log(JSON.stringify(studio, null, 2));
    }
    
    if (bookingCount > 0) {
      console.log('\n📅 Sample Booking:');
      const booking = await Booking.findOne();
      console.log(JSON.stringify(booking, null, 2));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

verifyDatabase();
