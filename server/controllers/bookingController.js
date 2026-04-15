const Booking = require('../models/Booking');
const Studio = require('../models/Studio');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query = {};

    // Filter by customer if user is a customer
    if (req.user.userType === 'customer') {
      query.customer = req.user.id;
    }

    // Filter by studio owner
    if (req.user.userType === 'studio_owner') {
      const studios = await Studio.find({ owner: req.user.id });
      const studioIds = studios.map(s => s._id);
      query.studio = { $in: studioIds };
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'name email phone')
      .populate('studio', 'name location hourlyRate');

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('studio', 'name location hourlyRate');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private/Customer
exports.createBooking = async (req, res) => {
  try {
    const { studio, bookingDate, startTime, endTime, duration, purpose, notes } = req.body;

    // Validate required fields
    if (!studio || !bookingDate || !startTime || !endTime || !duration) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Get studio details
    const studioData = await Studio.findById(studio);
    if (!studioData) {
      return res.status(404).json({ success: false, message: 'Studio not found' });
    }

    // Check for double booking
    const existingBooking = await Booking.findOne({
      studio,
      bookingDate: new Date(bookingDate),
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Studio is already booked for this time' });
    }

    const totalAmount = studioData.hourlyRate * duration;

    const booking = await Booking.create({
      customer: req.user.id,
      studio,
      bookingDate: new Date(bookingDate),
      startTime,
      endTime,
      duration,
      totalAmount,
      purpose,
      notes
    });

    const populatedBooking = await booking.populate('studio', 'name location hourlyRate');

    res.status(201).json({ success: true, data: populatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel a completed booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ success: true, message: 'Booking cancelled', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
