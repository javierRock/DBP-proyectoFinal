// Accionistas y Asambleas JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Accionistas y Asambleas page loaded');
    
    // Initialize page functionality
    initializeNavigation();
    initializeAnimations();
    initializeInteractivity();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Secondary navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active state management if needed
            console.log('Navigation link clicked:', e.target.textContent);
        });
    });
    
    // Breadcrumb navigation
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Breadcrumb clicked:', e.target.textContent);
        });
    });
}

// Animations and visual effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe financial sections
    const financialSections = document.querySelectorAll('.financial-section');
    financialSections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

// Add animation styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .financial-section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .financial-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .document-link {
            transition: all 0.3s ease;
        }
        
        .document-link:hover {
            background-color: #f8f9fa;
            padding-left: 15px;
        }
    `;
    document.head.appendChild(style);
}

// Interactive functionality
function initializeInteractivity() {
    // Document links interaction
    const documentLinks = document.querySelectorAll('.link-documento');
    documentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            this.style.color = '#e31e24';
            setTimeout(() => {
                this.style.color = '';
            }, 300);
            
            // Show notification (you can implement actual download/navigation here)
            showNotification('Documento seleccionado: ' + this.textContent);
            
            console.log('Document link clicked:', this.textContent);
        });
        
        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn-ingresa, .btn-ingresa-secondary, .btn-phone');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(e, this);
            
            console.log('Button clicked:', this.textContent);
        });
    });
    
    // Financial sections hover effects
    const sections = document.querySelectorAll('.financial-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#2c5282';
            this.style.borderLeftWidth = '6px';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#e31e24';
            this.style.borderLeftWidth = '4px';
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c5282;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility functions
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

// Scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #2c5282;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.pointerEvents = 'auto';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.pointerEvents = 'none';
        }
    }, 100));
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top on load
window.addEventListener('load', function() {
    addScrollToTop();
});

// Handle responsive menu
function handleResponsiveMenu() {
    const breakpoint = 768;
    
    function checkScreenSize() {
        if (window.innerWidth <= breakpoint) {
            // Mobile view adjustments
            const secondaryNavContent = document.querySelector('.secondary-nav-content');
            if (secondaryNavContent) {
                secondaryNavContent.style.flexDirection = 'column';
                secondaryNavContent.style.gap = '15px';
            }
        } else {
            // Desktop view
            const secondaryNavContent = document.querySelector('.secondary-nav-content');
            if (secondaryNavContent) {
                secondaryNavContent.style.flexDirection = 'row';
                secondaryNavContent.style.gap = '';
            }
        }
    }
    
    // Check on load and resize
    window.addEventListener('load', checkScreenSize);
    window.addEventListener('resize', debounce(checkScreenSize, 250));
}

// Initialize responsive functionality
handleResponsiveMenu();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error in Accionistas y Asambleas:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Accionistas y Asambleas page loaded in ${loadTime.toFixed(2)}ms`);
});
