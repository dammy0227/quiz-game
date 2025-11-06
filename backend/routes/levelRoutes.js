import express from "express";
import { getLevels, seedLevels } from "../controllers/levelController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

// ✅ Fetch levels
router.get("/", protect, getLevels);

// ⚙️ Developer route (one-time seed)
router.post("/seed", seedLevels);

export default router;
