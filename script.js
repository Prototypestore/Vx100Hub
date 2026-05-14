/* ==============================================
   ELEMENTS
   ============================================== */
const menuBtn  = document.querySelector('.menu-btn');
const nav      = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#main-nav a');
const header   = document.getElementById('site-header');


/* ==============================================
   MOBILE MENU — OPEN / CLOSE
   ============================================== */
function openMenu() {
  nav.classList.add('open');
  menuBtn.classList.add('open');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
  nav.classList.contains('open') ? closeMenu() : openMenu();
});


/* ==============================================
   CLOSE MENU ON LINK CLICK
   ============================================== */
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ==============================================
   CLOSE MENU ON ESCAPE KEY
   ============================================== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuBtn.focus();
  }
});


/* ==============================================
   HEADER — SCROLL SHADOW
   ============================================== */
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', onScroll, { passive: true });


/* ==============================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});


/* ==============================================
   SCROLL REVEAL — INTERSECTION OBSERVER
   ============================================== */
const revealElements = document.querySelectorAll(
  '.service-card, .section-header, .hero-badge, .cta-text, .footer-brand, .footer-contact, .footer-nav'
);

// Add reveal class
revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger service cards
  if (el.classList.contains('service-card')) {
    const cards = [...document.querySelectorAll('.service-card')];
    const idx   = cards.indexOf(el);
    if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 4)}`);
  }
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ==============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 12;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});
