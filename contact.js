// Grab query parameters from URL
const params = new URLSearchParams(window.location.search);
const serviceName = params.get("service") || "";
const tier = params.get("tier") || "";

// Get form elements
const serviceInput = document.getElementById("service");
const tierInput = document.getElementById("selected-tier");

// Set the service input
if (serviceName && serviceInput) {
  serviceInput.value = serviceName; // show what the user "chose"
  
  // Make it readonly and visually disabled
  serviceInput.readOnly = true;
  serviceInput.style.backgroundColor = '#f0f0f0';
  serviceInput.style.color = '#333';
  serviceInput.style.cursor = 'not-allowed';
}

// Set hidden package tier
if (tier && tierInput) {
  tierInput.value = tier;
}

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
