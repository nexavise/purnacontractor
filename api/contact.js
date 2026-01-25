import {
  transporter,
  sanitize,
  isEmail,
  isPhone,
  isRequired,
  maxLength,
  rateLimitBasic,
  verifyTurnstileToken,
} from "./_utils.js";

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  console.log("\n[/api/contact] called:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // ✅ Rate limit
  if (!rateLimitBasic(req, res, { windowMs: 15 * 60 * 1000, max: 5 })) return;

  try {
    const ipRaw =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "";

    // remove IPv6 prefix "::ffff:"
    const ip = ipRaw?.replace("::ffff:", "");

    const { name, email, phone, subject, message, turnstileToken } =
      req.body || {};

    /* ================= TURNSTILE ================= */
    if (!isRequired(turnstileToken)) {
      return res.status(400).json({ message: "Turnstile token missing" });
    }

    const verify = await verifyTurnstileToken(turnstileToken, ip);

    if (!verify?.success) {
      return res.status(403).json({
        message: "Bot verification failed",
        errorCodes: verify["error-codes"] || [],
      });
    }

    /* ================= VALIDATION ================= */
    const cleanName = sanitize(name);
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPhone = sanitize(phone);
    const cleanSubject = sanitize(subject);
    const cleanMessage = String(message || "").trim();

    if (
      !isRequired(cleanName) ||
      !isRequired(cleanEmail) ||
      !isRequired(cleanPhone) ||
      !isRequired(cleanSubject)
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isEmail(cleanEmail)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!isPhone(cleanPhone)) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    if (!maxLength(cleanMessage, 2000)) {
      return res
        .status(400)
        .json({ message: "Message too long (max 2000 chars)" });
    }

    /* ================= SEND EMAIL ================= */
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${cleanSubject}`,
      replyTo: cleanEmail,
      html: `
        <h3>Contact Message</h3>
        <p><b>Name:</b> ${escapeHtml(cleanName)}</p>
        <p><b>Email:</b> ${escapeHtml(cleanEmail)}</p>
        <p><b>Phone:</b> ${escapeHtml(cleanPhone)}</p>
        <p><b>Subject:</b> ${escapeHtml(cleanSubject)}</p>
        <p><b>Message:</b><br/>${escapeHtml(cleanMessage).replaceAll(
          "\n",
          "<br/>"
        )}</p>
      `,
    });

    console.log("[/api/contact] Email sent ✅");
    return res.status(200).json({ message: "Message sent successfully ✅" });
  } catch (err) {
    console.error("[/api/contact] ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
