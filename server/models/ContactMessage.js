// models/ContactMessage.js
import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true, minlength: 5 },
    // optional: basic client info for troubleshooting
    meta: {
      ip: String,
      userAgent: String,
    },
    // simple honeypot flag if you want to store detection
    isBot: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
