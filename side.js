// -------------------- SIDE HAMBURGER MENU --------------------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("open-profile-menu");
  const menu = document.getElementById("sideMenu");

  if (!hamburger || !menu) return;

  // Create overlay dynamically
  const overlay = document.createElement("div");
  overlay.id = "menuOverlay";
  document.body.appendChild(overlay);

  const links = menu.querySelectorAll("a");

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  // Toggle menu
  hamburger.addEventListener("click", () => {
    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking overlay
  overlay.addEventListener("click", closeMenu);

  // Close when clicking any link
  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // ESC key support (desktop polish)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
