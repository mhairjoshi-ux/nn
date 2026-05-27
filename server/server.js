const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const carBookingRoutes = require('./routes/carBookingRoutes');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/car-bookings', carBookingRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tours', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tours.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// SEO Routes
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// WhatsApp redirect endpoint
app.post('/api/whatsapp-notify', (req, res) => {
  const { name, phone, bookingType, details } = req.body;
  const message = `New Booking Request!\n\nName: ${name}\nPhone: ${phone}\nType: ${bookingType}\nDetails: ${details}`;
  const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  res.json({ success: true, whatsappUrl });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
  console.log(`📞 WhatsApp Number: ${process.env.WHATSAPP_NUMBER}`);
});