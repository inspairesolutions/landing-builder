/* ═══════════════════════════════════════════════════════════════
   CLÍNICA ESTÉTICA NOVANORTE — Scripts
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Init Lucide Icons ─── */
  function initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     HEADER — Sticky + Shrink
     ═══════════════════════════════════════════════════════════════ */

  function initHeader() {
    var header = document.getElementById('header');
    var topBar = document.querySelector('.top-bar');
    if (!header) return;

    var scrollThreshold = 50;

    function handleScroll() {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > scrollThreshold) {
        header.classList.add('header--scrolled');
        if (topBar) topBar.style.transform = 'translateY(-100%)';
      } else {
        header.classList.remove('header--scrolled');
        if (topBar) topBar.style.transform = 'translateY(0)';
      }
    }

    if (topBar) {
      topBar.style.position = 'fixed';
      topBar.style.top = '0';
      topBar.style.left = '0';
      topBar.style.right = '0';
      topBar.style.transition = 'transform 0.3s ease';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ═══════════════════════════════════════════════════════════════
     DROPDOWN MENUS
     ═══════════════════════════════════════════════════════════════ */

  function initDropdowns() {
    var dropdownButtons = document.querySelectorAll('.nav__link--dropdown');

    dropdownButtons.forEach(function (btn) {
      var dropdown = btn.nextElementSibling;
      if (!dropdown) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          dropdown.setAttribute('aria-hidden', 'false');
          dropdown.classList.add('dropdown--visible');
        }
      });

      btn.addEventListener('mouseenter', function () {
        closeAllDropdowns();
        btn.setAttribute('aria-expanded', 'true');
        dropdown.setAttribute('aria-hidden', 'false');
        dropdown.classList.add('dropdown--visible');
      });

      var navItem = btn.closest('.nav__item');
      if (navItem) {
        navItem.addEventListener('mouseleave', function () {
          btn.setAttribute('aria-expanded', 'false');
          dropdown.setAttribute('aria-hidden', 'true');
          dropdown.classList.remove('dropdown--visible');
        });
      }
    });

    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllDropdowns();
    });

    function closeAllDropdowns() {
      dropdownButtons.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        var dd = b.nextElementSibling;
        if (dd) {
          dd.setAttribute('aria-hidden', 'true');
          dd.classList.remove('dropdown--visible');
        }
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════════════════════════════ */

  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.contains('hamburger--active');
      hamburger.classList.toggle('hamburger--active');
      mobileMenu.classList.toggle('mobile-menu--open');
      hamburger.setAttribute('aria-expanded', !isOpen);
      mobileMenu.setAttribute('aria-hidden', isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('hamburger--active');
        mobileMenu.classList.remove('mobile-menu--open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SCROLL REVEAL (IntersectionObserver)
     ═══════════════════════════════════════════════════════════════ */

  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) { el.classList.add('reveal--visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) { observer.observe(el); });
  }

  /* ═══════════════════════════════════════════════════════════════
     COUNTER ANIMATION
     ═══════════════════════════════════════════════════════════════ */

  function initCounters() {
    var counters = document.querySelectorAll('.stat__number[data-target]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { finalizeCounter(el); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    function finalizeCounter(el) {
      var target = el.getAttribute('data-target');
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + target + suffix;
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     TESTIMONIALS SLIDER (Mobile)
     ═══════════════════════════════════════════════════════════════ */

  function initTestimonialsSlider() {
    var slider = document.getElementById('testimonios-slider');
    var dotsContainer = document.getElementById('testimonios-dots');
    if (!slider || !dotsContainer) return;

    var slides = slider.querySelectorAll('.testimonio');
    var total = slides.length;
    var currentIndex = 0;
    var autoPlayTimer = null;

    function createDots() {
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'testimonios__dot' + (i === 0 ? ' testimonios__dot--active' : '');
        dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function () {
          goTo(parseInt(this.dataset.index, 10));
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      var dots = dotsContainer.querySelectorAll('.testimonios__dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('testimonios__dot--active', i === currentIndex);
      });
    }

    function goTo(index) {
      currentIndex = index;
      slider.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' });
      updateDots();
      resetAutoPlay();
    }

    function autoPlay() {
      autoPlayTimer = setInterval(function () {
        currentIndex = (currentIndex + 1) % total;
        goTo(currentIndex);
      }, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlay();
    }

    slider.addEventListener('scroll', function () {
      var scrollPos = slider.scrollLeft;
      var slideWidth = slider.offsetWidth;
      var newIndex = Math.round(scrollPos / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < total) {
        currentIndex = newIndex;
        updateDots();
      }
    }, { passive: true });

    var isMobile = window.matchMedia('(max-width: 767px)');

    function setup() {
      if (isMobile.matches) {
        createDots();
        autoPlay();
      }
    }

    function teardown() {
      dotsContainer.innerHTML = '';
      clearInterval(autoPlayTimer);
    }

    if (isMobile.matches) setup();

    isMobile.addEventListener('change', function (e) {
      teardown();
      if (e.matches) setup();
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     CONTACT FORM VALIDATION
     ═══════════════════════════════════════════════════════════════ */

  function initContactForm() {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      form.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });

      var name = form.querySelector('#contact-name');
      var phone = form.querySelector('#contact-phone');
      var privacy = form.querySelector('#contact-privacy');
      var valid = true;

      if (!name.value.trim()) { name.classList.add('error'); valid = false; }
      if (!phone.value.trim() || phone.value.trim().length < 6) { phone.classList.add('error'); valid = false; }
      if (!privacy.checked) { privacy.classList.add('error'); valid = false; }

      if (!valid) return;

      form.querySelector('button[type="submit"]').disabled = true;
      form.querySelector('button[type="submit"]').textContent = 'Enviando...';

      setTimeout(function () {
        form.style.display = 'none';
        success.hidden = false;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 800);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SMOOTH SCROLL for anchors
     ═══════════════════════════════════════════════════════════════ */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 0;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     INITIALIZE ALL
     ═══════════════════════════════════════════════════════════════ */

  function init() {
    initIcons();
    initHeader();
    initDropdowns();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initTestimonialsSlider();
    initContactForm();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
