/**
 * main.js
 * This is the main JavaScript file for the portfolio website.
 * It handles interactive elements, animations, and dynamic behavior.
 * 
 * This file controls:
 * 1. Mobile sidebar toggle functionality
 * 2. Smooth scrolling
 * 3. Image gallery functionality
 * 4. Animation triggers
 * 5. Form validation
 * 
 * To modify the functionality:
 * - Add new functions at the bottom of this file
 * - Ensure all code is wrapped in the DOMContentLoaded event listener
 * - Use comments to explain complex functionality
 */
/**
 * main.js
 * This is the main JavaScript file for the portfolio website.
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Sidebar toggle functionality
  setupSidebar();
  
  // Smooth scrolling for anchor links
  setupSmoothScrolling();
  
  // Image gallery functionality (if present)
  setupImageGallery();
  
  // Form validation (if contact form exists)
  setupFormValidation();
  
  // Animation triggers
  setupAnimations();
  
  /**
   * Sets up sidebar functionality
   * Controls the sidebar toggle button and animation
   */
  function setupSidebar() {
    const hamburgerToggle = document.querySelector('.hamburger-toggle');
    const sidebar = document.querySelector('.site-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Toggle sidebar when hamburger button is clicked
    if (hamburgerToggle) {
      hamburgerToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        hamburgerToggle.classList.toggle('active');
        
        // Add class to main content for sliding effect
        if (mainContent) {
          mainContent.classList.toggle('shifted');
        }
        
        // Toggle body class to prevent scrolling when menu is open
        document.body.classList.toggle('menu-open');
      });
    }
    
    // Close sidebar when ESC key is pressed
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        hamburgerToggle.classList.remove('active');
        if (mainContent) {
          mainContent.classList.remove('shifted');
        }
        document.body.classList.remove('menu-open');
      }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
      // Only do this on mobile/tablet
      if (window.innerWidth < 992) {
        // Check if sidebar is active and click is outside sidebar and hamburger
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburgerToggle.contains(e.target)) {
          sidebar.classList.remove('active');
          hamburgerToggle.classList.remove('active');
          if (mainContent) {
            mainContent.classList.remove('shifted');
          }
          document.body.classList.remove('menu-open');
        }
      }
    });
  }
  
  // The rest of your JavaScript remains unchanged
  function setupSmoothScrolling() {
    // Your existing code
  }
  
  function setupImageGallery() {
    // Your existing code
  }
  
  function setupFormValidation() {
    // Your existing code
  }
  
  function setupAnimations() {
    // Your existing code
  }
});
  
  /**
   * Sets up smooth scrolling for anchor links
   * Makes page navigation feel smoother
   */
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Offset for header
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  /**
   * Sets up image gallery functionality if present
   * Enables lightbox-style image viewing
   */
  function setupImageGallery() {
    const galleryItems = document.querySelectorAll('.project-gallery .gallery-item img');
    
    if (galleryItems.length === 0) return;
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        
        // Add elements to DOM
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
        
        // Close lightbox when close button is clicked
        closeBtn.addEventListener('click', function() {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
          }
        });
      });
    });
  }
  
  /**
   * Sets up form validation for contact form
   * Validates inputs before submission
   */
  function setupFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');
      
      // Reset previous error messages
      contactForm.querySelectorAll('.error-message').forEach(el => el.remove());
      
      // Validate name
      if (nameInput && nameInput.value.trim() === '') {
        addErrorMessage(nameInput, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (emailInput && !isValidEmail(emailInput.value)) {
        addErrorMessage(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (messageInput && messageInput.value.trim() === '') {
        addErrorMessage(messageInput, 'Please enter your message');
        isValid = false;
      }
      
      // Prevent form submission if validation fails
      if (!isValid) {
        e.preventDefault();
      }
    });
    
    // Helper function to validate email format
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    
    // Helper function to add error message
    function addErrorMessage(element, message) {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = message;
      errorDiv.style.color = 'red';
      errorDiv.style.fontSize = '0.9em';
      errorDiv.style.marginTop = '0.25rem';
      element.parentNode.appendChild(errorDiv);
      element.style.borderColor = 'red';
    }
  }
  
  /**
   * Sets up animations for page elements
   * Triggers animations when elements enter viewport
   */
  function setupAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
      animatedElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
          element.classList.add('animated');
        }
      });
    }
    
    // Check animations on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Check animations on page load
    checkAnimations();
  }
  
  // Additional custom functionality can be added below
  
});
