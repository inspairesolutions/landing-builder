/**
 * BARÓN JOYEROS - Main JavaScript
 * Handles navigation, animations, form validation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initHeader();
  initMobileNav();
  initRevealAnimations();
  initLazyLoading();
  initContactForm();
  initGalleryLightbox();
  initGalleryFilter();
  initSmoothScroll();
});

/**
 * Header Scroll Effect
 * Adds 'scrolled' class when page is scrolled
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const scrollThreshold = 50;

  function updateHeader() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Initial check
  updateHeader();

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Reveal Animations on Scroll
 * Uses Intersection Observer for performance
 */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after revealing
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

/**
 * Lazy Loading Images
 * Native lazy loading with fallback
 */
function initLazyLoading() {
  // Check for native lazy loading support
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Contact Form Validation
 */
function initContactForm() {
  const form = document.querySelector('.contact-form form');

  if (!form) return;

  const validators = {
    nombre: {
      validate: (value) => value.trim().length >= 2,
      message: 'Por favor, introduce tu nombre (mínimo 2 caracteres)'
    },
    email: {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Por favor, introduce un email válido'
    },
    telefono: {
      validate: (value) => value === '' || /^[0-9+\s()-]{9,}$/.test(value),
      message: 'Por favor, introduce un teléfono válido'
    },
    mensaje: {
      validate: (value) => value.trim().length >= 10,
      message: 'Por favor, escribe un mensaje (mínimo 10 caracteres)'
    }
  };

  // Real-time validation
  Object.keys(validators).forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    field.addEventListener('blur', () => {
      validateField(field, validators[fieldName]);
    });

    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group && group.classList.contains('form-group--error')) {
        validateField(field, validators[fieldName]);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate all fields
    Object.keys(validators).forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field && !validateField(field, validators[fieldName])) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show success message
      showFormMessage(form, 'success', '¡Gracias por tu mensaje! Te contactaremos pronto.');
      form.reset();
      
      // In a real scenario, you would send the data to a server here
      // sendFormData(form);
    } else {
      showFormMessage(form, 'error', 'Por favor, corrige los errores en el formulario.');
    }
  });
}

function validateField(field, validator) {
  const group = field.closest('.form-group');
  if (!group) return true;

  const value = field.value;
  const isValid = validator.validate(value);

  // Remove existing error
  const existingError = group.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }

  if (!isValid) {
    group.classList.add('form-group--error');
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = validator.message;
    group.appendChild(error);
  } else {
    group.classList.remove('form-group--error');
  }

  return isValid;
}

function showFormMessage(form, type, message) {
  // Remove existing message
  const existingMessage = form.parentElement.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message--${type}`;
  messageEl.innerHTML = `
    <p>${message}</p>
  `;
  
  // Style the message
  messageEl.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
    background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
    border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
  `;

  form.after(messageEl);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageEl.remove();
  }, 5000);
}

/**
 * Gallery Lightbox
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length === 0) return;

  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Cerrar">&times;</button>
    <div class="lightbox__content">
      <img src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox__close');

  // Open lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Gallery Filter
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter__btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter items
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;

      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
