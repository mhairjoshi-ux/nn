const Booking = require('../models/Booking');
const Tour = require('../models/Tour');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    // Calculate total price based on tour price and number of people
    const tour = await Tour.findById(req.body.tour);
    if (!tour) {
      return res.status(404).json({ success: false, error: 'Tour not found' });
    }
    
    req.body.totalPrice = tour.price * req.body.numberOfPeople;
    
    const booking = await Booking.create(req.body);
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('tour');
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('tour');
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    // Make sure user owns booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};