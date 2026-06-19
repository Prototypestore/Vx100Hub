export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { turnstileToken, name, email, phone, service, message } = req.body;

    if (!turnstileToken) {
      return res.status(400).json({ error: "Missing CAPTCHA" });
    }

    // 1. VERIFY TURNSTILE
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken
        })
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res.status(403).json({ error: "CAPTCHA failed" });
    }

    // 2. SEND EMAIL VIA RESEND
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "vx100Hub@outlook.com",
        subject: `New Contact Form: ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Service:</b> ${service}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
        `
      })
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      return res.status(500).json({ error: "Email failed", details: err });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
