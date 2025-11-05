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
  const [explanation, setExplanation] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextLevel, setNextLevel] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(["easy"]);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load active game if user refreshes
  useEffect(() => {
    const loadActiveGame = async () => {
      try {
        const data = await getActiveGame();
        if (data && data.currentQuestion) {
          setGameId(data.gameId);
          setQuestions([data.currentQuestion, ...data.questions.slice(1)]);
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

  // Start a new game or restart a level
  const initGame = async (level) => {
    setLoading(true);
    try {
      setGameStarted(true);
      setMessage("Loading questions...");
      setQuestions([]);
      setCurrentIndex(0);
      setScore(0);
      setExplanation("");
      setIsFailed(false);
      setIsGameOver(false);

      const data = await startGame({ level });
      const qList = data.questions || [];
      if (!qList.length) {
        setMessage("No questions available for this level.");
        return;
      }

      setGameId(data.game?._id || data.gameId);
      setQuestions(qList);
      setCurrentIndex(0);
      setCurrentLevel(level);
      setScore(0);
      setMessage("");
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Error starting game");
    } finally {
      setLoading(false);
    }
  };

  // Submit answer
  const handleAnswer = async (answer) => {
    try {
      const data = await submitAnswer(gameId, answer);

      setExplanation(data.explanation || "");
      setScore(data.score);

      // ❌ Failed answer
      if (data.failed) {
        setMessage(data.message);
        setIsGameOver(true);
        setIsFailed(true);
        setQuestions(data.questions); // replace with new questions
        setCurrentIndex(0);
        return;
      }

      // ✅ Next question
      if (data.nextQuestion) {
        setQuestions((prev) => [...prev, data.nextQuestion]);
        setCurrentIndex((prev) => prev + 1);
        setMessage(data.correct ? "✅ Correct!" : "❌ Wrong!");
      }

      // ✅ Level completed
      if (data.nextLevel) {
        setMessage(data.message);
        setIsGameOver(true);
        setNextLevel(data.nextLevel);
        setUnlockedLevels((prev) => [...new Set([...prev, data.nextLevel])]);
      }

      // ✅ All levels completed
      if (data.completedLevels) {
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

  const handleNextLevel = () => {
    setGameStarted(false);
    setIsFailed(false);
    setIsGameOver(false);
    setMessage("");
  };

  const handleRestart = () => {
    if (!questions || questions.length === 0) return;
    setIsFailed(false);
    setIsGameOver(false);
    setCurrentIndex(0);
    setScore(0);
    setExplanation("");
    setMessage("");
  };

  // LEVEL SELECTION SCREEN
  if (!gameStarted) {
    return (
      <div className="game-page">
        <h2>Cybersecurity Quiz Game</h2>
        <p>Select a difficulty level to begin:</p>

        <div className="level-buttons">
          <button onClick={() => initGame("easy")} className="start-btn">Easy</button>
          <button
            className="start-btn"
            onClick={() =>
              unlockedLevels.includes("intermediate")
                ? initGame("intermediate")
                : alert("You must finish Easy first!")
            }
          >
            Intermediate
          </button>
          <button
            className="start-btn"
            onClick={() =>
              unlockedLevels.includes("hard")
                ? initGame("hard")
                : alert("You must finish Intermediate first!")
            }
          >
            Hard
          </button>
        </div>

        {unlockedLevels.length > 1 && (
          <p className="progress-note">
            ✅ You have unlocked: {unlockedLevels.join(", ")}
          </p>
        )}
      </div>
    );
  }

  if (loading) return <p>Loading questions...</p>;

  // MAIN GAME SCREEN
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

      {isGameOver && (
        <div className="end-screen">
          {isFailed ? (
            <button onClick={handleRestart}>Start Again</button>
          ) : nextLevel ? (
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
