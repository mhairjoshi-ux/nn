// Load tours on tours page and homepage
document.addEventListener('DOMContentLoaded', () => {
    loadTours();
});

async function loadTours() {
    const toursGrid = document.getElementById('toursGrid') || document.getElementById('popularTours');
    if (!toursGrid) return;
    
    try {
        const response = await fetch('/api/tours');
        const data = await response.json();
    } catch (error) {
        console.error('Error loading tours:', error);
        toursGrid.innerHTML = '<div class="loading">Failed to load tours. Please refresh the page.</div>';
    }
}

function displayTours(tours, container) {
    container.innerHTML = '';
    
    // For homepage, show only first 3 tours
    const toursToShow = container.id === 'popularTours' ? tours.slice(0, 3) : tours;
    
    toursToShow.forEach(tour => {
        const tourCard = createTourCard(tour);
        container.appendChild(tourCard);
    });
}

function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'tour-card';
    
    const imageUrl = tour.image && tour.image !== 'default-tour.jpg' 
        ? tour.image 
        : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${tour.name}">
        <div class="tour-info">
            <h3>${tour.name}</h3>
            <p>${tour.description.substring(0, 100)}${tour.description.length > 100 ? '...' : ''}</p>
            <div class="price">₹${tour.price.toLocaleString()} per person</div>
            <div class="duration"><i class="far fa-clock"></i> ${tour.duration}</div>
            <a href="booking.html?tour=${tour._id}" class="btn btn-primary">Book Now</a>
        </div>
    `;
    
    return card;
}
function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'tour-card';
    
    const imageUrl = tour.image && tour.image !== 'default-tour.jpg' 
        ? tour.image 
        : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${tour.name}">
        <div class="tour-info">
            <h3>${tour.name}</h3>
            <p>${tour.description.substring(0, 100)}${tour.description.length > 100 ? '...' : ''}</p>
            <div class="price">₹${tour.price.toLocaleString()} per person</div>
            <div class="duration"><i class="far fa-clock"></i> ${tour.duration}</div>
            <div class="tour-buttons">
                <a href="booking.html?tour=${tour._id}" class="btn btn-primary">Book Now</a>
                <button onclick="sendTourInquiry('${tour.name}', ${tour.price})" class="btn btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Inquire
                </button>
            </div>
        </div>
    `;
    
    return card;
}