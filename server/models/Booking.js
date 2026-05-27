const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  travelDate: {
    type: Date,
    required: [true, 'Please select travel date']
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Please enter number of people'],
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  specialRequests: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  contactPhone: {
    type: String,
    required: [true, 'Please provide contact phone']
  }
});

module.exports = mongoose.model('Booking', BookingSchema);