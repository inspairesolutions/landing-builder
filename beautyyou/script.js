/**
 * BeautyYou - Clinical Elegance
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize all modules
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
});

/**
 * Header scroll behavior
 * Adds 'header--scrolled' class when user scrolls down
 */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', nav.classList.contains('active'));

        // Toggle icon
        const icon = toggle.querySelector('svg');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        }
    });

    // Close menu when clicking a link
    nav.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('svg');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('svg');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL without triggering scroll
            history.pushState(null, null, targetId);
        });
    });
}

/**
 * Scroll-triggered fade-in animations
 * Uses Intersection Observer for performance
 */
function initScrollAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(
        '.differentiator-card, ' +
        '.treatment-card, ' +
        '.before-after__item, ' +
        '.process__step, ' +
        '.section-header, ' +
        '.certification__content, ' +
        '.about__content, ' +
        '.location__content'
    );

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add stagger class for grouped items
        if (el.classList.contains('differentiator-card') ||
            el.classList.contains('treatment-card') ||
            el.classList.contains('before-after__item') ||
            el.classList.contains('process__step')) {
            const staggerIndex = (index % 6) + 1;
            el.classList.add(`stagger-${staggerIndex}`);
        }
    });

    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Subtle parallax effect on hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // Only apply parallax when hero is in view
        if (scrollY < heroHeight) {
            const translateY = scrollY * 0.3;
            hero.style.backgroundPositionY = `calc(50% + ${translateY}px)`;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Lazy load images
 * Native lazy loading fallback for older browsers
 */
function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Form validation (if forms are added later)
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
            }
        }

        // Phone validation (Spanish format)
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[6789]\d{8}$/;
            const cleanPhone = field.value.replace(/\s/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                isValid = false;
                field.classList.add('error');
            }
        }
    });

    return isValid;
}

/**
 * Track CTA clicks (analytics ready)
 */
function trackCTAClick(ctaName, destination) {
    // Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'cta_name': ctaName,
            'destination': destination
        });
    }

    // Console log for debugging
    console.log(`CTA Click: ${ctaName} -> ${destination}`);
}

// Add tracking to CTA buttons
document.querySelectorAll('.btn--primary, .btn--secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const ctaText = this.textContent.trim();
        const destination = this.getAttribute('href');
        trackCTAClick(ctaText, destination);
    });
});

/**
 * Cookie consent (basic implementation)
 */
function initCookieConsent() {
    const consentKey = 'beautyyou_cookie_consent';

    if (localStorage.getItem(consentKey)) {
        return; // Already consented
    }

    // Create consent banner
    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.innerHTML = `
        <div class="cookie-consent__content">
            <p>Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra
            <a href="/politica-cookies">política de cookies</a>.</p>
            <button class="btn btn--primary btn--small" id="accept-cookies">Aceptar</button>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem(consentKey, 'true');
        banner.remove();
    });
}

/**
 * Performance monitoring
 */
function reportWebVitals() {
    if ('web-vital' in window) {
        // Report Core Web Vitals if library is loaded
        webVitals.getCLS(console.log);
        webVitals.getFID(console.log);
        webVitals.getLCP(console.log);
    }
}
