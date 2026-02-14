/* ═══════════════════════════════════════════════════════
   HYGGE STUDIO - Form Validation
   Client-side validation + visual feedback
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  var successMessage = document.getElementById('form-success');

  if (!form) return;

  // Email regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(field) {
    var value = field.value.trim();
    var isValid = true;

    // Required check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
    }

    // Email format check
    if (field.type === 'email' && value && !emailRegex.test(value)) {
      isValid = false;
    }

    // Visual feedback
    if (!isValid) {
      field.style.borderColor = '#c0392b';
      field.style.boxShadow = '0 0 0 3px rgba(192, 57, 43, 0.1)';
    } else {
      field.style.borderColor = '';
      field.style.boxShadow = '';
    }

    return isValid;
  }

  // Live validation on blur
  var inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      validateField(this);
    });

    input.addEventListener('input', function () {
      if (this.style.borderColor === 'rgb(192, 57, 43)') {
        validateField(this);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', function (e) {
    var allValid = true;

    inputs.forEach(function (input) {
      if (!validateField(input)) {
        allValid = false;
      }
    });

    // Check honeypot
    var honeypot = form.querySelector('[name="_honey"]');
    if (honeypot && honeypot.value) {
      e.preventDefault();
      return;
    }

    if (!allValid) {
      e.preventDefault();
      // Focus first invalid field
      var firstInvalid = form.querySelector('[style*="border-color: rgb(192, 57, 43)"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // For demo purposes: show success message
    // In production, FormSubmit.co handles the redirect
    e.preventDefault();
    form.style.display = 'none';
    successMessage.classList.add('visible');
  });

})();
