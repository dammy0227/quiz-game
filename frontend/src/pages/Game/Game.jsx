// src/pages/Game/Game.jsx
import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/Game/QuestionCard";
import { startGame, submitAnswer, getActiveGame } from "../../services/gameService";
import "./Game.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [nextLevel, setNextLevel] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(["easy"]);
  const [selectedLevel, setSelectedLevel] = useState(""); // for level selection
  const [isFailed, setIsFailed] = useState(false); // for wrong answer

  // Load active game if user refreshes
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

  // Start game function
  const initGame = async (level) => {
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
      setIsFailed(false);
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Error starting game");
    }
  };

  // Handle answer submission
  const handleAnswer = async (answer) => {
    try {
      const data = await submitAnswer(gameId, answer);
      setExplanation(data.explanation || "");

      if (!data.correct) {
        setMessage("❌ Wrong! Start again.");
        setScore(0);
        setIsFailed(true); // mark failure
        return;
      }

      setScore(data.score);

      if (data.nextQuestion) {
        setQuestions((prev) => [...prev, data.nextQuestion]);
        setCurrentIndex((prev) => prev + 1);
        setMessage("✅ Correct!");
      } else if (data.nextLevel) {
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(data.nextLevel);
        setUnlockedLevels((prev) => [...new Set([...prev, data.nextLevel])]);
      } else if (data.completedLevels) {
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(null);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting answer");
    }
  };

  // Navigation
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

  // Restart current level
  const handleRestart = () => {
    initGame(currentLevel);
    setIsFailed(false);
  };

  // Go back to level selection
  const handleNextLevel = () => {
    setGameStarted(false);
    setSelectedLevel("");
  };

  // ✅ LEVEL SELECTION SCREEN
  if (!gameStarted) {
    return (
      <div className="game-page">
        <h2>Cybersecurity Quiz Game</h2>
        <p>Select a difficulty level:</p>

        <div className="level-buttons">
          {["easy", "intermediate", "hard"].map((level) => (
            <button
              key={level}
              className="start-btn"
              onClick={() => {
                if (unlockedLevels.includes(level)) {
                  setSelectedLevel(level);
                } else {
                  alert(`You must finish previous level first!`);
                }
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {selectedLevel && (
          <button
            onClick={() => initGame(selectedLevel)}
            className="confirm-btn"
          >
            Start {selectedLevel.toUpperCase()} Game
          </button>
        )}

        {unlockedLevels.length > 1 && (
          <p className="progress-note">
            ✅ You have unlocked: {unlockedLevels.join(", ")}
          </p>
        )}
      </div>
    );
  }

  // ✅ MAIN GAME SCREEN
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return <p>Loading question...</p>;

  return (
    <div className="game-page">
      <div className="game-header">
        <h3>Level: {currentLevel.toUpperCase()}</h3>
        <h4>Score: {score}</h4>
      </div>

      {!isGameOver && !isFailed && (
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
            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </>
      )}

      {explanation && <p className="explanation">💡 Explanation: {explanation}</p>}
      {message && <p className="game-message">{message}</p>}

      {/* Restart if failed */}
      {isFailed && (
        <button onClick={handleRestart} className="restart-btn">
          Start Again
        </button>
      )}

      {/* End screen for completed level */}
      {isGameOver && !isFailed && (
        <div className="end-screen">
          <p>{message}</p>
          {nextLevel ? (
            <button onClick={handleNextLevel}>Go to Level Selection</button>
          ) : (
            <button onClick={handleRestart}>Restart Game</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
