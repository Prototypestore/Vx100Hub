const form = document.getElementById('form');
const messageDiv = document.getElementById('form-message');
const submitBtn = form.querySelector('button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  try {
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
      turnstileToken: token
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Non-JSON response from server:", text);
      throw new Error("Server returned invalid response");
    }

    if (!res.ok) {
      // Full details logged for you, the developer, only.
      console.error("Form submission failed:", data);
      throw new Error("Request failed");
    }

    messageDiv.textContent = "Submitted successfully";
    messageDiv.style.color = "#22c55e";
    form.reset();
    if (window.turnstile) {
      turnstile.reset();
    }
    setTimeout(() => { messageDiv.textContent = ""; }, 4000);

  } catch (error) {
    console.error(error);
    messageDiv.textContent = "Something went wrong. Please try again later.";
    messageDiv.style.color = "red";
    setTimeout(() => { messageDiv.textContent = ""; }, 4000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
