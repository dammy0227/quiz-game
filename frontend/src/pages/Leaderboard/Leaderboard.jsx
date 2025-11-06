import React, { useEffect, useState } from "react";
import { getActiveGame } from "../../services/gameService";
import { getProfile } from "../../services/userService";
import { getLevels } from "../../services/levelService";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaTrophy,
  FaLayerGroup,
  FaStar,
  FaCheckCircle,
  FaChartLine,
  FaHeart,
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaShieldAlt
} from "react-icons/fa";
import "./Leaderboard.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, gameRes, levelsRes] = await Promise.all([
          getProfile(),
          getActiveGame(),
          getLevels(),
        ]);
        setUser(userRes);
        setGameData(gameRes);
        setLevels(levelsRes);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Unable to load profile or game data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const currentLevel = gameData?.currentLevel || "easy";
  const score = gameData?.score || 0;
  const completedLevels = gameData?.completedLevels || [];
  const totalCompleted = completedLevels.length;
  const totalLevels = levels.length || 3;
  const levelProgress = ((totalCompleted / totalLevels) * 100).toFixed(0);

  // Navigate to Game page with level query (allows replay)
  const handleStartLevel = (levelName) => {
    navigate(`/game?level=${levelName}`);
  };

  // Determine if level is unlocked
  const getUnlockedStatus = (level, index) => {
    if (index === 0) return true;
    const prevLevel = levels[index - 1];
    return completedLevels.includes(prevLevel.name) || completedLevels.includes(level.name);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="welcome-section">
          <div className="section">
            <h2>Welcome Back, {user?.name || "Player"} 👋</h2>
            <p>Ready to continue your cybersecurity journey?</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div>
              <h4>Current Level</h4>
              <p className="capitalize">{currentLevel}</p>
            </div>
            <div className="stat-icon"><FaLayerGroup /></div>
          </div>

          <div className="stat-card">
            <div>
              <h4>Total Score</h4>
              <p>{score * 2}</p>
            </div>
            <div className="stat-icon"><FaStar /></div>
          </div>

          <div className="stat-card">
            <div>
              <h4>Completed</h4>
              <p>{totalCompleted} / {totalLevels}</p>
            </div>
            <div className="stat-icon"><FaCheckCircle /></div>
          </div>

          <div className="stat-card">
            <div>
              <h4>Progress</h4>
              <p>{levelProgress}%</p>
            </div>
            <div className="stat-icon"><FaChartLine /></div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="progress-section">
          <h4>Overall Progress</h4>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${levelProgress}%` }}></div>
          </div>
          <p className="progress-percent">{levelProgress}% Completed</p>
        </div>

        <div className="main-flex">
          {/* Continue Learning Card */}
          <div className="continue-card">
            <h3>Continue Learning</h3>
            <p>
              Phishing Attack Recognition (<span className="capitalize">{currentLevel}</span>)
            </p>
            <p className="description">
              Identify and protect against phishing attempts and social engineering.
            </p>
            <button
              className="start-btn"
              onClick={() => handleStartLevel(currentLevel)}
            >
              Start Level
            </button>
          </div>

          {/* All Levels */}
          <div className="levels-wrapper">
            <div className="levels-card">
              <h3>All Levels</h3>
              {levels.map((level, index) => {
                const isCompleted = completedLevels.includes(level.name);
                const unlocked = getUnlockedStatus(level, index);
                const isLocked = !unlocked;

                return (
                  <div
                    key={level._id}
                    className={`level-row ${isLocked ? "locked" : ""}`}
                  >
                    <div className="level-info-block">
                      <h4 className="capitalize">{level.label}</h4>
                      <p className="level-description">{level.description}</p>
                      <div className="level-meta">
                        <p>🎯 {level.totalQuestions} Questions</p>
                        <p>🏆 {level.rewardPoints} pts</p>
                      </div>
                    </div>

                    <div className="level-actions">
                      {isCompleted ? (
                        <FaTrophy className="trophy" />
                      ) : isLocked ? (
                        <FaLock className="lock" />
                      ) : (
                        <span role="img" aria-label="flag">🏁</span>
                      )}
                      <button
                        disabled={isLocked}
                        className={`level-btn ${isLocked ? "disabled" : ""}`}
                        onClick={() => handleStartLevel(level.name)}
                      >
                        {isLocked ? "Locked" : isCompleted ? "Replay" : "Start"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3><FaShieldAlt style={{ marginRight: "10px" }} /> CyberSec Game</h3>
            <p>
              Learn cybersecurity through interactive games and challenges.
              Master the skills needed to protect yourself and your organization
              from cyber threats.
            </p>
            <div className="social-icons">
              <a href="#twitter" className="social-icon"><FaTwitter /></a>
              <a href="#linkedin" className="social-icon"><FaLinkedin /></a>
              <a href="#github" className="social-icon"><FaGithub /></a>
              <a href="#discord" className="social-icon"><FaDiscord /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#levels">Levels</a></li>
              <li><a href="#leaderboard">Leaderboard</a></li>
              <li><a href="#help">Help</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2025 CyberSec Game. All rights reserved.
            <br />
            <span>
              Made with <FaHeart className="heart" /> for cybersecurity education
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Leaderboard;
