const express = require('express');
const {
  createCarBooking,
  getCarBookings,
  updateBookingStatus
} = require('../controllers/carBookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(createCarBooking)
  .get(protect, authorize('admin'), getCarBookings);

router.route('/:id')
  .put(protect, authorize('admin'), updateBookingStatus);

module.exports = router;