import Game from "../models/gameModel.js";
import Level from "../models/levelModel.js";
import { getRandomQuestions } from "../utils/randomizer.js";

export const startGame = async (req, res) => {
  try {
    const userId = req.user.id;
    const { level } = req.body;

    const levels = await Level.find().sort({ order: 1 });
    const levelData = levels.find((lvl) => lvl.name === level);
    if (!levelData) return res.status(400).json({ message: "Invalid level" });

    const questions = await getRandomQuestions(level, levelData.totalQuestions);
    if (!questions || questions.length === 0) return res.status(400).json({ message: `No questions found for level: ${level}` });

    const validQuestions = questions.filter((q) => q._id);
    if (validQuestions.length === 0) return res.status(400).json({ message: "Invalid question data from DB" });

    const gameData = {
      currentLevel: level,
      questions: validQuestions.map((q) => ({ questionId: q._id, selectedAnswer: null, isCorrect: false })),
      currentQuestionIndex: 0,
      score: 0,
      isCompleted: false,
    };

    const game = await Game.findOneAndUpdate(
      { user: userId },
      gameData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      message: `Game started at ${level} level`,
      gameId: game._id,
      questions: validQuestions.map((q) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || "",
        level: q.level,
      })),
      currentLevel: level,
      score: 0,
    });
  } catch (err) {
    console.error("Error starting game:", err);
    res.status(500).json({ message: "Error starting game", error: err.message || "Unknown server error" });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { gameId, answer } = req.body;
    if (!gameId || answer === undefined || answer === null) return res.status(400).json({ message: "gameId and answer are required" });

    const game = await Game.findById(gameId).populate("questions.questionId");
    if (!game) return res.status(404).json({ message: "Game not found" });

    const currentQ = game.questions[game.currentQuestionIndex];
    const questionDoc = currentQ?.questionId;
    if (!questionDoc) return res.status(400).json({ message: "Invalid question data" });

    const isCorrect = questionDoc.correctAnswer === answer;
    currentQ.selectedAnswer = answer;
    currentQ.isCorrect = isCorrect;
    if (isCorrect) game.score += 2;

    game.currentQuestionIndex += 1;
    const lastQuestion = game.currentQuestionIndex >= game.questions.length;

    let response = {
      correct: isCorrect,
      explanation: questionDoc.explanation || "",
      score: game.score,
      nextQuestion: null,
      levelFinished: false,
      levelPassed: false,
      nextLevel: null,
    };

    if (!lastQuestion) {
      const nextQ = game.questions[game.currentQuestionIndex].questionId;
      response.nextQuestion = {
        question: nextQ.question,
        options: nextQ.options,
        correctAnswer: nextQ.correctAnswer,
        level: nextQ.level,
      };
    } else {
      response.levelFinished = true;
      const passScore = 16;
      const passed = game.score >= passScore;
      response.levelPassed = passed;

      const isReplay = game.completedLevels.includes(game.currentLevel);
      if (passed && !isReplay) {
        game.completedLevels.push(game.currentLevel);
        const nextLevel = await getNextLevel(game.currentLevel);
        response.nextLevel = nextLevel || null;
      }

      game.isCompleted = passed && !await getNextLevel(game.currentLevel);
    }

    await game.save();
    res.json(response);
  } catch (err) {
    console.error("Error submitting answer:", err);
    res.status(500).json({ message: "Error submitting answer", error: err.message });
  }
};

export const getActiveGame = async (req, res) => {
  try {
    const userId = req.user.id;
    const game = await Game.findOne({ user: userId, isCompleted: false }).populate("questions.questionId");

    if (!game) {
      const lastGame = await Game.findOne({ user: userId }).sort({ createdAt: -1 });
      const completedAll = lastGame?.isCompleted || false;
      return res.status(200).json({ activeGame: null, completedAll, message: completedAll ? "Completed all levels" : "No active game" });
    }

    res.json({
      activeGame: {
        gameId: game._id,
        currentLevel: game.currentLevel,
        score: game.score,
        currentQuestionIndex: game.currentQuestionIndex,
        questions: game.questions.map((q) => ({
          questionId: q.questionId._id,
          question: q.questionId.question,
          options: q.questionId.options,
          correctAnswer: q.questionId.correctAnswer,
          selectedAnswer: q.selectedAnswer,
          explanation: q.questionId.explanation,
        })),
        completedLevels: game.completedLevels,
      },
    });
  } catch (err) {
    console.error("Error fetching active game:", err);
    res.status(500).json({ message: "Error fetching game", error: err.message });
  }
};

const getNextLevel = async (currentLevel) => {
  const levels = await Level.find().sort({ order: 1 });
  const idx = levels.findIndex((lvl) => lvl.name === currentLevel);
  if (idx === -1 || idx >= levels.length - 1) return null;
  return levels[idx + 1].name;
};
