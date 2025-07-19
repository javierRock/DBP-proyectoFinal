// DOM Elements
const elements = {
    secondaryNav: null,
    navLinks: null,
    faqItems: null,
    faqQuestions: null,
    mobileMenuToggle: null,
    mobileMenu: null,
    contactItems: null
};

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeScrollEffects();
    initializeFAQ();
    initializeNotifications();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAccessibility();
    initializeContactInfo();
    
    console.log('❓ Preguntas Frecuentes página inicializada correctamente');
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    elements.secondaryNav = document.querySelector('.secondary-nav');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.faqItems = document.querySelectorAll('.faq-item');
    elements.faqQuestions = document.querySelectorAll('.faq-question');
    elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    elements.mobileMenu = document.querySelector('.main-nav ul');
    elements.contactItems = document.querySelectorAll('.contact-item');
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

        // Animate FAQ sections on scroll
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
    const faqSections = document.querySelectorAll('.faq-section');
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    faqSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollTop + windowHeight > sectionTop + 100) {
            section.style.animationDelay = `${index * 0.2}s`;
            section.classList.add('animate-in');
        }
    });
}

/**
 * Initialize FAQ functionality
 */
function initializeFAQ() {
    if (!elements.faqQuestions) return;

    elements.faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items in the same section
            const section = faqItem.closest('.faq-section');
            const otherItems = section.querySelectorAll('.faq-item.active');
            otherItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    trackFAQInteraction(item, 'closed');
                }
            });
            
            // Toggle current item
            if (isActive) {
                faqItem.classList.remove('active');
                trackFAQInteraction(faqItem, 'closed');
                showNotification('Pregunta cerrada', 'info', 2000);
            } else {
                faqItem.classList.add('active');
                trackFAQInteraction(faqItem, 'opened');
                
                // Scroll to the question if needed
                setTimeout(() => {
                    const rect = faqItem.getBoundingClientRect();
                    if (rect.top < 100) {
                        faqItem.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 300);
                
                showNotification('Pregunta expandida', 'success', 2000);
            }
        });

        // Add hover effects
        question.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        question.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Initialize search functionality for FAQs
    initializeFAQSearch();
}

/**
 * Initialize FAQ search functionality
 */
function initializeFAQSearch() {
    // Create search input if it doesn't exist
    const contentHeader = document.querySelector('.content-header');
    if (contentHeader && !document.querySelector('.faq-search')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'faq-search-container';
        searchContainer.style.cssText = `
            margin-top: 20px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'faq-search';
        searchInput.placeholder = 'Buscar en preguntas frecuentes...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 14px;
            background: white;
            transition: all 0.3s ease;
        `;
        
        searchContainer.appendChild(searchInput);
        contentHeader.appendChild(searchContainer);
        
        // Add search functionality
        const debouncedSearch = debounce(performFAQSearch, 300);
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            debouncedSearch(query);
        });
        
        // Search input focus effects
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#004d9f';
            this.style.boxShadow = '0 0 0 3px rgba(0,77,159,0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.boxShadow = 'none';
        });
    }
}

/**
 * Perform FAQ search
 */
function performFAQSearch(query) {
    const faqSections = document.querySelectorAll('.faq-section');
    let visibleCount = 0;
    
    if (!query) {
        // Show all sections and items
        faqSections.forEach(section => {
            section.style.display = 'block';
            const items = section.querySelectorAll('.faq-item');
            items.forEach(item => {
                item.style.display = 'block';
                visibleCount++;
            });
        });
        updateSearchResults(visibleCount, false);
        return;
    }
    
    const searchTerms = query.toLowerCase().split(' ');
    
    faqSections.forEach(section => {
        const items = section.querySelectorAll('.faq-item');
        let sectionHasVisible = false;
        
        items.forEach(item => {
            const questionText = item.querySelector('.question-text').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();
            const combinedText = questionText + ' ' + answerText;
            
            const matches = searchTerms.every(term => 
                combinedText.includes(term)
            );
            
            if (matches) {
                item.style.display = 'block';
                sectionHasVisible = true;
                visibleCount++;
                
                // Highlight search terms
                highlightSearchTerms(item, searchTerms);
            } else {
                item.style.display = 'none';
            }
        });
        
        section.style.display = sectionHasVisible ? 'block' : 'none';
    });
    
    updateSearchResults(visibleCount, true);
    console.log(`🔍 Búsqueda FAQ: "${query}" - ${visibleCount} resultados`);
}

/**
 * Highlight search terms in FAQ items
 */
function highlightSearchTerms(item, searchTerms) {
    const questionText = item.querySelector('.question-text');
    const answerText = item.querySelector('.faq-answer p');
    
    [questionText, answerText].forEach(element => {
        if (!element.dataset.originalText) {
            element.dataset.originalText = element.textContent;
        }
        
        let text = element.dataset.originalText;
        searchTerms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            text = text.replace(regex, '<mark style="background: #ffeb3b; padding: 1px 3px; border-radius: 2px;">$1</mark>');
        });
        element.innerHTML = text;
    });
}

/**
 * Update search results display
 */
function updateSearchResults(count, isSearch) {
    let resultsDiv = document.querySelector('.search-results-info');
    
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.className = 'search-results-info';
        resultsDiv.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            font-size: 14px;
            color: #666;
        `;
        
        const contentHeader = document.querySelector('.content-header');
        contentHeader.appendChild(resultsDiv);
    }
    
    if (isSearch) {
        resultsDiv.textContent = count === 0 
            ? 'No se encontraron preguntas que coincidan con su búsqueda'
            : `Se ${count === 1 ? 'encontró' : 'encontraron'} ${count} ${count === 1 ? 'pregunta' : 'preguntas'}`;
        resultsDiv.style.display = 'block';
    } else {
        resultsDiv.style.display = 'none';
    }
}

/**
 * Track FAQ interactions
 */
function trackFAQInteraction(faqItem, action) {
    const questionText = faqItem.querySelector('.question-text').textContent;
    console.log(`📊 FAQ ${action}: ${questionText}`);
    
    // Here you could send analytics data
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_interaction', {
            'custom_parameter': action,
            'question': questionText
        });
    }
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
    // Add keyboard navigation support for FAQ items
    elements.faqQuestions?.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Update aria-expanded when toggled
        const faqItem = question.parentElement;
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isExpanded = faqItem.classList.contains('active');
                    question.setAttribute('aria-expanded', isExpanded.toString());
                }
            });
        });
        
        observer.observe(faqItem, { attributes: true });
    });

    // Add keyboard support for nav links
    elements.navLinks?.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Initialize contact information interactions
 */
function initializeContactInfo() {
    elements.contactItems?.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.querySelector('.contact-details strong').textContent;
            const contactValue = this.querySelector('.contact-details p').textContent;
            
            // Copy to clipboard if it's email or phone
            if (contactType.includes('Email') || contactType.includes('Teléfono')) {
                navigator.clipboard.writeText(contactValue).then(() => {
                    showNotification(`${contactType} copiado al portapapeles`, 'success');
                }).catch(() => {
                    showNotification(`Información de contacto: ${contactValue}`, 'info');
                });
            }
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
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
 * Initialize print functionality
 */
function initializePrint() {
    const printBtn = document.querySelector('.btn-print');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Expand all FAQ items before printing
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => item.classList.add('active'));
            
            showNotification('Preparando impresión...', 'info');
            setTimeout(() => {
                window.print();
            }, 500);
        });
    }
}

/**
 * Initialize FAQ categories filtering
 */
function initializeCategoryFilter() {
    const categories = ['general', 'acciones', 'reportes', 'gobierno', 'contacto'];
    
    // Create category filter buttons
    const contentHeader = document.querySelector('.content-header');
    if (contentHeader && !document.querySelector('.category-filters')) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filters';
        filterContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
            flex-wrap: wrap;
        `;
        
        const allBtn = createCategoryButton('Todas', 'all', true);
        filterContainer.appendChild(allBtn);
        
        categories.forEach(category => {
            const btn = createCategoryButton(
                category.charAt(0).toUpperCase() + category.slice(1),
                category
            );
            filterContainer.appendChild(btn);
        });
        
        contentHeader.appendChild(filterContainer);
        
        // Add filter functionality
        const filterBtns = filterContainer.querySelectorAll('.category-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                filterByCategory(category);
            });
        });
    }
}

/**
 * Create category filter button
 */
function createCategoryButton(text, category, active = false) {
    const btn = document.createElement('button');
    btn.className = `category-btn ${active ? 'active' : ''}`;
    btn.textContent = text;
    btn.dataset.category = category;
    btn.style.cssText = `
        padding: 8px 16px;
        border: 2px solid #e0e0e0;
        background: white;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        ${active ? 'border-color: #004d9f; color: #004d9f; background: rgba(0,77,159,0.1);' : ''}
    `;
    
    btn.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.borderColor = '#64b5f6';
            this.style.background = 'rgba(100,181,246,0.1)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.borderColor = '#e0e0e0';
            this.style.background = 'white';
        }
    });
    
    return btn;
}

/**
 * Filter FAQs by category
 */
function filterByCategory(category) {
    const faqSections = document.querySelectorAll('.faq-section');
    
    if (category === 'all') {
        faqSections.forEach(section => {
            section.style.display = 'block';
        });
    } else {
        faqSections.forEach((section, index) => {
            const shouldShow = (
                (category === 'general' && index === 0) ||
                (category === 'acciones' && index === 1) ||
                (category === 'reportes' && index === 2) ||
                (category === 'gobierno' && index === 3) ||
                (category === 'contacto' && index === 4)
            );
            
            section.style.display = shouldShow ? 'block' : 'none';
        });
    }
    
    console.log(`🏷️ Filtro aplicado: ${category}`);
}

/**
 * Initialize page analytics
 */
function initializeAnalytics() {
    // Track page view
    console.log('📊 Página vista: Preguntas Frecuentes');
    
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
    initializeCategoryFilter();
    initializeAnalytics();
    
    // Hide loading spinner if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    console.log('✅ Preguntas Frecuentes página completamente cargada');
});

// Export functions for external use
window.PreguntasFrecuentesApp = {
    showNotification,
    performFAQSearch,
    filterByCategory,
    elements
};
