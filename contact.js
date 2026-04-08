const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather form data
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    message: form.message.value.trim()
  };

  // Send to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbybMkX7srCoofPI0yJOSq-97JiTn6ResnyyJBt0_CQkXBRl6HmGSD9QWGinOdJomOMWGQ/exec', { // replace with your web app URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === "success") {
      messageDiv.textContent = "Form submitted successfully!";
      messageDiv.style.color = "green";
      form.reset();
    } else {
      messageDiv.textContent = `Error: ${data.message || "Try again."}`;
      messageDiv.style.color = "red";
    }
  })
  .catch(err => {
    console.error(err);
    messageDiv.textContent = "Something went wrong. Try again.";
    messageDiv.style.color = "red";
  });
});
