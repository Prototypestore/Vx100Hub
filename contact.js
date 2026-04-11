const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');
const submitBtn = form.querySelector('button');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Disable button + show loading
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData(form);

  fetch('https://script.google.com/macros/s/AKfycbx4H4FuA2aepipxCU4xlfd7F6rLcvwTAHlDDdn8L_S2ZOA6cR9cRt2oLDuZ5JcIE0Nt/exec', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === "success") {
      messageDiv.textContent = "Submitted successfully";
      messageDiv.style.color = "#22c55e"; // lighter green
      form.reset();
    } else {
      messageDiv.textContent = "Something went wrong";
      messageDiv.style.color = "red";
    }

    // Auto-hide message after 4 seconds
    setTimeout(() => {
      messageDiv.textContent = "";
    }, 4000);
  })
  .catch(() => {
    messageDiv.textContent = "Something went wrong";
    messageDiv.style.color = "red";

    // Auto-hide error too
    setTimeout(() => {
      messageDiv.textContent = "";
    }, 4000);
  })
  .finally(() => {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
});
