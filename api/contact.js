export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { turnstileToken, name, email, phone, service, message } = req.body;

  if (!turnstileToken) {
    return res.status(400).json({ error: "Missing CAPTCHA" });
  }

  // 🔐 STEP 1: VERIFY TURNSTILE WITH CLOUDFLARE
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", turnstileToken);

  const verifyRes = await fetch(verifyUrl, {
    method: "POST",
    body: formData
  });

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return res.status(403).json({ error: "CAPTCHA failed" });
  }

  // 🔐 STEP 2: SEND EMAIL (EmailJS server-side trigger placeholder)
  // IMPORTANT: We will plug EmailJS here next step

  const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    service_id: "service_kavlpaj",
    template_id: "template_2nz3ged",
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: {
      name,
      email,
      phone,
      service,
      message
    }
  })
});

if (!emailjsResponse.ok) {
  return res.status(500).json({ error: "Email failed to send" });
}

return res.status(200).json({
  success: true,
  message: "Email sent successfully"
});
