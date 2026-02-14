/* ═══════════════════════════════════════════════════════
   HYGGE STUDIO - Lightbox
   Modal gallery: prev/next, keyboard, touch swipe
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var closeBtn = lightbox.querySelector('.lightbox__close');
  var prevBtn = lightbox.querySelector('.lightbox__prev');
  var nextBtn = lightbox.querySelector('.lightbox__next');
  var portfolioItems = document.querySelectorAll('.portfolio-item');

  var currentIndex = 0;
  var visibleImages = [];
  var touchStartX = 0;
  var touchEndX = 0;

  function getVisibleImages() {
    visibleImages = [];
    portfolioItems.forEach(function (item) {
      if (!item.classList.contains('hidden')) {
        var img = item.querySelector('.portfolio-item__image');
        if (img) {
          visibleImages.push(img.src);
        }
      }
    });
  }

  function openLightbox(index) {
    getVisibleImages();
    currentIndex = index;
    lightboxImage.src = visibleImages[currentIndex];
    lightboxImage.alt = 'Portfolio Hygge Studio - imagen ' + (currentIndex + 1);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImage.style.opacity = '0';
    lightboxImage.style.transform = 'scale(0.9)';
    setTimeout(function () {
      lightboxImage.src = visibleImages[currentIndex];
      lightboxImage.style.opacity = '1';
      lightboxImage.style.transform = 'scale(1)';
    }, 150);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImage.style.opacity = '0';
    lightboxImage.style.transform = 'scale(0.9)';
    setTimeout(function () {
      lightboxImage.src = visibleImages[currentIndex];
      lightboxImage.style.opacity = '1';
      lightboxImage.style.transform = 'scale(1)';
    }, 150);
  }

  // Click to open
  portfolioItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      // Find index among visible items
      getVisibleImages();
      var img = item.querySelector('.portfolio-item__image');
      var visibleIndex = visibleImages.indexOf(img.src);
      openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
    });
  });

  // Close
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation
  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showPrev();
  });
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showNext();
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch swipe
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  }, { passive: true });

})();
