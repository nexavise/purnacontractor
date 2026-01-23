const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

/* ================= GLOBAL SECURITY ================= */

// Security headers
app.use(helmet());

// Allow only your frontend
app.use(
  cors({
    origin: [
      // "https://yourdomain.com",
      // "http://localhost:5173", // dev only
      "http://localhost:5000"   // temperary perpose
    ],
    methods: ["POST"],
  })
);

// Limit payload size
app.use(express.json({ limit: "10kb" }));

/* ================= RATE LIMIT ================= */

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many requests. Try again later." },
});

/* ================= API KEY ================= */

const verifyApiKey = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== process.env.API_SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

/* ================= HELPERS ================= */

const sanitize = (str = "") =>
  String(str).replace(/[<>]/g, "").trim();

const isEmail = (email = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isRequired = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

const isPhone = (phone = "") =>
  /^\d{10}$/.test(phone);

const maxLength = (value = "", len) =>
  String(value).length <= len;

/* ================= MAILER ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= QUOTE ================= */

app.post("/api/quote", formLimiter, verifyApiKey, async (req, res) => {
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
  } = req.body;

  if (!isRequired(fullName))
    return res.status(400).json({ message: "Full name is required" });

  if (!isPhone(phone))
    return res.status(400).json({ message: "Phone must be 10 digits" });

  if (email && !isEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  if (!maxLength(message, 1000))
    return res.status(400).json({ message: "Message too long" });

  try {
    await transporter.sendMail({
      from: `"Purna Contractor" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📋 New Quote Request",
      html: `
        <h2>New Quote Request</h2>

        <h3>Personal Info</h3>
        <p><b>Name:</b> ${sanitize(fullName)}</p>
        <p><b>Email:</b> ${sanitize(email)}</p>
        <p><b>Phone:</b> ${sanitize(phone)}</p>
        <p><b>Address:</b> ${sanitize(address)}</p>

        <h3>Project Details</h3>
        <p><b>Project Type:</b> ${sanitize(projectType)}</p>
        <p><b>Service Type:</b> ${sanitize(serviceType)}</p>
        <p><b>Property Type:</b> ${sanitize(propertyType)}</p>
        <p><b>Square Footage:</b> ${sanitize(squareFootage)}</p>
        <p><b>Rooms:</b> ${sanitize(rooms)}</p>
        <p><b>Timeframe:</b> ${sanitize(timeframe)}</p>
        <p><b>Budget:</b> ${sanitize(budget)}</p>

        <h3>Message</h3>
        <p>${sanitize(message)}</p>
      `,
    });

    res.json({ message: "Quote sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= CONTACT ================= */

app.post("/api/contact", formLimiter, verifyApiKey, async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!isRequired(name))
    return res.status(400).json({ message: "Name is required" });

  if (!isEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  if (!isRequired(subject))
    return res.status(400).json({ message: "Subject is required" });

  if (!maxLength(message, 1000))
    return res.status(400).json({ message: "Message too long" });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: sanitize(subject),
      html: `
        <h3>Contact Message</h3>
        <p><b>Name:</b> ${sanitize(name)}</p>
        <p><b>Email:</b> ${sanitize(email)}</p>
        <p><b>Phone:</b> ${sanitize(phone)}</p>
        <p><b>Message:</b><br/>${sanitize(message)}</p>
      `,
    });

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ENQUIRY ================= */

app.post("/api/enquiry", formLimiter, verifyApiKey, async (req, res) => {
  const { name, email, service, description } = req.body;

  if (!isRequired(name))
    return res.status(400).json({ message: "Name is required" });

  if (!isEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  if (!isRequired(service))
    return res.status(400).json({ message: "Service is required" });

  if (!maxLength(description, 1000))
    return res.status(400).json({ message: "Description too long" });

  try {
    await transporter.sendMail({
      from: `"Project Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Project Enquiry",
      html: `
        <h3>Project Enquiry</h3>
        <p><b>Name:</b> ${sanitize(name)}</p>
        <p><b>Email:</b> ${sanitize(email)}</p>
        <p><b>Service:</b> ${sanitize(service)}</p>
        <p><b>Description:</b><br/>${sanitize(description)}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ================= VISIT ================= */

app.post("/api/visit", formLimiter, verifyApiKey, async (req, res) => {
  const { name, email, phone, service, date, description } = req.body;

  if (!isRequired(name))
    return res.status(400).json({ message: "Name is required" });

  if (!isEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  if (!isRequired(service))
    return res.status(400).json({ message: "Service is required" });

  if (!isRequired(date))
    return res.status(400).json({ message: "Date is required" });

  if (phone && !isPhone(phone))
    return res.status(400).json({ message: "Invalid phone number" });

  try {
    await transporter.sendMail({
      from: `"Purna Contractor" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Site Visit – ${sanitize(service)}`,
      html: `
        <h3>Site Visit Request</h3>
        <p><b>Name:</b> ${sanitize(name)}</p>
        <p><b>Email:</b> ${sanitize(email)}</p>
        <p><b>Phone:</b> ${sanitize(phone)}</p>
        <p><b>Service:</b> ${sanitize(service)}</p>
        <p><b>Date:</b> ${sanitize(date)}</p>
        <p><b>Description:</b><br/>${sanitize(description)}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});
