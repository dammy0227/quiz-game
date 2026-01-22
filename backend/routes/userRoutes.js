import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, getHistory } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.get("/history", protect, getHistory);

export default router;
