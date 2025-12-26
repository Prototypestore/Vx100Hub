// ====== AUTO-FILL SERVICE AND TIER FROM URL ======
const urlParams = new URLSearchParams(window.location.search);
const serviceParam = urlParams.get('service');
const tierParam = urlParams.get('tier');

if (serviceParam) {
  const serviceSelect = document.getElementById('service');
  serviceSelect.value = serviceParam;
  serviceSelect.disabled = true; // optional: prevent user from changing
}

if (tierParam) {
  const tierInput = document.getElementById('selected-tier');
  tierInput.value = tierParam;
}


const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Show "Sending..." immediately
  status.textContent = '📤 Sending...';

  // Collect all form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
    // Send data to Google Sheet via your Apps Script Web App
    await fetch('https://script.google.com/macros/s/AKfycbxyVVTISwp0XxWuu9r03YDbPxpq3J5KwPmx3dlHYs49ukZqhWtG51d10q20PA0g06bjTg/exec', {
      method: 'POST',
      mode: 'no-cors', // prevents CORS errors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Assume success (no response due to no-cors)
    status.textContent = '✅ Booking request sent! Thank you!';
    form.reset();

  } catch (err) {
    console.error('Google Sheet error:', err);
    status.textContent = '❌ Failed sending. Please try again.';
  }
});

// ====== ADD TIER INFO TO BOOK NOW BUTTON ======
const addToCartBtn = document.querySelector(".btn-add-to-cart");

addToCartBtn.addEventListener("click", (e) => {
  const selectedPackage = document.querySelector('input[name="package"]:checked');
  if (!selectedPackage) {
    e.preventDefault();
    alert("Please select a package.");
    return;
  }

  // Get current service name
  const serviceName = document.querySelector(".product-title").textContent;
  const tier = selectedPackage.value;

  // Redirect to contact.html with service and tier in query string
  const contactUrl = `contact.html?service=${encodeURIComponent(serviceName)}&tier=${encodeURIComponent(tier)}`;
  addToCartBtn.setAttribute("href", contactUrl); // update link href dynamically
});
