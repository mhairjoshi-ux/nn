const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, error: 'Tour not found' });
    }
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new tour (admin only - for setup)
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({ success: true, data: tour });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};