// -------------------- SVG HAMBURGER MENU --------------------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("open-profile-menu");
  const menu = document.getElementById("sideMenu");

  if (!hamburger || !menu) {
    console.error("Hamburger or sideMenu not found");
    return;
  }

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});
