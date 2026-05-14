// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('bg-charcoal/90', 'backdrop-blur-md', 'border-b', 'border-emerald-500/30');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('bg-charcoal/90', 'backdrop-blur-md', 'border-b', 'border-emerald-500/30');
    navbar.classList.add('bg-transparent');
  }
});

// ========== MOBILE MENU ==========
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('-translate-x-full');
  });
}

// Close mobile menu when clicking links
document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
  });
});

// ========== HERO SLIDER ==========
let slides = document.querySelectorAll('.hero-slider');
let currentSlide = 0;
if (slides.length > 0) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// ========== REVEAL ANIMATIONS ON SCROLL ==========
const revealElements = [
  'servicesReveal', 'portfolioReveal', 'aboutTextReveal', 'aboutImageReveal',
  'whyReveal', 'processReveal', 'testimonialsReveal', 'videoReveal',
  'pricingReveal', 'faqReveal', 'blogReveal', 'contactReveal'
];

const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-12', 'translate-x-[-50px]', 'translate-x-[50px]');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach(id => {
  const element = document.getElementById(id);
  if (element) revealObserver.observe(element);
});

// Also observe elements with specific classes
document.querySelectorAll('.glass-card, .portfolio-item, .testimonial-card').forEach(el => {
  revealObserver.observe(el);
});

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const increment = target / 60;
      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========== PORTFOLIO FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.style.animation = 'scaleIn 0.5s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ========== PORTFOLIO MODAL ==========
const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img && modalImage) {
      modalImage.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ========== TESTIMONIAL AUTO SCROLL ==========
const carousel = document.getElementById('testimonialCarousel');
if (carousel) {
  let autoScroll = setInterval(() => {
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
      carousel.scrollLeft = 0;
    } else {
      carousel.scrollLeft += 380;
    }
  }, 4000);
  
  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
  carousel.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 380;
      }
    }, 4000);
  });
}

// ========== VIDEO MODAL ==========
const videoTrigger = document.getElementById('videoTrigger');
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeVideo = document.getElementById('closeVideo');

if (videoTrigger) {
  videoTrigger.addEventListener('click', () => {
    videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeVideo) {
  closeVideo.addEventListener('click', () => {
    videoFrame.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoFrame.src = '';
      videoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  }
});

// ========== SMOOTH SCROLLING FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========== FORM SUBMIT ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
    contactForm.reset();
  });
}

// ========== ADD HOVER PAUSE FOR LOGO SCROLL ==========
const logoScroll = document.querySelector('.animate-scroll-logos');
if (logoScroll) {
  logoScroll.addEventListener('mouseenter', () => {
    logoScroll.style.animationPlayState = 'paused';
  });
  logoScroll.addEventListener('mouseleave', () => {
    logoScroll.style.animationPlayState = 'running';
  });
}

// ========== INITIALIZE ALL SECTIONS VISIBLE ==========
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state for reveal elements
  revealElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('opacity-0', 'translate-y-12');
    }
  });
  
  // Set initial state for about text and image
  const aboutText = document.getElementById('aboutTextReveal');
  const aboutImage = document.getElementById('aboutImageReveal');
  if (aboutText) aboutText.classList.add('opacity-0', '-translate-x-[50px]');
  if (aboutImage) aboutImage.classList.add('opacity-0', 'translate-x-[50px]');
});

// Console log to confirm everything is working
console.log('KMCreations website loaded successfully! 🎨✨');
