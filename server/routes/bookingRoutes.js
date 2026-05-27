const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.route('/')
  .post(createBooking);

router.route('/mybookings').get(getMyBookings);
router.route('/:id').get(getBooking);

module.exports = router;