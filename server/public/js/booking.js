document.addEventListener('DOMContentLoaded', () => {
    // Get tour ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('tour');
    
    if (tourId) {
        loadTourDetails(tourId);
        document.getElementById('tourId').value = tourId;
    }
    
    // Calculate total price when number of people changes
    const peopleInput = document.getElementById('numberOfPeople');
    if (peopleInput) {
        peopleInput.addEventListener('input', calculateTotalPrice);
    }
});

async function loadTourDetails(tourId) {
    try {
        const response = await fetch(`/api/tours/${tourId}`);
        const data = await response.json();
        
        if (data.success) {
            const tour = data.data;
            document.getElementById('tourName').value = tour.name;
            document.getElementById('tourPrice').textContent = tour.price;
            window.currentTourPrice = tour.price;
            calculateTotalPrice();
        } else {
            showAlert('Tour not found', 'error');
        }
    } catch (error) {
        console.error('Error loading tour:', error);
        showAlert('Failed to load tour details', 'error');
    }
}

function calculateTotalPrice() {
    const peopleCount = parseInt(document.getElementById('numberOfPeople').value) || 0;
    const pricePerPerson = window.currentTourPrice || 0;
    const total = peopleCount * pricePerPerson;
    
    document.getElementById('peopleCount').textContent = peopleCount;
    document.getElementById('totalPrice').textContent = total.toLocaleString();
}
// After successful booking, add WhatsApp confirmation option
if (response.ok && data.success) {
    // Show WhatsApp confirmation option
    const whatsappConfirm = confirm('Booking created successfully! Would you like to confirm via WhatsApp?');
    if (whatsappConfirm) {
        sendBookingWhatsApp({
            tourName: document.getElementById('tourName').value,
            travelDate: document.getElementById('travelDate').value,
            peopleCount: document.getElementById('numberOfPeople').value,
            totalPrice: document.getElementById('totalPrice').textContent
        });
    }
    
    showAlert('Booking created successfully! We will contact you soon.', 'success');
    setTimeout(() => {
        window.location.href = 'tours.html';
    }, 2000);
}