// Analog and Digital Clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Analog clock
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    if (hourHand && minuteHand && secondHand) {
        const hourDeg = (hours * 30) + (minutes * 0.5);
        const minuteDeg = (minutes * 6) + (seconds * 0.1);
        const secondDeg = seconds * 6;

        hourHand.style.transform = `rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        secondHand.style.transform = `rotate(${secondDeg}deg)`;
    }

    // Digital clock and date
    const digitalHours = now.getHours();
    const ampm = digitalHours >= 12 ? 'PM' : 'AM';
    const displayHours = digitalHours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    // Update digital clock
    const digitalClock = document.getElementById('digitalClock');
    const dateDisplay = document.getElementById('dateDisplay');

    if (digitalClock && dateDisplay) {
        digitalClock.textContent = `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm}`;

        // Update date display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        dateDisplay.textContent = dateString;
    }
}

setInterval(updateClock, 1000);
updateClock();

// Image Gallery
const imageContainers = document.querySelectorAll('.image-container');
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');

if (imageContainers.length > 0 && previousButton && nextButton) {
    let currentIndex = 0;
    imageContainers[currentIndex].classList.add('active');

    let autoSliderInterval = setInterval(() => {
        imageContainers[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % imageContainers.length;
        imageContainers[currentIndex].classList.add('active');
    }, 2000);

    previousButton.addEventListener('click', () => {
        clearInterval(autoSliderInterval);
        imageContainers[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + imageContainers.length) % imageContainers.length;
        imageContainers[currentIndex].classList.add('active');
        autoSliderInterval = setInterval(() => {
            imageContainers[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % imageContainers.length;
            imageContainers[currentIndex].classList.add('active');
        }, 2000);
    });

    nextButton.addEventListener('click', () => {
        clearInterval(autoSliderInterval);
        imageContainers[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % imageContainers.length;
        imageContainers[currentIndex].classList.add('active');
        autoSliderInterval = setInterval(() => {
            imageContainers[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % imageContainers.length;
            imageContainers[currentIndex].classList.add('active');
        }, 2000);
    });
}

// Dark/light mode toggle
const toggleButton = document.getElementById('themeToggle');
const body = document.body;

if (toggleButton) {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        toggleButton.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Show and hide table
const showTableBtn = document.getElementById('show-table-btn');
const tableContainer = document.getElementById('table-container');

if (showTableBtn && tableContainer) {
    showTableBtn.addEventListener('click', function() {
        if (tableContainer.style.display === 'block') {
            tableContainer.style.display = 'none';
            this.textContent = 'Show Table';
        } else {
            tableContainer.style.display = 'block';
            this.textContent = 'Hide Table';
        }
    });
}

// Scroll down and back to top buttons
const scrollDownBtn = document.getElementById('scroll-down-btn');
const backToTopBtn = document.getElementById('back-to-top-btn');

if (scrollDownBtn && backToTopBtn) {
    scrollDownBtn.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTopBtn.style.display = 'block';
            scrollDownBtn.style.display = 'none';
        } else {
            backToTopBtn.style.display = 'none';
            scrollDownBtn.style.display = 'block';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Table of Contents Functionality
document.addEventListener('DOMContentLoaded', function() {
    const showTocBtn = document.getElementById('show-toc-btn');
    const tableOfContents = document.getElementById('tableOfContents');
    const tocOverlay = document.getElementById('tocOverlay');
    
    if (showTocBtn && tableOfContents) {
        // Toggle table of contents when button is clicked
        showTocBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            tableOfContents.classList.toggle('active');
            tocOverlay.classList.toggle('active');
        });
        
        // Close TOC when clicking on overlay
        tocOverlay.addEventListener('click', function() {
            tableOfContents.classList.remove('active');
            tocOverlay.classList.remove('active');
        });
        
        // Close TOC when clicking on a link inside it
        const tocLinks = tableOfContents.querySelectorAll('a');
        tocLinks.forEach(link => {
            link.addEventListener('click', () => {
                tableOfContents.classList.remove('active');
                tocOverlay.classList.remove('active');
            });
        });
        
        // Close TOC when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                tableOfContents.classList.remove('active');
                tocOverlay.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for scroll buttons
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    
    if (window.scrollY > 100) {
        if (backToTopBtn) backToTopBtn.style.display = 'block';
        if (scrollDownBtn) scrollDownBtn.style.display = 'none';
    } else {
        if (backToTopBtn) backToTopBtn.style.display = 'none';
        if (scrollDownBtn) scrollDownBtn.style.display = 'block';
    }
    
    // Apply saved theme
    const toggleButton = document.getElementById('themeToggle');
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleButton) toggleButton.textContent = '☀️';
    }
});