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
