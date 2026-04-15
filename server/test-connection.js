require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGODB_URI);
console.log('');

const startTime = Date.now();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  const elapsed = Date.now() - startTime;
  console.log('✅ MongoDB connected successfully!');
  console.log('Connected in', elapsed, 'ms');
  mongoose.connection.close();
  process.exit(0);
})
.catch(err => {
  const elapsed = Date.now() - startTime;
  console.log('❌ Connection failed after', elapsed, 'ms');
  console.log('Error Code:', err.code);
  console.log('Error Message:', err.message);
  console.log('');
  console.log('Full Error:');
  console.log(err);
  process.exit(1);
});

// Listen for connection events
mongoose.connection.on('connecting', () => {
  console.log('→ Connecting to MongoDB...');
});

mongoose.connection.on('connected', () => {
  console.log('→ Connected!');
});

mongoose.connection.on('error', (err) => {
  console.error('→ Connection error:', err.message);
});

setTimeout(() => {
  console.log('⏰ Timeout: Connection attempt taking too long');
  process.exit(1);
}, 15000);
