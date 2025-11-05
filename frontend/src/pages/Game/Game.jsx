import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/Game/QuestionCard";
import { startGame, submitAnswer, getActiveGame } from "../../services/gameService";
import "./Game.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [questions, setQuestions] = useState([]); // 🆕 store all questions
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("easy");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [nextLevel, setNextLevel] = useState(null);

  useEffect(() => {
    const loadActiveGame = async () => {
      try {
        const data = await getActiveGame();
        if (data && data.currentQuestion) {
          setGameId(data.gameId);
          setQuestions(data.questions || [data.currentQuestion]);
          setCurrentIndex(data.currentIndex || 0);
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

  const initGame = async (level = "easy") => {
    try {
      const data = await startGame({ level });
      const qList = data.questions || [];
      setGameId(data.game?._id || data.gameId);
      setQuestions(qList);
      setCurrentIndex(0);
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

  const handleAnswer = async (answer) => {
    try {
      const data = await submitAnswer(gameId, answer);
      setExplanation(data.explanation || "");
      setScore(data.score);

      if (data.nextQuestion) {
        setQuestions((prev) => [...prev, data.nextQuestion]);
        setCurrentIndex((prev) => prev + 1);
        setMessage(data.correct ? "✅ Correct!" : "❌ Wrong!");
      } else if (data.nextLevel) {
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(data.nextLevel);
      } else if (data.completedLevels) {
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(null);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessage("Error submitting answer");
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setExplanation("");
      setMessage("");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setExplanation("");
      setMessage("");
    }
  };

  const handleNextLevel = async () => {
    if (nextLevel) {
      await initGame(nextLevel);
    }
  };

  const handleRestart = () => {
    initGame("easy");
  };

  if (!gameStarted)
    return (
      <div className="game-page">
        <h2>Cybersecurity Quiz Game</h2>
        <button className="start-btn" onClick={() => initGame("easy")}>
          Start Game
        </button>
      </div>
    );

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) return <p>Loading question...</p>;

  return (
    <div className="game-page">
      <div className="game-header">
        <h3>Level: {currentLevel.toUpperCase()}</h3>
        <h4>Score: {score}</h4>
      </div>

      {!isGameOver && (
        <>
          <QuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />

          <div className="nav-buttons">
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              <FaArrowLeft /> Previous
            </button>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              Next <FaArrowRight />
            </button>
          </div>
        </>
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
