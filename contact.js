// Initialize EmailJS with your Public Key
emailjs.init('1gpBID1fbY4JDmxMY');

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Show "Sending..." immediately
  status.textContent = '📤 Sending your booking request…';

  // Send booking email to YOU first
  emailjs.sendForm('YOUR_SERVICE_ID', 'TEMPLATE_TO_YOU_ID', this)
    .then(() => {
      // Show success message immediately
      status.textContent = '✅ Booking request sent! Thank you!';
      form.reset();

      // Send auto-reply to user asynchronously
      emailjs.sendForm('YOUR_SERVICE_ID', 'TEMPLATE_AUTOREPLY_ID', this)
        .catch((error) => {
          console.error('Auto-reply error:', error);
          // User already sees confirmation, so we don't block
        });
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      status.textContent = '❌ Failed to send. Please try again.';
    });
});
