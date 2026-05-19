/* ==============================================
   ELEMENTS
   ============================================== */
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#main-nav a');
const header = document.getElementById('site-header');


/* ==============================================
   SAFETY CHECK (prevents silent crashes)
   ============================================== */
if (!menuBtn || !nav || !header) {
  console.warn('Menu system missing required elements.');
}


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

menuBtn?.addEventListener('click', () => {
  if (nav.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});


/* ==============================================
   CLOSE MENU ON LINK CLICK
   ============================================== */
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ==============================================
   ESC KEY CLOSE
   ============================================== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuBtn.focus();
  }
});


/* ==============================================
   HEADER SCROLL STATE (CSS HOOK: .scrolled)
   ============================================== */
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });


/* ==============================================
   ACTIVE LINK (SAFE FOR GITHUB PAGES)
   ============================================== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});


/* ==============================================
   SCROLL REVEAL (CSS HOOK: .reveal / .visible)
   ============================================== */
const revealElements = document.querySelectorAll(
  '.service-card, .section-header, .hero-badge, .cta-text, .footer-brand, .footer-contact, .footer-nav'
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(el => observer.observe(el));


/* ==============================================
   SMOOTH SCROLL (ANCHORS)
   ============================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
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
