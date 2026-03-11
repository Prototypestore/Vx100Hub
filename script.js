// ===============================
// ELEMENTS
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

// ===============================
// OPEN / CLOSE MENU
// ===============================

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.classList.toggle("open");

  // Lock scroll when menu is open
  document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
});

// ===============================
// CLOSE MENU WHEN LINK CLICKED
// ===============================

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.classList.remove("open");

    // Unlock scroll
    document.body.style.overflow = "";
  });
});

// ===============================
// SCROLL FADE EFFECT
// ===============================

let lastScroll = 0;

window.addEventListener("scroll", () => {
  if (!nav.classList.contains("open")) return;

  const currentScroll = window.scrollY;
  const links = document.querySelector("nav ul");

  if (currentScroll > lastScroll) {
    links.style.opacity = "0.4";
    links.style.transform = "translateY(-10px)";
  } else {
    links.style.opacity = "1";
    links.style.transform = "translateY(0px)";
  }

  lastScroll = currentScroll;
});

// ===============================
// CURRENT PAGE HIGHLIGHT
// ===============================

const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
