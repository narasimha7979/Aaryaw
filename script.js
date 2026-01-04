// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor
function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;

    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .feature-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroText = document.querySelector('.hero-text');
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        heroText.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed * 0.7}px)`;
    }
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            // Animate specific stats
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    const value = parseInt(text);
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 2;
                        if (current >= value) {
                            stat.textContent = value + '%';
                            clearInterval(timer);
                        } else {
                            stat.textContent = current + '%';
                        }
                    }, 20);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Floating animation for service cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;

    // Add subtle floating animation
    setInterval(() => {
        const randomY = Math.random() * 10 - 5;
        card.style.transform = `translateY(${randomY}px)`;
    }, 3000 + index * 500);
});

// Tilt effect on hover for cards
const tiltCards = document.querySelectorAll('.service-card, .feature-item, .stat-box');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Animated gradient background
const animatedBg = document.querySelector('.animated-bg');
let hue = 0;

setInterval(() => {
    hue = (hue + 1) % 360;
    animatedBg.style.filter = `hue-rotate(${hue}deg)`;
}, 100);

// Solar panel animation enhancement
const panelCells = document.querySelectorAll('.panel-cell');
let cellIndex = 0;

setInterval(() => {
    panelCells.forEach((cell, index) => {
        if (index === cellIndex) {
            cell.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            cell.style.boxShadow = 'inset 0 0 20px rgba(102, 126, 234, 0.8)';
        } else {
            cell.style.background = 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)';
            cell.style.boxShadow = 'inset 0 0 10px rgba(102, 126, 234, 0.2)';
        }
    });
    cellIndex = (cellIndex + 1) % panelCells.length;
}, 300);

// Sun rotation animation
const sun = document.querySelector('.sun');
let sunRotation = 0;

setInterval(() => {
    sunRotation += 1;
    sun.style.transform = `rotate(${sunRotation}deg)`;
}, 50);

// Add glow effect to enquiry button
const enquiryBtn = document.querySelector('.btn-enquiry');
if (enquiryBtn) {
    let glowIntensity = 0;
    let glowDirection = 1;

    setInterval(() => {
        glowIntensity += 0.02 * glowDirection;
        if (glowIntensity >= 1 || glowIntensity <= 0) {
            glowDirection *= -1;
        }

        const shadowSize = 8 + (glowIntensity * 20);
        enquiryBtn.style.boxShadow = `0 ${shadowSize}px ${shadowSize * 2}px rgba(67, 233, 123, ${0.4 + glowIntensity * 0.4})`;
    }, 50);
}

// Particle effect on scroll
class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create canvas for particles
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '1';
canvas.style.opacity = '0.3';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    progressBar.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.8)';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Add typing effect to hero text
const heroHeading = document.querySelector('.hero-text h1');
if (heroHeading) {
    const originalText = heroHeading.innerHTML;
    heroHeading.innerHTML = '';
    let charIndex = 0;

    const typeText = () => {
        if (charIndex < originalText.length) {
            heroHeading.innerHTML = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, 50);
        }
    };

    setTimeout(typeText, 500);
}

// Add smooth reveal for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Add interactive energy rays
const rays = document.querySelectorAll('.ray');
setInterval(() => {
    rays.forEach((ray, index) => {
        setTimeout(() => {
            ray.style.opacity = '1';
            setTimeout(() => {
                ray.style.opacity = '0';
            }, 1000);
        }, index * 300);
    });
}, 2000);

// Console welcome message
console.log('%c🌞 Welcome to Aarya Solar! 🌞', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cPowering a sustainable future with clean energy', 'color: #43e97b; font-size: 14px;');
console.log('%cFounded by V Narasimha Reddy', 'color: #b8b9c9; font-size: 12px;');

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Additional scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (hamburger && navLinks && navOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}