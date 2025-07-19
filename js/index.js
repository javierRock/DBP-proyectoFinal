// Banco de Bogotá - Relación con el Inversionista
// JavaScript para interactividad de la página

document.addEventListener('DOMContentLoaded', function() {
    
    // Aplicar estilos de override primero
    applyDropdownOverrideStyles();
    
    // Inicialización de componentes
    initNavigation();
    initSecondaryNavigation(); // Nueva función
    initInfoCards();
    initSmoothScroll();
    initContactForm();
    initAnimations();
    initResponsiveMenu();
    initCardLinks(); // Nueva función para mejorar los enlaces de las cards
    initDropdownMenu(); // Inicializar el menú desplegable de productos
    
    // Debugging para verificar funcionamiento
    setTimeout(() => {
        const dropdowns = document.querySelectorAll('.dropdown');
        console.log(`✅ ${dropdowns.length} dropdowns encontrados e inicializados`);
        
        dropdowns.forEach((dropdown, index) => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                console.log(`Dropdown ${index + 1}: Z-index = ${menu.style.zIndex}`);
            }
        });
    }, 1000);

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

// Interactividad de las tarjetas de información
function initInfoCards() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        // Efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        // Click handler
        card.addEventListener('click', function(e) {
            // Prevenir que el click del enlace se propague
            if (e.target.tagName === 'A') {
                return;
            }
            
            // Remover clase active de todas las tarjetas
            infoCards.forEach(c => c.classList.remove('active'));
            
            // Agregar clase active a la tarjeta clickeada
            this.classList.add('active');
            
            // Efecto de pulso
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
            
            // Obtener el título de la tarjeta
            const cardTitle = this.querySelector('h3').textContent;
            console.log(`Tarjeta seleccionada: ${cardTitle}`);
            
            // Verificar si es la tarjeta de Información Financiera
            if (cardTitle.includes('Información Financiera')) {
                // Mostrar notificación de navegación
                showNotification('Redirigiendo a Información Financiera...', 'info');
                
                // Navegar a la página después de un breve delay
                setTimeout(() => {
                    window.location.href = 'informacionFinanciera.html';
                }, 800);
            } else {
                // Para otras tarjetas, mostrar notificación genérica
                showNotification(`Has seleccionado: ${cardTitle}`);
            }
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
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Formulario de contacto (si se implementa en el futuro)
function initContactForm() {
    // Validación de email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para manejar envío de formularios
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = formData.get('email');
            
            if (email && !validateEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío
            showNotification('Formulario enviado correctamente', 'success');
            this.reset();
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
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const elementsToAnimate = document.querySelectorAll(
        '.info-card, .text-section, .image-section, .contact-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Menú responsive
function initResponsiveMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    
    // Crear botón de menú hamburguesa
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    
    // Insertar botón en el header
    const headerTop = document.querySelector('.header-top');
    if (headerTop && window.innerWidth <= 768) {
        headerTop.appendChild(menuToggle);
    }
    
    // Toggle del menú
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        this.classList.toggle('active');
        
        // Cambiar aria-label
        const isOpen = nav.classList.contains('nav-open');
        this.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('nav-open');
            menuToggle.classList.remove('active');
        }
    });
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
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#0066cc'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
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
    
    // Auto-hide después de 5 segundos
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Efectos parallax suave
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .hero-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Contador animado para números
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
    // En producción, aquí se podría enviar el error a un servicio de logging
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
    
    // Obtener parámetros de URL
    getUrlParams: function() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
        return params;
    }
};

// Optimización de rendimiento con throttle para scroll
window.addEventListener('scroll', Utils.throttle(function() {
    // Aquí se pueden agregar funciones que dependan del scroll
    // Por ejemplo: actualizar progreso de lectura, efectos parallax, etc.
}, 16)); // ~60fps

// Manejo de redimensión de ventana
window.addEventListener('resize', Utils.debounce(function() {
    // Reajustar elementos responsive
    const isMobile = Utils.isMobile();
    document.body.classList.toggle('mobile-view', isMobile);
}, 250));

// Inicialización adicional cuando todo el contenido está cargado
window.addEventListener('load', function() {
    // Inicializar lazy loading
    initLazyLoading();
    
    // Inicializar parallax si no es móvil
    if (!Utils.isMobile()) {
        initParallax();
    }
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('Bienvenido a la Relación con el Inversionista del Banco de Bogotá', 'info');
    }, 1000);
});

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

            // Efecto de ripple
            createRippleEffect(this, e);
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
            // Simular ir hacia atrás o ir al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Efecto hover en la flecha
        navArrow.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-3px) scale(1.1)';
        });

        navArrow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    }

    // Botón secundario "Ingresa Seguro"
    const btnSecondary = document.querySelector('.btn-ingresa-secondary');
    if (btnSecondary) {
        btnSecondary.addEventListener('click', function(e) {
            createRippleEffect(this, e);
            // Aquí puedes agregar la funcionalidad de login
            showNotification('Redirigiendo al portal seguro...', 'info');
        });
    }
}

// Función para crear efecto ripple
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

// Agregar keyframes para el efecto ripple al CSS dinámicamente
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Función para mejorar los enlaces de las cards de información
function initCardLinks() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        const link = card.querySelector('.link');
        
        if (link) {
            // Agregar efecto de hover a toda la card
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(26, 58, 92, 0.15)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
            
            // Hacer toda la card clickeable
            card.addEventListener('click', function(e) {
                // Si ya se hizo clic en el enlace directo, no interferir
                if (e.target.tagName === 'A') return;
                
                const cardLink = this.querySelector('.link');
                if (cardLink) {
                    // Efecto visual de click
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-5px)';
                        // Navegar al enlace después del efecto
                        window.location.href = cardLink.href;
                    }, 150);
                }
            });
            
            // Mejorar el enlace específico
            link.addEventListener('click', function(e) {
                // Agregar efecto de carga
                const originalText = this.textContent;
                this.textContent = 'Cargando...';
                this.style.opacity = '0.7';
                
                // Restaurar después de un momento (simulando carga)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 500);
            });
        }
    });
}

// Exportar funciones para uso global si es necesario
window.BancoBogota = {
    showNotification,
    Utils
};

// Funcionalidad del menú desplegable mejorada para múltiples dropdowns
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Detectar si estamos en la página de información financiera
    const isInformacionFinanciera = window.location.pathname.includes('informacionFinanciera') || 
                                   document.title.includes('Información Financiera');
    
    const baseZIndex = isInformacionFinanciera ? 9999999 : 99999; // Z-index mucho más alto para información financiera
    
    console.log(`🔍 Página detectada: ${isInformacionFinanciera ? 'Información Financiera' : 'Otra página'}`);
    console.log(`📊 Z-index base: ${baseZIndex}`);
    
    dropdowns.forEach((dropdown, index) => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        if (!dropdown || !dropdownMenu) return;
        
        let hideTimeout;
        
        // Z-index extremadamente alto para información financiera
        const dropdownZIndex = baseZIndex + index;
        const menuZIndex = baseZIndex + index + 1000;
        
        dropdown.style.zIndex = dropdownZIndex.toString();
        dropdownMenu.style.zIndex = menuZIndex.toString();
        
        // Forzar estilos importantes para superposición garantizada
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.background = 'white';
        dropdownMenu.style.border = '2px solid #e0e0e0';
        dropdownMenu.style.borderTop = '3px solid #004d9f';
        dropdownMenu.style.boxShadow = '0 12px 28px rgba(0,0,0,0.3)';
        
        if (isInformacionFinanciera) {
            // Estilos adicionales para información financiera
            dropdownMenu.style.transform = 'translateZ(0)'; // Forzar GPU layer
            dropdown.style.transform = 'translateZ(0)';
        }
        
        // Mostrar menú al hacer hover
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
            
            // Ocultar otros dropdowns primero
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                    if (otherMenu) {
                        otherMenu.style.opacity = '0';
                        otherMenu.style.visibility = 'hidden';
                        otherMenu.style.transform = 'translateY(-15px)';
                        otherMenu.style.pointerEvents = 'none';
                        otherDropdown.classList.remove('active');
                    }
                }
            });
            
            // Z-index aún más alto al mostrar
            const activeZIndex = baseZIndex + 10000;
            dropdownMenu.style.zIndex = activeZIndex.toString();
            
            // Forzar estilos para asegurar visibilidad máxima
            dropdownMenu.style.position = 'absolute';
            dropdownMenu.style.top = '100%';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
            dropdownMenu.style.pointerEvents = 'auto';
            dropdownMenu.style.display = 'block';
            
            // Agregar clase activa
            dropdown.classList.add('active');
            
            console.log(`📱 Menú desplegado: ${dropdownToggle.textContent}, Z-index activo: ${activeZIndex}`);
        });
        
        // Ocultar menú al salir del hover
        dropdown.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-15px)';
                dropdownMenu.style.pointerEvents = 'none';
                
                // Remover clase activa
                dropdown.classList.remove('active');
                
                console.log(`🚪 Menú ocultado: ${dropdownToggle.textContent}`);
            }, 200);
        });
        
        // Prevenir que el menú se cierre al hacer hover sobre él
        dropdownMenu.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
        });
        
        dropdownMenu.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-15px)';
                dropdownMenu.style.pointerEvents = 'none';
                dropdown.classList.remove('active');
            }, 200);
        });
        
        // Agregar eventos a los enlaces del menú
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-links a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`🔗 Navegando a: ${this.textContent}`);
                
                // Cerrar el menú después del click
                setTimeout(() => {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                    dropdown.classList.remove('active');
                }, 300);
            });
        });
        
        // Asegurar consistencia de fuentes en elementos del dropdown
        const dropdownElements = dropdown.querySelectorAll('h3, a');
        dropdownElements.forEach(element => {
            if (element.tagName === 'H3') {
                element.style.fontFamily = 'inherit';
                element.style.color = '#004d9f';
                element.style.fontSize = '16px';
                element.style.fontWeight = '700';
            } else if (element.classList.contains('dropdown-toggle')) {
                element.style.fontFamily = 'inherit';
                element.style.color = '#333';
                element.style.fontSize = '14px';
                element.style.fontWeight = '600';
                element.style.textTransform = 'uppercase';
            } else if (element.closest('.dropdown-links')) {
                element.style.fontFamily = 'inherit';
                element.style.color = '#555';
                element.style.fontSize = '12px';
                element.style.fontWeight = '500';
                element.style.textTransform = 'none';
            }
        });
        
        console.log(`✅ Dropdown ${index + 1} configurado - Z-index: ${dropdownZIndex}/${menuZIndex}`);
    });
    
    console.log(`🎯 Total de ${dropdowns.length} menús desplegables inicializados correctamente`);
    
    // Debug específico para información financiera
    if (isInformacionFinanciera) {
        console.log('🏦 Configuración especial aplicada para Información Financiera');
        
        // Verificar elementos que puedan interferir
        setTimeout(() => {
            const potentialInterferences = document.querySelectorAll('[style*="z-index"], .secondary-nav, .hero');
            potentialInterferences.forEach((element, i) => {
                const computedStyle = window.getComputedStyle(element);
                console.log(`🔍 Elemento ${i}: ${element.className}, Z-index: ${computedStyle.zIndex}`);
            });
        }, 1000);
    }
}

// CSS dinámico para forzar la correcta superposición de dropdowns
function applyDropdownOverrideStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Forzar z-index y posicionamiento correcto para dropdowns */
        .dropdown-menu {
            position: absolute !important;
            z-index: 999999 !important;
            background: white !important;
            box-shadow: 0 12px 28px rgba(0,0,0,0.25) !important;
            border: 2px solid #e0e0e0 !important;
            border-top: 3px solid #004d9f !important;
        }
        
        .dropdown:hover .dropdown-menu {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
            z-index: 999999 !important;
        }
        
        /* Forzar header y navegación por encima */
        .header,
        .header-top,
        .main-nav,
        .dropdown {
            z-index: 1000000 !important;
        }
        
        /* Reducir z-index de elementos que puedan interferir */
        .secondary-nav {
            z-index: 50 !important;
        }
        
        /* Asegurar que el contenido esté por debajo */
        .hero,
        .financial-content,
        section,
        .container {
            z-index: 1 !important;
        }
        
        /* Consistencia tipográfica */
        .main-nav a,
        .dropdown-toggle {
            font-family: inherit !important;
            color: #333 !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            text-transform: uppercase !important;
        }
        
        .dropdown-links a {
            font-family: inherit !important;
            color: #555 !important;
            font-size: 12px !important;
            font-weight: 500 !important;
            text-transform: none !important;
        }
        
        .dropdown-section h3 {
            font-family: inherit !important;
            color: #004d9f !important;
            font-size: 16px !important;
            font-weight: 700 !important;
        }
        
        /* Fix específico para página de información financiera */
        body.informacion-financiera .dropdown-menu {
            z-index: 9999999 !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Estilos de override aplicados para dropdowns');
}
