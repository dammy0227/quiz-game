import Question from "../models/questionModel.js";

/**
 * Get a random subset of questions for a given difficulty level.
 * @param {string} difficulty - "easy", "intermediate", or "hard"
 * @param {number} limit - number of random questions to return (default = 10)
 * @returns {Promise<Array>} - Array of random question objects
 */
export const getRandomQuestions = async (difficulty, limit = 10) => {
  try {
    // ✅ Use 'level' instead of 'difficulty'
    const allQuestions = await Question.find({ level: difficulty });

    // If there are fewer than 'limit', just return all of them
    if (allQuestions.length <= limit) return allQuestions;

    // Randomly shuffle and pick 'limit' number of questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error("Error fetching random questions:", error.message);
    throw error;
  }
};
