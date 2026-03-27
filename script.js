// POPUP FUNCTIONALITY
function openPopup() {
    document.getElementById('salePopup').classList.add('active');
    generateCaptcha();
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    document.getElementById('salePopup').classList.remove('active');
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('formError').style.display = 'none';
    document.getElementById('saleForm').reset();
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
document.getElementById('salePopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('salePopup').classList.contains('active')) {
        closePopup();
    }
});

// CAPTCHA FUNCTIONALITY
let captchaAnswer = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = a + b;
    document.getElementById('captchaQ').textContent = `${a} + ${b}`;
    document.getElementById('captchaAnswer').value = '';
}

// FORM SUBMISSION - Using Formspree (you'll need to replace with your Formspree endpoint)
async function submitSaleForm(e) {
    e.preventDefault();
    
    const userAnswer = parseInt(document.getElementById('captchaAnswer').value);
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');
    
    // Hide previous messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    // Validate captcha
    if (userAnswer !== captchaAnswer) {
        errorMsg.textContent = '❌ Incorrect answer. Please try again.';
        errorMsg.style.display = 'block';
        generateCaptcha();
        return;
    }

    // Get form data
    const name = document.getElementById('popupName').value;
    const email = document.getElementById('popupEmail').value;
    const phone = document.getElementById('popupPhone').value;
    const message = document.getElementById('popupMessage').value;

    try {
        // Replace this URL with your actual Formspree endpoint
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message,
                source: 'BotoxTechniques Domain Inquiry'
            })
        });

        if (response.ok) {
            successMsg.style.display = 'block';
            document.getElementById('saleForm').reset();
            generateCaptcha();
            
            // Auto-close popup after 3 seconds
            setTimeout(() => {
                closePopup();
            }, 3000);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        errorMsg.textContent = '❌ Something went wrong. Please try again or email us directly.';
        errorMsg.style.display = 'block';
        console.error('Form submission error:', error);
    }
}

// MOBILE NAVIGATION
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// RESEARCH TABS FUNCTIONALITY
const researchTabs = document.querySelectorAll('.research-tab');
const researchPanels = document.querySelectorAll('.research-panel');

researchTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        researchTabs.forEach(t => t.classList.remove('active'));
        researchPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        const targetPanel = document.getElementById(tab.dataset.tab + '-panel');
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// SCROLL ANIMATIONS
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

// Observe elements for animation
const animatedElements = document.querySelectorAll('.overview-card, .product-card, .technique-card, .safety-card, .study-card, .training-card, .testimonial-card, .partner-card, .domain-sale-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// AUTO-SHOW POPUP (delayed)
// Show popup after 10 seconds for first-time visitors
setTimeout(() => {
    if (!sessionStorage.getItem('popupSeen')) {
        openPopup();
        sessionStorage.setItem('popupSeen', '1');
    }
}, 10000); // 10 seconds delay

// PERFORMANCE OPTIMIZATIONS

// Lazy loading for images (if any are added later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}

// Preload critical resources
const preloadLinks = [
    { href: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
];

preloadLinks.forEach(link => {
    const linkEl = document.createElement('link');
    linkEl.rel = 'preload';
    linkEl.href = link.href;
    linkEl.as = link.as;
    document.head.appendChild(linkEl);
});

// SERVICE WORKER REGISTRATION (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ANALYTICS TRACKING (placeholder)
// You can add Google Analytics, Facebook Pixel, or other tracking here
function trackEvent(eventName, properties = {}) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Track popup interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track popup opens
    const popupTriggers = document.querySelectorAll('.btn-sale, .btn-domain-inquiry, .footer-sale-btn');
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            trackEvent('domain_inquiry_popup_opened', {
                trigger_source: trigger.className
            });
        });
    });
    
    // Track form submissions
    document.getElementById('saleForm').addEventListener('submit', () => {
        trackEvent('domain_inquiry_form_submitted');
    });
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_viewed', {
                    section_id: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to your error tracking service
});

// ACCESSIBILITY IMPROVEMENTS

// Keyboard navigation for popup
document.addEventListener('keydown', (e) => {
    if (document.getElementById('salePopup').classList.contains('active')) {
        if (e.key === 'Tab') {
            // Trap focus within popup
            const focusableElements = document.querySelectorAll('#salePopup input, #salePopup textarea, #salePopup button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
});

// Focus management
let lastFocusedElement;

function openPopup() {
    lastFocusedElement = document.activeElement;
    document.getElementById('salePopup').classList.add('active');
    generateCaptcha();
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        document.getElementById('popupName').focus();
    }, 100);
}

function closePopup() {
    document.getElementById('salePopup').classList.remove('active');
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('formError').style.display = 'none';
    document.getElementById('saleForm').reset();
    document.body.style.overflow = 'auto';
    
    // Return focus to previously focused element
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

console.log('BotoxTechniques.com - Advanced Medical Education Platform Loaded Successfully');