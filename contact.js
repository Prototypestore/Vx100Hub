const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  status.textContent = 'Sending...';

  // 1️⃣ Send email to YOU
  emailjs.sendForm('YOUR_SERVICE_ID', 'TEMPLATE_TO_YOU_ID', this)
    .then(() => {
      // 2️⃣ Send auto-reply to USER
      return emailjs.sendForm('YOUR_SERVICE_ID', 'TEMPLATE_AUTOREPLY_ID', this);
    })
    .then(() => {
      status.textContent = '✅ Booking request sent!';
      form.reset();
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      status.textContent = '❌ Failed to send. Please try again.';
    });
});
