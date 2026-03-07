// Grab hamburger button and nav
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('header nav a');

// Toggle nav when hamburger is clicked
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close nav when any link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});
