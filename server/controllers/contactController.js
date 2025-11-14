// controllers/contactController.js
import ContactMessage from "../models/ContactMessage.js";
import asyncHandler from "../middleware/asyncHandler.js";
import nodemailer from "nodemailer";

// helper: create transporter if SMTP env is present
const makeTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for 587/2525
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject = "", message, hp } = req.body;

  // Honeypot: if filled -> silently accept but mark as bot
  const isBot = Boolean(hp && String(hp).trim().length > 0);

  // Basic validation
  if (!name?.trim()) {
    res.status(400);
    throw new Error("Name is required");
  }
  if (!email?.trim()) {
    res.status(400);
    throw new Error("Email is required");
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }
  if (!message?.trim() || message.trim().length < 5) {
    res.status(400);
    throw new Error("Message must be at least 5 characters");
  }

  // Save to DB
  const doc = await ContactMessage.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject?.trim() || "",
    message: message.trim(),
    isBot,
    meta: {
      ip: req.ip,
      userAgent: req.get("user-agent"),
    },
  });

  // Optionally send email if SMTP configured and not a bot
  const transporter = makeTransporter();
  if (transporter && !isBot) {
    const {
      CONTACT_TO = process.env.SMTP_USER, // fallback to SMTP user
      CONTACT_FROM = process.env.SMTP_USER,
      BRAND_NAME = "Amur",
    } = process.env;

    const ownerMail = {
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: `[${BRAND_NAME}] New contact message: ${doc.subject || "(no subject)"}`,
      text: `From: ${doc.name} <${doc.email}>\nSubject: ${doc.subject}\n\n${doc.message}\n\nIP: ${doc.meta?.ip}\nUA: ${doc.meta?.userAgent}`,
    };

    const ackMail = {
      from: CONTACT_FROM,
      to: doc.email,
      subject: `Thanks for contacting ${BRAND_NAME}`,
      text:
        `Hi ${doc.name},\n\n` +
        `Thanks for reaching out! We received your message and will get back to you soon.\n\n` +
        `Subject: ${doc.subject || "(no subject)"}\n\n` +
        `${doc.message}\n\n` +
        `— ${BRAND_NAME} Team`,
    };

    // fire-and-forget; don't fail the API if email fails
    try { await transporter.sendMail(ownerMail); } catch (e) { /* noop */ }
    try { await transporter.sendMail(ackMail); } catch (e) { /* noop */ }
  }

  res.status(201).json({ success: true, data: { id: doc._id } });
});

// @desc    List contact messages (admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const listContactMessages = asyncHandler(async (req, res) => {
  const msgs = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: msgs });
});

// @desc    Get a single message (admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactMessageById = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id).lean();
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json({ success: true, data: msg });
});
