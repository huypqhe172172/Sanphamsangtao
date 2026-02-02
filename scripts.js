/**
 * ========================================
 * PREMIUM ANIMATIONS & INTERACTIONS
 * Triển Lãm 54 Dân Tộc Việt Nam
 * ========================================
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initSmoothScroll();
    initParallax();
    initCounters();
    initMobileMenu();
    initDarkMode();
    initLoadingAnimations();
    initHeaderScroll();
});

/**
 * Scroll Reveal Animation
 * Animate elements when they come into view
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, [data-animate]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('active', 'animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
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
}

/**
 * Parallax Effect for Hero Section
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, [data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                parallaxElements.forEach(el => {
                    const speed = el.dataset.parallaxSpeed || 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Animated Counters
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.dataset.counter);
                const duration = parseInt(target.dataset.duration) || 2000;
                animateCounter(target, 0, countTo, duration);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOutQuart));
        
        element.textContent = current.toLocaleString('vi-VN');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuButton = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const menuClose = document.querySelector('[data-menu-close]');

    if (!menuButton) return;

    function toggleMenu() {
        mobileMenu?.classList.toggle('active');
        menuOverlay?.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }

    menuButton.addEventListener('click', toggleMenu);
    menuClose?.addEventListener('click', toggleMenu);
    menuOverlay?.addEventListener('click', toggleMenu);
}

/**
 * Dark Mode Toggle
 */
function initDarkMode() {
    const darkModeToggle = document.querySelector('[data-dark-toggle]');
    const html = document.documentElement;
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
    }

    // Update toggle icon
    updateDarkModeIcon();

    darkModeToggle?.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        updateDarkModeIcon();
    });
}

function updateDarkModeIcon() {
    const icon = document.querySelector('[data-dark-icon]');
    if (icon) {
        icon.textContent = document.documentElement.classList.contains('dark') 
            ? 'light_mode' 
            : 'dark_mode';
    }
}

// Global toggle function for inline onclick
window.toggleDarkMode = function() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    
    // Animate the toggle
    const button = event.currentTarget;
    button.classList.add('animate-bounce-in');
    setTimeout(() => button.classList.remove('animate-bounce-in'), 500);
};

/**
 * Loading Animations on Page Load
 */
function initLoadingAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-fade-in-up');
    }

    // Stagger animate cards
    const cards = document.querySelectorAll('.animate-stagger');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 150}ms`;
        card.classList.add('animate-fade-in-up');
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }

        // Hide/show header on scroll direction
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });

    // Add transition for smooth hide/show
    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}

/**
 * Cursor Trail Effect (Optional - for desktop)
 */
function initCursorTrail() {
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

/**
 * Image Lazy Loading with Fade Effect
 */
function initLazyImages() {
    const images = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.backgroundImage = `url(${img.dataset.src})`;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Ripple Effect for Buttons
 */
document.addEventListener('click', function(e) {
    const button = e.target.closest('.ripple-effect');
    if (!button) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

/**
 * Typing Animation Effect
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Number Animation for Statistics
 */
function initStatNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateNumber(target, 0, finalNumber, 2000);
                statsObserver.unobserve(target);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(238, 108, 43, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
    }
`;
document.head.appendChild(rippleStyle);

console.log('✨ Premium animations loaded successfully!');
