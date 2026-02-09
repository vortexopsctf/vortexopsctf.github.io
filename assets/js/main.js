// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);

    // Theme toggle button click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Writeups Filter Functionality (Multi-tag support)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const writeupCards = document.querySelectorAll('.writeup-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                // Filter writeup cards (supports multi-tag)
                writeupCards.forEach(card => {
                    const cardTags = card.getAttribute('data-tags');
                    const cardCategory = card.getAttribute('data-category');
                    let shouldShow = false;

                    if (category === 'all') {
                        shouldShow = true;
                    } else if (cardTags) {
                        // Check if category is in the tags list
                        const tags = cardTags.split(',').map(tag => tag.trim().toLowerCase());
                        shouldShow = tags.includes(category.toLowerCase());
                    } else if (cardCategory === category) {
                        // Fallback to data-category for backward compatibility
                        shouldShow = true;
                    }

                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.stat-card, .writeup-card, .member-card, .skill-card').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for fade-in animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        .stat-card, .writeup-card, .member-card, .skill-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--darker-bg);
            padding: 1rem;
            border-bottom: 2px solid var(--border-color);
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .writeups-header {
            padding: 4rem 0 2rem;
            text-align: center;
            background: linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%);
        }

        .writeups-header h1 {
            color: var(--primary-color);
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .writeups-header p {
            color: var(--text-secondary);
            font-size: 1.2rem;
        }

        .writeups-filter {
            padding: 2rem 0;
            background-color: var(--darker-bg);
        }

        .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            padding: 0.6rem 1.5rem;
            background-color: var(--card-bg);
            color: var(--text-primary);
            border: 2px solid var(--border-color);
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
        }

        .filter-btn:hover {
            border-color: var(--primary-color);
        }

        .filter-btn.active {
            background-color: var(--primary-color);
            color: var(--darker-bg);
            border-color: var(--primary-color);
        }

        .writeup-meta {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .no-writeups {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            color: var(--text-secondary);
        }

        .team-header {
            padding: 4rem 0 2rem;
            text-align: center;
            background: linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%);
        }

        .team-header h1 {
            color: var(--primary-color);
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .team-header p {
            color: var(--text-secondary);
            font-size: 1.2rem;
        }

        .members-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .member-card {
            background-color: var(--card-bg);
            border-radius: 10px;
            padding: 2rem;
            border: 1px solid var(--border-color);
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .member-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow);
        }

        .member-avatar {
            width: 120px;
            height: 120px;
            margin: 0 auto 1rem;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid var(--primary-color);
        }

        .member-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .member-role {
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .member-bio {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }

        .member-socials {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }

        .member-socials a {
            color: var(--text-secondary);
            transition: color 0.3s;
        }

        .member-socials a:hover {
            color: var(--primary-color);
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .skill-card {
            background-color: var(--card-bg);
            border-radius: 10px;
            padding: 2rem;
            border: 1px solid var(--border-color);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .skill-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow);
        }

        .skill-card h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .skill-card p {
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(style);

    // CTFtime API Integration
    const CTFTIME_TEAM_ID = 409168;
    const rankingCard = document.getElementById('ranking-card');
    const eventsContainer = document.getElementById('events-container');

    // Fetch data once and use it for both sections
    if (rankingCard || eventsContainer) {
        fetchCTFtimeData();
    }

    async function fetchCTFtimeData() {
        try {
            // Use CORS proxy to bypass CORS restrictions
            // AllOrigins /get endpoint wraps response in JSON with proper CORS headers
            const apiUrl = `https://ctftime.org/api/v1/teams/${CTFTIME_TEAM_ID}/`;
            const corsProxy = 'https://api.allorigins.win/get?url=';
            const response = await fetch(corsProxy + encodeURIComponent(apiUrl));

            if (!response.ok) {
                throw new Error('Failed to fetch CTFtime data');
            }

            const wrapper = await response.json();
            const data = JSON.parse(wrapper.contents);

            // Use the same data for both sections
            if (rankingCard) {
                displayRankingData(data);
            }
            if (eventsContainer) {
                displayCTFEvents(data);
            }
        } catch (error) {
            console.error('Error fetching CTFtime data:', error);
            if (rankingCard) {
                displayRankingError();
            }
            if (eventsContainer) {
                displayEventsError();
            }
        }
    }

    function displayRankingData(data) {
        const currentYear = new Date().getFullYear();
        const yearRating = data.rating?.[currentYear] || null;

        let rankingHTML = `
            <div class="ranking-stats">
                <div class="ranking-stat">
                    <h3>${data.name}</h3>
                    <p class="stat-label">Team Name</p>
                </div>
        `;

        if (yearRating) {
            rankingHTML += `
                <div class="ranking-stat">
                    <h3 class="stat-highlight">#${yearRating.rating_place || 'N/A'}</h3>
                    <p class="stat-label">${currentYear} Global Rank</p>
                </div>
            `;

            if (yearRating.country_place) {
                rankingHTML += `
                <div class="ranking-stat">
                    <h3 class="stat-highlight">#${yearRating.country_place}</h3>
                    <p class="stat-label">${data.country || 'National'} Rank</p>
                </div>
                `;
            }

            rankingHTML += `
                <div class="ranking-stat">
                    <h3>${yearRating.rating_points?.toFixed(2) || '0.00'}</h3>
                    <p class="stat-label">Rating Points</p>
                </div>
            `;
        } else {
            rankingHTML += `
                <div class="ranking-stat">
                    <h3 class="stat-highlight">Unranked</h3>
                    <p class="stat-label">${currentYear} Status</p>
                </div>
                <div class="ranking-stat">
                    <h3>0.00</h3>
                    <p class="stat-label">Rating Points</p>
                </div>
            `;
        }

        if (data.country) {
            rankingHTML += `
                <div class="ranking-stat">
                    <h3>${data.country}</h3>
                    <p class="stat-label">Country</p>
                </div>
            `;
        }

        rankingHTML += `</div>`;

        // Add historical ratings if available
        if (data.rating && Object.keys(data.rating).length > 1) {
            rankingHTML += `
                <div class="rating-history">
                    <h4>Rating History</h4>
                    <div class="history-grid">
            `;

            const years = Object.keys(data.rating).sort((a, b) => b - a).slice(0, 3);
            years.forEach(year => {
                const rating = data.rating[year];
                rankingHTML += `
                    <div class="history-item">
                        <span class="history-year">${year}</span>
                        <span class="history-rank">#${rating.rating_place || 'N/A'}</span>
                        <span class="history-points">${rating.rating_points?.toFixed(2) || '0.00'} pts</span>
                    </div>
                `;
            });

            rankingHTML += `
                    </div>
                </div>
            `;
        }

        rankingCard.innerHTML = rankingHTML;
    }

    function displayRankingError() {
        rankingCard.innerHTML = `
            <div class="ranking-error">
                <p>Unable to load ranking data. Please visit our CTFtime profile for the latest information.</p>
                <a href="https://ctftime.org/team/${CTFTIME_TEAM_ID}" target="_blank" class="btn btn-secondary">View on CTFtime</a>
            </div>
        `;
    }

    // Display CTF Events (called from fetchCTFtimeData)
    function displayCTFEvents(data) {
        const currentYear = new Date().getFullYear();

        // Update CTFs Competed Stat (Using years active as proxy since API doesn't return total event count)
        const ctfsStat = document.getElementById('stat-ctfs');
        if (ctfsStat && data.rating) {
            ctfsStat.textContent = Object.keys(data.rating).length;
            // Optional: Change label to "Years Active" if preferred
            // ctfsStat.nextElementSibling.textContent = "Years Active";
        }

        // Collect all events from all years
        let allEvents = [];

        if (data.rating) {
            Object.keys(data.rating).forEach(year => {
                const yearData = data.rating[year];
                if (yearData.rating_points > 0) {
                    allEvents.push({
                        year: year,
                        place: yearData.rating_place,
                        points: yearData.rating_points
                    });
                }
            });
        }

        // Sort by year (newest first)
        allEvents.sort((a, b) => b.year - a.year);

        if (allEvents.length === 0) {
            eventsContainer.innerHTML = `
                <div class="no-events">
                    <p>No CTF competitions recorded yet. Check back soon!</p>
                </div>
            `;
            return;
        }

        let eventsHTML = '<div class="events-grid">';

        allEvents.forEach(event => {
            const isCurrent = event.year == currentYear;
            eventsHTML += `
                <div class="event-card ${isCurrent ? 'current-year' : ''}">
                    <div class="event-header">
                        <h3>${event.year} Season</h3>
                        ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
                    </div>
                    <div class="event-stats">
                        <div class="event-stat">
                            <span class="stat-value">#${event.place || 'N/A'}</span>
                            <span class="stat-name">Global Rank</span>
                        </div>
                        <div class="event-stat">
                            <span class="stat-value">${event.points.toFixed(2)}</span>
                            <span class="stat-name">Rating Points</span>
                        </div>
                    </div>
                </div>
            `;
        });

        eventsHTML += '</div>';
        eventsContainer.innerHTML = eventsHTML;
    }

    function displayEventsError() {
        eventsContainer.innerHTML = `
            <div class="events-error">
                <p>Unable to load competition history. Please visit our CTFtime profile.</p>
                <a href="https://ctftime.org/team/${CTFTIME_TEAM_ID}" target="_blank" class="btn btn-secondary">View on CTFtime</a>
            </div>
        `;
    }
});
