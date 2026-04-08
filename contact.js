// Grab the form
const form = document.getElementById('form');

// Google Sheets Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbybMkX7srCoofPI0yJOSq-97JiTn6ResnyyJBt0_CQkXBRl6HmGSD9QWGinOdJomOMWGQ/exec'; // replace with your Web App URL

form.addEventListener('submit', e => {
  e.preventDefault(); // stop default submit behavior

  // Get form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  // Send data to Google Sheets
  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(() => {
    alert('Submitted successfully!');
    form.reset(); // reset the form
  })
  .catch(err => {
    console.error('Error!', err.message);
    alert('There was an error submitting the form.');
  });
});
