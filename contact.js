document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // stop normal form submit
  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data
  })
  .then(response => response.text())
  .then(() => {
    window.location.href = "thank-you.html"; // redirect manually
  })
  .catch(err => {
    document.getElementById("form-status").textContent = "Oops! Something went wrong.";
    console.error(err);
  });
});
