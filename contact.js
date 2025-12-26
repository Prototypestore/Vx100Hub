const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // prevent normal submit
  contactStatus.textContent = '📤 Sending...';

  const formData = new FormData(contactForm);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Attempt to read JSON response from Apps Script
    const result = await response.json();
    if(result.status === 'success') {
      contactStatus.textContent = '✅ Sent!';
      contactForm.reset();
    } else {
      contactStatus.textContent = '❌ Failed: ' + (result.message || 'Unknown error');
    }
  } catch(err) {
    contactStatus.textContent = '❌ Failed sending. Please try again.';
    console.error(err);
  }
});
