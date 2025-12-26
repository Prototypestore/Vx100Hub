const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // prevent default form submission

  // Show sending message immediately
  contactStatus.textContent = '📤 Sending...';

  // Collect form data
  const formData = new FormData(contactForm);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
    // Send data to your Google Apps Script
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // If the response returns JSON, parse it
    const result = await response.json();

    if (result.status === 'success') {
      contactStatus.textContent = '✅ Booking request sent! Thank you!';
      contactForm.reset();
    } else {
      contactStatus.textContent = '❌ Failed sending: ' + (result.message || 'Unknown error');
    }

  } catch (err) {
    console.error('Error sending form:', err);
    contactStatus.textContent = '❌ Failed sending. Please try again.';
  }
});
