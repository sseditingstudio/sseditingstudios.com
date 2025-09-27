// SS Editing Studio - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeDemoReel();
    initializeContactForm();
    initializeAnimations();
    initializeBackgroundEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
}

// Enhanced scroll effects with background parallax
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));
}

// Background effects initialization
function initializeBackgroundEffects() {
    // Add subtle parallax effect for desktop only
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            
            // Hero background parallax
            const heroBackground = document.querySelector('.hero__background');
            if (heroBackground && scrolled < window.innerHeight) {
                const rate = scrolled * -0.1;
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
            
            // About background parallax
            const aboutBackground = document.querySelector('.about__background');
            const aboutSection = document.querySelector('.about');
            if (aboutBackground && aboutSection) {
                const sectionTop = aboutSection.offsetTop;
                const sectionHeight = aboutSection.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const rate = (scrolled - sectionTop + window.innerHeight) * -0.05;
                    aboutBackground.style.transform = `translateY(${rate}px)`;
                }
            }
            
            // Portfolio background parallax
            const portfolioBackground = document.querySelector('.portfolio__background');
            const portfolioSection = document.querySelector('.portfolio');
            if (portfolioBackground && portfolioSection) {
                const sectionTop = portfolioSection.offsetTop;
                const sectionHeight = portfolioSection.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const rate = (scrolled - sectionTop + window.innerHeight) * -0.03;
                    portfolioBackground.style.transform = `translateY(${rate}px)`;
                }
            }
            
            // Reviews background parallax
            const reviewsBackground = document.querySelector('.reviews__background');
            const reviewsSection = document.querySelector('.reviews');
            if (reviewsBackground && reviewsSection) {
                const sectionTop = reviewsSection.offsetTop;
                const sectionHeight = reviewsSection.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const rate = (scrolled - sectionTop + window.innerHeight) * -0.04;
                    reviewsBackground.style.transform = `translateY(${rate}px)`;
                }
            }
            
            // Contact background parallax
            const contactBackground = document.querySelector('.contact__background');
            const contactSection = document.querySelector('.contact');
            if (contactBackground && contactSection) {
                const sectionTop = contactSection.offsetTop;
                const sectionHeight = contactSection.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const rate = (scrolled - sectionTop + window.innerHeight) * -0.02;
                    contactBackground.style.transform = `translateY(${rate}px)`;
                }
            }
        }, 16)); // 60fps for smooth parallax
    }
}

// Demo reel functionality
function initializeDemoReel() {
    const demoReelContainer = document.querySelector('.demo-reel__placeholder');
    const playButton = document.querySelector('.play-button');
    
    if (demoReelContainer && playButton) {
        demoReelContainer.addEventListener('click', function() {
            // Animate play button
            playButton.style.transform = 'scale(1.2)';
            playButton.style.opacity = '0.8';
            
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
                playButton.style.opacity = '1';
            }, 200);
            
            // Show demo reel message
            showNotification('Demo reel will be available soon! Contact us for a preview.', 'info');
        });
        
        // Add hover effect for better user experience
        demoReelContainer.addEventListener('mouseenter', function() {
            playButton.style.transform = 'scale(1.1)';
        });
        
        demoReelContainer.addEventListener('mouseleave', function() {
            playButton.style.transform = 'scale(1)';
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form__input');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(form)) {
            submitForm(form);
        }
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

// Form submission handling
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Log form data (for development - remove in production)
        console.log('Form submitted:', data);
    }, 2000);
}

// Enhanced scroll animations with background awareness
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add special animation for cards over backgrounds
                if (entry.target.matches('.service__card, .review__card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1.02)';
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .service__card, .review__card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Section-specific animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Trigger section-specific animations
                const sectionId = entry.target.getAttribute('id');
                animateSection(sectionId);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all main sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Section-specific animation triggers
function animateSection(sectionId) {
    switch(sectionId) {
        case 'hero':
            // Hero section already has built-in animations
            break;
        case 'about':
            animateAboutSection();
            break;
        case 'portfolio':
            animatePortfolioSection();
            break;
        case 'reviews':
            animateReviewsSection();
            break;
        case 'contact':
            animateContactSection();
            break;
    }
}

function animateAboutSection() {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.transform = 'translateY(0)';
            feature.style.opacity = '1';
        }, index * 150);
    });
}

function animatePortfolioSection() {
    const cards = document.querySelectorAll('.service__card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, index * 100);
    });
}

function animateReviewsSection() {
    const reviews = document.querySelectorAll('.review__card');
    reviews.forEach((review, index) => {
        setTimeout(() => {
            review.style.transform = 'translateY(0)';
            review.style.opacity = '1';
        }, index * 120);
    });
}

function animateContactSection() {
    const contactInfo = document.querySelector('.contact__info');
    const contactForm = document.querySelector('.contact__form');
    
    if (contactInfo) {
        contactInfo.style.transform = 'translateX(0)';
        contactInfo.style.opacity = '1';
    }
    
    if (contactForm) {
        setTimeout(() => {
            contactForm.style.transform = 'translateX(0)';
            contactForm.style.opacity = '1';
        }, 200);
    }
}

// Utility functions
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorElement = document.createElement('span');
    errorElement.classList.add('field-error');
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification--${type}`);
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced performance optimization
function optimizeForDevice() {
    // Disable parallax effects on mobile devices for better performance
    if (window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('mobile-device');
        
        // Remove fixed attachment on mobile
        const backgrounds = document.querySelectorAll('[class*="__background"]');
        backgrounds.forEach(bg => {
            bg.style.backgroundAttachment = 'scroll';
        });
    }
}

// Add CSS for enhanced animations and mobile optimization
const additionalStyles = `
<style>
/* Notification Styles */
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
    background: rgba(42, 42, 42, 0.98);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-xl);
    transform: translateX(120%);
    opacity: 0;
    transition: all 0.3s ease;
    backdrop-filter: blur(20px);
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification--success {
    border-left: 4px solid #10B981;
}

.notification--error {
    border-left: 4px solid #EF4444;
}

.notification--info {
    border-left: 4px solid var(--color-accent);
}

.notification__content {
    padding: var(--spacing-md);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-sm);
}

.notification__message {
    color: var(--color-text-light);
    font-size: 0.9rem;
    line-height: 1.4;
}

.notification__close {
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-fast);
}

.notification__close:hover {
    color: var(--color-text-light);
}

/* Form Error Styles */
.form__input.error {
    border-color: #EF4444;
    background-color: rgba(239, 68, 68, 0.1);
}

.field-error {
    display: block;
    color: #EF4444;
    font-size: 0.8rem;
    margin-top: var(--spacing-xs);
}

/* Enhanced Animation Classes */
.feature,
.service__card,
.review__card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature.animate-in,
.service__card.animate-in,
.review__card.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Section visibility animations */
.contact__info,
.contact__form {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact__form {
    transform: translateX(30px);
}

.section-visible .contact__info,
.section-visible .contact__form {
    opacity: 1;
    transform: translateX(0);
}

/* Staggered animation delays */
.feature:nth-child(1) { transition-delay: 0.1s; }
.feature:nth-child(2) { transition-delay: 0.2s; }
.feature:nth-child(3) { transition-delay: 0.3s; }

.service__card:nth-child(1) { transition-delay: 0.1s; }
.service__card:nth-child(2) { transition-delay: 0.2s; }
.service__card:nth-child(3) { transition-delay: 0.3s; }
.service__card:nth-child(4) { transition-delay: 0.4s; }
.service__card:nth-child(5) { transition-delay: 0.5s; }

.review__card:nth-child(1) { transition-delay: 0.1s; }
.review__card:nth-child(2) { transition-delay: 0.2s; }
.review__card:nth-child(3) { transition-delay: 0.3s; }
.review__card:nth-child(4) { transition-delay: 0.4s; }
.review__card:nth-child(5) { transition-delay: 0.5s; }

/* Background loading optimization */
.hero__background,
.about__background,
.portfolio__background,
.reviews__background,
.contact__background {
    will-change: transform;
    backface-visibility: hidden;
}

/* Mobile device optimizations */
.mobile-device .hero__background,
.mobile-device .about__background,
.mobile-device .portfolio__background,
.mobile-device .reviews__background,
.mobile-device .contact__background {
    background-attachment: scroll !important;
    will-change: auto;
}

.mobile-device [class*="__background"] {
    transform: none !important;
}

/* Loading states */
body:not(.loaded) {
    overflow: hidden;
}

body:not(.loaded) .hero__content {
    opacity: 0;
}

body.loaded .hero__content {
    opacity: 1;
    transition: opacity 1s ease 0.5s;
}

/* Enhanced hover effects for better UX */
.service__card:hover {
    background: rgba(42, 42, 42, 0.95);
    backdrop-filter: blur(15px);
}

.review__card:hover {
    background: rgba(42, 42, 42, 0.95);
    backdrop-filter: blur(15px);
}

.feature:hover {
    background: rgba(42, 42, 42, 0.95);
    backdrop-filter: blur(15px);
}

/* Mobile notification adjustments */
@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        top: 80px;
    }
    
    /* Reduce motion for accessibility on mobile */
    .feature,
    .service__card,
    .review__card {
        transition-duration: 0.3s;
    }
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
    .hero__background,
    .about__background,
    .portfolio__background,
    .reviews__background,
    .contact__background {
        background-attachment: scroll !important;
        transform: none !important;
    }
    
    .feature,
    .service__card,
    .review__card,
    .contact__info,
    .contact__form {
        transition-duration: 0.1s;
    }
    
    @keyframes backgroundShift {
        0%, 100% { background-position: center, 0% 50%, 0 0; }
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize device optimization
document.addEventListener('DOMContentLoaded', optimizeForDevice);

// Handle window resize for responsive background adjustments
window.addEventListener('resize', throttle(function() {
    optimizeForDevice();
}, 250));

// Add loading animation on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle logo click to go to top
document.querySelector('.header__logo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Service worker registration (for enhanced performance and offline capability)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}

// Enhanced click tracking for analytics
function trackEvent(eventName, properties) {
    console.log('Event tracked:', eventName, properties);
    // Replace with actual analytics implementation
}

// Track important user interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track button clicks
    if (target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: target.textContent,
            button_type: target.className,
            section: target.closest('section')?.id || 'unknown'
        });
    }
    
    // Track navigation clicks
    if (target.matches('.nav__link')) {
        trackEvent('navigation_click', {
            section: target.getAttribute('href')
        });
    }
    
    // Track demo reel clicks
    if (target.matches('.demo-reel__placeholder, .play-button')) {
        trackEvent('demo_reel_click', {
            element: 'demo_reel_placeholder'
        });
    }
    
    // Track service card clicks
    if (target.matches('.service__card') || target.closest('.service__card')) {
        const card = target.closest('.service__card') || target;
        const serviceName = card.querySelector('h3, h4')?.textContent;
        trackEvent('service_card_click', {
            service: serviceName
        });
    }
});

// Performance monitoring
function monitorPerformance() {
    // Monitor scroll performance
    let scrollCount = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            scrollCount++;
            isScrolling = true;
            
            requestAnimationFrame(() => {
                isScrolling = false;
            });
        }
    });
    
    // Log performance metrics after 30 seconds
    setTimeout(() => {
        console.log('Performance metrics:', {
            scrollEvents: scrollCount,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            isMobile: window.innerWidth <= 768
        });
    }, 30000);
}

// Initialize performance monitoring
monitorPerformance();