// routes/contactRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  createContactMessage,
  listContactMessages,
  getContactMessageById,
} from "../controllers/contactController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,                  // limit each IP to 5 POSTs per window
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", contactLimiter, createContactMessage);
router.get("/", protect, isAdmin, listContactMessages);
router.get("/:id", protect, isAdmin, getContactMessageById);

export default router;
