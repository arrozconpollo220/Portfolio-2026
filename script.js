// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// ===== Smooth Scrolling Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
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

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
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

window.addEventListener('scroll', highlightNavigation);

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and elements for fade-in animation
const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .stat-item, .contact-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Dynamic Text Effect =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-shape, .about-shape');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Skills Progress Animation =====
function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease forwards`;
        }, index * 100);
    });
}

// Trigger skills animation when skills section is in view
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillsObserver.observe(skillsSection);
}

// ===== Project Cards Hover Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===== Dynamic Stats Counter =====
function animateCounter(element, target, suffix, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/\d+/g, '');
                if (!isNaN(number)) {
                    statNumber.textContent = '0' + suffix;
                    animateCounter(statNumber, number, suffix);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== Cursor Trail Effect (Optional Enhancement) =====
let cursor = null;

function createCursor() {
    cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: 0.1s;
        display: none;
    `;
    document.body.appendChild(cursor);
}

// Only enable custom cursor on desktop
if (window.innerWidth > 768) {
    createCursor();
    
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        }
    });
    
    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'rgba(236, 72, 153, 0.8)';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            }
        });
    });
}

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Log Console Message =====
console.log('%c🚀 Portfolio 2026 ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #94a3b8; font-size: 14px;');
