// Línea Ética JavaScript - Versión Simplificada
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar solo funcionalidades básicas
    initializeInteractiveElements();
    initializeAccessibility();
});

// Elementos interactivos básicos
function initializeInteractiveElements() {
    // Efecto hover para enlaces
    const links = document.querySelectorAll('.link-text, .report-link a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Efecto para íconos sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Confirmación para el enlace de la Línea Ética
    const ethicsLink = document.querySelector('.report-link a');
    if (ethicsLink) {
        ethicsLink.addEventListener('click', function(e) {
            const confirmation = confirm('¿Desea acceder a la Línea Ética del Grupo Aval?');
            if (!confirmation) {
                e.preventDefault();
            }
        });
    }
}

// Funciones de accesibilidad básicas
function initializeAccessibility() {
    // Navegación por teclado mejorada
    const focusableElements = document.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #0066cc';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Agregar indicadores visuales para enlaces externos
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('aria-label', link.textContent + ' (se abre en una nueva ventana)');
    });
}

// Función para mostrar notificaciones simples
function showNotification(message, type = 'info') {
    alert(message); // Versión simple sin animaciones
}

// Event listeners básicos
document.addEventListener('click', function(e) {
    if (e.target.matches('.report-link a')) {
        console.log('Click en Línea Ética');
    }
    
    if (e.target.matches('.social-icon')) {
        console.log('Click en red social');
    }
});

// Manejo de errores básico
window.addEventListener('error', function(e) {
    console.error('Error en Línea Ética:', e.error);
});
