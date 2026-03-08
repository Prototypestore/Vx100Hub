// grab close button
const closeBtn = document.querySelector('.close-btn');

// toggle overlay & lock/unlock scroll
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  if(nav.classList.contains('active')) {
    // lock body scroll
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// close overlay when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    document.body.style.overflow = ''; // unlock scroll
  });
});
