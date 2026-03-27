// ===== BOTOX TECHNIQUES WEBSITE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeResearchTabs();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeAnimations();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(link);
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close mobile menu when clicking on nav links
        const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// ===== RESEARCH TABS =====
function initializeResearchTabs() {
    const researchTabs = document.querySelectorAll('.research-tab');
    const researchPanels = document.querySelectorAll('.research-panel');
    
    researchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPanel = this.dataset.tab;
            
            // Remove active class from all tabs and panels
            researchTabs.forEach(t => t.classList.remove('active'));
            researchPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetPanel + '-panel').classList.add('active');
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.overview-card, .product-card, .technique-card, .safety-card, .study-card, .training-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .overview-card, .product-card, .technique-card, .safety-card, .study-card, .training-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .overview-card.animate, .product-card.animate, .technique-card.animate, 
        .safety-card.animate, .study-card.animate, .training-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animations */
        .overview-card:nth-child(1) { transition-delay: 0.1s; }
        .overview-card:nth-child(2) { transition-delay: 0.2s; }
        .overview-card:nth-child(3) { transition-delay: 0.3s; }
        .overview-card:nth-child(4) { transition-delay: 0.4s; }
        
        .product-card:nth-child(1) { transition-delay: 0.1s; }
        .product-card:nth-child(2) { transition-delay: 0.2s; }
        .product-card:nth-child(3) { transition-delay: 0.3s; }
        .product-card:nth-child(4) { transition-delay: 0.4s; }
        .product-card:nth-child(5) { transition-delay: 0.5s; }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .nav-link {
                font-size: 1.2rem;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                transition: background-color 0.3s ease;
            }
            
            .nav-link:hover {
                background-color: rgba(74, 158, 187, 0.1);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for scroll events
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

// Add smooth reveal animation for cards
function revealCards() {
    const cards = document.querySelectorAll('.overview-card, .product-card, .technique-card, .safety-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add loading animation for molecular structure
function animateMolecularStructure() {
    const molecules = document.querySelectorAll('.molecule');
    molecules.forEach((molecule, index) => {
        molecule.style.animationDelay = `${index * 0.5}s`;
        molecule.style.opacity = '0';
        
        setTimeout(() => {
            molecule.style.opacity = '0.8';
        }, index * 500);
    });
}

// Initialize molecular animation when page loads
window.addEventListener('load', animateMolecularStructure);

// ===== TABLE ENHANCEMENTS =====
function enhanceTable() {
    const table = document.querySelector('table');
    if (table) {
        // Add hover effects to table rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--neutral-100)';
                this.style.transform = 'scale(1.01)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = '';
            });
        });
    }
}

// Call table enhancement after DOM is loaded
document.addEventListener('DOMContentLoaded', enhanceTable);

// ===== KEYBOARD NAVIGATION =====
function initializeKeyboardNavigation() {
    // Tab key navigation for research tabs
    const researchTabs = document.querySelectorAll('.research-tab');
    
    researchTabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
        
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextTab = researchTabs[(index + 1) % researchTabs.length];
                nextTab.focus();
                nextTab.click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevTab = researchTabs[(index - 1 + researchTabs.length) % researchTabs.length];
                prevTab.focus();
                prevTab.click();
            }
        });
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initializeKeyboardNavigation);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    const scrollButtonStyles = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent-teal);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        }
        
        .scroll-to-top:hover {
            background: var(--primary-blue);
            transform: translateY(-2px);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = scrollButtonStyles;
    document.head.appendChild(style);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }, 100));
    
    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', initializeScrollToTop);

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, [role="tab"], [data-tab]');
    
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const text = element.textContent.trim();
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }
    });
    
    // Improve focus management for research tabs
    const tabPanels = document.querySelectorAll('.research-panel');
    tabPanels.forEach(panel => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '0');
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to log this to an error reporting service
});

// ===== PROGRESSIVE ENHANCEMENT =====
// Ensure the site works even if JavaScript fails
document.documentElement.classList.add('js-enabled');

// Add styles for JavaScript-enabled features
const jsStyles = `
    .js-enabled .nav-menu {
        /* Styles that only apply when JS is working */
    }
    
    .js-enabled .research-panel:not(.active) {
        display: none;
    }
`;

const jsStyleElement = document.createElement('style');
jsStyleElement.textContent = jsStyles;
document.head.appendChild(jsStyleElement);