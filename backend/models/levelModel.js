import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    label: { type: String, required: true }, 
    description: { type: String },
    order: { type: Number, required: true }, 
    totalQuestions: { type: Number, default: 10 },
    rewardPoints: { type: Number, default: 50 },
  },
  { timestamps: true }
);

const Level = mongoose.model("Level", levelSchema);
export default Level;
