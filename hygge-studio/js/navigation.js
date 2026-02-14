/* ═══════════════════════════════════════════════════════
   HYGGE STUDIO - Navigation
   Hamburger menu, smooth scroll, sticky header
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('header');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // ── Hamburger Toggle ──
  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking a mobile link
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // ── Smooth Scroll for all anchor links ──
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.startsWith('#') && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = header.offsetHeight;
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ── Sticky Header Scroll Effect ──
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ── Close mobile menu on ESC ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

})();
