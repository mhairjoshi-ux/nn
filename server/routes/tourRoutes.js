const express = require('express');
const { getTours, getTour, createTour } = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getTours)
  .post(protect, authorize('admin'), createTour);

router.route('/:id').get(getTour);

module.exports = router;