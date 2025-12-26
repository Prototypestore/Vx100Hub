// ====== AUTO-FILL SERVICE AND TIER FROM URL ======
const urlParams = new URLSearchParams(window.location.search);
const serviceParam = urlParams.get('service');
const tierParam = urlParams.get('tier');

if (serviceParam) {
  const serviceSelect = document.getElementById('service');
  serviceSelect.value = serviceParam;
  serviceSelect.disabled = true; // prevent user from changing
}

if (tierParam) {
  const tierInput = document.getElementById('selected-tier');
  tierInput.value = tierParam;
}

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Show sending immediately
  status.textContent = '📤 Sending...';

  // Collect all form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  // Add timestamp
  data.timestamp = new Date().toISOString();

  try {
    // Send data to Google Sheets via Apps Script Web App
    await fetch('https://script.google.com/macros/s/AKfycbxyVVTISwp0XxWuu9r03YDbPxpq3J5KwPmx3dlHYs49ukZqhWtG51d10q20PA0g06bjTg/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Show success message
    status.textContent = '✅ Booking request sent! Thank you!';
    form.reset();

  } catch (err) {
    console.error('Google Sheet error:', err);
    status.textContent = '❌ Failed sending. Please try again.';
  }
});
