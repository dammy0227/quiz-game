import Game from "../models/gameModel.js";
import { getRandomQuestions } from "../utils/randomizer.js";

/**
 * Start a new game or continue to next level
 */
export const startGame = async (req, res) => {
  try {
    const userId = req.user.id;
    let game = await Game.findOne({ user: userId });

    // 🎮 If no game yet, start from "easy"
    if (!game) {
      const easyQuestions = await getRandomQuestions("easy", 10);

      game = await Game.create({
        user: userId,
        currentLevel: "easy",
        questions: easyQuestions.map((q) => ({
          questionId: q._id,
          selectedAnswer: null,
          isCorrect: false,
        })),
        currentQuestionIndex: 0,
        score: 0,
        completedLevels: [],
      });

      return res.status(201).json({
        message: "New game started at Easy level",
        game,
        questions: easyQuestions,
      });
    }

    // 🧠 If player already has a game
    if (game.isCompleted) {
      return res.json({ message: "You’ve already completed all levels!", game });
    }

    return res.json({
      message: "Game already in progress",
      game,
    });
  } catch (error) {
    res.status(500).json({ message: "Error starting game", error: error.message });
  }
};

/**
 * Submit an answer for the current question
 */
export const submitAnswer = async (req, res) => {
  try {
    const { gameId, answer } = req.body;
    const game = await Game.findById(gameId).populate("questions.questionId");

    if (!game) return res.status(404).json({ message: "Game not found" });

    const currentIndex = game.currentQuestionIndex;
    const currentQ = game.questions[currentIndex];
    const questionDoc = currentQ.questionId;

    if (!questionDoc) return res.status(400).json({ message: "Invalid question data" });

    const isCorrect = questionDoc.correctAnswer === answer;

    currentQ.selectedAnswer = answer;
    currentQ.isCorrect = isCorrect;

    if (!isCorrect) {
      // ❌ Wrong answer → reset score and restart same level with new random questions
      game.score = 0;
      game.currentQuestionIndex = 0;

      // Fetch new random questions for the same level (Math.random style)
      const newQuestions = await getRandomQuestions(game.currentLevel, 10);
      game.questions = newQuestions.map((q) => ({
        questionId: q._id,
        selectedAnswer: null,
        isCorrect: false,
      }));

      await game.save();

      return res.json({
        correct: false,
        failed: true, // frontend knows this is a fail
        message: `❌ Wrong answer! Restarting ${game.currentLevel} level with new questions.`,
        explanation: questionDoc.explanation,
        score: game.score,
        questions: newQuestions.map((q) => ({
          question: q.question,
          options: q.options,
          level: q.level,
        })),
      });
    }

    // ✅ Correct answer
    game.score += 1;
    game.currentQuestionIndex += 1;

    const levelCompleted = game.currentQuestionIndex >= game.questions.length;

    if (levelCompleted) {
      if (!game.completedLevels.includes(game.currentLevel)) {
        game.completedLevels.push(game.currentLevel);
      }

      const nextLevel = getNextLevel(game.currentLevel);
      if (nextLevel) {
        const nextQuestions = await getRandomQuestions(nextLevel, 10);
        game.currentLevel = nextLevel;
        game.questions = nextQuestions.map((q) => ({
          questionId: q._id,
          selectedAnswer: null,
          isCorrect: false,
        }));
        game.currentQuestionIndex = 0;
        game.score = 0;

        await game.save();

        return res.json({
          correct: true,
          message: `✅ Level ${currentQ.questionId.level.toUpperCase()} completed! Moving to ${nextLevel}.`,
          explanation: currentQ.questionId.explanation,
          nextLevel,
          questions: nextQuestions.map((q) => ({
            question: q.question,
            options: q.options,
            level: q.level,
          })),
        });
      } else {
        game.isCompleted = true;
        await game.save();

        return res.json({
          correct: true,
          message: "🎉 Congratulations! You’ve completed all levels.",
          totalScore: game.score,
          completedLevels: game.completedLevels,
        });
      }
    }

    await game.save();

    // 👉 Send next question
    const nextQ = game.questions[game.currentQuestionIndex].questionId;
    res.json({
      correct: true,
      explanation: currentQ.questionId.explanation,
      nextQuestion: {
        question: nextQ.question,
        options: nextQ.options,
        level: nextQ.level,
      },
      score: game.score,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting answer", error: error.message });
  }
};

// Helper to get next level
const getNextLevel = (currentLevel) => {
  const levels = ["easy", "intermediate", "hard"];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
};
/**
 * Get current active game
 */
export const getActiveGame = async (req, res) => {
  try {
    const userId = req.user.id;
    let game = await Game.findOne({ user: userId, isCompleted: false })
      .populate("questions.questionId");

    if (!game) {
      return res.status(404).json({ message: "No active game found" });
    }

    const currentQuestionData = game.questions[game.currentQuestionIndex];
    const currentQ = currentQuestionData?.questionId;

    // 🧩 Auto-fix broken game
    if (!currentQ) {
      console.log("⚠️ Fixing broken game for user:", userId);
      const newQs = await getRandomQuestions("easy", 10);
      game.questions = newQs.map((q) => ({
        questionId: q._id,
        selectedAnswer: null,
        isCorrect: false,
      }));
      game.currentQuestionIndex = 0;
      await game.save();

      return res.json({
        message: "Fixed broken game and restarted",
        gameId: game._id,
        currentLevel: game.currentLevel,
        score: game.score,
        currentQuestion: {
          question: newQs[0].question,
          options: newQs[0].options,
          level: newQs[0].level,
        },
      });
    }

    // ✅ Normal response
    res.json({
      gameId: game._id,
      currentLevel: game.currentLevel,
      score: game.score,
      currentQuestion: {
        question: currentQ.question,
        options: currentQ.options,
        level: currentQ.level,
      },
      completedLevels: game.completedLevels,
    });
  } catch (error) {
    console.error("Error in getActiveGame:", error);
    res.status(500).json({ message: "Error fetching game", error: error.message });
  }
};


 