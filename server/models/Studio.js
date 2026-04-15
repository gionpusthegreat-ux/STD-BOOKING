const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide studio name'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  description: String,
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phone: String,
    latitude: Number,
    longitude: Number
  },
  studioType: {
    type: String,
    enum: ['recording', 'photography', 'videography', 'rehearsal', 'multi-purpose'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  features: [String],
  hourlyRate: {
    type: Number,
    required: true
  },
  images: [String],
  availability: {
    type: Map,
    of: {
      startTime: String,
      endTime: String,
      available: Boolean
    }
  },
  operatingHours: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Studio', studioSchema);
