export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { turnstileToken } = req.body;

  if (!turnstileToken) {
    return res.status(400).json({ error: "Missing Turnstile token" });
  }

  // VERIFY TURNSTILE
  const verifyResponse = await fetch(
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

  const verifyData = await verifyResponse.json();

  if (!verifyData.success) {
    return res.status(403).json({ error: "Invalid Turnstile" });
  }

  // TEMP RESPONSE (we connect email next)
  return res.status(200).json({
    success: true,
    message: "Turnstile verified"
  });
}
