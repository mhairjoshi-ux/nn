// Global variables
let currentUser = null;
let authToken = localStorage.getItem('token');

// API base URL
const API_URL = '/api';

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
    
    // Update auth link in navigation
    updateAuthLink();
});

function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Registration form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Booking form handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
    
    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

// Check if user is logged in
async function checkAuth() {
    if (!authToken) {
        currentUser = null;
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.data;
        } else {
            localStorage.removeItem('token');
            authToken = null;
            currentUser = null;
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
}

// Update navigation based on auth status
function updateAuthLink() {
    const authLink = document.getElementById('authLink');
    if (!authLink) return;
    
    if (currentUser) {
        authLink.textContent = `Welcome, ${currentUser.name}`;
        authLink.href = '#';
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        authLink.textContent = 'Login';
        authLink.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    authToken = null;
    currentUser = null;
    window.location.href = 'index.html';
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            localStorage.setItem('token', data.token);
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        showAlert('An error occurred. Please try again.', 'error');
    }
}

// Handle registration form submission
async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            localStorage.setItem('token', data.token);
            showAlert('Registration successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showAlert('An error occurred. Please try again.', 'error');
    }
}

// Handle booking form submission
async function handleBooking(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showAlert('Please login to make a booking', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const tourId = document.getElementById('tourId').value;
    const travelDate = document.getElementById('travelDate').value;
    const numberOfPeople = document.getElementById('numberOfPeople').value;
    const specialRequests = document.getElementById('specialRequests').value;
    const contactPhone = document.getElementById('contactPhone').value;
    
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                tour: tourId,
                travelDate,
                numberOfPeople: parseInt(numberOfPeople),
                specialRequests,
                contactPhone
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showAlert('Booking created successfully! We will contact you soon.', 'success');
            setTimeout(() => {
                window.location.href = 'tours.html';
            }, 2000);
        } else {
            showAlert(data.error || 'Booking failed', 'error');
        }
    } catch (error) {
        showAlert('An error occurred. Please try again.', 'error');
    }
}

// Handle contact form submission
async function handleContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // For contact form, we'll just show a success message since we're not storing contacts in DB
    showAlert('Thank you for contacting us! We will get back to you soon.', 'success');
    e.target.reset();
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    } else {
        document.body.insertBefore(alertDiv, document.body.firstChild);
    }
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
// WhatsApp Integration Functions
const WHATSAPP_NUMBER = '919274713544'; // Replace with your actual WhatsApp number (without + or spaces)

// Function to send WhatsApp message for tour inquiry
function sendTourInquiry(tourName, tourPrice) {
    const message = `Hello! I'm interested in the "${tourName}" tour (₹${tourPrice}). Could you please share more details about availability and booking?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Function to send WhatsApp message for booking confirmation
function sendBookingWhatsApp(bookingDetails) {
    const message = `Hello! I've just made a booking:\n\n` +
                   `Tour: ${bookingDetails.tourName}\n` +
                   `Travel Date: ${bookingDetails.travelDate}\n` +
                   `Number of People: ${bookingDetails.peopleCount}\n` +
                   `Total Price: ₹${bookingDetails.totalPrice}\n\n` +
                   `Please confirm my booking. Thanks!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Function for general inquiry
function sendWhatsAppInquiry() {
    const message = `Hello! I'd like to get more information about your travel services and packages.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Function for car rental inquiry
function sendCarRentalInquiry(carType = '') {
    let message = `Hello! I'm interested in your car rental services.`;
    if (carType) {
        message += ` Specifically for ${carType}.`;
    }
    message += ` Could you please share availability and pricing?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Add WhatsApp click tracking (optional)
function trackWhatsAppClick(source) {
    console.log(`WhatsApp clicked from: ${source}`);
    // You can send this to your analytics if needed
}