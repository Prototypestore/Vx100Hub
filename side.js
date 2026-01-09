// -------------------- SVG HAMBURGER MENU --------------------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("open-profile-menu");
  const menu = document.getElementById("sideMenu");
  const links = menu.querySelectorAll("a");

  if (!hamburger || !menu) {
    console.error("Hamburger or sideMenu not found");
    return;
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // Close menu when clicking any link
  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
});
