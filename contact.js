const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');
const submitBtn = form.querySelector('button');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  // 1. Send to YOU
  emailjs.send("service_kavlpaj", "template_2nz3ged", formData)

  // 2. Send auto-reply to CLIENT
  .then(() => {
    return emailjs.send("service_kavlpaj", "template_0wo2j12", formData);
  })

  // 3. Success UI
  .then(() => {
    messageDiv.textContent = "Submitted successfully";
    messageDiv.style.color = "#22c55e";
    form.reset();

    setTimeout(() => {
      messageDiv.textContent = "";
    }, 4000);
  })

  // 4. Error handling
  .catch(() => {
    messageDiv.textContent = "Something went wrong";
    messageDiv.style.color = "red";

    setTimeout(() => {
      messageDiv.textContent = "";
    }, 4000);
  })

  // 5. Reset button
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
});
