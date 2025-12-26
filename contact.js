 // Initialize EmailJS with your Public Key
  emailjs.init('1gpBID1fbY4JDmxMY');

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    status.textContent = 'Sending...';

    // 1️⃣ Send booking email to YOU
    emailjs.sendForm(
      'YOUR_SERVICE_ID',         // ← replace with your Service ID (Outlook)
      'TEMPLATE_TO_YOU_ID',      // ← replace with Template A ID (booking email to you)
      this
    ).then(() => {
      // 2️⃣ Send auto-reply to USER
      return emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'TEMPLATE_AUTOREPLY_ID', // ← replace with Template B ID (thank-you email)
        this
      );
    }).then(() => {
      status.textContent = '✅ Booking request sent!';
      form.reset();
    }).catch((error) => {
      console.error('EmailJS error:', error);
      status.textContent = '❌ Failed to send. Please try again.';
    });
  });
