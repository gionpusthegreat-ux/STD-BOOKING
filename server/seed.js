const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Studio = require('./models/Studio');
const Booking = require('./models/Booking');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studio_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for seeding');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Studio.deleteMany({});
    await Booking.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Users
    const users = await User.create([
      {
        name: "Raj Limbu",
        email: "raj@studios.com",
        password: "password123",
        phone: "9841123456",
        userType: "studio_owner",
        address: "Thamel, Kathmandu, Nepal"
      },
      {
        name: "Priya Shrestha",
        email: "priya@example.com",
        password: "password456",
        phone: "9851234567",
        userType: "customer",
        address: "Boudha, Kathmandu, Nepal"
      },
      {
        name: "Arun Adhikari",
        email: "arjun@example.com",
        password: "password789",
        phone: "9861567890",
        userType: "customer",
        address: "Patan, Kathmandu Valley, Nepal"
      }
    ]);
    console.log('✅ Users created:', users.length);

    // Create Studios
    const studios = await Studio.create([
      {
        name: "SoundWave Recording Studio Kathmandu",
        owner: users[0]._id,
        description: "Professional recording studio with high-quality equipment in Thamel",
        location: {
          address: "Lazimpat, Thamel",
          city: "Kathmandu",
          phone: "9841123456",
          latitude: 27.7172,
          longitude: 85.3240
        },
        studioType: "recording",
        capacity: 4,
        features: ["Soundproofing", "Professional Microphones", "Mixing Console", "Air Conditioning"],
        hourlyRate: 2500,
        operatingHours: {
          monday: { start: "09:00", end: "22:00" },
          tuesday: { start: "09:00", end: "22:00" },
          wednesday: { start: "09:00", end: "22:00" },
          thursday: { start: "09:00", end: "22:00" },
          friday: { start: "09:00", end: "23:00" },
          saturday: { start: "10:00", end: "23:00" },
          sunday: { start: "10:00", end: "21:00" }
        },
        rating: 4.5
      },
      {
        name: "PixelPerfect Photography Studio",
        owner: users[0]._id,
        description: "Modern photography studio with natural lighting in Boudha",
        location: {
          address: "Boudha, Kathmandu Valley",
          city: "Kathmandu",
          phone: "9851234567",
          latitude: 27.7180,
          longitude: 85.3515
        },
        studioType: "photography",
        capacity: 8,
        features: ["Natural Lighting", "Backdrop Options", "Makeup Station", "Parking Available"],
        hourlyRate: 2000,
        operatingHours: {
          monday: { start: "10:00", end: "20:00" },
          tuesday: { start: "10:00", end: "20:00" },
          wednesday: { start: "10:00", end: "20:00" },
          thursday: { start: "10:00", end: "20:00" },
          friday: { start: "10:00", end: "22:00" },
          saturday: { start: "09:00", end: "22:00" },
          sunday: { start: "11:00", end: "19:00" }
        },
        rating: 4.8
      },
      {
        name: "CinemaLens Video Studio",
        owner: users[0]._id,
        description: "Premium videography studio with 4K equipment in Patan",
        location: {
          address: "Mangal Bazar, Patan",
          city: "Kathmandu Valley",
          phone: "9861567890",
          latitude: 27.6742,
          longitude: 85.3272
        },
        studioType: "videography",
        capacity: 6,
        features: ["4K Cameras", "Green Screen", "Editing Suite", "Lighting Equipment"],
        hourlyRate: 4000,
        operatingHours: {
          monday: { start: "08:00", end: "22:00" },
          tuesday: { start: "08:00", end: "22:00" },
          wednesday: { start: "08:00", end: "22:00" },
          thursday: { start: "08:00", end: "22:00" },
          friday: { start: "08:00", end: "23:00" },
          saturday: { start: "09:00", end: "23:00" },
          sunday: { start: "10:00", end: "22:00" }
        },
        rating: 4.7
      }
    ]);
    console.log('✅ Studios created:', studios.length);

    // Create Bookings
    const bookings = await Booking.create([
      {
        customer: users[1]._id,
        studio: studios[0]._id,
        bookingDate: new Date("2026-04-20"),
        startTime: "14:00",
        endTime: "17:00",
        duration: 3,
        totalAmount: 4500,
        status: "confirmed",
        paymentStatus: "paid",
        purpose: "Music Recording Session",
        notes: "Need vocal recording and mixing"
      },
      {
        customer: users[2]._id,
        studio: studios[1]._id,
        bookingDate: new Date("2026-04-22"),
        startTime: "10:00",
        endTime: "13:00",
        duration: 3,
        totalAmount: 3000,
        status: "confirmed",
        paymentStatus: "paid",
        purpose: "Portrait Photography Session",
        notes: "Professional headshots needed"
      },
      {
        customer: users[1]._id,
        studio: studios[2]._id,
        bookingDate: new Date("2026-04-25"),
        startTime: "15:00",
        endTime: "18:00",
        duration: 3,
        totalAmount: 7500,
        status: "pending",
        paymentStatus: "pending",
        purpose: "Product Video Shoot",
        notes: "Commercial content production"
      }
    ]);
    console.log('✅ Bookings created:', bookings.length);

    console.log('\n✅✅✅ Database seeded successfully! ✅✅✅\n');
    console.log('Sample Data Summary:');
    console.log('- Users:', users.length);
    console.log('- Studios:', studios.length);
    console.log('- Bookings:', bookings.length);
    console.log('\nYou can now test your APIs with this data!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

// Run seed
connectDB().then(() => {
  console.log('📊 Database connected, starting seed...');
  return seedDatabase();
}).catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
