// ==============================================
// CASE STUDY SCROLL REVEAL
// ==============================================

const caseRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.15
});

document
  .querySelectorAll(".hero, .section, .card")
  .forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    caseRevealObserver.observe(el);
  });
