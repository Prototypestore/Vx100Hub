// Initialize EmailJS
emailjs.init("1gpBID1fbY4JDmxMY"); // Replace with your EmailJS public key

// Your Google Sheet JSON endpoint (published or Apps Script web app URL)
const SHEET_JSON_URL = "https://script.google.com/macros/s/AKfycbyaFFQSdfOrmILUeUE2dAZmR-7S-B1iqaxLlewXLZXJXR6Zlrvipmiu9jFY9EwMvj2MIg/exec";

// Function to send email via EmailJS
async function sendEmail(data) {
  try {
    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      service: data.service,
      message: data.message || "No extra details provided",
    };

    await emailjs.send("service_kavlpaj", "template_as22a0t", templateParams);
    console.log(`Email sent to ${data.email}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

// Fetch new submissions from Google Sheet
async function processSubmissions() {
  try {
    const res = await fetch(SHEET_JSON_URL);
    const submissions = await res.json();

    for (let i = 0; i < submissions.length; i++) {
      const row = submissions[i];
      if (!row.emailSent) { // optional flag column to track sent emails
        await sendEmail(row);
        row.emailSent = true; // mark as sent
        // Optional: update back to Sheet via API or another Apps Script endpoint
      }
    }
  } catch (err) {
    console.error("Error fetching submissions:", err);
  }
}

// Run every X seconds/minutes using setInterval (or call via cron on server)
setInterval(processSubmissions, 60 * 1000); // every 60 seconds
