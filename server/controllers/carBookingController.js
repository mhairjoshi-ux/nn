const CarBooking = require('../models/CarBooking');

// @desc    Create car booking
// @route   POST /api/car-bookings
// @access  Public
exports.createCarBooking = async (req, res) => {
  try {
    const booking = await CarBooking.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Car booking request sent successfully! We will contact you shortly.',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all car bookings (Admin)
// @route   GET /api/car-bookings
// @access  Private/Admin
exports.getCarBookings = async (req, res) => {
  try {
    const bookings = await CarBooking.find().sort('-bookingDate');
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/car-bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await CarBooking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};