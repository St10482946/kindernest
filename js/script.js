/* ==================================================
   KinderNest script.js — Enhanced & Cleaned
   All interactive features, forms, and functionality
================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------
     1. Hamburger Menu - Enhanced
  ----------------------------- */
  const navWrap = document.querySelector('.nav-wrap');
  const navList = document.querySelector('.nav-list');

  if (navWrap && navList) {
    let hamburger = document.querySelector('.hamburger');

    // Create hamburger if it doesn't exist
    if (!hamburger) {
      hamburger = document.createElement('button');
      hamburger.className = 'hamburger';
      hamburger.setAttribute('aria-label', 'Open menu');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      const mainNav = navWrap.querySelector('.main-nav') || navWrap;
      mainNav.appendChild(hamburger);
    }

    // Toggle menu
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navList.classList.contains('open');
      navList.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      
      // Prevent body scroll when menu is open
      if (!isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navWrap.contains(e.target) && navList.classList.contains('open')) {
        navList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* -----------------------------
     2. Smooth Scroll
  ----------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -----------------------------
     3. Reveal-on-Scroll
  ----------------------------- */
  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 150) el.classList.add('active');
      else el.classList.remove('active');
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  /* -----------------------------
     4. Back-to-Top Button
  ----------------------------- */
  const backToTop = document.getElementById('backToTop') || (() => {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.textContent = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
    return btn;
  })();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });

  /* -----------------------------
     5. Dark Mode Toggle - Functional
  ----------------------------- */
  const darkModeBtn = document.getElementById('darkModeBtn') || (() => {
    const btn = document.createElement('button');
    btn.id = 'darkModeBtn';
    btn.textContent = '🌙';
    btn.setAttribute('aria-label', 'Toggle Dark Mode');
    document.body.appendChild(btn);
    return btn;
  })();

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
  }

  darkModeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  /* -----------------------------
     6. Programs Slideshow
  ----------------------------- */
    let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  
  function showSlide(n) {
    if (slides.length === 0) return;
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    slides.forEach((slide, i) => {
      slide.style.display = i === slideIndex ? 'block' : 'none';
    });
  }

  // Make plusSlides available globally for onclick handlers
  window.plusSlides = showSlide;

  // Auto-advance slideshow
  if (slides.length > 0) {
    slides.forEach((slide, i) => {
      if (i !== 0) slide.style.display = 'none';
    });
    setInterval(() => showSlide(1), 4000);
  }

  /* -----------------------------
     7. Gallery Lightbox (Enhanced - Full Page)
  ----------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const galleryImages = document.querySelectorAll('.gallery-row img');

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  if (lightbox && lbImg) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        const src = img.dataset.full || img.src;
        lbImg.src = src;
        lbImg.alt = img.alt || '';
        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target.id === 'lightbox') closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* -----------------------------
     8. Accordion
  ----------------------------- */
  (function initAccordion() {
    const accordions = document.querySelectorAll('.accordion');
    if (!accordions.length) return;

    accordions.forEach(wrapper => {
      const buttons = wrapper.querySelectorAll('.acc-btn');

      buttons.forEach(btn => {
        const panelId = btn.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : btn.nextElementSibling;
        if (!panel) return;

        btn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('open');
        panel.style.maxHeight = '0px';

        btn.addEventListener('click', () => {
          const currentlyExpanded = btn.getAttribute('aria-expanded') === 'true';

          buttons.forEach(otherBtn => {
            const otherPanel = otherBtn.getAttribute('aria-controls') 
              ? document.getElementById(otherBtn.getAttribute('aria-controls')) 
              : otherBtn.nextElementSibling;
            if (!otherPanel) return;
            otherBtn.setAttribute('aria-expanded', 'false');
            otherPanel.setAttribute('aria-hidden', 'true');
            otherPanel.classList.remove('open');
            otherPanel.style.maxHeight = '0px';
          });

          if (!currentlyExpanded) {
            btn.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');
            panel.classList.add('open');
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      });
    });
  })();

  /* -----------------------------
     9. Navbar Active Link
  ----------------------------- */
  const navLinks = document.querySelectorAll('.nav-list a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
  });

  /* -----------------------------
     10. Leaflet Map (Contact page)
  ----------------------------- */
  (function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    if (typeof L === 'undefined') {
      mapContainer.innerHTML = '<p>Map cannot load right now. Address: 123 Learning Lane, Pretoria, South Africa</p>';
      return;
    }
    const pretoriaCoords = [-25.7479, 28.2292];
    const map = L.map(mapContainer).setView(pretoriaCoords, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    L.marker(pretoriaCoords).addTo(map).bindPopup('<b>KinderNest Preschool</b><br>123 Learning Lane, Pretoria').openPopup();
  })();

  /* -----------------------------
     11. Search Functionality
  ----------------------------- */
  (function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;

    const searchableContent = {
      'index.html': ['Welcome', 'About KinderNest', 'Programs', 'Playgroup', 'Preschool', 'Aftercare', 'Gallery'],
      'about.html': ['About', 'Mission', 'Values', 'Love', 'Care', 'Holistic Growth', 'Community'],
      'programs.html': ['Programs', 'Baking', 'Swimming', 'Gymnastics', 'Sports', 'Early Learning', 'Activities'],
      'admissions.html': ['Admissions', 'Enquiry', 'Enrollment', 'Registration'],
      'gallery.html': ['Gallery', 'Photos', 'Activities', 'Children'],
      'contact.html': ['Contact', 'Location', 'Map', 'Message', 'Email', 'Phone']
    };

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        if (searchResults) {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
        }
        return;
      }

      const matches = [];
      Object.keys(searchableContent).forEach(page => {
        searchableContent[page].forEach(term => {
          if (term.toLowerCase().includes(query)) {
            matches.push({ page, term });
          }
        });
      });

      if (searchResults) {
        if (matches.length > 0) {
          searchResults.innerHTML = matches.slice(0, 5).map(m => 
            `<a href="${m.page}">${m.term}</a>`
          ).join('');
          searchResults.style.display = 'block';
        } else {
          searchResults.innerHTML = '<p>No results found</p>';
          searchResults.style.display = 'block';
        }
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(e.target)) {
        if (searchResults) {
          searchResults.style.display = 'none';
        }
      }
    });
  })();

  /* -----------------------------
     12. Contact Form Validation & AJAX
  ----------------------------- */
  (function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameField = document.getElementById('cName');
    const emailField = document.getElementById('cEmail');
    const phoneField = document.getElementById('cPhone');
    const messageTypeField = document.getElementById('messageType');
    const messageField = document.getElementById('cMessage');
    const charCountSpan = document.getElementById('char-count');
    const responseDiv = document.getElementById('contact-response');
    const submitBtn = document.getElementById('submit-btn');
    const recipient = 'info@kindernestpreschool.com';

    function validateName(name) {
      const trimmed = name.trim();
      if (!trimmed) return { valid: false, message: 'Name is required' };
      if (trimmed.length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
      if (trimmed.length > 100) return { valid: false, message: 'Name must be less than 100 characters' };
      if (!/^[A-Za-z\s'-]+$/.test(trimmed)) return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
      return { valid: true, message: '' };
    }

    function validateEmail(email) {
      const trimmed = email.trim();
      if (!trimmed) return { valid: false, message: 'Email is required' };
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!emailRegex.test(trimmed)) return { valid: false, message: 'Please enter a valid email address' };
      if (trimmed.length > 255) return { valid: false, message: 'Email must be less than 255 characters' };
      return { valid: true, message: '' };
    }

    function validatePhone(phone) {
      const trimmed = phone.trim();
      if (!trimmed) return { valid: false, message: 'Phone number is required' };
      const digitsOnly = trimmed.replace(/[\s\+\-\(\)]/g, '');
      if (digitsOnly.length < 10) return { valid: false, message: 'Phone number must contain at least 10 digits' };
      if (digitsOnly.length > 15) return { valid: false, message: 'Phone number must contain no more than 15 digits' };
      if (!/^[\d\s\+\-\(\)]+$/.test(trimmed)) return { valid: false, message: 'Phone number can only contain digits, spaces, +, -, or parentheses' };
      return { valid: true, message: '' };
    }

    function validateMessageType(type) {
      if (!type) return { valid: false, message: 'Please select a message type' };
      return { valid: true, message: '' };
    }

    function validateMessage(message) {
      const trimmed = message.trim();
      if (!trimmed) return { valid: false, message: 'Message is required' };
      if (trimmed.length < 10) return { valid: false, message: 'Message must be at least 10 characters' };
      if (trimmed.length > 1000) return { valid: false, message: 'Message must be less than 1000 characters' };
      return { valid: true, message: '' };
    }

    function showFieldError(fieldId, message) {
      const errorSpan = document.getElementById(fieldId + '-error');
      const field = document.getElementById(fieldId);
      if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = message ? 'block' : 'none';
      }
      if (field) {
        if (message) field.classList.add('input-error');
        else field.classList.remove('input-error');
      }
    }

    function setLoadingState(loading) {
      if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.value = loading ? 'Sending...' : 'Send Message';
        if (loading) submitBtn.classList.add('loading');
        else submitBtn.classList.remove('loading');
      }
    }

    function showResponseMessage(message, isError = false) {
      if (responseDiv) {
        responseDiv.innerHTML = `<p class="${isError ? 'form-error' : 'form-success'}">${message}</p>`;
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Real-time validation
    if (nameField) {
      nameField.addEventListener('blur', () => showFieldError('cName', validateName(nameField.value).message));
      nameField.addEventListener('input', () => {
        if (nameField.classList.contains('input-error')) showFieldError('cName', validateName(nameField.value).message);
      });
    }

    if (emailField) {
      emailField.addEventListener('blur', () => showFieldError('cEmail', validateEmail(emailField.value).message));
      emailField.addEventListener('input', () => {
        if (emailField.classList.contains('input-error')) showFieldError('cEmail', validateEmail(emailField.value).message);
      });
    }

    if (phoneField) {
      phoneField.addEventListener('blur', () => showFieldError('cPhone', validatePhone(phoneField.value).message));
      phoneField.addEventListener('input', () => {
        if (phoneField.classList.contains('input-error')) showFieldError('cPhone', validatePhone(phoneField.value).message);
      });
    }

    if (messageTypeField) {
      messageTypeField.addEventListener('change', () => showFieldError('messageType', validateMessageType(messageTypeField.value).message));
    }

    if (messageField) {
      messageField.addEventListener('input', () => {
        const length = messageField.value.length;
        if (charCountSpan) {
          charCountSpan.textContent = length;
          charCountSpan.style.color = length > 1000 ? 'var(--error)' : length > 900 ? '#ff8800' : 'inherit';
        }
        if (messageField.classList.contains('input-error')) showFieldError('cMessage', validateMessage(messageField.value).message);
      });
      messageField.addEventListener('blur', () => showFieldError('cMessage', validateMessage(messageField.value).message));
    }

    // AJAX submission
    async function submitFormViaAJAX(formData) {
      const useMockEndpoint = true;
      if (useMockEndpoint) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.1) {
              resolve({ success: true, message: 'Your message has been sent successfully! We will get back to you soon.' });
            } else {
              reject({ success: false, message: 'Network error. Please try again later.' });
            }
          }, 1500);
        });
      }
    }

    contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
      if (responseDiv) responseDiv.innerHTML = '';

      const name = nameField ? nameField.value.trim() : '';
      const email = emailField ? emailField.value.trim() : '';
      const phone = phoneField ? phoneField.value.trim() : '';
      const messageType = messageTypeField ? messageTypeField.value : '';
      const message = messageField ? messageField.value.trim() : '';

      const nameValidation = validateName(name);
      const emailValidation = validateEmail(email);
      const phoneValidation = validatePhone(phone);
      const typeValidation = validateMessageType(messageType);
      const messageValidation = validateMessage(message);

      showFieldError('cName', nameValidation.message);
      showFieldError('cEmail', emailValidation.message);
      showFieldError('cPhone', phoneValidation.message);
      showFieldError('messageType', typeValidation.message);
      showFieldError('cMessage', messageValidation.message);

      if (!nameValidation.valid || !emailValidation.valid || !phoneValidation.valid || !typeValidation.valid || !messageValidation.valid) {
        showResponseMessage('Please correct the errors above before submitting.', true);
        const firstError = contactForm.querySelector('.input-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
    }

      const formData = { name, email, phone, messageType, message, timestamp: new Date().toISOString(), recipient };
      setLoadingState(true);
      if (responseDiv) {
        responseDiv.innerHTML = '<p class="form-success" style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 12px 15px; border-radius: 6px;">⏳ Sending your message via AJAX... Please wait.</p>';
      }

      const formFields = contactForm.querySelectorAll('input, textarea, select');
      formFields.forEach(field => field.disabled = true);

      try {
        const result = await submitFormViaAJAX(formData);
        if (result.success) {
          showResponseMessage(`✓ ${result.message}`, false);
          setTimeout(() => {
            contactForm.reset();
            if (charCountSpan) charCountSpan.textContent = '0';
            ['cName', 'cEmail', 'cPhone', 'messageType', 'cMessage'].forEach(id => showFieldError(id, ''));
            formFields.forEach(field => field.disabled = false);
          }, 3000);
        }
      } catch (error) {
        showResponseMessage(`✗ ${error.message || 'An unexpected error occurred.'}`, true);
        formFields.forEach(field => field.disabled = false);
      } finally {
        setLoadingState(false);
      }
    });
  })();

  /* -----------------------------
     13. Admissions Form Validation & AJAX
  ----------------------------- */
  (function initAdmissionsForm() {
    const admissionForm = document.getElementById('admission-form');
    if (!admissionForm) return;

    const parentNameField = document.getElementById('parentName');
    const parentEmailField = document.getElementById('parentEmail');
    const parentPhoneField = document.getElementById('parentPhone');
    const childAgeField = document.getElementById('childAge');
    const programInterestField = document.getElementById('programInterest');
    const enquiryMessageField = document.getElementById('enquiryMessage');
    const charCountSpan = document.getElementById('admission-char-count');
    const responseDiv = document.getElementById('admission-response');
    const submitBtn = document.getElementById('admission-submit-btn');

    function validateName(name) {
      const trimmed = name.trim();
      if (!trimmed) return { valid: false, message: 'Name is required' };
      if (trimmed.length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
      return { valid: true, message: '' };
    }

    function validateEmail(email) {
      const trimmed = email.trim();
      if (!trimmed) return { valid: false, message: 'Email is required' };
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!emailRegex.test(trimmed)) return { valid: false, message: 'Please enter a valid email address' };
      return { valid: true, message: '' };
    }

    function validatePhone(phone) {
      const trimmed = phone.trim();
      if (!trimmed) return { valid: false, message: 'Phone number is required' };
      const digitsOnly = trimmed.replace(/[\s\+\-\(\)]/g, '');
      if (digitsOnly.length < 10) return { valid: false, message: 'Phone number must contain at least 10 digits' };
      return { valid: true, message: '' };
    }

    function validateAge(age) {
      const ageNum = parseFloat(age);
      if (!age || isNaN(ageNum)) return { valid: false, message: 'Child age is required' };
      if (ageNum < 0 || ageNum > 6) return { valid: false, message: 'Age must be between 0 and 6 years' };
      return { valid: true, message: '' };
    }

    function validateProgram(program) {
      if (!program) return { valid: false, message: 'Please select a program' };
      return { valid: true, message: '' };
    }

    function validateMessage(message) {
      const trimmed = message.trim();
      if (!trimmed) return { valid: false, message: 'Message is required' };
      if (trimmed.length < 10) return { valid: false, message: 'Message must be at least 10 characters' };
      if (trimmed.length > 500) return { valid: false, message: 'Message must be less than 500 characters' };
      return { valid: true, message: '' };
    }

    function showFieldError(fieldId, message) {
      const errorSpan = document.getElementById(fieldId + '-error');
      const field = document.getElementById(fieldId);
      if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = message ? 'block' : 'none';
      }
      if (field) {
        if (message) field.classList.add('input-error');
        else field.classList.remove('input-error');
      }
    }

    function setLoadingState(loading) {
      if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.value = loading ? 'Submitting...' : 'Submit Enquiry';
      }
    }

    function showResponseMessage(message, isError = false) {
      if (responseDiv) {
        responseDiv.innerHTML = `<p class="${isError ? 'form-error' : 'form-success'}">${message}</p>`;
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Set min date to today
    const startDateField = document.getElementById('startDate');
    if (startDateField) {
      startDateField.min = new Date().toISOString().split('T')[0];
    }

    // Character counter
    if (enquiryMessageField && charCountSpan) {
      enquiryMessageField.addEventListener('input', () => {
        const length = enquiryMessageField.value.length;
        charCountSpan.textContent = length;
        charCountSpan.style.color = length > 500 ? 'var(--error)' : length > 450 ? '#ff8800' : 'inherit';
      });
    }

    // AJAX submission
    async function submitAdmissionViaAJAX(formData) {
      const useMockEndpoint = true;
      if (useMockEndpoint) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const age = parseFloat(formData.childAge);
            let response = '';
            if (age < 1) response = 'Thank you for your enquiry. Our Playgroup program is available for children under 1 year. Monthly fee: R2,500. We have availability starting next month.';
            else if (age < 3) response = 'Thank you for your enquiry. Our Preschool program is suitable for your child. Monthly fee: R3,200. We have limited availability.';
            else response = 'Thank you for your enquiry. Our Aftercare program is available. Monthly fee: R1,800. We have good availability.';
            resolve({ success: true, message: response });
          }, 1500);
        });
      }
    }

    admissionForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (responseDiv) responseDiv.innerHTML = '';

      const parentName = parentNameField ? parentNameField.value.trim() : '';
      const parentEmail = parentEmailField ? parentEmailField.value.trim() : '';
      const parentPhone = parentPhoneField ? parentPhoneField.value.trim() : '';
      const childAge = childAgeField ? childAgeField.value : '';
      const programInterest = programInterestField ? programInterestField.value : '';
      const enquiryMessage = enquiryMessageField ? enquiryMessageField.value.trim() : '';

      const nameValidation = validateName(parentName);
      const emailValidation = validateEmail(parentEmail);
      const phoneValidation = validatePhone(parentPhone);
      const ageValidation = validateAge(childAge);
      const programValidation = validateProgram(programInterest);
      const messageValidation = validateMessage(enquiryMessage);

      showFieldError('parentName', nameValidation.message);
      showFieldError('parentEmail', emailValidation.message);
      showFieldError('parentPhone', phoneValidation.message);
      showFieldError('childAge', ageValidation.message);
      showFieldError('programInterest', programValidation.message);
      showFieldError('enquiryMessage', messageValidation.message);

      if (!nameValidation.valid || !emailValidation.valid || !phoneValidation.valid || !ageValidation.valid || !programValidation.valid || !messageValidation.valid) {
        showResponseMessage('Please correct the errors above before submitting.', true);
        return;
      }

      const formData = { parentName, parentEmail, parentPhone, childAge, programInterest, enquiryMessage, timestamp: new Date().toISOString() };
      setLoadingState(true);
      if (responseDiv) {
        responseDiv.innerHTML = '<p class="form-success" style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 12px 15px; border-radius: 6px;">⏳ Processing your enquiry... Please wait.</p>';
      }

      const formFields = admissionForm.querySelectorAll('input, textarea, select');
      formFields.forEach(field => field.disabled = true);

      try {
        const result = await submitAdmissionViaAJAX(formData);
        if (result.success) {
          showResponseMessage(`✓ ${result.message}`, false);
          setTimeout(() => {
            admissionForm.reset();
            if (charCountSpan) charCountSpan.textContent = '0';
            ['parentName', 'parentEmail', 'parentPhone', 'childAge', 'programInterest', 'enquiryMessage'].forEach(id => showFieldError(id, ''));
            formFields.forEach(field => field.disabled = false);
          }, 5000);
        }
      } catch (error) {
        showResponseMessage(`✗ ${error.message || 'An unexpected error occurred.'}`, true);
        formFields.forEach(field => field.disabled = false);
      } finally {
        setLoadingState(false);
      }
    });
  })();

}); // DOMContentLoaded
