// Banco de Bogotá - Información Relevante
// JavaScript para interactividad de la página

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialización de componentes
    initNavigation();
    initSecondaryNavigation();
    initYearTabs();
    initTableInteractions();
    initFilterButtons();
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

// Pestañas de años
function initYearTabs() {
    const yearTabs = document.querySelectorAll('.year-tab');
    
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todas las pestañas
            yearTabs.forEach(t => t.classList.remove('active'));
            
            // Agregar clase active a la pestaña clickeada
            this.classList.add('active');
            
            const selectedYear = this.textContent;
            console.log(`Año seleccionado: ${selectedYear}`);
            
            // Mostrar notificación
            showNotification(`Cargando información de ${selectedYear}...`, 'info');
            
            // Simular carga de datos
            setTimeout(() => {
                filterTableByYear(selectedYear);
                showNotification(`Información de ${selectedYear} cargada`, 'success');
            }, 800);
            
            // Efecto de animación en las filas
            animateTableRows();
        });

        // Efecto hover
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0,77,159,0.2)';
            }
        });

        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// Interacciones de la tabla
function initTableInteractions() {
    const tableRows = document.querySelectorAll('.table-row');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    // Efectos hover en filas
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
        
        // Click en la fila para expandir información (opcional)
        row.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                // Toggle de clase expandida
                this.classList.toggle('expanded');
                
                // Aquí se podría mostrar más información
                const summary = this.querySelector('.col-summary');
                if (this.classList.contains('expanded')) {
                    summary.style.maxHeight = 'none';
                    summary.style.webkitLineClamp = 'unset';
                } else {
                    summary.style.maxHeight = '60px';
                    summary.style.webkitLineClamp = '3';
                }
            }
        });
    });
    
    // Botones de visualizar
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const row = this.closest('.table-row');
            const fecha = row.querySelector('.col-date').textContent;
            const tema = row.querySelector('.col-type').textContent;
            
            // Efecto de carga en el botón
            const originalText = this.innerHTML;
            this.innerHTML = '⏳ Cargando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification(`Documento del ${fecha} visualizado`, 'success');
                
                // Aquí se implementaría la apertura del documento
                console.log(`Visualizando documento: ${tema} - ${fecha}`);
            }, 1500);
            
            // Tracking de interacción
            trackDocumentView(tema, fecha);
        });
        
        // Efecto ripple
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

// Botones de filtro
function initFilterButtons() {
    const filterButton = document.querySelector('.btn-filter');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            // Mostrar modal de años anteriores o implementar lógica de filtro
            showNotification('Funcionalidad de filtro por años anteriores', 'info');
            
            // Aquí se implementaría un modal o dropdown con más opciones de filtro
            console.log('Abriendo filtros avanzados...');
        });
    }
}

// Filtrar tabla por año
function filterTableByYear(year) {
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        const fecha = row.querySelector('.col-date').textContent;
        const rowYear = fecha.split('/')[2]; // Extraer año de la fecha
        
        if (rowYear === year || year === '2025') {
            row.style.display = 'grid';
            row.style.opacity = '0';
            
            // Animación de aparición
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, 100);
        } else {
            row.style.opacity = '0';
            setTimeout(() => {
                row.style.display = 'none';
            }, 300);
        }
    });
}

// Animar filas de la tabla
function animateTableRows() {
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
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
        '.table-row, .year-tabs, .content-header, .footer-section'
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

// Funcionalidad de búsqueda
function initSearchFunctionality() {
    // Esta función se puede expandir para agregar búsqueda en la tabla
    function searchTable(searchTerm) {
        const tableRows = document.querySelectorAll('.table-row');
        
        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const parentTable = row.closest('.information-table');
            
            if (rowText.includes(searchTerm.toLowerCase()) || searchTerm === '') {
                row.style.display = 'grid';
                row.style.opacity = '1';
            } else {
                row.style.display = 'none';
                row.style.opacity = '0';
            }
        });
    }
    
    // Exportar función para uso futuro
    window.searchRelevantInformation = searchTable;
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

// Tracking de interacciones
function trackDocumentView(tema, fecha) {
    console.log(`Documento visualizado: ${tema} - ${fecha}`);
    
    // Ejemplo de implementación con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'document_view', {
            'document_type': tema,
            'document_date': fecha,
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
    if (e.target.matches('button, .btn-ingresa, .btn-ingresa-secondary, .btn-filter, .year-tab')) {
        createRippleEffect(e.target, e);
    }
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página de Información Relevante:', e.error);
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
    
    // Formatear fechas
    formatDate: function(date) {
        return new Intl.DateTimeFormat('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(date));
    },
    
    // Exportar tabla como CSV
    exportTableToCSV: function() {
        const rows = document.querySelectorAll('.table-row');
        let csvContent = 'Fecha,Tema,Resumen\n';
        
        rows.forEach(row => {
            const fecha = row.querySelector('.col-date').textContent;
            const tema = row.querySelector('.col-type').textContent;
            const resumen = row.querySelector('.col-summary').textContent.replace(/,/g, ';');
            
            csvContent += `"${fecha}","${tema}","${resumen}"\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'informacion_relevante.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }
};

// Optimización de rendimiento con throttle para scroll
window.addEventListener('scroll', Utils.throttle(function() {
    updateScrollProgress();
}, 16)); // ~60fps

// Función para mostrar progreso de scroll
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
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('Información Relevante cargada correctamente', 'success');
    }, 500);
    
    // Animar filas iniciales
    animateTableRows();
    
    // Precargar recursos importantes
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
window.InformacionRelevante = {
    showNotification,
    Utils,
    searchTable: window.searchRelevantInformation,
    filterByYear: filterTableByYear
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
    
    .table-row {
        transition: all 0.3s ease;
    }
    
    .table-row.expanded .col-summary {
        transition: max-height 0.3s ease;
    }
`;
document.head.appendChild(animationStyle);
