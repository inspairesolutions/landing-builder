/* ═══════════════════════════════════════════════════════
   HYGGE STUDIO - Scroll Animations
   Intersection Observer for fade-in effects
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var fadeElements = document.querySelectorAll('.fade-in, .fade-in-stagger');

  if (!fadeElements.length) return;

  // Check for reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

})();
