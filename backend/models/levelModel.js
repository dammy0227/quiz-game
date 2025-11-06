import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // easy, intermediate, hard
    label: { type: String, required: true }, // e.g. "Easy"
    description: { type: String },
    order: { type: Number, required: true }, // 1, 2, 3...
    totalQuestions: { type: Number, default: 10 },
    rewardPoints: { type: Number, default: 50 },
  },
  { timestamps: true }
);

const Level = mongoose.model("Level", levelSchema);
export default Level;
