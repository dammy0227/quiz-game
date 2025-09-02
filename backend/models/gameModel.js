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
        explanation: String,  // ✅ Make sure this field exists
        category: String      // ✅ Also add category if needed
      },
    ],
    currentQuestion: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    isOver: { type: Boolean, default: false },
    walkedAway: { type: Boolean, default: false },
    lifelines: {
      fiftyFifty: { type: Boolean, default: true },
      phoneAFriend: { type: Boolean, default: true },
      askAudience: { type: Boolean, default: true },
      skip: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;