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

    console.log("TOKEN:", token);
    console.log("TOKEN LENGTH:", token?.length);

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
      const reason = data.details?.["error-codes"]?.join(", ")
                  || JSON.stringify(data.details)
                  || data.error
                  || "Request failed";
      throw new Error(reason);
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
    messageDiv.textContent = "Error: " + error.message;
    messageDiv.style.color = "red";
    setTimeout(() => { messageDiv.textContent = ""; }, 6000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
