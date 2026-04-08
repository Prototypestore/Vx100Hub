const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the default submit

  // collect form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  // send to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbybMkX7srCoofPI0yJOSq-97JiTn6ResnyyJBt0_CQkXBRl6HmGSD9QWGinOdJomOMWGQ/exec', { // your web app URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      // success message
      messageDiv.textContent = "Form submitted successfully!";
      messageDiv.style.color = "green";
      form.reset(); // clears the form
    } else {
      // if Google Sheets failed
      messageDiv.textContent = "Something went wrong. Try again.";
      messageDiv.style.color = "red";
    }
  })
  .catch(error => {
    // network errors
    messageDiv.textContent = "Something went wrong. Try again.";
    messageDiv.style.color = "red";
    console.error(error);
  });
});
