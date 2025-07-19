// Sostenibilidad.js - Funcionalidad para la página de sostenibilidad

document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeHeroNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeMobileMenu();
});

// Inicializar navegación del hero
function initializeHeroNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    
    // Agregar event listeners a los puntos de navegación
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remover clase active de todos los dots
            navDots.forEach(d => d.classList.remove('active'));
            // Agregar clase active al dot clickeado
            dot.classList.add('active');
            currentSlide = index;
        });
    });
    
    // Auto-cambio cada 8 segundos
    setInterval(() => {
        navDots.forEach(d => d.classList.remove('active'));
        currentSlide = (currentSlide + 1) % navDots.length;
        navDots[currentSlide].classList.add('active');
    }, 8000);
}

// Inicializar el slider del marco de actuación
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Datos de ejemplo para las diferentes slides
    const slidesData = [
        {
            logo: '../imagenes/sostenibilidad/logo-the-global-compact.svg',
            title: 'PACTO GLOBAL',
            description: 'Iniciativa que promueve el compromiso del sector privado, público y sociedad civil a a alinear sus estrategias y operaciones con diez principios universalmente aceptados en cuatro áreas temáticas: Derechos Humanos, Estándares Laborales, Medio Ambiente y Lucha Contra la Corrupción, así como contribuir a la consecución de los Objetivos de Desarrollo Sostenible (ODS).'
        },
        {
            logo: '../imagenes/sostenibilidad/logo-sustainable-development-goals.svg',
            title: 'OBJETIVOS DE DESARROLLO SOSTENIBLE',
            description: 'Los Objetivos de Desarrollo Sostenible, también conocidos como Objetivos Mundiales, se adoptaron por todos los Estados Miembros en 2015 como un llamado universal para poner fin a la pobreza, proteger el planeta y garantizar que todas las personas gocen de paz y prosperidad para 2030. Son 17 objetivos que constan de 169 metas.'
        },
        {
            logo: '../imagenes/sostenibilidad/principios-de-banca-responsable.jpg',
            title: 'PACTO GLOBAL DE NACIONES UNIDAS',
            description: 'Como signatarios del Pacto Global de la ONU, nos comprometemos a alinear nuestras estrategias y operaciones con diez principios universales sobre derechos humanos, normas laborales, medio ambiente y anti-corrupción.'
        },
        {
            logo: '../imagenes/sostenibilidad/principios-de-banca-responsable.jpg',
            title: 'Principios de Banca Responsable',
            description: 'Los Principios de Banca Responsable impulsada por la Iniciativa Financiera del Programa de las Naciones Unidas para el Medio Ambiente -UNEP Fa corresponden a seis lineamientos para alinear el negocio bancario con objetivos a largo plazo, para integrar mejor los desafíos sociales y ambientales. Nos adherimos a los PRB en diciembre 2022.'
        },
        {
            logo: '../imagenes/sostenibilidad/logo-protocolo-verde.svg',
            title: 'ÍNDICE DE SOSTENIBILIDAD DOW JONES',
            description: 'El Índice de sostenibilidad Dow Jones es el índice más importante en materia de sostenibilidad y el principal referente a nivel mundial midiendo el desempeño en asuntos económicos, ambientales y sociales basado en el análisis de 600 variables para identificar y clasificar a las principales empresas sostenibles.'
        },
        {
            logo: '../imagenes/sostenibilidad/logo-protocolo-verde.svg',
            title: 'Protocolo Verde',
            description: 'Acuerdo voluntario entre el sector financiero y el gobierno nacional, que busca aunar esfuerzos para promover el desarrollo sostenible del país, y trabajar por la preservación ambiental y el uso sostenible de los recursos naturales. El Banco de Bogotá hace parte de este Protocolo desde el año 2013.'
        },
        {
            logo: '../imagenes/sostenibilidad/global-reporting-initiative.svg',
            title: 'ESTÁNDAR GLOBAL REPORTING INITIATIVE - GRI',
            description: 'Iniciativa voluntaria que creó el primer estándar mundial de lineamientos para la elaboración de memorias de sostenibilidad de aquellas compañías que desean evaluar su desempeño económico, ambiental y social. Nuestra Memoria Corporativa está alineada bajo este estándar de reporte.'
        }
    ];

    // Función para mostrar una slide específica
    function showSlide(index) {
        // Ocultar todas las slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover clase active de todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar la slide actual
        if (slides[0]) {
            slides[0].classList.add('active');
            updateSlideContent(slidesData[index]);
        }
        
        // Activar el dot correspondiente
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    // Función para actualizar el contenido de la slide
    function updateSlideContent(data) {
        const logoImg = document.querySelector('.framework-logo img');
        const title = document.querySelector('.framework-content h3');
        const description = document.querySelector('.framework-content p');
        
        if (logoImg) logoImg.src = data.logo;
        if (title) title.textContent = data.title;
        if (description) description.textContent = data.description;
    }

    // Agregar event listeners a los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-play del slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slidesData.length;
        showSlide(currentSlide);
    }, 5000);

    // Inicializar con la primera slide
    showSlide(0);
}

// Inicializar smooth scrolling para enlaces internos
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar animaciones de scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll(
        '.sustainability-pillars .pillar, .circular-model, .interest-groups, .right-content, .commitment-content, .framework-card'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Animación especial para los pilares del hero
    const pillars = document.querySelectorAll('.sustainability-pillars .pillar');
    pillars.forEach((pillar, index) => {
        pillar.style.opacity = '0';
        pillar.style.transform = 'translateY(30px)';
        pillar.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            pillar.style.opacity = '1';
            pillar.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });
}

// Inicializar menú móvil
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }
}

// Función para scroll suave hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón de scroll to top
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #004d9f 0%, #0066cc 100%);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
}

// Inicializar botón de scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Función para cargar más contenido dinámicamente
function loadMoreContent() {
    // Esta función puede ser expandida para cargar contenido adicional
    // por ejemplo, más información sobre sostenibilidad o casos de estudio
    console.log('Funcionalidad para cargar más contenido');
}

// Efectos de parallax para el hero
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        });
    }
}

// Contador animado para métricas (si se agregan)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 50);
        } else {
            counter.innerText = target;
        }
    });
}

// Validación de formularios (si se agregan)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
}

// Exportar funciones para uso global si es necesario
window.SostenibilidadApp = {
    scrollToTop,
    loadMoreContent,
    validateForm,
    animateCounters
};
