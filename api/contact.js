export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      turnstileToken,
      name,
      email,
      phone,
      service,
      message
    } = req.body || {};

    if (!turnstileToken) {
      return res.status(400).json({ error: "Missing CAPTCHA" });
    }

    // 🔐 CHECK ENV VARS FIRST (THIS IS THE REAL FAILURE POINT)
    if (!process.env.TURNSTILE_SECRET_KEY || !process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "Server misconfigured (missing environment variables)"
      });
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
      return res.status(403).json({
        error: "CAPTCHA failed",
        details: verifyData
      });
    }

    // 2. SEND EMAIL (RESEND)
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Vx100Hub <onboarding@resend.dev>",
        to: ["vx100Hub@outlook.com"],
        subject: `New Contact Form: ${service || "No service selected"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${name || "N/A"}</p>
          <p><b>Email:</b> ${email || "N/A"}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Service:</b> ${service || "N/A"}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
        `
      })
    });

    const emailText = await emailRes.text();

    if (!emailRes.ok) {
      return res.status(500).json({
        error: "Email failed",
        details: emailText
      });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
