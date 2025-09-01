import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, getHistory } from "../controllers/userController.js";

const router = express.Router();

// Get user profile
router.get("/profile", protect, getProfile);

// Get user game history
router.get("/history", protect, getHistory);

export default router;
