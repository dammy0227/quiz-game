import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { startGame, submitAnswer, quitGame, useLifeline , getActiveGame} from "../controllers/gameController.js";

const router = express.Router();

// Start new game (get random 10 questions)
router.post("/start", protect, startGame);

// Submit an answer
router.post("/answer", protect, submitAnswer);

// Quit game
router.post("/quit", protect, quitGame);

// Use lifeline (50-50, ask friend, etc.)
router.post("/lifeline", protect, useLifeline);

// routes/gameRoutes.js
router.get("/active", protect, getActiveGame);


export default router;
