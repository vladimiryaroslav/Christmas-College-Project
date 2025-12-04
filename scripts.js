// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// SMOOTH SCROLLING
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ============================================
// SNOW ANIMATION
// ============================================

function createSnow() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    const snowflakes = ['❄', '❅', '❆', '✻', '✼'];
    const numSnowflakes = 50;
    
    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        snowflake.style.opacity = Math.random() * 0.5 + 0.5;
        snowflake.style.fontSize = (Math.random() * 10 + 15) + 'px';
        snowContainer.appendChild(snowflake);
    }
}

createSnow();

// ============================================
// PARTICLE EFFECTS
// ============================================

function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Add floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// PRODUCT DEMO INTERACTIVITY
// ============================================

const demoToggle = document.getElementById('demoToggle');
const demoRacket = document.getElementById('demoRacket');
let isMounted = false;

if (demoToggle && demoRacket) {
    demoToggle.addEventListener('click', () => {
        isMounted = !isMounted;
        
        if (isMounted) {
            demoRacket.classList.add('mounted');
            demoToggle.classList.add('active');
            demoToggle.querySelector('.toggle-text').textContent = 'Click to Remove';
        } else {
            demoRacket.classList.remove('mounted');
            demoToggle.classList.remove('active');
            demoToggle.querySelector('.toggle-text').textContent = 'Click to Hang';
        }
    });
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
    
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

if (testimonialNext) {
    testimonialNext.addEventListener('click', nextTestimonial);
}

if (testimonialPrev) {
    testimonialPrev.addEventListener('click', prevTestimonial);
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-play testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause on hover
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// ============================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Handle delay attribute
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
                entry.target.style.transitionDelay = delay + 'ms';
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// GALLERY INTERACTIVITY
// ============================================

const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add zoom effect
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
    
    // Parallax effect on hover
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Show success message (in a real app, this would send to a server)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span>✓ Message Sent!</span>';
        submitButton.style.background = '#2d5016';
        submitButton.disabled = true;
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', formData);
    });
}

// ============================================
// RACKET INTERACTIVITY IN HERO
// ============================================

const heroRacket = document.getElementById('racket');
if (heroRacket) {
    heroRacket.addEventListener('click', () => {
        heroRacket.style.animation = 'none';
        setTimeout(() => {
            heroRacket.style.animation = 'racketFloat 3s infinite ease-in-out';
        }, 10);
        
        // Add bounce effect
        heroRacket.style.transform = 'translateX(-50%) translateY(-50px) scale(1.1)';
        setTimeout(() => {
            heroRacket.style.transform = '';
        }, 300);
    });
    
    // Mouse follow effect
    document.addEventListener('mousemove', (e) => {
        const rect = heroRacket.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        heroRacket.style.transform = `translateX(calc(-50% + ${deltaX}px)) translateY(calc(-50px + ${deltaY}px))`;
    });
}

// ============================================
// PARALLAX SCROLLING EFFECTS
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallax for hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroVisual.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ============================================
// FEATURE CARDS INTERACTIVITY
// ============================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    highlightNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ============================================
// LOADING ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Arrow keys for testimonials
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// ============================================
// SMOOTH REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll('.section-header, .feature-card, .gallery-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🎅 Ho Ho Ho! 🎅', 'color: #c41e3a; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out the Santa Table Tennis Set!', 'color: #2d5016; font-size: 14px;');
console.log('%c"Smash, Hang, & Ho-Ho-Ho!"', 'color: #ffd700; font-size: 16px; font-style: italic;');
