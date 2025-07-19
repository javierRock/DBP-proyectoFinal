// Banco de Bogotá - Gobierno Corporativo
// JavaScript para interactividad de la página

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialización de componentes
    initNavigation();
    initSecondaryNavigation();
    initGovernanceSections();
    initDocumentLinks();
    initSmoothScroll();
    initAnimations();
    initResponsiveMenu();
    initAccessibility();

});

// Navegación principal
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si es un enlace interno (#), prevenir comportamiento por defecto
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Agregar efecto hover
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Navegación secundaria
function initSecondaryNavigation() {
    const secondaryNav = document.querySelector('.secondary-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de scroll para la navegación secundaria
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            secondaryNav.classList.add('scrolled');
        } else {
            secondaryNav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Efectos hover en enlaces de navegación secundaria
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remover clase activa de todos los enlaces
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Agregar clase activa al enlace clickeado
                this.classList.add('active');
                
                // Scroll suave a la sección
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - secondaryNav.offsetHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Inicializar secciones de gobierno corporativo
function initGovernanceSections() {
    const governanceSections = document.querySelectorAll('.governance-section');
    
    governanceSections.forEach(section => {
        // Efectos hover mejorados
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 40px rgba(0,77,159,0.15)';
            
            // Animar el icono
            const icon = this.querySelector('.governance-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 35px rgba(0,77,159,0.12)';
            
            // Restaurar el icono
            const icon = this.querySelector('.governance-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Efecto de focus para accesibilidad
        section.addEventListener('focus', function() {
            this.style.outline = '3px solid #64b5f6';
            this.style.outlineOffset = '4px';
        });
        
        section.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Inicializar enlaces de documentos
function initDocumentLinks() {
    const docLinks = document.querySelectorAll('.doc-link');
    
    docLinks.forEach(link => {
        // Efecto hover mejorado
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.boxShadow = '0 6px 20px rgba(0,77,159,0.15)';
            
            // Animar la flecha
            const arrow = this.querySelector('.doc-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(8px) scale(1.2)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 15px rgba(0,77,159,0.1)';
            
            // Restaurar la flecha
            const arrow = this.querySelector('.doc-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(5px) scale(1)';
            }
        });
        
        // Funcionalidad de click
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.querySelector('.doc-text').textContent;
            const docText = this.querySelector('.doc-text');
            const docIcon = this.querySelector('.doc-icon');
            const docArrow = this.querySelector('.doc-arrow');
            
            // Efecto de carga
            docText.textContent = 'Cargando documento...';
            docIcon.textContent = '⏳';
            docArrow.style.opacity = '0.5';
            this.style.pointerEvents = 'none';
            this.style.opacity = '0.7';
            
            // Simular carga del documento
            setTimeout(() => {
                docText.textContent = 'Abriendo documento...';
                docIcon.textContent = '📂';
                
                setTimeout(() => {
                    docText.textContent = originalText;
                    docIcon.textContent = this.getAttribute('data-original-icon') || '📄';
                    docArrow.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.style.opacity = '1';
                    
                    // Mostrar notificación de éxito
                    showNotification('Documento cargado exitosamente', 'success');
                    
                    // Aquí puedes agregar la lógica real para abrir el documento
                    // window.open('path/to/document.pdf', '_blank');
                    
                }, 1000);
            }, 800);
        });
        
        // Guardar el icono original
        const originalIcon = link.querySelector('.doc-icon').textContent;
        link.setAttribute('data-original-icon', originalIcon);
    });
}

// Scroll suave
function initSmoothScroll() {
    // Scroll suave para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.secondary-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botón "ir arriba"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Ir arriba');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #004d9f 0%, #0066cc 100%);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,77,159,0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidad del botón
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover del botón
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'linear-gradient(135deg, #003d7a 0%, #0052a3 100%)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'linear-gradient(135deg, #004d9f 0%, #0066cc 100%)';
    });
}

// Animaciones
function initAnimations() {
    // Intersection Observer para animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar elementos hijos con delay
                const docLinks = entry.target.querySelectorAll('.doc-link');
                docLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.governance-section');
    
    animatedElements.forEach((el, index) => {
        // Configurar estado inicial
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `all 0.6s ease ${index * 0.15}s`;
        
        // Configurar estado inicial de los enlaces de documentos
        const docLinks = el.querySelectorAll('.doc-link');
        docLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = 'all 0.4s ease';
        });
        
        observer.observe(el);
    });
    
    // Animación de conteo para estadísticas (si existen)
    const stats = document.querySelectorAll('[data-stat]');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-stat'));
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue).toLocaleString('es-CO');
        }, 16);
    });
}

// Menú responsivo
function initResponsiveMenu() {
    // Crear botón de menú mobile si no existe
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: #333;
            cursor: pointer;
            padding: 10px;
        `;
        
        const headerTop = document.querySelector('.header-top');
        headerTop.appendChild(mobileMenuBtn);
    }
    
    const mainNav = document.querySelector('.main-nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mainNav.classList.contains('nav-open');
        mainNav.classList.toggle('nav-open');
        this.innerHTML = isOpen ? '☰' : '✕';
        this.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('nav-open');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
            mainNav.classList.remove('nav-open');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
        }
    });
    
    // Mostrar/ocultar botón mobile según tamaño de pantalla
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            mainNav.classList.remove('nav-open');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Accesibilidad
function initAccessibility() {
    // Navegación por teclado
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'A' || this.tagName === 'BUTTON') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Indicadores de foco mejorados
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #64b5f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Agregar atributos ARIA donde sea necesario
    const governanceSections = document.querySelectorAll('.governance-section');
    governanceSections.forEach((section, index) => {
        section.setAttribute('role', 'article');
        section.setAttribute('aria-labelledby', `governance-title-${index}`);
        
        const title = section.querySelector('h3');
        if (title) {
            title.id = `governance-title-${index}`;
        }
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear contenedor de notificaciones si no existe
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.style.cssText = `
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 320px;
        word-wrap: break-word;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.innerHTML = `
        <span style="font-size: 18px;">${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Utilidades
const Utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Formato de números
    formatNumber: function(num) {
        return num.toLocaleString('es-CO');
    },
    
    // Validar email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Copiar al portapapeles
    copyToClipboard: function(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback para navegadores más antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
            });
        }
    }
};

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Optimización de rendimiento
window.addEventListener('load', function() {
    // Lazy loading de imágenes si es necesario
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin soporte
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Precarga de recursos críticos
    const criticalResources = [
        '../imagenes/index/logo-bogota-interno.png',
        '../imagenes/gobiernoCorporativo/gobierno-corporativo.jpg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.includes('.jpg') || resource.includes('.png') ? 'image' : 'fetch';
        link.href = resource;
        document.head.appendChild(link);
    });
});

// Funciones de búsqueda (si se implementa funcionalidad de búsqueda)
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const governanceSections = document.querySelectorAll('.governance-section');
    
    if (!searchInput) return;
    
    const performSearch = Utils.debounce(function(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            governanceSections.forEach(section => {
                section.style.display = 'block';
                section.style.opacity = '1';
            });
            return;
        }
        
        governanceSections.forEach(section => {
            const content = section.textContent.toLowerCase();
            if (content.includes(searchTerm)) {
                section.style.display = 'block';
                section.style.opacity = '1';
                // Destacar término de búsqueda
                highlightSearchTerm(section, searchTerm);
            } else {
                section.style.display = 'none';
                section.style.opacity = '0';
            }
        });
    }, 300);
    
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    function highlightSearchTerm(element, term) {
        // Implementar highlight de términos de búsqueda si es necesario
        // Esta función se puede expandir para destacar visualmente los términos encontrados
    }
}

// Exportar funciones para uso global si es necesario
window.GobiernoCorporativo = {
    showNotification,
    Utils,
    initSearch
};
