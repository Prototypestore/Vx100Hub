// Grab query parameters from URL
const params = new URLSearchParams(window.location.search);
const serviceName = params.get("service") || "";
const tier = params.get("tier") || "";

// Get form elements
const serviceSelect = document.getElementById("service");
const tierInput = document.getElementById("selected-tier");

// Set the service
if (serviceName && serviceSelect) {
  // Remove the placeholder option
  const placeholder = serviceSelect.querySelector('option[value=""]');
  if (placeholder) placeholder.remove();

  // Set the selected service
  const options = Array.from(serviceSelect.options);
  const match = options.find(opt => opt.value === serviceName);
  if (match) {
    match.selected = true;
  } else {
    // If service not in options, add it
    const newOption = document.createElement("option");
    newOption.value = serviceName;
    newOption.textContent = serviceName;
    newOption.selected = true;
    serviceSelect.appendChild(newOption);
  }

  // Disable the service visaully so user cannot change it
  serviceSelect.style.pointerEvents = 'none';
  serviceSelect.style.backgroundColor = '#f0f0f0';
  serviceSelect.style.color = '#333';

// Set hidden package tier
if (tier && tierInput) {
  tierInput.value = tier;
}

