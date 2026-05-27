// WhatsApp Configuration
const WHATSAPP_CONFIG = {
    number: '919876543210', // Replace with your number
    messageTemplates: {
        general: 'Hello! I need information about your travel services.',
        booking: 'Hello! I want to book a tour package.',
        carRental: 'Hello! I\'m interested in renting a car.',
        support: 'Hello! I need support with my existing booking.',
        custom: null
    }
};

// Main WhatsApp function
function sendWhatsAppMessage(template, customData = null) {
    let message = '';
    
    if (customData && customData.message) {
        message = customData.message;
    } else if (WHATSAPP_CONFIG.messageTemplates[template]) {
        message = WHATSAPP_CONFIG.messageTemplates[template];
    } else {
        message = WHATSAPP_CONFIG.messageTemplates.general;
    }
    
    // Add user context if logged in
    if (currentUser) {
        message += `\n\n---\nUser: ${currentUser.name}\nEmail: ${currentUser.email}`;
        if (currentUser.phone) {
            message += `\nPhone: ${currentUser.phone}`;
        }
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Track WhatsApp click (optional analytics)
    trackWhatsAppClick(template);
}

// Quick inquiry functions
function quickInquiryTour(tourId, tourName, tourPrice) {
    const message = `*Tour Inquiry*\n\nI'm interested in the following tour:\n📍 Tour: ${tourName}\n💰 Price: ₹${tourPrice}\n\nCould you please provide more details about:\n- Availability for next week\n- Group discounts if any\n- Pickup and drop-off options\n\nThank you!`;
    
    sendWhatsAppMessage('custom', { message: message });
}

function quickInquiryDate(tourName, preferredDate, peopleCount) {
    const message = `*Booking Inquiry*\n\nTour: ${tourName}\n📅 Preferred Date: ${preferredDate}\n👥 Number of People: ${peopleCount}\n\nPlease let me know if this date is available and the total cost.`;
    
    sendWhatsAppMessage('custom', { message: message });
}

function sendSupportMessage(bookingId) {
    const message = `*Support Request*\n\nBooking ID: ${bookingId}\nI need assistance with my booking. Please help me with:`;
    
    sendWhatsAppMessage('custom', { message: message });
}

// Initialize WhatsApp widgets
document.addEventListener('DOMContentLoaded', () => {
    // Add WhatsApp sidebar for desktop
    addWhatsAppSidebar();
    
    // Add WhatsApp to all tour cards dynamically
    addWhatsAppToTourCards();
});

function addWhatsAppSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'whatsapp-sidebar';
    sidebar.innerHTML = `
        <div class="whatsapp-sidebar-item">
            <a href="#" onclick="sendWhatsAppMessage('general'); return false;">
                <i class="fab fa-whatsapp"></i>
                <span>General Inquiry</span>
            </a>
        </div>
        <div class="whatsapp-sidebar-item">
            <a href="#" onclick="sendWhatsAppMessage('booking'); return false;">
                <i class="fab fa-whatsapp"></i>
                <span>Book a Tour</span>
            </a>
        </div>
        <div class="whatsapp-sidebar-item">
            <a href="#" onclick="sendWhatsAppMessage('carRental'); return false;">
                <i class="fab fa-whatsapp"></i>
                <span>Car Rental</span>
            </a>
        </div>
        <div class="whatsapp-sidebar-item">
            <a href="#" onclick="sendWhatsAppMessage('support'); return false;">
                <i class="fab fa-whatsapp"></i>
                <span>Customer Support</span>
            </a>
        </div>
    `;
    document.body.appendChild(sidebar);
}

function addWhatsAppToTourCards() {
    // This function is called when tours are loaded
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-quick-btn {
            background: #25D366;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
            transition: all 0.3s;
        }
        .whatsapp-quick-btn:hover {
            background: #128C7E;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
}