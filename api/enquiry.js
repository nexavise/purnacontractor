import {
  transporter,
  sanitize,
  isEmail,
  isRequired,
  maxLength,
  rateLimitBasic,
  verifyTurnstileToken,
} from "./_utils.js";

export default async function handler(req, res) {
  console.log("\n[/api/enquiry] called:", req.method);

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  // ✅ rate limit
  if (!rateLimitBasic(req, res, { windowMs: 15 * 60 * 1000, max: 5 })) return;

  try {
    const { name, email, service, description, turnstileToken } = req.body || {};

    /* ================= TURNSTILE ================= */
    if (!isRequired(turnstileToken)) {
      return res.status(400).json({ message: "Turnstile token missing" });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;

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
    const cleanService = sanitize(service);
    const cleanDescription = sanitize(description);

    if (!isRequired(cleanName))
      return res.status(400).json({ message: "Name is required" });

    if (!isEmail(cleanEmail))
      return res.status(400).json({ message: "Invalid email" });

    if (!isRequired(cleanService))
      return res.status(400).json({ message: "Service is required" });

    if (!maxLength(cleanDescription, 1000))
      return res.status(400).json({ message: "Description too long" });

    /* ================= EMAIL TEMPLATE ================= */
    const COMPANY_LOGO_URL = "https://twentyfifh-purana.vercel.app//logo.png";
    const COMPANY_NAME = "Purana Contactor";

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        
        <div style="padding:20px;background:#0f172a;color:#fff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="${COMPANY_NAME}" style="max-height:60px;margin-bottom:10px;" />
          <h2 style="margin:0;font-size:20px;">New Project Enquiry</h2>
        </div>

        <div style="padding:20px;background:#fff;">
          <p style="margin:0 0 12px 0;">You received a new enquiry from your website.</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Name</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Email</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanEmail}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Service</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanService}</td>
            </tr>
          </table>

          <div style="margin-top:15px;">
            <p style="margin:0 0 5px 0;"><b>Description:</b></p>
            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#f8fafc;white-space:pre-wrap;">${cleanDescription}</div>
          </div>
        </div>

        <div style="padding:15px;background:#f1f5f9;color:#475569;text-align:center;font-size:12px;">
          Sent from ${COMPANY_NAME} website enquiry form
        </div>
      </div>
    `;

    /* ================= SEND EMAIL (ADMIN ONLY) ================= */
    await transporter.sendMail({
      from: `"Project Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Project Enquiry: ${cleanService}`,
      replyTo: cleanEmail,
      html: adminHtml,
    });

    console.log("[/api/enquiry] Admin email sent ✅");
    return res.status(200).json({ success: true, message: "Enquiry sent" });
  } catch (err) {
    console.error("[/api/enquiry] ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
