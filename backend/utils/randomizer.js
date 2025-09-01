// utils/randomizer.js
import Question from "../models/questionModel.js";

export const getRandomQuestions = async () => {
  const count = await Question.countDocuments();
  const random = Math.floor(Math.random() * (count - 10));
  const questions = await Question.find().skip(random).limit(10);
  return questions;
};
