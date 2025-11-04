// models/questionModel.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // Multiple choice options
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true }, 
  explanation: { type: String, required: true }, // Why the answer is correct
  level: { type: String, enum: ["easy", "intermediate", "hard"], required: true }, // Difficulty level
  category: { type: String, default: "Cybersecurity" }, // Optional field
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
