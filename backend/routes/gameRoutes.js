import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  startGame,
  submitAnswer,
  getActiveGame
} from "../controllers/gameController.js";

const router = express.Router();

router.post("/start", protect, startGame);

router.post("/answer", protect, submitAnswer);

router.get("/active", protect, getActiveGame);

export default router;
