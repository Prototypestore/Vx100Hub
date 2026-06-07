document.addEventListener("DOMContentLoaded", () => {
  const collapse = document.querySelector(".collapse");
  const button = document.querySelector(".arrow-toggle");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  // Collapse (safe check)
  if (button && collapse) {
    button.addEventListener("click", () => {
      collapse.classList.toggle("open");
    });
  }

  // Mobile menu (safe check)
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open");
      nav.classList.toggle("open");
    });
  }
});
