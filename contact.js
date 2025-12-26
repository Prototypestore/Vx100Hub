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
