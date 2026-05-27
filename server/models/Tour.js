const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add tour name'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add description']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  price: {
    type: Number,
    required: [true, 'Please add price']
  },
  category: {
    type: String,
    required: true,
    enum: ['sightseeing', 'day_trip', 'multi_day', 'car_rental', 'special']
  },
  inclusions: [String],
  image: {
    type: String,
    default: 'default-tour.jpg'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

TourSchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().split(' ').join('-');
  next();
});

module.exports = mongoose.model('Tour', TourSchema);