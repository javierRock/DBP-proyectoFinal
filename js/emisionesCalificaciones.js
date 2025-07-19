// Banco de Bogotá - Emisiones, Calificaciones y Asamblea de Tenedores de Bonos
// JavaScript para interactividad de la página

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialización de componentes
    initNavigation();
    initSecondaryNavigation();
    initInfoItems();
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

// Inicializar elementos de información
function initInfoItems() {
    const infoItems = document.querySelectorAll('.info-item');
    const infoLinks = document.querySelectorAll('.info-link');
    
    // Efectos hover para items de información
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 35px rgba(0,77,159,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0,77,159,0.1)';
        });
        
        // Efecto de click en todo el item
        item.addEventListener('click', function(e) {
            // Si ya se hizo clic en el enlace directo, no interferir
            if (e.target.tagName === 'A') return;
            
            const link = this.querySelector('.info-link');
            if (link) {
                // Efecto visual de click
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px)';
                    // Simular click en el enlace
                    link.click();
                }, 150);
            }
        });
    });
    
    // Efectos especiales para enlaces de información
    infoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de carga
            const originalText = this.textContent;
            const icon = this.querySelector('::after') ? '' : ' →';
            
            this.textContent = 'Cargando...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Simular carga del documento
            setTimeout(() => {
                this.textContent = originalText + icon;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                
                // Aquí puedes agregar la lógica para abrir el documento
                showNotification('Documento cargado exitosamente', 'success');
                
            }, 1500);
        });
        
        // Efecto hover adicional
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
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
    
    // Botón "ir arriba" (se puede agregar si es necesario)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #004d9f;
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
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.info-section, .info-item');
    
    animatedElements.forEach((el, index) => {
        // Configurar estado inicial
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        observer.observe(el);
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
        mainNav.classList.toggle('nav-open');
        this.innerHTML = mainNav.classList.contains('nav-open') ? '✕' : '☰';
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('nav-open');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
            mainNav.classList.remove('nav-open');
            mobileMenuBtn.innerHTML = '☰';
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
    
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    
    notification.style.cssText = `
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
});

// Exportar funciones para uso global si es necesario
window.EmisionesCalificaciones = {
    showNotification,
    Utils
};
