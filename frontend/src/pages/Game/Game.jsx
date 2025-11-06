import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/Game/QuestionCard";
import { startGame, submitAnswer, getActiveGame } from "../../services/gameService";
import { FaArrowRight, FaArrowLeft, FaRedo } from "react-icons/fa";
import "./Game.css";

const Game = () => {
  const [searchParams] = useSearchParams();
  const levelQuery = searchParams.get("level");

  const [gameId, setGameId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [explanation, setExplanation] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeGameLoaded, setActiveGameLoaded] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState(["easy"]);
  const [allCompleted, setAllCompleted] = useState(false);

  const [showEndPopup, setShowEndPopup] = useState(false);
  const [endPopupData, setEndPopupData] = useState({
    success: false,
    totalScore: 0,
    message: "",
    nextLevel: null,
  });

  // --- Load audio ---
  const correctSound = new Audio("/clap.wav");
  const wrongSound = new Audio("/fail.wav");
  const levelCompleteSound = new Audio("/win.wav");
  const grandmasterSound = new Audio("/grandmaster.wav");

  correctSound.volume = 0.5;
  wrongSound.volume = 0.5;
  levelCompleteSound.volume = 0.5;
  grandmasterSound.volume = 0.5;

  // --- Load active game on mount ---
  useEffect(() => {
    const loadActiveGame = async () => {
      try {
        const data = await getActiveGame();

        if (data.completedAll) {
          setUnlockedLevels(["easy", "intermediate", "hard"]);
          setAllCompleted(true);
          setGameStarted(false);
          setMessage("🎉 You have completed all levels! You can replay any level.");
          return;
        }

        if (data?.gameId) {
          const allQuestions = data.questions?.map((q) => ({
            question: q.question || q.questionId?.question,
            options: q.options || q.questionId?.options,
            correctAnswer: q.correctAnswer || q.questionId?.correctAnswer,
            selectedAnswer: q.selectedAnswer || null,
            explanation: q.explanation || q.questionId?.explanation || "",
          })) || [];

          setGameId(data.gameId);
          setQuestions(allQuestions);
          setCurrentIndex(data.currentQuestionIndex || 0);
          setCurrentLevel(data.currentLevel);
          setScore(data.score || 0);
          setGameStarted(true);
          setUnlockedLevels((prev) => [
            ...new Set([...prev, ...(data.completedLevels || []), data.currentLevel]),
          ]);
        }
      } catch (err) {
        console.log("No active game found, starting fresh...", err);
      } finally {
        setActiveGameLoaded(true);
      }
    };

    loadActiveGame();
  }, []);

  // --- Start or replay a level ---
  const initGame = async (level) => {
    setLoading(true);
    try {
      const data = await startGame({ level });

      const qList = data.questions?.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        selectedAnswer: null,
        explanation: q.explanation || "",
      })) || [];

      setGameId(data.game?._id || data.gameId);
      setQuestions(qList);
      setCurrentLevel(level);
      setCurrentIndex(0);
      setScore(0);
      setGameStarted(true);
      setShowEndPopup(false);
      setMessage("");
      setAllCompleted(false);
      setExplanation("");

      setUnlockedLevels((prev) => [...new Set([...prev, ...(data.completedLevels || []), level])]);

    } catch (err) {
      console.error("Error starting game:", err);
      setMessage("Error starting game.");
    } finally {
      setLoading(false);
    }
  };

  // --- Automatically start level if query param exists ---
  useEffect(() => {
    if (levelQuery) {
      initGame(levelQuery);
    }
  }, [levelQuery]);

  // --- Submit answer ---
  const handleAnswer = async (answer) => {
    if (!gameId || answer === undefined || answer === null) {
      setMessage("Cannot submit answer right now.");
      return;
    }

    try {
      const data = await submitAnswer(gameId, answer);

      setExplanation(data.explanation || "");
      setScore(data.score);

      setQuestions((prev) =>
        prev.map((q, idx) =>
          idx === currentIndex ? { ...q, selectedAnswer: answer } : q
        )
      );

      setMessage(data.correct ? "✅ Correct! +2 points" : "❌ Wrong answer");

      // --- Play sound based on correctness ---
      if (data.correct) correctSound.play();
      else wrongSound.play();

      if (data.nextQuestion) {
        setQuestions((prev) => [
          ...prev,
          {
            question: data.nextQuestion.question,
            options: data.nextQuestion.options,
            correctAnswer: data.nextQuestion.correctAnswer,
            selectedAnswer: null,
            explanation: data.nextQuestion.explanation || "",
          },
        ]);
      }

      // --- Level Finished: show badges ---
      if (data.levelFinished) {
        const badges = {
          easy: "🥉 Bronze Badge",
          intermediate: "🥈 Silver Badge",
          hard: "🥇 Gold Badge",
        };

        const isGrandmaster =
          unlockedLevels.includes("easy") &&
          unlockedLevels.includes("intermediate") &&
          unlockedLevels.includes("hard") &&
          currentLevel === "hard";

        // Play level complete or fail sound
        if (data.levelPassed) {
          levelCompleteSound.play();
          if (isGrandmaster) grandmasterSound.play();
        } else {
          wrongSound.play();
        }

        setShowEndPopup(true);
        setEndPopupData({
          success: data.levelPassed,
          totalScore: data.score,
          message: data.levelPassed
            ? `🎉 You earned the ${badges[currentLevel]}!`
            : `❌ You scored ${data.score} points. Try again!`,
          nextLevel: data.nextLevel,
          grandmaster: isGrandmaster,
          badge: badges[currentLevel],
        });

        if (data.levelPassed && data.nextLevel) {
          setUnlockedLevels((prev) => [...new Set([...prev, data.nextLevel])]);
        }
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      setMessage(err.response?.data?.message || "Error submitting answer");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setMessage("");
      setExplanation("");
    }
  };

  const handleNext = () => {
    const currentQ = questions?.[currentIndex];
    if (!currentQ || !currentQ.selectedAnswer) return;

    if (currentIndex === questions.length - 1) {
      setShowEndPopup(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setMessage("");
      setExplanation("");
    }
  };

  const handleRetryLevel = () => {
    if (currentLevel) initGame(currentLevel);
  };

  const handleNextLevelFromPopup = () => {
    setShowEndPopup(false);
    if (endPopupData.nextLevel) initGame(endPopupData.nextLevel);
  };

  const handleDashboard = () => {
    window.location.href = "/leaderboard";
  };

  // --- LEVEL SELECTION SCREEN ---
  if (!gameStarted && activeGameLoaded) {
    return (
      <div className="game-container">
        <h2>Cybersecurity Quiz Game</h2>
        {allCompleted ? (
          <p className="completed-message">
            🎉 You have completed all levels! You can replay any level below.
          </p>
        ) : (
          <p>Choose a level to begin:</p>
        )}

        <div className="level-select">
          <button onClick={() => initGame("easy")} className="level-btn">Easy</button>
          <button
            onClick={() =>
              unlockedLevels.includes("intermediate")
                ? initGame("intermediate")
                : alert("Complete Easy to unlock Intermediate!")
            }
            className="level-btn"
          >Intermediate</button>
          <button
            onClick={() =>
              unlockedLevels.includes("hard")
                ? initGame("hard")
                : alert("Complete Intermediate to unlock Hard!")
            }
            className="level-btn"
          >Hard</button>
        </div>

        {unlockedLevels.length > 1 && (
          <p className="unlocked-info">✅ Unlocked Levels: {unlockedLevels.join(", ")}</p>
        )}
        {message && <p className="feedback">{message}</p>}
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (!questions || questions.length === 0) return <p>No questions found.</p>;

  const currentQ = questions[currentIndex];
  if (!currentQ) return <p>Loading current question...</p>;
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="game-container">
      <div className="game-header">
        <div>
          <h3>{currentLevel.toUpperCase()} Level</h3>
          <p>Question {currentIndex + 1} / {questions.length}</p>
        </div>
        <div className="score-info">
          <strong>Score:</strong> {score}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <QuestionCard
        question={currentQ.question}
        options={currentQ.options || []}
        onAnswer={handleAnswer}
        selectedAnswer={currentQ.selectedAnswer}
        correctAnswer={currentQ.correctAnswer}
        disabled={!gameId}
      />

      {explanation && (
        <div className="explanation">
          💡 <strong>Explanation:</strong> {explanation}
        </div>
      )}

      {message && <p className="feedback">{message}</p>}

      <div className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          <FaArrowLeft /> Previous
        </button>
        {currentQ.selectedAnswer && (
          <button onClick={handleNext}>
            Next <FaArrowRight />
          </button>
        )}
        <button onClick={handleRetryLevel} className="retry-btn">
          <FaRedo /> Retry Level
        </button>
      </div>

      {showEndPopup && (
        <div className="end-popup">
          <div className="popup-content">
            {endPopupData.success ? (
              <>
                <h2>🎉 Level Completed!</h2>
                <p>{endPopupData.message}</p>

                {/* Show per-level badge */}
                {endPopupData.badge && (
                  <div className="badge">{endPopupData.badge}</div>
                )}

                {/* Show Grandmaster badge if applicable */}
                {endPopupData.grandmaster && (
                  <div className="grandmaster-badge">
                    🌟 Grandmaster Badge Achieved! 🌟
                  </div>
                )}

                {endPopupData.nextLevel && (
                  <button onClick={handleNextLevelFromPopup} className="next-btn">
                    Go to {endPopupData.nextLevel.toUpperCase()} Level
                  </button>
                )}
                <button onClick={handleDashboard} className="dashboard-btn">
                  Back to Dashboard
                </button>
              </>
            ) : (
              <>
                <h2>❌ Level Failed</h2>
                <p>{endPopupData.message}</p>
                <button onClick={handleRetryLevel} className="retry-btn">
                  Retry Level
                </button>
                <button onClick={handleDashboard} className="dashboard-btn">
                  Back to Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
