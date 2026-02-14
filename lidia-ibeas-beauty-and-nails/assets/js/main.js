/* ═══════════════════════════════════════════════════════
   LIDIA IBEAS BEAUTY & NAILS — Main JavaScript
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Header Scroll Effect ─── */
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      header.classList.remove('header--transparent');
      header.classList.add('header--scrolled');
    } else {
      header.classList.add('header--transparent');
      header.classList.remove('header--scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  /* ─── Mobile Menu ─── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  function toggleMobileMenu() {
    const isOpen = hamburger.classList.toggle('hamburger--active');
    mobileMenu.classList.toggle('mobile-menu--open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('hamburger--active');
    mobileMenu.classList.remove('mobile-menu--open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMobileMenu();
    }
  });


  /* ─── Active Nav Link on Scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* ─── Scroll Reveal Animations ─── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }


  /* ─── Portfolio Filters ─── */
  const filterBtns = document.querySelectorAll('.portfolio__filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      filterBtns.forEach(function (b) {
        b.classList.remove('portfolio__filter-btn--active');
      });
      this.classList.add('portfolio__filter-btn--active');

      portfolioItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* ─── Lightbox ─── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
  const lightboxNext = lightbox.querySelector('.lightbox__nav--next');

  var currentLightboxIndex = 0;

  function getVisiblePortfolioItems() {
    return Array.from(portfolioItems).filter(function (item) {
      return !item.classList.contains('hidden');
    });
  }

  function openLightbox(index) {
    var items = getVisiblePortfolioItems();
    if (index < 0 || index >= items.length) return;

    currentLightboxIndex = index;
    var item = items[index];
    var img = item.querySelector('img');
    var caption = item.getAttribute('data-caption') || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;

    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';

    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function navigateLightbox(direction) {
    var items = getVisiblePortfolioItems();
    currentLightboxIndex = (currentLightboxIndex + direction + items.length) % items.length;
    var item = items[currentLightboxIndex];
    var img = item.querySelector('img');
    var caption = item.getAttribute('data-caption') || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
  }

  portfolioItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      var visibleItems = getVisiblePortfolioItems();
      var visibleIndex = visibleItems.indexOf(item);
      openLightbox(visibleIndex);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  lightboxPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  lightboxNext.addEventListener('click', function (e) {
    e.stopPropagation();
    navigateLightbox(1);
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('lightbox--open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });


  /* ─── FAQ Accordion ─── */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq__item--open');

      // Close all others
      faqItems.forEach(function (other) {
        other.classList.remove('faq__item--open');
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__answer').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('faq__item--open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var offset = 80; // header height
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

})();
