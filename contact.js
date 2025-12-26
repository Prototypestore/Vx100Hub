const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  status.textContent = 'Sending...';

  // Send the form using EmailJS
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(() => {
      status.textContent = '✅ Your message has been sent!';
      form.reset();
    }, (error) => {
      console.error('EmailJS error:', error);
      status.textContent = '❌ Failed to send. Please try again.';
    });
});
