// --- JavaScript for Interactivity ---

const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const scrollUpButton = document.getElementById('scroll-to-top');
// Select all elements that should fade in on scroll
const faders = document.querySelectorAll('.fade-in');

// Define options for the Intersection Observer for smooth scrolling
const appearOptions = {
    // Threshold 0 means the animation starts as soon as a single pixel enters the viewport.
    threshold: 0,
    // Start animation when the element is 100px from the bottom of the viewport
    rootMargin: "0px 0px -100px 0px" 
};


/**
 * 1. Theme Toggle Logic
 * Loads saved theme from localStorage, or defaults to 'light'.
 */
function initializeTheme() {
    // Check local storage for theme, default to 'light' if not found.
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    // Apply the theme to the body data-attribute, triggering CSS variable changes
    body.setAttribute('data-theme', theme);
    // Save the preference for future visits
    localStorage.setItem('theme', theme);

    // Update the icon displayed in the toggle button (sun or moon)
    const icon = theme === 'dark' ? 'ph-sun' : 'ph-moon';
    themeToggle.innerHTML = `<i class="${icon}"></i>`;
}

// Event listener for theme change
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);


/**
 * 2. Scroll-to-Top Button Logic
 * Shows/hides the button and handles smooth scrolling.
 */
window.addEventListener('scroll', () => {
    // Show button if scrolled more than 300px down from the top
    if (window.scrollY > 300) {
        scrollUpButton.style.display = 'flex';
    } else {
        scrollUpButton.style.display = 'none';
    }
});

scrollUpButton.addEventListener('click', () => {
    // Use smooth behavior for animating the scroll
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


/**
 * 3. Scroll-Based Fade-In Animation (Intersection Observer)
 * Makes elements with class 'fade-in' animate when they enter the viewport.
 */
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        // When the element intersects, add the 'appear' class to trigger the CSS transition
        entry.target.classList.add('appear');
        // Stop observing once it has appeared to save resources
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

// Observe all elements with the 'fade-in' class
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});