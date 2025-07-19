// Certificado de Accionista JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeValidation();
    initializeTooltips();
});

// Inicializar formulario
function initializeForm() {
    const form = document.querySelector('.certificate-form');
    const submitBtn = document.querySelector('.btn-consultar');
    
    if (form && submitBtn) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Agregar event listeners para validación en tiempo real
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', validateField);
            input.addEventListener('blur', validateField);
            input.addEventListener('change', validateField);
        });
    }
}

// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-consultar');
    
    // Validar todos los campos antes de enviar
    if (!validateForm(form)) {
        showNotification('Por favor, complete todos los campos requeridos correctamente.', 'error');
        return;
    }
    
    // Mostrar estado de carga
    showLoadingState(submitBtn);
    
    // Obtener datos del formulario
    const formData = {
        documentType: form.documentType.value,
        documentNumber: form.documentNumber.value.trim(),
        accountNumber: form.accountNumber.value.trim()
    };
    
    // Simular consulta al servidor
    simulateServerRequest(formData)
        .then(response => {
            hideLoadingState(submitBtn);
            if (response.success) {
                showNotification('Consulta realizada exitosamente. Descargando certificado...', 'success');
                // Aquí se integraría con el backend real
                setTimeout(() => {
                    showNotification('Su certificado ha sido generado y descargado.', 'success');
                }, 2000);
            } else {
                showNotification(response.message, 'error');
            }
        })
        .catch(error => {
            hideLoadingState(submitBtn);
            showNotification('Error en la consulta. Por favor, intente nuevamente.', 'error');
            console.error('Error:', error);
        });
}

// Simular petición al servidor
function simulateServerRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simular validación de datos
            if (data.documentNumber.length < 5) {
                resolve({ success: false, message: 'El número de documento debe tener al menos 5 dígitos.' });
                return;
            }
            
            if (data.accountNumber.length < 8) {
                resolve({ success: false, message: 'El número de cuenta inversionista debe tener al menos 8 dígitos.' });
                return;
            }
            
            // Simular éxito
            resolve({ success: true, message: 'Certificado encontrado y generado exitosamente.' });
        }, 2000);
    });
}

// Validar formulario completo
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validar campo individual
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Limpiar estados anteriores
    clearFieldError(field);
    
    // Validaciones específicas por campo
    switch (field.name) {
        case 'documentType':
            if (!value) {
                message = 'Debe seleccionar un tipo de documento.';
                isValid = false;
            }
            break;
            
        case 'documentNumber':
            if (!value) {
                message = 'El número de documento es requerido.';
                isValid = false;
            } else if (!/^\d+$/.test(value)) {
                message = 'El número de documento debe contener solo números.';
                isValid = false;
            } else if (value.length < 5 || value.length > 15) {
                message = 'El número de documento debe tener entre 5 y 15 dígitos.';
                isValid = false;
            }
            break;
            
        case 'accountNumber':
            if (!value) {
                message = 'El número de cuenta inversionista es requerido.';
                isValid = false;
            } else if (!/^\d+$/.test(value)) {
                message = 'El número de cuenta debe contener solo números.';
                isValid = false;
            } else if (value.length < 8 || value.length > 20) {
                message = 'El número de cuenta debe tener entre 8 y 20 dígitos.';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

// Mostrar error en campo
function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    field.style.backgroundColor = '#fdf2f2';
    
    // Remover mensaje anterior si existe
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Agregar nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error en campo
function clearFieldError(field) {
    field.style.borderColor = '#ccc';
    field.style.backgroundColor = '#ffffff';
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Estado de carga del botón
function showLoadingState(button) {
    button.disabled = true;
    button.classList.add('loading');
    button.setAttribute('data-original-text', button.textContent);
    button.textContent = 'Consultando...';
}

function hideLoadingState(button) {
    button.disabled = false;
    button.classList.remove('loading');
    button.textContent = button.getAttribute('data-original-text') || 'Consultar';
}

// Inicializar tooltips
function initializeTooltips() {
    const infoIcon = document.querySelector('.info-icon');
    if (infoIcon) {
        infoIcon.addEventListener('mouseenter', showTooltip);
        infoIcon.addEventListener('mouseleave', hideTooltip);
        infoIcon.addEventListener('click', showTooltip);
    }
}

function showTooltip(e) {
    const icon = e.target;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'Número de cuenta proporcionado por el Banco de Bogotá para operaciones de inversión.';
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        max-width: 200px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        line-height: 1.4;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = icon.getBoundingClientRect();
    tooltip.style.top = (rect.bottom + 5) + 'px';
    tooltip.style.left = (rect.left - tooltip.offsetWidth / 2) + 'px';
    
    icon.tooltip = tooltip;
}

function hideTooltip(e) {
    const tooltip = e.target.tooltip;
    if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
    }
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificación anterior si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 0.9rem;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación con animación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Formatear números mientras el usuario escribe
function formatNumberInput(input) {
    input.addEventListener('input', function(e) {
        // Remover caracteres no numéricos
        let value = e.target.value.replace(/\D/g, '');
        
        // Limitar longitud según el tipo de campo
        const maxLength = e.target.name === 'documentNumber' ? 15 : 20;
        if (value.length > maxLength) {
            value = value.substring(0, maxLength);
        }
        
        e.target.value = value;
    });
}

// Inicializar formateo de números
document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('input[name="documentNumber"], input[name="accountNumber"]');
    numberInputs.forEach(formatNumberInput);
});

// Prevenir envío múltiple del formulario
let isSubmitting = false;

document.addEventListener('submit', function(e) {
    if (isSubmitting) {
        e.preventDefault();
        return false;
    }
    
    if (e.target.classList.contains('certificate-form')) {
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    }
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en certificado de accionista:', e.error);
    // Solo registrar el error en consola, sin mostrar popup al usuario
});

// Auto-focus al primer campo
document.addEventListener('DOMContentLoaded', function() {
    const firstField = document.querySelector('#documentType');
    if (firstField) {
        setTimeout(() => {
            firstField.focus();
        }, 500);
    }
});
