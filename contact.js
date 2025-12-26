// ====== AUTO-FILL SERVICE AND TIER FROM URL ======
const urlParams = new URLSearchParams(window.location.search);
const contactServiceParam = urlParams.get('service');
const contactTierParam = urlParams.get('tier');

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('form-status');

const serviceSelect = document.getElementById('service');
const tierInput = document.getElementById('selected-tier');

if (contactServiceParam && serviceSelect) {
  serviceSelect.value = contactServiceParam;
  serviceSelect.disabled = true; // prevent user from changing
}

if (contactTierParam && tierInput) {
  tierInput.value = contactTierParam;
}

// ====== FORM SUBMISSION TO GOOGLE SHEETS ======
contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Show sending immediately
  contactStatus.textContent = '📤 Sending...';

  // Collect all form data
  const formData = new FormData(contactForm);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  // Add timestamp
  data.timestamp = new Date().toISOString();

  try {
    // Send data to Google Sheets
    await fetch('https://script.google.com/macros/s/AKfycbxyVVTISwp0XxWuu9r03YDbPxpq3J5KwPmx3dlHYs49ukZqhWtG51d10q20PA0g06bjTg/exec', {
  method: 'POST',
  mode: 'no-cors', // still needed for Google Apps Script
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

    // Show success message
    contactStatus.textContent = '✅ Booking request sent! Thank you!';
    contactForm.reset();

  } catch (err) {
    console.error('Google Sheet error:', err);
    contactStatus.textContent = '❌ Failed sending. Please try again.';
  }
});
