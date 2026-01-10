document.addEventListener("DOMContentLoaded", () => {

  // ==================== URL PARAMS ====================
  const params = new URLSearchParams(window.location.search);
  const serviceName = params.get("service") || "";
  const tier = params.get("tier") || "";

  const serviceInput = document.getElementById("service");
  const tierInput = document.getElementById("selected-tier");

  if (serviceName && serviceInput) {
    serviceInput.value = serviceName;
    serviceInput.readOnly = true;
    serviceInput.style.backgroundColor = "#f0f0f0";
    serviceInput.style.color = "#333";
    serviceInput.style.cursor = "not-allowed";
  }

  if (tier && tierInput) {
    tierInput.value = tier;
  }

  // ==================== SIDE HAMBURGER MENU ====================
  const hamburger = document.querySelector(".hamburger-btn");
  const menu = document.getElementById("sideMenu");

  if (!hamburger || !menu) return;

  // Create overlay
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
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Close on overlay click
  overlay.addEventListener("click", closeMenu);

  // Close on link click
  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // ESC key support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

});
