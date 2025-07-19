// Banco de Bogotá - Información Financiera
// JavaScript para interactividad de la página

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialización de componentes
    initNavigation();
    initSecondaryNavigation();
    initDocumentLinks();
    initSmoothScroll();
    initAnimations();
    initResponsiveMenu();
    initSearchFunctionality();

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
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
        
        // Hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Navegación secundaria
function initSecondaryNavigation() {
    const secondaryNav = document.querySelector('.secondary-nav');
    if (!secondaryNav) return;

    // Efecto de scroll para la barra de navegación secundaria
    let lastScrollTop = 0;
    let isScrolled = false;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase "scrolled" cuando se haga scroll
        if (scrollTop > 50 && !isScrolled) {
            secondaryNav.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollTop <= 50 && isScrolled) {
            secondaryNav.classList.remove('scrolled');
            isScrolled = false;
        }

        lastScrollTop = scrollTop;
    });

    // Manejar clicks en enlaces de navegación secundaria
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Si es un enlace interno, hacer scroll suave
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Efectos hover mejorados
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Flecha de retorno
    const navArrow = document.querySelector('.nav-arrow');
    if (navArrow) {
        navArrow.addEventListener('click', function() {
            // Mostrar notificación de navegación
            showNotification('Regresando a la página principal...', 'info');
            
            // Regresar a la página principal
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 600);
        });

        // Efecto hover en la flecha
        navArrow.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
            this.style.color = '#0066cc';
        });

        navArrow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#004d9f';
        });
    }

    // Botón secundario "Ingresa Seguro"
    const btnSecondary = document.querySelector('.btn-ingresa-secondary');
    if (btnSecondary) {
        btnSecondary.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirigiendo a acceso seguro...', 'info');
            
            // Simular redirección después de un breve delay
            setTimeout(() => {
                // Aquí se implementaría la redirección real
                console.log('Redirigiendo a portal seguro...');
            }, 1000);
        });
    }
}

// Interactividad de enlaces de documentos
function initDocumentLinks() {
    const documentLinks = document.querySelectorAll('.link-documento');
    
    documentLinks.forEach(link => {
        // Efecto de hover mejorado
        const parentLink = link.closest('.document-link');
        
        if (parentLink) {
            parentLink.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(8px)';
                this.style.boxShadow = '0 4px 15px rgba(0,77,159,0.15)';
            });
            
            parentLink.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            });
        }
        
        // Click handler con efecto de carga
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Agregar efecto de carga
            const originalText = this.textContent;
            this.textContent = 'Cargando...';
            this.style.opacity = '0.6';
            
            // Simular descarga de documento
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                showNotification('Documento cargado exitosamente', 'success');
                
                // Aquí se implementaría la descarga real del documento
                console.log(`Descargando: ${originalText}`);
            }, 1500);
            
            // Tracking de clicks para analítica
            trackDocumentClick(originalText);
        });
    });
}

// Scroll suave para enlaces internos
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Espacio para navegación fija
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Agregar delay escalonado para elementos hermanos
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const elementsToAnimate = document.querySelectorAll(
        '.financial-section, .content-header, .document-link, .footer-section'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Menú responsive
function initResponsiveMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    
    // Crear botón de menú hamburguesa si no existe
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle && window.innerWidth <= 768) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        
        // Insertar botón en el header
        const headerTop = document.querySelector('.header-top');
        if (headerTop) {
            headerTop.appendChild(menuToggle);
        }
    }
    
    // Toggle del menú
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navUl = nav.querySelector('ul');
            navUl.classList.toggle('nav-open');
            this.classList.toggle('active');
            
            // Cambiar aria-label
            const isOpen = navUl.classList.contains('nav-open');
            this.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            const navUl = nav.querySelector('ul');
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                navUl.classList.remove('nav-open');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Funcionalidad de búsqueda (placeholder)
function initSearchFunctionality() {
    // Esta función se puede expandir para agregar búsqueda de documentos
    const searchableContent = document.querySelectorAll('.section-content h3, .section-description, .link-documento');
    
    // Función para filtrar contenido (se puede activar con un campo de búsqueda)
    function filterContent(searchTerm) {
        searchableContent.forEach(element => {
            const text = element.textContent.toLowerCase();
            const parent = element.closest('.financial-section');
            
            if (text.includes(searchTerm.toLowerCase()) || searchTerm === '') {
                if (parent) parent.style.display = 'block';
            } else {
                if (parent) parent.style.display = 'none';
            }
        });
    }
    
    // Exportar función para uso futuro
    window.filterFinancialContent = filterContent;
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#004d9f'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 350px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        hideNotification(notification);
    });
    
    // Auto-hide después de 4 segundos
    setTimeout(() => {
        hideNotification(notification);
    }, 4000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Tracking de interacciones (para analítica)
function trackDocumentClick(documentName) {
    // Aquí se implementaría el tracking real con Google Analytics, etc.
    console.log(`Documento clickeado: ${documentName}`);
    
    // Ejemplo de implementación con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'document_download', {
            'document_name': documentName,
            'page_location': window.location.href
        });
    }
}

// Función para crear efecto ripple en botones
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    // Asegurar que el elemento padre tenga posición relativa
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Aplicar efecto ripple a botones
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn-ingresa, .btn-ingresa-secondary')) {
        createRippleEffect(e.target, e);
    }
});

// Lazy loading para imágenes (si se necesita en el futuro)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página de Información Financiera:', e.error);
    showNotification('Se ha producido un error. Por favor, recarga la página.', 'error');
});

// Funciones de utilidad
const Utils = {
    // Debounce para eventos que se ejecutan frecuentemente
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para limitar ejecución de funciones
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
    
    // Detectar dispositivo móvil
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Formatear números como moneda
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    },
    
    // Formatear fechas
    formatDate: function(date) {
        return new Intl.DateTimeFormat('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
};

// Optimización de rendimiento con throttle para scroll
window.addEventListener('scroll', Utils.throttle(function() {
    // Aquí se pueden agregar funciones que dependan del scroll
    updateScrollProgress();
}, 16)); // ~60fps

// Función para mostrar progreso de scroll (opcional)
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Se puede usar para mostrar una barra de progreso
    // console.log(`Scroll progress: ${scrollPercent}%`);
}

// Manejo de redimensión de ventana
window.addEventListener('resize', Utils.debounce(function() {
    // Reajustar elementos responsive
    const isMobile = Utils.isMobile();
    document.body.classList.toggle('mobile-view', isMobile);
    
    // Reinicializar menú responsive si es necesario
    if (isMobile) {
        initResponsiveMenu();
    }
}, 250));

// Inicialización adicional cuando todo el contenido está cargado
window.addEventListener('load', function() {
    // Inicializar lazy loading si hay imágenes con data-src
    if (document.querySelectorAll('img[data-src]').length > 0) {
        initLazyLoading();
    }
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('Información Financiera cargada correctamente', 'success');
    }, 500);
    
    // Precargar recursos importantes (opcional)
    preloadCriticalResources();
});

// Función para precargar recursos críticos
function preloadCriticalResources() {
    const criticalImages = [
        '../imagenes/index/logo-bogota-interno.png',
        '../imagenes/informacionFinanciera/informacion-financiera.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Exportar funciones para uso global si es necesario
window.InformacionFinanciera = {
    showNotification,
    Utils,
    filterContent: window.filterFinancialContent
};

// Agregar keyframes para animaciones al CSS dinámicamente
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
`;
document.head.appendChild(animationStyle);
