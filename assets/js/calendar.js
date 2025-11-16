// CTF Calendar functionality
let allEvents = [];
let currentFilters = {
    format: 'all',
    timeframe: 'upcoming'
};

// Fetch CTF events from CTFtime API
async function fetchCTFEvents() {
    const loadingElement = document.getElementById('calendar-loading');
    const errorElement = document.getElementById('calendar-error');
    const gridElement = document.getElementById('calendar-grid');

    try {
        // CTFtime API endpoint for upcoming events
        // Use CORS proxy to bypass CORS restrictions
        const apiUrl = 'https://ctftime.org/api/v1/events/';
        const corsProxy = 'https://api.allorigins.win/get?url=';
        const response = await fetch(corsProxy + encodeURIComponent(apiUrl));

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const wrapper = await response.json();
        const events = JSON.parse(wrapper.contents);
        allEvents = events;

        loadingElement.style.display = 'none';
        displayEvents(events);
        startCountdownTimers();

    } catch (error) {
        console.error('Error fetching CTF events:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
    }
}

// Display events in the grid
function displayEvents(events) {
    const gridElement = document.getElementById('calendar-grid');
    const emptyElement = document.getElementById('calendar-empty');

    // Filter events based on current filters
    const filteredEvents = filterEvents(events);

    if (filteredEvents.length === 0) {
        gridElement.style.display = 'none';
        emptyElement.style.display = 'block';
        return;
    }

    emptyElement.style.display = 'none';
    gridElement.style.display = 'grid';
    gridElement.innerHTML = '';

    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        gridElement.appendChild(eventCard);
    });
}

// Filter events based on current filter settings
function filterEvents(events) {
    let filtered = events;

    // Filter by format
    if (currentFilters.format !== 'all') {
        filtered = filtered.filter(event => {
            const format = event.onsite ? 'onsite' : 'online';
            return format === currentFilters.format;
        });
    }

    // Filter by timeframe
    const now = new Date();
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    if (currentFilters.timeframe === 'upcoming') {
        const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(event => {
            const startDate = new Date(event.start);
            return startDate <= twoWeeksFromNow;
        });
    } else if (currentFilters.timeframe === 'this-month') {
        filtered = filtered.filter(event => {
            const startDate = new Date(event.start);
            return startDate <= thisMonthEnd;
        });
    }

    return filtered;
}

// Create an event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';

    const startDate = new Date(event.start);
    const endDate = new Date(event.finish);
    const now = new Date();

    // Determine event status
    const isOngoing = now >= startDate && now <= endDate;
    const isPast = now > endDate;
    const isUpcoming = now < startDate;

    // Format dates
    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);

    // Calculate duration
    const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const durationHours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));

    // Event format badge
    const formatBadge = event.onsite ?
        '<span class="event-badge onsite">On-Site</span>' :
        '<span class="event-badge online">Online</span>';

    // Status badge
    let statusBadge = '';
    if (isOngoing) {
        statusBadge = '<span class="event-badge live">Live Now!</span>';
    } else if (isPast) {
        statusBadge = '<span class="event-badge past">Ended</span>';
    }

    // Weight badge (if weighted)
    const weightBadge = event.weight > 0 ?
        `<span class="event-badge weight">Weight: ${event.weight.toFixed(2)}</span>` :
        '<span class="event-badge unrated">Unrated</span>';

    card.innerHTML = `
        <div class="event-header">
            <h3>${escapeHtml(event.title)}</h3>
            <div class="event-badges">
                ${formatBadge}
                ${statusBadge}
                ${weightBadge}
            </div>
        </div>

        <div class="event-details">
            <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${startFormatted} - ${endFormatted}</span>
            </div>

            <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Duration: ${durationDays > 1 ? `${durationDays} days` : `${durationHours} hours`}</span>
            </div>

            ${event.location ? `
            <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${escapeHtml(event.location)}</span>
            </div>
            ` : ''}

            ${event.format ? `
            <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <span>Format: ${escapeHtml(event.format)}</span>
            </div>
            ` : ''}
        </div>

        ${isUpcoming ? `
        <div class="event-countdown" data-start="${event.start}">
            <div class="countdown-label">Starts in:</div>
            <div class="countdown-timer">
                <div class="countdown-unit">
                    <span class="countdown-value" data-type="days">-</span>
                    <span class="countdown-label-small">days</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-value" data-type="hours">-</span>
                    <span class="countdown-label-small">hrs</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-value" data-type="minutes">-</span>
                    <span class="countdown-label-small">min</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-value" data-type="seconds">-</span>
                    <span class="countdown-label-small">sec</span>
                </div>
            </div>
        </div>
        ` : ''}

        <div class="event-actions">
            <a href="${event.ctftime_url}" target="_blank" class="btn btn-primary">
                View on CTFtime →
            </a>
            ${event.url ? `
                <a href="${event.url}" target="_blank" class="btn btn-secondary">
                    Event Website
                </a>
            ` : ''}
        </div>
    `;

    return card;
}

// Format date for display
function formatDate(date) {
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Start countdown timers for all upcoming events
function startCountdownTimers() {
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

// Update all countdown timers
function updateCountdowns() {
    const countdownElements = document.querySelectorAll('.event-countdown');
    const now = new Date();

    countdownElements.forEach(element => {
        const startDate = new Date(element.dataset.start);
        const diff = startDate - now;

        if (diff <= 0) {
            element.innerHTML = '<div class="countdown-label">Event has started!</div>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = element.querySelector('[data-type="days"]');
        const hoursEl = element.querySelector('[data-type="hours"]');
        const minutesEl = element.querySelector('[data-type="minutes"]');
        const secondsEl = element.querySelector('[data-type="seconds"]');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    });
}

// Setup filter buttons
function setupFilters() {
    // Format filter buttons
    document.querySelectorAll('[data-format]').forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('[data-format]').forEach(btn =>
                btn.classList.remove('active'));
            button.classList.add('active');

            // Update filter and refresh display
            currentFilters.format = button.dataset.format;
            displayEvents(allEvents);
            startCountdownTimers();
        });
    });

    // Timeframe filter buttons
    document.querySelectorAll('[data-timeframe]').forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('[data-timeframe]').forEach(btn =>
                btn.classList.remove('active'));
            button.classList.add('active');

            // Update filter and refresh display
            currentFilters.timeframe = button.dataset.timeframe;
            displayEvents(allEvents);
            startCountdownTimers();
        });
    });
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    fetchCTFEvents();
});
