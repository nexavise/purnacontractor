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
  console.log("\n[/api/quote] called:", req.method);

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

    const {
      fullName,
      email,
      phone,
      address,
      projectType,
      serviceType,
      propertyType,
      squareFootage,
      rooms,
      timeframe,
      budget,
      message,
      turnstileToken,
    } = req.body || {};

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

    /* ================= VALIDATION + SANITIZE ================= */
    const cleanFullName = sanitize(fullName);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanAddress = sanitize(address);
    const cleanProjectType = sanitize(projectType);
    const cleanServiceType = sanitize(serviceType);
    const cleanPropertyType = sanitize(propertyType);
    const cleanSquareFootage = sanitize(squareFootage);
    const cleanRooms = sanitize(rooms);
    const cleanTimeframe = sanitize(timeframe);
    const cleanBudget = sanitize(budget);
    const cleanMessage = sanitize(message);

    if (!isRequired(cleanFullName)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    if (!isPhone(cleanPhone)) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    if (isRequired(cleanEmail) && !isEmail(cleanEmail)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!maxLength(cleanMessage, 1000)) {
      return res.status(400).json({ message: "Message too long" });
    }

    /* ================= EMAIL TEMPLATE ================= */
    const COMPANY_LOGO_URL = "https://twentyfifh-purana.vercel.app//logo.png";
    const COMPANY_NAME = "Purana Contactor";

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        
        <div style="padding:20px;background:#0f172a;color:#fff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="${COMPANY_NAME}" style="max-height:60px;margin-bottom:10px;" />
          <h2 style="margin:0;font-size:20px;">📋 New Quote Request</h2>
        </div>

        <div style="padding:20px;background:#fff;">
          <p style="margin:0 0 12px 0;">You received a new quote request from your website.</p>

          <h3 style="margin:18px 0 10px 0;font-size:16px;color:#0f172a;">Personal Info</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Name</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanFullName}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Email</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanEmail || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanPhone}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Address</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanAddress || "-"}</td>
            </tr>
          </table>

          <h3 style="margin:22px 0 10px 0;font-size:16px;color:#0f172a;">Project Details</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Project Type</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanProjectType || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Service Type</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanServiceType || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Property Type</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanPropertyType || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Square Footage</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanSquareFootage || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Rooms</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanRooms || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Timeframe</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanTimeframe || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><b>Budget</b></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${cleanBudget || "-"}</td>
            </tr>
          </table>

          <div style="margin-top:18px;">
            <p style="margin:0 0 5px 0;"><b>Message:</b></p>
            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#f8fafc;white-space:pre-wrap;">${cleanMessage || "-"}</div>
          </div>
        </div>

        <div style="padding:15px;background:#f1f5f9;color:#475569;text-align:center;font-size:12px;">
          Sent from ${COMPANY_NAME} website quote form
        </div>
      </div>
    `;

    /* ================= SEND EMAIL (ADMIN ONLY) ================= */
    await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📋 New Quote Request",
      replyTo: cleanEmail ? cleanEmail : undefined,
      html: adminHtml,
    });

    console.log("[/api/quote] Quote email sent ✅");
    return res.status(200).json({ message: "Quote sent successfully ✅" });
  } catch (err) {
    console.error("[/api/quote] ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
