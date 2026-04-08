const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('YOUR_REAL_WEB_APP_URL_HERE', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === "success") {
      messageDiv.textContent = "Form submitted successfully!";
      messageDiv.style.color = "green";
      form.reset();
    } else {
      messageDiv.textContent = "Something went wrong.";
      messageDiv.style.color = "red";
    }
  })
  .catch(err => {
    console.error(err);
    messageDiv.textContent = "Something went wrong.";
    messageDiv.style.color = "red";
  });
});
