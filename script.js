// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Cost Calculator
const treatmentArea = document.getElementById('treatment-area');
const locationType = document.getElementById('location-type');
const providerType = document.getElementById('provider-type');

// Pricing multipliers based on location and provider type
const locationMultipliers = {
    urban: 1.3,
    suburban: 1.0,
    rural: 0.8
};

const providerMultipliers = {
    premium: 1.4,
    standard: 1.0,
    value: 0.7
};

// Base prices per unit (2024 averages)
const basePrices = {
    botox: 16,
    dysport: 6,
    xeomin: 13.5,
    jeuveau: 12
};

function calculateCosts() {
    const selectedArea = treatmentArea.options[treatmentArea.selectedIndex];
    const locationMult = locationMultipliers[locationType.value];
    const providerMult = providerMultipliers[providerType.value];
    
    const units = {
        botox: parseInt(selectedArea.dataset.unitsBotox),
        dysport: parseInt(selectedArea.dataset.unitsDysport),
        xeomin: parseInt(selectedArea.dataset.unitsXeomin),
        jeuveau: parseInt(selectedArea.dataset.unitsJeuveau)
    };
    
    // Calculate costs for each product
    Object.keys(units).forEach(product => {
        const pricePerUnit = basePrices[product] * locationMult * providerMult;
        const totalCost = units[product] * pricePerUnit;
        
        const costElement = document.getElementById(`${product}-cost`);
        const detailsElement = document.getElementById(`${product}-details`);
        
        costElement.textContent = `$${Math.round(totalCost)}`;
        detailsElement.textContent = `${units[product]} units × $${pricePerUnit.toFixed(0)}`;
    });
}

// Add event listeners for calculator
if (treatmentArea && locationType && providerType) {
    treatmentArea.addEventListener('change', calculateCosts);
    locationType.addEventListener('change', calculateCosts);
    providerType.addEventListener('change', calculateCosts);
    
    // Initial calculation
    calculateCosts();
}

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add staggered animation for cards
            if (entry.target.classList.contains('stats-grid')) {
                const cards = entry.target.querySelectorAll('.stat-item');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                    }, index * 100);
                });
            }
            
            if (entry.target.classList.contains('product-cards')) {
                const cards = entry.target.querySelectorAll('.product-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                    }, index * 150);
                });
            }
            
            if (entry.target.classList.contains('timeline-item')) {
                const isEven = Array.from(entry.target.parentNode.children).indexOf(entry.target) % 2 === 1;
                entry.target.classList.add(isEven ? 'slide-in-right' : 'slide-in-left');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stats-grid, .product-cards, .timeline-item, .safety-card, .comparison-table-container').forEach(el => {
    observer.observe(el);
});

// Form handling for domain inquiry
const inquiryForm = document.querySelector('.inquiry-form');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        // Create mailto link
        const subject = encodeURIComponent('BotoxTechniques.com Domain Inquiry');
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Company: ${company || 'Not provided'}\n\n` +
            `Message:\n${message}`
        );
        
        const mailtoLink = `mailto:domain@botoxtechniques.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Email Client Opened!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Add hover effects to comparison table rows
const tableRows = document.querySelectorAll('.comparison-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.backgroundColor = '#f8fafc';
        row.style.transform = 'scale(1.01)';
        row.style.transition = 'all 0.2s ease';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = '';
        row.style.transform = '';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            // Start typing animation after a brief delay
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .section-subtitle');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
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
`;
document.head.appendChild(style);

// Add progress indicator for reading
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 1001;
    transition: width 0.2s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add search functionality (basic)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content...';
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px;
        border: 2px solid #e2e8f0;
        border-radius: 25px;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(searchInput);
    
    // Toggle search with Ctrl+F or Cmd+F
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.style.opacity = '1';
            searchInput.style.visibility = 'visible';
            searchInput.focus();
        }
        
        if (e.key === 'Escape') {
            searchInput.style.opacity = '0';
            searchInput.style.visibility = 'hidden';
            searchInput.value = '';
            clearHighlights();
        }
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        clearHighlights();
        
        if (searchTerm.length > 2) {
            highlightText(searchTerm);
        }
    });
}

function highlightText(searchTerm) {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(searchTerm)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        const text = textNode.nodeValue;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const newHTML = text.replace(regex, '<mark style="background: yellow; padding: 2px;">$1</mark>');
        
        const span = document.createElement('span');
        span.innerHTML = newHTML;
        parent.replaceChild(span, textNode);
    });
}

function clearHighlights() {
    document.querySelectorAll('mark').forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

// Initialize search functionality
// addSearchFunctionality();

console.log('BotoxTechniques.com - Comprehensive Botulinum Toxin Resource');
console.log('Website loaded successfully with all interactive features.');