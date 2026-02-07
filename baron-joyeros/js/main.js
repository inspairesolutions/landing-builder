/**
 * Barón Joyeros - JavaScript Principal
 * Joyería de lujo en Alcobendas, Madrid
 */

(function() {
    'use strict';

    // ===========================================
    // UTILIDADES
    // ===========================================

    /**
     * Debounce function para optimizar eventos frecuentes
     */
    function debounce(func, wait = 10) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * Throttle function para limitar llamadas
     */
    function throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===========================================
    // NAVEGACIÓN
    // ===========================================

    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    /**
     * Header scroll effect
     */
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.toggle('nav__menu--open');
        navToggle.classList.toggle('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Event listeners para navegación
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--open')) {
                closeMobileMenu();
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', throttle(handleHeaderScroll, 50));
    handleHeaderScroll(); // Check on load

    // ===========================================
    // LAZY LOADING DE IMÁGENES
    // ===========================================

    /**
     * Lazy load images using Intersection Observer
     */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    // ===========================================
    // ANIMACIONES AL SCROLL
    // ===========================================

    /**
     * Animate elements on scroll using Intersection Observer
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1
            });

            animatedElements.forEach(el => animationObserver.observe(el));
        } else {
            // Fallback: show all elements
            animatedElements.forEach(el => el.classList.add('visible'));
        }
    }

    // ===========================================
    // SLIDER DE TESTIMONIOS
    // ===========================================

    function initTestimonialsSlider() {
        const slider = document.getElementById('testimonialsSlider');
        if (!slider) return;

        const track = slider.querySelector('.testimonials-track');
        const dots = slider.querySelectorAll('.testimonials-dot');
        const testimonials = slider.querySelectorAll('.testimonial');

        if (!track || !testimonials.length) return;

        let currentIndex = 0;
        let autoplayInterval;

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${index * 100}%)`;

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('testimonials-dot--active', i === index);
                dot.setAttribute('aria-selected', i === index);
            });
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            goToSlide(nextIndex);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoplay();
                startAutoplay();
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left - next
                    const nextIndex = (currentIndex + 1) % testimonials.length;
                    goToSlide(nextIndex);
                } else {
                    // Swipe right - prev
                    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                    goToSlide(prevIndex);
                }
            }
        }

        // Start autoplay
        startAutoplay();
    }

    // ===========================================
    // FILTROS DE GALERÍA
    // ===========================================

    function initGalleryFilters() {
        const filters = document.querySelectorAll('.gallery-filter');
        const items = document.querySelectorAll('.gallery-item');

        if (!filters.length || !items.length) return;

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.filter;

                // Update active filter
                filters.forEach(f => f.classList.remove('gallery-filter--active'));
                filter.classList.add('gallery-filter--active');

                // Filter items
                items.forEach(item => {
                    const itemCategory = item.dataset.category;
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = '';
                        setTimeout(() => item.classList.add('visible'), 10);
                    } else {
                        item.classList.remove('visible');
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===========================================
    // LIGHTBOX
    // ===========================================

    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const lightboxImage = lightbox.querySelector('.lightbox__image');
        const closeBtn = lightbox.querySelector('.lightbox__close');
        const prevBtn = lightbox.querySelector('.lightbox__prev');
        const nextBtn = lightbox.querySelector('.lightbox__next');

        const galleryItems = document.querySelectorAll('.gallery-item');
        let currentImageIndex = 0;
        let images = [];

        function updateImages() {
            images = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img'));
        }

        function openLightbox(index) {
            updateImages();
            currentImageIndex = index;
            const img = images[index];
            lightboxImage.src = img.src || img.dataset.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('lightbox--open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('lightbox--open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function showPrev() {
            updateImages();
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            const img = images[currentImageIndex];
            lightboxImage.src = img.src || img.dataset.src;
            lightboxImage.alt = img.alt;
        }

        function showNext() {
            updateImages();
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const img = images[currentImageIndex];
            lightboxImage.src = img.src || img.dataset.src;
            lightboxImage.alt = img.alt;
        }

        // Click on gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        // Close button
        closeBtn.addEventListener('click', closeLightbox);

        // Navigation buttons
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('lightbox--open')) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrev();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        });
    }

    // ===========================================
    // FORMULARIO DE CONTACTO
    // ===========================================

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const formSuccess = document.getElementById('formSuccess');

        /**
         * Validate email format
         */
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Show error message
         */
        function showError(input, message) {
            const errorElement = document.getElementById(input.id + 'Error');
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }

        /**
         * Clear error message
         */
        function clearError(input) {
            const errorElement = document.getElementById(input.id + 'Error');
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }

        /**
         * Validate single field
         */
        function validateField(input) {
            const value = input.value.trim();

            // Required validation
            if (input.required && !value) {
                showError(input, 'Este campo es obligatorio');
                return false;
            }

            // Email validation
            if (input.type === 'email' && value && !isValidEmail(value)) {
                showError(input, 'Por favor, introduce un email válido');
                return false;
            }

            clearError(input);
            return true;
        }

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            // Check privacy checkbox
            const privacidad = document.getElementById('privacidad');
            if (privacidad && !privacidad.checked) {
                showError(privacidad, 'Debes aceptar la política de privacidad');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                // Simulate API call
                setTimeout(() => {
                    form.style.display = 'none';
                    formSuccess.style.display = 'block';

                    // Reset form
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                }, 1500);
            }
        });
    }

    // ===========================================
    // SMOOTH SCROLL PARA ANCHOR LINKS
    // ===========================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===========================================
    // INICIALIZACIÓN
    // ===========================================

    function init() {
        initLazyLoading();
        initScrollAnimations();
        initTestimonialsSlider();
        initGalleryFilters();
        initLightbox();
        initContactForm();
        initSmoothScroll();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
