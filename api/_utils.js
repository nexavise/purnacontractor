import nodemailer from "nodemailer";

/* ================= HELPERS ================= */
export const sanitize = (str = "") => String(str).replace(/[<>]/g, "").trim();

export const isEmail = (email = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

export const isRequired = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

export const isPhone = (phone = "") => /^\d{10}$/.test(String(phone).trim());

export const maxLength = (value = "", len) => String(value ?? "").length <= len;

/* ================= RATE LIMIT (Simple) ================= */
/**
 * In-memory limiter per function instance.
 * Works on Vercel serverless but resets per cold start.
 */
const ipHits = new Map();

export const rateLimitBasic = (
  req,
  res,
  { windowMs = 15 * 60 * 1000, max = 5 } = {}
) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const record = ipHits.get(ip) || { count: 0, start: now };

  // reset window
  if (now - record.start > windowMs) {
    record.count = 0;
    record.start = now;
  }

  record.count += 1;
  ipHits.set(ip, record);

  if (record.count > max) {
    res.status(429).json({ message: "Too many requests. Try again later." });
    return false;
  }

  return true;
};

/* ================= TURNSTILE VERIFY ================= */
export const verifyTurnstileToken = async (turnstileToken, ip = null) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.log("[Turnstile] ERROR: TURNSTILE_SECRET_KEY missing in env");
    return { success: false, "error-codes": ["missing-secret"] };
  }

  if (!turnstileToken) {
    return { success: false, "error-codes": ["missing-input-response"] };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", turnstileToken);
  if (ip) formData.append("remoteip", ip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log("[Turnstile] verify result:", {
      success: result.success,
      errorCodes: result["error-codes"],
    });

    return result;
  } catch (err) {
    console.error("[Turnstile] verification request failed:", err);
    return { success: false, "error-codes": ["turnstile-fetch-failed"] };
  }
};

/* ================= MAILER ================= */
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
