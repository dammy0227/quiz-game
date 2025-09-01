import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // Multiple-choice options
  correctAnswer: { type: String, required: true }, // Must match one option
  category: { type: String, default: "Cybersecurity" }
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
