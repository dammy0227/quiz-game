import React, { useState, useEffect, useCallback, useMemo } from "react";
import QuestionCard from "../../components/Game/QuestionCard";
import Lifeline from "../../components/Game/Lifeline";
import PrizeLadder from "../../components/Game/PrizeLadder";
import {
  startGame,
  submitAnswer,
  callLifeline,
  quitGame,
  getActiveGame
} from "../../services/gameService";
import "./Game.css";

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [lastPrizeLevel, setLastPrizeLevel] = useState(0);
  const [prize, setPrize] = useState(0);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [usedLifelines, setUsedLifelines] = useState({
    fiftyFifty: false,
    askAudience: false,
  });
  const [gameStarted, setGameStarted] = useState(false);

  // ✅ States for correct answer & explanation
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  // === AUDIO FILES ===
  const correctSound = useMemo(() => new Audio("/clap.wav"), []);
  const wrongSound = useMemo(() => new Audio("/fail.wav"), []);
  const winSound = useMemo(() => new Audio("/win.wav"), []);

  // === Resume active game ===
 useEffect(() => {
  const loadActiveGame = async () => {
    try {
      const data = await getActiveGame();
      if (data && data.currentQuestion) {
        setGameId(data.gameId);
        setCurrentQuestion(data.currentQuestion);
        setCurrentLevel(data.currentLevel);
        setPrize(data.prize);
        setUsedLifelines(data.usedLifelines);
        setTimer(data.timer || 30);
        setGameStarted(true);

        correctSound.play().catch((err) => console.log("Sound error:", err));
      }
    } catch (error) {
      console.log("No active game:", error.message);
      setGameStarted(false); // fallback to initial screen
    }
  };

  loadActiveGame();
}, [correctSound]);

  // === Handle wrong answer ===
  const handleWrongAnswer = useCallback(() => {
    setIsGameOver(true);
    setLastPrizeLevel(currentLevel);
    setShowPrizePopup(true);
    setMessage(`❌ Time's up! You walk away with $${prize}`);
    wrongSound.play().catch((err) => console.log("Sound error:", err));
  }, [prize, currentLevel, wrongSound]);

  // === Timer countdown ===
  useEffect(() => {
    if (!gameStarted || isGameOver || !currentQuestion) return;
    if (timer === 0) {
      handleWrongAnswer();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isGameOver, currentQuestion, gameStarted, handleWrongAnswer]);

  // === Start a new game ===
  const initGame = async () => {
    try {
      const data = await startGame();
      setGameId(data.gameId);
      setCurrentQuestion(data.firstQuestion);
      setCurrentLevel(0);
      setLastPrizeLevel(0);
      setPrize(0);
      setTimer(30);
      setUsedLifelines({ fiftyFifty: false, askAudience: false });
      setMessage("");
      setCorrectAnswer("");
      setExplanation("");
      setIsGameOver(false);
      setShowPrizePopup(false);
      setGameStarted(true);
      correctSound.play().catch((err) => console.log("Sound error:", err));
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  // === Handle answer submission ===
  const handleAnswer = async (answer) => {
    if (!gameId) return;
    try {
      console.log("Submitting answer:", answer);
      const data = await submitAnswer(gameId, answer);
      console.log("Response data:", data); // Debug the response

      // ✅ ALWAYS set these values from the response
      setMessage(data.message || "");
      setCorrectAnswer(data.correctAnswer || "");
      setExplanation(data.explanation || "No explanation provided.");

      if (data.nextQuestion) {
        // Correct answer, game continues
        setPrize(data.prize || 0);
        setShowPrizePopup(true);
        setLastPrizeLevel(currentLevel);
        correctSound.play().catch((err) => console.log("Sound error:", err));

        setTimeout(() => {
          setShowPrizePopup(false);
          setCurrentQuestion(data.nextQuestion);
          setCurrentLevel((prev) => prev + 1);
          setTimer(30);
          setMessage("");
          setCorrectAnswer("");
          setExplanation("");
        }, 1500);
      } else {
        // Game over (win or lose)
        setPrize(data.prize || 0);
        setIsGameOver(true);
        setLastPrizeLevel(currentLevel);
        setShowPrizePopup(true);
        
        // Use the correct flag from backend instead of message parsing
        const isWin = data.correct === true;
        setMessage(
          isWin
            ? `🎉 Congratulations! You won the full prize: $${data.prize}`
            : `❌ Wrong answer! You walk away with $${data.prize}`
        );
        
        const sound = isWin ? winSound : wrongSound;
        sound.play().catch((err) => console.log("Sound error:", err));
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessage("Error submitting answer. Please try again.");
    }
  };

  // === Quit game ===
  const handleQuit = async () => {
    if (!gameId) return;
    try {
      const data = await quitGame(gameId);
      setPrize(data.prize);
      setIsGameOver(true);
      setLastPrizeLevel(currentLevel);
      setShowPrizePopup(true);
      setMessage(`You quit. You walk away with $${data.prize}`);
      wrongSound.play().catch((err) => console.log("Sound error:", err));
    } catch (error) {
      console.error("Error quitting game:", error);
    }
  };

  // === Lifeline ===
  const handleLifeline = async (type) => {
    if (!gameId || usedLifelines[type]) return;

    try {
      const data = await callLifeline(gameId, type);

      if (data.remainingOptions) {
        setCurrentQuestion({
          ...currentQuestion,
          options: data.remainingOptions,
        });
      }

      if (data.poll) {
        setMessage(
          "Audience Poll: " +
            data.poll.map((p) => `${p.option}: ${p.votes}%`).join(" | ")
        );
      } else if (data.message) {
        setMessage(data.message);
      }

      setUsedLifelines((prev) => ({ ...prev, [type]: true }));
    } catch (error) {
      console.error("Error using lifeline:", error);
    }
  };

  // === Render ===
  if (!gameStarted)
    return (
      <div className="game-page">
        <h2>Cybersecurity Quiz Game</h2>
        <PrizeLadder currentLevel={0} lastPrizeLevel={0} isGameOver={false} />
        <button className="start-btn" onClick={initGame}>
          Start New Game
        </button>
      </div>
    );

  if (!currentQuestion) return <p>Loading game...</p>;

  return (
    <div className="game-page">
      {showPrizePopup && (
        <div className="popup">
          <PrizeLadder
            currentLevel={currentLevel}
            lastPrizeLevel={lastPrizeLevel}
            isGameOver={isGameOver}
          />

          <p className="popup-message">{message}</p>

          {correctAnswer && (
            <p className="correct-answer">✅ Correct Answer: {correctAnswer}</p>
          )}

          <p className="explanation">
            💡 Explanation: {explanation}
          </p>

          {!isGameOver && (
            <button
              className="continue-btn"
              onClick={() => setShowPrizePopup(false)}
            >
              Continue
            </button>
          )}

          {isGameOver && (
            <button className="restart-btn" onClick={initGame}>
              Play Again
            </button>
          )}
        </div>
      )}

      {!isGameOver && !showPrizePopup && (
        <div className="game-content">
          <div className="game-header">
            <h3>Time Remaining: {timer}s</h3>
            <div className="prize-display">Current Prize: ${prize}</div>
          </div>
          
          <QuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
          
          <Lifeline
            onFiftyFifty={() => handleLifeline("fiftyFifty")}
            onAskAudience={() => handleLifeline("askAudience")}
            usedLifelines={usedLifelines}
          />
          
          <button className="quit-btn" onClick={handleQuit}>
            Quit Game
          </button>
          
          {message && <p className="game-message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Game;