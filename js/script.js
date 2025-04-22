// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.getElementById('mainMenu');

menuToggle.addEventListener('click', function() {
  mainMenu.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const isClickInsideMenu = mainMenu.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);
  
  if (!isClickInsideMenu && !isClickOnToggle && mainMenu.classList.contains('show')) {
    mainMenu.classList.remove('show');
  }
});

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let intervalId;

function showSlide(index) {
  // Handle index bounds
  if (index >= slides.length) {
    index = 0;
  } else if (index < 0) {
    index = slides.length - 1;
  }
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  
  // Update current index
  currentIndex = index;
}

// Click events for dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', function() {
    showSlide(index);
    resetInterval();
  });
});

// Function to reset the auto-rotation interval
function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}

// Function to start the auto-rotation interval
function startInterval() {
  intervalId = setInterval(function() {
    showSlide(currentIndex + 1);
  }, 5000);
}

// Initialize the auto-rotation
startInterval();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Get header height to adjust scrolling position
    const headerHeight = document.querySelector('header').offsetHeight;
    
    window.scrollTo({
      top: targetElement.offsetTop - headerHeight,
      behavior: 'smooth'
    });
    
    // Close mobile menu after clicking a link
    if (mainMenu.classList.contains('show')) {
      mainMenu.classList.remove('show');
    }
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const formInputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (!isValid) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // In a real site, you'd handle form submission to server here
    // For now, we'll simulate a successful submission
    const submitButton = this.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate server request
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 1500);
  });
}

// Add animations for products on scroll
const products = document.querySelectorAll('.product');

// Simple intersection observer to add animation when products come into view
if ('IntersectionObserver' in window) {
  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        productObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  products.forEach(product => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(20px)';
    product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    productObserver.observe(product);
  });
}

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

function highlightNavOnScroll() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);