const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');
const submitBtn = form.querySelector('button');

// Initialize EmailJS
emailjs.init({
  publicKey: "1gpBID1fbY4JDmxMY"
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // ✅ TURNSTILE TOKEN CHECK (NEW)
  const token = document.querySelector('[name="cf-turnstile-response"]')?.value;

  if (!token) {
    messageDiv.textContent = "Please complete the CAPTCHA";
    messageDiv.style.color = "red";

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    return;
  }

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value,

    // ✅ send token forward (needed for backend step later)
    turnstileToken: token
  };

  emailjs.send(
    "service_kavlpaj",
    "template_2nz3ged",
    formData
  )

  .then(() => {
    return emailjs.send(
      "service_kavlpaj",
      "template_0wo2j12",
      formData
    );
  })

  .then(() => {
    messageDiv.textContent = "Submitted successfully";
    messageDiv.style.color = "#22c55e";

    form.reset();

    setTimeout(() => {
      messageDiv.textContent = "";
    }, 4000);
  })

  .catch((error) => {
    console.error(error);

    messageDiv.textContent = "Something went wrong";
    messageDiv.style.color = "red";

    setTimeout(() => {
      messageDiv.textContent = "";
    }, 4000);
  })

  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
});
