/**
 * Barón Joyeros - Main JavaScript
 * Elegant interactions and functionality
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navigation
    // ========================================
    
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 100;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ========================================
    // Gallery Filter
    // ========================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const category = item.getAttribute('data-category');
                        if (category === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    
    // ========================================
    // Form Validation & Submission
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'El nombre es obligatorio');
                isValid = false;
            } else if (name.length < 3) {
                showError('nameError', 'El nombre debe tener al menos 3 caracteres');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('emailError', 'El email es obligatorio');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Por favor, introduce un email válido');
                isValid = false;
            }
            
            // Validate phone (optional but if provided, must be valid)
            if (phone !== '' && !isValidPhone(phone)) {
                showError('phoneError', 'Por favor, introduce un teléfono válido');
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                showError('subjectError', 'Por favor, selecciona un asunto');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'El mensaje es obligatorio');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'El mensaje debe tener al menos 10 caracteres');
                isValid = false;
            }
            
            // Validate privacy
            if (!privacy) {
                showError('privacyError', 'Debes aceptar la política de privacidad');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                submitForm({
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                });
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-input, #privacy');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
    
    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();
        
        // Clear previous error
        const errorId = fieldId + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        switch(fieldId) {
            case 'name':
                if (value === '') {
                    showError(errorId, 'El nombre es obligatorio');
                } else if (value.length < 3) {
                    showError(errorId, 'El nombre debe tener al menos 3 caracteres');
                }
                break;
                
            case 'email':
                if (value === '') {
                    showError(errorId, 'El email es obligatorio');
                } else if (!isValidEmail(value)) {
                    showError(errorId, 'Por favor, introduce un email válido');
                }
                break;
                
            case 'phone':
                if (value !== '' && !isValidPhone(value)) {
                    showError(errorId, 'Por favor, introduce un teléfono válido');
                }
                break;
                
            case 'subject':
                if (value === '') {
                    showError(errorId, 'Por favor, selecciona un asunto');
                }
                break;
                
            case 'message':
                if (value === '') {
                    showError(errorId, 'El mensaje es obligatorio');
                } else if (value.length < 10) {
                    showError(errorId, 'El mensaje debe tener al menos 10 caracteres');
                }
                break;
                
            case 'privacy':
                if (!field.checked) {
                    showError(errorId, 'Debes aceptar la política de privacidad');
                }
                break;
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Spanish phone format (basic validation)
        const phoneRegex = /^[6789]\d{8}$/;
        const cleanPhone = phone.replace(/\s+/g, '').replace(/\+34/, '');
        return phoneRegex.test(cleanPhone);
    }
    
    function submitForm(data) {
        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Enviando...</span>';
        
        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            // Success message
            formMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = `
                <span>Enviar Mensaje</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        }, 1500);
        
        // Note: In production, replace the setTimeout with actual form submission:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle success
        })
        .catch(error => {
            // Handle error
            formMessage.textContent = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        });
        */
    }
    
    
    // ========================================
    // Lazy Loading Images (for better performance)
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    
    // ========================================
    // Animations on Scroll
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Elements to animate
        const elementsToAnimate = document.querySelectorAll(`
            .service-card,
            .testimonial-card,
            .value-card,
            .stat,
            .service-detail-card
        `);
        
        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            animateOnScroll.observe(el);
        });
    }
    
    
    // ========================================
    // Prevent FOUC (Flash of Unstyled Content)
    // ========================================
    
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });
    
    
    // ========================================
    // Active Page Navigation Highlight
    // ========================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    
    // ========================================
    // Performance Optimization
    // ========================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll performance
    const optimizedScroll = debounce(function() {
        // Add any scroll-based logic here
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll);
    
    
    // ========================================
    // Accessibility Improvements
    // ========================================
    
    // Trap focus in mobile menu when open
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
    }
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.focus();
        }
    });
    
    
    // ========================================
    // Console Message
    // ========================================
    
    console.log(
        '%c🎨 Barón Joyeros ',
        'background: linear-gradient(135deg, #D4AF37 0%, #E8C84D 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
    );
    console.log(
        '%cWeb diseñada con elegancia y sofisticación',
        'color: #666; font-size: 12px; font-style: italic;'
    );
    
});
