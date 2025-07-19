// DOM Elements
const elements = {
    secondaryNav: null,
    navLinks: null,
    documentLinks: null,
    mobileMenuToggle: null,
    mobileMenu: null
};

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeScrollEffects();
    initializeDocumentLinks();
    initializeNotifications();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAccessibility();
    
    console.log('🚀 Sobre Banco página inicializada correctamente');
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    elements.secondaryNav = document.querySelector('.secondary-nav');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.documentLinks = document.querySelectorAll('.document-link');
    elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    elements.mobileMenu = document.querySelector('.main-nav ul');
}

/**
 * Initialize scroll effects for navigation
 */
function initializeScrollEffects() {
    let lastScrollTop = 0;
    let ticking = false;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to secondary nav
        if (elements.secondaryNav) {
            if (scrollTop > 100) {
                elements.secondaryNav.classList.add('scrolled');
            } else {
                elements.secondaryNav.classList.remove('scrolled');
            }
        }

        // Animate financial sections on scroll
        animateOnScroll();
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    function requestScrollTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    // Throttled scroll event
    window.addEventListener('scroll', requestScrollTick, { passive: true });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const financialSections = document.querySelectorAll('.financial-section');
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    financialSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollTop + windowHeight > sectionTop + 100) {
            section.style.animationDelay = `${index * 0.2}s`;
            section.classList.add('animate-in');
        }
    });
}

/**
 * Initialize document links functionality
 */
function initializeDocumentLinks() {
    if (!elements.documentLinks) return;

    elements.documentLinks.forEach(link => {
        // Add click tracking
        link.addEventListener('click', function(e) {
            const linkText = this.querySelector('.link-documento')?.textContent || 'Documento desconocido';
            
            // Track the click (you can integrate with analytics here)
            console.log('📄 Documento clickeado:', linkText);
            
            // Add visual feedback
            this.classList.add('downloading');
            
            // Remove the class after animation
            setTimeout(() => {
                this.classList.remove('downloading');
            }, 1000);
            
            // Show notification
            showNotification(`Descargando: ${linkText}`, 'info');
        });

        // Add hover effects
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.pdf-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.pdf-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/**
 * Initialize notification system
 */
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.querySelector('.notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        pointer-events: auto;
        font-size: 14px;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    container.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                container.removeChild(notification);
            }
        }, 300);
    }, duration);

    // Manual close on click
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                container.removeChild(notification);
            }
        }, 300);
    });
}

/**
 * Initialize mobile menu
 */
function initializeMobileMenu() {
    if (elements.mobileMenuToggle && elements.mobileMenu) {
        elements.mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            elements.mobileMenu.classList.toggle('nav-open');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!elements.mobileMenuToggle.contains(e.target) && 
                !elements.mobileMenu.contains(e.target)) {
                elements.mobileMenu.classList.remove('nav-open');
                elements.mobileMenuToggle.classList.remove('active');
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                elements.mobileMenu.classList.remove('nav-open');
                elements.mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Add keyboard navigation support
    elements.navLinks?.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add keyboard support for document links
    elements.documentLinks?.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add focus management for mobile menu
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

/**
 * Utility function to debounce function calls
 */
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

/**
 * Utility function to throttle function calls
 */
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

/**
 * Initialize search functionality (if needed)
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        const debouncedSearch = debounce(performSearch, 300);
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                debouncedSearch(query);
            } else {
                searchResults.style.display = 'none';
            }
        });
    }
}

/**
 * Perform search (placeholder function)
 */
function performSearch(query) {
    console.log('🔍 Búsqueda realizada:', query);
    // Implement actual search logic here
    showNotification(`Buscando: ${query}`, 'info');
}

/**
 * Initialize print functionality
 */
function initializePrint() {
    const printBtn = document.querySelector('.btn-print');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Preparando impresión...', 'info');
            setTimeout(() => {
                window.print();
            }, 500);
        });
    }
}

/**
 * Initialize page analytics (placeholder)
 */
function initializeAnalytics() {
    // Track page view
    console.log('📊 Página vista: Sobre el Banco');
    
    // Track time on page
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - startTime;
        console.log(`⏱️ Tiempo en página: ${Math.round(timeSpent / 1000)} segundos`);
    });
}

/**
 * Handle errors gracefully
 */
window.addEventListener('error', function(e) {
    console.error('❌ Error en la página:', e.message);
    showNotification('Se produjo un error inesperado', 'error');
});

/**
 * Initialize everything when page is fully loaded
 */
window.addEventListener('load', function() {
    initializePrint();
    initializeAnalytics();
    
    // Hide loading spinner if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    console.log('✅ Sobre Banco página completamente cargada');
});

/**
 * Service Worker registration (if available)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for external use
window.SobreBancoApp = {
    showNotification,
    performSearch,
    elements
};
