/* ═══════════════════════════════════════════════════════
   HYGGE STUDIO - WhatsApp Floating Button
   Tooltip on first load
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var tooltip = document.getElementById('whatsapp-tooltip');

  if (!tooltip) return;

  // Show tooltip after 3 seconds on first visit
  var hasSeenTooltip = sessionStorage.getItem('hygge-wa-tooltip');

  if (!hasSeenTooltip) {
    setTimeout(function () {
      tooltip.classList.add('visible');

      // Hide after 4 seconds
      setTimeout(function () {
        tooltip.classList.remove('visible');
        sessionStorage.setItem('hygge-wa-tooltip', 'true');
      }, 4000);
    }, 3000);
  }

})();
