const mongoose = require('mongoose');

const CarBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  fromLocation: {
    type: String,
    required: [true, 'Please provide pickup location']
  },
  toLocation: {
    type: String,
    required: [true, 'Please provide destination']
  },
  travelDate: {
    type: Date,
    required: [true, 'Please provide travel date']
  },
  carType: {
    type: String,
    enum: ['SUV', 'SEDAN', 'LUXURY', 'HATCHBACK'],
    default: 'SEDAN'
  },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CarBooking', CarBookingSchema);