// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

mobileMenuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// Smooth scroll for sidebar navigation
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after navigation
      sidebar.classList.remove('open');
    }
  });
});

// Scrollspy for active navigation
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-20% 0px -20% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute('id');
      
      // Remove active class from all nav links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to current nav link
      const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const words = ['Software Engineer', 'Full Stack Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 100 : 150;
  
  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});

// IntersectionObserver for scroll animations (AOS-like)
const animatedElements = document.querySelectorAll('[data-aos]');
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      animationObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => {
  animationObserver.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  const bgImage = document.querySelector('.bg-image');
  
  if (heroSection && bgImage) {
    const rate = scrolled * -0.5;
    bgImage.style.transform = `translateY(${rate}px)`;
  }
});

// Smooth reveal animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalValue = parseFloat(target.textContent);
      const duration = 2000;
      const increment = finalValue / (duration / 16);
      let currentValue = 0;
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(timer);
        }
        target.textContent = currentValue.toFixed(1);
      }, 16);
      
      statsObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
  });
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Smooth scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Add scroll to top button when scrolling down
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollTop > 500) {
    if (!scrollToTopBtn) {
      const btn = document.createElement('button');
      btn.className = 'scroll-to-top';
      btn.innerHTML = '<i class="fa fa-chevron-up"></i>';
      btn.addEventListener('click', scrollToTop);
      document.body.appendChild(btn);
    }
  } else {
    if (scrollToTopBtn) {
      scrollToTopBtn.remove();
    }
  }
}); 