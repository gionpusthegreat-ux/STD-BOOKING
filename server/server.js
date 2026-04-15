const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with retry logic and extended timeouts
const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studio_booking', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 15000,
        retryWrites: true,
      });
      console.log('✅ MongoDB connected successfully');
      return;
    } catch (err) {
      retryCount++;
      console.error(`❌ MongoDB connection error (Attempt ${retryCount}/${maxRetries}):`);
      console.error('   Error Code:', err.code);
      console.error('   Error Message:', err.message);
      
      if (retryCount < maxRetries) {
        console.log(`   Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('');
        console.error('   Troubleshooting steps:');
        console.error('   1. Check MongoDB Atlas cluster status: https://cloud.mongodb.com/');
        console.error('   2. If paused, click RESUME and wait 1-2 minutes');
        console.error('   3. Verify IP address is whitelisted under Network Access');
        console.error('   4. Check credentials in .env file are correct');
        console.error('   5. Run: nslookup _mongodb._tcp.cluster0.1rrgomy.mongodb.net');
      }
    }
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/studios', require('./routes/studios'));
app.use('/api/bookings', require('./routes/bookings'));

// Health check
app.get('/', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusTexts = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    message: 'Studio Booking System API is running',
    mongodb: statusTexts[mongoStatus],
    port: PORT,
    status: mongoStatus === 1 ? 'ready' : 'initializing'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
