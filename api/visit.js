import {
  transporter,
  sanitize,
  isEmail,
  isPhone,
  isRequired,
  rateLimitBasic,
  verifyTurnstileToken,
} from "./_utils.js";

export default async function handler(req, res) {
  console.log("\n[/api/visit] called:", req.method);

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

    const { name, email, phone, service, date, description, turnstileToken } =
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

    /* ================= SANITIZE ================= */
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanService = sanitize(service);
    const cleanDate = sanitize(date);
    const cleanDescription = sanitize(description);

    /* ================= VALIDATION ================= */
    if (!isRequired(cleanName))
      return res.status(400).json({ message: "Name is required" });

    if (!isEmail(cleanEmail))
      return res.status(400).json({ message: "Invalid email" });

    if (!isRequired(cleanService))
      return res.status(400).json({ message: "Service is required" });

    if (!isRequired(cleanDate))
      return res.status(400).json({ message: "Date is required" });

    if (isRequired(cleanPhone) && !isPhone(cleanPhone))
      return res.status(400).json({ message: "Invalid phone number" });

    /* ================= EMAIL TEMPLATES ================= */
    const COMPANY_LOGO_URL = "https://twentyfifh-purana.vercel.app//logo.png";
    const COMPANY_NAME = "Purana Contactor";
    const COMPANY_SUPPORT_EMAIL = process.env.EMAIL_USER;
    const COMPANY_CONTACT_INFO = "+91 92137 42903";

    // ✅ 1) Admin Email
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        
        <div style="padding:20px;background:#0f172a;color:#fff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="${COMPANY_NAME}" style="max-height:60px;margin-bottom:10px;" />
          <h2 style="margin:0;font-size:20px;">New Site Visit Request</h2>
        </div>

        <div style="padding:20px;background:#fff;">
          <p style="margin:0 0 12px 0;">You received a new site visit request from your website.</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Name</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanName}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanEmail}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanPhone || "-"}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Service</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanService}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Date</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanDate}</td></tr>
          </table>

          <div style="margin-top:15px;">
            <p style="margin:0 0 5px 0;"><b>Description:</b></p>
            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#f8fafc;white-space:pre-wrap;">${cleanDescription || "-"}</div>
          </div>
        </div>

        <div style="padding:15px;background:#f1f5f9;color:#475569;text-align:center;font-size:12px;">
          Sent from ${COMPANY_NAME} website site visit form
        </div>
      </div>
    `;

    // ✅ 2) User Confirmation Email
    const userHtml = `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        
        <div style="padding:20px;background:#0f172a;color:#fff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="${COMPANY_NAME}" style="max-height:60px;margin-bottom:10px;" />
          <h2 style="margin:0;font-size:20px;">Site Visit Request Received</h2>
        </div>

        <div style="padding:20px;background:#fff;">
          <p style="font-size:15px;">Hi <b>${cleanName}</b>,</p>

          <p style="font-size:14px;line-height:1.6;">
            Thank you for booking a site visit with <b>${COMPANY_NAME}</b>.
            We have received your request successfully and our team will contact you soon.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:15px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Service</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanService}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Preferred Date</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanDate}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${cleanPhone || "-"}</td></tr>
          </table>

          <div style="margin-top:15px;">
            <p style="margin:0 0 5px 0;"><b>Your Description:</b></p>
            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#f8fafc;white-space:pre-wrap;">${cleanDescription || "-"}</div>
          </div>

          <p style="margin-top:20px;font-size:14px;">
            For urgent help, contact us at:<br/>
            <b>${COMPANY_SUPPORT_EMAIL}</b><br/>
            <b>${COMPANY_CONTACT_INFO}</b>
          </p>

          <p style="margin-top:25px;font-size:14px;">
            Regards,<br/>
            <b>${COMPANY_NAME} Team</b>
          </p>
        </div>

        <div style="padding:15px;background:#f1f5f9;color:#475569;text-align:center;font-size:12px;">
          This is an automated confirmation email. Please do not reply to this email.
        </div>
      </div>
    `;

    /* ================= SEND EMAILS ================= */

    // ✅ Send to Admin
    await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📍 New Site Visit Request – ${cleanService}`,
      replyTo: cleanEmail,
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: `Site Visit Request Received - ${COMPANY_NAME}`,
      replyTo: process.env.EMAIL_USER,
      html: userHtml,
    });

    console.log("[/api/visit] Admin + User email sent ✅");
    return res.status(200).json({ success: true, message: "Request sent ✅" });
  } catch (err) {
    console.error("[/api/visit] ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
