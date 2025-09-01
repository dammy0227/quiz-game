import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        selectedAnswer: String,
      },
    ],
    currentQuestion: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 }, // current winnings
    isOver: { type: Boolean, default: false },
    walkedAway: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;
