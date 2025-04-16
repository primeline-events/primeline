document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  
  mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (nav.classList.contains('active')) {
              nav.classList.remove('active');
              mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
      });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 90,
                  behavior: 'smooth'
              });
          }
      });
  });
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        eventType: document.getElementById('event-type').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    fetch('https://script.google.com/macros/s/AKfycbweicA8RDX1O7OYVS9YCQfL_CjdBnNFMJLYEQ3Xs6_nz3XcA7NyglQvUIAJDetiruPKPQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert('Form submitted successfully!');
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
});
// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
const slideCount = testimonialSlides.length;

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
}

// Initialize slider
if (slideCount > 0) {
    showSlide(0);
    
    // Add navigation buttons if needed
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.className = 'testimonial-next';
    nextBtn.addEventListener('click', nextSlide);
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.className = 'testimonial-prev';
    prevBtn.addEventListener('click', prevSlide);
    
    const sliderContainer = document.querySelector('.testimonials-container');
    if (sliderContainer) {
        sliderContainer.appendChild(prevBtn);
        sliderContainer.appendChild(nextBtn);
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}
});