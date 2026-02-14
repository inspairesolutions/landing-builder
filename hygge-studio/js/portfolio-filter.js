/* ═══════════════════════════════════════════════════════
   HYGGE STUDIO - Portfolio Filter
   Category filtering with fade animation
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var tabs = document.querySelectorAll('.portfolio-tab');
  var items = document.querySelectorAll('.portfolio-grid__item');

  if (!tabs.length || !items.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      // Update active tab
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Filter items
      items.forEach(function (item) {
        var category = item.getAttribute('data-category');

        if (filter === 'todos' || category === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          requestAnimationFrame(function () {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

})();
