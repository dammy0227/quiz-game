import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/Game/QuestionCard";
import {
  startGame,
  submitAnswer,
  getActiveGame,
} from "../../services/gameService";
import "./Game.css";

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("easy");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [nextLevel, setNextLevel] = useState(null);

  // === Load active game on mount ===
  useEffect(() => {
    const loadActiveGame = async () => {
      try {
        const data = await getActiveGame();
        if (data && data.currentQuestion) {
          setGameId(data.gameId);
          setCurrentQuestion(data.currentQuestion);
          setCurrentLevel(data.currentLevel);
          setScore(data.score);
          setGameStarted(true);
        }
      } catch (error) {
        console.log("No active game found", error);
      }
    };
    loadActiveGame();
  }, []);

  // === Start a new game ===
  const initGame = async (level = "easy") => {
    try {
      const data = await startGame({ level });

      const firstQuestion =
        data.questions?.[0] ||
        data.game?.questions?.[data.game.currentQuestionIndex]?.questionId;

      setGameId(data.game?._id || data.gameId);
      setCurrentQuestion(firstQuestion);
      setCurrentLevel(level);
      setScore(0);
      setMessage("");
      setExplanation("");
      setIsGameOver(false);
      setGameStarted(true);
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Error starting game");
    }
  };

  // === Handle answer ===
  const handleAnswer = async (answer) => {
    try {
      const data = await submitAnswer(gameId, answer);

      // Always show explanation if present
      setExplanation(data.explanation || "");

      if (data.nextQuestions) {
        // ❌ Wrong answer → restart same level
        setMessage(data.message);
        setCurrentLevel(currentLevel);
        setScore(data.score);
        setCurrentQuestion(data.nextQuestions[0]);
        return;
      }

      if (data.nextQuestion) {
        // ✅ Correct → next question in same level
        setCurrentQuestion(data.nextQuestion);
        setScore(data.score);
        setMessage(data.correct ? "✅ Correct!" : "❌ Wrong!");
      } else if (data.nextLevel) {
        // 🎯 Level completed → move to next level
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(data.nextLevel);
        setScore(0);
      } else if (data.completedLevels) {
        // 🏁 Game completed → no next level
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(null);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessage("Error submitting answer");
    }
  };

  // === Move to next level ===
  const handleNextLevel = async () => {
    if (nextLevel) {
      await initGame(nextLevel);
    }
  };

  // === Restart game from easy ===
  const handleRestart = () => {
    initGame("easy");
  };

  // === Render ===
  if (!gameStarted)
    return (
      <div className="game-page">
        <h2>Cybersecurity Quiz Game</h2>
        <button className="start-btn" onClick={() => initGame("easy")}>
          Start Game
        </button>
      </div>
    );

  if (!currentQuestion) return <p>Loading question...</p>;

  return (
    <div className="game-page">
      <div className="game-header">
        <h3>Level: {currentLevel.toUpperCase()}</h3>
        <h4>Score: {score}</h4>
      </div>

      {!isGameOver && (
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
        />
      )}

      {explanation && (
        <p className="explanation">💡 Explanation: {explanation}</p>
      )}

      {message && <p className="game-message">{message}</p>}

      {isGameOver && (
        <div className="end-screen">
          <p>{message}</p>
          {nextLevel ? (
            <button onClick={handleNextLevel}>Next Level</button>
          ) : (
            <button onClick={handleRestart}>Restart Game</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
