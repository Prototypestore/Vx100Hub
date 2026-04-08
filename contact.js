const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('https://script.google.com/macros/s/AKfycbybMkX7srCoofPI0yJOSq-97JiTn6ResnyyJBt0_CQkXBRl6HmGSD9QWGinOdJomOMWGQ/exec', {
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
