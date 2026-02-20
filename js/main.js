// Google Cloud Credits Pitch - Main JavaScript

// ============================================
// 1. Navigation
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('active');
            
            // Scroll to section with offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================================
// 2. Navbar scroll effect
// ============================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// 3. Counter animation for metrics
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
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
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            if (target) {
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

// Observe all metric values
document.querySelectorAll('.metric-value[data-count]').forEach(element => {
    counterObserver.observe(element);
});

// ============================================
// 4. Fade-in animations on scroll
// ============================================

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Add fade-in class to elements
const fadeElements = document.querySelectorAll(`
    .problem-card,
    .role-card,
    .defi-card,
    .strategy-card,
    .team-card,
    .funding-card,
    .milestone-item,
    .step-card
`);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ============================================
// 5. Table responsiveness
// ============================================

// Add horizontal scroll hint for mobile tables
function addScrollHint() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const wrapper = table.parentElement;
        
        if (table.scrollWidth > wrapper.clientWidth) {
            wrapper.classList.add('has-scroll');
            wrapper.setAttribute('title', 'Scroll horizontally to see more');
        }
    });
}

window.addEventListener('resize', addScrollHint);
window.addEventListener('load', addScrollHint);

// ============================================
// 6. Scroll progress indicator
// ============================================

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update a progress bar if it exists
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// 7. Copy to clipboard functionality
// ============================================

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        
        document.body.removeChild(textarea);
    }
}

// Add copy functionality to contact email
document.querySelectorAll('.contact-card a').forEach(link => {
    if (link.textContent.includes('@')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(link.textContent);
        });
    }
});

// ============================================
// 8. Notification system
// ============================================

function showNotification(message, duration = 3000) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// 9. Lazy load images (if added later)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// 10. Print functionality
// ============================================

function printPage() {
    window.print();
}

// Add print button functionality if button exists
const printBtn = document.getElementById('printBtn');
if (printBtn) {
    printBtn.addEventListener('click', printPage);
}

// ============================================
// 11. Initialize on DOM ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Google Cloud Credits Pitch - Initialized');
    
    // Add any initialization code here
    addScrollHint();
    
    // Add active class to current section in nav
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// ============================================
// 12. Performance monitoring
// ============================================

// Log page load performance
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`Page loaded in ${pageLoadTime}ms`);
    
    // Send analytics if needed
    // sendAnalytics('pageLoad', { duration: pageLoadTime });
});

// ============================================
// 13. External link handling
// ============================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Ensure external links open in new tab
    if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ============================================
// 14. Keyboard navigation
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================================
// 15. Error handling
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.message, e.filename, e.lineno, e.colno);
    // You could send this to an error tracking service
});

// ============================================
// 16. Service worker registration (optional)
// ============================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered:', registration))
    //         .catch(error => console.log('SW registration failed:', error));
    // });
}
