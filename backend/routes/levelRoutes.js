import express from "express";
import { getLevels, seedLevels } from "../controllers/levelController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get("/", protect, getLevels);

router.post("/seed", seedLevels);

export default router;
