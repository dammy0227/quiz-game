import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], 
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true }, 
  explanation: { type: String, required: true }, 
  level: { type: String, enum: ["easy", "intermediate", "hard"], required: true }, 
  category: { type: String, default: "Cybersecurity" }, 
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
