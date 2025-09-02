import Game from "../models/gameModel.js";
import { getRandomQuestions } from "../utils/randomizer.js";

// Prize ladder for 10 questions
const prizeLadder = [
  0, 100, 200, 300, 500, 1000,
  2000, 4000, 8000, 16000, 32000
];

// Start a new game
export const startGame = async (req, res) => {
  try {
    const userId = req.user.id;
    const questions = await getRandomQuestions(10);

    // Make sure we're copying ALL question fields including explanation
    const gameQuestions = questions.map(q => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation, // ✅ Ensure this is copied
      category: q.category // ✅ Copy category too if needed
    }));

    const game = await Game.create({
      user: userId,
      questions: gameQuestions, // Use the mapped questions with all fields
      currentQuestion: 0,
      earnings: 0,
      isOver: false,
      walkedAway: false,
      lifelines: {
        fiftyFifty: true,
        phoneAFriend: true,
        askAudience: true,
        skip: true,
      },
    });

    res.json({ 
      message: "Game started", 
      gameId: game._id, 
      firstQuestion: gameQuestions[0] // Return the first question with explanation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/gameController.js

export const submitAnswer = async (req, res) => {
  try {
    const { gameId, answer } = req.body;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const currentQ = game.questions[game.currentQuestion];
    if (!currentQ) {
      return res.status(400).json({ message: "No current question found" });
    }

    // ✅ ADD DEBUG LOG HERE
    console.log("DEBUG - Current Question Data:", {
      question: currentQ.question,
      correctAnswer: currentQ.correctAnswer,
      hasExplanation: !!currentQ.explanation,
      explanation: currentQ.explanation,
      allFields: Object.keys(currentQ)
    });

    const isCorrect = currentQ.correctAnswer === answer;

    if (isCorrect) {
      // Update prize
      game.earnings = prizeLadder[game.currentQuestion + 1] || game.earnings;
      game.currentQuestion += 1;
      await game.save();

      if (game.currentQuestion < game.questions.length) {
        return res.json({
          correct: true,
          message: `✅ Correct! You earned $${game.earnings}`,
          prize: game.earnings,
          correctAnswer: currentQ.correctAnswer,
          explanation: currentQ.explanation,
          nextQuestion: game.questions[game.currentQuestion],
        });
      } else {
        // Finished all questions
        game.isOver = true;
        await game.save();

        return res.json({
          correct: true,
          message: `🎉 You won the top prize: $${game.earnings}`,
          prize: game.earnings,
          correctAnswer: currentQ.correctAnswer,
          explanation: currentQ.explanation,
        });
      }
    } else {
      // Wrong answer ends the game
      game.isOver = true;
      await game.save();

      return res.json({
        correct: false,
        message: `❌ Wrong answer! You walk away with $${game.earnings}`,
        prize: game.earnings,
        correctAnswer: currentQ.correctAnswer,
        explanation: currentQ.explanation,
      });
    }
  } catch (error) {
    console.error("❌ Error in submitAnswer:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Quit game
export const quitGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);

    if (!game || game.isOver) return res.status(400).json({ message: "No active game found" });

    game.isOver = true;
    game.walkedAway = true;
    await game.save();

    res.json({ message: "🚪 You quit the game", prize: game.earnings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Use lifeline (unchanged)
export const useLifeline = async (req, res) => {
  try {
    const { gameId, type } = req.body;
    const game = await Game.findById(gameId);

    if (!game || game.isOver)
      return res.status(400).json({ message: "No active game found" });

    if (!game.lifelines) {
      game.lifelines = { fiftyFifty: true, askAudience: true, skip: true };
    }

    const currentQ = game.questions[game.currentQuestion];
    const allOptions = [...currentQ.options];
    const correctAnswer = currentQ.correctAnswer;

    switch (type) {
      case "fiftyFifty":
        if (!game.lifelines.fiftyFifty)
          return res.status(400).json({ message: "50:50 already used" });

        const wrongAnswers = allOptions.filter((opt) => opt !== correctAnswer);
        const removed = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);

        game.lifelines.fiftyFifty = false;
        await game.save();

        return res.json({
          message: "50:50 used",
          remainingOptions: allOptions.filter((opt) => !removed.includes(opt)),
        });

      case "askAudience":
        if (!game.lifelines.askAudience)
          return res.status(400).json({ message: "Ask Audience already used" });

        // Random audience poll
        const correctPercent = Math.floor(Math.random() * 30) + 50; // 50-80%
        let remaining = 100 - correctPercent;
        const poll = allOptions.map((opt, i) => {
          if (opt === correctAnswer) return { option: opt, votes: correctPercent };
          const votes = i === allOptions.length - 1
            ? remaining
            : Math.floor(Math.random() * remaining);
          remaining -= votes;
          return { option: opt, votes };
        });

        game.lifelines.askAudience = false;
        await game.save();

        return res.json({ message: "Audience poll used", poll });

      default:
        return res.status(400).json({ message: "Invalid lifeline type" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controllers/gameController.js
export const getActiveGame = async (req, res) => {
  try {
    const userId = req.user.id;
    const game = await Game.findOne({ user: userId, isOver: false });

    if (!game) return res.status(404).json({ message: "No active game found" });

    res.json({
      gameId: game._id,
      currentQuestion: game.questions[game.currentQuestion],
      currentLevel: game.currentQuestion,
      prize: game.earnings,
      usedLifelines: game.lifelines,
      timer: 30 // optional: default or saved timer if you want
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};















