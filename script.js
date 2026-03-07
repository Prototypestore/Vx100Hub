// select hamburger, nav, and links
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

// toggle nav overlay
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// close nav when any link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// highlight current page link
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('current');
  }
});

// fade links on scroll
nav.addEventListener('scroll', () => {
  navLinks.forEach(link => {
    const rect = link.getBoundingClientRect();
    if (rect.top < 50 || rect.bottom > window.innerHeight - 50) {
      link.classList.add('fade');
    } else {
      link.classList.remove('fade');
    }
  });
});
