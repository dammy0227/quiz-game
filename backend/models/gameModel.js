import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    currentLevel: {
      type: String,
      enum: ["easy", "intermediate", "hard"],
      default: "easy",
    },

    currentQuestionIndex: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    completedLevels: [{ type: String, enum: ["easy", "intermediate", "hard"] }],
    isCompleted: { type: Boolean, default: false },

    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedAnswer: { type: mongoose.Schema.Types.Mixed, default: null },
        isCorrect: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;
