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


export default async function handler(req, res) {
  console.log("\n[/api/contact] called:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // ✅ Rate limit
  if (!rateLimitBasic(req, res, { windowMs: 15 * 60 * 1000, max: 5 })) return;

  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;

    const { name, email, phone, subject, message, turnstileToken } =
      req.body || {};

    /* ================= TURNSTILE ================= */
    if (!isRequired(turnstileToken)) {
      return res.status(400).json({ message: "Turnstile token missing" });
    }

    const verify = await verifyTurnstileToken(turnstileToken, ip);
    if (!verify.success) {
      return res.status(403).json({
        message: "Bot verification failed",
        errorCodes: verify["error-codes"] || [],
      });
    }

    /* ================= VALIDATION ================= */
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

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

    /* ================= EMAIL TEMPLATES ================= */

    const COMPANY_LOGO_URL = process.env.COMPANY_LOGO_URL;
    const COMPANY_NAME = "Purna Contactor";
    const COMPANY_SUPPORT_EMAIL = process.env.EMAIL_USER;
    const COMPANY_Contact_Info = "+91 92137 42903";

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <div style="padding:20px;background:#0f172a;color:#fff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="${COMPANY_NAME}" style="max-height:60px;margin-bottom:10px;" />
          <h2 style="margin:0;font-size:20px;">New Contact Form Submission</h2>
        </div>

        <div style="padding:20px;background:#fff;">
          <p style="margin:0 0 12px 0;">You received a new message from your website contact form.</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Name</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanName}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanEmail}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanPhone}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Subject</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanSubject}</td></tr>
          </table>

          <div style="margin-top:15px;">
            <p style="margin:0 0 5px 0;"><b>Message:</b></p>
            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#f8fafc;white-space:pre-wrap;">${cleanMessage}</div>
          </div>
        </div>

        <div style="padding:15px;background:#f1f5f9;color:#475569;text-align:center;font-size:12px;">
          Sent from ${COMPANY_NAME} website contact form
        </div>
      </div>
    `;

    const userHtml = `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <div style="padding:20px;background:#0f172a;color:#fff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="${COMPANY_NAME}" style="max-height:60px;margin-bottom:10px;" />
          <h2 style="margin:0;font-size:20px;">Thank You for Contacting ${COMPANY_NAME}</h2>
        </div>

        <div style="padding:20px;background:#fff;">
          <p style="font-size:15px;">Hi <b>${cleanName}</b>,</p>

          <p style="font-size:14px;line-height:1.6;">
            Thank you for reaching out to <b>${COMPANY_NAME}</b>.
            We have successfully received your message and our team will contact you soon.
          </p>

          <div style="margin-top:15px;">
            <p style="margin:0 0 5px 0;"><b>Your Message:</b></p>
            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#f8fafc;white-space:pre-wrap;">${cleanMessage}</div>
          </div>

          <p style="margin-top:20px;font-size:14px;">
            If you need urgent help, send a email or contact us at:
            <b>${COMPANY_SUPPORT_EMAIL}</b>
            <b>${COMPANY_Contact_Info}</b>
          </p>

          <p style="margin-top:25px;font-size:14px;">
            Regards,<br/>
            <b>${COMPANY_NAME} Team</b>
          </p>
        </div>

        <div style="padding:15px;background:#f1f5f9;color:#475569;text-align:center;font-size:12px;">
          This is an automated confirmation email. Please do not reply on this email. Thank You.
        </div>
      </div>
    `;

    /* ================= SEND EMAILS ================= */

    // 1) ✅ Send mail to admin (you)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${cleanSubject}`,
      replyTo: cleanEmail, // so you can directly reply to the user
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: `Recieve Contact request - ${COMPANY_NAME}`,
      replyTo: process.env.EMAIL_USER, // user replies to your support email
      html: userHtml,
    });

    console.log("[/api/contact] Admin + User email sent ");
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("[/api/contact] ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
