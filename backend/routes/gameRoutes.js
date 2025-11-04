import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  startGame,
  submitAnswer,
  getActiveGame
} from "../controllers/gameController.js";

const router = express.Router();

// 🎮 Start a new game or move to next level
router.post("/start", protect, startGame);

// 🧠 Submit an answer for the current question
router.post("/answer", protect, submitAnswer);

// 🔍 Get the user’s current active game and question
router.get("/active", protect, getActiveGame);

export default router;
