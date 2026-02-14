/* ═══════════════════════════════════════════════════════════════
   LARA LLANO - Main JavaScript
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // Wait for DOM + Lucide icons
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }

        initHeader();
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initLightbox();
        initTestimonialsCarousel();
        initContactForm();
    });


    /* ─── HEADER ─────────────────────────────────────────── */
    function initHeader() {
        var header = document.getElementById('header');
        var lastScroll = 0;

        window.addEventListener('scroll', function () {
            var current = window.pageYOffset;
            if (current > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            lastScroll = current;
        }, { passive: true });

        // Active nav link based on scroll position
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.header__nav-link');

        window.addEventListener('scroll', function () {
            var scrollY = window.pageYOffset;
            sections.forEach(function (section) {
                var top = section.offsetTop - 120;
                var height = section.offsetHeight;
                var id = section.getAttribute('id');

                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('header__nav-link--active');
                        if (link.getAttribute('data-section') === id) {
                            link.classList.add('header__nav-link--active');
                        }
                    });
                }
            });
        }, { passive: true });
    }


    /* ─── MOBILE MENU ────────────────────────────────────── */
    function initMobileMenu() {
        var btn = document.getElementById('hamburgerBtn');
        var menu = document.getElementById('mobileMenu');
        var links = menu.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

        function toggleMenu() {
            var isOpen = menu.classList.contains('mobile-menu--open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            menu.classList.add('mobile-menu--open');
            menu.setAttribute('aria-hidden', 'false');
            btn.classList.add('header__hamburger--active');
            btn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            menu.classList.remove('mobile-menu--open');
            menu.setAttribute('aria-hidden', 'true');
            btn.classList.remove('header__hamburger--active');
            btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        btn.addEventListener('click', toggleMenu);

        links.forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        // Close on ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
                closeMenu();
            }
        });
    }


    /* ─── SMOOTH SCROLL ──────────────────────────────────── */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                var headerHeight = document.getElementById('header').offsetHeight;
                var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            });
        });
    }


    /* ─── SCROLL ANIMATIONS ──────────────────────────────── */
    function initScrollAnimations() {
        var elements = document.querySelectorAll('[data-animate]');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            elements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: show everything
            elements.forEach(function (el) {
                el.classList.add('animate-in');
            });
        }
    }


    /* ─── LIGHTBOX ───────────────────────────────────────── */
    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        var lightboxImg = lightbox.querySelector('.lightbox__img');
        var lightboxCaption = lightbox.querySelector('.lightbox__caption');
        var lightboxCounter = lightbox.querySelector('.lightbox__counter');
        var closeBtn = lightbox.querySelector('.lightbox__close');
        var prevBtn = lightbox.querySelector('.lightbox__prev');
        var nextBtn = lightbox.querySelector('.lightbox__next');

        var items = document.querySelectorAll('[data-lightbox]');
        var currentIndex = 0;
        var currentGroup = [];

        function openLightbox(group, index) {
            currentGroup = Array.from(document.querySelectorAll('[data-lightbox="' + group + '"]'));
            currentIndex = index;
            showImage();

            lightbox.hidden = false;
            // Force reflow then add class
            lightbox.offsetHeight;
            lightbox.classList.add('lightbox--open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';
            setTimeout(function () {
                lightbox.hidden = true;
            }, 300);
        }

        function showImage() {
            var item = currentGroup[currentIndex];
            var src = item.getAttribute('data-src');
            var caption = item.getAttribute('data-caption') || '';

            lightboxImg.src = src;
            lightboxImg.alt = caption;
            lightboxCaption.textContent = caption;
            lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentGroup.length;
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % currentGroup.length;
            showImage();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
            showImage();
        }

        items.forEach(function (item, i) {
            item.addEventListener('click', function () {
                var group = this.getAttribute('data-lightbox');
                var groupItems = Array.from(document.querySelectorAll('[data-lightbox="' + group + '"]'));
                var index = groupItems.indexOf(this);
                openLightbox(group, index);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Click outside image to close
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__content')) {
                closeLightbox();
            }
        });

        // Keyboard nav
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('lightbox--open')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }


    /* ─── TESTIMONIALS CAROUSEL ──────────────────────────── */
    function initTestimonialsCarousel() {
        var track = document.getElementById('testimonialsTrack');
        var prevBtn = document.getElementById('testimonialPrev');
        var nextBtn = document.getElementById('testimonialNext');
        var dotsContainer = document.getElementById('testimonialDots');
        var cards = track.querySelectorAll('.testimonial-card');
        var currentSlide = 0;
        var totalSlides = cards.length;
        var autoplayTimer;

        // Create dots
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement('button');
            dot.className = 'testimonials__dot' + (i === 0 ? ' testimonials__dot--active' : '');
            dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
        }

        var dots = dotsContainer.querySelectorAll('.testimonials__dot');

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

            dots.forEach(function (dot, i) {
                dot.classList.toggle('testimonials__dot--active', i === currentSlide);
            });
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }

        function startAutoplay() {
            autoplayTimer = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }

        nextBtn.addEventListener('click', function () {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });

        prevBtn.addEventListener('click', function () {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                stopAutoplay();
                goToSlide(parseInt(this.getAttribute('data-index')));
                startAutoplay();
            });
        });

        // Touch/swipe support
        var startX = 0;
        var isDragging = false;

        track.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoplay();
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            if (!isDragging) return;
            var endX = e.changedTouches[0].clientX;
            var diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            isDragging = false;
            startAutoplay();
        }, { passive: true });

        startAutoplay();
    }


    /* ─── CONTACT FORM ───────────────────────────────────── */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        var successMsg = document.getElementById('formSuccess');

        var validators = {
            name: function (value) {
                if (!value.trim()) return 'Por favor, introduce tu nombre';
                if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
                return '';
            },
            email: function (value) {
                if (!value.trim()) return 'Por favor, introduce tu email';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Introduce un email válido';
                return '';
            },
            service: function (value) {
                if (!value) return 'Por favor, selecciona un servicio';
                return '';
            },
            message: function (value) {
                if (!value.trim()) return 'Por favor, escribe tu mensaje';
                if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
                return '';
            }
        };

        function validateField(input) {
            var name = input.getAttribute('name');
            var validator = validators[name];
            if (!validator) return true;

            var error = validator(input.value);
            var errorEl = input.parentNode.querySelector('.contact-form__error');

            if (error) {
                input.classList.add('contact-form__input--error');
                if (errorEl) errorEl.textContent = error;
                return false;
            } else {
                input.classList.remove('contact-form__input--error');
                if (errorEl) errorEl.textContent = '';
                return true;
            }
        }

        // Real-time validation on blur
        form.querySelectorAll('.contact-form__input').forEach(function (input) {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                if (this.classList.contains('contact-form__input--error')) {
                    validateField(this);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var inputs = form.querySelectorAll('.contact-form__input[required]');
            var isValid = true;

            inputs.forEach(function (input) {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Focus first error
                var firstError = form.querySelector('.contact-form__input--error');
                if (firstError) firstError.focus();
                return;
            }

            // Simulate form submission
            var submitBtn = form.querySelector('.contact-form__submit');
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Enviando...';

            setTimeout(function () {
                form.style.display = 'none';
                successMsg.hidden = false;
                // Re-initialize lucide icons for the success message
                if (window.lucide) {
                    lucide.createIcons();
                }
            }, 1200);
        });
    }

})();
